const test = require('node:test');
const assert = require('node:assert/strict');
require('../js/data/actions.js');
require('../js/data/cats.js');
require('../js/data/book.js');
require('../js/logic.js');
const { ACTIONS, BOOK, CATS, Logic } = globalThis.MG;
const words = text => text.match(/[A-Za-z]+(?:['’][A-Za-z]+)?/g) || [];

test('reading facts and choice buttons use short English sentences', () => {
  for (const page of BOOK) {
    for (const passage of page.variants) {
      for (const sentence of passage) {
        assert.ok(words(sentence).length <= 10, sentence);
      }
    }
    assert.ok(words(page.askEn).length <= 10, page.askEn);
  }
  for (const action of ACTIONS) {
    assert.ok(words(action.en).length <= 10, action.en);
    assert.ok(words(action.hint).length <= 9, action.hint);
    assert.equal(/^(a|an|the)\b/i.test(action.hint), false, 'the story adds its own article');
  }
});

test('hard vocabulary is replaced in player-facing reading content', () => {
  const text = [
    ...ACTIONS.flatMap(action => [action.en, action.hint, action.likeEn, action.hateEn]),
    ...BOOK.flatMap(page => [page.titleEn, page.askEn, ...page.variants.flat()])
  ].join(' ');
  assert.doesNotMatch(text, /\b(aroma|ceramic|silicone|preference|bristles|gobbling|sheltered|texture|sensory)\b/i);
});

test('assembled story paragraphs also keep their sentences short', () => {
  for (const cat of CATS) {
    for (let seed = 1; seed <= 8; seed++) {
      const state = { ...Logic.initial(cat), seed: Math.imul(seed, 0x9e3779b9) >>> 0 };
      for (let stage = 1; stage <= 10; stage++) {
        const round = Logic.round({ ...state, stage });
        const text = round.bodyEn.join(' ');
        const liked = round.options.find(option => option.id === round.correctId);
        assert.ok(text.includes('Your cat likes the ' + liked.hint + '.'));
        for (const option of round.options.filter(option => option.id !== round.correctId)) {
          assert.ok(text.includes('does not like the ' + option.hint + '.'));
        }
        assert.doesNotMatch(text, /\b(skips|walks past|loses interest|turns elsewhere|returns for more)\b/i);
        for (const sentence of round.bodyEn.join(' ').split(/[.!?]+/).filter(Boolean)) {
          assert.ok(words(sentence).length <= 12, sentence);
        }
      }
    }
  }
});
