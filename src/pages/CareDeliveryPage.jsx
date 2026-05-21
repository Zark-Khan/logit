import React, { useState } from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import VisitsLogsTab from "../components/careDelivery/visits/VisitsLogsTab";
import CarePlansTab from "../components/careDelivery/carePlans/CarePlansTab";
import AssessmentsTab from "../components/careDelivery/assessments/AssessmentsTab";
import MedicationTab from "../components/careDelivery/medication/MedicationTab";
import IncidentsTab from "../components/careDelivery/incidents/IncidentsTab";

const TABS = [
  "Visits & Logs",
  "Care Plans",
  "Assessments",
  "Medication",
  "Incidents & Safeguarding",
];

export default function CareDeliveryPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box sx={{ py: 3, pb: 10 }}>
      {/* Header Section */}
      <Box sx={{ mb: 6, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <Box>
          <Typography fontSize="24px" fontWeight={700} color="text.primary" mb={0.5}>
            Care Delivery
          </Typography>
          <Typography fontSize="14px" color="text.light">
            Monitor and manage real-time care operations
          </Typography>
        </Box>

        {/* Custom Tabs */}
        <Box
          sx={{
            display: "flex",
            p: 0.5,
            border: "1px solid #E2E8F0",
            borderRadius: "16px",
            bgcolor: "#fff",
            gap: 0.5,
          }}
        >
          {TABS.map((tab, i) => (
            <Box
              key={tab}
              onClick={() => setActiveTab(i)}
              sx={{
                px: 2.5,
                py: 1,
                borderRadius: "12px",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s",
                bgcolor: activeTab === i ? "primary.main" : "transparent",
                color: activeTab === i ? "#fff" : "text.light",
                "&:hover": {
                  color: activeTab === i ? "#fff" : "primary.main",
                },
              }}
            >
              {tab}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Tab Content */}
      <Box>
        {activeTab === 0 && <VisitsLogsTab />}
        {activeTab === 1 && <CarePlansTab />}
        {activeTab === 2 && <AssessmentsTab />}
        
        {activeTab === 3 && <MedicationTab />}
        {activeTab === 4 && <IncidentsTab />}
      </Box>
    </Box>
  );
}
