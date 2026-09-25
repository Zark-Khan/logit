// Mock per-client visit tasks for the visit detail modal's Tasks tab.
// Clients without an entry show the "No Tasks created" empty state.
export const VISIT_TASKS = {
  "Margaret Hall": [
    {
      id: 1,
      task: "Administer morning medication",
      carer: "Sarah Thompson",
      status: "Completed",
    },
    {
      id: 2,
      task: "Assist with personal hygiene",
      carer: "Ruth Omoregie",
      status: "Completed",
    },
    {
      id: 3,
      task: "Prepare lunch",
      carer: "Ruth Omoregie",
      status: "In Progress",
    },
    {
      id: 4,
      task: "Accompany to doctor appointment",
      carer: "Sarah Thompson",
      status: "In Progress",
    },
    {
      id: 5,
      task: "Evening wellness check",
      carer: "Ruth Omoregie",
      status: "Pending",
    },
    {
      id: 6,
      task: "Update care notes",
      carer: "Ruth Omoregie",
      status: "Pending",
    },
  ],
};

export const TASK_STATUS_STYLES = {
  Completed: { bgcolor: "#DCFCE7", color: "#166534" },
  "In Progress": { bgcolor: "#DBEAFE", color: "#1E40AF" },
  Pending: { bgcolor: "#FEF3C7", color: "#92400E" },
};

export const CANCELLATION_REASONS = [
  "Cancelled",
  "Client in hospital",
  "Client unavailable",
  "Carer unavailable",
  "Family cancelled",
  "Other",
];
