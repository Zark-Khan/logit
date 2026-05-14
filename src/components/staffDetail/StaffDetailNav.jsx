import React from "react";
import { Box, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const NAV_TABS = [
  "Overview",
  "Personal Details",
  "Employment & Contract",
  "Availability & Schedule",
  "Leave & Absences",
  "Skills & Training",
  "Compliance & Documents",
  "Rostering & Assignments",
  "Timesheets & Pay",
  "Performance & Activity",
  "Assigned Clients",
  "Account & Access",
];

export default function StaffDetailNav({ activeTab, onTabChange }) {
  return (
    <Box
      sx={{
        flexShrink: 0,
        bgcolor: "#E0F5FF",
        border: "1px solid #83D8FF",
        borderRadius: "24px",
        overflow: "hidden",
        px:1.5
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
                px:1.5,
                py:1.2,
                my:0.5,
                cursor: "pointer",
                bgcolor: isActive ? "#0EA5E9" : "transparent",
                borderRadius: isActive ? "12px" : "0px",
                transition: "all 0.18s ease",
                color:"text.light",
                "&:hover": {
                  bgcolor: isActive ? "#0EA5E9" : "rgba(14,165,233,0.08)",
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
