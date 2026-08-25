// The 10 stepper groups for the Care Assessment tab.
//
// The 9 source documents contain 109 modules, but ~20 topics are duplicated
// across Batches 2/3/4 (and again in the three standalone documents). Batch 6's
// own coverage review instructs: "Where a previous batch already stores the same
// data, link to that single source of truth instead of duplicating it."
//
// So modules are merged to one per topic, and each question appears exactly
// once, placed in the group where it fits best. `sources` records every place a
// merged module draws from, so any question can be traced back to its document.

export const GROUPS = [
  {
    id: "referral-admin",
    step: 1,
    title: "Referral & Admin",
    description: "Why support is being provided and the information needed to start safely.",
    modules: ["reason-for-referral", "administrative-setup", "personal-identity"],
  },
  {
    id: "clinical",
    step: 2,
    title: "Clinical & Medical",
    description: "Health conditions, medication and the clinical risks staff must monitor.",
    modules: [
      "medical-conditions", "condition-specific", "medication-support", "dysphagia",
      "nutrition-hydration", "skin-integrity", "seizures-epilepsy", "diabetes",
      "respiratory-oxygen", "pain-management", "infection-prevention", "end-of-life",
    ],
  },
  {
    id: "daily-living",
    step: 3,
    title: "Daily Living & Personal Care",
    description: "Everyday activities, personal care, continence and night-time support.",
    modules: [
      "everyday-activities", "personal-care", "oral-health", "continence",
      "continence-devices", "sleep-night", "intimate-health",
    ],
  },
  {
    id: "mobility",
    step: 4,
    title: "Mobility & Handling",
    description: "Moving safely, falls prevention and the equipment involved.",
    modules: ["mobility-falls", "moving-handling", "equipment-telecare", "bariatric-support"],
  },
  {
    id: "communication",
    step: 5,
    title: "Communication & Sensory",
    description: "How the person communicates, their sensory needs and accessible information.",
    modules: [
      "communication-profile", "speech-hearing-vision", "communication-understanding",
      "accessible-information", "communication-aids", "emergency-communication",
    ],
  },
  {
    id: "cognition",
    step: 6,
    title: "Cognition & Mental Health",
    description: "Cognition, neurodivergence, mental health and behaviours of distress.",
    modules: [
      "dementia-cognition", "learning-disability", "autism", "adhd",
      "mental-health", "behaviours-of-distress",
    ],
  },
  {
    id: "safety",
    step: 7,
    title: "Safety & Environment",
    description: "Safeguarding, the home environment and emergency planning.",
    modules: [
      "safeguarding", "self-neglect-hoarding", "home-environment", "fire-safety",
      "coshh", "pets-animals", "emergency-contingency", "substance-use",
    ],
  },
  {
    id: "consent-legal",
    step: 8,
    title: "Consent & Legal",
    description: "Consent, decision-specific capacity, legal authority and restrictions.",
    modules: [
      "consent-to-care", "mental-capacity", "best-interests", "legal-authority",
      "restrictions-dol", "financial-support",
    ],
  },
  {
    id: "person-centred",
    step: 9,
    title: "Person-Centred",
    description: "What matters to the person, their preferences, relationships and outcomes.",
    modules: [
      "what-matters", "routines-culture-identity", "privacy-dignity", "staff-matching",
      "reasonable-adjustments", "relationships-sexuality", "social-inclusion",
      "family-informal-carers", "employment-occupation", "reablement-outcomes",
    ],
  },
  {
    id: "specialist",
    step: 10,
    title: "Specialist Pathways",
    description: "Condition-specific pathways, each gated so only the relevant ones open.",
    modules: [
      "peg-enteral-feeding", "wound-care", "allergy-anaphylaxis", "anticoagulation",
      "renal-dialysis", "parkinsons", "stroke-abi", "multiple-sclerosis",
      "motor-neurone-disease",
    ],
  },
];

export const ALL_MODULE_IDS = GROUPS.flatMap((g) => g.modules);
export const getGroup = (id) => GROUPS.find((g) => g.id === id);
export const groupForModule = (moduleId) =>
  GROUPS.find((g) => g.modules.includes(moduleId));
