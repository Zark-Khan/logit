export const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Order tasks appear within a day.
export const TIME_GROUPS = ["Anytime", "Morning", "Lunch", "Evening", "Night"];

// The task-type vocabulary offered in the Filters panel. The first nine are the
// ones listed in the design; the last three are types used by the seeded tasks
// so that every visible tag can actually be filtered on.
export const TASK_TYPES = [
  "Oral Hygiene",
  "Transport",
  "Reposition",
  "Home Management",
  "Laundry",
  "Shower / Bathing / Washing",
  "Diary Management",
  "Fluids",
  "Cleaning",
  "Medical",
  "Meals",
  "Dressing",
];

// Task templates, written once and repeated across the days below. Descriptions
// take the client's first name so the planner reads for whoever is open.
const TEMPLATES = {
  medicalAppointments: (name) => ({
    time: "Anytime",
    title: "Accompany to medical appointments",
    description: `Assist, prompt and accompany any medical appointments including medication collection if required.`,
    type: "Medical",
  }),
  independence: (name) => ({
    time: "Anytime",
    title: "Encourage independence",
    description: `Encourage ${name} to remain independent in everyday tasks.`,
    type: "Home Management",
  }),
  morningHygiene: (name) => ({
    time: "Morning",
    title: "Prompt personal care and hygiene",
    description: "Personal care and hygiene routine support.",
    type: "Shower / Bathing / Washing",
  }),
  morningHygieneAlt: (name) => ({
    time: "Morning",
    title: "Prompt personal care and hygiene",
    description: "Personal care routine assistance.",
    type: "Shower / Bathing / Washing",
  }),
  getOutOfBed: (name) => ({
    time: "Morning",
    title: "Encourage to get out of bed",
    description: `Encourage ${name} to wake early and get ready for work.`,
    type: "Dressing",
  }),
  cleaning: (name) => ({
    time: "Morning",
    title: "Assist with light cleaning duties",
    description: `${name} needs encouragement to maintain a clean and organised environment.`,
    type: "Cleaning",
  }),
  breakfast: (name) => ({
    time: "Morning",
    title: "Prompt with food and fluid intake",
    description: `Verbally assist ${name} with preparation of their main meals of the morning.`,
    type: "Meals",
  }),
  lunch: (name) => ({
    time: "Lunch",
    title: "Prompt with food and fluid intake",
    description: `Verbally assist ${name} with preparation of their main meals of the noon.`,
    type: "Meals",
  }),
  dinner: (name) => ({
    time: "Evening",
    title: "Prompt with food and fluid intake",
    description: `Verbally assist ${name} with preparation of their main meals of the evening.`,
    type: "Meals",
  }),
  eveningHygiene: (name) => ({
    time: "Night",
    title: "Prompt personal care and hygiene",
    description: "Evening personal care and hygiene routine.",
    type: "Shower / Bathing / Washing",
  }),
  nightHygiene: (name) => ({
    time: "Night",
    title: "Prompt personal care and hygiene",
    description: "Night personal care and hygiene assistance.",
    type: "Shower / Bathing / Washing",
  }),
};

// Which templates run on which day.
const STANDARD_DAY = [
  "medicalAppointments",
  "independence",
  "morningHygiene",
  "breakfast",
  "cleaning",
  "lunch",
  "dinner",
  "eveningHygiene",
];

const WORK_DAY = [
  "medicalAppointments",
  "independence",
  "cleaning",
  "morningHygieneAlt",
  "getOutOfBed",
  "breakfast",
  "lunch",
  "dinner",
  "nightHygiene",
];

const QUIET_DAY = [
  "independence",
  "morningHygiene",
  "breakfast",
  "lunch",
  "dinner",
  "eveningHygiene",
];

const DAY_PLANS = {
  Monday: STANDARD_DAY,
  Tuesday: WORK_DAY,
  Wednesday: STANDARD_DAY,
  Thursday: WORK_DAY,
  Friday: STANDARD_DAY,
  Saturday: QUIET_DAY,
  Sunday: QUIET_DAY,
};

export function buildInitialTasks(firstName) {
  const name = firstName || "the client";
  const tasks = [];
  let id = 1;

  DAYS.forEach((day) => {
    DAY_PLANS[day].forEach((templateKey) => {
      tasks.push({ id: `t${id++}`, day, ...TEMPLATES[templateKey](name) });
    });
  });

  return tasks;
}

export const INITIAL_HISTORY = [
  {
    date: "Thu 23rd April",
    entries: [
      { action: "Updated", task: "Prompt with food and fluid intake" },
      { action: "Updated", task: "Prompt with food and fluid intake" },
      { action: "Updated", task: "Check and change filter in hearing aids" },
      { action: "Updated", task: "Assist to write shopping list" },
      { action: "Created", task: "Encourage independence" },
      { action: "Created", task: "Accompany to medical appointments" },
      { action: "Created", task: "Prompt with food and fluid intake" },
      { action: "Created", task: "Prompt to get out of bed" },
      { action: "Created", task: "Encourage to get out of bed" },
      { action: "Created", task: "Prompt to get out of bed" },
    ],
  },
  {
    date: "Wed 12th November",
    entries: [{ action: "Created", task: "Accompany to attend activities" }],
  },
];
