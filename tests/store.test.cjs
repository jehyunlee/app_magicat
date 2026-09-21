const test = require('node:test');
const assert = require('node:assert/strict');
for (const file of ['data/actions', 'data/cats', 'data/book', 'data/shop', 'data/family', 'logic', 'store']) require('../js/' + file + '.js');
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

test('the card book is shared by all saves and counts repeated scenes', () => {
  Store.backend = memory();
  assert.deepEqual(Store.listCards(), []);
  const first = Store.addCard('dad', 'persian', 2, 5);
  assert.equal(first.fresh, true);
  assert.equal(first.total, 1);
  const again = Store.addCard('dad', 'persian', 2, 9);
  assert.equal(again.fresh, false);
  assert.equal(again.card.count, 2);
  assert.equal(again.card.stage, 5);
  Store.addCard('suan', 'bengal', 0, 1);
  Store.saveGame(1, Logic.initial(CATS[0], 'dad'), 'stage');
  Store.saveGame(2, Logic.initial(CATS[5], 'suan'), 'stage');
  assert.equal(Store.listCards().length, 2, 'both saves see the same cards');
  Store.backend.setItem('magicat.cards', JSON.stringify([{ character: 'ghost', cat: 'persian', scene: 0 }, { character: 'mom', cat: 'sphynx', scene: 9 }]));
  assert.deepEqual(Store.listCards(), []);
  assert.equal(FAMILY.length, 4);
});
