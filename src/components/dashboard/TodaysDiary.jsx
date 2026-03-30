import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const DIARY = [
  {
    time: "08:00",
    initial: "J",
    client: "John Doe",
    carer: "Sarah Thompson",
    type: "Morning Routine",
    status: "DONE",
    statusColor: "#8AC642",
    statusBg: "#F0FAE6",
  },
  {
    time: "09:30",
    initial: "A",
    client: "Alice Smith",
    carer: "James Wilson",
    type: "Medication",
    status: "LIVE",
    statusColor: "#fff",
    statusBg: "#0EA5E9",
  },
  {
    time: "11:00",
    initial: "R",
    client: "Robert Brown",
    carer: "Sarah Thompson",
    type: "Companionship",
    status: "QUEUE",
    statusColor: "#84919A",
    statusBg: "#F5F7FA",
  },
  {
    time: "12:00",
    initial: "E",
    client: "Emma Davis",
    carer: "Unassigned",
    type: "Lunch Prep",
    status: "ALERT",
    statusColor: "#fff",
    statusBg: "#E53E3E",
  },
  {
    time: "14:00",
    initial: "W",
    client: "William Wilson",
    carer: "James Wilson",
    type: "Domestic Help",
    status: "QUEUE",
    statusColor: "#84919A",
    statusBg: "#F5F7FA",
  },
  {
    time: "15:30",
    initial: "M",
    client: "Margaret Hall",
    carer: "Sarah Thompson",
    type: "Personal Care",
    status: "QUEUE",
    statusColor: "#84919A",
    statusBg: "#F5F7FA",
  },
];

export default function TodaysDiary() {
  const [view, setView] = useState("List");

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        pb:0,
        borderRadius: 3,
        border: "1px solid #2EBEFF85",
        backgroundColor: "#73D3FF38",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 1.5,
        }}
      >
        <Box>
          <Typography fontWeight={700} sx={{fontSize:"18px"}}>
            Today's Diary &amp; Activity
          </Typography>
          <Typography
            variant="body2"
            color="text.darkGrey"
            fontWeight={400}
          >
            Tracking 6 scheduled care visits
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 0.5,
            backgroundColor: "background.default",
            borderRadius: 2,
            p: 0.5,
          }}
        >
          {["List", "Timeline"].map((v) => (
            <Box
              key={v}
              onClick={() => setView(v)}
              sx={{
                px: 1.5,
                py: 0.4,
                borderRadius: 1.5,
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: 700,
                backgroundColor: "background.default",
                color: view === v ? "primary.main" : "text.grey",
                boxShadow: view === v ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.15s ease",
              }}
            >
              {v}
            </Box>
          ))}
        </Box>
      </Box>

      {/* MUI Table */}
      <TableContainer
        sx={{
          overflow: "hidden",
          mx: -2.5,
          width: "calc(100% + 40px)",
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "background.default" }}>
              {["TIME", "CLIENT NAME", "CARER NAME", "TYPE", "STATUS"].map(
                (h) => (
                  <TableCell
                    key={h}
                    sx={{
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      letterSpacing: 0.4,
                      color: "text.secondary",
                      borderBottom: "1px solid #E9EDF0",
                      py: 1.2,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </TableCell>
                ),
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {DIARY.map(
              ({
                time,
                initial,
                client,
                carer,
                type,
                status,
                statusColor,
                statusBg,
              }) => (
                <TableRow
                  key={`${time}-${client}`}
                  sx={{
                    backgroundColor: "transparent",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.45)" },
                    transition: "background 0.15s",
                    "& td": {
                      borderBottom: "1px solid #fff",
                    },
                    "&:last-child td": {
                      borderBottom: "none",
                    },
                  }}
                >
                  {/* Time */}
                  <TableCell sx={{ py: 1.8 }}>
                    <Typography variant="body1" fontWeight={600}>
                      {time}
                    </Typography>
                  </TableCell>

                  {/* Client */}
                  <TableCell sx={{ py: 1.8 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          width: 26,
                          height: 26,
                          borderRadius: 2,
                          backgroundColor: "#F0F9FF",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "primary.main",
                        }}
                      >
                        {initial}
                      </Box>
                      <Typography variant="body1" sx={{color:"text.primary", fontWeight:"600"}}>{client}</Typography>
                    </Box>
                  </TableCell>

                  {/* Carer */}
                  <TableCell sx={{ py: 1.8 }}>
                    <Typography variant="body1" color="text.primary" fontWeight="500">
                      {carer}
                    </Typography>
                  </TableCell>

                  {/* Type */}
                  <TableCell sx={{ py: 1.8 }}>
                    <Typography variant="body2" color="text.primary" fontWeight="600">
                      {type}
                    </Typography>
                  </TableCell>

                  {/* Status */}
                  <TableCell sx={{ py: 1.8,textAlign:"right"}}>
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        px: 1.2,
                        py: 0.3,
                        borderRadius: 1.5,
                        backgroundColor: statusBg,
                        color: statusColor,
                        fontSize: "10px",
                        fontWeight: 700,
                      }}
                    >
                      {status}
                    </Box>
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}