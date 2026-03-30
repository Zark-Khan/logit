import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// ─── Incoming Messages ────────────────────────────────────────────────────────
const MESSAGES = [
  { initial: "C", title: "Carer: Sarah", body: "Arrived at John J.", time: "5 mins ago" },
  { initial: "S", title: "System",       body: "New application received", time: "1 hour ago" },
];

export function IncomingMessages() {
  return (
    <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: "1px solid #FEA5006E", height: "100%",width:"100%", backgroundColor:"#FFEDD566" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
        <Typography variant="h6" fontWeight={700}>Incoming Messages</Typography>
        <Box sx={{
          backgroundColor: "#FEA500", color: "text.paper",
          fontSize: "10px", fontWeight: 700, px: 1, py: 0.3,
          borderRadius: 6
        }}>
          3 NEW ALERTS
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        {MESSAGES.map(({ initial, color, title, body, time }) => (
          <Box
            key={title}
            sx={{
              display: "flex", alignItems: "center", gap: 1.5,
              p: 1.2, borderRadius: 2, cursor: "pointer",
              "&:hover": { backgroundColor: "#FAFBFC" },
              transition: "background 0.15s",
            }}
          >
            <Box sx={{
              width: 32, height: 32, borderRadius: "50%",
              backgroundColor: "background.default", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "12px", fontWeight: 700,
              color: "#84919A"
            }}>
              {initial}
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" fontWeight={700}>{title}</Typography>
              <Typography variant="body2" color="text.light"
                sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {body}
              </Typography>
              <Typography color="text.disabled" sx={{ fontSize: "10px" }}>
                {time}
              </Typography>
            </Box>
            <ChevronRightIcon fontSize="small" sx={{ color: "primary.main" }} />
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

// ─── Compliance Status ────────────────────────────────────────────────────────
const COMPLIANCE = [
  { label: "Staff",   value: 92 },
  { label: "Clients", value: 88 },
  { label: "Safety",  value: 98 },
];

const DONUT_DATA = [
  { name: "Staff",   value: 92,  color: "#8AC642",  },
  { name: "Clients", value:10,  color: "#EF4444" },
  { name: "Safety",  value: 15,  color: "#FEA500" },
];

export function ComplianceStatus() {
  return (
    <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: "1px solid #5289103D", height: "100%", backgroundColor:"#DCFCE78C", width:"100%"}}>
      <Typography variant="h6" fontWeight={700} mb={1}>Compliance Status</Typography>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
        <ResponsiveContainer width={130} height={130}>
          <PieChart>
            <Pie
              data={DONUT_DATA}
              cx="50%" cy="50%"
              innerRadius={45} outerRadius={65}
              dataKey="value"
              startAngle={90} endAngle={-270}
              strokeWidth={4}
              stroke="#DCFCE7"
            >
              {DONUT_DATA.map(({ color }, i) => (
                <Cell key={i} fill={color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-around", mt: 1 }}>
        {COMPLIANCE.map(({ label, value }) => (
          <Box key={label} sx={{ textAlign: "center" }}>
            <Typography color="text.light"
              sx={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 500 }}>
              {label}
            </Typography>
            <Typography variant="body1" fontWeight={700} sx={{ color:"text.primary" }}>
              {value}%
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

// ─── Upcoming Deadlines ───────────────────────────────────────────────────────
const DEADLINES = [
  { label: "DBS Renewals",     count: 4,  color: "#F97316", bg: "#FFF7ED" },
  { label: "Risk Assessments", count: 2,  color: "#0EA5E9", bg: "#F0F9FF" },
  { label: "Training Expiry",  count: 12, color: "#EF4444", bg: "#FEF2F2" },
];

export function UpcomingDeadlines() {
  return (
    <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: "1px solid #84919A54", height: "100%", backgroundColor:"#E2E8F045" }}>
      <Typography variant="body1" fontWeight={600} mb={1}>Upcoming Deadlines</Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
        {DEADLINES.map(({ label, count, color, bg }) => (
          <Box
            key={label}
            sx={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              p: 1.5, borderRadius: 3, border: "1px solid #9CA3AF30",backgroundColor: "background.default",
              "&:hover": { backgroundColor: "background.default" }, cursor: "pointer",
              transition: "background 0.15s"
            }}
          >
            <Typography variant="body2" fontWeight={600}>{label}</Typography>
            <Box sx={{
              backgroundColor: bg, color, fontSize: "10px", borderRadius:6 ,
              fontWeight: 700, px: 1.2, py: 0.3, display:"flex", alignItems:"center", justifyContent:"center" }}>
              {count} Actions
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
