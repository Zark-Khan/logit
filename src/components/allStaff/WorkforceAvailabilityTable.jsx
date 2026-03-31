import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Paper,
  InputAdornment,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  ROW_BORDER,
  HEADER_BORDER,
  TABLE_BG,
  searchFieldSx,
  tableHeaderSx,
} from "./StaffTableStyles";

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


const TODAY_STATUS_STYLES = {
  "FULLY OCCUPIED": { 
    color: "primary.main", 
    bgcolor: "background.default", 
  },
  AVAILABLE: { 
    color: "#528910", 
    bgcolor: "#DCFCE7" 
  },
};

const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

function WeeklyCoverage({ days }) {
  return (
    <Box sx={{ display: "flex", gap: 0.4, alignItems: "center" }}>
      {days.map((active, i) => (
        <Box
          key={i}
          sx={{
            width: 20,
            height: 20,
            borderRadius: "4px",
            bgcolor: active ? "rgba(14,165,233,0.18)" : "background.default",
            border: active
              ? "1.5px solid rgba(14,165,233,0.5)"
              : "1.5px solid background.default",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "8px",
              fontWeight: 700,
              color: active ? "#0EA5E9" : "#CBD5E1",
            }}
          >
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
    <Box
      sx={{ display: "flex", alignItems: "center", gap: 1.2, minWidth: 90 }}
    >
      <Box
        sx={{
          flex: 1,
          height: 6,
          borderRadius: 4,
          bgcolor: "background.default",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: `${pct}%`,
            height: 6,
            borderRadius: 4,
            bgcolor: "#FB923C",
            transition: "width 0.4s ease",
          }}
        />
      </Box>
      <Typography
        sx={{
          fontSize: "10px",
          fontWeight: 700,
          color: "text.primary",
          minWidth: 28,
        }}
      >
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
    <Paper
      elevation={0}
      sx={{ border: HEADER_BORDER, borderRadius: 4, overflow: "hidden" }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2.5,
          py: 1.6,
          bgcolor: TABLE_BG,
          flexWrap: "wrap",
          gap: 1.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "14px",
              color: "text.primary",
              whiteSpace: "nowrap",
            }}
          >
            Workforce Availability
          </Typography>
          <TextField
            size="small"
            placeholder="Search staff"
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

        <Box sx={{ display: "flex", gap: 1.2 }}>
          <Button
            size="small"
            variant={showAvailableOnly ? "contained" : "outlined"}
            onClick={() => setShowAvailableOnly((v) => !v)}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontSize: "12px",
              fontWeight: 700,
              px: 1.97,
              height: 29.6,
              ...(showAvailableOnly
                ? {
                    bgcolor: "#0EA5E9",
                    color: "#fff",
                    "&:hover": { bgcolor: "#0284c7" },
                  }
                : {
                    borderColor: "#E2E8F0",
                    color: "text.primary",
                    bgcolor: "background.default",
                    "&:hover": {
                      borderColor: "#0EA5E9",
                      bgcolor: "rgba(14,165,233,0.06)",
                    },
                  }),
            }}
          >
            Show Available Only
          </Button>
          <Button
            size="small"
            variant="outlined"
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontSize: "12px",
              fontWeight: 700,
              px: 1.97,
              height: 29.6,
              borderColor: "#E2E8F0",
              color: "text.primary",
              bgcolor: "background.default",
              "&:hover": {
                borderColor: "#0EA5E9",
                bgcolor: "rgba(14,165,233,0.06)",
              },
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
              {[
                "Staff Member",
                "Today's Status",
                "Weekly Coverage",
                "Workload",
                "Next Available",
                "",
              ].map((h) => (
                <TableCell key={h} sx={tableHeaderSx}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody sx={{ backgroundColor: TABLE_BG }}>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                  sx={{ py: 5, border: "none" }}
                >
                  <Typography color="text.secondary" fontSize="0.88rem">
                    No staff members found.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:hover": { bgcolor: "rgba(115,211,255,0.08)" },
                    transition: "background 0.15s ease",
                    "&:last-child td, &:last-child th": { border: "none" },
                  }}
                >
                  <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                    >
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          fontSize: "12px",
                          bgcolor: "text.paper",
                          fontWeight: 700,
                          color: "text.primary",
                        }}
                      >
                        {row.name[0]}
                      </Avatar>
                      <Box>
                        <Typography
                          fontWeight={600}
                          fontSize="body1"
                          color="text.primary"
                        >
                          {row.name}
                        </Typography>
                        <Typography
                          fontSize="10px"
                          fontWeight="400"
                          color="text.light"
                        >
                          {row.role}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: 700,
                        display: "inline-flex",
                        px: 1,
                        py: 0.4,
                        borderRadius: "4px",
                        ...(TODAY_STATUS_STYLES[row.todayStatus] ?? {
                          color: "#64748b",
                          fontWeight: 600,
                        }),
                      }}
                    >
                      {row.todayStatus}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                    <WeeklyCoverage days={row.weeklyDays} />
                  </TableCell>
                  <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                    <WorkloadBar
                      hours={row.workloadHours}
                      max={row.workloadMax}
                    />
                  </TableCell>
                  <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                    <Typography
                      fontSize="12px"
                      color="text.light"
                      whiteSpace="nowrap"
                    >
                      {row.nextAvailable}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                    <Button
                      size="small"
                      variant="text"
                      sx={{
                        borderRadius: 1.5,
                        textTransform: "none",
                        fontSize: "10px",
                        fontWeight: 700,
                        py: 0.3,
                        px: 1.2,
                        color: "primary.main",
                        "&:hover": { bgcolor: "rgba(14,165,233,0.08)" },
                        whiteSpace: "nowrap",
                      }}
                    >
                      ASSIGN SHIFT
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
