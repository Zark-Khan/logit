import React, { useState } from "react";
import {
  Box, Typography, Avatar, Button, Paper,
  InputAdornment, TextField,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ROW_BORDER, HEADER_BORDER, TABLE_BG } from "./StaffTableStyles";

const staffRows = [
  {
    id: 1,
    name: "Sarah Thompson",
    role: "Carer",
    todayStatus: "FULLY OCCUPIED",
    weeklyDays: [true, true, true, true, false, false, false],
    workloadHours: 40,
    workloadMax: 40,
    nextAvailable: "Tomorrow, 08:00",
  },
  {
    id: 2,
    name: "James Wilson",
    role: "Nurse",
    todayStatus: "AVAILABLE",
    weeklyDays: [true, true, false, true, true, false, false],
    workloadHours: 35,
    workloadMax: 40,
    nextAvailable: "Tomorrow, 08:00",
  },
  {
    id: 3,
    name: "Emily Barker",
    role: "Supervisor",
    todayStatus: "AVAILABLE",
    weeklyDays: [true, false, true, true, false, false, false],
    workloadHours: 35,
    workloadMax: 40,
    nextAvailable: "Tomorrow, 08:00",
  },
  {
    id: 4,
    name: "Michael Chen",
    role: "Carer",
    todayStatus: "AVAILABLE",
    weeklyDays: [true, true, true, false, true, false, false],
    workloadHours: 35,
    workloadMax: 40,
    nextAvailable: "Tomorrow, 08:00",
  },
];

const AVATAR_COLORS = {
  1: "linear-gradient(135deg,#7c3aed,#a78bfa)",
  2: "linear-gradient(135deg,#059669,#34d399)",
  3: "linear-gradient(135deg,#ea580c,#fb923c)",
  4: "linear-gradient(135deg,#2563eb,#60a5fa)",
};

const TODAY_STATUS_STYLES = {
  "FULLY OCCUPIED": { color: "#0EA5E9", fontWeight: 700 },
  "AVAILABLE":      { color: "#22c55e", fontWeight: 700 },
};

const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

function WeeklyCoverage({ days }) {
  return (
    <Box sx={{ display: "flex", gap: 0.4, alignItems: "center" }}>
      {days.map((active, i) => (
        <Box
          key={i}
          sx={{
            width: 22, height: 22, borderRadius: "5px",
            bgcolor: active ? "rgba(14,165,233,0.18)" : "rgba(0,0,0,0.05)",
            border: active ? "1.5px solid rgba(14,165,233,0.5)" : "1.5px solid rgba(0,0,0,0.08)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <Typography sx={{ fontSize: "0.55rem", fontWeight: 700, color: active ? "#0EA5E9" : "#94a3b8" }}>
            {DAY_LABELS[i]}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

function WorkloadBar({ hours, max }) {
  const pct = Math.min(hours / max, 1) * 100;
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, minWidth: 120 }}>
      <Box sx={{ flex: 1, height: 7, borderRadius: 4, bgcolor: "rgba(0,0,0,0.07)", overflow: "hidden" }}>
        <Box sx={{ width: `${pct}%`, height: "100%", borderRadius: 4, bgcolor: "#f97316", transition: "width 0.4s ease" }} />
      </Box>
      <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748b", minWidth: 28 }}>
        {hours}h
      </Typography>
    </Box>
  );
}

export default function WorkforceAvailabilityTable() {
  const [search, setSearch] = useState("");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const filtered = staffRows.filter((r) => {
    const matchSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.role.toLowerCase().includes(search.toLowerCase());
    const matchAvail = !showAvailableOnly || r.todayStatus === "AVAILABLE";
    return matchSearch && matchAvail;
  });

  return (
    <Paper elevation={0} sx={{ border: HEADER_BORDER, borderRadius: 4, overflow: "hidden" }}>
      <Box sx={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        px: 2.5, py: 1.6, bgcolor: TABLE_BG, flexWrap: "wrap", gap: 1.5,
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: "text.primary", whiteSpace: "nowrap" }}>
            Workforce Availability
          </Typography>
          <TextField
            size="small"
            placeholder="Search staff..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3, fontSize: "0.78rem",
                bgcolor: "background.paper", height: 32,
              },
              width: 200,
            }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 1.2 }}>
          <Button
            size="small"
            variant={showAvailableOnly ? "contained" : "outlined"}
            onClick={() => setShowAvailableOnly((v) => !v)}
            sx={{
              borderRadius: 2, textTransform: "none", fontSize: "0.72rem", fontWeight: 700,
              py: 0.5, px: 1.6, height: 32,
              ...(showAvailableOnly
                ? { bgcolor: "#0EA5E9", color: "#fff", "&:hover": { bgcolor: "#0284c7" } }
                : { borderColor: "rgba(14,165,233,0.4)", color: "#0EA5E9",
                    "&:hover": { borderColor: "#0EA5E9", bgcolor: "rgba(14,165,233,0.06)" } }),
            }}
          >
            Show Available Only
          </Button>
          <Button
            size="small"
            variant="outlined"
            sx={{
              borderRadius: 2, textTransform: "none", fontSize: "0.72rem", fontWeight: 700,
              py: 0.5, px: 1.6, height: 32,
              borderColor: "rgba(14,165,233,0.4)", color: "#0EA5E9",
              "&:hover": { borderColor: "#0EA5E9", bgcolor: "rgba(14,165,233,0.06)" },
            }}
          >
            Select Date Range
          </Button>
        </Box>
      </Box>

      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {["Staff Member", "Today's Status", "Weekly Coverage", "Workload", "Next Available", ""].map((h) => (
                <TableCell key={h} sx={{
                  bgcolor: "background.paper", fontSize: "0.65rem", fontWeight: 700,
                  color: "text.secondary", textTransform: "uppercase", letterSpacing: 0.5,
                  borderBottom: ROW_BORDER, whiteSpace: "nowrap", py: 1.5,
                }}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody sx={{ backgroundColor: TABLE_BG }}>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 5, border: "none" }}>
                  <Typography color="text.secondary" fontSize="0.88rem">No staff members found.</Typography>
                </TableCell>
              </TableRow>
            ) : filtered.map((row) => (
              <TableRow key={row.id} sx={{
                "&:hover": { bgcolor: "rgba(115,211,255,0.08)" },
                transition: "background 0.15s ease",
                "&:last-child td, &:last-child th": { border: "none" },
              }}>
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.4 }}>
                    <Avatar sx={{ width: 36, height: 36, fontSize: "0.82rem", backgroundImage: AVATAR_COLORS[row.id] }}>
                      {row.name[0]}
                    </Avatar>
                    <Box>
                      <Typography fontWeight={700} fontSize="0.85rem" color="text.primary">{row.name}</Typography>
                      <Typography fontSize="0.68rem" color="text.secondary">{row.role}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  <Typography sx={{ fontSize: "0.72rem", ...(TODAY_STATUS_STYLES[row.todayStatus] ?? { color: "#64748b", fontWeight: 600 }) }}>
                    {row.todayStatus}
                  </Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  <WeeklyCoverage days={row.weeklyDays} />
                </TableCell>
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  <WorkloadBar hours={row.workloadHours} max={row.workloadMax} />
                </TableCell>
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  <Typography fontSize="0.78rem" color="text.secondary" whiteSpace="nowrap">
                    {row.nextAvailable}
                  </Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  <Button size="small" variant="text" sx={{
                    borderRadius: 1.5, textTransform: "none", fontSize: "0.7rem", fontWeight: 700,
                    py: 0.3, px: 1.2, color: "#0EA5E9",
                    "&:hover": { bgcolor: "rgba(14,165,233,0.08)" },
                    whiteSpace: "nowrap",
                  }}>ASSIGN SHIFT</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
