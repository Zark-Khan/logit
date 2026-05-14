import React, { useState } from "react";
import { Box } from "@mui/material";

// --- Sub-components ---
import MedicationDashboard from "./MedicationDashboard";
import AddMedicationForm from "./AddMedicationForm";
import MedicationSchedule from "./MedicationSchedule";
import MARChart from "./MARChart";
import MedicalInformation from "./MedicalInformation";

export default function MedicationTab({ client }) {
  const [view, setView] = useState("dashboard"); // dashboard, add-med, schedule, mar-chart, medical-info

  const renderView = () => {
    switch (view) {
      case "dashboard":
        return <MedicationDashboard setView={setView} client={client} />;
      case "add-med":
        return <AddMedicationForm onBack={() => setView("dashboard")} />;
      case "schedule":
        return <MedicationSchedule onBack={() => setView("dashboard")} />;
      case "mar-chart":
        return <MARChart onBack={() => setView("dashboard")} />;
      case "medical-info":
        return <MedicalInformation onBack={() => setView("dashboard")} />;
      default:
        return <MedicationDashboard setView={setView} client={client} />;
    }
  };

  return (
    <Box>
      {renderView()}
    </Box>
  );
}
