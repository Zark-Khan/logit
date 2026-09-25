// Mock data + shared styles for Care Delivery > Incidents & Safeguarding.
export const INCIDENT_TYPES = [
  { key: "fall", label: "Fall" },
  { key: "injury", label: "Injury" },
  { key: "safeguarding", label: "Safeguarding" },
  { key: "health", label: "Health Deterioration" },
  { key: "other", label: "Other" },
];

export const TYPE_CONFIG = {
  fall: { color: "#D97706", bgcolor: "#FEF3C7" },
  injury: { color: "#2563EB", bgcolor: "#DBEAFE" },
  safeguarding: { color: "#EF4444", bgcolor: "#FEE2E2" },
  health: { color: "#4F46E5", bgcolor: "#E0E7FF" },
  other: { color: "#64748B", bgcolor: "#F1F5F9" },
};

export const STATUS_STYLES = {
  OPEN: { color: "#EF4444", bgcolor: "#FFF1F2" },
  INVESTIGATING: { color: "#D97706", bgcolor: "#FFFBEB" },
  CLOSED: { color: "#059669", bgcolor: "#D1FAE5" },
  RESOLVED: { color: "#2563EB", bgcolor: "#DBEAFE" },
};

export const SEVERITY_STYLES = {
  LOW: { color: "#059669", bgcolor: "#D1FAE5" },
  MEDIUM: { color: "#D97706", bgcolor: "#FFFBEB" },
  HIGH: { color: "#EA580C", bgcolor: "#FFEDD5" },
  CRITICAL: { color: "#7C3AED", bgcolor: "#EDE9FE" },
};

export const FOLLOW_UP_STYLES = {
  REQUIRED: { color: "#E11D48", bgcolor: "#FFE4E6" },
  PENDING: { color: "#D97706", bgcolor: "#FFFBEB" },
  NONE: { color: "#64748B", bgcolor: "#F1F5F9" },
};

export const STATUS_OPTIONS = ["Open", "Investigating", "Closed", "Resolved"];

// Mock signed-in user (no auth in this app)
export const CURRENT_USER = "Alex Marshall";

export const INITIAL_INCIDENTS = [
  {
    id: 1,
    title: "Fall: Arthur Morgan",
    reportedBy: "Sarah Thompson",
    time: "Today, 10:30 AM",
    status: "OPEN",
    type: "fall",
    severity: "HIGH",
    followUp: "REQUIRED",
    description:
      "Arthur was found on the floor in the living room. He states he slipped while trying to reach for his glasses.",
    location: "Living Room",
    witnesses: ["James Wilson"],
    immediateActions: "First aid administered. GP notified. Family informed.",
    logs: [
      {
        time: "Today, 11:45 AM",
        text: "Investigation opened by Admin",
        subtext: "Reviewing description and witness statements.",
      },
      { time: "Today, 10:30 AM", text: "Incident reported by Sarah Thompson" },
    ],
  },
  {
    id: 2,
    title: "Injury: John Marston",
    reportedBy: "James Wilson",
    time: "Yesterday, 04:15 PM",
    status: "INVESTIGATING",
    type: "injury",
    severity: "MEDIUM",
    followUp: "PENDING",
    description: "John sustained a minor cut to his hand while in the garden.",
    location: "Garden",
    witnesses: [],
    immediateActions: "Wound cleaned and bandaged.",
    logs: [
      { time: "Yesterday, 05:00 PM", text: "Investigation started by Admin" },
      {
        time: "Yesterday, 04:15 PM",
        text: "Incident reported by James Wilson",
      },
    ],
  },
  {
    id: 3,
    title: "Safeguarding: Sadie Adler",
    reportedBy: "Emily Davis",
    time: "26 Feb 2026",
    status: "OPEN",
    type: "safeguarding",
    severity: "HIGH",
    followUp: "REQUIRED",
    description:
      "Safeguarding concern raised regarding unexplained bruising on Sadie's arm.",
    location: "Bedroom",
    witnesses: [],
    immediateActions: "Social services contacted. Body map completed.",
    logs: [
      {
        time: "26 Feb 2026, 02:00 PM",
        text: "Incident reported by Emily Davis",
      },
    ],
  },
  {
    id: 4,
    title: "Health Deterioration: Charles Smith",
    reportedBy: "Michael Brown",
    time: "24 Feb 2026",
    status: "CLOSED",
    type: "health",
    severity: "LOW",
    followUp: "NONE",
    description:
      "Charles showed signs of a chest infection (cough, mild fever).",
    location: "Living Room",
    witnesses: ["Dr. Adams"],
    immediateActions: "GP contacted. Vitals monitored.",
    logs: [
      { time: "24 Feb 2026, 03:00 PM", text: "Case closed by Admin" },
      {
        time: "24 Feb 2026, 09:10 AM",
        text: "Incident reported by Michael Brown",
      },
    ],
  },
];

export const refOf = (id) => `INC-${String(id).padStart(3, "0")}`;
export const typeLabel = (key) =>
  INCIDENT_TYPES.find((t) => t.key === key)?.label || "Incident";

// "2026-03-01T10:30" -> "01 Mar 2026, 10:30 AM"
export const formatDateTime = (value) => {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  const date = d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const time = d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return `${date}, ${time.toUpperCase()}`;
};

export const downloadText = (filename, text, type = "text/plain") => {
  const blob = new Blob([text], { type: `${type};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
