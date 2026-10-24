// ─── Course content model ────────────────────────────────────────────────────
// All copy is authored from City Surface Training's course photography, video
// and published course information (citysurfacetraining.com).

export interface LessonStep {
  title: string;
  body: string;
  image?: string; // /assets/img/*.webp
  caption?: string;
  video?: { src: string; poster: string; caption: string };
}

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number; // index of correct option
  why: string;
}

export interface Lesson {
  id: string;
  title: string;
  minutes: number;
  intro: string;
  steps: LessonStep[];
  tools?: string[];
  tips?: string[];
  video?: { src: string; poster: string; caption: string };
  quiz: QuizQuestion[];
}

export interface Module {
  id: string;
  index: string; // "01"
  title: string;
  strap: string;
  description: string;
  image: string;
  free?: boolean;
  surfaces: string[];
  lessons: Lesson[];
}

export const ACCESS_CODES = ["CST-ELITE-2025", "SRA-FOUNDING"]; // client-side enrolment codes

export const MODULES: Module[] = [
  {
    id: "fundamentals",
    index: "01",
    title: "Surface Repair Fundamentals",
    strap: "Damage ID · Fillers · Sanding",
    description:
      "Every invisible repair starts with the same foundations: reading the damage, choosing and mixing the right filler, and sanding a feather edge that disappears under finish. This free taster module teaches the core workflow used across every surface discipline.",
    image: "/assets/img/trainers-bench.webp",
    free: true,
    surfaces: ["Laminate", "Veneer", "Solid wood", "UPVC", "Enamel"],
    lessons: [
      {
        id: "kit",
        title: "The Repair Technician's Kit",
        minutes: 12,
        intro:
          "Professional surface repair is a mobile trade — everything you need fits into a compact kit that travels to site. Before you touch a damaged surface, you need to know your materials: what each one does, when to reach for it, and how to keep it ready.",
        steps: [
          {
            title: "Lay out before you start",
            body: "A repair begins at the bench, not at the damage. Lay your kit out on a clean, covered surface so every consumable is visible: fillers and hardeners, pigments and tints, abrasives from coarse to fine, application tools, and your spray equipment. Missing something mid-repair — with filler curing on the palette — is how visible repairs happen.",
            image: "/assets/img/kit-table.webp",
            caption: "A professional kit laid out for a training session: fillers, tints, abrasives and application tools.",
          },
          {
            title: "Know your fillers",
            body: "Two-part polyester fillers do the structural work: they cure by chemical reaction when hardener is added, giving a sandable, waterproof repair on everything from enamel baths to laminate worktops. Hard waxes and shellac sticks handle timber and laminate chips where heat application is acceptable. Acrylic and epoxy putties cover specialist substrates. Keep each type sealed — a skinned-over filler is useless on site.",
          },
          {
            title: "Abrasives: a sequence, not a choice",
            body: "You never sand with a single grit. Stock a ladder — typically P120 through P400 for shaping filler, then P600–P1200 (used wet) for refining before finishing. Interface pads keep machine sanders from dishing soft filler, and hand blocks keep flats flat.",
          },
          {
            title: "Colour is a system",
            body: "Pigments, universal tinters and touch-up pens let you dial in any colour. Store them together, labelled, and always mix test spots on card before committing colour to the repair. The kit in the photo carries a full tint range for exactly this reason.",
            image: "/assets/img/tools-bag.webp",
            caption: "Consumables and PPE travel together — nitrile gloves and respirator are part of the kit, not extras.",
          },
        ],
        tools: ["Two-part filler & hardener", "Hard wax / shellac sticks", "Abrasives P120–P1200", "Pigment & tint set", "Palette knives & spreaders", "Nitrile gloves & respirator"],
        tips: [
          "Decant small amounts of filler onto a disposable palette — never work from the tin.",
          "Check hardener ratios against ambient temperature: heat accelerates cure dramatically.",
        ],
        quiz: [
          {
            q: "Why should the full kit be laid out before a repair begins?",
            options: [
              "It looks professional for the client",
              "Materials like mixed filler cure fast — everything must be in reach before you start",
              "To count stock for reordering",
              "So the surface can dry while you prepare",
            ],
            answer: 1,
            why: "Two-part fillers start curing the moment hardener is added. Searching for a tool mid-repair means dead material and a visible result.",
          },
          {
            q: "Which material provides the structural, sandable repair on an enamel bath chip?",
            options: ["Hard wax stick", "Two-part polyester filler", "Touch-up pen", "PVA adhesive"],
            answer: 1,
            why: "Two-part polyester filler cures hard, waterproof and sandable — ideal for enamel, ceramic and GRP substrates.",
          },
          {
            q: "What is the correct approach to sanding abrasives?",
            options: [
              "Pick the finest grit available and do the whole job with it",
              "Start coarse to shape, then step through progressively finer grits",
              "Always dry sand at every stage",
              "Grit choice doesn't matter, only pressure does",
            ],
            answer: 1,
            why: "A grit ladder removes scratches from the previous stage. Jumping grits leaves deep scratches that telegraph through the finish.",
          },
          {
            q: "Where should filler be mixed?",
            options: ["In the original tin", "On a clean disposable palette or board", "Directly on the damaged surface", "In the lid of the tin"],
            answer: 1,
            why: "Mixing on a clean palette keeps the tin uncontaminated and gives a flat surface for accurate hardener ratios.",
          },
        ],
      },
      {
        id: "damage-id",
        title: "Damage Identification & Assessment",
        minutes: 15,
        intro:
          "The difference between a technician and a guesser is diagnosis. Chips, scratches, gouges, burns, water damage and chemical damage all look different under raking light — and each one dictates a different repair route, filler choice and finishing method.",
        steps: [
          {
            title: "Read the damage under raking light",
            body: "Hold a light source at a low angle across the surface. Raking light exaggerates shadows and reveals the true depth, length and profile of damage that overhead lighting hides. Mark the full extent with a wax pencil — damage is almost always larger than it first appears.",
          },
          {
            title: "Classify what you're looking at",
            body: "Chips are localised losses of material with defined edges. Scratches are linear and may cut through finish only, or into the substrate. Gouges are deep, displaced-material damage that needs structural filling. Burns and chemical damage discolour and often soften the surrounding area — the affected zone must be removed back to sound material, not just covered.",
          },
          {
            title: "Identify the substrate before choosing materials",
            body: "The same chip on acrylic, cast iron enamel, laminate and solid oak takes four different repairs. Tap, flex and inspect edges: acrylic sounds dull and flexes, enamel on cast iron rings and is rock hard, laminate shows a printed layer at any exposed edge. Material ID decides filler chemistry, primer and topcoat.",
            image: "/assets/img/bath-3.webp",
            caption: "A training bath with deliberately introduced chips and edge damage for assessment practice.",
          },
          {
            title: "Decide: repair or refer",
            body: "Structural cracks through a load-bearing area, live water leaks, or damage larger than the surrounding finish can visually absorb are referral jobs. Knowing when not to repair is a professional skill — an attempted repair on an unrepairable substrate costs you the callback and the reputation.",
          },
        ],
        tips: [
          "Photograph damage before starting — for your records and to show the client the 'before'.",
          "Run a fingernail across a scratch: if it catches, it's through the finish and needs filling, not polishing.",
        ],
        quiz: [
          {
            q: "What does raking light reveal?",
            options: [
              "The true colour of the surface",
              "The true depth and extent of damage that overhead light hides",
              "Whether the surface is clean",
              "The age of the damage",
            ],
            answer: 1,
            why: "Low-angle light casts shadows in every depression, showing real damage geometry that flat lighting conceals.",
          },
          {
            q: "Burn or chemical damage should be treated by…",
            options: [
              "Filling straight over it",
              "Polishing it out with compound",
              "Removing all affected material back to sound substrate before filling",
              "Spraying colour directly on top",
            ],
            answer: 2,
            why: "Damaged, softened material won't bond reliably. Cut back to sound substrate or the repair will fail.",
          },
          {
            q: "Why does substrate identification matter so much?",
            options: [
              "It affects the price you charge",
              "Filler chemistry, primer and topcoat all depend on the material being repaired",
              "It only matters for insurance paperwork",
              "It determines the grit of sandpaper",
            ],
            answer: 1,
            why: "Acrylic, enamel, laminate and timber each demand compatible filler and finish systems — the wrong system fails visibly.",
          },
          {
            q: "A fingernail catching in a scratch tells you…",
            options: [
              "It can be polished out",
              "It's only in the finish layer",
              "It has cut through into the substrate and needs filling",
              "The surface is too hot to work on",
            ],
            answer: 2,
            why: "A catch means a groove deep enough to need filler — polishing alone can't remove it.",
          },
        ],
      },
      {
        id: "fillers",
        title: "Mixing & Applying Two-Part Fillers",
        minutes: 18,
        intro:
          "Two-part filler work is the heart of surface repair. The chemistry is simple — resin plus hardener — but the craft is in ratios, working time and application pressure. This lesson is where invisible repairs are won or lost.",
        steps: [
          {
            title: "Measure the ratio, respect the temperature",
            body: "Dispense filler onto a clean palette and add hardener at the manufacturer's ratio — typically a 2–3% ribbon of hardener to a golf-ball of filler. In warm conditions use less; in cold, slightly more. Too much hardener makes the repair brittle and can discolour it; too little and it never fully cures.",
            image: "/assets/img/filler-mix.webp",
            caption: "Working two-part filler on a mixing board — note the small batch size and the spreader kept clean.",
          },
          {
            title: "Mix to a uniform colour",
            body: "Fold and smear the filler with the spreader until the hardener streaks disappear completely — usually 20–30 seconds of thorough mixing. Streaks mean uncured pockets in the finished repair that will sink, stain or crumble when sanded.",
          },
          {
            title: "Apply with pressure, slightly proud",
            body: "Press the first pass hard into the damage to wet the edges and force out air — air voids are the number one cause of pinholes. Then build the filler slightly proud of the surface. Filler shrinks as it cures; a flush application becomes a depression that shows under finish.",
          },
          {
            title: "Work in layers on deep damage",
            body: "Anything deeper than ~3mm should be filled in stages, letting each layer cure before the next. Deep single pours cure unevenly, crack, and trap solvents. Each layer gets keyed with coarse abrasive before the next goes on.",
          },
          {
            title: "Respect the cure window",
            body: "Don't sand early. Filler that gums up the paper isn't cured — give it the full time for the temperature you're working in, or use gentle heat (never a flame) to accelerate. A fully cured filler sands to a fine powder and feathers cleanly.",
          },
        ],
        tools: ["Two-part polyester filler", "Hardener cream", "Mixing palette & spreaders", "P120–P240 abrasives", "Heat gun (gentle acceleration only)"],
        tips: [
          "Mix small batches — working time can be under five minutes on a warm day.",
          "Keep a 'ratio card' with test mixes at different hardener levels so you can compare cure and colour.",
        ],
        quiz: [
          {
            q: "What happens if too much hardener is used?",
            options: [
              "The filler cures better and stronger",
              "The repair becomes brittle and can discolour",
              "Nothing — hardener ratio is flexible",
              "The filler takes longer to cure",
            ],
            answer: 1,
            why: "Excess hardener over-accelerates the reaction, making a brittle, sometimes discoloured repair.",
          },
          {
            q: "Why is filler applied slightly proud of the surface?",
            options: [
              "To make sanding easier on the arms",
              "Filler shrinks as it cures — a proud fill sands back flush",
              "So it can be seen more easily",
              "To use up mixed material",
            ],
            answer: 1,
            why: "Cure shrinkage turns a flush fill into a visible depression; proud filler sands back to a true plane.",
          },
          {
            q: "The main cause of pinholes in a cured repair is…",
            options: [
              "Too much sanding",
              "Air trapped because the first pass wasn't pressed firmly into the damage",
              "Cold weather",
              "Using a palette knife",
            ],
            answer: 1,
            why: "Firm pressure on the first application wets the cavity edges and expels air; skipping this traps voids.",
          },
          {
            q: "How should damage deeper than ~3mm be filled?",
            options: [
              "One deep pour for strength",
              "In staged layers, each cured and keyed before the next",
              "With hard wax only",
              "It can't be repaired",
            ],
            answer: 1,
            why: "Layered fills cure evenly and bond reliably; single deep pours crack and trap solvent.",
          },
        ],
      },
      {
        id: "sanding",
        title: "Sanding & Feather Edging",
        minutes: 15,
        intro:
          "Sanding is shaping, not scrubbing. The goal is a repair whose edges taper to nothing — a feather edge — so the finish has no ridge to catch light or a fingertip. Machine and hand sanding each have their place.",
        steps: [
          {
            title: "Start coarse, stay flat",
            body: "Begin at P120–P180 on a machine sander with an interface pad, keeping the pad flat on the surface at all times. Tilting the sander digs crescents into soft filler. Let the abrasive cut — pressure only generates heat and tears the filler from the repair.",
            image: "/assets/img/spray-practice.webp",
            caption: "Machine sanding technique is drilled on practice boards before trainees touch a real surface.",
          },
          {
            title: "Feather the perimeter",
            body: "The critical zone is the outer 10–15mm where filler meets original surface. Step to P240 and extend your strokes past the repair so the transition tapers gradually. Close your eyes and run a fingertip across it: if you can feel the edge, so will the light.",
          },
          {
            title: "Refine wet for finishing",
            body: "Before any coating, refine with P600–P1200 wet-and-dry used wet, with a drop of detergent as lubricant. Wet sanding kills dust, keeps paper cutting, and leaves the fine, uniform scratch pattern that primers and topcoats need to key to.",
          },
          {
            title: "Degrease and inspect",
            body: "Wipe down with panel wipe or isopropyl alcohol on a lint-free cloth, then inspect under raking light from several angles. Any scratch, ridge or pinhole you can see now will be twice as visible under a gloss topcoat. Fix it at this stage — it's five minutes now or a full redo later.",
            image: "/assets/img/bath-2.webp",
            caption: "Wet-refining a training bath edge — abrasives and PPE laid out within reach.",
          },
        ],
        tools: ["Random orbital sander + interface pad", "Hand sanding block", "Abrasives P120–P1200", "Panel wipe / IPA", "Raking light (hand lamp)"],
        tips: [
          "Change paper the moment cutting slows — clogged paper burnishes instead of cutting and hardens the surface unevenly.",
          "Always sand beyond the repair, never just on it: a feather needs room to taper.",
        ],
        quiz: [
          {
            q: "What is a feather edge?",
            options: [
              "A decorative border on a repair",
              "A gradual taper where filler meets original surface so no ridge can be felt or seen",
              "The edge of a sanding disc",
              "A type of abrasive paper",
            ],
            answer: 1,
            why: "Feathering tapers the repair perimeter to zero, leaving no ridge for light or touch to detect.",
          },
          {
            q: "Why keep the machine sander flat?",
            options: [
              "To reduce noise",
              "Tilting digs crescent marks into soft filler",
              "It uses less abrasive paper",
              "Machines only work flat",
            ],
            answer: 1,
            why: "A tilted pad concentrates pressure on its edge, cutting gouges that must then be re-filled.",
          },
          {
            q: "The final refinement before coating is typically…",
            options: [
              "P80 dry",
              "P240 dry",
              "P600–P1200 wet",
              "Wire wool only",
            ],
            answer: 2,
            why: "Fine wet sanding produces the uniform fine scratch pattern coatings key to, without dust.",
          },
          {
            q: "When should paper be changed?",
            options: [
              "At the end of each job",
              "As soon as cutting speed drops",
              "Every hour",
              "Only when it tears",
            ],
            answer: 1,
            why: "Clogged abrasive burnishes rather than cuts, glazing the surface and ruining adhesion.",
          },
        ],
      },
    ],
  },
  {
    id: "bath-sanitaryware",
    index: "02",
    title: "Bath & Sanitaryware Resurfacing",
    strap: "Enamel · Acrylic · GRP",
    description:
      "Baths, shower trays, sinks and WCs are the highest-value repairs in the trade. Learn the full resurfacing sequence — assessment, structural repair, wet refining, masking and sprayed topcoat — on enamelled cast iron, pressed steel, acrylic and GRP.",
    image: "/assets/img/bath-4.webp",
    surfaces: ["Cast iron enamel", "Pressed steel", "Acrylic", "GRP"],
    lessons: [
      {
        id: "assessment-prep",
        title: "Assessment & Surface Preparation",
        minutes: 15,
        intro:
          "A sprayed bath is only as good as its preparation — 70% of a resurfacing job is prep. Contamination, limescale and silicone are the enemies of adhesion, and every trace must go before repair materials touch the surface.",
        steps: [
          {
            title: "Identify the substrate",
            body: "Cast iron and pressed steel baths are rigid, cold to the touch and ring when tapped; acrylic and GRP flex and sound dull. The substrate decides your filler system and primer. Also check the overflow and tap holes for damage that will need addressing before spraying.",
            image: "/assets/img/bath-1.webp",
            caption: "A training bath with typical edge chips and surface wear, ready for assessment.",
          },
          {
            title: "Strip contamination",
            body: "Remove all silicone sealant mechanically first, then deep-clean: alkaline degreaser for soap scum and body oils, an acidic descaler for limescale, and a final solvent wipe. Any silicone residue left in pores will cause fisheyes in the topcoat — craters where the coating pulls away.",
          },
          {
            title: "Key the whole surface",
            body: "Even areas without damage must be abraded to give the new coating something to grip. Machine sand the full bath with P180–P240, paying attention to the waterline where wear is worst. A glossy, unkeyed patch anywhere is a future delamination.",
          },
          {
            title: "Final clean and mask adjacent fittings",
            body: "Vacuum all dust, then solvent-wipe to a clean-cloth standard. Remove or mask taps, wastes and overflows — anything left in place becomes a masking problem later. The surface is now ready for structural repairs.",
          },
        ],
        tools: ["Degreaser & descaler", "Solvent / panel wipe", "Orbital sander P180–P240", "Silicone removal tools", "Vacuum & tack cloths"],
        tips: [
          "Fisheyes in a finish almost always trace back to silicone — test suspect areas by misting water and watching how it beads.",
          "Work from cleanest to dirtiest: interior first, edges and exterior last.",
        ],
        quiz: [
          {
            q: "What causes 'fisheyes' in a sprayed bath topcoat?",
            options: [
              "Cold weather",
              "Silicone or oil contamination repelling the coating",
              "Sanding too fine",
              "Spraying too fast",
            ],
            answer: 1,
            why: "Silicone residues create low-surface-energy spots the wet coating pulls away from, leaving craters.",
          },
          {
            q: "How do you distinguish acrylic from cast iron by hand?",
            options: [
              "Acrylic is colder",
              "Acrylic flexes and sounds dull; cast iron is rigid, cold and rings",
              "Cast iron is lighter",
              "There's no reliable way",
            ],
            answer: 1,
            why: "Flex, temperature and tap-tone are the classic field tests — and they decide your material system.",
          },
          {
            q: "Why key areas of the bath that have no damage?",
            options: [
              "To make them match the repairs visually",
              "The new coating needs an abraded surface to adhere across the whole bath",
              "It's not necessary",
              "To remove the colour",
            ],
            answer: 1,
            why: "Coatings bond mechanically to a keyed surface; any glossy patch is a future peel point.",
          },
          {
            q: "The first step in decontamination is…",
            options: [
              "Solvent wipe",
              "Mechanically removing silicone sealant",
              "Sanding",
              "Descaling",
            ],
            answer: 1,
            why: "Bulk silicone must come off mechanically first — chemicals alone won't remove it and smear it into pores.",
          },
        ],
      },
      {
        id: "chips-cracks",
        title: "Repairing Chips & Cracks",
        minutes: 20,
        intro:
          "Edge chips on baths and impact stars on shower trays are the bread and butter of sanitaryware repair. Structural filler rebuilds the missing shape; the craft is in recreating the original profile so the repair vanishes under the topcoat.",
        steps: [
          {
            title: "Prepare the damage cavity",
            body: "Grind or sand the chip edges to a shallow V-profile — sharp vertical edges trap air and give thin, weak filler margins. Remove any loose enamel flakes: tap around the damage and listen for the hollow sound of unsound material. Everything that moves must come out.",
            image: "/assets/img/sink-grind.webp",
            caption: "Grinding back damage on a ceramic sink to sound material before filling.",
          },
          {
            title: "Fill and overbuild the profile",
            body: "Apply two-part filler pressed firmly into the cavity, overbuilding slightly so the repair sits proud. On a rolled bath edge, build the filler past the curve in both directions — you'll sand the radius back in, and you need spare material to sculpt.",
          },
          {
            title: "Re-profile edges and curves",
            body: "Sand the cured filler with P120–P180 to bring the profile back: flats flat with a block, curves by rolling the wrist with a foam-backed abrasive. Constantly check against the undamaged profile by eye and by touch. This is the stage that separates invisible repairs from visible lumps.",
            image: "/assets/img/bath-5.webp",
            caption: "Refining a repaired edge profile on a training bath.",
          },
          {
            title: "Stop and block for colour-critical repairs",
            body: "For localised repairs (rather than full respray), apply a stopper/fine surface filler to kill pinholes, block-sand to P400, then spot-prime. The primer coat shows every remaining defect as a dull patch — fix them now, before colour.",
          },
        ],
        tools: ["Two-part filler", "Mini grinder / abrasive burr", "Blocks & foam-backed abrasives", "Fine surface stopper", "Spot primer"],
        tips: [
          "Use the undamaged side of the bath as your template — check symmetry constantly.",
          "Shower tray star cracks need the crack itself opened and filled, not just skimmed over — skimmed cracks reappear.",
        ],
        quiz: [
          {
            q: "Why grind a chip to a shallow V-profile?",
            options: [
              "It looks neater",
              "It gives the filler a strong tapered margin and eliminates trapped air at the edges",
              "To make the chip bigger so it's easier to see",
              "V-profiles cure faster",
            ],
            answer: 1,
            why: "Tapered edges let filler bond across a broad margin; vertical edges trap air and create weak, thin edges.",
          },
          {
            q: "A hollow sound when tapping around damage indicates…",
            options: [
              "The surface is cast iron",
              "Unsound, delaminated material that must be removed",
              "The bath is hollow underneath",
              "The filler is cured",
            ],
            answer: 1,
            why: "Hollow tapping reveals loose flakes and voids — fill over them and the repair fails.",
          },
          {
            q: "When re-profiling a rolled bath edge you should…",
            options: [
              "Fill exactly to the existing edge line",
              "Overbuild then sculpt the curve back, checking against the undamaged profile",
              "Use only a machine sander",
              "Leave it flat for strength",
            ],
            answer: 1,
            why: "Curves are recreated by overbuilding and sculpting back against the original geometry.",
          },
          {
            q: "What does a spot primer coat reveal?",
            options: [
              "The final colour",
              "Remaining defects, shown as dull patches to fix before colour coats",
              "Whether the bath is level",
              "Nothing useful",
            ],
            answer: 1,
            why: "Primer's uniform dull surface makes pinholes and scratches visible — a built-in quality check.",
          },
        ],
      },
      {
        id: "wet-refining",
        title: "Sanding & Wet Refining the Bath",
        minutes: 15,
        intro:
          "Between repair and spray lies the refining stage: bringing the whole bath to a uniform, fine scratch pattern. This is rhythmic, methodical machine work — and it's what makes the sprayed finish flow out like glass.",
        steps: [
          {
            title: "Machine-sand the field",
            body: "Work the main surfaces with the orbital sander in overlapping passes — horizontal then vertical — stepping from P240 to P400. Keep the machine moving and flat; dwelling in one spot dishes the surface. Watch the bath's reflections: a consistent dull sheen means a consistent scratch.",
            video: { src: "/assets/video/bath-sanding.mp4", poster: "/assets/video/bath-sanding-poster.jpg", caption: "Trainer demonstrating controlled orbital sanding technique on a training bath." },
          },
          {
            title: "Hand-work the details",
            body: "Curves, corners, around tap holes and the roll of the rim are hand-sanding territory. Foam-backed abrasive conforms to curves without flattening them. Take your time here — the eye is drawn to edges and corners first in the finished job.",
          },
          {
            title: "Wet refine to finish grade",
            body: "Wet-sand the entire bath with P600–P800 and water with a drop of detergent. Squeegee off and check the sheen is uniform — any glossy island is an unkeyed patch that the topcoat will eventually release from.",
          },
          {
            title: "Decontaminate for spraying",
            body: "Rinse, dry, then two-cloth solvent wipe: one cloth applies and lifts, the second dries. Tack-rag the surface immediately before spraying. From this point, nothing touches the bath except spray — not fingers, not clothing, not dust from the room.",
          },
        ],
        tools: ["Orbital sander", "Foam-backed abrasives", "Wet-and-dry P600–P800", "Squeegee", "Two-cloth solvent system & tack rag"],
        tips: [
          "Work a pattern and count passes — consistency across the whole surface is the goal.",
          "Change wet paper often; it loads faster than dry.",
        ],
        quiz: [
          {
            q: "A glossy island visible after wet refining means…",
            options: [
              "That area is extra clean",
              "An unkeyed patch the topcoat may release from — sand it again",
              "The filler is showing through",
              "Nothing — it's normal",
            ],
            answer: 1,
            why: "Uniform dull sheen = uniform key. Gloss means untouched surface with no mechanical adhesion.",
          },
          {
            q: "Why keep the sander moving?",
            options: [
              "To finish faster",
              "Dwelling dishes the surface and creates low spots",
              "To save the machine's motor",
              "Movement isn't important",
            ],
            answer: 1,
            why: "A stationary sander digs a dish; constant motion keeps the surface plane true.",
          },
          {
            q: "Detail areas (curves, tap holes, rim) are best sanded…",
            options: [
              "With the orbital sander on its edge",
              "By hand with foam-backed abrasive that conforms to curves",
              "Not at all",
              "With a wire brush",
            ],
            answer: 1,
            why: "Foam backing follows curves without flattening profiles — machines can't do this safely.",
          },
          {
            q: "The correct final wipe system before spraying is…",
            options: [
              "One damp cloth",
              "Two-cloth solvent wipe then tack rag — then touch nothing",
              "Compressed air only",
              "Soapy water",
            ],
            answer: 1,
            why: "Wet cloth lifts contaminants, dry cloth removes residue, tack rag lifts final dust — then the surface is sterile.",
          },
        ],
      },
      {
        id: "masking-spray",
        title: "Masking & Spray Application",
        minutes: 25,
        intro:
          "The spray stage transforms a prepared bath back to showroom condition. Technique, distance, overlap and flash-off times all matter — and masking decides whether the room stays clean while you work.",
        steps: [
          {
            title: "Mask the room, not just the bath",
            body: "Overspray travels. Mask walls, floors, taps, waste and overflow with tape and masking film/paper. Establish your extraction and airflow before mixing any product — you need moving air carrying overspray away from the work, and PPE: organic-vapour respirator, gloves, overalls.",
            video: { src: "/assets/video/bath-spray.mp4", poster: "/assets/video/bath-spray-poster.jpg", caption: "Spray application on a masked training bath — steady passes, consistent distance." },
          },
          {
            title: "Gun setup and test pattern",
            body: "Set the gun for a vertical fan, adjust fluid and air to atomise fully, and test on masking paper first. You're looking for an even, fine-edged fan with no spitting or tails. Gun distance stays constant at roughly 15–20cm throughout the job.",
          },
          {
            title: "Application: overlap 50%, keep moving",
            body: "Spray in steady passes overlapping each by half, triggering the gun at the end of each pass rather than mid-surface. Two to three medium coats beat one heavy coat: heavy coats sag on vertical surfaces, especially the bath's inner walls. Respect flash-off time between coats.",
            video: { src: "/assets/video/bath-spray-2.mp4", poster: "/assets/video/bath-spray-2-poster.jpg", caption: "Working the coating into the bath interior with even, overlapping passes." },
          },
          {
            title: "Cure, de-mask and hand over",
            body: "Follow the product's cure schedule before water contact — typically 24–48 hours for light use. De-mask while the coating is still slightly green for the cleanest tape lines. Inspect under strong light, then advise the client on cure time and aftercare: no abrasives, no bath mats with suckers.",
            image: "/assets/img/bath-4.webp",
            caption: "A completed resurfaced bath — uniform gloss, no witness of the original damage.",
          },
        ],
        tools: ["Spray gun & compressor / turbine", "Masking tape & film", "Respirator, gloves, overalls", "Extraction / airflow", "Topcoat system per substrate"],
        tips: [
          "Spray the hard-to-reach areas first (under the rim, behind tap holes), then the show surfaces.",
          "If a run appears, resist touching it — let it cure, flat it back, and re-coat.",
        ],
        quiz: [
          {
            q: "The correct pass overlap when spraying is…",
            options: ["10%", "25%", "50%", "90%"],
            answer: 2,
            why: "Half-overlap builds an even film with no stripes or dry edges between passes.",
          },
          {
            q: "Why several medium coats rather than one heavy coat?",
            options: [
              "It saves product",
              "Heavy coats sag and run on vertical surfaces; medium coats build a level film",
              "One heavy coat never cures",
              "It's faster",
            ],
            answer: 1,
            why: "Film build must be controlled — excess material on a vertical face flows and sags before it cures.",
          },
          {
            q: "When should masking be removed?",
            options: [
              "Immediately, while soaking wet",
              "While the coating is still slightly green, for clean tape lines",
              "After a week",
              "Timing doesn't matter",
            ],
            answer: 1,
            why: "Fully cured coating bridges the tape and chips when pulled; slightly-green removal gives crisp edges.",
          },
          {
            q: "Essential PPE for spraying 2K coatings includes…",
            options: [
              "Just gloves",
              "Organic-vapour respirator, gloves and overalls",
              "Sunglasses",
              "A dust mask",
            ],
            answer: 1,
            why: "2K isocyanate coatings require proper respiratory protection — a dust mask offers none.",
          },
        ],
      },
    ],
  },
  {
    id: "wood-laminate",
    index: "03",
    title: "Wood, Laminate & Veneer Repair",
    strap: "Colour match · Grain · Seal",
    description:
      "Timber repairs live or die on colour and grain. Learn to mix stain systems to an exact match, rebuild chips and scratches, and hand-paint grain lines that fool the eye at arm's length — on solid wood, veneer and laminate alike.",
    image: "/assets/img/wood-board.webp",
    surfaces: ["Solid wood", "Veneer", "Laminate", "Foiled UPVC"],
    lessons: [
      {
        id: "reading-wood",
        title: "Reading Wood: Species, Finish & Damage",
        minutes: 12,
        intro:
          "Before any colour is mixed you must read the surface: what species or print you're dealing with, what the existing finish is, and how the light plays across the grain. Colour matching without this reading is guesswork.",
        steps: [
          {
            title: "Species and construction",
            body: "Solid timber shows continuous grain around edges and end grain at corners; veneer shows a thin decorative layer over a substrate at any damaged edge; laminate is a printed paper layer — the 'grain' repeats if you look along the board. Each behaves differently under stain and heat.",
            image: "/assets/img/wood-board.webp",
            caption: "Building up colour on a solid timber panel, with stained sample chips alongside.",
          },
          {
            title: "Map the colour structure",
            body: "Wood colour is never one colour. Identify the base tone, the grain contrast colour, and any secondary tones (reds in mahogany, greys in weathered oak). Write them down as a mixing plan before touching pigments.",
          },
          {
            title: "Identify the existing finish",
            body: "Lacquer sits on the surface and can be flaked with a blade edge; oil soaks in and leaves a soft sheen; wax smears under thumb pressure and heat. Your repair finish must be compatible — lacquer over wax will never bond.",
          },
          {
            title: "Assess damage in the context of grain",
            body: "A scratch across the grain is ten times more visible than one along it. Plan filler colour to match the lightest tone in the surrounding area — the darker grain lines are painted back in afterwards.",
          },
        ],
        tips: [
          "Wet the surface with white spirit to preview what the area will look like under a gloss finish.",
          "Photograph the surrounding grain pattern at 1:1 scale — you'll use it as reference when painting grain back in.",
        ],
        quiz: [
          {
            q: "How do you identify laminate versus veneer?",
            options: [
              "Laminate is always darker",
              "Laminate's printed grain pattern repeats along the board; veneer is a real thin wood layer",
              "Veneer is plastic",
              "You can't tell",
            ],
            answer: 1,
            why: "Print repeats; nature doesn't. A repeating grain pattern identifies a printed laminate or foil.",
          },
          {
            q: "Filler colour for a wood repair should match…",
            options: [
              "The darkest grain line",
              "The lightest base tone of the surrounding wood",
              "The average colour",
              "Any colour — it gets covered",
            ],
            answer: 1,
            why: "Base tone first — dark grain lines are painted back over the light base, not mixed into the filler.",
          },
          {
            q: "Why must the existing finish be identified?",
            options: [
              "For the invoice description",
              "Repair finishes must be compatible — lacquer over wax fails to bond",
              "It affects sanding speed only",
              "It doesn't matter",
            ],
            answer: 1,
            why: "Coating chemistry compatibility decides adhesion; wax contamination under lacquer guarantees failure.",
          },
          {
            q: "Which scratch orientation is most visible?",
            options: ["Along the grain", "Across the grain", "Diagonal", "All equal"],
            answer: 1,
            why: "The eye follows grain lines; a cross-grain scratch interrupts them and shouts.",
          },
        ],
      },
      {
        id: "colour-matching",
        title: "Colour Matching with Stains & Dyes",
        minutes: 22,
        intro:
          "Colour matching is the signature skill of timber repair. Working from a set of base stains, you learn to build colour in thin, judged layers — and to prove every mix on a sample chip before it goes near the job.",
        steps: [
          {
            title: "Set up a sample board",
            body: "Never mix colour onto the job. Prepare sample chips of matching material and work your mix on them first, drying each test with gentle heat to judge the true final colour — wet stain always looks darker than dry.",
            image: "/assets/img/wood-chips.webp",
            caption: "Sample chips in graduated tones — every mix is proven on a chip before use.",
          },
          {
            title: "Build colour in layers, not in the mix",
            body: "Start lighter than the target and build depth with successive thin applications, wiping and judging between each. You can always add colour; removing it means starting over. Alternate tones (a red pass, then a brown pass) to reproduce the complexity of real wood colour.",
            image: "/assets/img/wood-staining.webp",
            caption: "Applying colour to a repair area, building depth in controlled passes.",
          },
          {
            title: "Judge colour in the right light",
            body: "Check matches in daylight or a high-CRI lamp at the angle the surface will actually be viewed. A match that's perfect under bench fluorescents can fail beside a window. Check from standing height and from a metre back — nobody inspects a floor at 10cm.",
          },
          {
            title: "Record your recipes",
            body: "Note every successful mix as parts and drops on a recipe card. Wood colours recur — the oak you matched today is next month's job, and a recorded recipe turns an hour of matching into five minutes.",
            image: "/assets/img/wood-stains.webp",
            caption: "The stain library and graduated test board used in training.",
          },
        ],
        tools: ["Spirit/water stain set", "Sample chips", "Fine brushes & lint-free cloths", "Heat gun (gentle drying)", "Recipe cards"],
        tips: [
          "Two colours mixed is a blend; three colours is a match; four is usually mud — keep mixes simple.",
          "The repair area's final colour includes the topcoat sheen: judge colour under a test coat of finish.",
        ],
        quiz: [
          {
            q: "Why test every colour mix on a sample chip first?",
            options: [
              "To use up old stain",
              "Wet colour differs from dry, and mistakes on the job surface are hard to reverse",
              "Chips absorb better",
              "It's just a training habit",
            ],
            answer: 1,
            why: "Colour shifts as it dries; proving on a chip prevents irreversible mistakes on the client's surface.",
          },
          {
            q: "The correct colour-building strategy is…",
            options: [
              "Mix the exact colour in one go",
              "Start lighter than target and build depth in thin layers",
              "Start darker and lighten with white",
              "Apply one thick coat",
            ],
            answer: 1,
            why: "Colour is additive in practice — thin judged layers approach the match without overshooting.",
          },
          {
            q: "Colour matches should be judged…",
            options: [
              "Under bench lighting only",
              "In daylight or high-CRI light, at realistic viewing distance and angle",
              "In dim light",
              "Through a phone camera",
            ],
            answer: 1,
            why: "Metamerism makes matches fail under different light sources; judge where the surface actually lives.",
          },
          {
            q: "Why record colour recipes?",
            options: [
              "For tax records",
              "Wood colours recur — recorded recipes save hours on future jobs",
              "To prove training attendance",
              "Recipes aren't useful",
            ],
            answer: 1,
            why: "A library of proven mixes compounds in value across your career.",
          },
        ],
      },
      {
        id: "grain-replication",
        title: "Grain Replication & Touch-In",
        minutes: 18,
        intro:
          "A perfectly coloured patch with no grain is still a visible patch. Painting grain lines back by hand — with fine brushes, graining pens and steady judgement — is what makes a timber repair disappear.",
        steps: [
          {
            title: "Study before you paint",
            body: "Grain has rhythm: lines converge, diverge, feather out and cross. Study the undamaged grain on both sides of the repair and plan where each painted line will run — they must continue the flow, not just fill the space with stripes.",
          },
          {
            title: "Tools of the trade",
            body: "Fine liner brushes carry thinned stain for soft grain lines; graining pens and markers give crisp dark lines; a nearly-dry brush dragged through wet stain feathers a line into softness. Practise all three on sample boards until lines start and stop cleanly.",
            image: "/assets/img/wood-samples.webp",
            caption: "Colour and grain practice on graduated sample chips.",
          },
          {
            title: "Paint in hierarchy",
            body: "Strong primary grain lines first, following the surrounding direction; then finer secondary lines; then soften with a dry-brush blend at the patch edges so painted grain dissolves into real grain. Step back every few lines — grain is judged at distance.",
          },
          {
            title: "Break up perfection",
            body: "Real grain is irregular: vary line weight, spacing and darkness. A tiny stipple of contrast colour or a flicked fleck of dark pigment kills the 'printed' look. The goal is organised randomness that matches the character of the surrounding timber.",
          },
        ],
        tools: ["Liner brushes 00–2", "Graining pens/markers", "Thinned stain palette", "Dry blending brush", "Sample boards"],
        tips: [
          "Anchor your hand on a bridge stick or mahl stick for steady lines over the wet repair.",
          "Less grain is more: suggest the pattern rather than painting every line.",
        ],
        quiz: [
          {
            q: "Painted grain lines must…",
            options: [
              "Be perfectly parallel",
              "Continue the flow and rhythm of the surrounding real grain",
              "All be the same darkness",
              "Run across the repair only",
            ],
            answer: 1,
            why: "The eye detects discontinuity instantly — painted grain must join the existing pattern convincingly.",
          },
          {
            q: "The correct painting order is…",
            options: [
              "Fine lines first, bold lines last",
              "Primary strong lines, then secondary fine lines, then edge blending",
              "Blend first, then lines",
              "Order doesn't matter",
            ],
            answer: 1,
            why: "Establish the structure first, refine second, blend last — the same hierarchy as real wood.",
          },
          {
            q: "Why 'break up perfection' with irregular marks?",
            options: [
              "To save time",
              "Perfectly even grain looks printed; natural grain is irregular",
              "To hide mistakes",
              "Clients prefer it",
            ],
            answer: 1,
            why: "Organised randomness matches nature; uniform stripes read as fake at any distance.",
          },
          {
            q: "Grain work is best judged…",
            options: [
              "At 5cm with a magnifier",
              "Stepping back to realistic viewing distance every few lines",
              "Only after the topcoat",
              "Under UV light",
            ],
            answer: 1,
            why: "Repairs are viewed from standing distance — judge where the viewer stands, not where you work.",
          },
        ],
      },
      {
        id: "sealing-finishing",
        title: "Sealing, Sheen & Final Finish",
        minutes: 15,
        intro:
          "The finish locks in your colour and grain work — and its sheen must match the surrounding surface exactly. A perfect repair under the wrong sheen is a perfect visible patch.",
        steps: [
          {
            title: "Choose a compatible finish",
            body: "Match the system to the existing surface: acrylic lacquers for modern lacquered work, hard wax oils for oiled timber, melamine or 2K for high-wear worktops. Test compatibility on an inconspicuous area or sample first.",
          },
          {
            title: "Seal the repair first",
            body: "Stain and grain work must be sealed before building finish coats, or later coats will redissolve and smear them. A light sealing coat, flashed off, protects your colour work underneath.",
          },
          {
            title: "Match the sheen, not just the colour",
            body: "Sheen is measured from matt through satin to gloss, and it's judged by reflection sharpness. Compare the repair's reflection against the surroundings at a low angle: the boundary should be undetectable. Adjust with flattening agents or by flatting and re-coating.",
          },
          {
            title: "Blend out and final check",
            body: "Feather the final coat beyond the repair so film thickness tapers to nothing. Final inspection under raking light from the client's typical viewpoint — then clean the area and present the before/after.",
          },
        ],
        tools: ["Compatible lacquer/oil system", "Flattening agent", "Fine abrasives P800–P1200", "Tack cloths", "Raking light"],
        tips: [
          "When in doubt on sheen, err slightly matt — a satin-to-matt mismatch is far less visible than gloss-to-matt.",
          "Dust is the enemy of the final coat: tack the surface and still the air before spraying or wiping on finish.",
        ],
        quiz: [
          {
            q: "Why seal colour and grain work before finish coats?",
            options: [
              "To add colour depth",
              "Later coats can redissolve and smear unsealed stain and grain work",
              "Sealing isn't needed",
              "To make sanding easier",
            ],
            answer: 1,
            why: "A sealing coat isolates the decorative work from the solvents in subsequent coats.",
          },
          {
            q: "Sheen is best compared by…",
            options: [
              "Touching the surface",
              "Comparing reflection sharpness at a low viewing angle",
              "Reading the tin label",
              "Weighing the film",
            ],
            answer: 1,
            why: "Reflection comparison at grazing angles is the practical field test for sheen match.",
          },
          {
            q: "The final coat should be…",
            options: [
              "Confined exactly to the repair area",
              "Feathered beyond the repair so film thickness tapers away",
              "As thick as possible",
              "Applied in direct sun",
            ],
            answer: 1,
            why: "A tapered film edge removes the detectable step between coated and original surface.",
          },
          {
            q: "If unsure of the surrounding sheen, choose…",
            options: [
              "Full gloss",
              "Slightly matt-er than you think — it's the least visible mismatch",
              "Hammered finish",
              "Whatever is cheapest",
            ],
            answer: 1,
            why: "Low-sheen mismatches scatter light softly and hide; gloss mismatches flash.",
          },
        ],
      },
    ],
  },
  {
    id: "brick-stone",
    index: "04",
    title: "Brick, Stone & Worktop Repair",
    strap: "Tint · Texture · Blend",
    description:
      "Masonry and stone repair is colour chemistry plus sculpture: matching iron-oxide tones in brick, rebuilding stone edges, and making marble and granite chips vanish. Covers facades, tiles, and premium worktops including Corian.",
    image: "/assets/img/brick-panels.webp",
    surfaces: ["Brick", "Portland stone", "Marble", "Granite", "Corian"],
    lessons: [
      {
        id: "masonry-assessment",
        title: "Assessing Brick & Stone Damage",
        minutes: 12,
        intro:
          "Masonry damage ranges from impact chips and spalls to drilled holes left by removed fixtures. Assessment is about material identification, moisture state and choosing between repair and replacement.",
        steps: [
          {
            title: "Identify the masonry type",
            body: "Facing bricks carry a colour through their body or only in a fired surface skin — chip one and you learn which. Engineering bricks are dense and dark; stone varies from soft sandstone to hard granite. Body-coloured material hides damage; skin-coloured material shows a pale core under every chip.",
            image: "/assets/img/brick-stone.webp",
            caption: "Training panels in brick and stone tones, showing repaired and untouched faces.",
          },
          {
            title: "Check moisture and stability",
            body: "Repair materials won't bond to wet, frozen or actively crumbling substrate. Spalling faces that crumble under thumb pressure must be cut back to solid material. If damage is from ongoing movement or water ingress, fix the cause first or the repair is temporary.",
          },
          {
            title: "Repair or replace?",
            body: "A single chipped brick in a wall is a repair; a brick shattered through its body is a replacement (and replacement is often faster and cheaper). Stone is almost always repaired — matching stone is scarce and expensive, which is why skilled stone repair commands premium rates.",
          },
          {
            title: "Match the texture as well as the colour",
            body: "Brick faces carry texture: wirecut drag marks, sand-faced grain, smooth pressed. Photograph the texture up close — your repair must reproduce both colour and surface character to blend at viewing distance.",
          },
        ],
        tips: [
          "Look at the wall from the street, not the scaffold: viewing distance decides how perfect the match must be.",
          "Weathered faces are lighter and dirtier than fresh material — match the weathered face, not the quarry colour.",
        ],
        quiz: [
          {
            q: "A brick with colour only in its fired skin shows what when chipped?",
            options: [
              "Identical colour throughout",
              "A pale, different-coloured core that must be retinted",
              "Metal reinforcement",
              "Nothing different",
            ],
            answer: 1,
            why: "Skin-coloured bricks expose their pale body at every chip — the repair must rebuild colour, not just shape.",
          },
          {
            q: "Before repairing, the substrate must be…",
            options: [
              "Wet, frozen or crumbly",
              "Dry, sound and stable — cut back crumbling material first",
              "Painted",
              "Warm to the touch",
            ],
            answer: 1,
            why: "Repair mortars bond only to sound, dry masonry; anything less and the repair pops out.",
          },
          {
            q: "When is brick replacement preferred over repair?",
            options: [
              "Always",
              "When the brick is shattered through its body — replacement is faster and cheaper",
              "Never",
              "Only on weekends",
            ],
            answer: 1,
            why: "Judgement between repair and replacement is commercial as well as technical.",
          },
          {
            q: "A convincing masonry repair must match…",
            options: [
              "Colour only",
              "Colour and surface texture",
              "Texture only",
              "The mortar only",
            ],
            answer: 1,
            why: "The eye reads texture as strongly as colour at normal viewing distances.",
          },
        ],
      },
      {
        id: "mortar-colour",
        title: "Mixing Repair Mortars & Colour Matching",
        minutes: 20,
        intro:
          "Stone and brick repair compounds are tinted to match before they go anywhere near the wall. Working with oxide pigments and small test mixes, you'll build a colour library brick by brick.",
        steps: [
          {
            title: "Set up the tinting station",
            body: "Lay out your repair compound, oxide pigments, mixing cups and the damaged panel. Small batches and clean tools: pigment contamination between mixes ruins matches. Weigh or count parts — masonry colour is a recipe, not a vibe.",
            image: "/assets/img/brick-mix.webp",
            caption: "Mixing tinted repair compound on training brick panels.",
          },
          {
            title: "Build the base tone",
            body: "Start from the compound's natural tone and add oxides in tiny increments: red and yellow oxides for warm brick tones, black for depth and greying, umber for earthy browns. Mix thoroughly — streaks of unmixed pigment show as veins in the cured repair.",
          },
          {
            title: "Test, cure, compare",
            body: "Apply a small test patch on the panel and force-cure gently with the heat gun. Cured colour is the truth — wet mix always reads darker. Compare against multiple bricks: real walls vary, so match the specific bricks surrounding your repair.",
            image: "/assets/img/brick-tinting.webp",
            caption: "Tint pots and test patches across brick and stone training panels.",
          },
          {
            title: "Plan multi-tone effects",
            body: "Bricks aren't one colour: they carry flash marks, sooty patches and face variation. Plan a base colour fill, then secondary tones dabbed or stippled after cure to reproduce the variation — the same layering logic as wood colour work.",
          },
        ],
        tools: ["Stone/brick repair compound", "Oxide pigment set", "Mixing cups & spatulas", "Heat gun", "Test panels"],
        tips: [
          "Make a 'tone ladder' of test patches from light to dark — it brackets the target and speeds up matching.",
          "Mortar joints are part of the picture: carry a separate match for joint colour.",
        ],
        quiz: [
          {
            q: "Masonry test patches must be judged…",
            options: [
              "While wet",
              "After curing — wet mix always reads darker",
              "Under red light",
              "They don't need judging",
            ],
            answer: 1,
            why: "Cure shifts colour significantly; only the cured test tells the truth.",
          },
          {
            q: "Which pigments warm up a brick tone?",
            options: [
              "Black and blue",
              "Red and yellow oxides",
              "White only",
              "Green",
            ],
            answer: 1,
            why: "Red and yellow oxides build the classic warm brick palette; black and umber add depth.",
          },
          {
            q: "Why match against multiple surrounding bricks?",
            options: [
              "Bricks are identical",
              "Real walls vary — match the specific bricks around the repair",
              "It's a tradition",
              "To use more material",
            ],
            answer: 1,
            why: "Walls are a population of tones; the repair must sit inside its local neighbourhood.",
          },
          {
            q: "Multi-tone brick faces are reproduced by…",
            options: [
              "Mixing all tones into one batch",
              "Base colour fill, then secondary tones stippled or dabbed after cure",
              "Painting with emulsion",
              "Ignoring variation",
            ],
            answer: 1,
            why: "Layered secondary tones over a cured base recreate natural face variation.",
          },
        ],
      },
      {
        id: "application-texture",
        title: "Application, Texturing & Tooling",
        minutes: 18,
        intro:
          "Applying and texturing masonry repair is sculptural work: pressing material into the damage, rebuilding arrises and profiles, then giving the surface the same face texture as its neighbours.",
        steps: [
          {
            title: "Prime and press in",
            body: "Dampen porous masonry (not wet — damp) or apply bonding primer per the compound's instructions. Press the first application firmly into the cavity to wet every surface, then build proud of the face for shaping.",
          },
          {
            title: "Shape the profile",
            body: "Re-form edges and arrises with small tools while the compound is green. Work against a straight edge or the undamaged profile. For corner rebuilds, form one face, let it firm up, then form the adjacent face against it.",
            image: "/assets/img/brick-brush.webp",
            caption: "Working tinted compound into training brick panels, face by face.",
          },
          {
            title: "Reproduce the face texture",
            body: "While the surface is still workable, apply texture: a stiff brush for sand-faced grain, a dragged blade for wirecut marks, stippling for weathered stone. Compare against the texture photograph you took at assessment — this is where repairs become invisible.",
            image: "/assets/img/brick-close.webp",
            caption: "Face texture reproduced across repaired and original brick.",
          },
          {
            title: "Cure care and final blending",
            body: "Protect from rain, frost and rapid drying per product guidance. Once cured, final blending uses light stippled tints to kill any remaining tonal difference, and the surrounding mortar joints get checked — a perfect brick with bright fresh smears on the joints still looks repaired.",
          },
        ],
        tools: ["Small pointing & sculpting tools", "Stiff texture brushes", "Straight edges", "Bonding primer", "Stipple tints"],
        tips: [
          "Texture while green, tint when cured — never the other way round.",
          "Feather tints beyond the repair boundary so the eye finds no edge.",
        ],
        quiz: [
          {
            q: "Porous masonry should be… before applying compound.",
            options: [
              "Soaked dripping wet",
              "Dampened or primed per the product system",
              "Heated",
              "Sealed with gloss paint",
            ],
            answer: 1,
            why: "Dampening prevents the substrate sucking moisture from the mix too fast, which weakens the cure.",
          },
          {
            q: "Face texture is applied…",
            options: [
              "After full cure",
              "While the compound is still green and workable",
              "Before mixing",
              "Never",
            ],
            answer: 1,
            why: "Texture is tooled into workable material; cured surfaces only take colour, not texture.",
          },
          {
            q: "Wirecut drag marks are reproduced with…",
            options: [
              "A stiff brush",
              "A dragged blade",
              "A sponge",
              "Sandpaper after cure",
            ],
            answer: 1,
            why: "Matching the original manufacturing texture means using a matching tooling action.",
          },
          {
            q: "Final blending concentrates on…",
            options: [
              "The repair only",
              "Stippled tints feathered beyond the repair, plus tidy mortar joints",
              "Painting the whole wall",
              "Nothing",
            ],
            answer: 1,
            why: "Edges give repairs away — feather tint transitions and respect the joints.",
          },
        ],
      },
      {
        id: "worktops",
        title: "Marble, Granite & Corian Worktop Repair",
        minutes: 20,
        intro:
          "Premium worktops carry premium expectations. Stone and solid-surface repairs combine structural filling with veining, speckle and depth effects — and a polish that matches factory finishes.",
        steps: [
          {
            title: "Know your surface",
            body: "Natural marble and granite are crystalline and polished; quartz composites are resin-bound; Corian and solid surface are homogeneous acrylic — the same material all the way through, which makes it the most forgiving to repair. Each takes a different filler and finishing route.",
            image: "/assets/img/marble-tiles.webp",
            caption: "Marble training tiles — veined stone patterns to assess and match.",
          },
          {
            title: "Chip repair on stone and quartz",
            body: "Clean the chip with solvent, then fill with colour-matched UV-stable resin or epoxy, overfilled slightly. Transparent resins can be tinted to reproduce stone depth; opaque systems are matched with pigments. Cure fully — UV resin with a lamp, epoxy by time.",
          },
          {
            title: "Veining and speckle",
            body: "Marble repairs need veins painted through the fill with fine brushes and thinned pigment — follow the direction of existing veining. Quartz speckle is reproduced by dabbing contrasting tones with a stiff brush tip. Build effects in the upper layer of the fill so they sit at the right visual depth.",
          },
          {
            title: "Flatten and polish to match",
            body: "Wet-sand the cured repair through P400→P1200→P3000, then polish: compound and a felt pad for stone and quartz, or the manufacturer's matte/satin protocol for Corian. Judge the reflection — the repair should carry the same reflected image sharpness as the surrounding top.",
          },
        ],
        tools: ["UV/epoxy repair resin", "Tints & veining brushes", "Wet abrasives to P3000", "Polishing compound & felt pads", "UV lamp"],
        tips: [
          "Corian repairs can be near-perfect because the material is homogeneous — sand and blend generously into the surroundings.",
          "On gloss stone, the final polish is the repair: budget half your time for it.",
        ],
        quiz: [
          {
            q: "Corian is forgiving to repair because…",
            options: [
              "It's soft",
              "It's homogeneous — the same material all the way through",
              "It's cheap",
              "It can't be scratched",
            ],
            answer: 1,
            why: "Homogeneous solid surface lets you sand and blend without breaking through a surface layer.",
          },
          {
            q: "Marble veining in a repair is painted…",
            options: [
              "On top of the final polish",
              "Into the upper layer of the fill, following existing vein direction",
              "Randomly",
              "With a marker pen only",
            ],
            answer: 1,
            why: "Veins must sit at visual depth within the fill and continue the stone's natural pattern.",
          },
          {
            q: "The correct finishing sequence for a stone chip repair is…",
            options: [
              "Polish, then sand",
              "Wet-sand P400→P1200→P3000, then compound polish",
              "P80 dry then wax",
              "No finishing needed",
            ],
            answer: 1,
            why: "Progressive fine wet sanding then compound rebuilds the factory polish.",
          },
          {
            q: "Polish match is judged by…",
            options: [
              "Colour only",
              "Reflected image sharpness matching the surrounding surface",
              "Smoothness to the tongue",
              "Weight",
            ],
            answer: 1,
            why: "Reflection sharpness is the objective test of a polish match.",
          },
        ],
      },
    ],
  },
];

export const PRICING = {
  currency: "£",
  fullCourse: 295,
  vatNote: "All prices exclude VAT. Instalment plans available via Klarna™.",
  includes: [
    "All 4 modules · 16 video & photo-led lessons",
    "Interactive quizzes with instant feedback",
    "Progress tracking & completion record",
    "12 months access",
    "Priority booking discount on hands-on courses",
  ],
};

export const LINKS = {
  training: "https://citysurfacetraining.com/",
  certify: "#/",
  phone: "07500 617 257",
  email: "info@citysurfacetraining.com",
  // Stripe Payment Link for academy enrolment (£295).
  // Create it in your Stripe dashboard (Payments → Payment Links) and paste the URL here.
  stripeEnrol: "https://book.stripe.com/bJe3cvggHgwGg0Wc5bdEs01",
};

export const STRIPE_NOTE =
  "Secure online checkout by Stripe. Your access code is emailed to you after payment.";

export function allLessons(m: Module) {
  return m.lessons;
}
export function moduleLessonCount() {
  return MODULES.reduce((n, m) => n + m.lessons.length, 0);
}
