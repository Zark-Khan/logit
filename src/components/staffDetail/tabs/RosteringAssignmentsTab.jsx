import React from "react";
import { Box, Typography, Button, Tooltip } from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import AddIcon from "@mui/icons-material/Add";

const TopStat = ({ icon, label, value, iconBg, iconColor }) => (
  <Box
    sx={{
      flex: 1,
      minWidth: 150,
      bgcolor: "#fff",
      borderRadius: "12px",
      px: 2,
      py: 1.5,
      display: "flex",
      alignItems: "center",
      gap: 1.5,
    }}
  >
    <Box
      sx={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        bgcolor: iconBg,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {React.cloneElement(icon, { sx: { color: iconColor, fontSize: 18 } })}
    </Box>
    <Box>
      <Typography
        fontSize="9px"
        fontWeight={700}
        color="text.light"
        textTransform="uppercase"
      >
        {label}
      </Typography>
      <Typography fontSize="16px" fontWeight={700} color="text.primary">
        {value}
      </Typography>
    </Box>
  </Box>
);

const SummaryCard = ({ title, icon, rows }) => (
  <Box sx={{ flex: 1, minWidth: 260 }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
      {React.cloneElement(icon, {
        sx: { fontSize: 14, color: "text.secondary" },
      })}
      <Typography
        fontSize="10px"
        fontWeight={700}
        color="text.secondary"
        textTransform="uppercase"
      >
        {title}
      </Typography>
    </Box>
    <Box sx={{ bgcolor: "#fff", borderRadius: "12px", p: 2 }}>
      {rows.map((row, i) => (
        <Box
          key={i}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: i === rows.length - 1 ? 0 : 1.2,
          }}
        >
          <Typography fontSize="12px" color="text.secondary" fontWeight={400}>
            {row.label}
          </Typography>
          <Typography
            fontSize="12px"
            fontWeight={700}
            color={row.color || "text.primary"}
          >
            {row.value}
          </Typography>
        </Box>
      ))}
    </Box>
  </Box>
);

const EVENT_VARIANTS = {
  green: {
    bgcolor: "#DCFCE7",
    border: "1px solid #86EFAC",
    title: "#166534",
    text: "#16A34A",
  },
  grey: {
    bgcolor: "#F1F5F9",
    border: "1px solid #94A3B8",
    title: "text.primary",
    text: "text.secondary",
  },
};

// Mock roster: dayIdx/colIdx position each shift in the week grid
const ROSTER_EVENTS = [
  {
    id: 1,
    dayIdx: 0,
    colIdx: 1,
    carer: "Sarah Thompson",
    time: "08:00 - 09:15",
    tag: "MORNING CALL",
    variant: "green",
    appointment: {
      client: "Margaret Hall",
      address: "35 Muirhead Lane, London, SE15 3TR",
      phone: "07495879485",
      time: "08:00 - 09:15",
      duration: "1 hour 15 mins",
      carer1: "Sarah Thompson",
      carer2: "Ruth Omoregie",
    },
  },
  {
    id: 2,
    dayIdx: 2,
    colIdx: 2,
    carer: "James Wilson",
    time: "10:00 - 11:15",
    tag: "MEDICATION",
    variant: "grey",
    appointment: {
      client: "Arthur Bennett",
      address: "12 Elm Grove, London, SE22 8PL",
      phone: "07700900412",
      time: "10:00 - 11:15",
      duration: "1 hour 15 mins",
      carer1: "James Wilson",
      carer2: "Sarah Thompson",
    },
  },
];

const AppointmentCard = ({ appointment }) => (
  <Box sx={{ width: 220, p: 1 }}>
    <Typography fontSize="14px" fontWeight={700} color="#0EA5E9" mb={2}>
      Appointment
    </Typography>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      {[
        { label: "Client:", value: appointment.client },
        { label: "Address:", value: appointment.address },
        { label: "Phone:", value: appointment.phone },
        { label: "Time:", value: appointment.time },
        { label: "Duration:", value: appointment.duration },
        { label: "Carer 1:", value: appointment.carer1 },
        { label: "Carer 2:", value: appointment.carer2 },
      ].map((item) => (
        <Box key={item.label} sx={{ display: "flex", alignItems: "flex-start" }}>
          <Typography fontSize="11px" color="text.light" sx={{ width: 80 }}>
            {item.label}
          </Typography>
          <Typography
            fontSize="11px"
            fontWeight={700}
            color="text.primary"
            sx={{ flex: 1 }}
          >
            {item.value}
          </Typography>
        </Box>
      ))}
    </Box>
  </Box>
);

const RosterEvent = ({ event }) => {
  const v = EVENT_VARIANTS[event.variant];
  return (
    <Tooltip
      title={<AppointmentCard appointment={event.appointment} />}
      placement="top"
      arrow
      enterDelay={100}
      slotProps={{
        tooltip: {
          sx: {
            bgcolor: "#fff",
            color: "text.primary",
            borderRadius: "12px",
            boxShadow: "0px 10px 40px rgba(0,0,0,0.12)",
            p: 1.5,
            maxWidth: "none",
          },
        },
        arrow: { sx: { color: "#fff" } },
      }}
    >
      <Box
        sx={{
          width: "95%",
          height: "80%",
          bgcolor: v.bgcolor,
          border: v.border,
          borderRadius: "6px",
          p: 0.8,
          display: "flex",
          flexDirection: "column",
          gap: 0.3,
          minWidth: 0,
          cursor: "pointer",
          transition: "box-shadow 0.15s ease",
          "&:hover": { boxShadow: "0 4px 12px rgba(15,23,42,0.12)" },
        }}
      >
        <Typography fontSize="10px" fontWeight={700} color={v.title} noWrap>
          {event.carer}
        </Typography>
        <Typography fontSize="9px" color={v.text} noWrap>
          {event.time}
        </Typography>
        <Typography
          fontSize="8px"
          fontWeight={700}
          color={v.text}
          noWrap
          sx={{ mt: "auto" }}
        >
          • {event.tag}
        </Typography>
      </Box>
    </Tooltip>
  );
};

export default function RosteringAssignmentsTab({ staff }) {
  const columns = ["00:00 - 07:00", "08:00", " ", "12:00", "13:00", " "];
  const days = [
    { name: "Monday 16th", date: "Mar 2026" },
    { name: "Tuesday 17th", date: "Mar 2026" },
    { name: "Wednesday 18th", date: "Mar 2026" },
    { name: "Thursday 19th", date: "Mar 2026" },
    { name: "Friday 20th", date: "Mar 2026" },
    { name: "Saturday 21st", date: "Mar 2026" },
    { name: "Sunday 22nd", date: "Mar 2026" },
  ];

  return (
    <Box>
      {/* Top Heading */}
      <Typography
        fontSize="20px"
        fontWeight={700}
        color="text.primary"
        mb={0.4}
      >
        Rostering & Assignments
      </Typography>
      <Typography fontSize="14px" color="text.light" mb={3.5}>
        Detailed information and settings for {staff.name}'s rostering &
        assignments.
      </Typography>

      {/* Top 4 Stats */}
      <Box sx={{ display: "flex", gap: 1.5, mb: 4, flexWrap: "wrap" }}>
        <TopStat
          icon={<AccessTimeOutlinedIcon />}
          label="Total Hours"
          value="38.5h"
          iconBg="#E0F2FE"
          iconColor="#0EA5E9"
        />
        <TopStat
          icon={<CalendarTodayOutlinedIcon />}
          label="Visits"
          value="14"
          iconBg="#DCFCE7"
          iconColor="#16A34A"
        />
        <TopStat
          icon={<LocationOnOutlinedIcon />}
          label="Travel Time"
          value="4.2h"
          iconBg="#FFEDD5"
          iconColor="#F59E0B"
        />
        <TopStat
          icon={<ReportProblemOutlinedIcon />}
          label="Conflicts"
          value="0"
          iconBg="#FEE2E2"
          iconColor="#EF4444"
        />
      </Box>

      {/* Weekly Roster */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1.5,
        }}
      >
        <Typography fontSize="16px" fontWeight={700} color="text.primary">
          Weekly Roster
        </Typography>
        <Button
          startIcon={<AddIcon sx={{ fontSize: 16 }} />}
          sx={{
            bgcolor: "#8AC642",
            color: "#fff",
            fontWeight: 700,
            fontSize: "12px",
            textTransform: "none",
            borderRadius: "8px",
            px: 2,
            py: 0.8,
            "&:hover": { bgcolor: "#79b038" },
          }}
        >
          New Assignment
        </Button>
      </Box>

      {/* Custom Grid Calendar */}
      <Box
        sx={{
          bgcolor: "#fff",
          borderRadius: "12px",
          border: "1px solid #E2E8F0",
          overflow: "hidden",
          position: "relative",
          mb: 4,
        }}
      >
        <Box sx={{ display: "flex", borderBottom: "1px solid #E2E8F0" }}>
          <Box
            sx={{
              width: 140,
              p: 2,
              display: "flex",
              alignItems: "center",
              borderRight: "1px solid #E2E8F0",
            }}
          >
            <Typography
              fontSize="9px"
              fontWeight={700}
              color="text.secondary"
              textTransform="uppercase"
            >
              Week View
            </Typography>
          </Box>
          {columns.map((col, i) => (
            <Box
              key={i}
              sx={{
                flex: 1,
                p: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRight:
                  i !== columns.length - 1 ? "1px solid #E2E8F0" : "none",
              }}
            >
              <Typography fontSize="9px" fontWeight={700} color="text.primary">
                {col}
              </Typography>
            </Box>
          ))}
        </Box>

        {days.map((day, dIdx) => (
          <Box
            key={dIdx}
            sx={{
              display: "flex",
              borderBottom:
                dIdx !== days.length - 1 ? "1px solid #E2E8F0" : "none",
              height: 90,
            }}
          >
            {/* Row Header */}
            <Box
              sx={{
                width: 140,
                p: 2,
                borderRight: "1px solid #E2E8F0",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography fontSize="12px" fontWeight={700} color="text.primary">
                {day.name}
              </Typography>
              <Typography fontSize="10px" color="text.light">
                {day.date}
              </Typography>
            </Box>

            {/* Cells */}
            {columns.map((col, cIdx) => {
              const event = ROSTER_EVENTS.find(
                (e) => e.dayIdx === dIdx && e.colIdx === cIdx,
              );

              return (
                <Box
                  key={cIdx}
                  sx={{
                    flex: 1,
                    borderRight:
                      cIdx !== columns.length - 1
                        ? "1px solid #E2E8F0"
                        : "none",
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {event && <RosterEvent event={event} />}
                </Box>
              );
            })}
          </Box>
        ))}
      </Box>

      {/* Bottom Summary Cards */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
        <SummaryCard
          title="Carer Hours Requested"
          icon={<AccessTimeOutlinedIcon />}
          rows={[
            { label: "Maximum hours per week", value: "40" },
            { label: "Minimum hours per week", value: "40" },
            { label: "Maximum evenings per week", value: "No limit" },
          ]}
        />
        <SummaryCard
          title="Carer Hours Assigned"
          icon={<CalendarTodayOutlinedIcon />}
          rows={[
            {
              label: "Carer hours this week",
              value: "23:00",
              color: "#16A34A",
            },
            { label: "Carer evenings this week", value: "6", color: "#16A34A" },
          ]}
        />
        <SummaryCard
          title="Planned Travel Time and Distance"
          icon={<LocationOnOutlinedIcon />}
          rows={[
            {
              label: "Travel time for this week",
              value: "43h, 8m",
              color: "text.primary",
            },
            {
              label: "Payable travel time",
              value: "0h, 0m",
              color: "text.primary",
            },
            {
              label: "Travel mileage",
              value: "1784.48 miles",
              color: "text.primary",
            },
            {
              label: "Payable travel mileage",
              value: "0 miles",
              color: "text.primary",
            },
            { label: "Waiting time", value: "0h, 10m", color: "text.primary" },
          ]}
        />
      </Box>
    </Box>
  );
}
