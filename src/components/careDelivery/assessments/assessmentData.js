// Mock data for Care Delivery > Assessments.
export const ASSESSMENT_TYPES = [
  "Mobility Assessment",
  "Falls Risk Assessment",
  "Medication Risk",
  "Nutrition Assessment",
  "Skin Integrity Assessment",
];

export const ASSESSORS = [
  "Sarah Thompson",
  "Emily Davis",
  "James Wilson",
  "Michael Brown",
];
export const CLIENTS = [
  "Arthur Morgan",
  "Sadie Adler",
  "John Marston",
  "Charles Smith",
  "Abigail Roberts",
];
export const RESPONSES = ["Yes", "No", "Partial", "N/A"];
export const OUTCOME_STATUSES = ["Completed", "In Progress", "Draft"];

export const INITIAL_ASSESSMENTS = [
  {
    id: 1,
    title: "Mobility Assessment",
    client: "Arthur Morgan",
    date: "28 Feb 2026",
    score: "18/30",
    riskLevel: "MEDIUM RISK",
    status: "COMPLETED",
    assessedBy: "Sarah Thompson",
    details: [
      {
        question: "Can the client walk 50m without assistance?",
        answer: "Yes",
        notes:
          "Arthur is able to walk with a stick but requires standby assistance for longer distances.",
      },
      {
        question: "Has the client had a fall in the last 6 months?",
        answer: "No",
        notes: "No falls reported since last assessment.",
      },
      {
        question: "Is the client able to manage their own medication?",
        answer: "Partial",
        notes:
          "Requires prompting and supervision to ensure correct dosage is taken.",
      },
    ],
  },
  {
    id: 2,
    title: "Falls Risk Assessment",
    client: "John Marston",
    date: "25 Feb 2026",
    score: "24/30",
    riskLevel: "HIGH RISK",
    status: "COMPLETED",
    assessedBy: "James Wilson",
    details: [
      {
        question: "Has the client had a fall in the last 6 months?",
        answer: "Yes",
        notes:
          "Two falls recorded in January, both at night when getting up to use the bathroom.",
      },
      {
        question: "Does the client use a walking aid?",
        answer: "Yes",
        notes: "Zimmer frame indoors; not always used consistently.",
      },
    ],
  },
  {
    id: 3,
    title: "Medication Risk",
    client: "Sadie Adler",
    date: "20 Feb 2026",
    score: "Low Risk",
    riskLevel: "LOW RISK",
    status: "COMPLETED",
    assessedBy: "Emily Davis",
    details: [
      {
        question: "Is the client able to manage their own medication?",
        answer: "Yes",
        notes: "Uses a dosette box independently; carers check weekly.",
      },
    ],
  },
  {
    id: 4,
    title: "Nutrition Assessment",
    client: "Charles Smith",
    date: "15 Feb 2026",
    score: "Normal",
    riskLevel: "MEDIUM RISK",
    status: "COMPLETED",
    assessedBy: "Michael Brown",
    details: [
      {
        question:
          "Has the client lost weight unintentionally in the last 3 months?",
        answer: "Partial",
        notes:
          "Slight weight loss (2kg); appetite reduced after recent illness.",
      },
    ],
  },
];

export const initialsOf = (name) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export const refOf = (id) => `AS-${String(id).padStart(3, "0")}`;

// "2026-03-25" -> "25 Mar 2026"
export const formatDate = (iso) => {
  const d = new Date(`${iso}T00:00:00`);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
};
