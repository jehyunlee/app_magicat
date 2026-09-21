(function (root) {
  'use strict';
  var MG = (root.MG = root.MG || {});

  function page(group, pageNumber, titleEn, variants, askEn) {
    return {
      group: group,
      titleEn: titleEn,
      page: pageNumber,
      variants: variants,
      askEn: askEn
    };
  }

  MG.BOOK = [
    page('bowl-shape', 1, 'Bowl Shapes', [
      [
        'Whiskers are the long hairs near a cat’s nose.',
        'A low dish has short sides and more space.',
        'A round bowl has curved sides.',
        'Different cats like different bowl shapes.'
      ],
      [
        'Cats lower their heads to eat.',
        'A tray with four parts keeps foods apart.',
        'A deep bowl keeps food in one place.',
        'Your cat has its own favorite bowl.'
      ],
      [
        'A cat’s whiskers may touch the bowl’s sides.',
        'Some cats like dishes with low sides.',
        'Some cats like bowls with tall sides.',
        'Read which bowl your cat likes.'
      ]
    ], 'Which bowl shape does this cat like best?'),
    page('bowl-material', 2, 'What Bowls Are Made Of', [
      [
        'Clay is baked to make it hard.',
        'Metal feels cool and stays strong.',
        'Glass is clear, so you can see through it.',
        'Your cat may like one kind of bowl best.'
      ],
      [
        'Bamboo is a plant used to make some bowls.',
        'Bamboo bowls are usually light to carry.',
        'Hard bowls can make a sound when tapped.',
        'Your cat may notice these small differences.'
      ],
      [
        'Bowls can feel different to cats.',
        'Smooth bowls are easy to wipe clean.',
        'A steady bowl keeps food from moving.',
        'Your cat does not like every kind of bowl.'
      ]
    ], 'Which bowl type does this cat like best?'),
    page('water-place', 3, 'Places for Water', [
      [
        'Cats notice where their water bowls are.',
        'A bowl by a window may get sunlight.',
        'A bowl beside a bed is near their sleeping place.',
        'Different cats like drinking in different places.'
      ],
      [
        'Cats use their tongues to drink.',
        'A kitchen mat can keep a bowl from sliding.',
        'A scratch post is a place for scratching.',
        'Some cats like a drink near their scratch post.'
      ],
      [
        'Give your cat fresh water every day.',
        'Cats may drink after eating or playing.',
        'A quiet place can help a cat drink.',
        'Read where your cat likes its water bowl.'
      ]
    ], 'Where does this cat like its water?'),
    page('nap-texture', 4, 'Soft Places to Nap', [
      [
        'Fuzzy mats can keep a cat warm.',
        'Cotton comes from plants and is used in towels.',
        'Cats feel cloth with their paws.',
        'Different cats like different things to sleep on.'
      ],
      [
        'Stuffed pads have soft filling inside.',
        'Threads are the thin strings that make cloth.',
        'A blanket with tight threads can feel firm.',
        'Your cat may like a mat more than a blanket.'
      ],
      [
        'Soft cloth bends under a cat’s weight.',
        'Some cloth is smooth, and some has small bumps.',
        'Cats may push a blanket with their paws.',
        'Read what your cat likes to sleep on.'
      ]
    ], 'What does this cat like to sleep on?'),
    page('nap-place', 5, 'Places to Sleep', [
      [
        'Cats sleep where they feel calm.',
        'A bed by a window may be warm.',
        'A table makes shade below it.',
        'Cats do not all like the same sleeping place.'
      ],
      [
        'Quiet corners often have fewer sudden sounds.',
        'A bed can also sit beside a bookcase.',
        'Cats may change sleeping places during the day.',
        'Your cat has its own favorite place.'
      ],
      [
        'Cats sometimes stretch before lying down.',
        'Sunlight can warm a bed by a window.',
        'A bed on the floor is easy to reach.',
        'Read where your cat likes its bed.'
      ]
    ], 'Where does this cat like its bed?'),
    page('toy-motion', 6, 'Moving Toys', [
      [
        'Cats watch toys with both eyes.',
        'A wand can move slowly from side to side.',
        'A ball can roll in small circles.',
        'Your cat may like one toy movement best.'
      ],
      [
        'Cats bend their legs before jumping.',
        'A bouncing toy moves up and down.',
        'A toy can stop and then slide.',
        'Different cats like different ways of moving a toy.'
      ],
      [
        'Cats use their eyes and ears during play.',
        'A moving toy can look like a small animal.',
        'A ball can roll in circles on the floor.',
        'Read how your cat likes its toy to move.'
      ]
    ], 'How should you move this cat’s toy?'),
    page('toy-texture', 7, 'Different Toys', [
      [
        'Cats touch toys with their paws and teeth.',
        'A fuzzy mouse toy has a soft surface.',
        'Crinkle cloth makes a soft sound when touched.',
        'Your cat has a favorite kind of toy.'
      ],
      [
        'A smooth rubber toy has no raised bumps.',
        'A bumpy toy has small, soft bumps.',
        'Cats may hit a toy before picking it up.',
        'Different cats like different toys.'
      ],
      [
        'Cats use their paws to hold toys.',
        'Fuzzy cloth bends under a cat’s claws.',
        'Smooth toys can slide across the floor.',
        'Read which toy your cat likes.'
      ]
    ], 'Which toy does this cat like best?'),
    page('treat-flavor', 8, 'Meat Treats', [
      [
        'Cats smell their food before eating.',
        'Cooked chicken and salmon smell different.',
        'Salmon is a kind of fish.',
        'Your cat likes some treats more than others.'
      ],
      [
        'Turkey and chicken are different kinds of birds.',
        'Beef is meat from a cow.',
        'Give small pieces of cooked meat without salt.',
        'Your cat has a favorite kind of meat.'
      ],
      [
        'Cats have fewer taste buds than people.',
        'Taste buds help the tongue sense different tastes.',
        'Smell also helps a cat choose food.',
        'Give only small, plain, cooked treats.'
      ]
    ], 'Which meat treat does this cat like best?'),
    page('treat-texture', 9, 'Different Meat Pieces', [
      [
        'A soft piece of meat is easy to chew.',
        'Thin meat strips are long and narrow.',
        'A meat cube is a small, solid piece.',
        'Your cat may like one kind of meat piece.'
      ],
      [
        'Loose meat is already in small pieces.',
        'Cats may lick soft food before eating it.',
        'Small pieces are easier for a cat to eat.',
        'Cats can like different kinds of meat pieces.'
      ],
      [
        'A cat uses its tongue to move food.',
        'Its teeth break meat into smaller pieces.',
        'A cat may smell and touch food first.',
        'Read which meat pieces your cat likes.'
      ]
    ], 'Which meat pieces does this cat like best?'),
    page('brush-type', 10, 'Brushes and Combs', [
      [
        'Cats clean their fur with a rough tongue.',
        'A soft hair brush can remove loose fur.',
        'A grooming mitt is worn like a glove.',
        'Your cat may like one tool more than another.'
      ],
      [
        'A wide tooth comb has spaces between its teeth.',
        'A bumpy brush has soft, raised parts.',
        'Give your cat a break during brushing.',
        'Not every cat likes the same brush.'
      ],
      [
        'Brushing can remove loose hairs from a cat’s coat.',
        'Use a light touch when brushing.',
        'Stop if the cat moves away.',
        'Read which tool your cat likes.'
      ]
    ], 'Which brush or comb does this cat like best?'),
    page('touch-place', 11, 'Places to Touch', [
      [
        'The cheeks are on the sides of the face.',
        'The chin is below the mouth.',
        'The shoulders are above the front legs.',
        'Your cat may like being touched in one place.'
      ],
      [
        'A cat may lean toward a hand it trusts.',
        'Some cats like a soft touch on the back.',
        'Other cats like a soft touch on the cheek.',
        'Your cat has its own likes and dislikes.'
      ],
      [
        'A cat may move away to stop a touch.',
        'Use gentle hands when touching a cat.',
        'Give the cat space when it turns away.',
        'Read where your cat likes to be touched.'
      ]
    ], 'Where does this cat like a soft touch?'),
    page('hideout', 12, 'Places to Hide', [
      [
        'Cats hide when they need a quiet break.',
        'A cardboard box can be a hiding place.',
        'A cloth tunnel has a covered path inside.',
        'Your cat may like one hiding place best.'
      ],
      [
        'A covered basket has a top and an opening.',
        'A wood den is a small wooden shelter.',
        'Cats may look outside before leaving their hiding place.',
        'Different cats like different places to hide.'
      ],
      [
        'A hiding place lets a cat rest quietly.',
        'Soft walls may touch the cat’s fur.',
        'A large opening lets a cat leave easily.',
        'Read where your cat likes to hide.'
      ]
    ], 'Where does this cat like to hide?'),
    page('perch-height', 13, 'High and Low Seats', [
      [
        'Cats watch a room from different heights.',
        'A floor cushion is a low place to sit.',
        'A stool is a little higher than the floor.',
        'Your cat may like one seat best.'
      ],
      [
        'A shelf gives a view across the room.',
        'A tall cat tree has seats high above ground.',
        'High seats help cats see more of the room.',
        'Some cats like high seats; others like low seats.'
      ],
      [
        'Cats bend their legs before jumping up.',
        'A seat should be steady and wide enough.',
        'Cats may climb down to explore the room.',
        'Read which seat your cat likes.'
      ]
    ], 'Which seat does this cat like best?'),
    page('greeting', 14, 'Ways to Say Hello', [
      [
        'A slow blink can be a friendly sign.',
        'You can greet a cat from its side.',
        'A still hand gives the cat time to sniff.',
        'Your cat may like one kind of hello best.'
      ],
      [
        'Cats may greet people with soft sounds.',
        'A quiet voice is not as loud as shouting.',
        'A cat may look, blink, or walk closer.',
        'Different cats like different ways of saying hello.'
      ],
      [
        'Cats watch how people move.',
        'Move slowly so the cat can watch you.',
        'Let the cat walk away if it wants space.',
        'Read how your cat likes you to say hello.'
      ]
    ], 'How does this cat like you to say hello?')
  ];
})(typeof globalThis !== 'undefined' ? globalThis : this);
