import React, { useState } from "react";
import {
  Box, Typography, Avatar, Button, Paper, Chip,
  InputAdornment, TextField,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ROW_BORDER, HEADER_BORDER, TABLE_BG, searchFieldSx, tableHeaderSx } from "./StaffTableStyles";

const timesheetRows = [
  { id: 1, name: "Sarah Thompson", initial: "S", plannedHrs: "37.5h", actualHrs: "35.2h", overtime: "0h", discrepancy: "HOURS NOT COMPLETED", status: "PENDING" },
  { id: 2, name: "James Wilson",   initial: "J", plannedHrs: "37.5h", actualHrs: "39.2h", overtime: "1.7h", discrepancy: "-",                   status: "APPROVED" },
  { id: 3, name: "Emily Barker",   initial: "E", plannedHrs: "33.5h", actualHrs: "32.2h", overtime: "0h", discrepancy: "HOURS NOT COMPLETED", status: "PENDING" },
  { id: 4, name: "Michael Chen",   initial: "M", plannedHrs: "37.5h", actualHrs: "39.2h", overtime: "1.7h", discrepancy: "-",                   status: "APPROVED" },
];

const DISCREPANCY_STYLES = {
  "HOURS NOT COMPLETED": { bg: "#FFEFEF", color: "#EF4444", border: "0.5px solid #FFCACA" },
  "-":                   { bg: "#FFEFEF", color: "#EF4444", border: "0.5px solid #FFCACA" },
};

const STATUS_STYLES = {
  "PENDING":  { color: "#FB923C" },
  "APPROVED": { color: "#528910" },
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
          <Typography sx={{ fontWeight: 700, fontSize: "14px", color: "text.primary", whiteSpace: "nowrap" }}>
            Timesheet Review
          </Typography>
          <TextField
            size="small"
            placeholder="Search staff name"
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
              ...searchFieldSx,
              width: 256,
            }}
          />
        </Box>

        <Box sx={{ 
          display: "flex", 
          p: "2px", 
          bgcolor: "background.paper", 
          border: "1px solid #E2E8F0", 
          borderRadius: 2, 
          gap: 0.5 
        }}>
          {["DAILY", "WEEKLY", "PAY PERIOD"].map((mode) => (
            <Button
              key={mode}
              size="small"
              onClick={() => setViewMode(mode)}
              sx={{
                borderRadius: 1.5,
                textTransform: "none",
                fontWeight: 700,
                height: 28,
                px: 2,
                minWidth: "auto",
                ...(viewMode === mode
                  ? { 
                      bgcolor: "primary.main", 
                      color: "text.paper", 
                      fontSize: "8px", 
                      boxShadow: "none",
                      "&:hover": { bgcolor: "primary.main" } 
                    }
                  : { 
                      color: "text.grey", 
                      fontSize: "10px", 
                      "&:hover": { bgcolor: "rgba(0,0,0,0.04)" } 
                    }),
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
                <TableCell key={h} sx={tableHeaderSx}>
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
                      <Avatar
                                          sx={{
                                            width: 32,
                                            height: 32,
                                            fontSize: "12px",
                                            bgcolor: "text.paper",
                                            fontWeight:700,
                                            color:"text.primary"
                                          }}
                                        >
                                          {row.initial}
                                        </Avatar>
                     <Typography
                                            fontWeight={600}
                                            fontSize="body1"
                                            color="text.primary"
                                          >
                                            {row.name}
                                          </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  <Typography fontSize="14px" fontWeight={500} color="text.light">{row.plannedHrs}</Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  <Typography fontSize="14px" fontWeight={700} color="text.primary">{row.actualHrs}</Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  <Typography fontSize="14px" fontWeight={600} color="#F97316">{row.overtime}</Typography>
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
                          fontWeight: 700, fontSize: "10px", height: 21.6, borderRadius: 1,
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
                        <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: s.color }} />
                        <Typography fontSize="10px" fontWeight={700} color={s.color}>{row.status}</Typography>
                      </Box>
                    );
                  })()}
                </TableCell>
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  <Button size="small" variant="outlined" sx={{
                    borderRadius: 2, textTransform: "none", fontSize: "10px", fontWeight: 700,
                    py: 0.3, px: 1.4, borderColor: "#E2E8F0", color: "primary.main", backgroundColor:"background.default",
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
        px: 2.5, py: 2, bgcolor: "background.default", borderTop: ROW_BORDER,
      }}>
        <Typography fontSize="12px" color="text.light">
          Showing <span style={{color:"text.primary",fontWeight:700}}>{filtered.length}</span> records for current pay cycle
        </Typography>
        <Button
          // variant="contained"
          size="small"
          sx={{
            borderRadius: 4,
            textTransform: "none",
            fontSize: "12px",
            fontWeight: 700,
            py: 0.689,
            px: 1.48,
            background: "linear-gradient(90deg, #8AC642 0%, #528910 100%)",
            color: "#fff",
            boxShadow: "none",
            "&:hover": {
              background: "linear-gradient(90deg, #7BB538 0%, #46780E 100%)",
              boxShadow: "none",
            },
          }}
        >
          APPROVE ALL BULK
        </Button>
      </Box>
    </Paper>
  );
}
