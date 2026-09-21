(function (root) {
  'use strict';
  var MG = root.MG = root.MG || {};

  // Reference drawing order: top-left, then clockwise.
  MG.FAMILY = [
    { id: 'dad', en: 'Dad', tagline: 'Square glasses and a warm smile' },
    { id: 'mom', en: 'Mom', tagline: 'Round glasses and gentle hands' },
    { id: 'jeongan', en: 'Jeongan', tagline: 'Round glasses and a big grin' },
    { id: 'suan', en: 'Suan', tagline: 'Long hair and a happy laugh' }
  ];
  MG.FAMILY_BY_ID = {};
  MG.FAMILY.forEach(function (member) { MG.FAMILY_BY_ID[member.id] = member; });

  // Nano Banana renders four play scenes and four dance frames for every pair.
  MG.SCENES_PER_PAIR = 4;
  MG.DANCE_FRAMES = 4;
  MG.playScene = function (characterId, catId, sceneIndex) {
    return 'assets/family/play/' + characterId + '--' + catId + '-' + (sceneIndex + 1) + '.webp';
  };
  MG.danceFrame = function (characterId, catId, frameIndex) {
    return 'assets/family/dance/' + characterId + '--' + catId + '-' + (frameIndex + 1) + '.webp';
  };
})(globalThis);
