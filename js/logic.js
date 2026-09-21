(function (root) {
  'use strict';

  var MG = (root.MG = root.MG || {});
  var START_COINS = 6;
  var RIGHT_REWARD = 3;
  var WRONG_PENALTY = -2;
  var TOTAL_STAGES = 10;
  var SHOP_STAGES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  function listCopy(value) {
    return Array.isArray(value) ? value.slice() : [];
  }

  function catFor(value) {
    if (!value) return null;
    if (typeof value === 'string') return MG.CAT_BY_ID && MG.CAT_BY_ID[value] || null;
    if (value.id && MG.CAT_BY_ID && MG.CAT_BY_ID[value.id]) return MG.CAT_BY_ID[value.id];
    return value;
  }

  function actionFor(id) {
    return MG.ACTION_BY_ID && MG.ACTION_BY_ID[id] || null;
  }

  function validIds(list) {
    var ids = [];
    var values = listCopy(list);
    var i;
    for (i = 0; i < values.length; i += 1) {
      if (actionFor(values[i]) && ids.indexOf(values[i]) === -1) ids.push(values[i]);
    }
    return ids;
  }

  function nextSeed(seed) {
    return (Math.imul(seed >>> 0, 1664525) + 1013904223) >>> 0;
  }

  function runSeed(state) {
    var value = Number(state && state.seed);
    return isFinite(value) ? (value >>> 0) : 1;
  }

  function shuffled(values, seed) {
    var result = listCopy(values);
    var i;
    var j;
    var held;
    for (i = result.length - 1; i > 0; i -= 1) {
      seed = nextSeed(seed);
      j = Math.floor(seed / 4294967296 * (i + 1));
      held = result[i];
      result[i] = result[j];
      result[j] = held;
    }
    return result;
  }

  function stageSeed(seed, stage) {
    return (seed ^ Math.imul(stage, 2654435761)) >>> 0;
  }

  function pickIndex(length, seed) {
    if (!length) throw new Error('A question needs reading variants');
    // Avalanche nearby seeds before choosing from a small variant pool.
    var mixed = seed >>> 0;
    mixed = Math.imul(mixed ^ (mixed >>> 16), 0x85ebca6b);
    mixed = Math.imul(mixed ^ (mixed >>> 13), 0xc2b2ae35);
    mixed = (mixed ^ (mixed >>> 16)) >>> 0;
    return Math.floor(mixed / 4294967296 * length);
  }

  function passagesFor(page) {
    var variants = page && Array.isArray(page.variants) ? page.variants : [];
    return variants.map(function (variant) {
      return listCopy(variant);
    });
  }

  function bookEntries() {
    var entries = [];
    var seen = {};
    var books = Array.isArray(MG.BOOK) ? MG.BOOK : [];
    var i;
    var page;
    var groupId;
    for (i = 0; i < books.length; i += 1) {
      page = books[i];
      groupId = page && page.group;
      if (!groupId || seen[groupId]) continue;
      seen[groupId] = true;
      entries.push({ groupId: groupId, bookIndex: i, page: page });
    }
    return entries;
  }

  function actionsForGroup(groupId) {
    var actions = [];
    var source = Array.isArray(MG.ACTIONS) ? MG.ACTIONS : [];
    var i;
    for (i = 0; i < source.length; i += 1) {
      if (source[i] && source[i].group === groupId) actions.push(source[i]);
    }
    return actions;
  }

  function scheduleFor(cat, seed) {
    var entries = bookEntries();
    var loves = validIds(cat && cat.loves);
    var hates = validIds(cat && cat.hates);
    var selected;
    var loveSet = {};
    var hateSet = {};
    var stages = [];
    var i;
    var entry;
    var actions;
    var loved;
    var hated;
    var optionActions;
    var selectedCount;
    if (entries.length < TOTAL_STAGES) {
      throw new Error('Book needs at least ten unique groups');
    }
    for (i = 0; i < loves.length; i += 1) loveSet[loves[i]] = true;
    for (i = 0; i < hates.length; i += 1) hateSet[hates[i]] = true;
    for (i = 0; i < loves.length; i += 1) {
      if (hateSet[loves[i]]) {
        throw new Error('Cat loved and disliked actions overlap: ' + (cat && cat.id));
      }
    }
    selected = shuffled(entries.map(function (item) { return item; }), seed ^ 0x9e3779b9);
    selectedCount = Math.min(TOTAL_STAGES, selected.length);
    for (i = 0; i < selectedCount; i += 1) {
      entry = selected[i];
      actions = actionsForGroup(entry.groupId);
      loved = actions.filter(function (action) { return !!loveSet[action.id]; });
      hated = actions.filter(function (action) { return !!hateSet[action.id]; });
      if (actions.length !== 4 || loved.length !== 1 || hated.length !== 3) {
        throw new Error('Cat needs one loved and three disliked actions in group ' + entry.groupId);
      }
      optionActions = shuffled(actions, stageSeed(seed, i + 1) ^ 0x6d2b79f5);
      stages.push({
        groupId: entry.groupId,
        bookIndex: entry.bookIndex,
        loved: loved[0],
        hated: hated,
        actions: optionActions
      });
    }
    return stages;
  }

  function option(action, loved) {
    var copy = {};
    var key;
    if (!action) return null;
    for (key in action) {
      if (Object.prototype.hasOwnProperty.call(action, key)) copy[key] = action[key];
    }
    copy.relationship = loved ? 'love' : 'hate';
    copy.loved = !!loved;
    return copy;
  }

  function makeBody(passage, loved, hated, templateIndex) {
    var facts = listCopy(passage);
    var firstHated = hated[0].hint;
    var secondHated = hated[1].hint;
    var thirdHated = hated[2].hint;
    if (templateIndex === 1) {
      return [
        facts[0] + ' ' + facts[1] + ' Your cat likes the ' + loved.hint + '.',
        facts[2] + ' ' + facts[3] + ' Your cat does not like the ' + firstHated +
          '. It does not like the ' + secondHated + '. It does not like the ' + thirdHated + '.'
      ];
    }
    if (templateIndex === 2) {
      return [
        facts[0] + ' Your cat likes the ' + loved.hint + '. ' + facts[1],
        facts[2] + ' Your cat does not like the ' + firstHated + '. ' + facts[3] +
          ' It does not like the ' + secondHated + '. It does not like the ' + thirdHated + '.'
      ];
    }
    return [
      facts[0] + ' Your cat likes the ' + loved.hint + '. ' + facts[1],
      facts[2] + ' ' + facts[3] + ' Your cat does not like the ' + firstHated +
        '. It does not like the ' + secondHated + '. It does not like the ' + thirdHated + '.'
    ];
  }

  function cloneState(state) {
    var next = {};
    var key;
    state = state || {};
    for (key in state) {
      if (Object.prototype.hasOwnProperty.call(state, key)) next[key] = state[key];
    }
    next.owned = listCopy(state.owned || state.purchased);
    next.purchased = next.owned.slice();
    next.purchasedTreats = listCopy(state.purchasedTreats);
    next.history = listCopy(state.history);
    next.equipped = {
      outfit: state.equipped && state.equipped.outfit || null,
      accessory: state.equipped && state.equipped.accessory || null
    };
    return next;
  }

  function initial(cat) {
    var chosen = catFor(cat);
    return {
      cat: chosen,
      seed: Math.floor(Math.random() * 4294967296),
      stage: 1,
      coins: START_COINS,
      correct: 0,
      wrong: 0,
      answeredCount: 0,
      answered: false,
      gameOver: false,
      complete: false,
      owned: [],
      purchased: [],
      purchasedTreats: [],
      equipped: { outfit: null, accessory: null },
      history: [],
      lastAnswer: null,
      lastPurchase: null
    };
  }

  /*
   * MG.Logic.round(state) -> a fresh render descriptor for state.stage.
   * It contains one option from cat.loves and three from cat.hates.  It does
   * not mutate state; `correctId` is for the answer checker, not the UI.
   */
  function round(state) {
    var cat = catFor(state && state.cat);
    var stage = Number(state && state.stage) || 1;
    var page;
    var loved;
    var hated;
    var schedule;
    var seed;
    var variants;
    var passageIndex;
    var templateIndex;
    var contentSeed;
    var scheduled;
    var options;
    var i;
    if (!cat || !MG.BOOK || stage < 1 || stage > TOTAL_STAGES) return null;
    seed = runSeed(state);
    schedule = scheduleFor(cat, seed);
    scheduled = schedule[stage - 1];
    if (!scheduled) return null;
    page = MG.BOOK[scheduled.bookIndex];
    loved = scheduled.loved;
    hated = scheduled.hated;
    variants = passagesFor(page);
    contentSeed = stageSeed(seed, stage) ^
      Math.imul(scheduled.bookIndex + 1, 2246822519);
    passageIndex = pickIndex(variants.length, contentSeed ^ 0x4f1bbcdc);
    templateIndex = pickIndex(3, contentSeed ^ 0x9e3779b9);
    options = scheduled.actions.map(function (action) {
      return option(action, action.id === loved.id);
    });
    for (i = 0; i < options.length; i += 1) {
      if (!options[i]) return null;
    }
    return {
      stage: stage,
      groupId: scheduled.groupId,
      bookIndex: scheduled.bookIndex,
      page: page.page,
      titleEn: page.titleEn,
      bodyEn: makeBody(variants[passageIndex], loved, hated, templateIndex),
      passage: variants[passageIndex].slice(),
      passageIndex: passageIndex,
      templateIndex: templateIndex,
      askEn: page.askEn,
      options: options,
      correctId: loved && loved.id,
      shopAfter: SHOP_STAGES.indexOf(stage) !== -1
    };
  }

  function rejectedAnswer(state, reason) {
    var next = cloneState(state || initial(null));
    next.lastAnswer = { accepted: false, reason: reason || 'invalid-answer' };
    next.answerAccepted = false;
    return next;
  }

  /*
   * MG.Logic.answer(state, id) -> a new state.  Answering resolves the current
   * page and advances `stage`; details for the reaction overlay are in
   * `lastAnswer`. Invalid options are rejected. The controller locks input
   * until the reaction has been dismissed before presenting the next page.
   */
  function answer(state, id) {
    var current = state || initial(null);
    var descriptor;
    var selected;
    var next;
    var delta;
    var coins;
    var completedStage;
    var gameOver;
    var outcome;
    var currentCoins;
    if (current.answered) return rejectedAnswer(current, 'already-answered');
    currentCoins = Number(current.coins);
    if (!isFinite(currentCoins)) currentCoins = START_COINS;
    if (current.gameOver || currentCoins <= 0) return rejectedAnswer(current, 'game-over');
    descriptor = round(current);
    if (!descriptor) return rejectedAnswer(current, 'complete');
    selected = descriptor.options.filter(function (item) { return item && item.id === id; })[0];
    if (!selected) return rejectedAnswer(current, 'unknown-option');

    completedStage = descriptor.stage;
    delta = selected.id === descriptor.correctId ? RIGHT_REWARD : WRONG_PENALTY;
    coins = Math.max(0, currentCoins + delta);
    gameOver = coins === 0;
    next = cloneState(current);
    next.stage = completedStage + 1;
    next.coins = coins;
    next.correct = (Number(current.correct) || 0) + (delta > 0 ? 1 : 0);
    next.wrong = (Number(current.wrong) || 0) + (delta < 0 ? 1 : 0);
    next.answeredCount = (Number(current.answeredCount) || 0) + 1;
    next.answered = false;
    next.gameOver = gameOver;
    next.complete = !gameOver && completedStage === TOTAL_STAGES;
    outcome = {
      accepted: true,
      stage: completedStage,
      actionId: selected.id,
      action: selected,
      correct: delta > 0,
      coinDelta: delta,
      coins: coins,
      gameOver: gameOver,
      complete: next.complete,
      shopAfter: !gameOver && SHOP_STAGES.indexOf(completedStage) !== -1,
      nextStage: next.stage
    };
    next.lastAnswer = outcome;
    next.answerAccepted = true;
    next.history.push({ stage: completedStage, actionId: selected.id, correct: outcome.correct, coinDelta: delta });
    return next;
  }

  function rejectedPurchase(state, reason, item) {
    var next = cloneState(state || initial(null));
    next.lastPurchase = { accepted: false, reason: reason || 'cannot-buy', item: item || null, coins: Number(next.coins) || 0 };
    next.purchaseAccepted = false;
    next.purchaseReason = reason || 'cannot-buy';
    return next;
  }

  /*
   * MG.Logic.buy(state, id) -> a new state.  A purchase is legal only when it
   * leaves at least one coin (`coins - price >= 1`), and each item can be owned
   * once.  Outfit/accessory purchases immediately become equipped.
   */
  function buy(state, id) {
    var current = state || initial(null);
    var item = MG.SHOP_BY_ID && MG.SHOP_BY_ID[id];
    var next;
    var coins;
    var owned;
    if (current.gameOver || !current.lastAnswer || !current.lastAnswer.accepted ||
        !current.lastAnswer.shopAfter || current.stage !== current.lastAnswer.stage + 1 ||
        (current.lastAnswer.stage === TOTAL_STAGES && !current.complete) ||
        (current.lastAnswer.stage !== TOTAL_STAGES && current.complete)) {
      return rejectedPurchase(current, 'shop-closed', item);
    }
    if (!item) return rejectedPurchase(current, 'unknown-item');
    owned = listCopy(current.owned || current.purchased);
    if (owned.indexOf(item.id) !== -1) return rejectedPurchase(current, 'already-owned', item);
    coins = Number(current.coins) || 0;
    if (coins - Number(item.price) < 1) return rejectedPurchase(current, 'keep-one-coin', item);

    next = cloneState(current);
    next.coins = coins - Number(item.price);
    next.owned.push(item.id);
    next.purchased = next.owned.slice();
    if (item.kind === 'treat') {
      next.purchasedTreats.push(item.id);
    } else if (item.kind === 'outfit') {
      next.equipped.outfit = item.id;
    } else if (item.kind === 'accessory') {
      next.equipped.accessory = item.id;
    }
    next.lastPurchase = {
      accepted: true,
      item: item,
      itemId: item.id,
      coins: next.coins,
      kind: item.kind
    };
    next.purchaseAccepted = true;
    next.purchaseReason = '';
    return next;
  }

  MG.Logic = {
    initial: initial,
    round: round,
    answer: answer,
    buy: buy,
    START_COINS: START_COINS,
    RIGHT_REWARD: RIGHT_REWARD,
    WRONG_PENALTY: WRONG_PENALTY,
    TOTAL_STAGES: TOTAL_STAGES,
    SHOP_STAGES: SHOP_STAGES.slice()
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);
