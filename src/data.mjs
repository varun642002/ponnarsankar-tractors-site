// All site content in one place. Specifications are taken from the dealership's
// own product pages; anything they do not publish is marked "on request" rather
// than invented.

export const business = {
  name: 'Ponnar Sankar Tractors',
  tagline: 'Since 1988',
  since: 1988,
  phones: [
    { display: '+91 90423 50451', raw: '+919042350451' },
    { display: '+91 94434 24552', raw: '+919443424552' },
  ],
  whatsapp: 'https://wa.me/919042350451?text=Hello!%20I%20have%20an%20enquiry%20about%20your%20products.',
  address: {
    lines: ['Bypass Road, Padamudipaalayam', 'Paramathi Velur, Namakkal — 638 182'],
    street: 'Bypass Road, Padamudipaalayam',
    locality: 'Paramathi Velur',
    region: 'Tamil Nadu',
    postalCode: '638182',
  },
  hours: 'Monday to Saturday, 9:00 AM to 6:00 PM · Closed on Sundays',
  maps: 'https://maps.app.goo.gl/Zw1SLXmyCeMyBPad9',
  social: [
    { label: 'Facebook', short: 'FB', href: 'https://www.facebook.com/profile.php?id=61557239694555' },
    { label: 'Instagram', short: 'IG', href: 'https://www.instagram.com/ponnar_sankar_tractor_spares/' },
    { label: 'YouTube', short: 'YT', href: 'https://youtube.com/@ponnarsankartractors1509' },
  ],
};

export const nav = [
  { label: 'Home', ta: 'முகப்பு', href: 'index.html' },
  { label: 'About', ta: 'எங்களைப் பற்றி', href: 'about.html' },
  { label: 'Products', ta: 'தயாரிப்புகள்', href: 'products.html', children: true },
  { label: 'Gallery', ta: 'படத்தொகுப்பு', href: 'about.html#gallery' },
  { label: 'Branches', ta: 'கிளைகள்', href: 'branches.html' },
  { label: 'Contact', ta: 'தொடர்பு', href: 'contact.html' },
];

export const badges = [
  { title: 'Genuine Spares', note: 'VST and Gomadhi parts held in stock' },
  { title: 'Expert Service', note: 'Factory-trained mechanics at every branch' },
  { title: 'Fast Delivery', note: 'Machines moved from the nearest branch' },
  { title: 'Authorised Dealer', note: 'Certificates held at the head office' },
];

export const carousel = [
  {
    image: 'assets/hero-baler.webp',
    eyebrow: 'Gomadhi round balers',
    title: 'Harvest more, <em>waste less</em>',
    body: 'High-capacity round balers that turn paddy straw and silage into compact bales you can handle, store and sell.',
    cta: { label: 'Explore balers', href: 'products/round-baler.html' },
  },
  {
    image: 'assets/hero-tiller.webp',
    eyebrow: 'VST Shakti power tillers',
    title: 'The right machine <em>for the field</em>',
    body: 'Four VST Shakti models, demonstrated on your own land before you buy and serviced from six branches across Tamil Nadu.',
    cta: { label: 'See power tillers', href: 'products/power-tiller.html' },
  },
  {
    image: 'assets/hero-cultivator.webp',
    eyebrow: 'Tillage implements',
    title: 'Ready to sow <em>in one pass</em>',
    body: 'Rotavators, chisel ploughs, ridgers and cultivators built for the hard red soils of Namakkal, Trichy and Karur.',
    cta: { label: 'Browse implements', href: 'products/rotavator.html' },
  },
];

export const stats = [
  { value: '35+', label: 'Years in business' },
  { value: '6', label: 'Branch locations' },
  { value: '8000+', label: 'Customers served' },
  { value: '50+', label: 'Product varieties' },
];

export const support = [
  {
    kicker: '01 — Repairs',
    title: 'Trained mechanics',
    body: 'Factory-trained technicians at every branch for repairs, servicing and seasonal checks.',
  },
  {
    kicker: '02 — Parts',
    title: 'Genuine spares in stock',
    body: 'An extensive inventory of genuine VST and Gomadhi parts held locally, not ordered in.',
  },
  {
    kicker: '03 — Handover',
    title: 'Installation & setup',
    body: 'Fitting, setup and a working demonstration on your own land before the machine is yours.',
  },
  {
    kicker: '04 — Warranty',
    title: 'Claims handled here',
    body: 'Full warranty coverage, with claims raised and followed up by the branch that sold you the machine.',
  },
];

export const whyUs = [
  {
    title: 'Authorised dealer',
    body: 'Official dealership for VST Tillers Tractors and Gomadhi Engineering, so every machine carries a manufacturer warranty.',
  },
  {
    title: '35+ years of experience',
    body: 'Over three decades helping farmers pick and maintain the right equipment for their own land and crop.',
  },
  {
    title: 'Comprehensive after-sales',
    body: 'Installation, maintenance, repairs and spare parts available at all six branches.',
  },
  {
    title: 'Competitive pricing',
    body: 'Fair, transparent pricing with flexible payment options for growers of every size.',
  },
  {
    title: 'Personalised service',
    body: 'Customised recommendations, from a smallholder buying a first tiller to a commercial contractor.',
  },
  {
    title: 'Six locations',
    body: 'Branches placed across Namakkal, Trichy and Karur districts, so service is never far away.',
  },
];

export const partners = [
  {
    name: 'VST Tillers Tractors',
    seal: 'Official dealership certificate holder',
    logo: null,
    certificate: 'assets/cert-vst.png',
    body: 'A long-standing name in Indian agriculture, known for power tillers that hold their resale value and keep running through the season.',
    points: [
      'Genuine VST power tillers and spare parts',
      'Factory-trained service technicians',
      'Complete after-sales support and warranty service',
    ],
    site: 'https://www.vsttractors.com/',
  },
  {
    name: 'Gomadhi Engineering',
    seal: 'Certified partner',
    logo: 'assets/gomadhi-logo.png',
    certificate: 'assets/cert-gomadhi.png',
    body: 'Manufacturer of the AB Series round balers, AS Series shredders and GES rotary tillers we sell and service.',
    points: [
      'Authentic Gomadhi rotary tillers and implements',
      'Expert installation and demonstration services',
      'Ongoing technical support and maintenance',
    ],
    site: 'https://www.gomadhi.com/',
  },
];

export const testimonials = [
  {
    quote:
      'They helped me choose the right power tiller and answered all my questions — even after I bought it.',
    name: 'Thiyagarajan',
    role: 'Tractor service provider',
  },
];

export const branches = [
  {
    name: 'Paramathi Velur, Namakkal',
    kicker: 'Head office',
    head: true,
    address: business.address.lines,
    phones: business.phones,
    maps: business.maps,
  },
  {
    name: 'Myalampatti',
    kicker: 'Branch · Tiruchirapalli',
    address: ['Thaneerpandhalmedu, Thokaimalai Road', 'Myalampatti, Tiruchirapalli — 621 301'],
    phones: [{ display: '+91 88076 50277', raw: '+918807650277' }],
    maps: 'https://maps.app.goo.gl/fVoiEG25PaV2Ludk6',
  },
  {
    name: 'Manapaarai',
    kicker: 'Branch · Tiruchirapalli',
    address: ['Senthil Kamlakas, Manapaarai', 'Tiruchirapalli — 621 306'],
    phones: [{ display: '+91 70102 60002', raw: '+917010260002' }],
    maps: 'https://maps.app.goo.gl/EK9qmFKWAQrHp6s39',
  },
  {
    name: 'Thuraiyur',
    kicker: 'Branch · Tiruchirapalli',
    address: ['Perambalur Bypass Road', 'Thuraiyur, Tiruchirapalli'],
    phones: [{ display: '+91 81484 79346', raw: '+918148479346' }],
    maps: 'https://maps.app.goo.gl/8nxar3conxMypS4k8',
  },
  {
    name: 'Kulithalai',
    kicker: 'Branch · Karur',
    address: ['Koattaimedu, Manapaarai Road', 'Kulithalai, Karur — 639 104'],
    phones: [{ display: '+91 88075 96277', raw: '+918807596277' }],
    maps: 'https://maps.app.goo.gl/7ue6hmGhNGVBZBYz9',
  },
  {
    name: 'Rasipuram',
    kicker: 'Branch · Namakkal',
    address: ['Rasipuram, Tamil Nadu'],
    phones: [{ display: '+91 90423 50451', raw: '+919042350451' }],
    maps: 'https://www.google.com/maps/search/?api=1&query=Ponnar+Sankar+Tractors+Rasipuram',
    note: 'Calls to this branch are answered by the head office.',
  },
];

export const gallery = Array.from({ length: 12 }, (_, i) => ({
  src: `assets/gallery-${i + 1}.jpg`,
  alt: `Ponnar Sankar Tractors equipment working in the field, photo ${i + 1}`,
}));

export const products = [
  {
    slug: 'power-tiller',
    name: 'Power Tillers',
    ta: 'பவர் டில்லர்',
    maker: 'VST Shakti',
    image: 'assets/power-tiller.webp',
    summary: 'Four VST Shakti models, for wet puddling through to dry-land tillage.',
    intro:
      'VST Shakti power tillers are the machines most of our first-time buyers start with and most of our contractors keep. All four models are stocked, demonstrated on your own land, and serviced from every branch.',
    models: [
      {
        name: 'VST Shakti 165 DI ES Power Plus',
        image: "assets/power-tiller.webp",
        maker: 'VST Shakti',
        body: 'A heavy-duty power tiller designed for higher productivity and longer working hours. Suitable for large fields and commercial farming applications.',
        specs: [
          ['Engine', '16 HP'],
          ['Displacement', '857 cc'],
          ['Rotary width', '750 mm'],
          ['Tynes', '26'],
          ['Starting', 'Electric'],
          ['Headlamp', 'LED'],
          ['Hour meter', 'Fitted'],
          ['Operator seat', 'Fitted'],
        ],
      },
      {
        name: 'VST Shakti 130 DI / 135 DI Ultra',
        image: "assets/tiller-130.webp",
        maker: 'VST Shakti',
        body: 'The mid-range Ultra, for growers who want a workhorse for everyday wet and dry tillage without stepping up to the 165.',
        specs: [],
      },
      {
        name: 'VST Kisan Power Tiller',
        image: "assets/tiller-kisan.webp",
        maker: 'VST Shakti',
        body: 'The entry point into the VST range, sized for smallholdings and first-time buyers.',
        specs: [],
      },
      {
        name: 'VST 95 DI Ignito',
        image: "assets/tiller-95.webp",
        maker: 'VST Shakti',
        body: 'A compact tiller for narrow plots, garden land and inter-row work.',
        specs: [],
      },
    ],
  },
  {
    slug: 'round-baler',
    name: 'Round Balers',
    ta: 'ரவுண்ட் பேலர்',
    maker: 'Gomadhi Engineering',
    image: 'assets/baler.webp',
    summary: 'Turn paddy straw and silage into saleable bales instead of burning it in the field.',
    intro:
      'A baler changes what happens to your straw after harvest: instead of a burning cost it becomes a product you can store and sell. The Gomadhi AB Series runs off a 35–45 HP tractor with a dual clutch.',
    models: [
      {
        name: 'Gomadhi AB Series Round Baler',
        image: "assets/baler.webp",
        maker: 'Gomadhi Engineering',
        body: 'A tractor-operated round baler. It picks up cut straw and compresses it into a compact round bale that is easy to handle, transport and store. Requires a 35–45 HP tractor (dual clutch) with 540 PTO RPM.',
        specs: [
          ['Tractor', '35 – 45 HP'],
          ['PTO', '540 RPM'],
          ['Clutch', 'Dual, required'],
          ['Binding', 'Automatic twine'],
          ['Lubrication', 'Automatic, centralised'],
          ['Bale density', 'Adjustable'],
        ],
        features: [
          'Can be operated on lower-HP tractors',
          'Trouble-free binding with easy adjustments',
          'Lubrication system with a self-cleaning brush',
          'Bale counter fitted',
          'Larger tyres absorb shock loads and improve flotation on soft ground',
          'Spring-loaded bale ramp lets the bale roll clear of the baler',
          'No external power supply needed for the hydraulic system',
        ],
      },
    ],
  },
  {
    slug: 'rotavator',
    name: 'Rotavators',
    ta: 'ரோட்டவேட்டர்',
    maker: 'Gomadhi Engineering',
    image: 'assets/rotavator.webp',
    summary: 'Heavy-duty rotary tillage that leaves a seed bed ready in a single pass.',
    intro:
      'The GES range covers everything from general tillage on hard soil to banana plantations and heavy crop residue. Custom working widths are available to order.',
    models: [
      {
        name: 'GES HD / Super HD Series',
        image: "assets/rotavator.webp",
        maker: 'Gomadhi Engineering',
        body: 'Designed to work efficiently in all types of crop and soil: removes weeds, mixes manure and fertiliser into the soil, chops stubble, breaks clods and levels the field. Requires a 30–85 HP tractor with 540 or 1000 PTO RPM.',
        specs: [
          ['Tractor', '30 – 85 HP'],
          ['PTO', '540 / 1000 RPM'],
          ['Gearbox', 'Heavy duty'],
          ['Rear roller', 'Adjustable'],
          ['Drive', 'Side or centre'],
        ],
        table: {
          caption: 'Model details',
          head: ['Model', 'Working width', 'Tractor HP', 'Blades', 'Best application'],
          rows: [
            ['GES 70 MSG', '1960 mm', '60 – 70 HP', '48', 'Hard soil & general tillage'],
            ['GES 80 MSG', '2190 mm', '70 – 85 HP', '54', 'Large farms & heavy soil'],
            ['GES Super HD', '1640 – 2100 mm', '60 HP+', '42 – 54', 'Banana plantations & crop residue'],
          ],
          note: 'Custom sizes available on request.',
        },
      },
    ],
  },
  {
    slug: 'cultivator',
    name: 'Cultivators & Ploughs',
    ta: 'கல்டிவேட்டர்கள்',
    maker: 'Ponnar Sankar Manufacturing',
    image: 'assets/cultivator.webp',
    summary: 'Primary and secondary tillage tools built for the hard red soils of the region.',
    intro:
      'These are the implements we build and finish ourselves, so sizes, tine spacing and frames can be customised to the tractor you already own.',
    models: [
      {
        name: 'Heavy Duty Chisel Plough (Tractor Subsoiler)',
        image: "assets/cultivator.webp",
        maker: 'Ponnar Sankar Manufacturing',
        body: 'Built for deep tillage to break up hardpan layers and compacted soil. It improves water infiltration, root growth and soil aeration, making it ideal for land preparation before sowing.',
        specs: [
          ['Tractor', '11 – 70 HP'],
          ['Frame', 'Heavy duty'],
          ['Shovels', 'High-carbon steel'],
          ['Depth', 'Adjustable'],
          ['Tine spacing', 'Adjustable'],
          ['Customisation', 'On request'],
        ],
      },
      {
        name: 'Tractor Ridger',
        image: "assets/cultivator-ridger.webp",
        maker: 'Ponnar Sankar Manufacturing',
        body: 'Forms ridges and furrows for row crops and irrigation channels.',
        specs: [],
      },
      {
        name: 'Rigid Type Cultivator',
        image: "assets/cultivator-rigid.webp",
        maker: 'Ponnar Sankar Manufacturing',
        body: 'A fixed-tine cultivator for secondary tillage on heavier ground.',
        specs: [],
      },
      {
        name: 'Spring Loaded Cultivator',
        image: "assets/cultivator-spring.webp",
        maker: 'Ponnar Sankar Manufacturing',
        body: 'Spring tines trip over stones and roots, so the frame survives stony land.',
        specs: [],
      },
    ],
  },
  {
    slug: 'tipper',
    name: 'Tippers',
    ta: 'டிப்பர்கள்',
    maker: 'Ponnar Sankar Manufacturing',
    image: 'assets/tipper.webp',
    summary: 'Hydraulic trailers for sand, manure and harvest haulage, built to take daily contract work.',
    intro:
      'Both tipper bodies are made for farm and rural construction work — quick unloading, a strong chassis and a finish that survives being left outdoors.',
    models: [
      {
        name: 'Tractor Box Hydraulic Tipper Trailer',
        image: "assets/tipper.webp",
        maker: 'Ponnar Sankar Manufacturing',
        body: 'A durable box-type hydraulic tipper trailer for tractors, suited to farming, construction and rural transport. Designed for quick unloading of soil, sand, crops and manure.',
        specs: [
          ['Load capacity', '3 – 5 ton'],
          ['Tractor', '35 – 75 HP'],
          ['Body', 'Box-type steel'],
          ['Tipping', 'Hydraulic'],
          ['Finish', 'Rust resistant'],
        ],
      },
      {
        name: 'Tractor Hydraulic Tipper Trailer (Chase Type)',
        image: "assets/tipper-chase.webp",
        maker: 'Ponnar Sankar Manufacturing',
        body: 'The chase-type body, for loads that need a lower, longer bed than the box tipper.',
        specs: [],
      },
    ],
  },
  {
    slug: 'water-tanker',
    name: 'Water Tankers',
    ta: 'வாட்டர் டேங்கர்',
    maker: 'Ponnar Sankar Manufacturing',
    image: 'assets/tanker.jpg',
    summary: 'Tractor bowsers for irrigation top-up, spraying and site water supply.',
    intro:
      'Tank capacity is made to order, so the bowser matches the tractor you run and the distance you haul.',
    models: [
      {
        name: 'Tractor Water Tanker (Water Bowser)',
        image: "assets/tanker.jpg",
        maker: 'Ponnar Sankar Manufacturing',
        body: 'A sturdy trailer-mounted unit for water transport and distribution. Suited to irrigation, dust suppression, livestock watering and cleaning, on farms and industrial sites alike.',
        specs: [
          ['Capacity', '1000 – 5000 L'],
          ['Tractor', '35 – 75 HP'],
          ['Tank', 'MS steel, anti-corrosive'],
          ['Outlet', 'Rear'],
          ['Filling', 'Top manhole'],
          ['Chassis', 'Off-road duty'],
        ],
      },
    ],
  },
  {
    slug: 'mulcher',
    name: 'Mulchers',
    ta: 'மல்ச்சர்',
    maker: 'Gomadhi Engineering',
    image: 'assets/mulcher.webp',
    summary: 'Shred standing residue back into the soil and keep the next crop on schedule.',
    intro:
      'The AS Series traps clippings inside the frame until they are cut small, then returns them to the ground where they decompose and build up the organic structure of the soil.',
    models: [
      {
        name: 'Gomadhi AS Series Shredder / Mulcher',
        image: "assets/mulcher.webp",
        maker: 'Gomadhi Engineering',
        body: 'A reliable implement for shredding grass and bushes. Clippings stay trapped inside the frame until cut into pieces, then drop back onto the ground to decompose.',
        specs: [
          ['Mini series', '18 – 24 HP'],
          ['Standard series', '45 HP and above'],
          ['PTO', '540 RPM'],
          ['Rotor', 'Hammer (knife optional)'],
          ['Drive', 'Side belt'],
          ['Rear roller', 'Adjustable'],
        ],
        features: [
          'Cuts paddy, wheat and sugarcane trash and cotton twigs',
          'Suited to clearing residue in coconut farms',
          'Grass cutting and small twigs in vineyards, green manure and orchards',
          'Shreds the entire cotton plant after harvesting',
          'Heavy-duty frame and gearbox',
          'Adjustable rear trailing board',
        ],
      },
    ],
  },
];

// Bilingual keyword blocks carried over from the original footer.
const pair = (s) => {
  const [en, ta] = s.split('|').map((x) => x.trim());
  return { en, ta };
};

export const productOfferings = [
  'Power Tillers | பவர் டில்லர்',
  'VST Shakti 165 DI ES | VST சக்தி 165 DI ES',
  'VST Shakti 130 DI Ultra | VST சக்தி 130 DI அல்ட்ரா',
  'VST Kisan | VST கிசான்',
  'VST 95 DI Ignito | VST 95 DI இக்னிட்டோ',
  'Round Baler | ரவுண்ட் பேலர்',
  'Gomadhi AB Series | கோமதி AB சீரிஸ்',
  'Rotavator | ரோட்டவேட்டர்',
  'GES HD Series | GES HD சீரிஸ்',
  'Cultivators | கல்டிவேட்டர்கள்',
  'Heavy Duty Chisel Plough | ஹெவி டூட்டி சிசல் பிளோ',
  'Tractor Ridger | டிராக்டர் ரிட்ஜர்',
  'Rigid Type Cultivator | ரிஜிட் வகை கல்டிவேட்டர்',
  'Spring Loaded Cultivator | ஸ்பிரிங் லோடட் கல்டிவேட்டர்',
  'Tippers | டிப்பர்கள்',
  'Box Hydraulic Tipper | பாக்ஸ் ஹைட்ராலிக் டிப்பர்',
  'Chase Tipper | சேஸ் டிப்பர்',
  'Water Tanker | வாட்டர் டேங்கர்',
  'Tractor Water Bowser | டிராக்டர் வாட்டர் பௌசர்',
  'Mulcher | மல்ச்சர்',
  'Gomadhi AS Series Shredder | கோமதி AS சீரிஸ் ஷ்ரெடர்',
  'VST Shakti | VST சக்தி',
  'Gomadhi Engineering | கோமதி இன்ஜினியரிங்',
  'Ponnar Sankar Manufacturing | பொன்னார் சங்கர் உற்பத்தி',
  'Tractor Implements | டிராக்டர் உபகரணங்கள்',
  'Agricultural Equipment | விவசாய உபகரணங்கள்',
  'Farm Machinery | பண்ணை இயந்திரங்கள்',
].map(pair);

export const searchTerms = [
  'Power Tiller Namakkal | பவர் டில்லர் நாமக்கல்',
  'VST Power Tiller Namakkal | VST பவர் டில்லர் நாமக்கல்',
  'Power Tiller Trichy | பவர் டில்லர் திருச்சி',
  'Round Baler Namakkal | ரவுண்ட் பேலர் நாமக்கல்',
  'Rotavator Namakkal | ரோட்டவேட்டர் நாமக்கல்',
  'Tractor Implements Namakkal | டிராக்டர் உபகரணங்கள் நாமக்கல்',
  'Tractor Spares Namakkal | டிராக்டர் உதிரி பாகங்கள் நாமக்கல்',
  'Agricultural Equipment Namakkal | விவசாய உபகரணங்கள் நாமக்கல்',
  'Tractor Cultivator Namakkal | டிராக்டர் கல்டிவேட்டர் நாமக்கல்',
  'Tractor Tipper Namakkal | டிராக்டர் டிப்பர் நாமக்கல்',
  'Water Tanker Namakkal | வாட்டர் டேங்கர் நாமக்கல்',
  'Mulcher Namakkal | மல்ச்சர் நாமக்கல்',
  'Power Tiller Trichirapalli | பவர் டில்லர் திருச்சிராப்பள்ளி',
  'Tractor Implements Trichy | டிராக்டர் உபகரணங்கள் திருச்சி',
  'VST Dealer Namakkal | VST டீலர் நாமக்கல்',
  'Gomadhi Dealer Namakkal | கோமதி டீலர் நாமக்கல்',
  'Farm Machinery Namakkal | பண்ணை இயந்திரங்கள் நாமக்கல்',
  'Tractor Parts Namakkal | டிராக்டர் பாகங்கள் நாமக்கல்',
  'Agricultural Tools Namakkal | விவசாய கருவிகள் நாமக்கல்',
  'Power Tiller Karur | பவர் டில்லர் கரூர்',
  'Tractor Implements Karur | டிராக்டர் உபகரணங்கள் கரூர்',
  'Power Tiller Salem | பவர் டில்லர் சேலம்',
  'Rotavator Trichy | ரோட்டவேட்டர் திருச்சி',
  'Tractor Subsoiler Namakkal | டிராக்டர் சப்சாயிலர் நாமக்கல்',
  'Chisel Plough Namakkal | சிசல் பிளோ நாமக்கல்',
  'Tractor Ridger Namakkal | டிராக்டர் ரிட்ஜர் நாமக்கல்',
  'Hydraulic Tipper Namakkal | ஹைட்ராலிக் டிப்பர் நாமக்கல்',
  'Best Power Tiller Dealer Namakkal | சிறந்த பவர் டில்லர் டீலர் நாமக்கல்',
  'Affordable Tractor Implements | மலிவு டிராக்டர் உபகரணங்கள்',
  'Quality Farm Equipment | தரமான பண்ணை உபகரணங்கள்',
  'Tractor Accessories Namakkal | டிராக்டர் துணைப் பொருட்கள் நாமக்கல்',
  'Agriculture Machinery Tamil Nadu | விவசாய இயந்திரங்கள் தமிழ்நாடு',
].map(pair);
