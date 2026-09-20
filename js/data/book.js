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
        'Cats use face hairs to sense space.',
        'A low dish leaves more room.',
        'A round bowl has curved sides.',
        'Each cat can like one shape.'
      ],
      [
        'Cats lower their heads to eat.',
        'Four-part trays keep food apart.',
        'Deep bowls keep food in place.',
        'Watch which bowl this cat picks.'
      ],
      [
        'Face hairs may touch a bowl edge.',
        'Some cats like a low rim.',
        'Some cats like tall sides.',
        'Your cat can show its own pick.'
      ]
    ], 'Which bowl shape does this cat like best?'),
    page('bowl-material', 2, 'What Bowls Are Made Of', [
      [
        'Clay is baked to make it hard.',
        'Metal feels cool and stays strong.',
        'Glass is clear, so food shows.',
        'A cat may like one bowl best.'
      ],
      [
        'Bamboo bowls feel light to lift.',
        'A clean bowl keeps food fresh.',
        'Hard bowls can make small sounds.',
        'This cat may like one bowl type.'
      ],
      [
        'Bowls can feel different to cats.',
        'Smooth bowls are easy to wipe.',
        'A steady bowl keeps food still.',
        'Watch which bowl this cat picks.'
      ]
    ], 'Which bowl type does this cat like best?'),
    page('water-place', 3, 'Water Spots', [
      [
        'Cats notice where water bowls sit.',
        'A window spot has light and views.',
        'A bed spot stays by a bed.',
        'Cats can pick different water spots.'
      ],
      [
        'Cats use their tongues to drink.',
        'A kitchen mat holds bowls still.',
        'A scratch post spot stays near play.',
        'Your cat can pick one safe spot.'
      ],
      [
        'Fresh water has no food smell.',
        'Cats may drink after play or food.',
        'A calm spot can help cats drink.',
        'Watch where this cat drinks most.'
      ]
    ], 'Which water spot does this cat like best?'),
    page('nap-texture', 4, 'Soft Places to Nap', [
      [
        'Fuzzy mats hold warm air.',
        'Cotton comes from plants.',
        'Cats feel cloth with their paws.',
        'Cats can pick different soft beds.'
      ],
      [
        'Stuffed pads have soft filling.',
        'Tight threads make firm cloth.',
        'Cats turn before they lie down.',
        'This cat may like one bed best.'
      ],
      [
        'Soft cloth bends under a cat.',
        'Some cloth feels smooth or bumpy.',
        'Cats may push cloth with their paws.',
        'Watch what helps this cat rest.'
      ]
    ], 'Which soft bed does this cat like best?'),
    page('nap-place', 5, 'Nap Places', [
      [
        'Cats sleep where they feel calm.',
        'A window bed gives light and views.',
        'A table makes shade below it.',
        'One cat may pick what others skip.'
      ],
      [
        'Quiet corners have fewer sudden sounds.',
        'A bookcase can make a safe edge.',
        'Cats may move beds as light moves.',
        'Your cat can pick one rest spot.'
      ],
      [
        'Cats stretch before they curl up.',
        'Sun can warm a bed by windows.',
        'A floor spot lets cats leave fast.',
        'Watch where this cat goes to rest.'
      ]
    ], 'Which nap place does this cat like best?'),
    page('toy-motion', 6, 'Toy Moves', [
      [
        'Cats watch toys with both eyes.',
        'Slow side moves are easy to watch.',
        'A ball rolls in a curved path.',
        'This cat may like one toy move.'
      ],
      [
        'Cats crouch before they jump.',
        'A soft bounce makes one small jump.',
        'A pause can make cats wait.',
        'Each cat can like a new move.'
      ],
      [
        'Cats use eyes and ears to play.',
        'Stop and go can seem alive.',
        'Small circles keep toys near floor.',
        'Watch which move makes this cat play.'
      ]
    ], 'Which toy move does this cat like best?'),
    page('toy-texture', 7, 'Toy Feel', [
      [
        'Cats touch toys with paws and teeth.',
        'Soft cloth feels fuzzy to paws.',
        'Crinkle cloth makes a soft sound.',
        'This cat can pick one toy feel.'
      ],
      [
        'Smooth rubber has an even feel.',
        'Soft bumps give paws a new feel.',
        'Cats may hit toys before biting.',
        'Cats can like different safe toy types.'
      ],
      [
        'Toy feel can change how cats grip.',
        'Fuzzy cloth bends under claws.',
        'Smooth toys can slide on floors.',
        'Watch which toy this cat picks.'
      ]
    ], 'Which toy feel does this cat like best?'),
    page('treat-flavor', 8, 'Treat Flavors', [
      [
        'Cats use smell when they find food.',
        'Chicken has a mild smell when cooked.',
        'Salmon has a strong fish smell.',
        'This cat can like one safe taste.'
      ],
      [
        'Turkey and beef smell different.',
        'A small cooked treat is easy to hold.',
        'Cats may smell a treat first.',
        'Your cat can pick one taste.'
      ],
      [
        'Cats have fewer taste buds than people.',
        'Smell helps cats choose food.',
        'Safe treats are plain, cooked, and small.',
        'Watch which taste this cat picks.'
      ]
    ], 'Which treat taste does this cat like best?'),
    page('treat-texture', 9, 'Treat Feel', [
      [
        'A soft bite is easy to chew.',
        'Thin meat strips break apart.',
        'A firm cube gives teeth more work.',
        'This cat may like one bite feel.'
      ],
      [
        'Loose meat breaks into light bits.',
        'Cats may lick soft treats first.',
        'Small bites help cats eat with care.',
        'Each cat can like a different bite.'
      ],
      [
        'The tongue moves food to the back.',
        'Teeth break cooked meat into bits.',
        'Cats may smell and touch food first.',
        'Watch which bite this cat picks.'
      ]
    ], 'Which treat bite does this cat like best?'),
    page('brush-type', 10, 'Brushes and Combs', [
      [
        'Cats clean fur with a rough tongue.',
        'Brush hairs lift loose fur.',
        'A hand mitt lets you feel strokes.',
        'This cat may like one tool.'
      ],
      [
        'A wide comb has space between teeth.',
        'Soft bumps move through loose fur.',
        'Short brush times let cats pause.',
        'Cats can like many brush tools.'
      ],
      [
        'Fur can catch loose hairs.',
        'A brush works best with light touch.',
        'Cats may turn away when done.',
        'Watch which tool this cat likes.'
      ]
    ], 'Which brush tool does this cat like best?'),
    page('touch-place', 11, 'Good Places to Touch', [
      [
        'Face hairs sit by cat noses.',
        'The chin sits below the mouth.',
        'A shoulder sits above front legs.',
        'This cat may like one touch spot.'
      ],
      [
        'Cats may lean toward trusted hands.',
        'Some cats like a slow back touch.',
        'Some cats like a short cheek touch.',
        'Your cat can show what feels good.'
      ],
      [
        'Cats use bodies to say stop.',
        'A calm body may welcome soft touch.',
        'Turning away asks for more room.',
        'Watch which touch spot this cat picks.'
      ]
    ], 'Which touch spot does this cat like best?'),
    page('hideout', 12, 'Places to Hide', [
      [
        'Cats hide when they need a break.',
        'A box has light walls around space.',
        'A cloth tunnel gives a covered path.',
        'This cat may like one safe place.'
      ],
      [
        'A basket can have a roof and hole.',
        'A wood den makes shade below.',
        'Cats peek out before they leave.',
        'Cats can pick many safe hide spots.'
      ],
      [
        'A hide spot lets cats watch.',
        'Soft walls may brush cat fur.',
        'A low hole lets cats come and go.',
        'Watch which hide spot this cat picks.'
      ]
    ], 'Which hide spot does this cat like best?'),
    page('perch-height', 13, 'Seat Heights', [
      [
        'Cats watch rooms from many heights.',
        'A floor seat keeps cats down low.',
        'A low stool lifts cats a bit.',
        'This cat may like one seat height.'
      ],
      [
        'A shelf gives a view across the room.',
        'A tall cat tree stands above things.',
        'High seats help cats see more.',
        'Each cat can pick a new level.'
      ],
      [
        'Cats bend their legs before jumping up.',
        'A firm seat gives paws room.',
        'Cats may climb down to look around.',
        'Watch which seat this cat picks.'
      ]
    ], 'Which seat level does this cat like best?'),
    page('greeting', 14, 'Quiet Hellos', [
      [
        'A slow blink can say hello.',
        'Side steps can feel less scary.',
        'A still hand gives time to sniff.',
        'This cat may like one hello.'
      ],
      [
        'Cats may greet people with soft sounds.',
        'A quiet voice makes less noise.',
        'Cats may look, blink, or come close.',
        'Each cat can pick a hello style.'
      ],
      [
        'Cats watch how people move.',
        'Slow moves give cats time to choose.',
        'Cats may walk away for more room.',
        'Watch which hello this cat likes.'
      ]
    ], 'Which hello does this cat like best?')
  ];
})(typeof globalThis !== 'undefined' ? globalThis : this);
