(function (root) {
  'use strict';

  var MG = (root.MG = root.MG || {});

  MG.ACTIONS = [
    { id: 'bowl-shape-1', group: 'bowl-shape', en: 'Use a low, wide dish.', hint: 'low rim and wide food space', scene: 'food', prop: '🍽️', likeEn: 'Munch! This cat likes the low dish.', hateEn: 'Hiss! This cat skips the low dish.' },
    { id: 'bowl-shape-2', group: 'bowl-shape', en: 'Use a tray with four parts.', hint: 'four small food spots', scene: 'food', prop: '🥣', likeEn: 'Munch! This cat likes the four-part tray.', hateEn: 'Hiss! This cat skips the four-part tray.' },
    { id: 'bowl-shape-3', group: 'bowl-shape', en: 'Use a round bowl.', hint: 'round sides around food', scene: 'food', prop: '🍲', likeEn: 'Munch! This cat likes the round bowl.', hateEn: 'Hiss! This cat skips the round bowl.' },
    { id: 'bowl-shape-4', group: 'bowl-shape', en: 'Use a bowl with tall sides.', hint: 'tall sides around food', scene: 'food', prop: '🫙', likeEn: 'Munch! This cat likes the tall bowl.', hateEn: 'Hiss! This cat skips the tall bowl.' },

    { id: 'bowl-material-1', group: 'bowl-material', en: 'Use a clay bowl.', hint: 'hard, smooth clay bowl', scene: 'food', prop: '🏺', likeEn: 'Munch! This cat likes the clay bowl.', hateEn: 'Hiss! This cat skips the clay bowl.' },
    { id: 'bowl-material-2', group: 'bowl-material', en: 'Use a metal bowl.', hint: 'cool, hard metal bowl', scene: 'food', prop: '🥣', likeEn: 'Munch! This cat likes the metal bowl.', hateEn: 'Hiss! This cat skips the metal bowl.' },
    { id: 'bowl-material-3', group: 'bowl-material', en: 'Use a glass bowl.', hint: 'clear glass bowl', scene: 'food', prop: '🔵', likeEn: 'Munch! This cat likes the glass bowl.', hateEn: 'Hiss! This cat skips the glass bowl.' },
    { id: 'bowl-material-4', group: 'bowl-material', en: 'Use a bamboo bowl.', hint: 'light bamboo bowl', scene: 'food', prop: '🎋', likeEn: 'Munch! This cat likes the bamboo bowl.', hateEn: 'Hiss! This cat skips the bamboo bowl.' },

    { id: 'water-place-1', group: 'water-place', en: 'Put fresh water by the window.', hint: 'bright spot by the window', scene: 'water', prop: '💧', likeEn: 'Splash! This cat drinks by the window.', hateEn: 'Hiss! This cat skips the window spot.' },
    { id: 'water-place-2', group: 'water-place', en: 'Put fresh water by its bed.', hint: 'quiet spot by its bed', scene: 'water', prop: '🛏️', likeEn: 'Splash! This cat drinks by its bed.', hateEn: 'Hiss! This cat skips the bed spot.' },
    { id: 'water-place-3', group: 'water-place', en: 'Put fresh water on the kitchen mat.', hint: 'mat on the kitchen floor', scene: 'water', prop: '💧', likeEn: 'Splash! This cat drinks on the mat.', hateEn: 'Hiss! This cat skips the kitchen mat.' },
    { id: 'water-place-4', group: 'water-place', en: 'Put fresh water by the scratch post.', hint: 'spot by the scratch post', scene: 'water', prop: '🐾', likeEn: 'Splash! This cat drinks by the scratch post.', hateEn: 'Hiss! This cat skips the scratch post.' },

    { id: 'nap-texture-1', group: 'nap-texture', en: 'Give it a soft fuzzy mat.', hint: 'warm, soft fuzz under fur', scene: 'toy', prop: '🧶', likeEn: 'Purr! This cat naps on the fuzzy mat.', hateEn: 'Hiss! This cat skips the fuzzy mat.' },
    { id: 'nap-texture-2', group: 'nap-texture', en: 'Give it a thin cotton towel.', hint: 'thin cotton cloth under paws', scene: 'toy', prop: '🧻', likeEn: 'Purr! This cat naps on the cotton towel.', hateEn: 'Hiss! This cat skips the cotton towel.' },
    { id: 'nap-texture-3', group: 'nap-texture', en: 'Give it a soft stuffed pad.', hint: 'soft stuffing inside a pad', scene: 'toy', prop: '🛋️', likeEn: 'Purr! This cat naps on the stuffed pad.', hateEn: 'Hiss! This cat skips the stuffed pad.' },
    { id: 'nap-texture-4', group: 'nap-texture', en: 'Give it a blanket with tight threads.', hint: 'blanket with tight threads', scene: 'toy', prop: '🧣', likeEn: 'Purr! This cat naps on the tight-thread blanket.', hateEn: 'Hiss! This cat skips the tight-thread blanket.' },

    { id: 'nap-place-1', group: 'nap-place', en: 'Set a nap bed by the window.', hint: 'sunny spot by the window', scene: 'toy', prop: '🪟', likeEn: 'Purr! This cat rests by the window.', hateEn: 'Hiss! This cat skips the window bed.' },
    { id: 'nap-place-2', group: 'nap-place', en: 'Set a nap bed in a quiet corner.', hint: 'quiet corner with few steps', scene: 'toy', prop: '🛏️', likeEn: 'Purr! This cat rests in the quiet corner.', hateEn: 'Hiss! This cat skips the quiet corner.' },
    { id: 'nap-place-3', group: 'nap-place', en: 'Set a nap bed under the table.', hint: 'shade under a table', scene: 'toy', prop: '🪑', likeEn: 'Purr! This cat rests under the table.', hateEn: 'Hiss! This cat skips the table spot.' },
    { id: 'nap-place-4', group: 'nap-place', en: 'Set a nap bed by the bookcase.', hint: 'shelter beside the bookcase', scene: 'toy', prop: '📚', likeEn: 'Purr! This cat rests by the bookcase.', hateEn: 'Hiss! This cat skips the bookcase spot.' },

    { id: 'toy-motion-1', group: 'toy-motion', en: 'Move a wand slowly side to side.', hint: 'slow path from side to side', scene: 'toy', prop: '🪶', likeEn: 'Mew! This cat chases the slow wand.', hateEn: 'Hiss! This cat skips the slow wand.' },
    { id: 'toy-motion-2', group: 'toy-motion', en: 'Roll a ball in small circles.', hint: 'small circles around the room', scene: 'toy', prop: '⚽', likeEn: 'Mew! This cat chases the circling ball.', hateEn: 'Hiss! This cat skips the circling ball.' },
    { id: 'toy-motion-3', group: 'toy-motion', en: 'Bounce a toy once, very gently.', hint: 'one small jump in air', scene: 'toy', prop: '🔴', likeEn: 'Mew! This cat chases the light bounce.', hateEn: 'Hiss! This cat skips the light bounce.' },
    { id: 'toy-motion-4', group: 'toy-motion', en: 'Stop the toy, then slide it.', hint: 'short stop-and-slide path', scene: 'toy', prop: '➡️', likeEn: 'Mew! This cat chases the stop-and-slide toy.', hateEn: 'Hiss! This cat skips the stop-and-slide toy.' },

    { id: 'toy-texture-1', group: 'toy-texture', en: 'Give it a soft fuzzy mouse.', hint: 'fuzzy cloth under teeth', scene: 'toy', prop: '🐭', likeEn: 'Mew! This cat bats the fuzzy mouse.', hateEn: 'Hiss! This cat skips the fuzzy mouse.' },
    { id: 'toy-texture-2', group: 'toy-texture', en: 'Give it a crinkle cloth toy.', hint: 'cloth with a soft crinkle sound', scene: 'toy', prop: '🧻', likeEn: 'Mew! This cat bats the crinkle toy.', hateEn: 'Hiss! This cat skips the crinkle toy.' },
    { id: 'toy-texture-3', group: 'toy-texture', en: 'Give it a smooth rubber toy.', hint: 'even, smooth rubber', scene: 'toy', prop: '🔵', likeEn: 'Mew! This cat bats the smooth toy.', hateEn: 'Hiss! This cat skips the smooth toy.' },
    { id: 'toy-texture-4', group: 'toy-texture', en: 'Give it a soft bumpy toy.', hint: 'soft bumps on the toy', scene: 'toy', prop: '🟣', likeEn: 'Mew! This cat bats the bumpy toy.', hateEn: 'Hiss! This cat skips the bumpy toy.' },

    { id: 'treat-flavor-1', group: 'treat-flavor', en: 'Give it a cooked chicken treat.', hint: 'small bites of chicken meat', scene: 'food', prop: '🍗', likeEn: 'Munch! This cat likes the chicken treat.', hateEn: 'Hiss! This cat skips the chicken treat.' },
    { id: 'treat-flavor-2', group: 'treat-flavor', en: 'Give it a cooked salmon treat.', hint: 'small bites of salmon meat', scene: 'food', prop: '🐟', likeEn: 'Munch! This cat likes the salmon treat.', hateEn: 'Hiss! This cat skips the salmon treat.' },
    { id: 'treat-flavor-3', group: 'treat-flavor', en: 'Give it a cooked turkey treat.', hint: 'small bites of turkey meat', scene: 'food', prop: '🍖', likeEn: 'Munch! This cat likes the turkey treat.', hateEn: 'Hiss! This cat skips the turkey treat.' },
    { id: 'treat-flavor-4', group: 'treat-flavor', en: 'Give it a cooked beef treat.', hint: 'small bites of beef meat', scene: 'food', prop: '🥩', likeEn: 'Munch! This cat likes the beef treat.', hateEn: 'Hiss! This cat skips the beef treat.' },

    { id: 'treat-texture-1', group: 'treat-texture', en: 'Give it a soft meat bite.', hint: 'soft, moist meat piece', scene: 'food', prop: '🍖', likeEn: 'Munch! This cat likes the soft meat.', hateEn: 'Hiss! This cat skips the soft meat.' },
    { id: 'treat-texture-2', group: 'treat-texture', en: 'Give it thin meat strips.', hint: 'thin meat strips', scene: 'food', prop: '🍽️', likeEn: 'Munch! This cat likes the meat strips.', hateEn: 'Hiss! This cat skips the meat strips.' },
    { id: 'treat-texture-3', group: 'treat-texture', en: 'Give it a firm meat cube.', hint: 'firm, small meat cube', scene: 'food', prop: '🧊', likeEn: 'Munch! This cat likes the firm cube.', hateEn: 'Hiss! This cat skips the firm cube.' },
    { id: 'treat-texture-4', group: 'treat-texture', en: 'Give it a loose meat bite.', hint: 'loose meat pieces', scene: 'food', prop: '🐟', likeEn: 'Munch! This cat likes the loose meat.', hateEn: 'Hiss! This cat skips the loose meat.' },

    { id: 'brush-type-1', group: 'brush-type', en: 'Use a soft hair brush.', hint: 'soft hairs through fur', scene: 'hand', prop: '🪮', likeEn: 'Purr! This cat likes the soft hair brush.', hateEn: 'Hiss! This cat skips the soft hair brush.' },
    { id: 'brush-type-2', group: 'brush-type', en: 'Use a rubber hand mitt.', hint: 'rubber bumps on your hand', scene: 'hand', prop: '🧤', likeEn: 'Purr! This cat likes the rubber hand mitt.', hateEn: 'Hiss! This cat skips the rubber hand mitt.' },
    { id: 'brush-type-3', group: 'brush-type', en: 'Use a wide tooth comb.', hint: 'wide spaces between comb teeth', scene: 'hand', prop: '🪮', likeEn: 'Purr! This cat likes the wide tooth comb.', hateEn: 'Hiss! This cat skips the wide tooth comb.' },
    { id: 'brush-type-4', group: 'brush-type', en: 'Use a soft bumpy brush.', hint: 'soft bumps through fur', scene: 'hand', prop: '🖐️', likeEn: 'Purr! This cat likes the soft bumpy brush.', hateEn: 'Hiss! This cat skips the soft bumpy brush.' },

    { id: 'touch-place-1', group: 'touch-place', en: 'Give it a soft cheek touch.', hint: 'fingers beside its nose', scene: 'hand', prop: '🤏', likeEn: 'Purr! This cat likes the cheek touch.', hateEn: 'Hiss! This cat skips the cheek touch.' },
    { id: 'touch-place-2', group: 'touch-place', en: 'Give it a soft chin touch.', hint: 'fingers below its jaw', scene: 'hand', prop: '🤲', likeEn: 'Purr! This cat likes the chin touch.', hateEn: 'Hiss! This cat skips the chin touch.' },
    { id: 'touch-place-3', group: 'touch-place', en: 'Give it a soft shoulder touch.', hint: 'fingers above its front legs', scene: 'hand', prop: '🫳', likeEn: 'Purr! This cat likes the shoulder touch.', hateEn: 'Hiss! This cat skips the shoulder touch.' },
    { id: 'touch-place-4', group: 'touch-place', en: 'Give it a soft back touch.', hint: 'fingers along its back', scene: 'hand', prop: '🫳', likeEn: 'Purr! This cat likes the back touch.', hateEn: 'Hiss! This cat skips the back touch.' },

    { id: 'hideout-1', group: 'hideout', en: 'Give it a cardboard box.', hint: 'light walls around a small space', scene: 'toy', prop: '📦', likeEn: 'Mew! This cat rests in the cardboard box.', hateEn: 'Hiss! This cat skips the cardboard box.' },
    { id: 'hideout-2', group: 'hideout', en: 'Give it a cloth tunnel.', hint: 'soft covered path to walk through', scene: 'toy', prop: '🧵', likeEn: 'Mew! This cat walks through the cloth tunnel.', hateEn: 'Hiss! This cat skips the cloth tunnel.' },
    { id: 'hideout-3', group: 'hideout', en: 'Give it a covered basket.', hint: 'basket with a roof and hole', scene: 'toy', prop: '🧺', likeEn: 'Mew! This cat rests in the covered basket.', hateEn: 'Hiss! This cat skips the covered basket.' },
    { id: 'hideout-4', group: 'hideout', en: 'Give it a low wood den.', hint: 'low, dark wood space', scene: 'toy', prop: '🪵', likeEn: 'Mew! This cat rests in the wood den.', hateEn: 'Hiss! This cat skips the wood den.' },

    { id: 'perch-height-1', group: 'perch-height', en: 'Set a floor cushion seat.', hint: 'seat on the floor', scene: 'toy', prop: '🛋️', likeEn: 'Mew! This cat picks the floor seat.', hateEn: 'Hiss! This cat skips the floor seat.' },
    { id: 'perch-height-2', group: 'perch-height', en: 'Set a low stool seat.', hint: 'short seat above the floor', scene: 'toy', prop: '🪑', likeEn: 'Mew! This cat picks the low seat.', hateEn: 'Hiss! This cat skips the low seat.' },
    { id: 'perch-height-3', group: 'perch-height', en: 'Set a middle shelf seat.', hint: 'middle shelf above the floor', scene: 'toy', prop: '📚', likeEn: 'Mew! This cat picks the middle seat.', hateEn: 'Hiss! This cat skips the middle seat.' },
    { id: 'perch-height-4', group: 'perch-height', en: 'Set a tall cat-tree seat.', hint: 'high seat above the room', scene: 'toy', prop: '🌳', likeEn: 'Mew! This cat picks the tall seat.', hateEn: 'Hiss! This cat skips the tall seat.' },

    { id: 'greeting-1', group: 'greeting', en: 'Say hello with a slow blink.', hint: 'slow eye blink from far away', scene: 'hand', prop: '👀', likeEn: 'Purr! This cat likes the slow blink.', hateEn: 'Hiss! This cat skips the slow blink.' },
    { id: 'greeting-2', group: 'greeting', en: 'Say hello from the side.', hint: 'quiet hello from one side', scene: 'hand', prop: '↔️', likeEn: 'Purr! This cat likes the side hello.', hateEn: 'Hiss! This cat skips the side hello.' },
    { id: 'greeting-3', group: 'greeting', en: 'Hold out a still hand.', hint: 'still fingers near its nose', scene: 'hand', prop: '🖐️', likeEn: 'Purr! This cat likes the still hand.', hateEn: 'Hiss! This cat skips the still hand.' },
    { id: 'greeting-4', group: 'greeting', en: 'Say a soft hello.', hint: 'low voice, soft and calm', scene: 'hand', prop: '💬', likeEn: 'Purr! This cat likes the soft hello.', hateEn: 'Hiss! This cat skips the soft hello.' }
  ];

  MG.ACTION_BY_ID = {};
  MG.ACTIONS.forEach(function (action) {
    MG.ACTION_BY_ID[action.id] = action;
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
