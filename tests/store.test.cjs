const test = require('node:test');
const assert = require('node:assert/strict');
for (const file of ['data/actions', 'data/cats', 'data/book', 'data/shop', 'data/family', 'data/levels', 'data/book-advanced', 'logic', 'store']) require('../js/' + file + '.js');
const { CATS, Logic, Store, FAMILY } = globalThis.MG;
const memory = () => {
  const map = new Map();
  return { getItem: k => (map.has(k) ? map.get(k) : null), setItem: (k, v) => map.set(k, String(v)), removeItem: k => map.delete(k), map };
};

test('saved games restore the exact run, character and equipment from ids', () => {
  Store.backend = memory();
  let state = Logic.initial(CATS[3], 'jeongan');
  state.seed = 0xabcdef01;
  state = Logic.answer(state, Logic.round(state).correctId);
  state = Logic.buy({ ...state, coins: 40 }, 'velvet-cape');
  state = Logic.buy(state, 'moon-medal');
  const record = Store.saveGame(2, state, 'shop');
  assert.equal(record.state.cat, CATS[3].id, 'saves store the cat id, not the object');
  const loaded = Store.loadGame(2);
  assert.equal(loaded.phase, 'shop');
  assert.equal(loaded.state.cat, CATS[3]);
  assert.equal(loaded.state.character, 'jeongan');
  assert.equal(loaded.state.seed, 0xabcdef01);
  assert.equal(loaded.state.stage, 2);
  assert.deepEqual(loaded.state.equipped, { outfit: 'velvet-cape', accessories: { neck: 'moon-medal' } });
  assert.deepEqual(Logic.round(loaded.state).options.map(o => o.id), Logic.round(state).options.map(o => o.id), 'the same pages continue');
  assert.deepEqual(Store.listGames().map(entry => Boolean(entry.save)), [false, true, false]);
  Store.deleteGame(2);
  assert.equal(Store.loadGame(2), null);
  assert.throws(() => Store.saveGame(2, Logic.initial(CATS[0]), 'stage'), /Cannot save/);
  assert.throws(() => Store.saveGame(9, state, 'stage'), /Cannot save/);
});

test('corrupt or outdated saves load as empty instead of crashing', () => {
  Store.backend = memory();
  Store.backend.setItem('magicat.save.1', '{not json');
  Store.backend.setItem('magicat.save.3', JSON.stringify({ version: 1, state: { cat: 'persian', character: 'dad' } }));
  assert.equal(Store.loadGame(1), null);
  assert.equal(Store.loadGame(3), null);
});

test('each player owns a card book that other players cannot see', () => {
  Store.backend = memory();
  assert.deepEqual(Store.listCards('dad'), []);
  const first = Store.addCard('dad', 'persian', 2, 5);
  assert.equal(first.fresh, true);
  assert.equal(first.total, 1);
  const again = Store.addCard('dad', 'persian', 2, 9);
  assert.equal(again.fresh, false);
  assert.equal(again.card.count, 2);
  assert.equal(again.card.stage, 5);
  Store.addCard('suan', 'bengal', 0, 1);
  assert.equal(Store.listCards('dad').length, 1, 'Dad only sees his own cards');
  assert.equal(Store.listCards('suan').length, 1, 'Suan only sees her own cards');
  assert.deepEqual(Store.listCards('mom'), []);
  assert.deepEqual(Store.listCards('nobody'), []);
  assert.throws(() => Store.addCard('nobody', 'persian', 0, 1), /family member/);
  // Two saves by the same player share that player's book; another player's save does not.
  Store.saveGame(1, Logic.initial(CATS[0], 'dad'), 'stage');
  Store.saveGame(2, Logic.initial(CATS[5], 'dad'), 'stage');
  Store.saveGame(3, Logic.initial(CATS[7], 'suan'), 'stage');
  for (const slot of [1, 2]) assert.equal(Store.listCards(Store.loadGame(slot).state.character).length, 1);
  assert.equal(Store.listCards(Store.loadGame(3).state.character)[0].cat, 'bengal');
  Store.backend.setItem('magicat.cards.mom', JSON.stringify([{ character: 'dad', cat: 'persian', scene: 0 }, { character: 'mom', cat: 'sphynx', scene: 99 }]));
  assert.deepEqual(Store.listCards('mom'), [], 'cards filed under the wrong player or invalid scenes are ignored');
  assert.equal(FAMILY.length, 6);
  assert.deepEqual(FAMILY.map(member => member.id), ['dad', 'mom', 'jeongan', 'suan', 'hunho', 'yewon']);
});

test('each clear draws a random card the player does not own yet, with no repeats until the set is complete', () => {
  Store.backend = memory();
  const { SCENES_PER_PAIR } = globalThis.MG;
  assert.equal(SCENES_PER_PAIR, 24);
  let seed = 7;
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  const drawn = [];
  for (let i = 0; i < SCENES_PER_PAIR; i++) {
    const scene = Store.drawScene('mom', 'ragdoll', random);
    assert.equal(drawn.includes(scene), false, 'no repeat before all 24 are owned');
    drawn.push(scene);
    assert.equal(Store.addCard('mom', 'ragdoll', scene, i + 1).fresh, true);
  }
  assert.equal(new Set(drawn).size, SCENES_PER_PAIR);
  assert.notDeepEqual(drawn, [...drawn].sort((a, b) => a - b), 'draws are random, not sequential');
  // A 20-stage run never repeats: 20 < 24 unique scenes.
  const repeat = Store.drawScene('mom', 'ragdoll', random);
  assert.equal(Store.addCard('mom', 'ragdoll', repeat, 25).fresh, false);
  const second = Store.drawScene('mom', 'ragdoll', random);
  assert.notEqual(second, repeat, 'after the set is complete, the least-seen card comes first');
  // Other cats and other players are untouched.
  assert.equal(Store.listCards('mom').filter(card => card.cat === 'persian').length, 0);
  assert.deepEqual(Store.listCards('dad'), []);
  assert.throws(() => Store.addCard('mom', 'ragdoll', 24, 1), /Unknown scene/);
});
