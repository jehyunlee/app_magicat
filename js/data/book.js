(function (root) {
  'use strict';
  var MG = (root.MG = root.MG || {});

  /*
   * Every page is a fact bank. A passage is assembled from one intro, two
   * details and one tip, so the same page reads differently on each visit.
   */
  function page(group, pageNumber, titleEn, intro, detail, tip, askEn) {
    return {
      group: group,
      titleEn: titleEn,
      page: pageNumber,
      facts: { intro: intro, detail: detail, tip: tip },
      askEn: askEn
    };
  }

  MG.BOOK = [
    page('bowl-shape', 1, 'Bowl Shapes', [
      'Whiskers are the long hairs near a cat’s nose.',
      'Cats lower their heads to eat.',
      'Food bowls come in many shapes.',
      'A cat’s whiskers may touch the bowl’s sides.',
      'The shape of a bowl changes how a cat eats.'
    ], [
      'A low dish has short sides and more space.',
      'A round bowl has curved sides.',
      'A tray with four parts keeps foods apart.',
      'A deep bowl keeps food in one place.',
      'A square dish has four straight sides.',
      'A tilted bowl leans to one side.',
      'An oval plate is long and flat.',
      'A low stand lifts a bowl off the floor.'
    ], [
      'Different cats like different bowl shapes.',
      'Your cat has its own favorite bowl.',
      'Read which bowl your cat likes.',
      'Wash the bowl after every meal.',
      'Watch how your cat eats from each bowl.'
    ], 'Which bowl shape does this cat like best?'),
    page('bowl-material', 2, 'What Bowls Are Made Of', [
      'Bowls can be made of many materials.',
      'Bowls can feel different to cats.',
      'A cat may notice what its bowl is made of.',
      'Some bowls are heavy and some are light.',
      'Cats touch the bowl with their whiskers and tongue.'
    ], [
      'Clay is baked to make it hard.',
      'Metal feels cool and stays strong.',
      'Glass is clear, so you can see through it.',
      'Bamboo is a plant used to make some bowls.',
      'A wooden bowl is warm and light.',
      'A stone bowl is heavy and does not slide.',
      'A rubber bowl is soft and bends.',
      'A china bowl is smooth and white.'
    ], [
      'Your cat may like one kind of bowl best.',
      'Smooth bowls are easy to wipe clean.',
      'Your cat does not like every kind of bowl.',
      'A steady bowl keeps food from moving.',
      'Read which bowl type your cat likes.'
    ], 'Which bowl type does this cat like best?'),
    page('water-place', 3, 'Places for Water', [
      'Cats notice where their water bowls are.',
      'Cats use their tongues to drink.',
      'Give your cat fresh water every day.',
      'A cat may drink more in a place it likes.',
      'Water bowls can go in many rooms.'
    ], [
      'A bowl by a window may get sunlight.',
      'A bowl beside a bed is near their sleeping place.',
      'A kitchen mat can keep a bowl from sliding.',
      'Some cats like a drink near their scratch post.',
      'A hallway is a quiet path between rooms.',
      'A porch is outside the front door.',
      'A sofa is where people sit and rest.',
      'A bathroom floor is cool and smooth.'
    ], [
      'Different cats like drinking in different places.',
      'Read where your cat likes its water bowl.',
      'A quiet place can help a cat drink.',
      'Cats may drink after eating or playing.',
      'Move the bowl if your cat never drinks there.'
    ], 'Where does this cat like its water?'),
    page('nap-texture', 4, 'Soft Places to Nap', [
      'Cats feel cloth with their paws.',
      'Cats sleep on many kinds of cloth.',
      'Soft cloth bends under a cat’s weight.',
      'Threads are the thin strings that make cloth.',
      'Some cloth is smooth, and some has small bumps.'
    ], [
      'Fuzzy mats can keep a cat warm.',
      'Cotton comes from plants and is used in towels.',
      'Stuffed pads have soft filling inside.',
      'A blanket with tight threads can feel firm.',
      'Wool comes from sheep and feels warm.',
      'Silk is very smooth and cool.',
      'Velvet is soft and a little fuzzy.',
      'A straw mat is dry and a bit rough.'
    ], [
      'Different cats like different things to sleep on.',
      'Your cat may like a mat more than a blanket.',
      'Read what your cat likes to sleep on.',
      'Cats may push a blanket with their paws.',
      'Wash the cat’s bed now and then.'
    ], 'What does this cat like to sleep on?'),
    page('nap-place', 5, 'Places to Sleep', [
      'Cats sleep where they feel calm.',
      'Cats do not all like the same sleeping place.',
      'Cats may change sleeping places during the day.',
      'A cat sleeps for many hours each day.',
      'Cats sometimes stretch before lying down.'
    ], [
      'A bed by a window may be warm.',
      'A table makes shade below it.',
      'Quiet corners often have fewer sudden sounds.',
      'A bed can also sit beside a bookcase.',
      'A sofa is soft and high off the floor.',
      'A heater makes the air around it warm.',
      'A closet is dark and quiet inside.',
      'A bed by the front door sits near the entrance.'
    ], [
      'Your cat has its own favorite place.',
      'Read where your cat likes its bed.',
      'Sunlight can warm a bed by a window.',
      'A bed on the floor is easy to reach.',
      'Let a sleeping cat rest.'
    ], 'Where does this cat like its bed?'),
    page('toy-motion', 6, 'Moving Toys', [
      'Cats watch toys with both eyes.',
      'Cats use their eyes and ears during play.',
      'A moving toy can look like a small animal.',
      'Cats bend their legs before jumping.',
      'How a toy moves matters to a cat.'
    ], [
      'A wand can move slowly from side to side.',
      'A ball can roll in small circles.',
      'A bouncing toy moves up and down.',
      'A toy can stop and then slide.',
      'A string can zigzag across the floor.',
      'A toy on a string can spin around.',
      'A toy can shake and then stop.',
      'A toy under a blanket can wiggle like a mouse.'
    ], [
      'Your cat may like one toy movement best.',
      'Different cats like different ways of moving a toy.',
      'Read how your cat likes its toy to move.',
      'Keep toys away from a cat’s eyes.',
      'Stop the game when your cat walks away.'
    ], 'How should you move this cat’s toy?'),
    page('toy-texture', 7, 'Different Toys', [
      'Cats touch toys with their paws and teeth.',
      'Cats use their paws to hold toys.',
      'Toys can be soft, smooth or bumpy.',
      'A cat may hit a toy before picking it up.',
      'Cats carry small toys in their mouths.'
    ], [
      'A fuzzy mouse toy has a soft surface.',
      'Crinkle cloth makes a soft sound when touched.',
      'A smooth rubber toy has no raised bumps.',
      'A bumpy toy has small, soft bumps.',
      'A feather toy is light and floats down.',
      'A wool ball is soft and rolls.',
      'A cork toy is light and does not break.',
      'A paper ball rustles and rolls.'
    ], [
      'Your cat has a favorite kind of toy.',
      'Different cats like different toys.',
      'Read which toy your cat likes.',
      'Put toys away when the game ends.',
      'Fuzzy cloth bends under a cat’s claws.'
    ], 'Which toy does this cat like best?'),
    page('treat-flavor', 8, 'Meat Treats', [
      'Cats smell their food before eating.',
      'Cats have fewer taste buds than people.',
      'Smell helps a cat choose food.',
      'Cats are meat eaters.',
      'Different meats have different smells.'
    ], [
      'Cooked chicken and salmon smell different.',
      'Salmon is a kind of fish.',
      'Turkey and chicken are different kinds of birds.',
      'Beef is meat from a cow.',
      'Duck is a bird that swims.',
      'Cod is a white fish from the sea.',
      'Shrimp are small and live in water.',
      'Lamb is meat from a young sheep.'
    ], [
      'Your cat likes some treats more than others.',
      'Give small pieces of cooked meat without salt.',
      'Your cat has a favorite kind of meat.',
      'Give only small, plain, cooked treats.',
      'Read which meat your cat likes.'
    ], 'Which meat treat does this cat like best?'),
    page('treat-texture', 9, 'Different Meat Pieces', [
      'A cat uses its tongue to move food.',
      'Its teeth break meat into smaller pieces.',
      'A cat may smell and touch food first.',
      'Meat treats come in many shapes.',
      'Small pieces are easier for a cat to eat.'
    ], [
      'A soft piece of meat is easy to chew.',
      'Thin meat strips are long and narrow.',
      'A meat cube is a small, solid piece.',
      'Loose meat is already in small pieces.',
      'A crunchy chip breaks with a snap.',
      'Meat paste is smooth like a cream.',
      'A chewy stick takes time to eat.',
      'Freeze-dried meat is dry and light.'
    ], [
      'Your cat may like one kind of meat piece.',
      'Cats can like different kinds of meat pieces.',
      'Read which meat pieces your cat likes.',
      'Cats may lick soft food before eating it.',
      'Give treats only a few times a day.'
    ], 'Which meat pieces does this cat like best?'),
    page('brush-type', 10, 'Brushes and Combs', [
      'Cats clean their fur with a rough tongue.',
      'Brushing can remove loose hairs from a cat’s coat.',
      'There are many tools for brushing a cat.',
      'Not every cat likes the same brush.',
      'Use a light touch when brushing.'
    ], [
      'A soft hair brush can remove loose fur.',
      'A grooming mitt is worn like a glove.',
      'A wide tooth comb has spaces between its teeth.',
      'A bumpy brush has soft, raised parts.',
      'A fine tooth comb has teeth close together.',
      'A soft cloth can wipe dust from fur.',
      'A small round brush fits in one hand.',
      'A long-handled brush reaches the back.'
    ], [
      'Your cat may like one tool more than another.',
      'Give your cat a break during brushing.',
      'Stop if the cat moves away.',
      'Read which tool your cat likes.',
      'Brush in the direction the fur grows.'
    ], 'Which brush or comb does this cat like best?'),
    page('touch-place', 11, 'Places to Touch', [
      'A cat may lean toward a hand it trusts.',
      'Use gentle hands when touching a cat.',
      'Cats like being touched in some places only.',
      'A cat may move away to stop a touch.',
      'Every cat has its own likes and dislikes.'
    ], [
      'The cheeks are on the sides of the face.',
      'The chin is below the mouth.',
      'The shoulders are above the front legs.',
      'The back runs from the neck to the tail.',
      'The ears sit on top of the head.',
      'The forehead is above the eyes.',
      'The neck joins the head and the body.',
      'The sides are below the ribs.'
    ], [
      'Your cat may like being touched in one place.',
      'Give the cat space when it turns away.',
      'Read where your cat likes to be touched.',
      'Touch slowly so the cat can see your hand.',
      'Stop when the cat’s tail starts to swish.'
    ], 'Where does this cat like a soft touch?'),
    page('hideout', 12, 'Places to Hide', [
      'Cats hide when they need a quiet break.',
      'A hiding place lets a cat rest quietly.',
      'Cats may look outside before leaving their hiding place.',
      'Small dark spaces feel safe to cats.',
      'A good hiding place has an easy way out.'
    ], [
      'A cardboard box can be a hiding place.',
      'A cloth tunnel has a covered path inside.',
      'A covered basket has a top and an opening.',
      'A wood den is a small wooden shelter.',
      'A paper bag rustles when a cat climbs in.',
      'A small tent has cloth walls and a door.',
      'A laundry basket has tall sides.',
      'A shelf cubby is a small open box.'
    ], [
      'Your cat may like one hiding place best.',
      'Different cats like different places to hide.',
      'Read where your cat likes to hide.',
      'A large opening lets a cat leave easily.',
      'Never pull a cat out of its hiding place.'
    ], 'Where does this cat like to hide?'),
    page('perch-height', 13, 'High and Low Seats', [
      'Cats watch a room from different heights.',
      'Cats bend their legs before jumping up.',
      'High seats help cats see more of the room.',
      'Some cats like high seats; others like low seats.',
      'A seat should be steady and wide enough.'
    ], [
      'A floor cushion is a low place to sit.',
      'A stool is a little higher than the floor.',
      'A shelf gives a view across the room.',
      'A tall cat tree has seats high above ground.',
      'A window sill is a ledge under a window.',
      'A chair seat is about knee high.',
      'A table top is higher than a chair.',
      'The top of a wardrobe is near the ceiling.'
    ], [
      'Your cat may like one seat best.',
      'Read which seat your cat likes.',
      'Cats may climb down to explore the room.',
      'Make sure high seats are safe to jump from.',
      'Put a soft mat on the seat.'
    ], 'Which seat does this cat like best?'),
    page('greeting', 14, 'Ways to Say Hello', [
      'Cats watch how people move.',
      'Move slowly so the cat can watch you.',
      'A cat may look, blink, or walk closer.',
      'There are many ways to greet a cat.',
      'A calm hello helps a cat trust you.'
    ], [
      'A slow blink can be a friendly sign.',
      'You can greet a cat from its side.',
      'A still hand gives the cat time to sniff.',
      'A quiet voice is not as loud as shouting.',
      'Sitting down makes you look smaller.',
      'A slow wave is easy for a cat to see.',
      'A treat can make a hello sweeter.',
      'Cats can learn the sound of their names.'
    ], [
      'Your cat may like one kind of hello best.',
      'Different cats like different ways of saying hello.',
      'Read how your cat likes you to say hello.',
      'Let the cat walk away if it wants space.',
      'Never chase a cat to say hello.'
    ], 'How does this cat like you to say hello?'),
    page('scratch-post', 15, 'Things to Scratch', [
      'Cats scratch to keep their claws sharp.',
      'Scratching also stretches a cat’s back.',
      'Scratching leaves a cat’s smell behind.',
      'A cat may scratch after a long nap.',
      'A good scratcher should stay still.'
    ], [
      'A cardboard scratcher is light and cheap.',
      'A rope post is wrapped in thick rope.',
      'A carpet pad feels soft and thick.',
      'A wood board is hard and flat.',
      'Sisal is a rough plant fiber.',
      'A log with bark is like a tree trunk.',
      'A tall tower lets a cat stretch up high.',
      'A wall scratcher hangs on the wall.'
    ], [
      'Your cat may like one scratcher best.',
      'Different cats like different things to scratch.',
      'Read what your cat likes to scratch.',
      'Put the scratcher near where the cat sleeps.',
      'Praise the cat when it uses the scratcher.'
    ], 'What does this cat like to scratch?'),
    page('sound', 16, 'Sounds in the Room', [
      'Cats can hear sounds that people cannot.',
      'Cats turn their ears toward sounds.',
      'Loud sounds can scare a cat.',
      'Soft sounds can help a cat rest.',
      'Each cat likes different sounds.'
    ], [
      'Soft piano music is slow and gentle.',
      'Bird songs are high and chirpy.',
      'Rain sounds are soft and steady.',
      'A quiet room has almost no sound.',
      'A guitar has strings that hum.',
      'Ocean waves roll in and out.',
      'A clock ticks at the same speed all day.',
      'Humming is singing with a closed mouth.'
    ], [
      'Your cat may like one sound best.',
      'Read which sound your cat likes.',
      'A cat may fall asleep to gentle music.',
      'Keep the sound low, not loud.',
      'Turn the sound off if the cat leaves.'
    ], 'Which sound does this cat like best?'),
    page('play-time', 17, 'Time to Play', [
      'Cats sleep many hours each day.',
      'Cats often nap after they play.',
      'A short game can use up extra energy.',
      'Cats get playful at different times of day.',
      'A tired cat will walk away from a toy.'
    ], [
      'Some cats are lively in the morning.',
      'Other cats wake up at noon.',
      'Many cats get playful in the evening.',
      'Some cats want to play right before bed.',
      'Breakfast is the first meal of the day.',
      'A nap is a short sleep.',
      'Dinner is the meal in the evening.',
      'The afternoon comes after noon.'
    ], [
      'Your cat may like one playtime best.',
      'Different cats like playing at different times.',
      'Read when your cat likes to play.',
      'Watch the clock when your cat gets playful.',
      'Play at the same time each day.'
    ], 'When does this cat like to play?'),
    page('window-view', 18, 'Window Views', [
      'Cats like to look out of windows.',
      'Cats can watch a window for a long time.',
      'Moving things catch a cat’s eye.',
      'A perch lets a cat sit by the glass.',
      'Each window shows something different.'
    ], [
      'One window may show birds in a tree.',
      'Another window may show a garden.',
      'A street window shows cars and people.',
      'A sky window shows clouds and sun.',
      'A pond has water, fish and frogs.',
      'A park has grass, paths and dogs.',
      'Rooftops are the tops of houses.',
      'A flower box hangs under a window.'
    ], [
      'Your cat may like one view best.',
      'Different cats like different views.',
      'Read which window your cat likes.',
      'A quiet view can help a cat rest.',
      'Keep the window closed or covered with a screen.'
    ], 'Which window view does this cat like best?'),
    page('bed-shape', 19, 'Bed Shapes', [
      'Cat beds come in many shapes.',
      'Cats often curl up in a ball to sleep.',
      'A bed should be big enough to stretch.',
      'Some cats like to feel walls around them.',
      'Some cats like open beds.'
    ], [
      'A round bed has soft sides all around.',
      'A cave bed has a roof and a small door.',
      'A flat mat has no sides at all.',
      'A hammock bed hangs and swings a little.',
      'A donut bed has a soft ring around it.',
      'A box bed has straight sides and corners.',
      'A tiny sofa bed looks like a little couch.',
      'A tunnel bed is open at both ends.'
    ], [
      'Your cat may like one bed shape best.',
      'Different cats like different bed shapes.',
      'Read which bed shape your cat likes.',
      'Put the bed where the cat already naps.',
      'Add a soft blanket to any bed.'
    ], 'Which bed shape does this cat like best?'),
    page('game-type', 20, 'Games to Play', [
      'Cats like games that feel like hunting.',
      'Games help a cat stay fit and happy.',
      'Short games are best for most cats.',
      'A cat uses its paws in many games.',
      'Every cat has a favorite game.'
    ], [
      'In a chase game, the cat runs after a toy.',
      'In hide and seek, the cat looks for you.',
      'In fetch, a cat brings a toy back to you.',
      'A puzzle box hides treats inside little holes.',
      'In a treat hunt, treats are hidden around the room.',
      'In peekaboo, you hide your face and pop out.',
      'In a tunnel run, the cat dashes through a tunnel.',
      'Crumpled paper makes a crackling ball.'
    ], [
      'Your cat may like one game best.',
      'Different cats like different games.',
      'Read which game your cat likes.',
      'Stop the game when your cat walks away.',
      'Let the cat win sometimes.'
    ], 'Which game does this cat like best?'),
    page('plant-treat', 21, 'Plants for Cats', [
      'Some plants are safe for cats to eat.',
      'Only give plants that are safe for cats.',
      'Cats chew plants in small bites.',
      'A cat may sniff a plant before it chews.',
      'Some plants make cats want to play.'
    ], [
      'Cat grass is soft and green.',
      'Catnip makes many cats roll and play.',
      'Silver vine is a plant from the mountains.',
      'Oat grass has thin, long leaves.',
      'Wheat grass grows from wheat seeds.',
      'Barley grass is a young barley plant.',
      'Valerian is a plant with a strong smell.',
      'Honeysuckle wood is put inside some cat toys.'
    ], [
      'Your cat may like one plant best.',
      'Different cats like different plants.',
      'Read which plant your cat likes.',
      'Some cats do not care about catnip at all.',
      'Keep other house plants away from cats.'
    ], 'Which plant does this cat like best?'),
    page('water-bowl', 22, 'Ways to Serve Water', [
      'Cats need clean water every day.',
      'Cats drink with quick flicks of the tongue.',
      'Fresh water tastes better to cats.',
      'Some cats like to watch water move.',
      'There are many ways to serve water.'
    ], [
      'A small fountain keeps water moving.',
      'A wide bowl does not touch the whiskers.',
      'A tall cup lifts the water up high.',
      'An ice cube makes water cold and fun.',
      'A saucer is a small, shallow plate.',
      'A glass jar shows the water inside.',
      'Two bowls give a cat a choice.',
      'Some cats drink right next to their food.'
    ], [
      'Your cat may like one way best.',
      'Different cats drink in different ways.',
      'Read how your cat likes its water.',
      'Change the water when it looks dirty.',
      'Wash the water bowl every day.'
    ], 'How does this cat like its water?')
  ];
})(typeof globalThis !== 'undefined' ? globalThis : this);
