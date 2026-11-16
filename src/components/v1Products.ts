// V1's four products, shown in the full-screen product panels (ProductShowcase). Brand colours follow each product's logo (OVHC is yellow, not red).
//
// VERIFY BEFORE LAUNCH: prices ($54, $75) and the "1,200+ clinics" figure are carried over from the
// original V1 and differ from V2's figures. Confirm them with the product team.

export interface V1Product {
  id: 'oshc' | 'ovhc' | 'admission' | 'orbit';
  name: string;
  /** White logo for dark grounds; Orbit has none, so it's drawn as a wordmark. */
  logo?: string;
  tag: string;
  title: string;
  text: string;
  points: string[];
  priceLabel: string;
  price: string;
  priceSuffix?: string;
  cta: string;
  href: string;
  photo: string;
  photoAlt: string;
  photoPosition: string;
  /** Member-card gradient (deep, so each logo's coloured half reads), panel ground, button colour
   *  and the text colour on that button. */
  cardFrom: string;
  cardTo: string;
  panel: string;
  accent: string;
  accentInk: string;
  /** Muted text on the panel ground. */
  soft: string;
}

export const V1_PRODUCTS: V1Product[] = [
  {
    id: 'oshc',
    name: 'yourOSHC',
    logo: '/logos/youroshc-white.png',
    tag: 'Visa subclass 500',
    title: 'Health cover for your student visa',
    text: 'Overseas Student Health Cover from all five approved insurers: Allianz Care, Bupa, Medibank, nib and ahm.',
    points: [
      'Meets student visa condition 8501',
      'Certificate ready for ImmiAccount the moment you pay',
      'Direct billing at 1,200+ medical clinics',
      'Full refund if your visa is refused'
    ],
    priceLabel: 'From',
    price: '$54',
    priceSuffix: '/month',
    cta: 'Buy OSHC',
    href: 'https://youroshc.com.au',
    photo: '/product-oshc.jpg',
    photoAlt: 'International student smiling on an Australian university campus',
    photoPosition: '50% 30%',
    cardFrom: '#13502F',
    cardTo: '#08241A',
    panel: '#073826',
    accent: '#22B25C',
    accentInk: '#FFFFFF',
    soft: '#B7D9C4'
  },
  {
    id: 'ovhc',
    name: 'yourOVHC',
    logo: '/logos/yourovhc-white.svg',
    tag: 'Visas 485, 482, 491 and 600',
    title: 'Health cover for graduates, workers and visitors',
    text: 'Overseas Visitor Health Cover for temporary graduate, employer-sponsored, regional and visitor visa holders.',
    points: [
      'Meets visa condition 8501',
      'Pay monthly, with no lock-in contract',
      'Visa letter ready to download for lodgement',
      'Optional extras: dental, optical and physio'
    ],
    priceLabel: 'From',
    price: '$75',
    priceSuffix: '/month',
    cta: 'Buy OVHC',
    href: 'https://yourovhc.com.au',
    photo: '/product-ovhc.jpg',
    photoAlt: 'Young professional smiling by Sydney Harbour',
    photoPosition: '60% 35%',
    cardFrom: '#4A3A08',
    cardTo: '#1F1803',
    panel: '#2B2208',
    accent: '#FFCC00',
    accentInk: '#1A1400',
    soft: '#DCCFA8'
  },
  {
    id: 'admission',
    name: 'yourADMISSION',
    logo: '/logos/youradmission-white.png',
    tag: 'Australian universities and colleges',
    title: 'Apply to Australian universities, free',
    text: 'QEAC-certified counsellors guide you from choosing a course to your Confirmation of Enrolment (CoE), at no cost.',
    points: [
      'Pathways into Group of Eight and leading universities',
      'Help with the Genuine Student (GS) requirement',
      'Support with your offer letter and CoE',
      'Guidance on international scholarships'
    ],
    priceLabel: 'Counselling',
    price: 'Free',
    cta: 'Apply now',
    href: 'https://youradmission.com.au',
    photo: '/product-admissions.jpg',
    photoAlt: 'Student holding her welcome pack and offer letter on an Australian campus',
    photoPosition: '55% 30%',
    cardFrom: '#123A80',
    cardTo: '#071A3D',
    panel: '#0A2350',
    accent: '#258CFF',
    accentInk: '#FFFFFF',
    soft: '#B8CCEB'
  },
  {
    id: 'orbit',
    name: 'OrbitProtect',
    tag: 'Travelling in New Zealand',
    title: 'Travel cover for your time in New Zealand',
    text: 'Medical and travel insurance for international students, working holidaymakers, seasonal workers and visitors.',
    points: [
      'Meets Immigration New Zealand requirements for student and working holiday visas',
      'Medical, hospital and emergency evacuation cover',
      '24/7 emergency assistance',
      'Baggage, travel disruption and rental-car excess cover'
    ],
    priceLabel: 'Price',
    price: 'Instant quote',
    cta: 'Get a quote',
    href: 'https://orbitprotect.com',
    photo: '/hero-family-sky.jpg',
    photoAlt: 'Family smiling together outdoors at twilight',
    photoPosition: '50% 70%',
    cardFrom: '#0A5675',
    cardTo: '#03222F',
    panel: '#06364A',
    accent: '#00B4F1',
    accentInk: '#04222F',
    soft: '#A9D3E3'
  }
];
