export interface Question {
  id: string;
  question: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  explanation: string;
}

export interface AssessmentModule {
  id: string;
  number: string;
  title: string;
  description: string;
  duration: string;
  image: string;
  questions: Question[];
}

export const modules: AssessmentModule[] = [
  {
    id: 'surface-repair',
    number: 'MODULE 01',
    title: 'Surface Repair Fundamentals',
    description: 'Master damage identification, filler application, and sanding techniques across laminate, veneer, and solid wood surfaces.',
    duration: '45 MIN',
    image: '/images/module-01.jpg',
    questions: [
      {
        id: 'sr-1',
        question: 'When repairing a deep chip in a laminate worktop, what is the first step before applying filler?',
        options: [
          { label: 'A', text: 'Apply masking tape around the damaged area' },
          { label: 'B', text: 'Clean and degrease the damaged area thoroughly' },
          { label: 'C', text: 'Sand the surface with 120-grit paper' },
          { label: 'D', text: 'Apply a bonding agent to the exposed substrate' },
        ],
        correctAnswer: 'B',
        explanation: 'Proper cleaning and degreasing is essential before any repair. Contaminants like oils, grease, or debris will prevent fillers from bonding correctly, leading to repair failure.',
      },
      {
        id: 'sr-2',
        question: 'What type of filler is most appropriate for repairing damage on a solid wood surface that will be stained afterward?',
        options: [
          { label: 'A', text: 'Two-part epoxy filler' },
          { label: 'B', text: 'Water-based acrylic filler' },
          { label: 'C', text: 'Wood dust mixed with lacquer' },
          { label: 'D', text: 'Polyester filler' },
        ],
        correctAnswer: 'C',
        explanation: 'Wood dust mixed with lacquer (or the intended finish) creates a filler that accepts stain similarly to the surrounding wood, ensuring the repair blends seamlessly after finishing.',
      },
      {
        id: 'sr-3',
        question: 'When sanding a repair area, what is the correct grit progression for achieving a smooth finish?',
        options: [
          { label: 'A', text: '80 → 120 → 240 → 400' },
          { label: 'B', text: '120 → 180 → 320 → 600' },
          { label: 'C', text: '60 → 150 → 220 → 320' },
          { label: 'D', text: '120 → 240 → 400 → 800' },
        ],
        correctAnswer: 'B',
        explanation: 'The correct progression is 120 (rough shaping) → 180 (smoothing) → 320 (fine smoothing) → 600 (pre-finish). Skipping grits leaves scratches that show through the final finish.',
      },
    ],
  },
  {
    id: 'glass-repair',
    number: 'MODULE 02',
    title: 'Glass & Glazing Restoration',
    description: 'Learn specialized techniques for repairing scratched glass, polishing optical surfaces, and restoring clarity to glazed panels.',
    duration: '40 MIN',
    image: '/images/module-02.jpg',
    questions: [
      {
        id: 'gr-1',
        question: 'What is the maximum depth of glass scratch that can typically be successfully polished out?',
        options: [
          { label: 'A', text: 'Up to 0.1mm deep' },
          { label: 'B', text: 'Up to 0.5mm deep' },
          { label: 'C', text: 'Up to 1.0mm deep' },
          { label: 'D', text: 'Any depth can be polished out' },
        ],
        correctAnswer: 'A',
        explanation: 'Scratches deeper than 0.1mm (100 microns) typically require removing too much glass material to polish out, risking optical distortion or weakening the pane. Deep scratches usually necessitate glass replacement.',
      },
      {
        id: 'gr-2',
        question: 'When polishing glass, what compound is typically used for the final polishing stage?',
        options: [
          { label: 'A', text: 'Diamond paste with 3-micron particles' },
          { label: 'B', text: 'Cerium oxide slurry' },
          { label: 'C', text: 'Aluminum oxide powder' },
          { label: 'D', text: 'Silicon carbide grit' },
        ],
        correctAnswer: 'B',
        explanation: 'Cerium oxide is the industry-standard compound for final glass polishing. It chemically reacts with the glass surface while mechanically polishing, producing exceptional clarity.',
      },
    ],
  },
  {
    id: 'spray-applied',
    number: 'MODULE 03',
    title: 'Spray Application Techniques',
    description: 'Develop expertise in spray gun operation, paint mixing, booth setup, and achieving factory-quality finishes on metal and composite surfaces.',
    duration: '50 MIN',
    image: '/images/module-03.jpg',
    questions: [
      {
        id: 'sa-1',
        question: 'What is the recommended spray distance between the gun nozzle and the surface for HVLP spray systems?',
        options: [
          { label: 'A', text: '5-10 cm' },
          { label: 'B', text: '10-15 cm' },
          { label: 'C', text: '15-20 cm' },
          { label: 'D', text: '25-30 cm' },
        ],
        correctAnswer: 'C',
        explanation: 'HVLP (High Volume Low Pressure) systems work best at 15-20cm distance. Too close causes runs and orange peel; too far causes dry spray and poor adhesion.',
      },
      {
        id: 'sa-2',
        question: 'When spray applying a metallic base coat, what technique ensures even metallic flake orientation?',
        options: [
          { label: 'A', text: 'Apply heavy wet coats to level the metallic' },
          { label: 'B', text: 'Use a cross-coat pattern with consistent overlap' },
          { label: 'C', text: 'Spray at a 90-degree angle to the surface only' },
          { label: 'D', text: 'Apply a single thick coat to minimize passes' },
        ],
        correctAnswer: 'B',
        explanation: 'A cross-coat pattern (horizontal then vertical passes) with 50-75% overlap ensures even metallic flake distribution, preventing streaking, blotching, or cloudiness in the final appearance.',
      },
    ],
  },
  {
    id: 'french-polishing',
    number: 'MODULE 04',
    title: 'French Polishing & Wood Restoration',
    description: 'Learn traditional and modern wood finishing techniques including rubber application, shellac mixing, grain filling, and achieving high-gloss surfaces.',
    duration: '45 MIN',
    image: '/images/module-04.jpg',
    questions: [
      {
        id: 'fp-1',
        question: 'What is the primary component of traditional French polish?',
        options: [
          { label: 'A', text: 'Polyurethane resin dissolved in mineral spirits' },
          { label: 'B', text: 'Shellac flakes dissolved in denatured alcohol' },
          { label: 'C', text: 'Linseed oil mixed with beeswax' },
          { label: 'D', text: 'Nitrocellulose lacquer thinned with acetone' },
        ],
        correctAnswer: 'B',
        explanation: 'Traditional French polish consists of shellac flakes dissolved in denatured alcohol (methylated spirits), often with a small amount of oil (like linseed) to lubricate the rubber during application.',
      },
      {
        id: 'fp-2',
        question: 'When applying French polish with a rubber (pad), what motion is used to build the finish?',
        options: [
          { label: 'A', text: 'Circular motions with heavy pressure' },
          { label: 'B', text: 'Figure-eight patterns with light, even pressure' },
          { label: 'C', text: 'Straight-line strokes following the grain' },
          { label: 'D', text: 'Random buffing motions' },
        ],
        correctAnswer: 'B',
        explanation: 'Figure-eight patterns with light, even pressure allow the polish to flow into the grain while building thin, level coats. Heavy pressure causes streaks and uneven build.',
      },
    ],
  },
  {
    id: 'specialist',
    number: 'MODULE 05',
    title: 'Advanced Specialist Techniques',
    description: 'Advanced repairs on enamel, cast iron, stone, Corian, and UPVC surfaces requiring specialized compounds, heat tools, and color-matching expertise.',
    duration: '55 MIN',
    image: '/images/module-05.jpg',
    questions: [
      {
        id: 'sp-1',
        question: 'When repairing a chip in an enamel bath, what is the correct repair sequence?',
        options: [
          { label: 'A', text: 'Fill with acrylic putty, sand, spray enamel paint' },
          { label: 'B', text: 'Clean damage, apply color-matched epoxy filler, cure, sand progressively, spray enamel coating, polish' },
          { label: 'C', text: 'Apply superglue to bind chip edges, cover with gel coat' },
          { label: 'D', text: 'Grind out chip, weld metal patch, refinish' },
        ],
        correctAnswer: 'B',
        explanation: 'Enamel repair requires: thorough cleaning → color-matched epoxy filler → proper curing → progressive sanding (120→400→800) → enamel spray coating → polishing. This ensures durability and color match.',
      },
      {
        id: 'sp-2',
        question: 'What is the key consideration when color-matching a repair on a granite worktop?',
        options: [
          { label: 'A', text: 'Match only the dominant base color' },
          { label: 'B', text: 'Account for both base color and speckle pattern' },
          { label: 'C', text: 'Use a universal grey filler for all granite types' },
          { label: 'D', text: 'Always apply a dark tint to hide the repair' },
        ],
        correctAnswer: 'B',
        explanation: 'Granite color-matching requires accounting for both the base color and the speckle/fleck pattern. A successful repair mimics the natural stone variation, not just the dominant color.',
      },
    ],
  },
];

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  score: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote: 'The assessment was tough but fair. It identified exactly where my knowledge gaps were in stone repair. After completing the targeted training module, I got certified and landed a job with a construction firm in Tema within two weeks.',
    name: 'Kwame Asante',
    role: 'Certified Surface Technician \u00B7 Accra',
    score: '92%',
  },
  {
    id: 't2',
    quote: "I thought I knew surface repair from watching videos, but the practical scenarios in the assessment showed me how much I was missing. The color-matching module alone was worth the entire program.",
    name: 'Abena Owusu',
    role: 'Glass Restoration Specialist \u00B7 Kumasi',
    score: '88%',
  },
  {
    id: 't3',
    quote: "As an employer, I only hire technicians who've passed the CST assessment. The certification gives me confidence that they can handle real jobs from day one without costly mistakes.",
    name: 'Emmanuel Mensah',
    role: 'Site Supervisor \u00B7 Cape Coast',
    score: '95%',
  },
];

export interface Skill {
  id: string;
  name: string;
  description: string;
  percentage: number;
}

export const skills: Skill[] = [
  {
    id: 'sk1',
    name: 'Damage Identification',
    description: 'Accurately classify chips, scratches, burns, water damage, and distortion across all surface types',
    percentage: 85,
  },
  {
    id: 'sk2',
    name: 'Repair Methodology',
    description: 'Select and execute appropriate repair techniques for wood, metal, stone, enamel, and UPVC surfaces',
    percentage: 90,
  },
  {
    id: 'sk3',
    name: 'Color Matching',
    description: 'Achieve seamless color blending using tinting systems and spray application',
    percentage: 75,
  },
  {
    id: 'sk4',
    name: 'Tool Proficiency',
    description: 'Demonstrate mastery of heat guns, spray systems, polishers, and specialized hand tools',
    percentage: 80,
  },
  {
    id: 'sk5',
    name: 'Quality Standards',
    description: 'Deliver repairs meeting industry durability and aesthetic benchmarks',
    percentage: 95,
  },
];
