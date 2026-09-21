(function (root) {
  'use strict';
  var MG = root.MG = root.MG || {};

  MG.ACCESSORY_SLOTS = ['neck', 'chest', 'face', 'hat'];
  // Each shelf climbs in small steps; a full run earns at most 36 coins.
  MG.SHOP = [
    { id: 'moon-milk', kind: 'treat', en: 'Moon Cat Milk', price: 2, prop: '🥛', color: '#e8d8ff', style: 'moon-milk' },
    { id: 'star-biscuit', kind: 'treat', en: 'Star Cat Treat', price: 3, prop: '🍪', color: '#f7c544', style: 'star-biscuit' },
    { id: 'tuna-tart', kind: 'treat', en: 'Tuna Cat Treat', price: 4, prop: '🐟', color: '#f8a7b9', style: 'tuna-tart' },
    { id: 'chicken-bites', kind: 'treat', en: 'Chicken Bites', price: 5, prop: '🍗', color: '#e4bc78', style: 'chicken-bites' },
    { id: 'salmon-flakes', kind: 'treat', en: 'Salmon Flakes', price: 6, prop: '🐟', color: '#f5a68f', style: 'salmon-flakes' },
    { id: 'turkey-rolls', kind: 'treat', en: 'Turkey Rolls', price: 8, prop: '🍖', color: '#c9a77f', style: 'turkey-rolls' },
    { id: 'beef-cubes', kind: 'treat', en: 'Beef Cubes', price: 10, prop: '🥩', color: '#a97858', style: 'beef-cubes' },
    { id: 'tuna-mousse', kind: 'treat', en: 'Soft Tuna Bowl', price: 12, prop: '🥣', color: '#e9b6ab', style: 'tuna-mousse' },
    { id: 'crunchy-fish', kind: 'treat', en: 'Crunchy Fish Treats', price: 16, prop: '🐟', color: '#dba854', style: 'crunchy-fish' },

    { id: 'velvet-cape', kind: 'outfit', en: 'Star Cape', price: 5, prop: '🧥', color: '#8b55d9', style: 'cape' },
    { id: 'sunny-sweater', kind: 'outfit', en: 'Sunny Sweater', price: 6, prop: '🧶', color: '#f0a94b', style: 'sweater' },
    { id: 'cloud-robe', kind: 'outfit', en: 'Cloud Coat', price: 8, prop: '☁️', color: '#78cbd1', style: 'robe' },
    { id: 'forest-vest', kind: 'outfit', en: 'Forest Vest', price: 11, prop: '🧥', color: '#658564', style: 'vest' },
    { id: 'rose-dress', kind: 'outfit', en: 'Rose Dress', price: 13, prop: '👗', color: '#cb8a9b', style: 'dress' },
    { id: 'ocean-sailor', kind: 'outfit', en: 'Sailor Shirt', price: 15, prop: '⚓', color: '#568cb6', style: 'sailor' },
    { id: 'snow-coat', kind: 'outfit', en: 'Snow Coat', price: 18, prop: '❄️', color: '#b7dce8', style: 'coat' },
    { id: 'royal-robe', kind: 'outfit', en: 'Royal Robe', price: 21, prop: '🧥', color: '#286653', style: 'royal' },
    { id: 'night-cape', kind: 'outfit', en: 'Night Cape', price: 25, prop: '🌙', color: '#29385b', style: 'night' },

    { id: 'moon-medal', kind: 'accessory', slot: 'neck', en: 'Moon Medal', price: 3, prop: '🌙', color: '#f5d451', style: 'medal' },
    { id: 'star-bow', kind: 'accessory', slot: 'neck', en: 'Star Bow', price: 4, prop: '🎀', color: '#ff93b6', style: 'bowtie' },
    { id: 'bell-charm', kind: 'accessory', slot: 'neck', en: 'Bell Charm', price: 5, prop: '🔔', color: '#74d6c2', style: 'collarbell' },
    { id: 'leaf-brooch', kind: 'accessory', slot: 'chest', en: 'Leaf Pin', price: 6, prop: '🍃', color: '#5eae7a', style: 'pin' },
    { id: 'round-glasses', kind: 'accessory', slot: 'face', en: 'Round Glasses', price: 8, prop: '👓', color: '#c6a15d', style: 'glasses' },
    { id: 'star-hatpin', kind: 'accessory', slot: 'hat', en: 'Star Hat Pin', price: 10, prop: '⭐', color: '#dac36b', style: 'hatpin' },
    { id: 'pearl-collar', kind: 'accessory', slot: 'neck', en: 'Pearl Collar', price: 14, prop: '📿', color: '#eee2cf', style: 'collar' },
    { id: 'heart-pendant', kind: 'accessory', slot: 'neck', en: 'Heart Necklace', price: 18, prop: '💗', color: '#eda3b3', style: 'pendant' },
    { id: 'royal-gem', kind: 'accessory', slot: 'neck', en: 'Royal Blue Gem', price: 30, prop: '💎', color: '#397dcc', style: 'gem' }
  ];

  MG.SHOP_BY_ID = {};
  MG.SHOP.forEach(function (item) { MG.SHOP_BY_ID[item.id] = item; });
})(globalThis);
