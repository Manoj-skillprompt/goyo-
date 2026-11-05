// Content for the Version 2 light-mode landing page.

export interface V2Product {
  id: string;
  // Wordmark split so the brand half can carry the product colour.
  prefix: string;
  brand: string;
  category: string;
  title: string;
  description: string;
  audience: string;
  priceLabel: string;
  priceValue: string;
  priceSuffix?: string;
  perks: string[];
  cta: string;
  color: string;
  colorDeep: string;
  tint: string;
  // Light member-card gradient and the deep ink used on top of it.
  panelFrom: string;
  panelTo: string;
  panelInk: string;
  // Full-colour logo for light backgrounds; falls back to the text wordmark when absent.
  logo?: string;
  // Per-logo height so lockups with different proportions read at the same optical size.
  logoClass?: string;
  tag?: string;
}

export const V2_PRODUCTS: V2Product[] = [
  {
    id: 'oshc',
    prefix: 'your',
    brand: 'OSHC',
    category: 'Student health cover',
    title: 'Health cover for your student visa',
    description: 'Overseas Student Health Cover that meets visa condition 8501, from day one.',
    audience: 'Subclass 500',
    priceLabel: 'From',
    priceValue: '$46',
    priceSuffix: '/mo',
    perks: ['Certificate in seconds', 'Full refund if visa refused'],
    cta: 'Buy OSHC',
    color: '#1FA855',
    colorDeep: '#13853F',
    tint: '#ECF8F0',
    panelFrom: '#C9F0D6',
    panelTo: '#9FDDB5',
    panelInk: '#0E6B33',
    logo: '/logos/youroshc.png',
    logoClass: 'h-[29px]',
  },
  {
    id: 'ovhc',
    prefix: 'your',
    brand: 'OVHC',
    category: 'Visitor health cover',
    title: 'Cover for workers, graduates & visitors',
    description: 'Overseas Visitor Health Cover for graduate, skilled and visitor visa holders.',
    audience: '485 · 482 · 491 · 600',
    priceLabel: 'From',
    priceValue: '$67',
    priceSuffix: '/mo',
    perks: ['Meets condition 8501', 'Switch providers anytime'],
    cta: 'Buy OVHC',
    color: '#FFCC00',
    colorDeep: '#8F6A00',
    tint: '#FFF8DB',
    panelFrom: '#FFFAE6',
    panelTo: '#FFEDB0',
    panelInk: '#7A5B00',
    logo: '/logos/yourovhc.svg',
    logoClass: 'h-[30px]'
  },
  {
    id: 'admission',
    prefix: 'your',
    brand: 'ADMISSION',
    category: 'University admissions',
    title: 'Apply to Australian universities',
    description: 'QEAC-certified counsellors take you from course choice to your CoE.',
    audience: '500+ institutions',
    priceLabel: 'Counselling',
    priceValue: 'Free',
    perks: ['Offer & CoE support', 'Unis and TAFEs nationwide'],
    cta: 'Enroll Students',
    color: '#258CFF',
    colorDeep: '#006EE9',
    tint: '#EAF3FF',
    panelFrom: '#D3E6FF',
    panelTo: '#A8CBFF',
    panelInk: '#0052B4',
    logo: '/logos/youradmission.png',
    logoClass: 'h-[26px]'
  },
  {
    id: 'orbit',
    prefix: 'Orbit',
    brand: 'Protect',
    category: 'Travel insurance',
    title: 'Travel cover while in New Zealand',
    description: 'Medical and travel insurance for international visitors to New Zealand.',
    audience: 'New Zealand',
    priceLabel: 'Quote in',
    priceValue: '60',
    priceSuffix: ' sec',
    perks: ['Medical & trip cover', 'Buy before or after arrival'],
    cta: 'Get NZ quote',
    color: '#00B4F1',
    colorDeep: '#0090C4',
    tint: '#E6F7FD',
    panelFrom: '#CDF1FC',
    panelTo: '#9CDDF4',
    panelInk: '#006F98',
    tag: 'New'
  }
];

// "How it works" steps; images are real screenshots of the yourOSHC purchase flow.
export const V2_STEPS: {
  title: string;
  description: string;
  icon: 'quote' | 'compare' | 'details' | 'certificate';
  image: string;
  imageAlt: string;
}[] = [
  {
    title: 'Get a quote',
    description: 'Choose your cover type and dates. See official prices from every approved insurer at once.',
    icon: 'quote',
    image: '/step-slide-1.png',
    imageAlt: 'yourOSHC quote form with cover type and policy dates'
  },
  {
    title: 'Compare providers',
    description: 'Line up benefits, clinic networks and price side by side, then pick the one that fits.',
    icon: 'compare',
    image: '/step-slide-2.png',
    imageAlt: 'Side-by-side comparison of OSHC providers'
  },
  {
    title: 'Add your details',
    description: 'Enter passport, date of birth and your course. We check it against CRICOS as you go.',
    icon: 'details',
    image: '/step-slide-3.png',
    imageAlt: 'Student details form with passport and course fields'
  },
  {
    title: 'Get your certificate',
    description: 'Pay securely and download your stamped certificate, ready for ImmiAccount in seconds.',
    icon: 'certificate',
    image: '/step-slide-4.png',
    imageAlt: 'Policy purchased screen with the stamped certificate ready to download'
  }
];

// Visa subclasses listed in the nav, with the cover type each one needs.
export const V2_VISAS: { subclass: string; name: string; cover: 'OSHC' | 'OVHC' }[] = [
  { subclass: '500', name: 'Student', cover: 'OSHC' },
  { subclass: '485', name: 'Temporary Graduate', cover: 'OVHC' },
  { subclass: '482', name: 'Skills in Demand', cover: 'OVHC' },
  { subclass: '491', name: 'Skilled Work Regional', cover: 'OVHC' },
  { subclass: '186', name: 'Employer Nomination', cover: 'OVHC' },
  { subclass: '600', name: 'Visitor', cover: 'OVHC' }
];

// "Become our partner" / "Apply now" link, shared by the partner section and the footer.
// Opens an email until there's a partner application page to link to instead.
export const PARTNER_APPLY_HREF = 'mailto:support@youroshc.com.au?subject=Become%20a%20partner';

// Testimonials for the marquee wall. Sample reviews: replace with real ones before launch.
export const V2_TESTIMONIALS: { name: string; initials: string; university: string; country: string; quote: string }[] = [
  {
    name: 'Kavita Patel',
    initials: 'KP',
    university: 'University of Sydney',
    country: 'India',
    quote: 'Got my certificate literally within 20 seconds. Attached it directly to my ImmiAccount and my visa was granted 4 days later.'
  },
  {
    name: 'Bibek Shrestha',
    initials: 'BS',
    university: 'UNSW Sydney',
    country: 'Nepal',
    quote: 'The price comparison showed I could save $140 compared to buying through my agent. Super smooth and official.'
  },
  {
    name: 'Lucas Silva',
    initials: 'LS',
    university: 'Monash University',
    country: 'Brazil',
    quote: 'Visited a clinic in Melbourne and showed my digital card on my phone. Didn’t pay a single dollar out of pocket.'
  }
];

export interface V2Review {
  name: string;
  initials: string;
  detail: string;
  product: string;
  text: string;
}

export const V2_REVIEWS: V2Review[] = [
  {
    name: 'Kavita Patel',
    initials: 'KP',
    detail: 'University of Sydney',
    product: 'yourOSHC · Allianz Care',
    text: 'Got my certificate within 20 seconds, attached it to ImmiAccount and my visa was granted four days later.'
  },
  {
    name: 'Bibek Shrestha',
    initials: 'BS',
    detail: 'UNSW Sydney',
    product: 'yourOSHC · Bupa',
    text: 'The comparison showed I could save $140 against buying through my agent. Smooth, and everything was official.'
  },
  {
    name: 'Lucas Silva',
    initials: 'LS',
    detail: 'Monash University',
    product: 'yourOSHC · Medibank',
    text: 'Showed my digital card at a clinic in Melbourne and paid nothing out of pocket. Genuinely easy.'
  }
];

// Placeholder rating figures: replace with the real review-platform numbers before launch.
export const V2_RATING = {
  score: '4.9',
  count: '2,300+'
};

// Avatars for the hero social-proof row, cropped from the site's existing photography.
export const V2_AVATARS = [
  '/avatars/student-1.jpg',
  '/avatars/student-2.jpg',
  '/avatars/student-3.jpg',
  '/avatars/student-4.jpg',
  '/avatars/student-5.jpg',
  '/avatars/student-6.jpg'
];

export const V2_TRUST_STATS = [
  { value: '150k+', label: 'covers issued' },
  { value: '500+', label: 'education partners' },
  { value: '45+', label: 'countries served' }
];

export interface V2Provider {
  name: string;
  logo: string;
  logoClass: string;
  covers: string;
  monthlyFrom: number;
  highlight?: string;
  features: string[];
}

export const V2_PROVIDERS: V2Provider[] = [
  {
    name: 'Allianz Care',
    logo: '/allianz_care.png',
    logoClass: 'h-6 max-w-[132px]',
    covers: 'OSHC & OVHC',
    monthlyFrom: 48,
    highlight: 'Most popular',
    features: ['100% MBS doctor visits', '24/7 telehealth included', 'Direct ImmiAccount lodgement']
  },
  {
    name: 'Bupa',
    logo: '/bupa1.png',
    logoClass: 'h-9 max-w-[90px]',
    covers: 'OSHC & OVHC',
    monthlyFrom: 51,
    highlight: 'Largest network',
    features: ['No gap in network clinics', 'Mental health support', 'Student lounges']
  },
  {
    name: 'Medibank',
    logo: '/mediabank.png',
    logoClass: 'h-5 max-w-[120px]',
    covers: 'OSHC & OVHC',
    monthlyFrom: 50,
    features: ['Emergency ambulance 100%', 'Fast claims in the app', 'Hospital network guarantee']
  },
  {
    name: 'nib',
    logo: '/nib.png',
    logoClass: 'h-8 max-w-[96px]',
    covers: 'OSHC & OVHC',
    monthlyFrom: 46,
    highlight: 'Lowest price',
    features: ['No policy surcharges', 'Instant stamped PDF', 'Multilingual support line']
  },
  {
    name: 'ahm',
    logo: '/ahm.png',
    logoClass: 'h-9 max-w-[80px]',
    covers: 'OSHC',
    monthlyFrom: 47,
    features: ['Visa 500 compliant', 'Online claims', 'Pharmacy benefits']
  }
];
