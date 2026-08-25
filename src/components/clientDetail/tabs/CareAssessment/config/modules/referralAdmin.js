// Group 1 — Referral & Admin
// Sources: Batch 6 §1, Batch 1 §12, Batch 6 §2

export const REFERRAL_ADMIN_MODULES = [
  {
    id: "reason-for-referral",
    sources: ["Batch 6 §1"],
    title: "Reason for Referral and Presenting Needs",
    gateway: {
      id: "referralEstablished",
      label:
        "Has the reason for referral, presenting need and required urgency been fully established for {name}?",
      type: "single",
      options: ["Yes", "No", "Partly", "Unsure"],
      mandatory: true,
      note: "This section is NOT skippable at care-start. No / Partly / Unsure creates outstanding-information actions and prevents final care-package activation where missing information affects safe delivery.",
    },
    questions: [
      {
        id: "primaryReason",
        label: "What is the primary reason for referral?",
        type: "multi",
        mandatory: true,
        options: ["Personal care", "Medication", "Mobility", "Reablement", "Hospital discharge", "End-of-life", "Dementia", "Learning disability", "Mental health", "Complex clinical support", "Carer breakdown", "Safeguarding", "Social isolation", "Other"],
      },
      {
        id: "referrer",
        label: "Who made the referral?",
        type: "single",
        mandatory: true,
        options: ["Local authority", "NHS discharge team", "GP", "Community nurse", "Family", "Self-referral", "Private commissioner", "Other"],
      },
      { id: "referrerContact", label: "Referral contact details and organisation", type: "contact", mandatory: true },
      { id: "presentingDifficulties", label: "What are {name}'s current presenting difficulties?", type: "textarea", mandatory: true },
      {
        id: "immediateRisks",
        label: "What immediate risks or concerns were identified at referral?",
        type: "multi",
        options: ["Medication", "Falls", "Nutrition / hydration", "Skin", "Safeguarding", "Self-neglect", "Mobility", "Cognition", "Mental health", "Respiratory", "No informal carer", "Home environment", "Other", "None identified"],
      },
      {
        id: "supportLevel",
        label: "What level of support is expected at commencement?",
        type: "single",
        mandatory: true,
        options: ["Low", "Moderate", "High", "Complex", "24-hour", "Time-limited reablement", "To be assessed"],
      },
      {
        id: "urgency",
        label: "How urgent is care commencement?",
        type: "single",
        mandatory: true,
        options: ["Immediate same day", "Within 24 hours", "48 hours", "72 hours", "Planned date", "Other"],
      },
      { id: "referrerOutcome", label: "What outcome is the referrer seeking from the service?", type: "textarea" },
      { id: "clientFirstPriority", label: "What does {name} say they want help with first?", type: "textarea", mandatory: true },
      {
        id: "expectationsConsistent",
        label: "Are referral expectations consistent with {name}'s wishes and assessed needs?",
        type: "single",
        mandatory: true,
        options: ["Yes", "Partly", "No", "Not yet established"],
      },
    ],
    riskDomains: [
      "Unclear referral / unmet need",
      "Unsafe delay to care start",
      "Mismatch between referral and actual need",
      "Missing urgent risk information",
      "Person's priorities not reflected",
    ],
    careWorkerInstructions: [
      { id: "whySupport", label: "WHY SUPPORT IS BEING PROVIDED", mandatory: true },
      { id: "immediatePriorities", label: "{name}'S IMMEDIATE PRIORITIES", mandatory: true },
      { id: "urgentRisks", label: "URGENT PRESENTING RISKS", mandatory: true },
      { id: "initialOutcomes", label: "INITIAL OUTCOMES / EXPECTATIONS" },
    ],
    ecm: [
      { id: "addressedPriorityNeeds", label: "Did the visit address the priority needs identified at referral?", options: ["Yes", "Partly", "No", "N/A"], action: "Partly / No -> reason + coordinator review" },
      { id: "newNeedIdentified", label: "Was any new need identified that was not in the referral?", options: ["No", "Yes"], action: "Yes -> reassessment task" },
      { id: "packageInsufficient", label: "Was the package insufficient for the presenting need?", options: ["No", "Yes", "Unsure"], action: "Yes / Unsure -> manager review" },
    ],
  },

  {
    id: "administrative-setup",
    sources: ["Batch 1 §12"],
    title: "Administrative and Service Setup Information",
    gateway: {
      id: "adminObtained",
      label:
        "Has the essential administrative information required to start and safely coordinate the care package been obtained?",
      type: "single",
      options: ["Yes", "No", "Partly"],
      mandatory: true,
      note: "This section is NOT skippable. No / Partly creates mandatory outstanding-information actions before activation of relevant care tasks.",
    },
    questions: [
      { id: "legalIdentity", label: "Full legal name, preferred name, date of birth and address", type: "contact", mandatory: true },
      { id: "nhsAndGp", label: "NHS number (if available) and GP details", type: "contact" },
      { id: "preferredContact", label: "Preferred contact details and communication method", type: "contact", mandatory: true },
      { id: "nextOfKin", label: "Next of kin / emergency contact details", type: "contacts", mandatory: true },
      { id: "professionals", label: "Key health / social-care professionals and commissioners", type: "contacts" },
      { id: "pharmacy", label: "Pharmacy details", type: "contact" },
      {
        id: "propertyAccess",
        label: "Property access arrangement",
        type: "single",
        mandatory: true,
        options: ["Person answers door", "Family / carer present", "Key safe", "Staff-held key under policy", "Concierge", "Other"],
        note: "If key safe or staff-held key, apply restricted visibility and access audit.",
      },
      { id: "noAnswerProcedure", label: "What should staff do if there is no answer at the scheduled visit?", type: "textarea", mandatory: true },
      { id: "visitSchedule", label: "Agreed visit days, times, duration and staffing level", type: "textarea", mandatory: true },
      {
        id: "mandatoryCompetencies",
        label: "Are any mandatory staff competencies, gender preferences or continuity requirements linked to this package?",
        type: "multi",
        mandatory: true,
        options: ["None", "Medication", "Moving / handling", "Dysphagia", "Epilepsy / rescue medicine", "Clinical task", "Autism / LD", "Dementia", "Mental health", "Gender preference", "Two carers", "Other"],
        note: "Used as rostering hard / soft constraints according to policy and assessment.",
      },
      {
        id: "outstandingDocuments",
        label: "Are there outstanding documents or information required before care starts?",
        type: "multi",
        mandatory: true,
        options: ["None", "Medication list", "Hospital discharge summary", "SALT plan", "Moving / handling plan", "Seizure plan", "MCA / best-interest document", "End-of-life plan", "Risk assessment", "Equipment delivery", "Other"],
        note: "Any outstanding safety-critical item creates an activation hold or manager override with rationale.",
      },
    ],
    riskDomains: [
      "Incorrect person / service information",
      "Failed access / no-answer",
      "Unmet staffing requirement",
      "Missing critical document",
      "Communication failure",
    ],
    careWorkerInstructions: [
      { id: "contactAccess", label: "ESSENTIAL CONTACT / ACCESS INSTRUCTIONS" },
      { id: "noAnswer", label: "NO-ANSWER PROCEDURE" },
      { id: "visitStaffing", label: "VISIT / STAFFING REQUIREMENTS" },
      { id: "criticalDocs", label: "CRITICAL DOCUMENTS / FLAGS" },
    ],
    ecm: [
      { id: "accessGained", label: "Was access gained as planned?", options: ["Yes", "No"], action: "No -> no-answer workflow" },
      { id: "visitTiming", label: "Did the visit start / end within agreed arrangements or authorised variation?", options: ["Yes", "No"], action: "No -> exception reason" },
      { id: "staffingMet", label: "Was the correct staffing / competency requirement met?", options: ["Yes", "No", "N/A"], action: "No -> manager escalation" },
    ],
  },

  {
    id: "personal-identity",
    sources: ["Batch 6 §2"],
    title: "Personal Identity, Pronouns and Individual Profile",
    intro:
      "Adds preferred identity and respectful-use requirements. Legal identity fields are held once in Administrative and Service Setup and are not repeated here.",
    gateway: {
      id: "identityRecorded",
      label:
        "Are {name}'s preferred identity details, name, pronouns and person-specific profile recorded accurately and in the way they want staff to use them?",
      type: "single",
      options: ["Yes", "No", "Partly", "Prefers not to state"],
      mandatory: true,
    },
    questions: [
      { id: "preferredName", label: "Preferred name to be used by staff", type: "text", mandatory: true },
      {
        id: "pronouns",
        label: "Pronouns {name} wants staff to use",
        type: "single",
        options: ["He / him", "She / her", "They / them", "Other - self-described", "Prefers not to state"],
      },
      { id: "genderIdentity", label: "How does {name} describe their gender or identity, if they wish this recorded?", type: "text" },
      { id: "termsToAvoid", label: "Are there titles, names or terms staff should use or avoid?", type: "textarea" },
      {
        id: "identityPrivacy",
        label: "Are there privacy requirements about who may see identity-related information?",
        type: "single",
        options: ["No additional restriction", "Yes - role restricted", "Discuss with {name}", "Prefers not to state"],
      },
      { id: "identityAdjustments", label: "Are there identity-related reasonable adjustments, dignity requirements or risks of discrimination?", type: "textarea" },
      { id: "contactsCurrent", label: "Are emergency contacts and next-of-kin details current?", type: "single", mandatory: true, options: ["Yes", "No", "Unsure"] },
    ],
    riskDomains: [
      "Incorrect identity information",
      "Misgendering / disrespect",
      "Inappropriate disclosure",
      "Discrimination / dignity concern",
      "Out-of-date emergency contact",
    ],
    careWorkerInstructions: [
      { id: "namePronouns", label: "PREFERRED NAME / PRONOUNS", mandatory: true },
      { id: "termsUseAvoid", label: "TERMS STAFF SHOULD USE / AVOID" },
      { id: "privacyInstructions", label: "PRIVACY / IDENTITY INSTRUCTIONS" },
      { id: "dignityAdjustments", label: "DIGNITY / DISCRIMINATION ADJUSTMENTS" },
    ],
    ecm: [
      { id: "pronounsRespected", label: "Were {name}'s preferred name / pronouns respected?", options: ["Yes", "Partly", "No", "N/A"], action: "Partly / No -> dignity exception" },
      { id: "identityConcern", label: "Was any identity / privacy concern raised?", options: ["No", "Yes"], action: "Yes -> manager review" },
      { id: "contactsOutOfDate", label: "Were contact details found to be out of date?", options: ["No", "Yes"], action: "Yes -> admin update task" },
    ],
  },
];
