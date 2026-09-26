(function (root) {
  'use strict';
  var MG = root.MG = root.MG || {};

  /*
   * Advanced fact banks, keyed by page group. Same structure as MG.BOOK:
   * one intro, two details and one tip are drawn per passage. Written in the
   * register of the Korean CSAT English section: complex sentences, academic
   * vocabulary, and claims that require the reader to follow an argument.
   */
  MG.BOOK_ADVANCED = {
    'bowl-shape': {
      intro: [
        'The vibrissae, commonly known as whiskers, are exquisitely sensitive organs that convey spatial information to the feline brain.',
        'Because a cat must lower its head to eat, the geometry of its bowl inevitably shapes the entire experience of a meal.',
        'Few owners appreciate how profoundly the contours of a feeding vessel can influence a cat\u2019s willingness to eat.',
        'Contact between whiskers and the rim of a bowl is a subtle irritant that some cats tolerate and others actively avoid.',
        'Feeding equipment, though seldom given much thought, constitutes an environmental variable to which cats respond in markedly individual ways.'
      ],
      detail: [
        'A shallow dish, by virtue of its low rim, permits the cat to eat without its whiskers brushing against any surface.',
        'A rounded bowl gathers food toward its center, which some cats find convenient and others find constraining.',
        'A compartmentalized tray keeps distinct foods separate, catering to cats that object to mingled flavors.',
        'A deep bowl confines the meal to a single location but obliges the cat to insert its entire face.',
        'A square dish presents corners into which food may accumulate, requiring deliberate effort to retrieve.',
        'A tilted bowl exploits gravity to draw food toward the cat, reducing the need to reach.',
        'An oval plate offers an extended surface across which food can be dispersed rather than heaped.',
        'A bowl mounted on a low stand elevates the meal, sparing the cat the necessity of crouching.'
      ],
      tip: [
        'Individual preferences in this regard are remarkably consistent and rarely respond to persuasion.',
        'The only reliable method of identifying a cat\u2019s preferred vessel is patient observation.',
        'Hygiene remains paramount whatever shape is chosen, since residue can deter even a hungry cat.',
        'A cat that eats reluctantly from one bowl may eat eagerly from another of different design.',
        'Owners are advised to interpret hesitation at the bowl as information rather than obstinacy.'
      ]
    },
    'bowl-material': {
      intro: [
        'The material from which a bowl is fashioned affects its temperature, weight, acoustics, and even its faint odor.',
        'Cats possess sensory faculties acute enough to distinguish among materials that humans would regard as interchangeable.',
        'What appears to be arbitrary fussiness about a bowl frequently reflects genuine sensory discrimination.',
        'A feeding bowl is encountered several times daily, and its material properties are therefore of no small consequence.',
        'Manufacturers offer bowls in a bewildering variety of substances, each with distinct tactile and thermal characteristics.'
      ],
      detail: [
        'Clay, once fired, becomes hard and retains coolness, though it is susceptible to chipping.',
        'Metal conducts heat readily, so a steel bowl feels cool to the touch and resists damage.',
        'Glass is transparent and chemically inert, but it slides easily on a smooth floor.',
        'Bamboo is light and renewable, yet it absorbs moisture and may develop an odor over time.',
        'Wood offers warmth and quietness but demands diligent cleaning to prevent contamination.',
        'Stone is heavy enough to remain stationary, an attribute that some cats find reassuring.',
        'Rubber is pliable and silent, though its scent may deter a particularly fastidious cat.',
        'China, or porcelain, is smooth and easily sanitized, which makes it a common choice.'
      ],
      tip: [
        'A bowl that shifts or rattles during a meal may be rejected regardless of its contents.',
        'Materials that are simple to clean tend to sustain a cat\u2019s appetite over the long term.',
        'No single material suits every cat; the appropriate choice is the one your cat accepts.',
        'Switching materials abruptly may provoke a temporary refusal that resolves within days.',
        'Attentive observation will reveal which surface your cat consistently favors.'
      ]
    },
    'water-place': {
      intro: [
        'Where water is placed within a home has a measurable effect on how much a cat drinks.',
        'Cats evolved in arid environments and consequently drink sparingly, which makes the location of water surprisingly consequential.',
        'A water bowl positioned in an unappealing spot may be ignored even when the cat is thirsty.',
        'The feline tongue laps water through a mechanism of remarkable efficiency, but only if the cat elects to approach the bowl.',
        'Hydration in cats depends not merely on availability but on the perceived safety and convenience of the source.'
      ],
      detail: [
        'A bowl placed beside a window benefits from natural light but may be exposed to disturbance.',
        'Water near the sleeping area is convenient, though some cats dislike drinking where they rest.',
        'A kitchen mat stabilizes the bowl and confines any spillage to a washable surface.',
        'Positioning water near a scratching post associates drinking with an already familiar location.',
        'A hallway is a transitional space that certain cats regard as neutral territory.',
        'A porch exposes the water to outdoor temperatures and the occasional visiting insect.',
        'Placement beside a sofa situates the bowl within the household\u2019s social center.',
        'A bathroom offers coolness and a tiled floor, which some cats appear to prefer.'
      ],
      tip: [
        'Cats commonly drink after eating or exertion, so accessibility at those moments matters.',
        'If a bowl is persistently ignored, relocating it is more effective than replacing it.',
        'Multiple water stations can mitigate the risk of under-hydration in a multi-room home.',
        'Freshness is essential: stale water is a frequent and easily remedied cause of refusal.',
        'A tranquil location generally encourages more frequent visits than a busy one.'
      ]
    },
    'nap-texture': {
      intro: [
        'The tactile quality of bedding is registered chiefly through the paws, which are densely supplied with nerve endings.',
        'Textiles differ in warmth, friction, and compressibility, each of which influences a cat\u2019s choice of resting surface.',
        'A cat\u2019s selection of napping fabric is neither random nor trivial but reflects consistent sensory preferences.',
        'Cloth is composed of interwoven threads whose tightness and fiber determine how it feels beneath a sleeping animal.',
        'Observant owners soon notice that their cats gravitate toward particular textures with striking regularity.'
      ],
      detail: [
        'Fleece traps a layer of warm air within its pile and is therefore favored in cooler rooms.',
        'Cotton, being a plant fiber, breathes well and remains relatively cool against the body.',
        'A stuffed pad yields under weight and conforms to the contours of the sleeper.',
        'A tightly woven blanket feels firmer and offers less give than a loosely knitted one.',
        'Wool retains warmth even when damp, a property inherited from the sheep that produced it.',
        'Silk is exceptionally smooth and dissipates heat, making it agreeable in warm weather.',
        'Velvet possesses a short, dense pile that many cats find pleasant to knead.',
        'A straw mat is dry and faintly abrasive, qualities that appeal to a minority of cats.'
      ],
      tip: [
        'Kneading a fabric before settling is a reliable sign of approval.',
        'Preferences may shift with the seasons as ambient temperature changes.',
        'Laundering bedding periodically preserves both hygiene and the cat\u2019s willingness to use it.',
        'A rejected fabric should be exchanged rather than persisted with.',
        'The texture your cat chooses unprompted is the one worth providing.'
      ]
    },
    'nap-place': {
      intro: [
        'Cats select sleeping locations according to a calculus of warmth, security, and vantage that owners can only partly infer.',
        'Because a cat spends the greater part of each day asleep, the placement of its bed is a matter of genuine welfare.',
        'A resting site that feels exposed will be abandoned, however comfortable the bedding itself.',
        'Cats frequently rotate among several sleeping places over the course of a day, following light and temperature.',
        'The site a cat chooses for sleep reveals a good deal about what it considers safe.'
      ],
      detail: [
        'A bed beneath a window receives direct sunlight, which many cats seek out for warmth.',
        'The space under a table offers overhead cover, an arrangement that reduces perceived vulnerability.',
        'A secluded corner minimizes sudden disturbances and thus favors uninterrupted rest.',
        'A bed alongside a bookcase gains a solid wall on one side, which some cats find reassuring.',
        'A sofa is elevated and cushioned but situated amid household activity.',
        'Proximity to a heater provides warmth at the cost of drier air.',
        'A closet is dim and enclosed, and its stillness appeals to cats of a retiring disposition.',
        'A bed near the entrance affords a view of comings and goings, which alert cats appreciate.'
      ],
      tip: [
        'A sleeping cat should never be roused for the owner\u2019s convenience.',
        'The location a cat selects spontaneously is a better guide than any bed purchased for it.',
        'Beds on the floor are readily accessible to older or less agile animals.',
        'Seasonal changes in light often prompt corresponding changes in resting place.',
        'Patience is required, since a new bed may be ignored for weeks before it is adopted.'
      ]
    },
    'toy-motion': {
      intro: [
        'The manner in which a toy moves determines whether it triggers the predatory sequence that underlies feline play.',
        'A cat\u2019s visual system is specialized for detecting motion, particularly the erratic movement characteristic of small prey.',
        'Stationary toys are frequently ignored, whereas the same objects in motion may provoke intense interest.',
        'Play in cats is, in essence, rehearsal for hunting, and the trajectory of a toy dictates how convincing that rehearsal feels.',
        'Owners who understand the significance of movement can transform an indifferent cat into an eager participant.'
      ],
      detail: [
        'A wand moved slowly from side to side mimics a creature traversing open ground.',
        'A ball rolled in tight circles simulates prey that is confined or wounded.',
        'A single gentle bounce introduces vertical motion, which some cats find irresistible.',
        'Halting a toy and then sliding it forward reproduces the stop-and-start pattern of a cautious animal.',
        'A string dragged in a zigzag exploits the cat\u2019s tendency to anticipate direction changes.',
        'A toy spun on a cord presents continuous rotational movement that is difficult to track.',
        'Shaking a toy vigorously and then pausing creates suspense that many cats find compelling.',
        'A toy wriggled beneath a blanket conceals its form and appeals to the instinct to pounce on hidden prey.'
      ],
      tip: [
        'A session should conclude with a successful capture to avoid frustration.',
        'Cats disengage when a movement pattern becomes predictable.',
        'The style of motion a cat pursues most persistently is the one to reproduce.',
        'Toys should be kept clear of the eyes, since sudden movements near the face may startle.',
        'Brief, frequent sessions are more effective than prolonged ones.'
      ]
    },
    'toy-texture': {
      intro: [
        'Cats investigate toys not only visually but through the paws and mouth, so surface texture is far from incidental.',
        'The feel of a toy in the mouth largely determines whether a cat will carry, bite, or discard it.',
        'Texture, in the feline assessment of a toy, can outweigh both size and color.',
        'A toy that yields satisfyingly to the teeth is retained; one that does not is soon abandoned.',
        'Manufacturers vary the materials of toys precisely because cats respond to them so differently.'
      ],
      detail: [
        'A plush mouse offers a soft, slightly yielding surface reminiscent of fur.',
        'Crinkle fabric emits a faint rustle when compressed, engaging the sense of hearing as well as touch.',
        'Smooth rubber presents an unbroken surface that slides readily across a floor.',
        'A toy with soft protrusions provides varied tactile feedback to the paws.',
        'Feathers are light and drift unpredictably, evoking the movement of birds.',
        'A ball of wool is compressible and may be unraveled, to the delight of some cats.',
        'Cork is buoyant, lightweight, and resistant to being torn apart.',
        'A crumpled paper ball combines lightness with an appealing crackle.'
      ],
      tip: [
        'Toys should be stored between sessions to preserve their novelty.',
        'Any toy that begins to shed parts should be withdrawn to prevent ingestion.',
        'The texture a cat carries about the house is the one it esteems most.',
        'Rotating among several textures sustains interest more effectively than offering one.',
        'A discarded toy is not necessarily disliked; it may simply be temporarily exhausted.'
      ]
    },
    'treat-flavor': {
      intro: [
        'Cats are obligate carnivores whose sense of smell, rather than taste, governs most of their dietary decisions.',
        'With far fewer taste receptors than humans, cats rely on olfaction to evaluate whether a morsel merits attention.',
        'The aroma of cooked meat varies considerably by species, and cats discriminate among these aromas with precision.',
        'A treat rejected on first sniff is unlikely to be reconsidered, whatever its nutritional merit.',
        'Flavor preferences in cats are established early and tend to persist throughout adulthood.'
      ],
      detail: [
        'Chicken, when cooked without seasoning, has a mild aroma that many cats accept readily.',
        'Salmon carries a pronounced oceanic scent that some cats find enticing and others find excessive.',
        'Turkey, though superficially similar to chicken, possesses a distinctly deeper flavor.',
        'Beef offers a robust, iron-rich taste that appeals to a subset of cats.',
        'Duck is fattier than most poultry and correspondingly richer in aroma.',
        'Cod is a white fish with a delicate flavor that does not overwhelm.',
        'Shrimp is briny and distinctive, provoking strong reactions in either direction.',
        'Lamb has a characteristic gamey quality that a minority of cats particularly relish.'
      ],
      tip: [
        'Treats must be plainly cooked; seasoning, salt, and onion are harmful to cats.',
        'Portions should remain small, since treats supplement rather than replace a balanced diet.',
        'A cat\u2019s preferred flavor is best discovered by offering tiny samples of several.',
        'Refusal of a novel flavor may reflect caution rather than genuine dislike.',
        'Consistency of preference across repeated offerings is the surest indicator.'
      ]
    },
    'treat-texture': {
      intro: [
        'The consistency of a treat, quite apart from its flavor, strongly influences whether a cat will consume it.',
        'Feline teeth are adapted for shearing rather than grinding, which shapes how different textures are handled.',
        'A cat\u2019s tongue, covered in backward-facing papillae, manipulates food in ways that favor certain textures.',
        'Some cats lick soft foods before biting, whereas others seize firm pieces immediately.',
        'Texture preferences often account for the puzzling rejection of a treat whose flavor a cat is known to enjoy.'
      ],
      detail: [
        'A soft, moist piece requires minimal chewing and suits cats with sensitive mouths.',
        'Thin strips can be torn easily and provide the satisfaction of shredding.',
        'A firm cube demands sustained chewing and rewards cats that enjoy resistance.',
        'Loose, flaked meat is already fragmented and can be eaten without effort.',
        'A crunchy chip fractures audibly, which some cats find gratifying.',
        'A smooth paste is consumed by licking and delivers flavor almost instantly.',
        'A chewy stick occupies a cat for an extended period and exercises the jaw.',
        'Freeze-dried meat is light, brittle, and rehydrates in the mouth.'
      ],
      tip: [
        'Small pieces reduce the risk of choking, regardless of texture.',
        'Treats ought to be offered sparingly, ideally no more than a few times daily.',
        'A cat that licks but does not bite is expressing a preference for softer fare.',
        'Alternating textures may forestall the boredom that leads to refusal.',
        'The texture a cat finishes most eagerly is the one to favor.'
      ]
    },
    'brush-type': {
      intro: [
        'Although cats groom themselves assiduously, human assistance remains valuable for removing loose fur and detecting problems.',
        'Grooming tools differ in the pressure they exert and the sensation they impart, and cats are discerning about both.',
        'A cat\u2019s tolerance of brushing depends less on the owner\u2019s intent than on the instrument employed.',
        'The rough feline tongue is an effective comb, but it cannot reach every part of the coat.',
        'Selecting an appropriate brush is the difference between a welcome ritual and a daily struggle.'
      ],
      detail: [
        'A soft-bristled brush lifts loose hair without pulling and is tolerated by most cats.',
        'A grooming mitt, worn on the hand, disguises brushing as stroking.',
        'A wide-toothed comb separates fur gently and is suited to longer coats.',
        'A brush with soft rubber nubs massages the skin while collecting shed hair.',
        'A fine-toothed comb removes debris and detects parasites but may tug at tangles.',
        'A damp cloth wipes dust from the coat and is minimally intrusive.',
        'A small round brush fits comfortably in the palm and permits precise strokes.',
        'A long-handled brush reaches the back without requiring the cat to be restrained.'
      ],
      tip: [
        'Brushing should proceed in the direction of hair growth to avoid discomfort.',
        'Short sessions, terminated before the cat objects, build tolerance over time.',
        'A cat that turns away or flattens its ears is requesting an end to the session.',
        'Light pressure is invariably preferable to thoroughness.',
        'The tool a cat leans into is the tool to keep.'
      ]
    },
    'touch-place': {
      intro: [
        'Cats accept physical contact on their own terms, and the location of a touch matters as much as its gentleness.',
        'Regions of the feline body vary considerably in their sensitivity, and cats communicate these differences unmistakably.',
        'A touch that is welcomed in one place may be resented in another, even when delivered with identical care.',
        'Trust between a cat and its owner is often built, or damaged, through the handling of a few sensitive areas.',
        'Reading a cat\u2019s response to touch requires attention to its posture, ears, and tail rather than to its vocalizations alone.'
      ],
      detail: [
        'The cheeks house scent glands, and rubbing there is generally received as an exchange of greeting.',
        'Beneath the chin is a spot that most cats find agreeable and that few resent.',
        'The shoulders, sitting above the forelegs, tolerate firm pressure that would be unwelcome elsewhere.',
        'A stroke along the back is accepted by many cats, though it may overstimulate some.',
        'Behind the ears lies another concentration of scent glands that many cats enjoy having touched.',
        'The forehead is a common site for head-butting and is therefore accustomed to contact.',
        'The neck is sensitive but usually tolerant, particularly when the cat is relaxed.',
        'The flanks are variably received and should be approached with caution.'
      ],
      tip: [
        'Approach slowly and allow the cat to observe your hand before making contact.',
        'A twitching tail is an early warning that the touch has become unwelcome.',
        'Withdrawal on the cat\u2019s part should be respected without exception.',
        'Contact initiated by the cat is the most reliable indication of a favored location.',
        'Consistency in where and how one touches fosters a cat\u2019s confidence.'
      ]
    },
    'hideout': {
      intro: [
        'The impulse to conceal oneself is deeply ingrained in cats, which are simultaneously predators and potential prey.',
        'A refuge, however modest, affords a cat the sense of control that underpins its wellbeing.',
        'Cats withdraw not only when frightened but also when they simply require respite from stimulation.',
        'The architecture of a hiding place, its enclosure, exits, and materials, determines how secure it feels.',
        'A cat deprived of hiding places may exhibit stress that manifests in unexpected ways.'
      ],
      detail: [
        'A cardboard box offers opaque walls and insulation, which explains its enduring popularity.',
        'A fabric tunnel provides a covered passage with an exit at either end.',
        'A covered basket combines a roof with a single, defensible entrance.',
        'A wooden den is sturdy and dim, appealing to cats that prize solidity.',
        'A paper bag rustles on entry, a feature that some cats relish and others avoid.',
        'A small tent has soft walls and a doorway that can be surveyed from within.',
        'A laundry basket is deep-sided and often scented with familiar household odors.',
        'A cubby on a shelf elevates the refuge above floor-level traffic.'
      ],
      tip: [
        'A cat should never be extracted forcibly from its chosen refuge.',
        'A generous opening ensures the cat does not feel trapped within.',
        'Peering out before emerging is normal and should not be hurried.',
        'Several refuges distributed through the home reduce competition among cats.',
        'The hiding place a cat returns to unprompted is the one that satisfies it.'
      ]
    },
    'perch-height': {
      intro: [
        'Height confers a strategic advantage that cats instinctively value, though not all cats value it equally.',
        'From an elevated position a cat surveys its territory while remaining beyond the reach of ground-level disturbance.',
        'Preferred perching height varies with age, temperament, and the layout of the home.',
        'A cat\u2019s hind limbs generate the explosive power needed to reach perches far above its own height.',
        'Vertical space is, for a cat, as meaningful a resource as floor area.'
      ],
      detail: [
        'A floor cushion places the cat at the level of household traffic, which suits sociable animals.',
        'A low stool provides a modest elevation that older cats can attain without strain.',
        'A mid-height shelf affords a panoramic view without demanding an ambitious leap.',
        'A tall cat tree elevates the animal above all furniture and most human activity.',
        'A window sill combines elevation with a view of the outdoors.',
        'A chair seat is easily reached and frequently pre-warmed by a departing human.',
        'A table top is higher still, though it may bring the cat into conflict with household rules.',
        'The top of a wardrobe is the highest attainable point in many homes and is prized accordingly.'
      ],
      tip: [
        'Any elevated perch should permit a safe descent as well as a safe ascent.',
        'A soft surface on a perch increases the likelihood of its adoption.',
        'The height a cat chooses repeatedly is the height it finds optimal.',
        'Perches near windows are doubly attractive, offering both elevation and stimulation.',
        'Older cats may require intermediate steps to reach favored heights.'
      ]
    },
    'greeting': {
      intro: [
        'Cats read human approach with considerable subtlety, attending to speed, angle, and posture.',
        'A greeting that seems friendly to a person may register as a threat to a cat if it is delivered too directly.',
        'The etiquette of feline greeting emphasizes restraint, patience, and the ceding of initiative to the cat.',
        'Cats acknowledge one another through slow blinks and gentle head-butts, gestures humans can emulate.',
        'How one says hello to a cat sets the tone for every subsequent interaction.'
      ],
      detail: [
        'A deliberately slow blink signals that one poses no threat and is often reciprocated.',
        'Approaching from the side rather than head-on reduces the impression of confrontation.',
        'A hand extended and held still permits the cat to investigate at its own pace.',
        'A quiet voice conveys calm, whereas loud tones are almost universally unwelcome.',
        'Sitting down diminishes one\u2019s apparent size and thereby one\u2019s menace.',
        'A slow wave is easily perceived and interpreted as nonaggressive.',
        'Presenting a treat associates the greeting with reward.',
        'Cats learn their names and may respond to being addressed by them.'
      ],
      tip: [
        'The cat, not the person, should decide when contact occurs.',
        'A cat that withdraws is not being rude but exercising a legitimate preference.',
        'Never pursue a retreating cat, however well-intentioned the pursuit.',
        'Consistency in greeting style allows a cat to anticipate and relax.',
        'The greeting a cat approaches is the greeting to repeat.'
      ]
    },
    'scratch-post': {
      intro: [
        'Scratching serves multiple functions for a cat: it sheds the outer claw sheath, stretches the spine, and deposits scent.',
        'Far from being mere destructiveness, scratching is an essential behavior that responsible owners accommodate rather than suppress.',
        'The surface a cat prefers to scratch is determined by resistance, texture, and stability.',
        'Cats typically scratch upon waking, and a suitable surface near the sleeping area is therefore invaluable.',
        'A scratching surface that wobbles will be rejected in favor of furniture that does not.'
      ],
      detail: [
        'Corrugated cardboard is inexpensive, shreds satisfyingly, and can be replaced when exhausted.',
        'A post wrapped in sisal rope offers firm resistance and lasts for years.',
        'A carpeted pad is soft underfoot but may confuse cats about which carpets are permissible.',
        'A flat wooden board provides an unyielding surface that some cats specifically seek.',
        'A sisal mat can be laid on the floor for horizontal scratchers.',
        'A log retaining its bark most closely approximates a tree trunk.',
        'A tall tower permits a full-body stretch and doubles as a perch.',
        'A wall-mounted scratcher saves floor space and suits vertical scratchers.'
      ],
      tip: [
        'Praise at the moment of use reinforces the desired location.',
        'Placement near the sleeping area exploits the post-nap scratching habit.',
        'Stability is nonnegotiable; an unstable post will not be used.',
        'A cat may prefer horizontal or vertical scratching, and both should be available.',
        'The surface a cat scratches spontaneously reveals its preference more clearly than any purchase.'
      ]
    },
    sound: {
      intro: [
        'The feline auditory range extends well beyond the human, encompassing frequencies that we cannot perceive.',
        'Sounds that seem innocuous to a person may be intrusive or even distressing to a cat.',
        'Cats orient their ears independently toward sources of sound, an ability that betrays their attentiveness.',
        'The acoustic environment of a home influences a cat\u2019s stress level more than most owners suppose.',
        'Certain sounds soothe cats while others agitate them, and the distinction is highly individual.'
      ],
      detail: [
        'Slow piano music has been found in some studies to reduce signs of stress in cats.',
        'Recorded birdsong engages the predatory attention without provoking alarm.',
        'The steady patter of rain resembles white noise and can mask startling sounds.',
        'Complete silence suits some cats and unsettles others accustomed to household noise.',
        'A softly played guitar shares the gentle sustained tones that many cats tolerate well.',
        'Ocean waves provide a rhythmic, low-frequency sound that some cats find calming.',
        'The ticking of a clock is regular and predictable, qualities that reassure.',
        'Quiet humming is a human vocalization that cats often associate with contentment.'
      ],
      tip: [
        'Volume should be kept low, since loudness rarely improves a cat\u2019s reception of any sound.',
        'A cat that leaves the room has cast its vote, and the sound should be discontinued.',
        'Sudden, sharp noises are to be avoided regardless of the ambient soundscape.',
        'A cat that settles and sleeps during a sound has evidently approved it.',
        'Preferences for sound are as individual as preferences for food.'
      ]
    },
    'play-time': {
      intro: [
        'Cats are crepuscular by inheritance, meaning their activity peaks at dawn and dusk, though domestic life reshapes this rhythm.',
        'The timing of play affects both its intensity and its aftermath, since exercise is typically followed by rest.',
        'A cat\u2019s daily cycle of sleeping and waking is more regular than it appears and can be accommodated by observant owners.',
        'Play offered at the wrong time is politely ignored; play offered at the right time is seized upon.',
        'Scheduling play to coincide with natural peaks of alertness makes each session more rewarding.'
      ],
      detail: [
        'Some cats emerge from sleep in the morning ready for vigorous activity.',
        'Others rouse themselves around midday, when the household is quiet.',
        'Evening is the classic period of feline exuberance, mirroring the dusk hunt.',
        'A session immediately before bed can expend energy that would otherwise disturb the night.',
        'Play following breakfast capitalizes on the alertness that a meal produces.',
        'A cat freshly awakened from a nap is often eager to move.',
        'After dinner, many cats experience a surge of energy before settling for the night.',
        'The afternoon is, for most cats, a period of rest rather than exertion.'
      ],
      tip: [
        'Regularity in timing helps a cat anticipate and prepare for play.',
        'A brief session concluded while interest remains high is preferable to a long one.',
        'Cats commonly nap after play, so sessions should not precede important activities.',
        'Observation over several days will reveal the hour at which your cat is most playful.',
        'A cat that walks away has signaled that the session should end.'
      ]
    },
    'window-view': {
      intro: [
        'A window functions for an indoor cat as a form of television, supplying stimulation that the interior cannot.',
        'Cats may watch a window for hours, tracking movement with an intensity that reveals their predatory heritage.',
        'The content of a view, whether birds, people, or vehicles, shapes how engaging a particular window proves.',
        'A perch beside a window combines elevation, warmth, and visual interest in a single location.',
        'Not every window is equally captivating, and cats discriminate among them with evident conviction.'
      ],
      detail: [
        'A window overlooking a tree frequented by birds provides continuous, if frustrating, stimulation.',
        'A garden view offers slower movement: swaying plants, insects, and the occasional visitor.',
        'A street-facing window presents traffic and pedestrians, which excite some cats and alarm others.',
        'A window onto open sky reveals clouds and birds in flight but little at ground level.',
        'A pond attracts frogs, dragonflies, and reflections, all of which draw a cat\u2019s eye.',
        'A park delivers dogs, children, and joggers in unpredictable succession.',
        'A rooftop view emphasizes distance and the movement of birds along ridgelines.',
        'A window with a flower box brings pollinators within inches of the glass.'
      ],
      tip: [
        'Windows should be secured with screens so that curiosity does not lead to a fall.',
        'A calm view may be preferable for an anxious cat, a lively one for a bored cat.',
        'The window a cat frequents unprompted is the window to furnish with a perch.',
        'Sunlight through glass warms a perch considerably, adding to its appeal.',
        'Rotating perches among windows can renew interest.'
      ]
    },
    'bed-shape': {
      intro: [
        'The form of a bed, whether enclosed or open, round or flat, corresponds to distinct sleeping postures and temperaments.',
        'Cats curl into a compact ball when cold or wary and stretch out when warm and secure, and beds accommodate these postures differently.',
        'An enclosed bed satisfies the desire for concealment, whereas an open bed satisfies the desire for surveillance.',
        'The dimensions of a bed should permit the cat to extend fully, even if it seldom does so.',
        'Beds are rejected more often for their shape than for their material.'
      ],
      detail: [
        'A round bed with raised sides supports a curled posture and retains warmth.',
        'A cave bed encloses the cat almost entirely, leaving only a small aperture.',
        'A flat mat imposes no constraint on posture and suits cats that sprawl.',
        'A hammock bed sways gently and lifts the cat off the floor.',
        'A donut bed features a padded ring that serves as both wall and pillow.',
        'A box bed has straight sides and corners into which a cat may wedge itself.',
        'A miniature sofa mimics human furniture and elevates the cat slightly.',
        'A tunnel bed is open at both ends, offering concealment with an escape route.'
      ],
      tip: [
        'A bed placed where the cat already sleeps is far more likely to be adopted.',
        'Adding a familiar blanket transfers the cat\u2019s scent and eases acceptance.',
        'A cat that prefers enclosure may ignore even the most luxurious open bed.',
        'Beds should be sized to the cat: too large feels exposed, too small feels cramped.',
        'Patience is warranted, since a bed may be ignored for weeks before it is used.'
      ]
    },
    'game-type': {
      intro: [
        'Every feline game is, at bottom, a variation on the hunt, but the variations differ meaningfully.',
        'Games that emphasize pursuit appeal to some cats, while games that emphasize search or problem-solving appeal to others.',
        'The cognitive demands of a game influence its appeal no less than its physical demands.',
        'A game that suits a cat\u2019s temperament will be sought out; one that does not will be tolerated at best.',
        'Structured play maintains physical condition and alleviates the boredom to which indoor cats are prone.'
      ],
      detail: [
        'In a chase game, the cat pursues a moving target, exercising speed and reflexes.',
        'Hide-and-seek requires the cat to locate a concealed person, engaging its tracking ability.',
        'Fetch, though associated with dogs, is performed by some cats, who retrieve and return a thrown object.',
        'A puzzle box conceals treats behind obstacles that must be manipulated with the paws.',
        'A treat hunt scatters rewards about a room for the cat to discover by scent.',
        'Peekaboo exploits the cat\u2019s reaction to a face that vanishes and reappears.',
        'A tunnel run channels the cat through a confined passage at speed.',
        'Crumpled paper produces an unpredictable, crackling ball for batting.'
      ],
      tip: [
        'Games should be brief and concluded before the cat loses interest.',
        'Allowing the cat to win occasionally sustains its motivation.',
        'A cat that disengages has communicated that the game should stop.',
        'The game a cat initiates is the game it prefers.',
        'Variety across sessions prevents any single game from becoming stale.'
      ]
    },
    'plant-treat': {
      intro: [
        'Certain plants are not only safe for cats but actively sought by them, whether for chewing or for their aromatic compounds.',
        'The response of cats to plants such as catnip is genetically determined and absent in a substantial minority.',
        'Grasses provide fiber and may aid the passage of hair through the digestive tract.',
        'Aromatic plants stimulate cats through volatile compounds detected by a specialized organ in the roof of the mouth.',
        'Owners must distinguish rigorously between plants that are safe and the many that are toxic to cats.'
      ],
      detail: [
        'Cat grass, typically a blend of cereal grasses, is soft and readily chewed.',
        'Catnip contains nepetalactone, which induces rolling and playfulness in responsive cats.',
        'Silver vine, native to mountainous Asia, affects a larger proportion of cats than catnip does.',
        'Oat grass has slender leaves and a mild flavor that many cats accept.',
        'Wheat grass is grown from wheat seed and is among the most common cat grasses.',
        'Barley grass is the young shoot of the barley plant and is similarly palatable.',
        'Valerian root has a pungent odor that elicits excitement in some cats.',
        'Honeysuckle wood, placed inside toys, produces a response in certain cats unaffected by catnip.'
      ],
      tip: [
        'Only plants verified as safe should ever be offered.',
        'A cat that ignores catnip is not defective; roughly a third of cats do not respond.',
        'Chewing should be supervised, since overconsumption can cause vomiting.',
        'Ornamental houseplants must be kept out of reach, as many are poisonous.',
        'The plant a cat returns to is the plant that suits it.'
      ]
    },
    'water-bowl': {
      intro: [
        'The vessel from which water is served affects both the quantity a cat drinks and its willingness to drink at all.',
        'Cats lap water by drawing a column upward with the tongue, a technique that functions best in an unobstructed bowl.',
        'Moving water is instinctively perceived as fresher than still water, which explains the popularity of fountains.',
        'Whisker contact with the sides of a narrow bowl is a common, if underappreciated, deterrent to drinking.',
        'Adequate hydration is a chronic concern in cats, and the choice of vessel is one of the few variables an owner controls.'
      ],
      detail: [
        'A small fountain circulates and filters water, keeping it aerated and appealing.',
        'A wide bowl accommodates the whiskers without contact, removing a source of irritation.',
        'A tall cup raises the water level, which some cats find easier to reach.',
        'An ice cube chills the water and provides a moving object to investigate.',
        'A shallow saucer minimizes the depth the cat must lower its head into.',
        'A glass jar reveals the water level and is easily monitored for cleanliness.',
        'Two bowls in separate locations offer choice and redundancy.',
        'Water placed beside food is convenient, though some cats prefer the two apart.'
      ],
      tip: [
        'Water should be replaced daily and the vessel washed to prevent biofilm.',
        'A cat that pats the water surface before drinking is checking its position.',
        'Increased drinking after a change of vessel is a sign the change was beneficial.',
        'Bowls should be positioned away from the litter area.',
        'The vessel a cat drinks from most often is the vessel to retain.'
      ]
    }
  };
})(globalThis);
