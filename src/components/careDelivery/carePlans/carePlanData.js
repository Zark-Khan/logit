// Mock care plans for the Care Delivery > Care Plans tab.
export const TIMES_OF_DAY = ["Morning", "Lunch", "Tea", "Bedtime"];
export const PRIORITIES = ["Low", "Medium", "High"];
export const REVIEW_CYCLES = ["3 Months", "6 Months", "12 Months"];

export const RISK_COLORS = {
  Low: "#059669",
  Medium: "#D97706",
  High: "#E11D48",
};

export const PLAN_STATUS_DISPLAY = {
  ACTIVE: { label: "Active", color: "#10B981" },
  "REVIEW REQUIRED": { label: "Review Required", color: "#E11D48" },
  DRAFT: { label: "Draft", color: "#94A3B8" },
};

const GOAL_POOL = [
  [
    "Improve mobility and independence in daily activities through consistent support and encouragement.",
    "Medium",
  ],
  [
    "Maintain a balanced diet and adequate fluid intake throughout the day.",
    "High",
  ],
  [
    "Support safe medication routines with prompting at each scheduled dose.",
    "High",
  ],
  ["Encourage social engagement and weekly community activities.", "Low"],
  ["Maintain skin integrity with regular repositioning and checks.", "Medium"],
];

const TASK_POOL = {
  Morning: [
    "Personal care and grooming support",
    "Prompt morning medication",
    "Prepare breakfast",
    "Assist with dressing",
  ],
  Lunch: [
    "Prepare lunch and encourage fluids",
    "Light housekeeping",
    "Mobility exercises",
    "Wellbeing check",
  ],
  Bedtime: [
    "Evening personal care",
    "Prompt evening medication",
    "Prepare for bed",
    "Check home is secure",
  ],
};

const makeGoals = (count) =>
  GOAL_POOL.slice(0, count).map(([text, priority], i) => ({
    id: i + 1,
    text,
    priority,
  }));

// Spread `count` tasks across Morning / Lunch / Bedtime
const makeRoutine = (count) => {
  const slots = ["Morning", "Lunch", "Bedtime"];
  return Array.from({ length: count }, (_, i) => {
    const time = slots[i % slots.length];
    const pool = TASK_POOL[time];
    return {
      id: i + 1,
      title: pool[Math.floor(i / slots.length) % pool.length],
      time,
    };
  });
};

export const INITIAL_PLANS = [
  {
    id: 1,
    name: "Arthur Morgan",
    initials: "AM",
    nextReview: "15 Mar 2026",
    lastReview: "01 Sep 2025",
    risk: "Medium",
    status: "ACTIVE",
    goalsList: makeGoals(4),
    routine: makeRoutine(12),
    riskNotes:
      "Client has a history of falls. Ensure all walking aids are within reach and the environment is clear of hazards. Carer to provide standby assistance during transfers.",
  },
  {
    id: 2,
    name: "Sadie Adler",
    initials: "SA",
    nextReview: "20 Mar 2026",
    lastReview: "20 Sep 2025",
    risk: "Low",
    status: "ACTIVE",
    goalsList: makeGoals(3),
    routine: makeRoutine(8),
    riskNotes:
      "No significant risks identified. Continue routine wellbeing checks.",
  },
  {
    id: 3,
    name: "John Marston",
    initials: "JM",
    nextReview: "01 Mar 2026",
    lastReview: "01 Sep 2025",
    risk: "High",
    status: "REVIEW REQUIRED",
    goalsList: makeGoals(5),
    routine: makeRoutine(15),
    riskNotes:
      "Recent missed visits and a decline in mobility. Two-carer transfers required; review manual handling plan urgently.",
  },
  {
    id: 4,
    name: "Charles Smith",
    initials: "CS",
    nextReview: "N/A",
    lastReview: "N/A",
    risk: "Medium",
    status: "DRAFT",
    goalsList: makeGoals(2),
    routine: makeRoutine(6),
    riskNotes: "Draft plan: risk assessment to be completed before activation.",
  },
];

export const CLIENT_OPTIONS = [
  "Arthur Morgan",
  "Sadie Adler",
  "John Marston",
  "Charles Smith",
  "Abigail Roberts",
];

export const initialsOf = (name) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

// "2026-03-25" + "6 Months" -> "25 Sep 2026"
export const addMonthsLabel = (isoDate, cycle) => {
  const months = parseInt(cycle, 10);
  const d = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(d.getTime()) || !months) return "N/A";
  d.setMonth(d.getMonth() + months);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
