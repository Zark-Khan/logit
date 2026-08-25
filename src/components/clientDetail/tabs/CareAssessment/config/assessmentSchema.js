// Shared vocabulary for the Verity Healthcare assessment modules.
//
// Every module in the 9 source documents repeats the same six blocks:
//   1. gateway screening question (with STOP / SKIP logic)
//   2. detailed assessment questions
//   3. risk assessment table   <- identical columns everywhere
//   4. action / control plan   <- identical columns everywhere
//   5. care-worker instructions
//   6. ECM integration + review / sign-off  <- near-identical everywhere
//
// Blocks 3, 4 and 6 are boilerplate, so they live here once instead of being
// repeated ~108 times in the module data.

// ── Field types the source documents use ──────────────────────────────────
// single    DROPDOWN - SINGLE CHOICE
// multi     DROPDOWN - MULTIPLE CHOICE
// text      SHORT TEXT BOX
// textarea  LARGE TEXT BOX
// date      DATE PICKER
// number    NUMBER
// currency  CURRENCY
// bodymap   BODY MAP + MULTIPLE SELECT
// contact   STRUCTURED CONTACT FIELDS
// contacts  REPEATABLE CONTACT FIELDS
// matrix    grid: rows x choice columns, optional trailing free-text column
// table     repeatable rows, one field type per column
export const FIELD_TYPES = [
  "single", "multi", "text", "textarea", "date", "number",
  "currency", "bodymap", "contact", "contacts", "matrix", "table",
];

// The client's name is written as "Alain" throughout the source documents.
// Question labels store it as {name} and are interpolated at render time.
export const NAME_TOKEN = /\{name\}/g;
export const interpolate = (label, name) =>
  (label || "").replace(NAME_TOKEN, name || "the client");

// ── Block 3: risk assessment ──────────────────────────────────────────────
export const RISK_LEVELS = [
  "No identified risk", "Low", "Moderate", "High", "Critical",
];

// Moderate / High / Critical must require a control, owner and review date.
export const RISK_REQUIRES_CONTROL = ["Moderate", "High", "Critical"];

export const RISK_TABLE_COLUMNS = [
  { id: "domain", label: "Domain", type: "readonly" },
  { id: "level", label: "Risk level", type: "single", options: RISK_LEVELS },
  { id: "consequence", label: "What could happen?", type: "textarea" },
  { id: "control", label: "Required control / response", type: "textarea" },
  { id: "review", label: "Review needed?", type: "single", options: ["Yes", "No"] },
];

// ── Block 4: action / control plan ────────────────────────────────────────
export const ACTION_PLAN_COLUMNS = [
  { id: "action", label: "Action / control", type: "textarea" },
  { id: "responsible", label: "Responsible", type: "single", options: [] },
  { id: "dueDate", label: "Due date", type: "date" },
  { id: "ecmFlag", label: "ECM flag?", type: "single", options: ["Yes", "No"] },
  { id: "rosteringFlag", label: "Rostering flag?", type: "single", options: ["Yes", "No"] },
  { id: "status", label: "Status", type: "single", options: ["Not started", "In progress", "Complete", "Overdue"] },
  { id: "evidence", label: "Evidence / review", type: "textarea" },
];

// ── Block 6: review and sign-off (identical in every module) ──────────────
export const REVIEW_SIGNOFF_QUESTIONS = [
  {
    id: "reviewTriggers",
    label: "When should this assessment be reviewed?",
    type: "multi",
    options: [
      "Planned review date", "Change in need", "Hospital admission / discharge",
      "Incident / near miss", "Professional recommendation",
      "Repeated ECM exception", "Person / family requests change", "Other",
    ],
  },
  {
    id: "reviewFrequency",
    label: "Planned review frequency",
    type: "single",
    options: ["Monthly", "3-monthly", "6-monthly", "Annually", "Condition-specific frequency", "Other"],
  },
  { id: "nextReviewDue", label: "Next review due", type: "date" },
  {
    id: "assessorRiskRating",
    label: "Assessor's final risk rating",
    type: "single",
    options: RISK_LEVELS,
    mandatory: true,
  },
  {
    id: "managerDecision",
    label: "Manager decision",
    type: "single",
    options: ["Approved", "Approved with actions", "Returned for amendment"],
    mandatory: true,
  },
  { id: "managerComments", label: "Manager comments / outstanding actions", type: "textarea" },
];

// Manager approval is forced for these, per the cross-module rules in Batch 1 §15.
export const FORCES_MANAGER_APPROVAL = ["High", "Critical"];
