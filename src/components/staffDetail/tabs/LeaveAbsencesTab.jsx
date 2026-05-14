import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const StatBox = ({ label, value, bgcolor, border }) => (
  <Box
    sx={{
      flex: 1,
      minWidth: 100,
      bgcolor,
      border,
      borderRadius: "12px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      py: 2.5,
      px: 1,
      gap: 0.5,
    }}
  >
    <Typography
      fontSize="10px"
      fontWeight={700}
      color="text.primary"
      textTransform="uppercase"
    >
      {label}
    </Typography>
    <Typography fontSize="20px" fontWeight={700} color="text.primary">
      {value}
    </Typography>
  </Box>
);

const RequestCard = ({
  date,
  subtext,
  subtextColor,
  badgeLabel,
  badgeBg,
  badgeColor,
}) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      bgcolor: "transparent",
      border: "1px solid #fff",
      borderRadius: "12px",
      px: 2.5,
      py: 2,
    }}
  >
    <Box>
      <Typography fontSize="14px" fontWeight={700} color="text.primary">
        {date}
      </Typography>
      <Typography
        fontSize="14px"
        color={subtextColor}
        mt={0.2}
        fontWeight={500}
      >
        {subtext}
      </Typography>
    </Box>
    <Chip
      label={badgeLabel}
      size="small"
      sx={{
        bgcolor: badgeBg,
        color: badgeColor,
        fontWeight: 700,
        fontSize: "10px",
        height: 24,
        borderRadius: "6px",
        px: 0.5,
      }}
    />
  </Box>
);

export default function LeaveAbsencesTab({ staff }) {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 2,
        }}
      >
        <Box>
          <Typography
            fontSize="20px"
            fontWeight={700}
            color="text.primary"
            mb={0.4}
          >
            Leave & Absences
          </Typography>
          <Typography fontSize="14px" color="text.light">
            Detailed information and settings for {staff.name}'s leave &
            absences.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: "#fff",
            border: "1px solid #E2E8F0",
            borderRadius: "8px",
            px: 1.5,
            py: 0.7,
            cursor: "pointer",
          }}
        >
          <Typography fontSize="14px" fontWeight={600} color="text.primary">
            01 Apr 2025-31 Mar 2026
          </Typography>
          <ExpandMoreIcon sx={{ fontSize: 18, color: "text.primary" }} />
        </Box>
      </Box>

      {/* Stats Row */}
      <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap", mt: 3 }}>
        <StatBox
          label="Total Annual Leaves"
          value="28 Days"
          bgcolor="#fff"
          border="1px solid #E2E8F0"
        />
        <StatBox
          label="Used"
          value="14 Days"
          bgcolor="#FFF7ED"
          border="1px solid #FFEDD5"
        />
        <StatBox
          label="Remaining"
          value="14 Days"
          bgcolor="#E0F2FE"
          border="1px solid #7DD3FC"
        />
        <StatBox
          label="Lateness"
          value="02 Days"
          bgcolor="#F0FDF4"
          border="1px solid #BBF7D0"
        />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3.5 }}>
        {/* Ongoing Requests */}
        <Box>
          <Typography
            fontSize="14px"
            fontWeight={700}
            color="text.primary"
            mb={1.5}
          >
            Ongoing Requests
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <RequestCard
              date="05 Dec 2025"
              subtext="Sick Leave (01 day)"
              subtextColor="#F43F5E"
              badgeLabel="APPROVED"
              badgeBg="#DCFCE7"
              badgeColor="#166534"
            />
          </Box>
        </Box>

        {/* Recent Requests */}
        <Box>
          <Typography
            fontSize="14px"
            fontWeight={700}
            color="text.primary"
            mb={1.5}
          >
            Recent Requests
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <RequestCard
              date="10 Dec - 21 Dec"
              subtext="Annual Leave (12 days)"
              subtextColor="#F97316"
              badgeLabel="PENDING"
              badgeBg="#FFEDD5"
              badgeColor="#C2410C"
            />
            <RequestCard
              date="14 Aug - 21 Nov"
              subtext="Maternity Leave (3 months)"
              subtextColor="#65A30D"
              badgeLabel="APPROVED"
              badgeBg="#DCFCE7"
              badgeColor="#166534"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
