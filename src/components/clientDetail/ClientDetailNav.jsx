import React from "react";
import { Box, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const NAV_TABS = [
  "Overview",
  "Client Details",
  "Care Assessment",
  "Care Feed",
  "Care Plan",
  "Medication",
  "Schedule & Visits",
  "Care Team",
  "Documents",
  "Referral",
  "Notes & Records",
  "Risks & Incidents",
  "Funding & Finance",
];

export default function ClientDetailNav({ activeTab, onTabChange }) {
  return (
    <Box
      sx={{
        flexShrink: 0,
        bgcolor: "rgba(138, 198, 66, 0.15)", // faint green background
        border: "1px solid rgba(138, 198, 66, 0.4)",
        borderRadius: "24px",
        overflow: "hidden",
        px: 1.5,
      }}
    >
      {/* Nav Items */}
      <Box sx={{ py: 1 }}>
        {NAV_TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <Box
              key={tab}
              onClick={() => onTabChange(tab)}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 1.5,
                py: 1.2,
                my: 0.5,
                cursor: "pointer",
                bgcolor: isActive ? "#8AC642" : "transparent",
                borderRadius: isActive ? "12px" : "0px",
                transition: "all 0.18s ease",
                color: "text.light",
                "&:hover": {
                  bgcolor: isActive ? "#8AC642" : "rgba(138, 198, 66, 0.08)",
                  borderRadius: "8px",
                },
              }}
            >
              <Typography
                fontSize="14px"
                fontWeight={600}
                color={isActive ? "#fff" : "text.light"}
              >
                {tab}
              </Typography>
              {isActive && (
                <ChevronRightIcon
                  sx={{ fontSize: 18, color: "#fff", flexShrink: 0 }}
                />
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
