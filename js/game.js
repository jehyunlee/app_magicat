(function (root) {
  'use strict';

  var MG = (root.MG = root.MG || {});

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function safeClass(value, fallback) {
    var text = String(value || fallback || '');
    return /^[a-z0-9_-]+$/i.test(text) ? text : String(fallback || '');
  }

  function personalityLabel(personality) {
    return {
      elegant: 'Elegant',
      playful: 'Playful',
      dizzy: 'Spinning',
      spinning: 'Spinning'
    }[personality] || 'Elegant';
  }

  function catArt(cat, options) {
    return MG.Art.cat(cat, options || {});
  }

  function roomArt() {
    return MG.Art.room();
  }

  function fxArt(good) {
    return MG.Art.fx(!!good);
  }

  function playSound(name) {
    if (MG.Audio && typeof MG.Audio.play === 'function') {
      try { MG.Audio.play(name); } catch (error) { /* audio is optional on file:// */ }
    }
  }

  function itemById(id) {
    return id && MG.SHOP_BY_ID ? MG.SHOP_BY_ID[id] || null : null;
  }

  function currentCat() {
    return gameState && gameState.cat ? gameState.cat : selectedCat;
  }

  function visualOptions(extra) {
    var options = {
      book: false,
      mood: 'calm'
    };
    var outfit = gameState && gameState.equipped && itemById(gameState.equipped.outfit);
    var accessory = gameState && gameState.equipped && itemById(gameState.equipped.accessory);
    var key;
    if (outfit) options.outfit = outfit;
    if (accessory) options.accessory = accessory;
    extra = extra || {};
    for (key in extra) {
      if (Object.prototype.hasOwnProperty.call(extra, key)) options[key] = extra[key];
    }
    return options;
  }

  var gameState = null;
  var selectedCat = null;
  var selectedRound = null;
  var answerLocked = false;
  var introStep = 0;
  var shopStage = 0;
  var shopNotice = '';
  var pendingPurchase = null;
  var purchaseTrigger = null;
  var dom = {};
  var screenIds = [
    'screen-title', 'screen-select', 'screen-intro', 'screen-stage',
    'screen-shop', 'screen-over', 'screen-ending'
  ];

  function cacheDom() {
    var i;
    for (i = 0; i < screenIds.length; i += 1) dom[screenIds[i]] = document.getElementById(screenIds[i]);
    dom.topbar = document.getElementById('topbar');
    dom.titleArt = document.getElementById('title-art');
    dom.catGrid = document.getElementById('cat-grid');
    dom.catPreview = document.getElementById('cat-preview');
    dom.introStage = document.getElementById('intro-stage');
    dom.introLine = document.getElementById('intro-line');
    dom.btnIntroNext = document.getElementById('btn-intro-next');
    dom.topCatArt = document.getElementById('top-cat-art');
    dom.topCatName = document.getElementById('top-cat-name');
    dom.topStage = document.getElementById('top-stage');
    dom.topPips = document.getElementById('top-pips');
    dom.purse = document.getElementById('purse');
    dom.purseCount = document.getElementById('purse-count');
    dom.purseDelta = document.getElementById('purse-delta');
    dom.btnMute = document.getElementById('btn-mute');
    dom.pageNo = document.getElementById('page-no');
    dom.pageTitle = document.getElementById('page-title');
    dom.pageBody = document.getElementById('page-body');
    dom.pageAsk = document.getElementById('page-ask');
    dom.optionList = document.getElementById('option-list');
    dom.shopLead = document.getElementById('shop-lead');
    dom.shopCols = document.getElementById('shop-cols');
    dom.shopPreview = document.getElementById('shop-preview');
    dom.shopOwned = document.getElementById('shop-owned');
    dom.btnShopLeave = document.getElementById('btn-shop-leave');
    dom.overArt = document.getElementById('over-art');
    dom.overText = document.getElementById('over-text');
    dom.endingStage = document.getElementById('ending-stage');
    dom.endingLine = document.getElementById('ending-line');
    dom.endingStats = document.getElementById('ending-stats');
    dom.overlay = document.getElementById('overlay');
    dom.reactStage = document.getElementById('react-stage');
    dom.reactVerdict = document.getElementById('react-verdict');
    dom.reactEn = document.getElementById('react-en');
    dom.reactCoin = document.getElementById('react-coin');
    dom.btnReactNext = document.getElementById('btn-react-next');
    dom.purchaseDialog = document.getElementById('purchase-dialog');
    dom.purchasePreview = document.getElementById('purchase-preview');
    dom.purchaseTitle = document.getElementById('purchase-title');
    dom.purchaseItem = document.getElementById('purchase-item');
    dom.purchasePrice = document.getElementById('purchase-price');
    dom.purchaseBalance = document.getElementById('purchase-balance');
    dom.purchaseYes = document.getElementById('purchase-yes');
    dom.purchaseNo = document.getElementById('purchase-no');
    dom.btnStart = document.getElementById('btn-start');
    dom.btnOverRetry = document.getElementById('btn-over-retry');
    dom.btnOverSelect = document.getElementById('btn-over-select');
    dom.btnEndAgain = document.getElementById('btn-end-again');
  }

  function showScreen(id) {
    var i;
    for (i = 0; i < screenIds.length; i += 1) {
      if (dom[screenIds[i]]) dom[screenIds[i]].hidden = screenIds[i] !== id;
    }
    if (dom.topbar) {
      dom.topbar.hidden = id === 'screen-title' || id === 'screen-select';
    }
  }

  function renderHeader(stage) {
    var cat = currentCat();
    var visibleStage = Math.max(1, Math.min(10, Number(stage) || 1));
    var i;
    if (!cat) return;
    if (dom.topCatArt) dom.topCatArt.innerHTML = catArt(cat, visualOptions({ mood: 'calm' }));
    if (dom.topCatName) dom.topCatName.textContent = cat.en;
    if (dom.topStage) dom.topStage.textContent = visibleStage + ' / 10';
    if (dom.purseCount) dom.purseCount.textContent = String(gameState ? gameState.coins : 0);
    if (dom.topPips) {
      dom.topPips.innerHTML = '';
      for (i = 1; i <= 10; i += 1) {
        dom.topPips.insertAdjacentHTML('beforeend', '<i class="' +
          (i < visibleStage ? 'is-done ' : '') +
          (i === visibleStage ? 'is-now ' : '') +
          (MG.Logic.SHOP_STAGES.indexOf(i) !== -1 ? 'is-shop' : '') +
          '" aria-hidden="true"></i>');
      }
    }
  }

  function renderTitle() {
    var cat = MG.CATS && MG.CATS[0];
    if (dom.titleArt && cat) dom.titleArt.innerHTML = catArt(cat, { book: true, mood: 'proud' });
    showScreen('screen-title');
  }

  function renderSelection() {
    var cats = MG.CATS || [];
    var i;
    if (!dom.catGrid) return;
    dom.catGrid.innerHTML = '';
    for (i = 0; i < cats.length; i += 1) {
      (function (cat) {
        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'mg-card' + (selectedCat && selectedCat.id === cat.id ? ' is-picked' : '');
        button.setAttribute('aria-pressed', selectedCat && selectedCat.id === cat.id ? 'true' : 'false');
        button.setAttribute('aria-label', 'Choose ' + cat.en);
        button.innerHTML = '<span class="mg-card__art">' + catArt(cat, { book: false, mood: 'calm' }) +
          '</span><span class="mg-card__name">' + escapeHtml(cat.en) +
          '</span><span class="mg-card__tag p-' + safeClass(cat.personality, 'elegant') + '">' +
          escapeHtml(personalityLabel(cat.personality)) + '</span>';
        button.addEventListener('click', function () { selectCat(cat); });
        dom.catGrid.appendChild(button);
      }(cats[i]));
    }
    if (dom.catPreview) dom.catPreview.hidden = !selectedCat;
    showScreen('screen-select');
  }

  function renderCatPreview() {
    var cat = selectedCat;
    var facts;
    if (!dom.catPreview || !cat) return;
    facts = (cat.facts || []).map(function (fact) {
      return '<li><i>' + escapeHtml(fact) + '</i></li>';
    }).join('');
    dom.catPreview.hidden = false;
    dom.catPreview.innerHTML = '<div class="mg-preview__art">' + catArt(cat, { book: true, mood: 'proud' }) +
      '</div><div class="mg-preview__txt"><div class="mg-preview__name">' + escapeHtml(cat.en) +
      '</div><ul class="mg-preview__facts">' + facts +
      '</ul></div><button id="btn-cat-confirm" class="mg-btn" type="button">Start with this cat</button>';
    document.getElementById('btn-cat-confirm').addEventListener('click', function () { startIntro(cat); });
  }

  function selectCat(cat) {
    selectedCat = cat;
    renderSelection();
    renderCatPreview();
    playSound('select');
  }

  function introLines(cat) {
    return [
      '<b>' + escapeHtml(cat.en) + '</b> has the <em>Magic Cat Book</em>.',
      'Read each page. Find what this cat likes.',
      'Ready? Open the book!'
    ];
  }

  function introRoom(cat) {
    return roomArt() +
      '<div class="mg-actor mg-actor--walkin">' + catArt(cat, visualOptions({ book: true, mood: 'walking' })) + '</div>';
  }

  function startIntro(cat) {
    closePurchaseDialog(false);
    selectedCat = cat;
    gameState = MG.Logic.initial(cat);
    introStep = 0;
    answerLocked = false;
    if (dom.introStage) dom.introStage.innerHTML = introRoom(cat);
    if (dom.introLine) dom.introLine.innerHTML = introLines(cat)[introStep];
    if (dom.btnIntroNext) dom.btnIntroNext.textContent = 'Continue';
    renderHeader(1);
    showScreen('screen-intro');
    playSound('door');
  }

  function beginStage(stage) {
    if (!gameState || gameState.gameOver) return showGameOver();
    if (gameState.complete || Number(stage) > 10) return showEnding();
    gameState.stage = Number(stage) || gameState.stage;
    selectedRound = MG.Logic.round(gameState);
    answerLocked = false;
    renderStage();
    renderHeader(gameState.stage);
    showScreen('screen-stage');
    playSound('page');
  }

  function renderStage() {
    var round = selectedRound;
    var letters = ['A', 'B', 'C', 'D'];
    var stageCat;
    var book;
    if (!round) return;
    book = document.querySelector('.mg-book');
    if (book) book.scrollTop = 0;
    stageCat = document.getElementById('stage-cat');
    if (stageCat) stageCat.innerHTML = catArt(currentCat(), visualOptions({ mood: 'expectant' }));
    dom.pageNo.textContent = 'PAGE ' + round.page + ' · STAGE ' + round.stage;
    dom.pageTitle.textContent = round.titleEn;
    dom.pageTitle.lang = 'en';
    dom.pageAsk.textContent = round.askEn;
    dom.pageAsk.lang = 'en';
    dom.pageBody.innerHTML = round.bodyEn.map(function (line, index) {
      return '<p><span class="en" lang="en">' + escapeHtml(line) + '</span></p>';
    }).join('');
    dom.optionList.innerHTML = round.options.map(function (item, index) {
      return '<button class="mg-opt" type="button" data-action-id="' + escapeHtml(item.id) +
        '" aria-label="' + escapeHtml(letters[index] + '. ' + item.en) + '">' +
        '<span class="mg-opt__key" aria-hidden="true">' + (letters[index] || '?') +
        '</span><span class="mg-opt__prop" aria-hidden="true">' + escapeHtml(item.prop || '🐾') +
        '</span><span class="mg-opt__txt"><span class="mg-opt__en" lang="en">' + escapeHtml(item.en) +
        '</span></span></button>';
    }).join('');
    Array.prototype.forEach.call(dom.optionList.querySelectorAll('[data-action-id]'), function (button) {
      button.addEventListener('click', function () { handleAnswer(button.getAttribute('data-action-id')); });
    });
  }

  function updatePurse(previous, next) {
    var delta = Number(next) - Number(previous);
    if (dom.purseCount) dom.purseCount.textContent = String(next);
    if (!dom.purse || !dom.purseDelta) return;
    dom.purse.classList.remove('is-pop', 'is-shake');
    dom.purseDelta.className = 'mg-purse__delta ' + (delta >= 0 ? 'is-up' : 'is-down');
    dom.purseDelta.textContent = (delta > 0 ? '+' : '') + String(delta);
    void dom.purse.offsetWidth;
    dom.purse.classList.add(delta >= 0 ? 'is-pop' : 'is-shake');
    root.setTimeout(function () {
      if (dom.purseDelta) dom.purseDelta.className = 'mg-purse__delta';
      if (dom.purse) dom.purse.classList.remove('is-pop', 'is-shake');
    }, 950);
  }

  function reactionRoom(outcome) {
    var action = outcome.action || {};
    var scene = safeClass(action.scene, 'hand');
    var prop = escapeHtml(action.prop || '🐾');
    var mood = outcome.correct ? 'happy' : 'sad';
    return roomArt() + fxArt(outcome.correct) +
      '<div class="mg-actor mood-' + (outcome.correct ? 'good' : 'bad') + '">' +
      catArt(currentCat(), visualOptions({ mood: mood })) + '</div>' +
      '<span class="mg-prop mg-prop--' + scene + '" aria-hidden="true">' + prop + '</span>';
  }

  function handleAnswer(id) {
    var before;
    var result;
    var outcome;
    var buttons;
    if (answerLocked || !gameState || gameState.gameOver || !selectedRound) return;
    answerLocked = true;
    before = gameState.coins;
    result = MG.Logic.answer(gameState, id);
    if (!result.answerAccepted || !result.lastAnswer || !result.lastAnswer.accepted) {
      answerLocked = false;
      return;
    }
    outcome = result.lastAnswer;
    gameState = result;
    buttons = dom.optionList.querySelectorAll('[data-action-id]');
    Array.prototype.forEach.call(buttons, function (button) {
      var buttonId = button.getAttribute('data-action-id');
      button.disabled = true;
      if (buttonId === outcome.actionId) button.classList.add(outcome.correct ? 'is-right' : 'is-wrong');
      if (!outcome.correct && buttonId === selectedRound.correctId) button.classList.add('is-right');
    });
    updatePurse(before, gameState.coins);
    renderHeader(outcome.stage);
    dom.reactStage.innerHTML = reactionRoom(outcome);
    dom.reactStage.className = 'mg-room mg-room--small action-' + safeClass(outcome.actionId);
    dom.reactVerdict.className = 'mg-react__verdict ' + (outcome.correct ? 'is-good' : 'is-bad');
    dom.reactVerdict.textContent = outcome.correct ? 'Your cat likes it!' : 'Not this time.';
    dom.reactEn.textContent = outcome.correct ? outcome.action.likeEn : outcome.action.hateEn;
    dom.reactCoin.textContent = (outcome.coinDelta > 0 ? '+' : '') + outcome.coinDelta + ' coins. ' + outcome.coins + ' left.';
    dom.btnReactNext.textContent = outcome.gameOver ? 'View Game Over' : (outcome.shopAfter ? 'Open Item Shop' : (outcome.complete ? 'See Ending' : 'Next Page'));
    dom.overlay.hidden = false;
    document.getElementById('app').inert = true;
    dom.btnReactNext.focus();
    playSound(outcome.correct ? 'correct' : 'wrong');
  }

  function continueAfterAnswer() {
    var outcome = gameState && gameState.lastAnswer;
    if (!outcome || !outcome.accepted) return;
    dom.overlay.hidden = true;
    document.getElementById('app').inert = false;
    if (outcome.gameOver) return showGameOver();
    if (outcome.shopAfter) return openShop(outcome.stage);
    if (outcome.complete) return showEnding();
    beginStage(gameState.stage);
  }

  function shopKindLabel(kind) {
    return {
      treat: 'Treats',
      outfit: 'Outfits',
      accessory: 'Accessories'
    }[kind] || kind;
  }

  function purchaseReason(reason, item) {
    if (reason === 'keep-one-coin') return 'Keep 1 coin. You cannot buy ' + item.en + '.';
    if (reason === 'already-owned') return item.en + ' is already yours.';
    if (reason === 'unknown-item') return 'That item is not here.';
    return 'You cannot buy ' + (item ? item.en : 'that item') + ' now.';
  }

  function closePurchaseDialog(restoreFocus) {
    var trigger = purchaseTrigger;
    if (dom.purchaseDialog) dom.purchaseDialog.hidden = true;
    pendingPurchase = null;
    purchaseTrigger = null;
    if (document.getElementById('app')) document.getElementById('app').inert = false;
    if (restoreFocus && trigger && document.contains(trigger) && !trigger.disabled) trigger.focus();
  }

  function cancelPurchase() {
    if (!pendingPurchase) return;
    closePurchaseDialog(true);
    playSound('select');
  }

  function focusShopItem(id) {
    var buttons;
    var i;
    if (!dom.shopCols) return;
    buttons = dom.shopCols.querySelectorAll('[data-shop-id]');
    for (i = 0; i < buttons.length; i += 1) {
      if (buttons[i].getAttribute('data-shop-id') === id) {
        buttons[i].focus();
        return;
      }
    }
  }

  function handlePurchaseKeydown(event) {
    var focusable;
    var index;
    if (!pendingPurchase) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      cancelPurchase();
      return;
    }
    if (event.key !== 'Tab') return;
    focusable = [dom.purchaseYes, dom.purchaseNo].filter(function (button) {
      return button && !button.disabled;
    });
    if (!focusable.length) return;
    index = focusable.indexOf(document.activeElement);
    if (event.shiftKey && (index <= 0)) {
      event.preventDefault();
      focusable[focusable.length - 1].focus();
    } else if (!event.shiftKey && (index === -1 || index === focusable.length - 1)) {
      event.preventDefault();
      focusable[0].focus();
    }
  }

  function openPurchaseDialog(item, trigger) {
    var options;
    var owned;
    var canBuy;
    if (!item || !gameState || pendingPurchase || !dom.purchaseDialog) return;
    options = visualOptions({ mood: 'proud' });
    if (item.kind === 'outfit') options.outfit = item;
    if (item.kind === 'accessory') options.accessory = item;
    owned = (gameState.owned || []).indexOf(item.id) !== -1;
    canBuy = !owned && Number(gameState.coins) - Number(item.price) >= 1;
    pendingPurchase = { item: item, finalizing: false };
    purchaseTrigger = trigger || document.activeElement;
    dom.purchasePreview.innerHTML = catArt(currentCat(), options);
    dom.purchaseTitle.textContent = 'Try ' + item.en + '?';
    dom.purchaseItem.textContent = item.en;
    dom.purchasePrice.textContent = 'Price: ' + item.price + ' coins';
    dom.purchaseBalance.textContent = 'Balance: ' + gameState.coins + ' coins';
    dom.purchaseYes.textContent = item.kind === 'treat' ? 'Yes, buy it' : 'Yes, buy and equip';
    dom.purchaseYes.disabled = !canBuy;
    dom.purchaseNo.disabled = false;
    dom.purchaseYes.setAttribute('aria-label', canBuy ? 'Buy ' + item.en : purchaseReason(owned ? 'already-owned' : 'keep-one-coin', item));
    dom.purchaseDialog.hidden = false;
    document.getElementById('app').inert = true;
    if (canBuy) dom.purchaseYes.focus();
    else dom.purchaseNo.focus();
  }

  function confirmPurchase() {
    var pending = pendingPurchase;
    var item;
    var result;
    var coins;
    if (!pending || pending.finalizing || !dom.purchaseYes || dom.purchaseYes.disabled) return;
    pending.finalizing = true;
    dom.purchaseYes.disabled = true;
    dom.purchaseNo.disabled = true;
    item = pending.item;
    if (!gameState || !item) {
      closePurchaseDialog(false);
      return;
    }
    coins = Number(gameState.coins) || 0;
    if ((gameState.owned || []).indexOf(item.id) !== -1 || coins - Number(item.price) < 1) {
      closePurchaseDialog(false);
      shopNotice = purchaseReason((gameState.owned || []).indexOf(item.id) !== -1 ? 'already-owned' : 'keep-one-coin', item);
      renderShop();
      renderHeader(shopStage);
      focusShopItem(item.id);
      playSound('wrong');
      return;
    }
    result = MG.Logic.buy(gameState, item.id);
    gameState = result;
    closePurchaseDialog(false);
    if (result.purchaseAccepted) {
      shopNotice = item.en + ' bought! ' + (item.kind === 'treat' ? 'Your cat can eat it at the end.' : 'It is on your cat.');
      playSound('buy');
    } else {
      shopNotice = purchaseReason(result.purchaseReason, item);
      playSound('wrong');
    }
    renderShop();
    renderHeader(shopStage);
    focusShopItem(item.id);
  }

  function equipOwnedItem(item) {
    if (!gameState || !item || (item.kind !== 'outfit' && item.kind !== 'accessory')) return;
    if (!gameState.equipped) gameState.equipped = { outfit: null, accessory: null };
    gameState.equipped[item.kind] = item.id;
    shopNotice = item.en + ' is on your cat. No coins spent.';
    renderShop();
    renderHeader(shopStage);
    focusShopItem(item.id);
    playSound('select');
  }

  function openShop(completedStage) {
    shopStage = completedStage;
    shopNotice = 'Stage ' + completedStage + ' done. Pick an item.';
    renderShop();
    renderHeader(completedStage);
    showScreen('screen-shop');
    playSound('shop');
  }

  function renderShop() {
    var kinds = ['treat', 'outfit', 'accessory'];
    var owned = gameState ? gameState.owned || [] : [];
    var equipped = gameState && gameState.equipped || {};
    if (!dom.shopCols) return;
    dom.shopLead.textContent = shopNotice + ' ' + gameState.coins + ' coins. Keep 1 coin.';
    dom.shopCols.innerHTML = kinds.map(function (kind) {
      var items = (MG.SHOP || []).filter(function (item) { return item.kind === kind; });
      return '<section class="mg-shelf"><div class="mg-shelf__h">' + escapeHtml(shopKindLabel(kind)) +
        '<small>' + (kind === 'treat' ? 'for ending' : 'equip now') + '</small></div><div class="mg-shelf__items">' +
        items.map(function (item) {
          var isOwned = owned.indexOf(item.id) !== -1;
          var isEquipable = item.kind === 'outfit' || item.kind === 'accessory';
          var isEquipped = isEquipable && equipped[item.kind] === item.id;
          var isOwnedDisabled = isOwned && !isEquipable;
          var isPoor = !isOwned && gameState.coins - item.price < 1;
          var label = isOwned ? (isEquipable ? 'Equip ' + item.en + ' (owned' + (isEquipped ? ', currently equipped' : '') + ')' :
            item.en + ' (already owned)') : 'Try ' + item.en + ' for ' + item.price + ' coins';
          return '<button class="mg-item' + (isOwned ? ' is-owned' : '') + (isPoor ? ' is-poor' : '') +
            '" type="button" data-shop-id="' + escapeHtml(item.id) + '"' +
            (isOwnedDisabled ? ' disabled ' : '') + 'aria-label="' + escapeHtml(label) + '"' +
            (!isOwned ? ' aria-haspopup="dialog" aria-controls="purchase-dialog"' : '') +
            (isEquipable && isOwned ? ' aria-pressed="' + (isEquipped ? 'true' : 'false') + '" data-shop-owned="true"' : '') + '>' +
            '<span class="mg-item__thumb"><img src="assets/items/' + escapeHtml(item.id) +
            '.png" alt="" loading="lazy"></span>' +
            '<span class="mg-item__name">' + escapeHtml(item.en) +
            '</span><span class="mg-item__price">' + (isOwned ? (isEquipable ? 'Owned · Equip' : 'Owned') :
              '🪙 ' + item.price + ' coins') + '</span></button>';
        }).join('') + '</div></section>';
    }).join('');
    Array.prototype.forEach.call(dom.shopCols.querySelectorAll('[data-shop-id]'), function (button) {
      if (button.disabled) return;
      button.addEventListener('click', function () {
        var item = itemById(button.getAttribute('data-shop-id'));
        if (button.getAttribute('data-shop-owned') === 'true') equipOwnedItem(item);
        else handlePurchase(button.getAttribute('data-shop-id'), button);
      });
    });
    dom.shopOwned.innerHTML = owned.length ? owned.map(function (id) {
      var item = itemById(id);
      var isEquipped = item && ((item.kind === 'outfit' && equipped.outfit === id) ||
        (item.kind === 'accessory' && equipped.accessory === id));
      return item ? '<li><img class="mg-owned__icon" src="assets/items/' + escapeHtml(item.id) +
        '.png" alt="" loading="lazy"><b>' + escapeHtml(item.en) + '</b><span> ' +
        (item.kind === 'treat' ? '· ending treat' : (isEquipped ? '· equipped' : '· owned')) + '</span></li>' : '';
    }).join('') : '<li class="is-empty">No items yet.</li>';
    dom.shopPreview.innerHTML = catArt(currentCat(), visualOptions({ mood: 'proud' }));
    dom.btnShopLeave.textContent = shopStage === 10 ? 'See Ending' : 'Next Stage';
  }

  function handlePurchase(id, trigger) {
    var item = itemById(id);
    if (!gameState || !item) return;
    if ((gameState.owned || []).indexOf(item.id) !== -1) {
      return equipOwnedItem(item);
    }
    openPurchaseDialog(item, trigger);
  }

  function shopLeave() {
    if (!gameState || gameState.gameOver) return showGameOver();
    if (gameState.stage > 10 || gameState.complete) return showEnding();
    beginStage(gameState.stage);
  }

  function endingRoom() {
    var cat = currentCat();
    var personality = safeClass(cat.personality, 'elegant');
    var treats = (gameState.purchasedTreats || []).map(itemById).filter(Boolean);
    var actorClass = treats.length ? 'mg-actor mg-eat--' + personality : 'mg-actor mg-actor--idle';
    var props = treats.map(function (item, index) {
      var left = 48 + index * 5;
      return '<span class="mg-prop mg-prop--food" style="left:' + left + '%;animation-delay:' + index * .6 + 's" aria-label="' +
        escapeHtml(item.en) + '"><img src="assets/items/' + escapeHtml(item.id) + '.png" alt="" loading="lazy"></span>';
    }).join('');
    return roomArt() + '<div class="' + actorClass + '">' +
      catArt(cat, visualOptions({ mood: treats.length ? 'happy' : 'resting' })) + '</div>' + props;
  }

  function showEnding() {
    var cat = currentCat();
    var treats = (gameState.purchasedTreats || []).map(itemById).filter(Boolean);
    var endingLines = {
      elegant: 'They take small bites!',
      playful: 'They bounce and munch!',
      dizzy: 'They spin and munch!',
      spinning: 'They spin and munch!'
    };
    if (!cat || !gameState) return renderTitle();
    dom.endingStage.innerHTML = endingRoom();
    dom.endingLine.innerHTML = treats.length ?
      '<em>' + escapeHtml(cat.en) + '</em>\'s treats: ' + treats.map(function (item) { return escapeHtml(item.en); }).join(', ') +
      '<br>' + escapeHtml(endingLines[cat.personality] || endingLines.elegant) :
      '<em>' + escapeHtml(cat.en) + '</em> has no treats. They rest now.';
    dom.endingStats.innerHTML = '<li>Correct <b>' + gameState.correct + '</b></li><li>Wrong <b>' + gameState.wrong +
      '</b></li><li>Coins left <b>' + gameState.coins + '</b></li><li>Treats bought <b>' + treats.length + '</b></li>';
    renderHeader(10);
    showScreen('screen-ending');
    playSound('ending');
  }

  function showGameOver() {
    if (!gameState) return renderTitle();
    dom.overArt.innerHTML = catArt(currentCat(), visualOptions({ mood: 'sad' }));
    dom.overText.textContent = 'You have 0 coins. You got ' + (gameState.correct || 0) +
      ' right and ' + (gameState.wrong || 0) + ' wrong. Try again with this cat.';
    renderHeader(gameState.lastAnswer && gameState.lastAnswer.stage || gameState.stage);
    showScreen('screen-over');
    playSound('over');
  }

  function resetToTitle() {
    closePurchaseDialog(false);
    gameState = null;
    selectedCat = null;
    selectedRound = null;
    shopNotice = '';
    if (dom.overlay) dom.overlay.hidden = true;
    document.getElementById('app').inert = false;
    renderTitle();
  }

  function retrySameCat() {
    closePurchaseDialog(false);
    if (selectedCat) startIntro(selectedCat);
  }

  function chooseAnotherCat() {
    closePurchaseDialog(false);
    gameState = null;
    selectedCat = null;
    selectedRound = null;
    renderSelection();
  }

  function toggleAudio() {
    var muted;
    if (MG.Audio && typeof MG.Audio.toggle === 'function') {
      try { muted = MG.Audio.toggle(); } catch (error) { muted = null; }
    }
    if (typeof muted !== 'boolean') muted = dom.btnMute.getAttribute('aria-pressed') !== 'true';
    dom.btnMute.setAttribute('aria-pressed', muted ? 'true' : 'false');
    dom.btnMute.textContent = muted ? '🔇' : '🔊';
    dom.btnMute.setAttribute('title', muted ? 'Turn sound on' : 'Turn sound off');
  }

  function bindEvents() {
    dom.btnStart.addEventListener('click', function () {
      selectedCat = null;
      renderSelection();
      playSound('start');
    });
    dom.btnIntroNext.addEventListener('click', function () {
      var lines = introLines(currentCat());
      introStep += 1;
      if (introStep >= lines.length) return beginStage(1);
      dom.introLine.innerHTML = lines[introStep];
      dom.btnIntroNext.textContent = introStep === lines.length - 1 ? 'Open Book' : 'Continue';
      playSound('page');
    });
    dom.btnReactNext.addEventListener('click', continueAfterAnswer);
    dom.purchaseYes.addEventListener('click', confirmPurchase);
    dom.purchaseNo.addEventListener('click', cancelPurchase);
    document.addEventListener('keydown', handlePurchaseKeydown);
    dom.btnShopLeave.addEventListener('click', shopLeave);
    dom.btnOverRetry.addEventListener('click', retrySameCat);
    dom.btnOverSelect.addEventListener('click', chooseAnotherCat);
    dom.btnEndAgain.addEventListener('click', resetToTitle);
    dom.btnMute.addEventListener('click', toggleAudio);
  }

  function init() {
    cacheDom();
    bindEvents();
    renderTitle();
    MG.Game = {
      getState: function () { return gameState; },
      showTitle: resetToTitle,
      chooseCat: selectCat,
      start: startIntro
    };
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
