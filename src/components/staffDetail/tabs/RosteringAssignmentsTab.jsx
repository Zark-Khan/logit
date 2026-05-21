import React from "react";
import { Box, Typography, Button } from "@mui/material";
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

const AppointmentPopover = () => (
  <Box
    sx={{
      position: "absolute",
      top: 100, // adjust these coordinates based on the UI layout to float it
      left: "40%",
      bgcolor: "#fff",
      boxShadow: "0px 10px 40px rgba(0,0,0,0.08)",
      borderRadius: "12px",
      width: 260,
      p: 2.5,
      zIndex: 10,
    }}
  >
    <Typography fontSize="14px" fontWeight={700} color="#0EA5E9" mb={2}>
      Appointment
    </Typography>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      {[
        { label: "Client:", value: "Margaret Hall" },
        { label: "Address:", value: "35 Muirhead Lane, London, SE15 3TR" },
        { label: "Phone:", value: "07495879485" },
        { label: "Time:", value: "09:00 - 10:00" },
        { label: "Duration:", value: "1 hour" },
        { label: "Carer 1:", value: "James Wilson" },
        { label: "Carer 2:", value: "Ruth Omoregie" },
      ].map((item, i) => (
        <Box key={i} sx={{ display: "flex", alignItems: "flex-start" }}>
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
    {/* Small pointer triangle on bottom */}
    <Box
      sx={{
        position: "absolute",
        bottom: -6,
        left: "50%",
        transform: "translateX(-50%) rotate(45deg)",
        width: 12,
        height: 12,
        bgcolor: "#fff",
      }}
    />
  </Box>
);

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
        <AppointmentPopover />

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
              let eventContent = null;
              if (dIdx === 0 && cIdx === 1) {
                eventContent = (
                  <Box
                    sx={{
                      width: "95%",
                      height: "80%",
                      bgcolor: "#DCFCE7",
                      border: "1px solid #86EFAC",
                      borderRadius: "6px",
                      p: 0.8,
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.3,
                    }}
                  >
                    <Typography
                      fontSize="10px"
                      fontWeight={700}
                      color="#166534"
                    >
                      Sarah Th...
                    </Typography>
                    <Typography fontSize="9px" color="#16A34A">
                      08:00 - 09:15
                    </Typography>
                    <Typography
                      fontSize="8px"
                      fontWeight={700}
                      color="#16A34A"
                      sx={{ mt: "auto" }}
                    >
                      • MORNING...
                    </Typography>
                  </Box>
                );
              } else if (dIdx === 2 && cIdx === 2) {
                // Wednesday, col 3 " "
                eventContent = (
                  <Box
                    sx={{
                      width: "100%",
                      height: "80%",
                      bgcolor: "#F1F5F9",
                      border: "1px solid #94A3B8",
                      borderRadius: "6px",
                      p: 0.8,
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.3,
                    }}
                  >
                    <Typography
                      fontSize="10px"
                      fontWeight={700}
                      color="text.primary"
                    >
                      James Wilson
                    </Typography>
                    <Typography fontSize="9px" color="text.secondary">
                      10:00 - 11:15
                    </Typography>
                    <Typography
                      fontSize="8px"
                      fontWeight={700}
                      color="text.secondary"
                      sx={{ mt: "auto" }}
                    >
                      • MEDICATION
                    </Typography>
                  </Box>
                );
              }

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
                  {eventContent}
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
