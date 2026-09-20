(function (root) {
  'use strict';

  var MG = (root.MG = root.MG || {});

  /*
   * Shop records are deliberately plain data.  Art uses outfit/accessory
   * records as-is, so every record keeps the same public fields even when it
   * is a treat (which has no visual effect on the cat).
   */
  MG.SHOP = [
    { id: 'moon-milk', kind: 'treat', en: 'Moon Cat Milk', price: 2, prop: '🥛', color: '#e8d8ff', style: 'moon-milk' },
    { id: 'tuna-tart', kind: 'treat', en: 'Tuna Cat Treat', price: 3, prop: '🐟', color: '#f8a7b9', style: 'tuna-tart' },
    { id: 'star-biscuit', kind: 'treat', en: 'Star Cat Treat', price: 2, prop: '🍪', color: '#f7c544', style: 'star-biscuit' },
    { id: 'velvet-cape', kind: 'outfit', en: 'Star Cape', price: 5, prop: '🧥', color: '#8b55d9', style: 'cape' },
    { id: 'cloud-robe', kind: 'outfit', en: 'Cloud Coat', price: 6, prop: '☁️', color: '#78cbd1', style: 'robe' },
    { id: 'sunny-sweater', kind: 'outfit', en: 'Sunny Sweater', price: 4, prop: '🧶', color: '#f0a94b', style: 'sweater' },
    { id: 'moon-medal', kind: 'accessory', en: 'Moon Medal', price: 3, prop: '🌙', color: '#f5d451', style: 'medal' },
    { id: 'star-bow', kind: 'accessory', en: 'Star Bow', price: 3, prop: '🎀', color: '#ff93b6', style: 'bowtie' },
    { id: 'bell-charm', kind: 'accessory', en: 'Bell Charm', price: 3, prop: '🔔', color: '#74d6c2', style: 'collarbell' }
  ];

  MG.SHOP_BY_ID = {};
  MG.SHOP.forEach(function (item) {
    MG.SHOP_BY_ID[item.id] = item;
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
