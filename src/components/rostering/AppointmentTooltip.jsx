import React from "react";
import { Box, Typography, Tooltip } from "@mui/material";

function InfoRow({ label, value, isLast }) {
  return (
    <Box
      sx={{
        display: "flex",
        px: 2.5,
        py: 1.4,
        borderBottom: isLast ? "none" : "1px solid #F1F5F9",
        alignItems: "flex-start",
        gap: 2,
      }}
    >
      <Typography fontSize="12px" color="#94A3B8" sx={{ minWidth: 64 }}>
        {label}:
      </Typography>
      <Typography
        fontSize="12px"
        fontWeight={700}
        color="text.primary"
        sx={{ flex: 1 }}
      >
        {value}
      </Typography>
    </Box>
  );
}

function AppointmentCard({ appointment }) {
  return (
    <Box sx={{ width: 260 }}>
      <Box
        sx={{
          py: 1.75,
          textAlign: "center",
          borderBottom: "1px solid #F1F5F9",
        }}
      >
        <Typography fontSize="16px" fontWeight={700} color="primary.main">
          Appointment
        </Typography>
      </Box>
      <InfoRow label="Client" value={appointment.client} />
      <InfoRow label="Address" value={appointment.address} />
      <InfoRow label="Phone" value={appointment.phone} />
      <InfoRow label="Time" value={appointment.time} />
      <InfoRow label="Duration" value={appointment.duration} />
      <InfoRow label="Carer 1" value={appointment.carer1} />
      <InfoRow label="Carer 2" value={appointment.carer2} isLast />
    </Box>
  );
}

/**
 * Hover card for a scheduled visit, shown above the visit with a pointer arrow.
 * Shared by the Rostering board and the client Schedule & Visits tab.
 * `appointment`: { client, address, phone, time, duration, carer1, carer2 }
 */
export default function AppointmentTooltip({ appointment, children }) {
  return (
    <Tooltip
      title={<AppointmentCard appointment={appointment} />}
      placement="top"
      arrow
      enterDelay={100}
      slotProps={{
        tooltip: {
          sx: {
            bgcolor: "#fff",
            color: "text.primary",
            p: 0,
            maxWidth: "none",
            borderRadius: "16px",
            border: "1px solid #E2E8F0",
            boxShadow: "0 10px 40px rgba(15,23,42,0.12)",
            overflow: "hidden",
          },
        },
        arrow: {
          sx: { color: "#fff", "&::before": { border: "1px solid #E2E8F0" } },
        },
      }}
    >
      {children}
    </Tooltip>
  );
}
