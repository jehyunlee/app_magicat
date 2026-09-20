(function (root) {
  'use strict';
  var MG = root.MG = root.MG || {}, context, muted = false;
  function play(name) {
    if (muted) return;
    var Audio = root.AudioContext || root.webkitAudioContext;
    if (!Audio) return;
    try {
      context = context || new Audio();
      if (context.state === 'suspended') context.resume().catch(function () {});
      var notes = name === 'wrong' || name === 'bad' ? [220, 160] : name === 'ending' ? [523, 659, 784, 1047] : [659, 880];
      notes.forEach(function (frequency, index) {
        var oscillator = context.createOscillator(), gain = context.createGain();
        var start = context.currentTime + index * .13;
        oscillator.type = 'sine'; oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(.07, start + .015);
        gain.gain.exponentialRampToValueAtTime(.001, start + .22);
        oscillator.connect(gain); gain.connect(context.destination);
        oscillator.start(start); oscillator.stop(start + .23);
        oscillator.onended = function () { oscillator.disconnect(); gain.disconnect(); };
      });
    } catch (error) {
      // Audio is optional when a browser blocks its audio device.
    }
  }
  MG.Audio = { play: play, toggle: function () { muted = !muted; return muted; } };
})(globalThis);
