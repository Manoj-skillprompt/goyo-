import { FAQItem, WorkflowStep } from '../types';

export const partnersData = [
  { name: 'Allianz Care', type: 'OSHC & OVHC', logo: '/allianz_care.png', height: 'h-8 sm:h-9 max-w-[140px]' },
  { name: 'Bupa', type: 'OSHC & OVHC', logo: '/bupa1.png', height: 'h-8 sm:h-9 max-w-[105px]' },
  { name: 'Medibank', type: 'OSHC & OVHC', logo: '/mediabank.png', height: 'h-8 sm:h-9 max-w-[125px]' },
  { name: 'nib Health', type: 'OSHC & OVHC', logo: '/nib.png', height: 'h-7 sm:h-8 max-w-[105px]' },
  { name: 'ahm', type: 'OSHC Cover', logo: '/ahm.png', height: 'h-8 sm:h-9 max-w-[105px]' }
];

export const metricsData = [
  { target: 500, label: 'Education Partners', suffix: '+', colorClass: 'text-emerald-600', delay: 0 },
  { target: 150000, label: 'Covers Issued', suffix: '+', colorClass: 'text-sky-600', delay: 80 },
  { target: 120000, label: 'Happy Customers', suffix: '+', colorClass: 'text-indigo-600', delay: 160 },
  { target: 85000, label: 'Students Supported', suffix: '+', colorClass: 'text-amber-600', delay: 240 },
  { target: 45, label: 'Origin Countries', suffix: '+', colorClass: 'text-teal-600', delay: 320 }
];

export const supportedOriginCountries = [
  { name: 'India', flag: '🇮🇳' },
  { name: 'Nepal', flag: '🇳🇵' },
  { name: 'Vietnam', flag: '🇻🇳' },
  { name: 'Philippines', flag: '🇵🇭' },
  { name: 'China', flag: '🇨🇳' },
  { name: 'Colombia', flag: '🇨🇴' },
  { name: 'Brazil', flag: '🇧🇷' },
  { name: 'Indonesia', flag: '🇮🇩' },
  { name: 'Pakistan', flag: '🇵🇰' },
  { name: 'Kenya', flag: '🇰🇪' }
];

export const workflowStepsData: WorkflowStep[] = [
  {
    step: '01',
    badge: 'Get Quote',
    title: '1. Get Quote',
    description: 'Input your arrival date, course duration, and visa subclass. Our instant quote engine calculates official DHA condition 8501 compliant coverage.',
    calloutText: 'Official government deed price parity guaranteed with zero markups.',
    subText: 'Allianz Care • Bupa • Medibank • nib',
    subBadge: 'Zero Markup',
    badgeColor: 'text-sky-600',
    image: '/step-slide-1.png'
  },
  {
    step: '02',
    badge: 'Select Providers',
    title: '2. Select Providers',
    description: 'Compare side-by-side policy benefits, direct-billing clinic networks, emergency hospital coverage, and extra inclusions from certified Australian insurers.',
    calloutText: 'Official government deed price parity guaranteed with zero markups.',
    subText: 'Allianz Care • Bupa • Medibank • nib',
    subBadge: 'Zero Markup',
    badgeColor: 'text-sky-600',
    image: '/step-slide-2.png'
  },
  {
    step: '03',
    badge: 'Student Details',
    title: '3. Fill Students Details',
    description: 'Input primary student and dependant passport details, date of birth, contact email, and Australian university or college institution.',
    calloutText: 'Auto-matched with Australian CRICOS university lists & visa validation.',
    subText: 'Passport • CoE Match • Primary Insured',
    subBadge: 'Auto-Check',
    badgeColor: 'text-emerald-600',
    image: '/step-slide-3.png'
  },
  {
    step: '04',
    badge: 'Purchase Policy',
    title: '4. Purchase Policy',
    description: 'Complete instant payment via credit card or transfer. Your official immigration-ready certificate and policy number are issued in seconds.',
    calloutText: 'Instant ImmiAccount recognition • official stamped PDF ready for submission.',
    subText: 'Policy #OSH-849204-AU',
    subBadge: 'Stamped PDF',
    badgeColor: 'text-emerald-600',
    image: '/step-slide-4.png'
  }
];

export const faqsData: FAQItem[] = [
  {
    id: 1,
    question: 'Is OSHC purchased on this portal accepted for an Australian Student Visa (Subclass 500)?',
    answer: `Yes. All OSHC policies on our platform are issued exclusively by official signatories to the Australian Government Deed for the Provision of Overseas Student Health Cover: Allianz Care Australia, Bupa Australia, Medibank Private, nib Health Funds, and ahm.

Your official certificate includes your registered policy number, visa subclass endorsement, and active start/end dates.

Certificates are generated instantly upon checkout confirmation, allowing you or your registered migration agent to finalize visa lodgement.`
  },
  {
    id: 2,
    question: 'What is the difference between OSHC and OVHC?',
    answer: `OSHC (Overseas Student Health Cover) is designed specifically for primary student visa holders (Subclass 500) and their dependent family members. It is heavily subsidized and bound by government-mandated price deeds.

OVHC (Overseas Visitor Health Cover) is intended for non-student visas, including the Subclass 485 Temporary Graduate Visa, Subclass 600 Visitor Visa, and Subclass 482 Temporary Skill Shortage Visa.

Purchasing OVHC ensures strict legal compliance with mandatory Visa Condition 8501, maintaining valid health insurance throughout your Australian residency.`
  },
  {
    id: 3,
    question: 'What is the refund process if my Australian visa is refused?',
    answer: `Under official Australian Government deed regulations, if your visa is refused or you are unable to enter Australia, you are entitled to a 100% full refund of your premium with zero cancellation fees.

To claim, simply upload your official Department of Home Affairs refusal notification letter directly via our online portal.

Our Sydney team handles insurer liaison and coordinates the complete refund back to your original payment method, usually within 5 to 7 business days.`
  },
  {
    id: 4,
    question: 'Can I switch insurers after purchasing?',
    answer: `Yes. You can switch your OSHC or OVHC provider at any point during your studies or visa duration without penalty.

Your previous insurer will calculate and issue a pro-rata refund for all remaining unused months once proof of your new policy certificate is supplied.

Our portal can facilitate the direct provider transfer for you so there is zero overlap or lapse in cover, safeguarding your visa status.`
  },
  {
    id: 5,
    question: 'Are there any service fees for university counseling through YourAdmissions?',
    answer: `No. Our university advisory, course selection counseling, and application processing services are 100% free of charge for international applicants.

Our educational counselors hold Qualified Education Agent Counselor (QEAC) accreditations and partner directly with certified Australian universities and TAFEs nationwide.

We guide you from initial course evaluation through to receiving your official Confirmation of Enrolment (CoE).`
  },
  {
    id: 6,
    question: 'How quickly will I receive my digital insurance certificate?',
    answer: `Your official digital certificate of insurance (COI) is generated in real time within seconds of completing payment.

A copy is sent immediately to your registered email address and is permanently accessible in your student portal dashboard.

Agents and students can download the certified PDF with policy number ready for instant attachment to their visa lodgement.`
  }
];

