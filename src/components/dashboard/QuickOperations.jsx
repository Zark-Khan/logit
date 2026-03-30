import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { ReactComponent as BoltIcon } from "../../assets/boltSvg.svg";
import { ReactComponent as StaffIcon } from "../../assets/staffSvg.svg";
import { ReactComponent as ClientIcon } from "../../assets/clientSvg.svg";
import { ReactComponent as RosteringIcon } from "../../assets/rosteringSvg.svg";
import { ReactComponent as ReportsIcon } from "../../assets/reportsSvg.svg";

const ACTIONS = [
  {
    label: "Add Staff",
    icon: StaffIcon,
    bg: "linear-gradient(to left, rgba(204, 235, 255, 1), rgba(248, 250, 252, 1))",
    color: "#0EA5E9",
  },
  {
    label: "Add Client",
    icon: ClientIcon,
    bg: "linear-gradient(to left, rgba(229, 255, 198, 1), rgba(248, 250, 252, 1))",
    color: "#8AC642",
  },
  {
    label: "Rostering",
    icon: RosteringIcon,
    bg: "linear-gradient(to left, rgba(254, 214, 139, 1), rgba(248, 250, 252, 1))",
    color: "#FFA500",
  },
  {
    label: "Reports",
    icon: ReportsIcon,
    bg: "linear-gradient(to left, rgba(206, 218, 235, 1), rgba(248, 250, 252, 1))",
    color: "#7C3AED",
  },
];

export default function QuickOperations() {
  return (
    <Paper
      elevation={0}
      sx={{
        px: 2.5,
        pt:2.5,
        pb:7.858,
        borderRadius: 5,
        border: "1px solid #FEA5006E",
        height: "100%",
        backgroundColor: "background.bgOrange",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <BoltIcon />
          <Typography variant="h6" fontWeight={700}>
            Quick Operations
          </Typography>
        </Box>
        <Typography
          // variant="h6"
          sx={{
            color: "text.grey",
            fontWeight: 700,
            fontSize: "10px",
            px: 0.77,
            py: 0.5,
            letterSpacing:"1px",  
            borderRadius: 1,
            cursor: "pointer",
            background:"#FFE6C4"
          }}
        >
          AGENCY SHORTCUTS
        </Typography>
      </Box>

      <Box
      sx={{ display: "flex", gap: 2 }}
      >
        {ACTIONS.map(({ label, icon: Icon, bg, color }) => (
          <Box
            key={label}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              py: 2.4,
              flex: 1, 
              borderRadius: 2,
              border: `1px solid ${color}`,
              background: bg,
              cursor: "pointer",
              transition: "transform 0.15s ease",
              "&:hover": { transform: "translateY(-4px)" },
            }}
          >
            <Icon />
            <Typography
              variant="body1"
              fontWeight={700}
              color="text.darkGrey"
              sx={{
                textAlign: "center",
                textTransform: "uppercase",
                letterSpacing: 0.6,
              }}
            >
              {label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
