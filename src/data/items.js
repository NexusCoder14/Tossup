// WARNING: Every entry below must be checked against your local municipal
// waste segregation guidelines before launch. The data here is indicative
// and has not been verified against any specific city's rules.

/**
 * Bin configuration.
 * Change these values to match your local municipality's waste categories.
 * Each bin has:
 *   name       : display label
 *   surface      : background colour for the answer screen and legend (light mode)
 *   surfaceDark  : background colour for the answer screen and legend (dark mode)
 *   textColor    : text colour used on the bin surface
 *   shape      : identifier for the visual shape indicator (droplet, square, triangle, diamond)
 *   description: short description of what goes in this bin
 */
export const bins = {
  wet: {
    name: 'Wet',
    surface: '#1B6B3A',
    surfaceDark: '#14552F',
    textColor: '#FFFFFF',
    shape: 'droplet',
    description: 'Food scraps and organic waste',
  },
  dry: {
    name: 'Dry',
    surface: '#1A5276',
    surfaceDark: '#12486B',
    textColor: '#FFFFFF',
    shape: 'square',
    description: 'Paper, plastic, metal, glass',
  },
  sanitary: {
    name: 'Sanitary',
    surface: '#922B3E',
    surfaceDark: '#762333',
    textColor: '#FFFFFF',
    shape: 'triangle',
    description: 'Used tissues, diapers, sanitary products',
  },
  special: {
    name: 'Special drop-off',
    surface: '#A85D00',
    surfaceDark: '#7A4800',
    textColor: '#FFFFFF',
    shape: 'diamond',
    description: 'Items that need special handling (batteries, bulbs, e-waste, medicines)',
  },
};

/**
 * Item entries.
 * Each item has:
 *   name   : the everyday name someone would search for
 *   slug   : URL-safe identifier (lowercase, hyphens)
 *   bin    : key from the bins object above
 *   aliases: alternate spellings, synonyms, and common local terms
 *   ask    : optional condition question with bin-specific answer options
 *   reason : one plain sentence explaining why it goes in that bin
 *   tip    : one short "before you toss it" instruction
 */
export const items = [
  {
    name: 'Banana peel',
    slug: 'banana-peel',
    bin: 'wet',
    room: 'Kitchen',
    aliases: ['banana skin', 'kele ka chilka', 'kela chilka'],
    reason: 'Food scraps rot and can be composted.',
    tip: 'Nothing to prepare.',
  },
  {
    name: 'Tea bag',
    slug: 'tea-bag',
    bin: 'wet',
    room: 'Kitchen',
    aliases: ['tea bags', 'chai bag', 'chai patti bag', 'tea pouch'],
    reason: 'It is organic waste.',
    tip: 'Remove the staple if there is one.',
    ask: {
      question: 'What is the tea bag made of?',
      options: [
        { label: 'Plain paper or cloth', bin: 'wet', reason: 'It is organic waste.', tip: 'Remove the staple if there is one.' },
        { label: 'Plastic mesh', bin: 'dry', reason: 'The plastic mesh cannot be composted.', tip: 'Empty the tea leaves and put the bag in Dry.' },
      ],
    },
  },
  {
    name: 'Egg shells',
    slug: 'egg-shells',
    bin: 'wet',
    room: 'Kitchen',
    aliases: ['egg shell', 'anda shell', 'ande ka chilka', 'eggshells'],
    reason: 'They are organic waste.',
    tip: 'Nothing to prepare.',
  },
  {
    name: 'Plastic bottle',
    slug: 'plastic-bottle',
    bin: 'dry',
    room: 'Kitchen',
    aliases: ['plastik', 'polythene', 'botal', 'water bottle', 'pet bottle', 'plastic botal'],
    reason: 'Clean plastic can be recycled.',
    tip: 'Empty it and rinse it.',
    ask: {
      question: 'What is inside the bottle?',
      options: [
        { label: 'Empty', bin: 'dry', reason: 'Clean plastic can be recycled.', tip: 'Empty it and rinse it.' },
        { label: 'Still has liquid', bin: 'wet', reason: 'The leftover liquid belongs with wet waste.', tip: 'Pour out the liquid, then rinse the bottle.' },
      ],
    },
  },
  {
    name: 'Bottle cap',
    slug: 'bottle-cap',
    bin: 'dry',
    room: 'Kitchen',
    aliases: ['bottle caps', 'dhakkan', 'botal cap', 'plastic cap'],
    reason: 'Small hard plastic or metal belongs with dry waste.',
    tip: 'Keep it with the dry waste, not loose in wet.',
  },
  {
    name: 'Newspaper',
    slug: 'newspaper',
    bin: 'dry',
    room: 'Desk and school',
    aliases: ['newspapers', 'akhbar', 'paper', 'daily paper'],
    reason: 'Clean paper is recycled.',
    tip: 'Keep it dry.',
  },
  {
    name: 'Pizza box',
    slug: 'pizza-box',
    bin: 'dry',
    room: 'Packaging',
    aliases: ['clean pizza box', 'pizza box lid', 'pizza dabba', 'pizza carton', 'greasy pizza box', 'oily pizza box', 'pizza box bottom', 'greasy pizza carton'],
    reason: 'Clean cardboard is recyclable.',
    tip: 'Tear off any greasy part first.',
    ask: {
      question: 'What condition is the pizza box in?',
      options: [
        { label: 'Clean or lightly marked', bin: 'dry', reason: 'Clean cardboard is recyclable.', tip: 'Tear off any greasy part first.' },
        { label: 'Greasy or food-soiled', bin: 'wet', reason: 'Grease ruins paper recycling.', tip: 'Tear the clean parts off and put them in Dry.' },
      ],
    },
  },
  {
    name: 'Glass bottle',
    slug: 'glass-bottle',
    bin: 'dry',
    room: 'Kitchen',
    aliases: ['glass bottles', 'sheeshe ki bottle', 'kaanch ki botal', 'glass botal'],
    reason: 'Glass is recyclable.',
    tip: 'If broken, wrap it in paper and mark it.',
    ask: {
      question: 'Is the glass bottle whole or broken?',
      options: [
        { label: 'Whole', bin: 'dry', reason: 'Glass is recyclable.', tip: 'Rinse it and keep it separate from other materials.' },
        { label: 'Broken', bin: 'dry', reason: 'Broken glass still needs separate handling.', tip: 'Wrap it in paper and mark it before disposal.' },
      ],
    },
  },
  {
    name: 'Aluminium foil',
    slug: 'aluminium-foil',
    bin: 'dry',
    room: 'Kitchen',
    aliases: ['aluminum foil', 'foil', 'tin foil', 'aluminium wrap'],
    reason: 'Metal is recyclable.',
    tip: 'Scrape off food and fold it flat.',
    ask: {
      question: 'Is the foil clean or food-soiled?',
      options: [
        { label: 'Clean', bin: 'dry', reason: 'Clean metal is recyclable.', tip: 'Fold it flat.' },
        { label: 'Food-soiled', bin: 'wet', reason: 'Food residue makes the foil unsuitable for dry recycling.', tip: 'Scrape off food before disposal.' },
      ],
    },
  },
  {
    name: 'Chip packet',
    slug: 'chip-packet',
    bin: 'dry',
    room: 'Packaging',
    aliases: ['chips', 'wafers', 'snack packet', 'kurkure', 'chips packet', 'namkeen packet'],
    reason: 'Multi-layer packs are hard to recycle, but they still belong with dry waste, never wet.',
    tip: 'Empty it.',
  },
  {
    name: 'Used tissue',
    slug: 'used-tissue',
    bin: 'sanitary',
    room: 'Bathroom',
    aliases: ['tishu', 'tissue', 'napkin', 'paper napkin', 'used napkin', 'rumaal tissue'],
    reason: 'It carries germs and cannot be recycled.',
    tip: 'Wrap it before disposal.',
  },
  {
    name: 'Used diaper',
    slug: 'used-diaper',
    bin: 'sanitary',
    room: 'Bathroom',
    aliases: ['diapers', 'nappy', 'nappies', 'baby diaper', 'used nappy'],
    reason: 'It cannot be recycled or composted.',
    tip: 'Wrap it before disposal.',
  },
  {
    name: 'Battery',
    slug: 'battery',
    bin: 'special',
    room: 'Electronics',
    aliases: ['cell', 'batteries', 'aa', 'aaa', 'battery cell', 'batery'],
    reason: 'It contains toxic metals.',
    tip: 'Take it to an e-waste collection point.',
  },
  {
    name: 'Light bulb',
    slug: 'light-bulb',
    bin: 'special',
    room: 'Electronics',
    aliases: ['lightbulb', 'bulb', 'bulbs', 'tube light', 'led bulb'],
    reason: 'Bulbs contain materials that need special handling.',
    tip: 'Keep it in its box until drop-off.',
  },
  {
    name: 'Expired medicine',
    slug: 'expired-medicine',
    bin: 'special',
    room: 'Bathroom',
    aliases: ['expired medicines', 'old medicine', 'dawai', 'dawaiyan', 'medication'],
    reason: 'It can contaminate soil and water.',
    tip: 'Ask a pharmacy about take-back.',
  },
  {
    name: 'Phone charger',
    slug: 'phone-charger',
    bin: 'special',
    room: 'Electronics',
    aliases: ['mobile charger', 'charger', 'phone charging cable', 'cell charger'],
    reason: 'It is electronic waste.',
    tip: 'Take it to an e-waste collection point.',
  },
  {
    name: 'Apple core',
    slug: 'apple-core',
    bin: 'wet',
    room: 'Kitchen',
    aliases: ['apple waste', 'seb ka bacha hissa'],
    reason: 'Fruit scraps are organic waste.',
    tip: 'Remove any stickers first.',
  },
  {
    name: 'Vegetable peels',
    slug: 'vegetable-peels',
    bin: 'wet',
    room: 'Kitchen',
    aliases: ['sabzi ke chilke', 'potato peel', 'onion peel', 'carrot peel'],
    reason: 'Vegetable scraps can be composted.',
    tip: 'Keep them free of plastic packaging.',
  },
  {
    name: 'Leftover food',
    slug: 'leftover-food',
    bin: 'wet',
    room: 'Kitchen',
    aliases: ['food waste', 'bacha hua khana', 'cooked food', 'meal scraps'],
    reason: 'Food waste is organic.',
    tip: 'Scrape out wrappers and containers first.',
  },
  {
    name: 'Rice',
    slug: 'rice',
    bin: 'wet',
    room: 'Kitchen',
    aliases: ['cooked rice', 'chawal'],
    reason: 'Cooked rice is organic food waste.',
    tip: 'Empty it from any plastic container.',
  },
  {
    name: 'Bread',
    slug: 'bread',
    bin: 'wet',
    room: 'Kitchen',
    aliases: ['bread slice', 'roti', 'chapati', 'stale bread'],
    reason: 'Bread is biodegradable food waste.',
    tip: 'Remove the plastic wrapper.',
  },
  {
    name: 'Coffee grounds',
    slug: 'coffee-grounds',
    bin: 'wet',
    room: 'Kitchen',
    aliases: ['coffee powder', 'coffee waste', 'kapi'],
    reason: 'Coffee grounds are organic waste.',
    tip: 'Empty out any foil pod or plastic capsule.',
  },
  {
    name: 'Coconut shell',
    slug: 'coconut-shell',
    bin: 'wet',
    room: 'Kitchen',
    aliases: ['nariyal ka chilka', 'coconut husk'],
    reason: 'Coconut shells are natural organic material.',
    tip: 'Break large pieces only if your local service asks.',
  },
  {
    name: 'Fish bones',
    slug: 'fish-bones',
    bin: 'wet',
    room: 'Kitchen',
    aliases: ['fish waste', 'machhli ki haddi', 'meat bones'],
    reason: 'Food bones are organic waste.',
    tip: 'Wrap sharp bones if your local collection requires it.',
  },
  {
    name: 'Tea leaves',
    slug: 'tea-leaves',
    bin: 'wet',
    room: 'Kitchen',
    aliases: ['chai patti', 'used tea leaves', 'loose tea'],
    reason: 'Used tea leaves are organic waste.',
    tip: 'Keep them separate from plastic sachets.',
  },
  {
    name: 'Milk carton',
    slug: 'milk-carton',
    bin: 'dry',
    room: 'Kitchen',
    aliases: ['milk packet', 'doodh packet', 'tetra pak', 'juice carton'],
    reason: 'Clean beverage cartons belong with dry packaging.',
    tip: 'Empty and rinse it before disposal.',
  },
  {
    name: 'Cardboard box',
    slug: 'cardboard-box',
    bin: 'dry',
    room: 'Packaging',
    aliases: ['carton', 'shipping box', 'parcel box', 'corrugated box'],
    reason: 'Clean cardboard can be recycled.',
    tip: 'Flatten it and remove tape where possible.',
  },
  {
    name: 'Paper bag',
    slug: 'paper-bag',
    bin: 'dry',
    room: 'Packaging',
    aliases: ['brown paper bag', 'kagaz ka bag', 'paper grocery bag'],
    reason: 'Clean paper bags are recyclable.',
    tip: 'Keep them dry and remove plastic handles.',
  },
  {
    name: 'Wrapping paper',
    slug: 'wrapping-paper',
    bin: 'dry',
    room: 'Packaging',
    aliases: ['gift wrap', 'gift paper', 'packing paper'],
    reason: 'Plain paper can be recycled.',
    tip: 'Remove ribbon, foil, glitter, and tape.',
  },
  {
    name: 'Paper receipt',
    slug: 'paper-receipt',
    bin: 'dry',
    room: 'Desk and school',
    aliases: ['receipt', 'bill', 'cash memo', 'shop receipt'],
    reason: 'Paper receipts belong with dry waste.',
    tip: 'Remove clips and keep them dry.',
  },
  {
    name: 'Notebook',
    slug: 'notebook',
    bin: 'dry',
    room: 'Desk and school',
    aliases: ['copy', 'exercise book', 'school notebook', 'register'],
    reason: 'Paper pages can be recycled.',
    tip: 'Remove plastic covers and metal spirals if possible.',
  },
  {
    name: 'Cardboard tube',
    slug: 'cardboard-tube',
    bin: 'dry',
    room: 'Bathroom',
    aliases: ['toilet roll tube', 'paper roll', 'tissue roll core'],
    reason: 'The cardboard tube is recyclable.',
    tip: 'Flatten it and keep it dry.',
  },
  {
    name: 'Glass jar',
    slug: 'glass-jar',
    bin: 'dry',
    room: 'Kitchen',
    aliases: ['pickle jar', 'bottle jar', 'kanch ka jar', 'food jar'],
    reason: 'Glass containers are recyclable.',
    tip: 'Empty and rinse it.',
  },
  {
    name: 'Steel can',
    slug: 'steel-can',
    bin: 'dry',
    room: 'Kitchen',
    aliases: ['tin can', 'food tin', 'metal can', 'dabba'],
    reason: 'Steel and tin containers are recyclable metal.',
    tip: 'Empty and rinse it, then flatten sharp edges safely.',
  },
  {
    name: 'Aluminium can',
    slug: 'aluminium-can',
    bin: 'dry',
    room: 'Kitchen',
    aliases: ['aluminum can', 'soda can', 'cold drink can', 'drink can'],
    reason: 'Aluminium cans are recyclable metal.',
    tip: 'Empty and rinse it.',
  },
  {
    name: 'Plastic container',
    slug: 'plastic-container',
    bin: 'dry',
    room: 'Kitchen',
    aliases: ['plastic dabba', 'food container', 'takeaway container', 'tupperware'],
    reason: 'Clean rigid plastic belongs with dry waste.',
    tip: 'Empty, rinse, and let it dry.',
  },
  {
    name: 'Plastic bag',
    slug: 'plastic-bag',
    bin: 'dry',
    room: 'Packaging',
    aliases: ['polythene bag', 'carry bag', 'plastic thaili', 'shopping bag'],
    reason: 'Plastic packaging belongs with dry waste.',
    tip: 'Empty it and keep it dry.',
  },
  {
    name: 'Cling film',
    slug: 'cling-film',
    bin: 'dry',
    room: 'Kitchen',
    aliases: ['plastic wrap', 'food wrap', 'cling wrap'],
    reason: 'Used plastic film is dry waste.',
    tip: 'Scrape off food and keep it out of wet waste.',
  },
  {
    name: 'Toothbrush',
    slug: 'toothbrush',
    bin: 'dry',
    room: 'Bathroom',
    aliases: ['old toothbrush', 'tooth brush', 'brush'],
    reason: 'The mixed plastic handle and bristles are dry waste.',
    tip: 'Rinse it and keep it separate from wet waste.',
  },
  {
    name: 'Soap wrapper',
    slug: 'soap-wrapper',
    bin: 'dry',
    room: 'Bathroom',
    aliases: ['soap packet', 'shampoo sachet', 'shampoo packet'],
    reason: 'Empty plastic packaging belongs with dry waste.',
    tip: 'Empty and dry it.',
  },
  {
    name: 'Cotton clothes',
    slug: 'cotton-clothes',
    bin: 'dry',
    room: 'Bathroom',
    aliases: ['old clothes', 'kapde', 'shirt', 't-shirt', 'textile'],
    reason: 'Dry textiles do not belong in wet waste.',
    tip: 'Donate or use a textile collection point when possible.',
  },
  {
    name: 'Shoes',
    slug: 'shoes',
    bin: 'dry',
    room: 'Bathroom',
    aliases: ['old shoes', 'chappal', 'sandals', 'footwear'],
    reason: 'Shoes are mixed-material dry waste.',
    tip: 'Donate usable pairs or use a textile collection point.',
  },
  {
    name: 'Wooden ice cream stick',
    slug: 'wooden-ice-cream-stick',
    bin: 'wet',
    room: 'Kitchen',
    aliases: ['ice cream stick', 'wood stick', 'kulfi stick'],
    reason: 'Clean untreated wood is biodegradable.',
    tip: 'Remove any plastic wrapper.',
  },
  {
    name: 'Cotton swab',
    slug: 'cotton-swab',
    bin: 'sanitary',
    room: 'Bathroom',
    aliases: ['earbud', 'ear bud', 'cotton bud'],
    reason: 'Used hygiene products cannot be recycled.',
    tip: 'Never flush it.',
  },
  {
    name: 'Sanitary pad',
    slug: 'sanitary-pad',
    bin: 'sanitary',
    room: 'Bathroom',
    aliases: ['period pad', 'menstrual pad', 'napkin pad', 'sanitary napkin'],
    reason: 'It is sanitary waste and cannot be recycled.',
    tip: 'Wrap it before disposal.',
  },
  {
    name: 'Tampon',
    slug: 'tampon',
    bin: 'sanitary',
    room: 'Bathroom',
    aliases: ['used tampon', 'period product'],
    reason: 'It is sanitary waste and cannot be recycled.',
    tip: 'Wrap it before disposal and never flush it.',
  },
  {
    name: 'Bandage',
    slug: 'bandage',
    bin: 'sanitary',
    room: 'Bathroom',
    aliases: ['band aid', 'bandaid', 'plaster', 'used dressing'],
    reason: 'Used dressings are sanitary waste.',
    tip: 'Wrap it before disposal.',
  },
  {
    name: 'Face mask',
    slug: 'face-mask',
    bin: 'sanitary',
    room: 'Bathroom',
    aliases: ['mask', 'disposable mask', 'surgical mask'],
    reason: 'Used disposable masks are sanitary waste.',
    tip: 'Cut the ear loops if required by your local service.',
  },
  {
    name: 'Razor',
    slug: 'razor',
    bin: 'sanitary',
    room: 'Bathroom',
    aliases: ['shaving razor', 'blade', 'shaver'],
    reason: 'Sharp used hygiene items need safe handling.',
    tip: 'Wrap the blade so it cannot injure anyone.',
  },
  {
    name: 'Broken ceramic cup',
    slug: 'broken-ceramic-cup',
    bin: 'sanitary',
    room: 'Kitchen',
    aliases: ['broken mug', 'ceramic plate', 'toota cup', 'toota mug'],
    reason: 'Broken sharp ceramics need safe handling.',
    tip: 'Wrap the pieces and mark the package.',
  },
  {
    name: 'Old mobile phone',
    slug: 'old-mobile-phone',
    bin: 'special',
    room: 'Electronics',
    aliases: ['mobile', 'cell phone', 'smartphone', 'phone', 'purana phone'],
    reason: 'Phones contain electronics and recoverable metals.',
    tip: 'Erase personal data and use an e-waste drop-off.',
  },
  {
    name: 'Laptop',
    slug: 'laptop',
    bin: 'special',
    room: 'Electronics',
    aliases: ['computer', 'notebook computer', 'old laptop'],
    reason: 'Computers are electronic waste.',
    tip: 'Back up and erase data before e-waste drop-off.',
  },
  {
    name: 'Keyboard',
    slug: 'keyboard',
    bin: 'special',
    room: 'Electronics',
    aliases: ['computer keyboard', 'key board'],
    reason: 'It contains electronic components.',
    tip: 'Take it to an e-waste collection point.',
  },
  {
    name: 'Computer mouse',
    slug: 'computer-mouse',
    bin: 'special',
    room: 'Electronics',
    aliases: ['mouse', 'pc mouse', 'wireless mouse'],
    reason: 'It contains electronic components.',
    tip: 'Remove batteries if possible and use e-waste collection.',
  },
  {
    name: 'USB cable',
    slug: 'usb-cable',
    bin: 'special',
    room: 'Electronics',
    aliases: ['charging cable', 'data cable', 'wire', 'usb wire'],
    reason: 'Cables contain electronic parts and metals.',
    tip: 'Take it to an e-waste collection point.',
  },
  {
    name: 'Remote control',
    slug: 'remote-control',
    bin: 'special',
    room: 'Electronics',
    aliases: ['tv remote', 'remote', 'ac remote'],
    reason: 'It is electronic waste.',
    tip: 'Remove the batteries and recycle them separately.',
  },
  {
    name: 'Headphones',
    slug: 'headphones',
    bin: 'special',
    room: 'Electronics',
    aliases: ['earphones', 'earbuds', 'headset', 'airpods'],
    reason: 'Electronic audio devices need special handling.',
    tip: 'Use an e-waste collection point.',
  },
  {
    name: 'Power bank',
    slug: 'power-bank',
    bin: 'special',
    room: 'Electronics',
    aliases: ['powerbank', 'portable charger', 'battery pack'],
    reason: 'It contains a lithium battery.',
    tip: 'Do not puncture it; use a battery or e-waste drop-off.',
  },
  {
    name: 'Printer cartridge',
    slug: 'printer-cartridge',
    bin: 'special',
    room: 'Desk and school',
    aliases: ['ink cartridge', 'toner cartridge', 'printer ink'],
    reason: 'Cartridges contain ink and electronic or plastic parts.',
    tip: 'Return it through a cartridge take-back programme.',
  },
  {
    name: 'Fluorescent tube',
    slug: 'fluorescent-tube',
    bin: 'special',
    room: 'Electronics',
    aliases: ['tube light', 'cfl', 'fluorescent bulb', 'tube'],
    reason: 'It may contain mercury and needs special handling.',
    tip: 'Keep it unbroken and take it to a collection point.',
  },
  {
    name: 'Thermometer',
    slug: 'thermometer',
    bin: 'special',
    room: 'Bathroom',
    aliases: ['digital thermometer', 'mercury thermometer', 'temperature meter'],
    reason: 'Thermometers can contain electronic parts or hazardous liquid.',
    tip: 'Use a pharmacy or hazardous-waste drop-off.',
  },
  {
    name: 'Paint tin',
    slug: 'paint-tin',
    bin: 'special',
    room: 'Packaging',
    aliases: ['paint can', 'colour tin', 'paint dabba'],
    reason: 'Paint residue can contaminate soil and water.',
    tip: 'Use a household hazardous-waste collection point.',
  },
  {
    name: 'Orange peel',
    slug: 'orange-peel',
    bin: 'wet',
    room: 'Kitchen',
    aliases: ['citrus peel', 'santra chilka', 'lemon peel', 'mosambi peel'],
    reason: 'Fruit peels are organic waste.',
    tip: 'Remove stickers before disposal.',
  },
  {
    name: 'Mango seed',
    slug: 'mango-seed',
    bin: 'wet',
    room: 'Kitchen',
    aliases: ['mango stone', 'aam ki guthli', 'aam seed'],
    reason: 'Fruit seeds are natural organic waste.',
    tip: 'Wrap very large or sharp pieces if needed.',
  },
  {
    name: 'Watermelon rind',
    slug: 'watermelon-rind',
    bin: 'wet',
    room: 'Kitchen',
    aliases: ['watermelon peel', 'tarbooz ka chilka', 'melon rind'],
    reason: 'Fruit rinds are organic waste.',
    tip: 'Keep it free of plastic wrapping.',
  },
  {
    name: 'Chicken bones',
    slug: 'chicken-bones',
    bin: 'wet',
    room: 'Kitchen',
    aliases: ['chicken bone', 'meat scraps', 'murgi ki haddi'],
    reason: 'Food bones are organic waste.',
    tip: 'Wrap sharp bones if your local service requires it.',
  },
  {
    name: 'Spoiled fruit',
    slug: 'spoiled-fruit',
    bin: 'wet',
    room: 'Kitchen',
    aliases: ['rotten fruit', 'bad fruit', 'kharab phal'],
    reason: 'Spoiled fruit is organic waste.',
    tip: 'Remove stickers and plastic packaging.',
  },
  {
    name: 'Dal leftovers',
    slug: 'dal-leftovers',
    bin: 'wet',
    room: 'Kitchen',
    aliases: ['leftover dal', 'lentil waste', 'daal'],
    reason: 'Cooked pulses are food waste.',
    tip: 'Empty them from plastic or metal containers.',
  },
  {
    name: 'Curry leftovers',
    slug: 'curry-leftovers',
    bin: 'wet',
    room: 'Kitchen',
    aliases: ['leftover curry', 'sabzi leftovers', 'gravy waste'],
    reason: 'Cooked food is organic waste.',
    tip: 'Scrape it out of the container first.',
  },
  {
    name: 'Flower waste',
    slug: 'flower-waste',
    bin: 'wet',
    room: 'Kitchen',
    aliases: ['flowers', 'phool', 'wilted flowers', 'puja flowers'],
    reason: 'Flowers are biodegradable organic waste.',
    tip: 'Remove thread, foil, and plastic decorations.',
  },
  {
    name: 'Garden leaves',
    slug: 'garden-leaves',
    bin: 'wet',
    room: 'Kitchen',
    aliases: ['dry leaves', 'patte', 'fallen leaves', 'leaf waste'],
    reason: 'Leaves are natural biodegradable waste.',
    tip: 'Keep soil, plastic, and garden wire out.',
  },
  {
    name: 'Grass clippings',
    slug: 'grass-clippings',
    bin: 'wet',
    room: 'Kitchen',
    aliases: ['cut grass', 'lawn clippings', 'garden trimmings'],
    reason: 'Fresh plant trimmings are organic waste.',
    tip: 'Keep them free of plastic and stones.',
  },
  {
    name: 'Cucumber peel',
    slug: 'cucumber-peel',
    bin: 'wet',
    room: 'Kitchen',
    aliases: ['kheera chilka', 'cucumber skin', 'vegetable skin'],
    reason: 'Vegetable peels are compostable organic waste.',
    tip: 'Put it in wet waste without packaging.',
  },
  {
    name: 'Corn cob',
    slug: 'corn-cob',
    bin: 'wet',
    room: 'Kitchen',
    aliases: ['bhutta', 'corn waste', 'maize cob'],
    reason: 'A corn cob is natural organic waste.',
    tip: 'Remove foil, sticks, and plastic first.',
  },
  {
    name: 'Yogurt cup',
    slug: 'yogurt-cup',
    bin: 'dry',
    room: 'Kitchen',
    aliases: ['curd cup', 'dahi cup', 'yoghurt container'],
    reason: 'The empty plastic cup belongs with dry waste.',
    tip: 'Empty and rinse it.',
  },
  {
    name: 'Shampoo bottle',
    slug: 'shampoo-bottle',
    bin: 'dry',
    room: 'Bathroom',
    aliases: ['conditioner bottle', 'hair wash bottle', 'shampoo botal'],
    reason: 'Clean rigid plastic packaging belongs with dry waste.',
    tip: 'Empty and rinse it.',
  },
  {
    name: 'Detergent bottle',
    slug: 'detergent-bottle',
    bin: 'dry',
    room: 'Bathroom',
    aliases: ['washing liquid bottle', 'laundry bottle', 'surf bottle'],
    reason: 'Empty rigid plastic packaging is dry waste.',
    tip: 'Rinse it and replace the cap.',
  },
  {
    name: 'Toothpaste tube',
    slug: 'toothpaste-tube',
    bin: 'dry',
    room: 'Bathroom',
    aliases: ['toothpaste packet', 'tooth paste tube', 'paste tube'],
    reason: 'The empty tube is dry packaging waste.',
    tip: 'Squeeze it empty and replace the cap.',
  },
  {
    name: 'Aluminium food tray',
    slug: 'aluminium-food-tray',
    bin: 'dry',
    room: 'Kitchen',
    aliases: ['aluminum tray', 'foil tray', 'takeaway tray'],
    reason: 'Clean aluminium is recyclable metal.',
    tip: 'Scrape off food and fold it flat.',
  },
  {
    name: 'Metal lid',
    slug: 'metal-lid',
    bin: 'dry',
    room: 'Kitchen',
    aliases: ['tin lid', 'jar lid', 'steel lid', 'dhakkan metal'],
    reason: 'Metal lids belong with dry recyclable waste.',
    tip: 'Rinse off food residue.',
  },
  {
    name: 'Glass tumbler',
    slug: 'glass-tumbler',
    bin: 'dry',
    room: 'Kitchen',
    aliases: ['glass cup', 'drinking glass', 'kanch ka glass'],
    reason: 'Whole glass containers are recyclable.',
    tip: 'Rinse it and keep it separate.',
  },
  {
    name: 'Magazine',
    slug: 'magazine',
    bin: 'dry',
    room: 'Desk and school',
    aliases: ['magazines', 'monthly magazine', 'glossy paper'],
    reason: 'Paper magazines belong with dry paper waste.',
    tip: 'Remove plastic wrapping.',
  },
  {
    name: 'Envelope',
    slug: 'envelope',
    bin: 'dry',
    room: 'Desk and school',
    aliases: ['letter envelope', 'lifafa', 'mail envelope'],
    reason: 'Paper envelopes can be recycled.',
    tip: 'Remove plastic windows and metal clips.',
  },
  {
    name: 'Textbook',
    slug: 'textbook',
    bin: 'dry',
    room: 'Desk and school',
    aliases: ['school book', 'old book', 'kitab', 'books'],
    reason: 'Paper books belong with dry paper waste.',
    tip: 'Donate usable books before recycling them.',
  },
  {
    name: 'Paper cup',
    slug: 'paper-cup',
    bin: 'dry',
    room: 'Packaging',
    aliases: ['tea cup', 'coffee cup', 'disposable cup'],
    reason: 'The cup is packaging waste and should stay out of wet waste.',
    tip: 'Empty it and remove any plastic lid.',
  },
  {
    name: 'Paper plate',
    slug: 'paper-plate',
    bin: 'dry',
    room: 'Packaging',
    aliases: ['disposable plate', 'paper thali', 'plate'],
    reason: 'Clean paper plates belong with dry waste.',
    tip: 'Scrape off food first.',
  },
  {
    name: 'Bubble wrap',
    slug: 'bubble-wrap',
    bin: 'dry',
    room: 'Packaging',
    aliases: ['packing plastic', 'air bubbles', 'parcel wrap'],
    reason: 'Plastic packaging belongs with dry waste.',
    tip: 'Keep it clean and dry.',
  },
  {
    name: 'Wooden cutlery',
    slug: 'wooden-cutlery',
    bin: 'dry',
    room: 'Packaging',
    aliases: ['wooden spoon', 'wood fork', 'disposable wooden spoon'],
    reason: 'Used disposable cutlery belongs with dry waste.',
    tip: 'Remove food residue first.',
  },
  {
    name: 'Plastic straw',
    slug: 'plastic-straw',
    bin: 'dry',
    room: 'Packaging',
    aliases: ['straw', 'drinking straw', 'juice straw'],
    reason: 'Plastic straws are dry waste.',
    tip: 'Empty and rinse it.',
  },
  {
    name: 'Dental floss',
    slug: 'dental-floss',
    bin: 'sanitary',
    room: 'Bathroom',
    aliases: ['floss', 'teeth floss', 'dant floss'],
    reason: 'Used dental floss is hygiene waste and cannot be recycled.',
    tip: 'Wrap it and never flush it.',
  },
  {
    name: 'Hair',
    slug: 'hair',
    bin: 'sanitary',
    room: 'Bathroom',
    aliases: ['fallen hair', 'baal', 'human hair'],
    reason: 'Loose hair is hygiene waste.',
    tip: 'Wrap it so it does not spread through the collection stream.',
  },
  {
    name: 'Makeup wipe',
    slug: 'makeup-wipe',
    bin: 'sanitary',
    room: 'Bathroom',
    aliases: ['make up wipe', 'face wipe', 'cosmetic wipe'],
    reason: 'Used wipes are sanitary waste and cannot be recycled.',
    tip: 'Put it in the bin, never the toilet.',
  },
  {
    name: 'Toilet paper',
    slug: 'toilet-paper',
    bin: 'sanitary',
    room: 'Bathroom',
    aliases: ['toilet tissue', 'bathroom tissue', 'loo paper'],
    reason: 'Used bathroom paper is sanitary waste.',
    tip: 'Wrap it before disposal and follow local instructions.',
  },
  {
    name: 'Wet wipe',
    slug: 'wet-wipe',
    bin: 'sanitary',
    room: 'Bathroom',
    aliases: ['wet tissue', 'baby wipe', 'cleaning wipe'],
    reason: 'Wet wipes contain fibres that cannot be recycled.',
    tip: 'Never flush it.',
  },
  {
    name: 'Contact lens',
    slug: 'contact-lens',
    bin: 'sanitary',
    room: 'Bathroom',
    aliases: ['contact lenses', 'lens', 'eye lens'],
    reason: 'Used lenses are small hygiene waste.',
    tip: 'Keep them out of the sink and toilet.',
  },
  {
    name: 'Makeup sponge',
    slug: 'makeup-sponge',
    bin: 'sanitary',
    room: 'Bathroom',
    aliases: ['beauty sponge', 'cosmetic sponge', 'blender sponge'],
    reason: 'Used cosmetic sponges cannot be recycled.',
    tip: 'Wrap it before disposal.',
  },
  {
    name: 'Used condom',
    slug: 'used-condom',
    bin: 'sanitary',
    room: 'Bathroom',
    aliases: ['condom', 'protection', 'used contraceptive'],
    reason: 'Used personal-care products are sanitary waste.',
    tip: 'Wrap it and never flush it.',
  },
  {
    name: 'Television',
    slug: 'television',
    bin: 'special',
    room: 'Electronics',
    aliases: ['tv', 'smart tv', 'old television', 'television set'],
    reason: 'Televisions contain electronic components and glass.',
    tip: 'Use an authorised e-waste collection point.',
  },
  {
    name: 'Computer monitor',
    slug: 'computer-monitor',
    bin: 'special',
    room: 'Electronics',
    aliases: ['monitor', 'screen', 'display', 'desktop monitor'],
    reason: 'Monitors are electronic waste.',
    tip: 'Keep it intact and arrange e-waste collection.',
  },
  {
    name: 'Printer',
    slug: 'printer',
    bin: 'special',
    room: 'Desk and school',
    aliases: ['old printer', 'inkjet printer', 'laser printer'],
    reason: 'Printers contain electronics and ink components.',
    tip: 'Remove cartridges for separate take-back.',
  },
  {
    name: 'Wi-Fi router',
    slug: 'wifi-router',
    bin: 'special',
    room: 'Electronics',
    aliases: ['wifi box', 'router', 'modem', 'internet router'],
    reason: 'Routers are electronic waste.',
    tip: 'Reset it and take it to e-waste collection.',
  },
  {
    name: 'Webcam',
    slug: 'webcam',
    bin: 'special',
    room: 'Desk and school',
    aliases: ['camera', 'computer camera', 'usb camera'],
    reason: 'Webcams contain electronic components.',
    tip: 'Use an e-waste collection point.',
  },
  {
    name: 'Bluetooth speaker',
    slug: 'bluetooth-speaker',
    bin: 'special',
    room: 'Electronics',
    aliases: ['speaker', 'portable speaker', 'wireless speaker'],
    reason: 'Speakers contain electronics and often a battery.',
    tip: 'Use an e-waste collection point.',
  },
  {
    name: 'Smartwatch',
    slug: 'smartwatch',
    bin: 'special',
    room: 'Electronics',
    aliases: ['smart watch', 'fitness band', 'wearable'],
    reason: 'Wearable devices contain electronics and batteries.',
    tip: 'Take it to an e-waste collection point.',
  },
  {
    name: 'Calculator',
    slug: 'calculator',
    bin: 'special',
    room: 'Desk and school',
    aliases: ['electronic calculator', 'calculater'],
    reason: 'Electronic calculators need special handling.',
    tip: 'Remove the battery if possible and use e-waste collection.',
  },
  {
    name: 'Electric iron',
    slug: 'electric-iron',
    bin: 'special',
    room: 'Electronics',
    aliases: ['iron', 'press', 'clothes iron'],
    reason: 'Small electrical appliances are e-waste.',
    tip: 'Unplug it and use an appliance or e-waste drop-off.',
  },
  {
    name: 'Electric kettle',
    slug: 'electric-kettle',
    bin: 'special',
    room: 'Kitchen',
    aliases: ['kettle', 'tea kettle', 'electrical kettle'],
    reason: 'It contains electrical components.',
    tip: 'Use an appliance or e-waste collection point.',
  },
  {
    name: 'Extension cord',
    slug: 'extension-cord',
    bin: 'special',
    room: 'Electronics',
    aliases: ['extension board', 'power strip', 'multi plug', 'board'],
    reason: 'Cords and plugs contain electrical parts and metals.',
    tip: 'Take it to an e-waste collection point.',
  },
  {
    name: 'Pesticide bottle',
    slug: 'pesticide-bottle',
    bin: 'special',
    room: 'Packaging',
    aliases: ['insecticide bottle', 'bug spray bottle', 'keeda dawa'],
    reason: 'Chemical containers need hazardous-waste handling.',
    tip: 'Do not rinse it into a drain; use a local hazardous-waste point.',
  },
];

/**
 * Look up an item by its URL slug.
 */
export function getItemBySlug(slug) {
  return items.find((item) => item.slug === slug) || null;
}

/**
 * Search items by name and aliases, ranked by match quality.
 */
export function searchItems(query) {
  const directMatches = rankMatches(query, false);
  const matches = directMatches.length ? directMatches : rankMatches(query, true);
  return matches.slice(0, 6).map((match) => match.item);
}

/**
 * Match one free-text entry to an item and say how sure we are.
 * "exact" means the name or an alias is the same or starts with the text.
 * "close" means a word matches. "fuzzy" means a typo-tolerant guess.
 * The pile sorter only files "exact" matches on its own and asks about the rest.
 */
export function findBestMatch(query) {
  const direct = rankMatches(query, false);
  if (direct.length) {
    const top = direct[0];
    const sharedTop = direct.filter((match) => match.rank <= 1).length;
    const sure = top.rank === 0 || (top.rank === 1 && sharedTop === 1);
    return {
      item: top.item,
      confidence: sure ? 'exact' : 'close',
      candidates: direct.slice(0, 3).map((match) => match.item),
    };
  }
  const fuzzy = rankMatches(query, true);
  if (fuzzy.length) {
    return { item: fuzzy[0].item, confidence: 'fuzzy', candidates: fuzzy.slice(0, 3).map((match) => match.item) };
  }
  return { item: null, confidence: 'none', candidates: [] };
}

/**
 * Return close suggestions for a query that did not produce search results.
 */
export function getSearchSuggestions(query) {
  return rankMatches(query, true).slice(0, 3).map((match) => match.item);
}

function normaliseWord(word) {
  if (word.length > 4 && word.endsWith('ies')) return word.slice(0, -3) + 'y';
  if (word.length > 4 && word.endsWith('es')) return word.slice(0, -2);
  if (word.length > 3 && word.endsWith('s')) return word.slice(0, -1);
  return word;
}

function normalise(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(normaliseWord)
    .join(' ');
}

function editDistance(left, right) {
  const distances = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let row = 1; row <= left.length; row += 1) {
    let previous = distances[0];
    distances[0] = row;
    for (let column = 1; column <= right.length; column += 1) {
      const current = distances[column];
      distances[column] = left[row - 1] === right[column - 1]
        ? previous
        : Math.min(previous, distances[column - 1], current) + 1;
      previous = current;
    }
  }
  return distances[right.length];
}

function fuzzyMatch(queryWords, candidateWords) {
  if (!queryWords.length || !candidateWords.length) return false;
  return queryWords.every((queryWord) => {
    if (queryWord.length < 5) return false;
    const threshold = queryWord.length >= 8 ? 2 : 1;
    return candidateWords.some((candidateWord) => (
      candidateWord.length >= 4 &&
      queryWord[0] === candidateWord[0] &&
      editDistance(queryWord, candidateWord) <= threshold
    ));
  });
}

function rankMatches(query, includeFuzzy) {
  const normalisedQuery = normalise(query);
  if (!normalisedQuery) return [];
  const queryWords = normalisedQuery.split(' ');

  return items.map((item, itemIndex) => {
    const candidates = [item.name, ...(item.aliases || [])].map((value) => ({
      text: normalise(value),
      words: normalise(value).split(' '),
    }));
    let bestRank = Infinity;
    let bestDistance = Infinity;

    candidates.forEach((candidate) => {
      const { text, words } = candidate;
      if (text === normalisedQuery) bestRank = Math.min(bestRank, 0);
      else if (text.startsWith(normalisedQuery)) bestRank = Math.min(bestRank, 1);
      else if (queryWords.filter((queryWord) => queryWord.length > 1).length && queryWords.filter((queryWord) => queryWord.length > 1).every((queryWord) => words.some((word) => word.startsWith(queryWord)))) bestRank = Math.min(bestRank, 2);
      else if (text.includes(normalisedQuery)) bestRank = Math.min(bestRank, 3);
      else if (includeFuzzy) {
        const distance = Math.min(...queryWords.map((queryWord) => (
          Math.min(...words.map((word) => editDistance(queryWord, word)))
        )));
        if (fuzzyMatch(queryWords, words)) {
          bestRank = Math.min(bestRank, 4);
          bestDistance = Math.min(bestDistance, distance);
        }
      }
    });

    return { item, rank: bestRank, distance: bestDistance, itemIndex };
  })
    .filter((match) => match.rank < Infinity)
    .sort((left, right) => left.rank - right.rank || left.distance - right.distance || left.itemIndex - right.itemIndex);
}
