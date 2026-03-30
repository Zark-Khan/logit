import React, { useState } from "react";
import {
  Box, Typography, Avatar, Button, Paper, Chip,
  InputAdornment, TextField,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ROW_BORDER, HEADER_BORDER, TABLE_BG } from "./StaffTableStyles";

const timesheetRows = [
  { id: 1, name: "Sarah Thompson", initial: "S", plannedHrs: "37.5h", actualHrs: "35.2h", overtime: "0h", discrepancy: "HOURS NOT COMPLETED", status: "PENDING" },
  { id: 2, name: "James Wilson",   initial: "J", plannedHrs: "37.5h", actualHrs: "39.2h", overtime: "1.7h", discrepancy: "-",                   status: "APPROVED" },
  { id: 3, name: "Emily Barker",   initial: "E", plannedHrs: "33.5h", actualHrs: "32.2h", overtime: "0h", discrepancy: "HOURS NOT COMPLETED", status: "PENDING" },
  { id: 4, name: "Michael Chen",   initial: "M", plannedHrs: "37.5h", actualHrs: "39.2h", overtime: "1.7h", discrepancy: "-",                   status: "APPROVED" },
];

const DISCREPANCY_STYLES = {
  "HOURS NOT COMPLETED": { bg: "#fee2e2", color: "#dc2626", border: "1px solid #fca5a5" },
  "-":                   { bg: "#f1f5f9", color: "#94a3b8", border: "1px solid #e2e8f0" },
};

const STATUS_STYLES = {
  "PENDING":  { dot: "#f97316", color: "#ea580c" },
  "APPROVED": { dot: "#22c55e", color: "#16a34a" },
};

export default function TimesheetReviewTable() {
  const [search,     setSearch]     = useState("");
  const [viewMode,   setViewMode]   = useState("WEEKLY");

  const filtered = timesheetRows.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Paper elevation={0} sx={{ border: HEADER_BORDER, borderRadius: 4, overflow: "hidden" }}>
      <Box sx={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        px: 2.5, py: 1.6, bgcolor: TABLE_BG, flexWrap: "wrap", gap: 1.5,
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: "text.primary", whiteSpace: "nowrap" }}>
            Timesheet Review
          </Typography>
          <TextField
            size="small"
            placeholder="Search staff name..."
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
              "& .MuiOutlinedInput-root": { borderRadius: 3, fontSize: "0.78rem", bgcolor: "background.paper", height: 32 },
              width: 200,
            }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 0.8 }}>
          {["DAILY", "WEEKLY", "PAY PERIOD"].map((mode) => (
            <Button
              key={mode}
              size="small"
              variant={viewMode === mode ? "contained" : "outlined"}
              onClick={() => setViewMode(mode)}
              sx={{
                borderRadius: 2, textTransform: "none", fontSize: "0.7rem", fontWeight: 700,
                py: 0.4, px: 1.4, height: 30,
                ...(viewMode === mode
                  ? { bgcolor: "#0EA5E9", color: "#fff", boxShadow: "none", "&:hover": { bgcolor: "#0284c7" } }
                  : { borderColor: "rgba(14,165,233,0.3)", color: "#64748b",
                      "&:hover": { borderColor: "#0EA5E9", color: "#0EA5E9", bgcolor: "rgba(14,165,233,0.04)" } }),
              }}
            >
              {mode}
            </Button>
          ))}
        </Box>
      </Box>

      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {["Staff Member", "Planned Hrs", "Actual Hrs", "Overtime", "Discrepancy", "Status", ""].map((h) => (
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
                <TableCell colSpan={7} align="center" sx={{ py: 5, border: "none" }}>
                  <Typography color="text.secondary" fontSize="0.88rem">No records found.</Typography>
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
                    <Avatar sx={{
                      width: 32, height: 32, fontSize: "0.75rem", fontWeight: 700,
                      bgcolor: "rgba(14,165,233,0.12)", color: "#0EA5E9",
                      border: "1.5px solid rgba(14,165,233,0.25)",
                    }}>
                      {row.initial}
                    </Avatar>
                    <Typography fontWeight={700} fontSize="0.85rem" color="text.primary">{row.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  <Typography fontSize="0.82rem" color="text.secondary">{row.plannedHrs}</Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  <Typography fontSize="0.82rem" fontWeight={700} color="text.primary">{row.actualHrs}</Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  <Typography fontSize="0.82rem" fontWeight={700} color="#f97316">{row.overtime}</Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  {(() => {
                    const s = DISCREPANCY_STYLES[row.discrepancy] ?? DISCREPANCY_STYLES["-"];
                    return (
                      <Chip
                        label={row.discrepancy}
                        size="small"
                        sx={{
                          bgcolor: s.bg, color: s.color, border: s.border,
                          fontWeight: 700, fontSize: "0.6rem", height: 22, borderRadius: 1.5,
                        }}
                      />
                    );
                  })()}
                </TableCell>
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  {(() => {
                    const s = STATUS_STYLES[row.status] ?? STATUS_STYLES["PENDING"];
                    return (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.7 }}>
                        <Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: s.dot }} />
                        <Typography fontSize="0.75rem" fontWeight={700} color={s.color}>{row.status}</Typography>
                      </Box>
                    );
                  })()}
                </TableCell>
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  <Button size="small" variant="outlined" sx={{
                    borderRadius: 2, textTransform: "none", fontSize: "0.68rem", fontWeight: 700,
                    py: 0.3, px: 1.4, borderColor: "rgba(14,165,233,0.35)", color: "#0EA5E9",
                    "&:hover": { borderColor: "#0EA5E9", bgcolor: "rgba(14,165,233,0.06)" },
                  }}>REVIEW</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        px: 2.5, py: 1.4, bgcolor: TABLE_BG, borderTop: ROW_BORDER,
      }}>
        <Typography fontSize="0.75rem" color="text.secondary">
          Showing {filtered.length} records for current pay cycle
        </Typography>
        <Button
          variant="contained"
          size="small"
          sx={{
            borderRadius: 2.5, textTransform: "none", fontSize: "0.72rem", fontWeight: 700,
            py: 0.8, px: 2.2, bgcolor: "#8AC642", color: "#fff", boxShadow: "none",
            "&:hover": { bgcolor: "#76ad34", boxShadow: "none" },
          }}
        >
          APPROVE ALL BULK
        </Button>
      </Box>
    </Paper>
  );
}
