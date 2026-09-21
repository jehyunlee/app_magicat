(function (root) {
  'use strict';
  var MG = root.MG = root.MG || {};
  var SAVE_KEY = 'magicat.save.';
  var CARDS_KEY = 'magicat.cards';
  var SLOTS = 3;
  var VERSION = 2;

  function storage() {
    return MG.Store.backend || root.localStorage;
  }

  function readJson(key) {
    try {
      var raw = storage().getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }

  function writeJson(key, value) {
    storage().setItem(key, JSON.stringify(value));
  }

  /* Saves keep ids instead of live objects so old saves survive content updates. */
  function serialize(state) {
    var copy = {};
    Object.keys(state).forEach(function (key) { copy[key] = state[key]; });
    copy.cat = state.cat && state.cat.id ? state.cat.id : state.cat;
    return copy;
  }

  function hydrate(saved) {
    if (!saved || saved.version !== VERSION || !saved.state) return null;
    var cat = MG.CAT_BY_ID[saved.state.cat];
    var character = MG.FAMILY_BY_ID[saved.state.character];
    if (!cat || !character) return null;
    var state = Object.assign({}, saved.state, { cat: cat });
    state.owned = (state.owned || []).filter(function (id) { return MG.SHOP_BY_ID[id]; });
    state.purchased = state.owned.slice();
    state.purchasedTreats = (state.purchasedTreats || []).filter(function (id) { return MG.SHOP_BY_ID[id]; });
    state.equipped = state.equipped || { outfit: null, accessories: {} };
    if (state.equipped.outfit && state.owned.indexOf(state.equipped.outfit) === -1) state.equipped.outfit = null;
    state.equipped.accessories = state.equipped.accessories || {};
    Object.keys(state.equipped.accessories).forEach(function (slot) {
      if (state.owned.indexOf(state.equipped.accessories[slot]) === -1) delete state.equipped.accessories[slot];
    });
    return { slot: saved.slot, savedAt: saved.savedAt, phase: saved.phase, state: state };
  }

  function saveGame(slot, state, phase) {
    if (!(slot >= 1 && slot <= SLOTS) || !state || !state.cat || !state.character) throw new Error('Cannot save this game');
    var record = { version: VERSION, slot: slot, savedAt: Date.now(), phase: phase, state: serialize(state) };
    writeJson(SAVE_KEY + slot, record);
    return record;
  }

  function loadGame(slot) {
    return hydrate(readJson(SAVE_KEY + slot));
  }

  function deleteGame(slot) {
    storage().removeItem(SAVE_KEY + slot);
  }

  function listGames() {
    var slots = [];
    for (var slot = 1; slot <= SLOTS; slot += 1) slots.push({ slot: slot, save: loadGame(slot) });
    return slots;
  }

  /* One card book is shared by every save slot. */
  function listCards() {
    var cards = readJson(CARDS_KEY);
    return Array.isArray(cards) ? cards.filter(function (card) {
      return card && MG.CAT_BY_ID[card.cat] && MG.FAMILY_BY_ID[card.character] && card.scene >= 0 && card.scene < MG.SCENES_PER_PAIR;
    }) : [];
  }

  function addCard(character, cat, scene, stage) {
    var cards = listCards();
    var existing = cards.filter(function (card) {
      return card.character === character && card.cat === cat && card.scene === scene;
    })[0];
    var fresh = !existing;
    if (existing) {
      existing.count += 1;
      existing.lastStage = stage;
    } else {
      cards.push({ character: character, cat: cat, scene: scene, count: 1, stage: stage, lastStage: stage, earnedAt: Date.now() });
    }
    writeJson(CARDS_KEY, cards);
    return { fresh: fresh, card: existing || cards[cards.length - 1], total: cards.length };
  }

  MG.Store = { saveGame: saveGame, loadGame: loadGame, deleteGame: deleteGame, listGames: listGames, listCards: listCards, addCard: addCard, SLOTS: SLOTS, backend: null };
})(globalThis);
