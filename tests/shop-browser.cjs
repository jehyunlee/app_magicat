const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 960 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const url = process.env.MAGICAT_URL || pathToFileURL(path.resolve(__dirname, '../index.html')).href;
  async function start() {
    await page.goto(url);
    await page.locator('#btn-start').click();
    await page.locator('.mg-family__card').first().click();
    await page.locator('#btn-character-confirm').click();
    await page.locator('.mg-card').first().click();
    await page.locator('#cat-preview button').click();
    for (let i = 0; i < 3; i++) await page.locator('#btn-intro-next').click();
  }
  async function finishStage(correct = true) {
    const id = await page.evaluate(correct => {
      const round = MG.Logic.round(MG.Game.getState());
      return correct ? round.correctId : round.options.find(option => option.id !== round.correctId).id;
    }, correct);
    await page.locator('[data-action-id="' + id + '"]').click();
    if (!correct) {
      await page.locator('#react-feedback').waitFor({ state: 'visible' });
      assert.match(await page.locator('#react-answer').innerText(), /정답 [A-D]:/);
      assert.match(await page.locator('#react-explanation').innerText(), /본문/);
    }
    await page.locator('#btn-react-next').click();
    if (correct) {
      await page.locator('#play-overlay').waitFor({ state: 'visible' });
      await page.locator('#btn-play-next').click();
    }
  }
  async function buy(id, cancelFirst = false) {
    const before = await page.evaluate(() => JSON.stringify(MG.Game.getState()));
    await page.locator('[data-shop-id="' + id + '"]').click();
    await page.locator('#purchase-dialog').waitFor({ state: 'visible' });
    assert.equal(await page.evaluate(() => JSON.stringify(MG.Game.getState())), before);
    if (cancelFirst) {
      await page.locator('#purchase-no').click();
      assert.equal(await page.evaluate(() => JSON.stringify(MG.Game.getState())), before);
      await page.locator('[data-shop-id="' + id + '"]').click();
    }
    await page.locator('#purchase-yes').click();
    await page.locator('#purchase-dialog').waitFor({ state: 'hidden' });
  }
  try {
    await start();
    const purchases = { 1: 'moon-medal', 2: 'velvet-cape', 3: 'leaf-brooch', 6: 'round-glasses', 9: 'star-hatpin', 10: 'moon-milk' };
    for (let stage = 1; stage <= 20; stage++) {
      await finishStage();
      assert.equal(await page.locator('.mg-item').count(), 27);
      if (purchases[stage]) await buy(purchases[stage], true);
      if (stage === 9) {
        assert.equal(await page.locator('#shop-preview .cat-clothing').count(), 1);
        assert.equal(await page.locator('#shop-preview .cat-accessory').count(), 4);
        await page.locator('#shop-preview').scrollIntoViewIfNeeded();
        await page.evaluate(async () => {
          await Promise.all(Array.from(document.querySelectorAll('#shop-preview image')).map(async node => {
            const image = new Image(); image.src = node.getAttribute('href'); await image.decode();
          }));
        });
        await page.locator('#shop-preview').screenshot({ path: '/tmp/magicat-layered-preview.png' });
        const before = await page.evaluate(() => MG.Game.getState().coins);
        await page.locator('[data-shop-id="round-glasses"]').click();
        assert.equal(await page.locator('#shop-preview [data-slot="face"]').count(), 0);
        assert.equal(await page.locator('#shop-preview .cat-accessory').count(), 3);
        await page.locator('[data-shop-id="round-glasses"]').click();
        assert.equal(await page.locator('#shop-preview .cat-accessory').count(), 4);
        assert.equal(await page.evaluate(() => MG.Game.getState().coins), before);
      }
      await page.locator('#btn-shop-leave').click();
    }
    await page.locator('#screen-ending').waitFor({ state: 'visible' });
    assert.equal(await page.locator('#ending-stage .cat-accessory').count(), 4);
    assert.equal(await page.evaluate(() => MG.Game.getState().coins), 32);
    await start();
    for (let stage = 1; stage <= 20; stage++) {
      await finishStage();
      if (stage === 1) {
        await page.locator('[data-shop-id="royal-gem"]').click();
        assert.equal(await page.locator('#purchase-yes').isDisabled(), true);
        await page.locator('#purchase-no').click();
      }
      if (stage === 10) {
        await buy('royal-gem', true);
        assert.equal(await page.evaluate(() => MG.Game.getState().coins), 6);
        assert.equal(await page.locator('#shop-preview [data-item-id="royal-gem"]').count(), 1);
      }
      await page.locator('#btn-shop-leave').click();
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await start();
    const wrongId = await page.evaluate(() => {
      const round = MG.Logic.round(MG.Game.getState());
      return round.options.find(option => option.id !== round.correctId).id;
    });
    await page.locator('[data-action-id="' + wrongId + '"]').click();
    await page.locator('#react-feedback').waitFor({ state: 'visible' });
    await page.waitForFunction(() => getComputedStyle(document.querySelector('.mg-react')).opacity === '1');
    await page.screenshot({ path: '/tmp/magicat-korean-explanation-mobile.png' });
    await page.locator('#btn-react-next').click();
    await page.locator('#screen-shop').waitFor({ state: 'visible' });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    assert.deepEqual(errors, []);
    console.log('PASS: all four accessory layers plus clothes, cancel/put on/take off, 30-coin final purchase, mobile Korean explanation and shop.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
