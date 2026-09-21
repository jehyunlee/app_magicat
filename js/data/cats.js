(function (root) {
  'use strict';
  var MG = (root.MG = root.MG || {});

  var TASTE_GROUPS = [
    'bowl-shape', 'bowl-material', 'water-place', 'nap-texture',
    'nap-place', 'toy-motion', 'toy-texture', 'treat-flavor',
    'treat-texture', 'brush-type', 'touch-place', 'hideout',
    'perch-height', 'greeting', 'scratch-post', 'sound',
    'play-time', 'window-view', 'bed-shape', 'game-type',
    'plant-treat', 'water-bowl'
  ];

  // Two base-four profile digits give all sixteen story cats distinct tastes.
  var TASTE_PATTERN = [0, 1, 2, 3, 1, 3, 0, 2, 2, 0, 3, 1, 3, 2, 1, 0, 3, 2, 0, 3, 2, 1];
  // Each group has eight alternatives (1-4 and 5-8); a cat likes one of each half.
  var SECOND_PATTERN = [2, 0, 3, 1, 3, 0, 2, 1, 0, 3, 1, 2, 0, 1, 3, 2, 1, 0, 2, 3, 1, 0];

  function deriveTaste(profile) {
    var loves = [];
    var hates = [];
    var groupIndex;
    var option;

    for (groupIndex = 0; groupIndex < TASTE_GROUPS.length; groupIndex += 1) {
      var shift = groupIndex % 2 === 0 ? profile % 4 : Math.floor(profile / 4);
      var otherShift = groupIndex % 2 === 0 ? Math.floor(profile / 4) : profile % 4;
      var preferred = (TASTE_PATTERN[groupIndex] + shift) % 4;
      var secondPreferred = 4 + (SECOND_PATTERN[groupIndex] + otherShift) % 4;
      for (option = 0; option < 8; option += 1) {
        (option === preferred || option === secondPreferred ? loves : hates).push(TASTE_GROUPS[groupIndex] + '-' + (option + 1));
      }
    }
    return { loves: loves, hates: hates };
  }

  MG.CATS = [
    {
      id: 'korean-shorthair',
      en: 'Korean Shorthair',
      personality: 'elegant',
      art: { fur: '#e7a94e', furShade: '#b87532', belly: '#fff0d2', inner: '#f2a9ad', eye: '#70a83b', pattern: 'tabby', coat: 'short', ears: 'normal', body: 'normal', face: 'round' },
      hat: { shape: 'cone', main: '#5b3cc4', accent: '#f9d94a', charm: 'star' },
      facts: ['This cat has short orange stripes.', 'It is quick and watches bugs.', 'It warms up after a slow hello.'],
      tasteProfile: 0
    },
    {
      id: 'persian', en: 'Persian', personality: 'elegant',
      art: { fur: '#d9c4a3', furShade: '#b99f7c', belly: '#f6ece0', inner: '#f0b8bd', eye: '#e0a33c', pattern: 'solid', coat: 'long', ears: 'normal', body: 'stocky', face: 'flat' },
      hat: { shape: 'tallcone', main: '#153b8c', accent: '#e8c34b', charm: 'moon' },
      facts: ['A Persian cat has a flat face.', 'Its long fur needs daily brushing.', 'It likes calm rooms and quiet days.'],
      tasteProfile: 1
    },
    {
      id: 'siamese', en: 'Siamese', personality: 'playful',
      art: { fur: '#f0dfbb', furShade: '#b99570', belly: '#fff5df', inner: '#eaa8ac', eye: '#4b9dd6', pattern: 'point', coat: 'short', ears: 'big', body: 'slim', face: 'wedge' },
      hat: { shape: 'wide', main: '#007c91', accent: '#ffcf4a', charm: 'bell' },
      facts: ['A Siamese cat has dark ears and feet.', 'Its blue eyes shine in light.', 'It makes loud little meows.'],
      tasteProfile: 2
    },
    {
      id: 'maine-coon', en: 'Maine Coon', personality: 'playful',
      art: { fur: '#8b6244', furShade: '#5d3d2c', belly: '#ead6bc', inner: '#e9a7ae', eye: '#8eb84d', pattern: 'tabby', coat: 'fluffy', ears: 'tufted', body: 'big', face: 'round' },
      hat: { shape: 'floppy', main: '#8b2468', accent: '#69d7d2', charm: 'feather' },
      facts: ['A Maine Coon is very big.', 'Its ears have small fur tufts.', 'It may like playing near water.'],
      tasteProfile: 3
    },
    {
      id: 'russian-blue', en: 'Russian Blue', personality: 'elegant',
      art: { fur: '#7893a1', furShade: '#526d7a', belly: '#d8e4e4', inner: '#e7aab0', eye: '#58b86a', pattern: 'solid', coat: 'short', ears: 'normal', body: 'slim', face: 'wedge' },
      hat: { shape: 'beanie', main: '#2b58b8', accent: '#f5d84a', charm: 'gem' },
      facts: ['Russian Blue fur looks soft and gray.', 'Its green eyes look very bright.', 'It often loves one calm family.'],
      tasteProfile: 4
    },
    {
      id: 'british-shorthair', en: 'British Shorthair', personality: 'elegant',
      art: { fur: '#84909d', furShade: '#5b6876', belly: '#dce3e6', inner: '#e8a9b0', eye: '#d8a43e', pattern: 'solid', coat: 'short', ears: 'normal', body: 'stocky', face: 'round' },
      hat: { shape: 'crown', main: '#6a267d', accent: '#f0c83f', charm: 'flower' },
      facts: ['This cat has a round face.', 'Its short fur feels soft.', 'It likes sitting close, not too close.'],
      tasteProfile: 5
    },
    {
      id: 'scottish-fold', en: 'Scottish Fold', personality: 'dizzy',
      art: { fur: '#c9b69c', furShade: '#947b61', belly: '#f2e6d5', inner: '#eaaab1', eye: '#d1a942', pattern: 'tabby', coat: 'short', ears: 'folded', body: 'stocky', face: 'round' },
      hat: { shape: 'mushroom', main: '#b8327e', accent: '#f6d54a', charm: 'candle' },
      facts: ['Scottish Fold ears bend down.', 'Its round eyes look sweet.', 'It likes gentle floor play.'],
      tasteProfile: 6
    },
    {
      id: 'bengal', en: 'Bengal', personality: 'playful',
      art: { fur: '#d9a94d', furShade: '#543b28', belly: '#f5dc9a', inner: '#eaa7ad', eye: '#73b649', pattern: 'spots', coat: 'short', ears: 'normal', body: 'slim', face: 'wedge' },
      hat: { shape: 'jester', main: '#076f71', accent: '#ffcc39', charm: 'none' },
      facts: ['A Bengal has spots like a wild cat.', 'It runs fast and jumps high.', 'It needs fun games each day.'],
      tasteProfile: 7
    },
    {
      id: 'abyssinian', en: 'Abyssinian', personality: 'playful',
      art: { fur: '#b86f35', furShade: '#77421f', belly: '#e9bb7e', inner: '#eba8ad', eye: '#d9a940', pattern: 'solid', coat: 'short', ears: 'big', body: 'slim', face: 'wedge' },
      hat: { shape: 'cone', main: '#4b2a9a', accent: '#5be0d1', charm: 'star' },
      facts: ['An Abyssinian has warm brown fur.', 'It loves to climb and chase toys.', 'It stays busy most of the day.'],
      tasteProfile: 8
    },
    {
      id: 'ragdoll', en: 'Ragdoll', personality: 'elegant',
      art: { fur: '#eee1c8', furShade: '#72564a', belly: '#fff6e4', inner: '#e9a9ae', eye: '#4a92d4', pattern: 'point', coat: 'long', ears: 'normal', body: 'big', face: 'wedge' },
      hat: { shape: 'tallcone', main: '#173d9b', accent: '#f4a7d1', charm: 'moon' },
      facts: ['A Ragdoll has blue eyes.', 'It may go limp when held gently.', 'It loves people and quiet games.'],
      tasteProfile: 9
    },
    {
      id: 'norwegian-forest', en: 'Norwegian Forest', personality: 'playful',
      art: { fur: '#826044', furShade: '#513824', belly: '#ead3b8', inner: '#e8a8ad', eye: '#83b44a', pattern: 'tabby', coat: 'long', ears: 'tufted', body: 'big', face: 'wedge' },
      hat: { shape: 'wide', main: '#007d9f', accent: '#f5d64b', charm: 'bell' },
      facts: ['This forest cat has thick fur.', 'Its big paws help on snow.', 'It likes to climb and look around.'],
      tasteProfile: 10
    },
    {
      id: 'sphynx', en: 'Sphynx', personality: 'dizzy',
      art: { fur: '#e5afb0', furShade: '#bf7e86', belly: '#f7d5ce', inner: '#e88996', eye: '#79b65a', pattern: 'solid', coat: 'bare', ears: 'big', body: 'slim', face: 'wedge' },
      hat: { shape: 'floppy', main: '#a52d68', accent: '#66ddd0', charm: 'feather' },
      facts: ['A Sphynx has soft skin, not fur.', 'It needs warm blankets on cool days.', 'Its big ears help it hear.'],
      tasteProfile: 11
    },
    {
      id: 'munchkin', en: 'Munchkin', personality: 'dizzy',
      art: { fur: '#d7ad76', furShade: '#986944', belly: '#f6dfbc', inner: '#eaa8ae', eye: '#78ad48', pattern: 'bicolor', coat: 'short', ears: 'normal', body: 'shortleg', face: 'round' },
      hat: { shape: 'beanie', main: '#2859b7', accent: '#f1cf43', charm: 'gem' },
      facts: ['A Munchkin has very short legs.', 'It runs fast along the floor.', 'It can play with many toys.'],
      tasteProfile: 12
    },
    {
      id: 'turkish-angora', en: 'Turkish Angora', personality: 'elegant',
      art: { fur: '#f7f5ed', furShade: '#cfcbbb', belly: '#ffffff', inner: '#ebaab0', eye: '#62a9b8', pattern: 'solid', coat: 'long', ears: 'big', body: 'slim', face: 'wedge' },
      hat: { shape: 'crown', main: '#7d2178', accent: '#f5cb45', charm: 'flower' },
      facts: ['A Turkish Angora has long white fur.', 'Its eyes may be blue or green.', 'It is clever and loves active play.'],
      tasteProfile: 13
    },
    {
      id: 'devon-rex', en: 'Devon Rex', personality: 'playful',
      art: { fur: '#9c7056', furShade: '#604333', belly: '#e9c8b4', inner: '#eaa8ae', eye: '#d2ad42', pattern: 'marble', coat: 'curly', ears: 'big', body: 'slim', face: 'wedge' },
      hat: { shape: 'mushroom', main: '#c22d79', accent: '#f3d447', charm: 'candle' },
      facts: ['A Devon Rex has soft curly fur.', 'Its ears are big for its head.', 'It loves jumping and making you laugh.'],
      tasteProfile: 14
    },
    {
      id: 'american-shorthair', en: 'American Shorthair', personality: 'dizzy',
      art: { fur: '#a9adb0', furShade: '#62676d', belly: '#e7e3d9', inner: '#e9a9af', eye: '#8eb64e', pattern: 'tabby', coat: 'short', ears: 'normal', body: 'normal', face: 'round' },
      hat: { shape: 'jester', main: '#087b78', accent: '#f6c93e', charm: 'none' },
      facts: ['This cat has silver stripes.', 'It once caught mice on farms.', 'It is calm, kind, and easy to love.'],
      tasteProfile: 15
    }
  ];

  for (var catIndex = 0; catIndex < MG.CATS.length; catIndex += 1) {
    var taste = deriveTaste(MG.CATS[catIndex].tasteProfile);
    MG.CATS[catIndex].loves = taste.loves;
    MG.CATS[catIndex].hates = taste.hates;
  }

  MG.CAT_BY_ID = {};
  for (var i = 0; i < MG.CATS.length; i += 1) {
    MG.CAT_BY_ID[MG.CATS[i].id] = MG.CATS[i];
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
