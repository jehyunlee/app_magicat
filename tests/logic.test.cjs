const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
for (const file of ['data/actions', 'data/cats', 'data/book', 'data/shop', 'data/family', 'data/levels', 'data/book-advanced', 'logic', 'feedback']) require('../js/' + file + '.js');
const { CATS, ACTION_BY_ID, BOOK, SHOP, Logic, Feedback } = globalThis.MG;

test('content contains English only without Korean translation properties', () => {
  for (const records of [CATS, BOOK, SHOP, Object.values(ACTION_BY_ID)]) {
    for (const record of records) {
      assert.ok(Object.keys(record).every(key => key !== 'ko' && !key.endsWith('Ko')));
      assert.equal(/[가-힣ㄱ-ㅎㅏ-ㅣ]/.test(JSON.stringify(record)), false);
    }
  }
});

const GROUPS = [
  'bowl-shape', 'bowl-material', 'water-place', 'nap-texture',
  'nap-place', 'toy-motion', 'toy-texture', 'treat-flavor',
  'treat-texture', 'brush-type', 'touch-place', 'hideout',
  'perch-height', 'greeting', 'scratch-post', 'sound',
  'play-time', 'window-view', 'bed-shape', 'game-type',
  'plant-treat', 'water-bowl'
];
const TOTAL = Logic.TOTAL_STAGES;

test('176 actions and sixteen cats cover twenty-two individual taste groups', () => {
  assert.equal(globalThis.MG.ACTIONS.length, 176);
  assert.equal(new Set(globalThis.MG.ACTIONS.map(a => a.en)).size, 176);
  assert.equal(new Set(globalThis.MG.ACTIONS.map(a => a.hint)).size, 176);
  assert.deepEqual([...new Set(globalThis.MG.ACTIONS.map(action => action.group))], GROUPS);
  for (const [index, action] of globalThis.MG.ACTIONS.entries()) {
    assert.deepEqual(Object.keys(action).sort(), ['en', 'group', 'hateEn', 'hint', 'id', 'likeEn', 'prop', 'scene']);
    assert.ok(/^[a-z-]+-[1-8]$/.test(action.id));
    assert.equal(action.kind, undefined);
    assert.equal(ACTION_BY_ID[action.id], action);
  }

  assert.equal(CATS.length, 16);
  assert.equal(new Set(CATS.map(c => c.id)).size, 16);
  assert.equal(new Set(CATS.map(c => c.loves.join('|'))).size, 16, 'each cat must have its own taste profile');
  for (const group of GROUPS) {
    const favorites = CATS.flatMap(cat => cat.loves.filter(id => ACTION_BY_ID[id].group === group));
    assert.equal(new Set(favorites).size, 8, 'every alternative is some cat’s favorite');
    assert.equal(globalThis.MG.ACTIONS.filter(a => a.group === group).length, 8);
  }
  for (const cat of CATS) {
    assert.ok(fs.existsSync(path.join(__dirname, '../assets/cats', cat.id + '.png')));
    assert.equal(cat.loves.length, 44);
    assert.equal(cat.hates.length, 132);
    assert.equal(new Set([...cat.loves, ...cat.hates]).size, 176);
    assert.ok(cat.loves.every(id => ACTION_BY_ID[id]));
    assert.ok(cat.hates.every(id => ACTION_BY_ID[id]));
    for (const group of GROUPS) {
      const ids = globalThis.MG.ACTIONS.filter(action => action.group === group).map(action => action.id);
      assert.equal(cat.loves.filter(id => ids.includes(id)).length, 2);
      assert.equal(cat.hates.filter(id => ids.includes(id)).length, 6);
    }
  }
});

test('twenty-two book groups hold fact banks with over a thousand passages each', () => {
  assert.equal(BOOK.length, 22);
  assert.equal(TOTAL, 20);
  assert.deepEqual(BOOK.map(page => page.group), GROUPS);
  for (let i = 0; i < BOOK.length; i++) {
    assert.equal(Object.hasOwn(BOOK[i], 'stage'), false);
    assert.equal(Object.hasOwn(BOOK[i], 'variants'), false);
    const { intro, detail, tip } = BOOK[i].facts;
    assert.ok(intro.length >= 5 && detail.length >= 8 && tip.length >= 5, BOOK[i].group);
    assert.equal(new Set([...intro, ...detail, ...tip]).size, intro.length + detail.length + tip.length, 'no duplicate facts');
    assert.ok(intro.length * detail.length * (detail.length - 1) * tip.length >= 1000, 'at least 1000 passages per page');
  }
});

test('each twenty-stage run samples twenty groups and eighty distinct choices', () => {
  for (const cat of CATS) {
    let state = Logic.initial(cat);
    state.seed = 0x12345678;
    const seenIds = new Set();
    const seenText = new Set();
    const seenGroups = new Set();
    const seenBookIndexes = new Set();
    for (let stage = 1; stage <= TOTAL; stage++) {
      const round = Logic.round(state);
      assert.equal(round.stage, stage);
      assert.equal(round.totalStages, TOTAL);
      assert.equal(round.bodyEn.join(' ').match(/[^.!?]+[.!?]/g)[round.answerIndex].trim(), 'Your cat likes the ' + round.options.find(o => o.loved).hint + '.');
      assert.equal(BOOK[round.bookIndex].group, round.groupId);
      assert.equal(round.page, BOOK[round.bookIndex].page);
      assert.equal(round.titleEn, BOOK[round.bookIndex].titleEn);
      assert.equal(round.askEn, BOOK[round.bookIndex].askEn);
      assert.equal(seenGroups.has(round.groupId), false);
      seenGroups.add(round.groupId);
      seenBookIndexes.add(round.bookIndex);
      assert.equal(round.options.length, 4);
      assert.equal(new Set(round.options.map(o => o.id)).size, 4);
      assert.equal(round.options.filter(o => cat.loves.includes(o.id)).length, 1);
      assert.equal(round.options.filter(o => cat.hates.includes(o.id)).length, 3);
      assert.ok(cat.loves.includes(round.correctId));
      assert.equal(round.options.find(o => o.id === round.correctId).loved, true);
      assert.equal(round.options.find(o => o.id === round.correctId).relationship, 'love');
      assert.equal(Object.hasOwn(round, 'clues'), false);
      assert.ok(round.bodyEn.length >= 2 && round.bodyEn.length <= 3);
      const prose = round.bodyEn.join(' ').toLowerCase();
      for (const action of round.options) {
        assert.ok(prose.includes(action.hint.toLowerCase()), 'every choice has a clue within the prose');
        assert.equal(seenIds.has(action.id), false, 'an action ID cannot repeat for one cat');
        assert.equal(seenText.has(action.en), false, 'an action sentence cannot repeat for one cat');
        seenIds.add(action.id);
        seenText.add(action.en);
      }
      const bank = BOOK[round.bookIndex].facts;
      assert.equal(round.passage.length, 4);
      assert.ok(bank.intro.includes(round.passage[0]) && bank.detail.includes(round.passage[1]) && bank.detail.includes(round.passage[2]) && bank.tip.includes(round.passage[3]));
      assert.notEqual(round.passage[1], round.passage[2]);
      for (const fact of round.passage) {
        assert.ok(prose.includes(fact.toLowerCase()), 'educational facts remain within the book');
      }
      const before = JSON.stringify(state);
      const next = Logic.answer(state, round.correctId);
      assert.equal(JSON.stringify(state), before, 'pure transition must not mutate input');
      assert.equal(next.coins, state.coins + 3);
      assert.equal(next.lastAnswer.shopAfter, Logic.SHOP_STAGES.includes(stage));
      state = next;
    }
    assert.equal(seenIds.size, 80);
    assert.equal(seenText.size, 80);
    assert.equal(seenGroups.size, TOTAL);
    assert.equal(seenBookIndexes.size, TOTAL);
    assert.equal(state.complete, true);
    assert.equal(state.correct, TOTAL);
    assert.equal(state.coins, 6 + 3 * TOTAL);
    assert.equal(state.lastAnswer.shopAfter, true);
    const finalItem = SHOP[0];
    const finalPurchase = Logic.buy(state, finalItem.id);
    assert.equal(finalPurchase.lastPurchase.accepted, true);
    assert.equal(finalPurchase.complete, true);
    assert.equal(finalPurchase.stage, TOTAL + 1);
    assert.ok(finalPurchase.owned.includes(finalItem.id));
    assert.equal(Logic.round(state), null);
    assert.equal(Logic.answer(state, 'bowl-shape-1').lastAnswer.accepted, false);
  }
});

test('different run seeds change groups, choices, passages, and reading prose', () => {
  for (const cat of CATS) {
    const first = { ...Logic.initial(cat), seed: 0x10000001 };
    const second = { ...Logic.initial(cat), seed: 0x20000002 };
    let changedChoices = false;
    let changedBody = false;
    let changedPassage = false;
    let changedGroups = false;
    const firstSet = [], secondSet = [], firstGroups = [], secondGroups = [];
    for (let stage = 1; stage <= TOTAL; stage++) {
      const one = Logic.round(first);
      const two = Logic.round(second);
      if (one.options.map(option => option.id).sort().join('|') !==
          two.options.map(option => option.id).sort().join('|')) changedChoices = true;
      if (one.bodyEn.join(' ') !== two.bodyEn.join(' ')) changedBody = true;
      if (one.passageIndex !== two.passageIndex) changedPassage = true;
      if (one.groupId !== two.groupId) changedGroups = true;
      firstSet.push(...one.options.map(option => option.id));
      secondSet.push(...two.options.map(option => option.id));
      firstGroups.push(one.groupId);
      secondGroups.push(two.groupId);
      Object.assign(first, Logic.answer(first, one.correctId));
      Object.assign(second, Logic.answer(second, two.correctId));
    }
    assert.equal(new Set(firstGroups).size, TOTAL);
    assert.equal(new Set(secondGroups).size, TOTAL);
    assert.deepEqual(firstGroups.length, secondGroups.length);
    assert.equal(changedGroups, true);
    assert.equal(changedChoices, true);
    assert.equal(changedBody, true);
    assert.equal(changedPassage, true);
    assert.notDeepEqual(firstSet.sort(), secondSet.sort(), 'actual sampled membership must change');
  }
});

test('a run seed produces the same twenty-stage groups, choices, and prose every time', () => {
  for (const cat of CATS) {
    const first = { ...Logic.initial(cat), seed: 0x51f15eed };
    const second = { ...Logic.initial(cat), seed: 0x51f15eed };
    for (let stage = 1; stage <= TOTAL; stage++) {
      assert.deepEqual(Logic.round(first), Logic.round(second));
      const id = Logic.round(first).correctId;
      const nextFirst = Logic.answer(first, id);
      const nextSecond = Logic.answer(second, id);
      assert.deepEqual(nextFirst.lastAnswer, nextSecond.lastAnswer);
      Object.assign(first, nextFirst);
      Object.assign(second, nextSecond);
    }
  }
});

test('many fixed seeds vary twenty-group sets and rarely repeat a question', () => {
  const coverage = BOOK.map(() => new Set());
  const templates = new Set();
  const questions = new Map();
  let rounds = 0;
  for (const cat of CATS) {
    const sampledSets = new Set();
    const answersPerGroup = new Map();
    for (let sample = 0; sample < 64; sample++) {
      const state = { ...Logic.initial(cat), seed: Math.imul(sample, 0x9e3779b9) >>> 0 };
      const ids = new Set(), texts = new Set();
      for (let stage = 1; stage <= TOTAL; stage++) {
        const round = Logic.round({ ...state, stage });
        assert.equal(round.options.filter(o => cat.loves.includes(o.id)).length, 1);
        assert.equal(round.options.filter(o => cat.hates.includes(o.id)).length, 3);
        for (const option of round.options) {
          assert.equal(ids.has(option.id), false);
          assert.equal(texts.has(option.en), false);
          ids.add(option.id);
          texts.add(option.en);
          assert.ok(round.bodyEn.join(' ').includes(option.hint));
        }
        coverage[round.bookIndex].add(round.passageIndex);
        templates.add(`${round.bookIndex}:${round.templateIndex}`);
        const key = cat.id + '|' + round.groupId + '|' + round.passageIndex + '|' + round.options.map(o => o.id).join() + '|' + round.answerIndex;
        questions.set(key, (questions.get(key) || 0) + 1);
        rounds++;
        const answerKey = cat.id + '|' + round.groupId;
        answersPerGroup.set(answerKey, (answersPerGroup.get(answerKey) || new Set()).add(round.correctId));
      }
      assert.equal(ids.size, 80);
      sampledSets.add([...ids].sort().join('|'));
    }
    assert.ok(sampledSets.size > 1, 'sampled choices should vary by run seed');
    for (const answers of answersPerGroup.values()) assert.equal(answers.size, 2, 'both favorites appear as answers across plays');
  }
  assert.equal(rounds, 16 * 64 * TOTAL);
  assert.ok(questions.size > rounds * 0.99, 'twenty thousand rounds must almost never repeat a question');
  coverage.forEach((seen, index) => assert.ok(seen.size >= 40, BOOK[index].group + ' should show dozens of distinct passages across 64 seeds'));
  assert.ok([...templates].some(value => value.endsWith(':0')));
  assert.ok([...templates].some(value => value.endsWith(':1')));
  assert.ok([...templates].some(value => value.endsWith(':2')));
});

test('three wrong choices empty the purse and prevent further rewards', () => {
  let state = Logic.initial(CATS[0]);
  for (let i = 0; i < 3; i++) {
    const round = Logic.round(state);
    state = Logic.answer(state, round.options.find(o => o.id !== round.correctId).id);
  }
  assert.equal(state.coins, 0);
  assert.equal(state.gameOver, true);
  assert.equal(state.complete, false);
  assert.equal(state.lastAnswer.shopAfter, false);
  assert.equal(Logic.answer(state, 'headpat').lastAnswer.accepted, false);
});

test('invalid choices do not cost coins or advance stages', () => {
  const state = Logic.initial(CATS[0]);
  const next = Logic.answer(state, 'not-a-choice');
  assert.equal(next.lastAnswer.accepted, false);
  assert.equal(next.coins, state.coins);
  assert.equal(next.stage, state.stage);
});

test('losing the final coin on the final stage is game over, not a win', () => {
  const state = { ...Logic.initial(CATS[0]), stage: TOTAL, coins: 1 };
  const round = Logic.round(state);
  const next = Logic.answer(state, round.options.find(o => o.id !== round.correctId).id);
  assert.equal(next.coins, 0);
  assert.equal(next.gameOver, true);
  assert.equal(next.complete, false);
});

test('final stage shop allows a purchase before the ending', () => {
  const state = { ...Logic.initial(CATS[0]), stage: TOTAL, coins: 6 };
  const round = Logic.round(state);
  const answered = Logic.answer(state, round.correctId);
  assert.equal(answered.complete, true);
  assert.equal(answered.lastAnswer.shopAfter, true);
  const purchased = Logic.buy(answered, SHOP[0].id);
  assert.equal(purchased.lastPurchase.accepted, true);
  assert.equal(purchased.complete, true);
  assert.equal(answered.coins, 9);
  assert.equal(purchased.coins, answered.coins - SHOP[0].price);
});

test('a failed level with coins left still opens its shop', () => {
  const state = Logic.initial(CATS[0]);
  const round = Logic.round(state);
  const next = Logic.answer(state, round.options.find(option => option.id !== round.correctId).id);
  assert.equal(next.coins, 4);
  assert.equal(next.gameOver, false);
  assert.equal(next.lastAnswer.shopAfter, true);
});

test('shop purchases deduct exact prices, equip items, and preserve final coin', () => {
  let state = Logic.initial(CATS[0]);
  for (let i = 0; i < 3; i++) state = Logic.answer(state, Logic.round(state).correctId);
  const items = SHOP || globalThis.MG.SHOP_ITEMS;
  assert.ok(Array.isArray(items));
  for (const kind of ['treat', 'outfit', 'accessory']) {
    const item = items.find(item => item.kind === kind);
    const funded = { ...state, coins: item.price + 1 };
    const next = Logic.buy(funded, item.id);
    assert.equal(next.lastPurchase.accepted, true);
    assert.equal(next.coins, 1);
    assert.ok(next.owned.includes(item.id));
    if (kind === 'treat') assert.ok(next.purchasedTreats.includes(item.id));
    else if (kind === 'accessory') assert.equal(next.equipped.accessories[item.slot], item.id);
    else assert.equal(next.equipped.outfit, item.id);
    assert.equal(Logic.buy(next, item.id).lastPurchase.accepted, false);
    assert.equal(Logic.buy({ ...state, coins: item.price }, item.id).lastPurchase.accepted, false);
  }
  assert.equal(Logic.buy(state, 'not-an-item').lastPurchase.accepted, false);
  const reset = Logic.initial(CATS[0]);
  assert.equal(Logic.buy(reset, items[0].id).lastPurchase.accepted, false);
  assert.deepEqual(reset.owned, []);
  assert.equal(reset.coins, 6);
});

const shopState = coins => {
  const start = Logic.initial(CATS[0]);
  return { ...Logic.answer(start, Logic.round(start).correctId), coins };
};

test('shop has 27 distinct items and its most expensive accessory costs 30 coins', () => {
  assert.equal(SHOP.length, 27);
  assert.equal(new Set(SHOP.map(item => item.id)).size, 27);
  for (const kind of ['treat', 'outfit', 'accessory']) assert.equal(SHOP.filter(item => item.kind === kind).length, 9);
  assert.ok(SHOP.every(item => Number.isInteger(item.price) && item.price > 0));
  assert.equal(Math.max(...SHOP.filter(item => item.kind === 'accessory').map(item => item.price)), 30);
  const middle = new Set(SHOP.map(item => item.price).filter(price => price > 9 && price < 30));
  assert.ok(middle.size >= 9, 'prices must climb gradually between 9 and 30 coins');
  for (const kind of ['treat', 'outfit', 'accessory']) {
    const prices = SHOP.filter(item => item.kind === kind).map(item => item.price);
    assert.deepEqual(prices, [...prices].sort((a, b) => a - b), kind + ' shelf is sorted by price');
  }
  const purchased = Logic.buy(shopState(31), 'royal-gem');
  assert.equal(purchased.coins, 1);
  assert.equal(purchased.equipped.accessories.neck, 'royal-gem');
  assert.equal(Logic.buy(shopState(30), 'royal-gem').lastPurchase.accepted, false);
});

test('clothes and four accessory slots can be worn, replaced and removed independently', () => {
  let state = shopState(100);
  for (const id of ['forest-vest', 'royal-gem', 'leaf-brooch', 'round-glasses', 'star-hatpin']) state = Logic.buy(state, id);
  assert.equal(state.equipped.outfit, 'forest-vest');
  assert.deepEqual(state.equipped.accessories, { neck: 'royal-gem', chest: 'leaf-brooch', face: 'round-glasses', hat: 'star-hatpin' });
  const snapshot = JSON.stringify(state);
  const replacement = Logic.buy(state, 'star-bow');
  assert.equal(JSON.stringify(state), snapshot);
  assert.equal(replacement.equipped.accessories.neck, 'star-bow');
  assert.equal(replacement.equipped.accessories.face, 'round-glasses');
  const withoutGlasses = Logic.equip(state, 'round-glasses');
  assert.equal(withoutGlasses.equipped.accessories.face, undefined);
  assert.equal(withoutGlasses.equipped.accessories.neck, 'royal-gem');
  assert.equal(withoutGlasses.coins, state.coins);
  assert.deepEqual(Logic.equip(withoutGlasses, 'round-glasses').equipped, state.equipped);
  assert.equal(Logic.equip(state, 'night-cape').equipped.outfit, 'forest-vest');
  assert.equal(Logic.equip(state, 'forest-vest').equipped.outfit, null);
});

test('wrong answers name the right action and quote actual evidence with Korean feedback', () => {
  const covered = new Set();
  for (const cat of CATS) {
    for (let seed = 1; seed <= 8; seed++) {
      const state = { ...Logic.initial(cat), seed: Math.imul(seed, 0x9e3779b9) >>> 0 };
      for (let stage = 1; stage <= TOTAL; stage++) {
        const round = Logic.round({ ...state, stage });
        assert.equal(Feedback.explain(round, round.correctId), null);
        assert.equal(Feedback.explain(round, 'not-a-choice'), null);
        for (const selected of round.options.filter(option => option.id !== round.correctId)) {
          const explanation = Feedback.explain(round, selected.id);
          assert.equal(explanation.correct.id, round.correctId);
          assert.equal(explanation.selected.id, selected.id);
          assert.ok(round.bodyEn.join(' ').includes(explanation.correctQuote));
          assert.ok(round.bodyEn.join(' ').includes(explanation.selectedQuote));
          assert.ok(explanation.selectedQuote.includes('does not like'));
          assert.match(explanation.explanationKo, /본문/);
          assert.match(explanation.explanationKo, /좋아하지/);
          assert.ok(explanation.explanationKo.includes(explanation.correct.en));
          covered.add(selected.id);
        }
      }
    }
  }
  assert.equal(covered.size, 176);
});

test('feedback refuses to invent evidence that is not in the current page', () => {
  const round = Logic.round(Logic.initial(CATS[0]));
  const wrong = round.options.find(option => option.id !== round.correctId);
  assert.throws(() => Feedback.explain({ ...round, bodyEn: ['No taste information here.'] }, wrong.id), /actual text/);
});

test('the answer sentence lands anywhere in the passage, not only at the start', () => {
  const positions = new Map();
  for (const cat of CATS) {
    for (let seed = 1; seed <= 6; seed++) {
      const state = { ...Logic.initial(cat, 'dad'), seed: Math.imul(seed, 0x9e3779b9) >>> 0 };
      for (let stage = 1; stage <= TOTAL; stage++) {
        const round = Logic.round({ ...state, stage });
        const sentences = round.bodyEn.join(' ').match(/[^.!?]+[.!?]/g).map(s => s.trim());
        assert.equal(sentences.length, 8);
        assert.deepEqual(sentences.filter(s => round.passage.includes(s)), round.passage, 'facts keep their order');
        positions.set(round.answerIndex, (positions.get(round.answerIndex) || 0) + 1);
      }
    }
  }
  assert.equal(positions.size, 8, 'every sentence slot hosts the answer sometimes');
  const total = [...positions.values()].reduce((a, b) => a + b, 0);
  for (const count of positions.values()) assert.ok(count > total / 24, 'no slot is starved');
});

test('character is stored in the run state and rejected when unknown', () => {
  assert.equal(Logic.initial(CATS[0], 'suan').character, 'suan');
  assert.equal(Logic.initial(CATS[0], 'stranger').character, null);
  assert.equal(Logic.answer(Logic.initial(CATS[0], 'mom'), Logic.round(Logic.initial(CATS[0], 'mom')).correctId).character, 'mom');
});

test('reading level follows the player: direct, one-step inference, or CSAT-style advanced', () => {
  const { BOOK_ADVANCED, LEVELS, FAMILY } = globalThis.MG;
  assert.deepEqual(FAMILY.map(m => m.level), ['basic', 'basic', 'basic', 'basic', 'advanced', 'inference']);
  assert.equal(Object.keys(BOOK_ADVANCED).length, BOOK.length);
  for (const page of BOOK) {
    const bank = BOOK_ADVANCED[page.group];
    assert.ok(bank.intro.length >= 5 && bank.detail.length >= 8 && bank.tip.length >= 5, page.group);
    const words = s => s.match(/[A-Za-z]+(?:[’'][A-Za-z]+)?/g) || [];
    const advancedAvg = [...bank.intro, ...bank.detail, ...bank.tip].reduce((a, s) => a + words(s).length, 0) / (bank.intro.length + bank.detail.length + bank.tip.length);
    const basicAvg = [...page.facts.intro, ...page.facts.detail, ...page.facts.tip].reduce((a, s) => a + words(s).length, 0) / (page.facts.intro.length + page.facts.detail.length + page.facts.tip.length);
    assert.ok(advancedAvg >= 12 && advancedAvg > basicAvg * 1.5, page.group + ' advanced sentences must be far longer');
  }
  const seenTemplates = { inference: new Set(), advanced: new Set() };
  for (const cat of CATS) {
    for (let seed = 1; seed <= 4; seed++) {
      for (const [who, level] of [['suan', 'basic'], ['yewon', 'inference'], ['hunho', 'advanced']]) {
        const state = { ...Logic.initial(cat, who), seed: Math.imul(seed, 0x9e3779b9) >>> 0 };
        for (let stage = 1; stage <= TOTAL; stage++) {
          const round = Logic.round({ ...state, stage });
          assert.equal(round.level, level);
          const text = round.bodyEn.join(' ');
          const liked = round.options.find(o => o.loved);
          const sentences = text.match(/[^.!?]+[.!?]/g).map(s => s.trim());
          assert.equal(sentences.length, 8);
          for (const option of round.options) assert.ok(text.includes(option.hint), 'every choice has a clue');
          if (level === 'basic') {
            assert.ok(text.includes('Your cat likes the ' + liked.hint + '.'));
          } else {
            assert.equal(text.includes('Your cat likes the '), false, 'non-basic tiers never state the taste directly');
            assert.equal(text.includes('does not like the '), false);
            const likedTemplates = LEVELS[level].liked.map(tpl => tpl.replace('{h}', liked.hint));
            assert.ok(likedTemplates.some(s => sentences.includes(s)), 'liked sentence uses a tier template');
            seenTemplates[level].add(likedTemplates.findIndex(s => sentences.includes(s)));
            for (const option of round.options.filter(o => !o.loved)) {
              const dislikedTemplates = LEVELS[level].disliked.map(tpl => tpl.replace('{h}', option.hint));
              assert.ok(dislikedTemplates.some(s => sentences.includes(s)), 'disliked sentence uses a tier template');
            }
            const facts = level === 'advanced' ? BOOK_ADVANCED[round.groupId] : BOOK[round.bookIndex].facts;
            assert.ok(round.passage.every(f => [...facts.intro, ...facts.detail, ...facts.tip].includes(f)), 'facts come from the tier bank');
          }
          for (const option of round.options.filter(o => !o.loved)) {
            const fb = Feedback.explain(round, option.id);
            assert.ok(sentences.includes(fb.correctQuote) && sentences.includes(fb.selectedQuote));
            assert.match(fb.explanationKo, level === 'basic' ? /likes/ : level === 'inference' ? /추리/ : /수능/);
          }
        }
      }
    }
  }
  assert.ok(seenTemplates.inference.size >= 4 && seenTemplates.advanced.size >= 4, 'liked templates vary between rounds');
});
