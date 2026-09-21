(function (root) {
  'use strict';
  var MG = root.MG = root.MG || {};
  var clipSequence = 0;
  function escape(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function cat(c, opts) {
    opts = opts || {};
    var outfit = opts.outfit, accessories = opts.accessories || [];
    var s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="' + escape(c.en) + '" class="mg-cat mood-' + escape(opts.mood || 'idle') + '">';
    var portrait = outfit ? 'assets/cats/wardrobe/' + c.id + '--' + outfit.id + '.png' : 'assets/cats/' + c.id + '.png';
    s += '<image class="' + (outfit ? 'cat-clothing' : 'cat-portrait') + '" data-layer="outfit" href="' + escape(portrait) + '" width="100" height="100"/>';
    MG.ACCESSORY_SLOTS.forEach(function (slot) {
      var accessory = accessories.find(function (item) { return item.slot === slot; });
      if (!accessory) return;
      // Breed-specific necklines keep generated silk and jewelry off the face.
      var necks = {
        'korean-shorthair': [59, 64], persian: [63, 64], siamese: [58, 60],
        'maine-coon': [55, 58], 'russian-blue': [61, 63], 'british-shorthair': [64, 65],
        'scottish-fold': [62, 64], bengal: [58, 60], abyssinian: [55, 56],
        ragdoll: [61, 63], 'norwegian-forest': [58, 59], sphynx: [59, 60],
        munchkin: [63, 64], 'turkish-angora': [61, 64], 'devon-rex': [57, 60],
        'american-shorthair': [60, 62]
      };
      var neck = necks[c.id][outfit ? 1 : 0];
      // Measured eye centers and spacing in the 100×100 portrait coordinate space.
      var faces = {
        'korean-shorthair': [46.4, 46.4, 21.9], persian: [44.9, 44.5, 17.4],
        siamese: [46.4, 43.4, 21.1], 'maine-coon': [41.1, 35.1, 15.8],
        'russian-blue': [49.8, 38.9, 22.6], 'british-shorthair': [48.7, 43.8, 18.9],
        'scottish-fold': [45.5, 37, 21.5], bengal: [49.1, 41.9, 15.8],
        abyssinian: [48.3, 38.5, 18.9], ragdoll: [44.2, 38.9, 18.9],
        'norwegian-forest': [47.5, 37, 16.6], sphynx: [48.9, 42.6, 18.5],
        munchkin: [44.3, 40.8, 20.8], 'turkish-angora': [50, 30.2, 19.2],
        'devon-rex': [48.5, 38.5, 17.7], 'american-shorthair': [48.9, 42.3, 18.5]
      };
      var face = faces[c.id];
      var bow = accessory.id === 'star-bow';
      var width = bow ? 24 : 27;
      var height = bow ? 18 : 21;
      var x = face[0] - width / 2, y = neck, rear = bow ? 0 : 5;
      if (accessory.id === 'pearl-collar') { height = 12; rear = 3; }
      if (slot === 'chest') { x = face[0] + 12; y = neck + 7; width = 8; height = 11; rear = 0; }
      if (slot === 'face') {
        width = face[2] / .5234; height = width / 2;
        x = face[0] - width / 2; y = face[1] - height * .375; rear = 0;
      }
      if (slot === 'hat') { x = face[0] + 10; y = Math.max(3, face[1] - 27); width = 12; height = 15; rear = 0; }
      // Clip the rear half of the collar behind the neckline.
      var clip = 'neckline-' + (++clipSequence);
      var visibleHeight = slot === 'face' ? height * .78 : height;
      s += '<defs><clipPath id="' + clip + '"><rect x="' + x + '" y="' + y + '" width="' + width + '" height="' + visibleHeight + '"/></clipPath></defs>' +
        '<image class="cat-accessory" data-slot="' + slot + '" data-item-id="' + escape(accessory.id) + '" clip-path="url(#' + clip + ')" href="assets/items/' + escape(accessory.id) + '.png" x="' + x + '" y="' + (y - rear) + '" width="' + width + '" height="' + height + '" preserveAspectRatio="xMidYMin meet"/>';
    });
    if (opts.book) {
      s += '<g transform="rotate(-7 50 57)"><path d="M28 51H72V68H28Z" fill="#38234f"/><path d="M30 54H70V65H30Z" fill="#fcf0cf"/><path d="M32 57H68M32 60H68M32 63H68" stroke="#c7ac7b" stroke-width=".5"/><path d="M27 50H73V54H27Z" fill="#7452b4"/><path d="M47 50V68H53V50" fill="#ab8437"/></g>';
    }
    return s + '</svg>';
  }
  function room() {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><path fill="#f5e4d1" d="M0 0H800V290H0Z"/><path fill="#b58b74" d="M0 290H800V450H0Z"/><path stroke="#946c58" stroke-width="2" d="M0 330H800M0 382H800M100 290L30 450M280 290L255 450M510 290L550 450M700 290L790 450"/><path fill="#886245" d="M90 290V64Q90 40 114 40H268Q290 40 290 64V290Z"/><path fill="#241748" d="M104 290V66Q104 55 116 55H264Q276 55 276 66V290Z"/><path fill="#b78c59" stroke="#805c3c" stroke-width="4" d="M106 58L208 82V310L106 290Z"/><circle cx="191" cy="198" r="5" fill="#f7c544"/><rect x="550" y="60" width="145" height="145" rx="60" fill="#48346f" stroke="#b78c59" stroke-width="10"/><circle cx="645" cy="100" r="22" fill="#fce7a5"/><path d="M551 138H697M623 60V205" stroke="#b78c59" stroke-width="7"/><ellipse cx="430" cy="381" rx="210" ry="44" fill="#8b679e" opacity=".55"/><path d="M350 70H475M370 88H455" stroke="#d5b999" stroke-width="4"/></svg>';
  }
  function fx(good) {
    var s = '<div class="mg-fx" aria-hidden="true">';
    for (var i = 0; i < 7; i += 1) {
      s += '<span style="left:' + (20 + i * 9) + '%;top:' + (20 + i % 3 * 16) + '%;animation-delay:' + i * .19 + 's;color:' + (good ? '#f7c544' : '#6c4bb6') + '">' + (good ? '✦' : '…') + '</span>';
    }
    return s + '</div>';
  }
  MG.Art = { cat: cat, room: room, fx: fx };
})(globalThis);
