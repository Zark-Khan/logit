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
  const [selectedMedication, setSelectedMedication] = useState(null);
  const backToDashboard = () => setView("dashboard");

  const handleSelectMedication = (label) => {
    setSelectedMedication(label);
    setView("add-med");
  };

  const renderView = () => {
    switch (view) {
      case "add-med":
        return (
          <AddMedicationForm
            client={client}
            medication={selectedMedication}
            onBack={backToDashboard}
          />
        );
      case "schedule":
        return (
          <MedicationSchedule
            client={client}
            onBack={backToDashboard}
            onViewMedication={() => setView("mar-chart")}
          />
        );
      case "mar-chart":
        return <MARChart client={client} onBack={backToDashboard} />;
      case "medical-info":
        return <MedicalInformation client={client} onBack={backToDashboard} />;
      case "dashboard":
      default:
        return (
          <MedicationDashboard
            setView={setView}
            client={client}
            onSelectMedication={handleSelectMedication}
          />
        );
    }
  };

  return <Box>{renderView()}</Box>;
}
