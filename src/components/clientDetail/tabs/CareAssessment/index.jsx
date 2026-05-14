import React, { useState } from "react";
import { Box, Typography, Tab, Tabs } from "@mui/material";
import CareAssessmentForm from "./CareAssessmentForm";
import HealthcareChecklist from "./HealthcareChecklist";

export default function CareAssessmentTab({ client }) {
  const [activeSubTab, setActiveSubTab] = useState(0);

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} color="text.primary">
          Care Assessment
        </Typography>
        <Typography fontSize="14px" color="text.primary" sx={{ mt: 0.3 }}>
          Manage information and care delivery for {client.name}.
        </Typography>
      </Box>

      {/* Sub-tabs */}
      <Box sx={{ borderBottom: "1px solid #ffffff", mb: 6 }}>
        <Tabs
          value={activeSubTab}
          onChange={(e, v) => setActiveSubTab(v)}
          // variant="fullWidth"
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontSize: "14px",
              fontWeight: 700,
              minWidth: 0,
              px: 0,
              color: "text.gray",
            },
            "& .MuiTabs-flexContainer": { gap: 6 },
            "& .Mui-selected": { color: "#0EA5E9 !important" },
            "& .MuiTabs-indicator": { bgcolor: "#0EA5E9", height: 3 },
          }}
        >
          <Tab label="Care Assessment" />
          <Tab label="Healthcare Checklist" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {activeSubTab === 0 ? (
        <CareAssessmentForm client={client} />
      ) : (
        <HealthcareChecklist client={client} />
      )}
    </Box>
  );
}
