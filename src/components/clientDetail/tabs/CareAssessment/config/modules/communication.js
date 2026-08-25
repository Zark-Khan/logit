// Group 5 — Communication & Sensory
// Sources: Communication & Sensory Assessment §1-§6; Batch 2 §13, §14;
//          Batch 3 §5, §6, §7
//
// Communication appears in three places (Batch 2 §13, Batch 3 §5 and the
// standalone Communication document) and hearing / vision in three more.
// Merged here so each question is asked once.

export const COMMUNICATION_MODULES = [
  {
    id: "communication-profile",
    sources: ["Communication & Sensory §1", "Batch 2 §13", "Batch 3 §5"],
    title: "Communication Profile",
    intro:
      "Consolidates preferred communication, expression, contact method and what matters to the person, so the same information is not entered repeatedly.",
    gateway: {
      id: "hasCommunicationNeed",
      label: "Does {name} have any communication, speech, language or understanding need that requires staff adjustment?",
      type: "single",
      options: ["Yes", "No", "Unsure"],
      mandatory: true,
      skipOn: ["No"],
      note: "If Unsure, create an information-gathering action. Communication needs may arise with or without a formal diagnosis.",
    },
    questions: [
      {
        id: "primaryMethods",
        label: "What are the primary ways {name} communicates?",
        type: "multi",
        mandatory: true,
        options: ["Spoken language", "Facial expression", "Gesture / body language", "Writing / reading", "BSL", "Makaton", "PECS / pictures", "Communication board", "Electronic device", "Eye gaze", "Vocalisation / sounds", "Behaviour", "Objects of reference", "Other"],
      },
      {
        id: "overallAbility",
        label: "How would you describe {name}'s overall ability to communicate day-to-day needs?",
        type: "single",
        options: ["Independent", "Independent with extra time", "Needs prompting", "Needs communication support", "Unable to communicate reliably"],
      },
      {
        id: "affectingFactors",
        label: "What affects {name}'s ability to communicate?",
        type: "multi",
        options: ["Aphasia", "Dysarthria", "Learning disability", "Autism", "Hearing loss", "Visual impairment", "Dementia", "Fatigue", "Anxiety", "Pain", "English as an additional language", "Other"],
      },
      {
        id: "aidsAndPlans",
        label: "What communication aids or professional plans are used?",
        type: "multi",
        options: ["Communication passport", "SALT plan", "AAC device", "Picture book", "Easy Read", "Interpreter", "Hearing aid", "Writing board", "Other", "None"],
      },
      { id: "preferredApproach", label: "How does {name} prefer staff to communicate with them, what helps communication, and what should staff avoid?", type: "textarea", mandatory: true },
      { id: "goodCommunication", label: "In {name}'s own words, what does “good communication” mean to them?", type: "textarea" },
      { id: "offerChoices", label: "How should staff offer choices and check understanding?", type: "textarea", mandatory: true },
      { id: "indicatesYesNo", label: "How does {name} indicate yes, no, refusal, pain, distress, fear or need for help?", type: "textarea", mandatory: true },
      { id: "canSummonHelp", label: "Can {name} reliably summon help or use a phone / call system?", type: "single", options: ["Yes", "With support", "Limited", "No", "Unsure"] },
      { id: "suddenChange", label: "What should staff do if communication suddenly changes?", type: "textarea", mandatory: true },
    ],
    riskDomains: [
      "Unmet communication need",
      "Misunderstood consent / refusal",
      "Pain / distress not recognised",
      "Emergency communication failure",
      "Communication aid unavailable",
    ],
    careWorkerInstructions: [
      { id: "preferredMethod", label: "PREFERRED COMMUNICATION METHOD", mandatory: true },
      { id: "checkUnderstanding", label: "HOW TO OFFER CHOICES / CHECK UNDERSTANDING", mandatory: true },
      { id: "yesNoRefusal", label: "HOW {name} INDICATES YES / NO / REFUSAL", mandatory: true },
      { id: "painDistress", label: "PAIN / DISTRESS COMMUNICATION", mandatory: true },
      { id: "aidInstructions", label: "COMMUNICATION AID / EQUIPMENT INSTRUCTIONS" },
    ],
    ecm: [
      { id: "methodUsed", label: "Was {name}'s preferred communication method available and used?", options: ["Yes", "Partly", "No", "N/A"], action: "Partly / No -> exception + review" },
      { id: "ableToCommunicate", label: "Was {name} able to communicate needs / refusal during the visit?", options: ["Yes", "With support", "No", "N/A"], action: "No -> record support + escalate if safety affected" },
      { id: "newChange", label: "Any new communication change?", options: ["No", "Yes"], action: "Yes -> urgent review where sudden / acute" },
    ],
  },

  {
    id: "communication-understanding",
    sources: ["Communication & Sensory §3"],
    title: "Understanding, Expression and Decision Communication",
    intro:
      "One matrix covers comprehension, expression, pain, consent, refusal, choices and safeguarding communication without repeating separate questions.",
    questions: [
      {
        id: "communicationTasks",
        label:
          "For each communication task below, how independently can {name} understand or communicate, and what support or staff action is required?",
        type: "matrix",
        columns: ["Independent", "Prompting", "Support / aid", "Unable"],
        textColumn: "How {name} communicates / staff action",
        rows: [
          "Everyday conversation", "Simple instructions", "Complex information",
          "Care choices and preferences", "Consent / refusal", "Pain / discomfort",
          "Feeling unwell / distress", "Medication information / side effects",
          "Eating / drinking / swallowing concerns", "Safeguarding concern",
          "Emergency need / location",
        ],
      },
      {
        id: "fluctuates",
        label: "Does {name}'s understanding or expression fluctuate?",
        type: "multi",
        options: ["No", "Yes - fatigue", "Yes - anxiety / distress", "Yes - pain / illness", "Yes - time of day", "Yes - unfamiliar people / places", "Other"],
      },
      {
        id: "baselinePresentation",
        label: "When {name}'s ability fluctuates, what is their usual baseline presentation and what should staff do when their communication changes?",
        type: "textarea",
      },
    ],
    callout:
      "Does any communication difficulty create a concern about a specific decision? If yes, a separate decision-specific Mental Capacity Assessment may be required. Communication difficulty alone must not be treated as evidence of lacking capacity.",
  },

  {
    id: "communication-aids",
    sources: ["Communication & Sensory §5"],
    title: "Communication Aids and Passport",
    questions: [
      {
        id: "aids",
        label: "What communication or sensory aids does {name} use, where are they kept, and what support is required?",
        type: "table",
        addLabel: "Add another aid",
        columns: [
          { id: "aid", label: "Aid / support", type: "text" },
          { id: "location", label: "Where kept / accessed", type: "text" },
          { id: "requiredAtVisits", label: "Required at visits?", type: "single", options: ["Yes", "No"] },
          { id: "competencyRequired", label: "Staff competency required?", type: "single", options: ["Yes", "No"] },
          { id: "maintenance", label: "Maintenance / backup", type: "text" },
        ],
      },
      {
        id: "communicationPassport",
        label: "What is the current status of {name}'s Communication Passport?",
        type: "single",
        options: ["Not required", "Required - create / update", "Already available and current", "Already available - review required"],
      },
      {
        id: "hospitalPassport",
        label: "What is the current status of {name}'s Hospital Passport?",
        type: "single",
        options: ["Not required", "Required - create / update", "Already available and current", "Already available - review required"],
      },
      {
        id: "passportSummary",
        label: "What should {name}'s Communication Passport summary say about how they communicate, say YES / NO, show pain or distress, make choices, use aids, and what staff must know?",
        type: "textarea",
      },
    ],
  },
];
