// Mock NHS dm+d search results for the "Add medication" search
export const MEDICINES = [
  { name: "Paracetamol", desc: "1g tablets" },
  { name: "Paracetamol", desc: "500mg tablets" },
  { name: "Paracetamol", desc: "500mg capsules" },
  { name: "Paracetamol", desc: "Plus tablets" },
  { name: "Ibuprofen", desc: "200mg tablets" },
  { name: "Ibuprofen", desc: "400mg tablets" },
  { name: "Amoxicillin", desc: "500mg capsules" },
  { name: "Levetiracetam", desc: "250mg tablets" },
  { name: "Sodium valproate", desc: "200mg tablets" },
];

export const medicineLabel = (m) => `${m.name} ${m.desc}`;

// Margaret's current scheduled medication (schedule table + MAR chart)
export const SCHEDULED_MEDICATION = {
  name: "Paracetamol 500mg tablets",
  route: "Oral",
  dose: "2 oral tablets",
  frequency: "Once a day on Tuesday, Saturday every week",
  supportType: "Assist",
  type: "Scheduled",
  startDate: "25 Feb 2026",
  time: "08:00",
};

export const firstNameOf = (name) => (name || "").split(" ")[0];
