import React, { useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { InsertChartOutlined as InsertChartOutlinedIcon } from "@mui/icons-material";

// --- Sub-components ---
import VisitDetailModal from "../../../rostering/VisitDetailModal";
import AppointmentTooltip from "../../../rostering/AppointmentTooltip";

const DAYS = [
  "Monday 16th",
  "Tuesday 17th",
  "Wednesday 18th",
  "Thursday 19th",
  "Friday 20th",
  "Saturday 21st",
  "Sunday 22nd",
];
const TIMES = [
  "00:00 - 07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
];

// Mock visits: dayIdx/timeIdx place each one in the week grid
const VISITS = [
  {
    id: 1,
    dayIdx: 0,
    timeIdx: 1,
    name: "Sarah Th...",
    time: "08:00 • 60m",
    status: "MORNING",
    color: "#F0FDF4",
    borderColor: "#86EFAC",
    dotColor: "#16A34A",
    titleColor: "#15803D",
    appointment: {
      address: "35 Nunhead Lane, London, SE15 3TR",
      phone: "07465679465",
      time: "08:00 - 09:00",
      duration: "1 hour",
      carer1: "Sarah Thompson",
      carer2: "Ruth Omoregie",
    },
  },
  {
    id: 2,
    dayIdx: 2,
    timeIdx: 3,
    name: "James Wilson",
    time: "10:00 • 90m",
    status: "MEDICATION",
    color: "#F8FAFC",
    borderColor: "#94A3B8",
    dotColor: "#475569",
    titleColor: "#334155",
    appointment: {
      address: "35 Nunhead Lane, London, SE15 3TR",
      phone: "07465679465",
      time: "10:00 - 11:30",
      duration: "1 hour 30 mins",
      carer1: "James Wilson",
      carer2: "Ruth Omoregie",
    },
  },
];

export default function ScheduleVisitsTab({ client }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const openVisit = (visit) => {
    setSelectedVisit(visit);
    setModalOpen(true);
  };
  const [visitStart, visitEnd] = (selectedVisit?.appointment.time || "").split(
    " - ",
  );

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={700} color="text.primary">
            Schedule & Visits
          </Typography>
          <Typography fontSize="13px" color="text.light" sx={{ mt: 0.3 }}>
            Manage information and care delivery for {client.name}.
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography fontWeight={700} fontSize="18px">
          Week A
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#0EA5E9",
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 700,
            px: 3,
            py: 1,
            boxShadow: "0 4px 12px rgba(14,165,233,0.25)",
            fontSize: "13px",
            "&:hover": { bgcolor: "#0A8DBC" },
          }}
        >
          + New Shift
        </Button>
      </Box>

      <Paper
        elevation={0}
        sx={{
          borderRadius: "16px",
          border: "1px solid #E2E8F0",
          overflow: "hidden",
          bgcolor: "#fff",
          mb: 4,
        }}
      >
        <Box sx={{ overflowX: "auto" }}>
          <Box sx={{ width: "100%" }}>
            {/* Header Times */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "160px repeat(7, 1fr)",
                borderBottom: "1px solid #E2E8F0",
              }}
            >
              <Box
                sx={{
                  p: 2.5,
                  borderRight: "1px solid #E2E8F0",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  fontSize="10px"
                  fontWeight={700}
                  color="text.secondary"
                >
                  WEEK VIEW
                </Typography>
              </Box>
              {TIMES.map((time) => (
                <Typography
                  key={time}
                  fontSize="11px"
                  fontWeight={700}
                  color="text.secondary"
                  sx={{
                    py: 2.5,
                    textAlign: "center",
                    borderRight: "1px solid #E2E8F0",
                  }}
                >
                  {time}
                </Typography>
              ))}
            </Box>

            {/* Rows */}
            {DAYS.map((day, idx) => (
              <Box
                key={day}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "160px repeat(7, 1fr)",
                  borderBottom:
                    idx < DAYS.length - 1 ? "1px solid #E2E8F0" : "none",
                }}
              >
                <Box sx={{ p: 2.5, borderRight: "1px solid #E2E8F0" }}>
                  <Typography
                    fontSize="14px"
                    fontWeight={700}
                    color="text.primary"
                  >
                    {day}
                  </Typography>
                  <Typography
                    fontSize="11px"
                    fontWeight={600}
                    color="text.light"
                  >
                    Mar 2026
                  </Typography>
                </Box>
                {Array.from({ length: 7 }).map((_, timeIdx) => (
                  <Box
                    key={timeIdx}
                    sx={{
                      p: 1,
                      borderRight: "1px solid #E2E8F0",
                      minHeight: 120,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {VISITS.filter(
                      (v) => v.dayIdx === idx && v.timeIdx === timeIdx,
                    ).map((v) => (
                      <VisitCard
                        key={v.id}
                        visit={v}
                        clientName={client.name}
                        onClick={() => openVisit(v)}
                      />
                    ))}
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </Paper>

      {/* Footer Stats Banner */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
        <InsertChartOutlinedIcon sx={{ color: "text.primary", fontSize: 15 }} />
        <Typography fontWeight={700} fontSize="14px">
          Weekly Stats
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <StatChip label="Required hours: 4h, Om" />
        <StatChip label="Booked hours: 4h, Om" />
        <StatChip label="Appointments: 1" />
        <StatChip label="Carers working this week: 1" />
      </Box>

      {/* Visit Detail Modal */}
      <VisitDetailModal
        key={selectedVisit?.id ?? "none"}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        client={client}
        visit={
          selectedVisit
            ? {
                start: visitStart,
                end: visitEnd,
                carer1: selectedVisit.appointment.carer1,
                carer2: selectedVisit.appointment.carer2,
              }
            : undefined
        }
      />
    </Box>
  );
}

function VisitCard({ visit, clientName, onClick }) {
  return (
    <AppointmentTooltip appointment={{ client: clientName, ...visit.appointment }}>
      <Box
        role="button"
        tabIndex={0}
        aria-label={`${visit.appointment.carer1}, ${visit.appointment.time}. Open visit details`}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
        sx={{
          p: 1.25,
          borderRadius: "10px",
          border: `1px solid ${visit.borderColor}`,
          borderLeft: `4px solid ${visit.dotColor}`,
          bgcolor: visit.color,
          width: "100%",
          cursor: "pointer",
          transition: "box-shadow 0.2s ease",
          boxShadow: "0 2px 6px rgba(15,23,42,0.06)",
          "&:hover, &:focus-visible": {
            boxShadow: "0 6px 16px rgba(15,23,42,0.12)",
            outline: "none",
          },
        }}
      >
        <Typography fontSize="11px" fontWeight={700} color={visit.titleColor} noWrap>
          {visit.name}
        </Typography>
        <Typography fontSize="10px" fontWeight={500} color="text.light" sx={{ mb: 1 }}>
          {visit.time}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Box sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: visit.dotColor }} />
          <Typography
            fontSize="8px"
            fontWeight={700}
            color={visit.titleColor}
            noWrap
            sx={{ letterSpacing: 0.5 }}
          >
            {visit.status}
          </Typography>
        </Box>
      </Box>
    </AppointmentTooltip>
  );
}

function StatChip({ label }) {
  const [text, value] = label.split(": ");
  return (
    <Paper
      elevation={0}
      sx={{
        px: 2,
        py: 1,
        borderRadius: "10px",
        border: "1px solid #E2E8F0",
        bgcolor: "#fff",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Typography fontSize="12px" fontWeight={600} color="text.light">
        {text}:{" "}
        <Box component="span" sx={{ color: "primary.main", fontWeight: 700 }}>
          {value}
        </Box>
      </Typography>
    </Paper>
  );
}
