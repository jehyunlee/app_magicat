const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
require('../js/data/cats.js');
require('../js/data/shop.js');
require('../js/art.js');
const { Art, CATS, SHOP } = globalThis.MG;

test('every breed has a real fitted portrait for every outfit', () => {
  const outfits = SHOP.filter(item => item.kind === 'outfit');
  assert.equal(outfits.length, 9);
  for (const cat of CATS) {
    for (const outfit of outfits) {
      const asset = 'assets/cats/wardrobe/' + cat.id + '--' + outfit.id + '.png';
      const bytes = fs.readFileSync(path.join(__dirname, '..', asset));
      assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
      assert.ok(Art.cat(cat, { outfit }).includes('href="' + asset + '"'));
    }
  }
});

test('all 1600 clothing and single-accessory combinations reference existing image assets', () => {
  let combinations = 0;
  for (const cat of CATS) {
    for (const outfit of [null, ...SHOP.filter(i => i.kind === 'outfit')]) {
      for (const accessory of [null, ...SHOP.filter(i => i.kind === 'accessory')]) {
        const svg = Art.cat(cat, { outfit, accessories: accessory ? [accessory] : [] });
        for (const [, href] of svg.matchAll(/href="([^"]+)"/g)) {
          assert.ok(fs.existsSync(path.join(__dirname, '..', href)), href);
        }
        if (accessory) {
          assert.ok(svg.includes('class="cat-accessory"'));
          assert.ok(svg.includes('assets/items/' + accessory.id + '.png'));
        }
        combinations++;
      }
    }
  }
  assert.equal(combinations, 1600);
});

test('four accessory slots layer over every fitted outfit in the right order', () => {
  const accessories = ['royal-gem', 'leaf-brooch', 'round-glasses', 'star-hatpin']
    .map(id => SHOP.find(item => item.id === id));
  for (const cat of CATS) {
    for (const outfit of SHOP.filter(item => item.kind === 'outfit')) {
      const svg = Art.cat(cat, { outfit, accessories: accessories.slice().reverse() });
      assert.equal((svg.match(/class="cat-accessory"/g) || []).length, 4);
      const positions = ['neck', 'chest', 'face', 'hat'].map(slot => svg.indexOf('data-slot="' + slot + '"'));
      assert.ok(positions.every((position, index) => position > 0 && (!index || position > positions[index - 1])));
      assert.ok(svg.indexOf('class="cat-clothing"') < positions[0]);
      assert.doesNotMatch(svg, /undefined|NaN/);
    }
  }
});

test('every shop item has an illustrated catalog thumbnail', () => {
  for (const item of SHOP) {
    assert.ok(fs.existsSync(path.join(__dirname, '../assets/items', item.id + '.png')));
  }
});
