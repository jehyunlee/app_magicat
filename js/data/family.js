(function (root) {
  'use strict';
  var MG = root.MG = root.MG || {};

  /*
   * Reading level decides how the cat's tastes are worded in the book.
   *   basic     - stated directly ("Your cat likes the X.")
   *   inference - one reasoning step (behaviour described, taste implied)
   *   advanced  - Korean CSAT-style English: longer clauses, academic vocabulary
   */
  MG.FAMILY = [
    { id: 'dad', en: 'Dad', tagline: 'Square glasses and a warm smile', level: 'basic', levelEn: 'Easy reading' },
    { id: 'mom', en: 'Mom', tagline: 'Round glasses and gentle hands', level: 'basic', levelEn: 'Easy reading' },
    { id: 'jeongan', en: 'Jeongan', tagline: 'Round glasses and a big grin', level: 'basic', levelEn: 'Easy reading' },
    { id: 'suan', en: 'Suan', tagline: 'Long hair and a happy laugh', level: 'basic', levelEn: 'Easy reading' },
    { id: 'hunho', en: 'Hunho', tagline: 'Antler headband and a cool smile', level: 'advanced', levelEn: 'Advanced reading' },
    { id: 'yewon', en: 'Yewon', tagline: 'Side ponytail and round glasses', level: 'inference', levelEn: 'Think one step' }
  ];
  MG.READING_LEVELS = ['basic', 'inference', 'advanced'];
  MG.FAMILY_BY_ID = {};
  MG.FAMILY.forEach(function (member) { MG.FAMILY_BY_ID[member.id] = member; });

  // Nano Banana renders 24 play scenes and four dance frames for every pair.
  MG.SCENES_PER_PAIR = 24;
  MG.DANCE_FRAMES = 4;
  MG.playScene = function (characterId, catId, sceneIndex) {
    return 'assets/family/play/' + characterId + '--' + catId + '-' + (sceneIndex + 1) + '.webp';
  };
  MG.danceFrame = function (characterId, catId, frameIndex) {
    return 'assets/family/dance/' + characterId + '--' + catId + '-' + (frameIndex + 1) + '.webp';
  };
})(globalThis);
