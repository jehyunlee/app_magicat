(function (root) {
  'use strict';

  var MG = (root.MG = root.MG || {});
  var START_COINS = 6;
  var RIGHT_REWARD = 3;
  var WRONG_PENALTY = -2;
  var TOTAL_STAGES = 20;
  var SHOP_STAGES = [];
  for (var shopStage = 1; shopStage <= TOTAL_STAGES; shopStage += 1) SHOP_STAGES.push(shopStage);

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

  /*
   * One intro, two details and one tip are drawn from the page's fact bank.
   * passageIndex encodes the four choices so replays can be compared.
   */
  function readingLevel(state) {
    var member = MG.FAMILY_BY_ID && MG.FAMILY_BY_ID[state && state.character];
    return member && MG.LEVELS && MG.LEVELS[member.level] ? member.level : 'basic';
  }

  /* Advanced readers get the CSAT-register fact bank for the same page. */
  function factBank(page, level) {
    var advanced = level === 'advanced' && MG.BOOK_ADVANCED && MG.BOOK_ADVANCED[page.group];
    return advanced || page.facts;
  }

  function composePassage(page, seed, level) {
    var facts = factBank(page, level);
    var intro = pickIndex(facts.intro.length, seed ^ 0x4f1bbcdc);
    var details = shuffled(facts.detail.map(function (_, index) { return index; }), seed ^ 0x2545f491).slice(0, 2);
    var tip = pickIndex(facts.tip.length, seed ^ 0x7f4a7c15);
    return {
      passage: [facts.intro[intro], facts.detail[details[0]], facts.detail[details[1]], facts.tip[tip]],
      passageIndex: ((intro * 100 + details[0]) * 100 + details[1]) * 100 + tip
    };
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
      throw new Error('Book needs at least ' + TOTAL_STAGES + ' unique groups');
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
      if (loved.length < 1 || hated.length < 3) {
        throw new Error('Cat needs a loved and three disliked actions in group ' + entry.groupId);
      }
      // Each play draws one of the cat's favorites and three of its dislikes.
      loved = loved[pickIndex(loved.length, stageSeed(seed, i + 1) ^ 0x3c6ef372)];
      hated = shuffled(hated, stageSeed(seed, i + 1) ^ 0x1b873593).slice(0, 3);
      optionActions = shuffled([loved].concat(hated), stageSeed(seed, i + 1) ^ 0x6d2b79f5);
      stages.push({
        groupId: entry.groupId,
        bookIndex: entry.bookIndex,
        loved: loved,
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

  var PARAGRAPH_SHAPES = [[3, 3, 2], [4, 4], [2, 3, 3]];

  /*
   * The four facts keep their order; the four taste sentences are dropped into
   * seeded gaps between them, so the answer can sit anywhere in the passage.
   * Returns { paragraphs, answerIndex } where answerIndex counts sentences.
   */
  function makeBody(passage, loved, hated, templateIndex, seed, level) {
    var facts = listCopy(passage);
    var bank = MG.LEVELS[level] || MG.LEVELS.basic;
    var likedIndex = pickIndex(bank.liked.length, seed ^ 0x3c6ef372);
    var dislikeOrder = shuffled(bank.disliked.map(function (_, index) { return index; }), seed ^ 0x1b873593);
    var likedSentence = MG.tasteSentence(level, true, loved.hint, likedIndex);
    var taste = shuffled([
      likedSentence,
      MG.tasteSentence(level, false, hated[0].hint, dislikeOrder[0]),
      MG.tasteSentence(level, false, hated[1].hint, dislikeOrder[1]),
      MG.tasteSentence(level, false, hated[2].hint, dislikeOrder[2])
    ], seed ^ 0x27d4eb2f);
    var sentences = [];
    var slots = shuffled([0, 1, 2, 3, 4, 5, 6, 7], seed ^ 0x165667b1).slice(0, 4).sort(function (a, b) { return a - b; });
    var answerIndex = -1;
    var paragraphs = [];
    var shape = PARAGRAPH_SHAPES[templateIndex];
    var cursor = 0;
    var i;
    for (i = 0; i < 8; i += 1) {
      sentences.push(slots.indexOf(i) !== -1 ? taste[slots.indexOf(i)] : facts[i - slots.filter(function (slot) { return slot < i; }).length]);
    }
    answerIndex = sentences.indexOf(likedSentence);
    for (i = 0; i < shape.length; i += 1) {
      paragraphs.push(sentences.slice(cursor, cursor + shape[i]).join(' '));
      cursor += shape[i];
    }
    return { paragraphs: paragraphs, answerIndex: answerIndex };
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
      accessories: Object.assign({}, state.equipped && state.equipped.accessories)
    };
    return next;
  }

  function initial(cat, characterId) {
    var chosen = catFor(cat);
    return {
      cat: chosen,
      character: MG.FAMILY_BY_ID && MG.FAMILY_BY_ID[characterId] ? characterId : null,
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
      equipped: { outfit: null, accessories: {} },
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
    var composed;
    var templateIndex;
    var contentSeed;
    var scheduled;
    var options;
    var body;
    var level;
    var i;
    if (!cat || !MG.BOOK || stage < 1 || stage > TOTAL_STAGES) return null;
    level = readingLevel(state);
    seed = runSeed(state);
    schedule = scheduleFor(cat, seed);
    scheduled = schedule[stage - 1];
    if (!scheduled) return null;
    page = MG.BOOK[scheduled.bookIndex];
    loved = scheduled.loved;
    hated = scheduled.hated;
    contentSeed = stageSeed(seed, stage) ^
      Math.imul(scheduled.bookIndex + 1, 2246822519);
    composed = composePassage(page, contentSeed, level);
    templateIndex = pickIndex(3, contentSeed ^ 0x9e3779b9);
    options = scheduled.actions.map(function (action) {
      return option(action, action.id === loved.id);
    });
    for (i = 0; i < options.length; i += 1) {
      if (!options[i]) return null;
    }
    body = makeBody(composed.passage, loved, hated, templateIndex, contentSeed, level);
    return {
      stage: stage,
      totalStages: TOTAL_STAGES,
      level: level,
      groupId: scheduled.groupId,
      bookIndex: scheduled.bookIndex,
      page: page.page,
      titleEn: page.titleEn,
      bodyEn: body.paragraphs,
      answerIndex: body.answerIndex,
      passage: composed.passage.slice(),
      passageIndex: composed.passageIndex,
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
      next.equipped.accessories[item.slot] = item.id;
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

  function equip(state, id) {
    var next = cloneState(state);
    var item = MG.SHOP_BY_ID[id];
    if (!item || next.owned.indexOf(id) === -1 || item.kind === 'treat') return next;
    if (item.kind === 'outfit') {
      next.equipped.outfit = next.equipped.outfit === id ? null : id;
    } else {
      if (next.equipped.accessories[item.slot] === id) delete next.equipped.accessories[item.slot];
      else next.equipped.accessories[item.slot] = id;
    }
    return next;
  }

  MG.Logic = {
    initial: initial,
    round: round,
    answer: answer,
    buy: buy,
    equip: equip,
    START_COINS: START_COINS,
    RIGHT_REWARD: RIGHT_REWARD,
    WRONG_PENALTY: WRONG_PENALTY,
    TOTAL_STAGES: TOTAL_STAGES,
    SHOP_STAGES: SHOP_STAGES.slice()
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);
