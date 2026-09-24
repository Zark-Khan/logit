import React, { useState } from "react";
import { Box, Typography, Chip, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

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
      py: 1.75,
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

const STATUS_STYLES = {
  APPROVED: { bgcolor: "#DCFCE7", color: "#166534" },
  PENDING: { bgcolor: "#FFEDD5", color: "#F97316" },
  REJECTED: { bgcolor: "#FFE4E6", color: "#E11D48" },
};

const INITIAL_REQUESTS = [
  {
    id: 1,
    group: "ongoing",
    date: "05 Dec 2025",
    subtext: "Sick Leave (01 day)",
    subtextColor: "#F43F5E",
    status: "APPROVED",
  },
  {
    id: 2,
    group: "recent",
    date: "10 Dec - 21 Dec",
    subtext: "Annual Leave (12 days)",
    subtextColor: "#F97316",
    status: "PENDING",
  },
  {
    id: 3,
    group: "recent",
    date: "14 Aug - 21 Nov",
    subtext: "Maternity Leave (3 months)",
    subtextColor: "#65A30D",
    status: "APPROVED",
  },
];

const DecisionButton = ({ onClick, label, color, bgcolor, border, children }) => (
  <IconButton
    size="small"
    onClick={onClick}
    aria-label={label}
    sx={{
      width: 26,
      height: 26,
      borderRadius: "6px",
      bgcolor,
      border,
      color,
      "&:hover": { bgcolor, filter: "brightness(0.96)" },
    }}
  >
    {children}
  </IconButton>
);

const RequestCard = ({ request, onDecide }) => {
  const { date, subtext, subtextColor, status } = request;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        bgcolor: "transparent",
        border: "1px solid #fff",
        borderRadius: "12px",
        px: 2,
        py: 1.5,
      }}
    >
      <Box>
        <Typography fontSize="14px" fontWeight={700} color="text.primary">
          {date}
        </Typography>
        <Typography
          fontSize="12px"
          color={subtextColor}
          mt={0.2}
          fontWeight={400}
        >
          {subtext}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Chip
          label={status}
          size="small"
          sx={{
            ...STATUS_STYLES[status],
            fontWeight: 700,
            fontSize: "10px",
            height: 24,
            borderRadius: "6px",
            px: 0.5,
          }}
        />
        {status === "PENDING" && (
          <Box sx={{ display: "flex", gap: 0.75 }}>
            <DecisionButton
              label="Approve request"
              onClick={() => onDecide("APPROVED")}
              color="#16A34A"
              bgcolor="#DCFCE7"
              border="1px solid #86EFAC"
            >
              <CheckRoundedIcon sx={{ fontSize: 16 }} />
            </DecisionButton>
            <DecisionButton
              label="Reject request"
              onClick={() => onDecide("REJECTED")}
              color="#E11D48"
              bgcolor="#FFE4E6"
              border="1px solid #FDA4AF"
            >
              <CloseRoundedIcon sx={{ fontSize: 16 }} />
            </DecisionButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default function LeaveAbsencesTab({ staff }) {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);

  const decide = (id, status) =>
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));

  const renderGroup = (group) =>
    requests
      .filter((r) => r.group === group)
      .map((r) => (
        <RequestCard
          key={r.id}
          request={r}
          onDecide={(status) => decide(r.id, status)}
        />
      ));

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
          <Typography fontSize="12px" fontWeight={600} color="text.primary">
            01 Apr 2025-31 Mar 2026
          </Typography>
          <ExpandMoreIcon sx={{ fontSize: 18, color: "text.primary" }} />
        </Box>
      </Box>

      {/* Stats Row */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap", mt: 3 }}>
        <StatBox
          label="Total Annual Leaves"
          value="28 Days"
          bgcolor="#fff"
          border="1px solid #BAE6FD"
        />
        <StatBox
          label="Used"
          value="14 Days"
          bgcolor="#FFF7ED"
          border="1px solid #FED7AA"
        />
        <StatBox
          label="Remaining"
          value="14 Days"
          bgcolor="#CFEBFD"
          border="1px solid #0EA5E9"
        />
        <StatBox
          label="Lateness"
          value="02 Days"
          bgcolor="#F0FDF4"
          border="1px solid #A3D977"
        />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {renderGroup("ongoing")}
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {renderGroup("recent")}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
