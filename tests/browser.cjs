// Run with a Playwright installation on NODE_PATH: node tests/browser.cjs
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 960 } });
  // Reproducible fresh-run seeds keep replay assertions free of random collisions.
  await page.addInitScript(() => {
    let seed = 74129;
    Math.random = () => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed / 4294967296;
    };
  });
  const errors = [];
  const seenChoices = new Set();
  page.on('pageerror', error => errors.push(error.message));
  page.on('requestfailed', request => errors.push(request.url() + ': ' + request.failure().errorText));
  const url = process.env.MAGICAT_URL || pathToFileURL(path.resolve(__dirname, '../index.html')).href;
  async function replaySignature() {
    return page.evaluate(() => {
      const state = MG.Game.getState();
      const rounds = Array.from({ length: 10 }, (_, i) => MG.Logic.round({ ...state, stage: i + 1 }));
      return {
        seed: state.seed,
        groups: rounds.map(round => round.groupId),
        passages: rounds.map(round => round.passageIndex),
        choices: rounds.flatMap(round => round.options.map(option => option.id)).sort(),
        bodies: rounds.map(round => round.bodyEn.join(' '))
      };
    });
  }
  async function englishOnly() {
    const text = await page.evaluate(() => {
      const labels = Array.from(document.querySelectorAll('[aria-label], [title], [alt]'))
        .map(el => ['aria-label', 'title', 'alt'].map(name => el.getAttribute(name) || '').join(' '));
      const badges = Array.from(document.querySelectorAll('.mg-item__price'))
        .map(el => getComputedStyle(el, '::after').content);
      return [document.title, document.body.innerText, ...labels, ...badges].join('\\n');
    });
    assert.equal(/[가-힣ㄱ-ㅎㅏ-ㅣ]/.test(text), false, 'UI and accessible labels must be English only');
    assert.equal(/\b(undefined|NaN)\b/.test(text), false, 'removed translation fields must not leak into the UI');
    assert.equal(await page.locator('html').getAttribute('lang'), 'en');
  }
  async function select(index) {
    seenChoices.clear();
    await page.locator('#btn-start').click();
    assert.equal(await page.locator('.mg-card').count(), 16);
    await englishOnly();
    await page.locator('.mg-card').nth(index).click();
    await englishOnly();
    await page.locator('#cat-preview button').click();
    await page.locator('#screen-intro').waitFor({ state: 'visible' });
    assert.ok(await page.locator('#intro-stage image').count());
    await englishOnly();
    for (let i = 0; i < 3; i++) await page.locator('#btn-intro-next').click();
    await page.locator('#screen-stage').waitFor({ state: 'visible' });
    await englishOnly();
  }
  async function answer(catIndex, correct) {
    await page.waitForFunction(() => getComputedStyle(document.getElementById('screen-stage')).opacity === '1');
    assert.equal(await page.locator('#page-clues, .mg-clue').count(), 0);
    const paragraphs = await page.locator('#page-body p').count();
    assert.ok(paragraphs >= 2 && paragraphs <= 3);
    const catId = await page.evaluate(index => MG.CATS[index].id, catIndex);
    const outfit = await page.evaluate(() => MG.Game.getState().equipped.outfit);
    const portrait = outfit ? 'assets/cats/wardrobe/' + catId + '--' + outfit + '.png' : 'assets/cats/' + catId + '.png';
    assert.equal(await page.locator('#stage-cat image').first().getAttribute('href'), portrait);
    const ids = await page.locator('.mg-opt').evaluateAll(buttons => buttons.map(b => b.dataset.actionId));
    const groups = await page.evaluate(ids => ids.map(id => MG.ACTION_BY_ID[id].group), ids);
    assert.equal(new Set(groups).size, 1, 'all four alternatives must be plausible choices of the same kind');
    for (const id of ids) {
      assert.equal(seenChoices.has(id), false, 'a choice must never repeat in the same run');
      seenChoices.add(id);
    }
    const catBox = await page.locator('.mg-waiting-cat').boundingBox();
    const bookBox = await page.locator('.mg-book').boundingBox();
    const viewport = page.viewportSize();
    assert.ok(catBox.x > viewport.width * .5);
    assert.ok(catBox.y + catBox.height <= viewport.height);
    assert.ok(catBox.y + catBox.height >= viewport.height - 30);
    assert.ok(bookBox.y + bookBox.height <= catBox.y, 'waiting cat must not obscure the book or choices');
    const index = await page.evaluate(({ catIndex, correct }) => {
      const cat = MG.CATS[catIndex];
      return Array.from(document.querySelectorAll('.mg-opt')).findIndex(button => {
        const action = MG.ACTION_BY_ID[button.dataset.actionId];
        return action && cat.loves.includes(action.id) === correct;
      });
    }, { catIndex, correct });
    assert.ok(index >= 0, 'a matching choice must exist');
    await page.locator('.mg-opt').nth(index).click();
    await page.locator('#overlay').waitFor({ state: 'visible' });
    await englishOnly();
    assert.equal(await page.locator('.mg-opt:disabled').count(), 4);
    await page.locator('#btn-react-next').click();
    await englishOnly();
  }
  async function purchaseFirst(shelfIndex, verifyCancel = false) {
    const button = page.locator('.mg-shelf').nth(shelfIndex).locator('.mg-item:not(:disabled):not(.is-owned)').first();
    const before = await page.evaluate(() => JSON.stringify(MG.Game.getState()));
    const itemId = await button.getAttribute('data-shop-id');
    const item = await page.evaluate(id => MG.SHOP_BY_ID[id], itemId);
    await button.click();
    await page.locator('#purchase-dialog').waitFor({ state: 'visible' });
    await englishOnly();
    assert.equal(await page.evaluate(() => JSON.stringify(MG.Game.getState())), before, 'trying on must not spend or equip');
    if (item.kind === 'outfit') {
      assert.ok((await page.locator('#purchase-preview .cat-clothing').getAttribute('href')).endsWith('--' + item.id + '.png'));
      await page.evaluate(async () => {
        const preview = document.getElementById('purchase-preview');
        await Promise.all(Array.from(preview.querySelectorAll('image')).map(async node => {
          const image = new Image();
          image.src = node.getAttribute('href');
          await image.decode();
        }));
        await Promise.all(document.getElementById('purchase-dialog').getAnimations({ subtree: true }).filter(animation =>
          animation.effect.getComputedTiming().iterations === 1).map(animation => animation.finished));
      });
      await page.screenshot({ path: '/tmp/magic-cat-try-on.png' });
    }
    if (verifyCancel) {
      await page.locator('#purchase-no').click();
      assert.equal(await page.evaluate(() => JSON.stringify(MG.Game.getState())), before);
      await button.click();
      await page.keyboard.press('Escape');
      assert.equal(await page.evaluate(() => JSON.stringify(MG.Game.getState())), before);
      await button.click();
    }
    await page.locator('#purchase-yes').click();
    await page.locator('#purchase-dialog').waitFor({ state: 'hidden' });
    const after = await page.evaluate(() => MG.Game.getState());
    assert.equal(after.coins, JSON.parse(before).coins - item.price);
    assert.ok(after.owned.includes(item.id));
    if (item.kind !== 'treat') assert.equal(after.equipped[item.kind], item.id);
    await page.locator('#purchase-yes').dispatchEvent('click');
    assert.equal(await page.evaluate(() => MG.Game.getState().coins), after.coins, 'repeated confirmation must not charge twice');
  }
  try {
    await page.goto(url);
    await englishOnly();
    await select(0);
    const firstRun = await replaySignature();
    await page.waitForFunction(() => getComputedStyle(document.getElementById('screen-stage')).opacity === '1');
    await page.waitForFunction(() => getComputedStyle(document.querySelector('.mg-book')).opacity === '1');
    await page.screenshot({ path: '/tmp/magic-cat-book.png' });
    for (let stage = 1; stage <= 10; stage++) {
      await answer(0, true);
      {
        await page.locator('#screen-shop').waitFor({ state: 'visible' });
        if (stage === 3) {
          // Buy an item from each shelf, then verify dressed image is present.
          for (let shelf = 0; shelf < 3; shelf++) await purchaseFirst(shelf, true);
          assert.ok(await page.locator('#shop-preview .cat-clothing').count());
          await englishOnly();
          const coins = await page.evaluate(() => MG.Game.getState().coins);
          await page.locator('[data-shop-id="cloud-robe"]').click();
          assert.equal(await page.locator('#purchase-yes').isDisabled(), true);
          assert.equal(await page.locator('#purchase-no').isEnabled(), true);
          await page.keyboard.press('Tab');
          assert.equal(await page.locator('#purchase-no').evaluate(el => el === document.activeElement), true);
          await page.keyboard.press('Escape');
          assert.equal(await page.evaluate(() => MG.Game.getState().coins), coins);
        }
        if (stage === 6) {
          await purchaseFirst(1, true);
          const coins = await page.evaluate(() => MG.Game.getState().coins);
          await page.locator('[data-shop-id="velvet-cape"]').click();
          assert.equal(await page.evaluate(() => MG.Game.getState().coins), coins);
          assert.equal(await page.evaluate(() => MG.Game.getState().equipped.outfit), 'velvet-cape');
          assert.equal(await page.locator('#purchase-dialog').isVisible(), false);
        }
        if (stage === 10) await purchaseFirst(0, true);
        await page.locator('#btn-shop-leave').click();
      }
    }
    await page.locator('#screen-ending').waitFor({ state: 'visible' });
    assert.ok(await page.locator('#ending-stage .cat-clothing').count());
    await page.waitForFunction(() => getComputedStyle(document.getElementById('screen-ending')).opacity === '1');
    await page.screenshot({ path: '/tmp/magic-cat-ending.png' });
    await page.locator('#btn-end-again').click();
    if (await page.locator('#screen-select').isVisible()) {
      await page.goto(url);
    }
    await select(0);
    const secondRun = await replaySignature();
    assert.notEqual(secondRun.seed, firstRun.seed);
    assert.notDeepEqual(secondRun.choices, firstRun.choices, 'replay must change choice membership, not only ordering');
    assert.notDeepEqual(secondRun.passages, firstRun.passages, 'replay must change source reading passages');
    assert.notDeepEqual(secondRun.bodies, firstRun.bodies);
    await page.waitForFunction(() => getComputedStyle(document.querySelector('.mg-book')).opacity === '1');
    await page.screenshot({ path: '/tmp/magic-cat-book-replay.png' });
    for (let i = 0; i < 3; i++) {
      await answer(0, false);
      if (i < 2) {
        await page.locator('#screen-shop').waitFor({ state: 'visible' });
        await page.locator('#btn-shop-leave').click();
      }
    }
    await page.locator('#screen-over').waitFor({ state: 'visible' });
    assert.equal((await page.locator('#purse-count').textContent()).trim(), '0');
    await page.locator('#btn-over-retry').click();
    assert.equal((await page.locator('#purse-count').textContent()).trim(), '6');
    const retriedRun = await replaySignature();
    assert.notEqual(retriedRun.seed, secondRun.seed);
    assert.notDeepEqual(retriedRun.choices, secondRun.choices);
    assert.notDeepEqual(retriedRun.passages, secondRun.passages);
    // Verify both remaining ending personalities with purchased treats.
    const indexes = await page.evaluate(() => ['playful', 'dizzy'].map(p => MG.CATS.findIndex(c => c.personality === p)));
    for (const index of indexes) {
      await page.goto(url);
      await select(index);
      for (let stage = 1; stage <= 10; stage++) {
        await answer(index, true);
        await page.locator('#screen-shop').waitFor({ state: 'visible' });
        if (stage === 3) await purchaseFirst(0);
        await page.locator('#btn-shop-leave').click();
      }
      await page.locator('#screen-ending').waitFor({ state: 'visible' });
      const personality = await page.evaluate(index => MG.CATS[index].personality, index);
      assert.equal(await page.locator('.mg-eat--' + personality).count(), 1);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(url);
    await page.locator('#btn-start').click();
    const layout = await page.locator('#cat-grid').evaluate(el => ({
      columns: getComputedStyle(el).gridTemplateColumns.split(' ').length,
      overflow: document.documentElement.scrollWidth > innerWidth
    }));
    assert.equal(layout.columns, 4);
    assert.equal(layout.overflow, false);
    await page.waitForFunction(() => getComputedStyle(document.getElementById('screen-select')).opacity === '1');
    await page.screenshot({ path: '/tmp/magic-cat-selection-mobile.png', fullPage: true });
    await page.goto(url);
    await select(0);
    for (let stage = 1; stage <= 10; stage++) {
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      await answer(0, true);
      await page.locator('#screen-shop').waitFor({ state: 'visible' });
      if (stage === 3) await purchaseFirst(1, true);
      await page.locator('#btn-shop-leave').click();
    }
    await page.locator('#screen-ending').waitFor({ state: 'visible' });
    await englishOnly();
    assert.deepEqual(errors, []);
    console.log('PASS: 40-stage playthrough, shops, equipment, endings, game over, retry, mobile 4x4 and gameplay, English-only text and labels, no JS errors.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
