(function (root) {
  'use strict';
  var MG = root.MG = root.MG || {};

  /*
   * Sentence templates by reading level. `{h}` is the action hint noun phrase.
   * Every template contains its hint verbatim, so the feedback module can
   * find the exact sentence to quote. Templates in one tier are distinct so a
   * passage never uses the same shape twice for different facts.
   */
  MG.LEVELS = {
    basic: {
      liked: [
        'Your cat likes the {h}.'
      ],
      disliked: [
        'Your cat does not like the {h}.',
        'It does not like the {h}.',
        'It does not like the {h}.'
      ],
      fact: function (sentence) { return sentence; }
    },
    inference: {
      liked: [
        'Every time your cat sees the {h}, it purrs and runs straight to it.',
        'If you bring out the {h}, your cat will not leave your side.',
        'Your cat rubs its cheek on the {h} and stays there for hours.',
        'When the {h} appears, your cat comes running with its tail up high.',
        'Your cat waits by the {h} each morning, and its eyes light up when it gets a turn.'
      ],
      disliked: [
        'When your cat sees the {h}, its ears go flat and it walks away.',
        'Your cat sniffs the {h} once, then turns its back and leaves.',
        'If you offer the {h}, your cat hides under the bed until it is gone.',
        'Your cat swishes its tail at the {h} and will not go near it.',
        'The {h} makes your cat yawn and look for something else to do.',
        'Your cat pushes the {h} away with one paw and ignores it.'
      ],
      fact: function (sentence) { return sentence; }
    },
    advanced: {
      liked: [
        'Although the {h} might seem unremarkable to an observer, it is precisely what your cat gravitates toward whenever the opportunity arises.',
        'What consistently captures your cat\u2019s attention, to the exclusion of nearly everything else, is the {h}.',
        'Were you to provide the {h}, you would find your cat responding with an enthusiasm it rarely displays elsewhere.',
        'Your cat\u2019s preference for the {h} has proved remarkably stable, persisting regardless of how its surroundings change.',
        'Of all the alternatives it has encountered, the {h} is the one your cat returns to with unmistakable eagerness.'
      ],
      disliked: [
        'Despite repeated encouragement, your cat has shown no inclination whatsoever toward the {h}.',
        'The {h}, however appealing it may appear, is something your cat treats with conspicuous indifference.',
        'Your cat tends to withdraw the moment it is confronted with the {h}, which it evidently finds disagreeable.',
        'Contrary to what one might expect, the {h} elicits little more than a dismissive glance from your cat.',
        'Whatever merit the {h} may have in principle, your cat has made its aversion to it abundantly clear.',
        'It is worth noting that your cat has never once been observed to engage willingly with the {h}.'
      ],
      fact: function (sentence) { return sentence; }
    }
  };

  MG.tasteSentence = function (level, liked, hint, index) {
    var bank = MG.LEVELS[level] || MG.LEVELS.basic;
    var templates = liked ? bank.liked : bank.disliked;
    return templates[index % templates.length].replace('{h}', hint);
  };
})(globalThis);
