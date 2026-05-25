import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StatusBadge from "../shared/StatusBadge";
import TaskProgress from "../shared/TaskProgress";
import VisitDetailDrawer from "./VisitDetailDrawer";

const LOG_DATA = [
  {
    id: 1,
    client: "Arthur Morgan",
    carer: "Sarah Thompson",
    scheduled: "09:00 - 10:00",
    actual: "08:58 - 10:02",
    status: "COMPLETED",
    tasks: "8/8",
    initials: "AM",
  },
  {
    id: 2,
    client: "Sadie Adler",
    carer: "Emily Davis",
    scheduled: "10:30 - 11:30",
    actual: "10:35 - Ongoing",
    status: "ONGOING",
    tasks: "4/12",
    initials: "SA",
  },
  {
    id: 3,
    client: "John Marston",
    carer: "James Wilson",
    scheduled: "08:00 - 09:00",
    actual: "-- : --",
    status: "MISSED",
    tasks: "0/6",
    initials: "JM",
  },
  {
    id: 4,
    client: "Charles Smith",
    carer: "Michael Brown",
    scheduled: "11:00 - 12:00",
    actual: "11:15 - Ongoing",
    status: "LATE",
    tasks: "2/10",
    initials: "CS",
  },
  {
    id: 5,
    client: "Abigail Roberts",
    carer: "Sarah Thompson",
    scheduled: "13:00 - 14:00",
    actual: "-- : --",
    status: "UPCOMING",
    tasks: "0/8",
    initials: "AR",
  },
];

export default function VisitsLogsTab() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);

  const handleOpenDrawer = (log) => {
    setSelectedLog(log);
    setDrawerOpen(true);
  };

  return (
    <Box>
      {/* Search and Action Bar */}
      <Box
        sx={{
          mb: 4,
          p: 1.5,
          borderRadius: "24px",
          border: "1px solid #83D8FF",
          bgcolor: "#E0F5FF",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          placeholder="Search by client or carer..."
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#9CA3AF", fontSize: 20 }} />
              </InputAdornment>
            ),
          }}
          sx={{
            maxWidth: 400,
            "& .MuiOutlinedInput-root": {
              borderRadius: "16px",
              bgcolor: "#fff",
              "& fieldset": { border: "none" },
            },
            "& input": { fontSize: "14px", color: "#9CA3AF" },
          }}
        />

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              px: 2,
              py: 1,
              borderRadius: "12px",
              bgcolor: "#fff",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              cursor: "pointer",
            }}
          >
            <Typography fontSize="14px" fontWeight={600} color="text.light">
              Today, 1 Mar 2026
            </Typography>
            <KeyboardArrowDownIcon sx={{ color: "#94A3B8", fontSize: 20 }} />
          </Box>

          <Button
            variant="contained"
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              bgcolor: "text.primary",
              color: "#fff",
              fontWeight: 700,
              fontSize: "14px",
              px: 3,
              py: 1,
              "&:hover": { bgcolor: "text.primary" },
            }}
          >
            Export Logs
          </Button>
        </Box>
      </Box>

      {/* Table Section */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: "24px",
          border: "1px solid #83D8FF",
          bgcolor: "#E0F5FF",
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#fff" }}>
              <TableCell sx={headerStyle}>CLIENT</TableCell>
              <TableCell sx={headerStyle}>CARER</TableCell>
              <TableCell sx={headerStyle}>SCHEDULED</TableCell>
              <TableCell sx={headerStyle}>ACTUAL</TableCell>
              <TableCell sx={headerStyle}>STATUS</TableCell>
              <TableCell sx={headerStyle}>TASKS</TableCell>
              <TableCell sx={headerStyle} />
            </TableRow>
          </TableHead>
          <TableBody sx={{ bgcolor: "#E0F5FF" }}>
            {LOG_DATA.map((row) => (
              <TableRow key={row.id}>
                <TableCell sx={{ py: 2.5, borderBottom: "1px solid #fff" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: "#fff",
                        color: "text.light",
                        fontSize: "12px",
                        fontWeight: 700,
                        border: "1px solid #E2E8F0",
                      }}
                    >
                      {row.initials}
                    </Avatar>
                    <Typography
                      fontSize="15px"
                      fontWeight={700}
                      color="text.primary"
                    >
                      {row.client}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ borderBottom: "1px solid #fff" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      color: "text.light",
                    }}
                  >
                    <PersonOutlineIcon sx={{ fontSize: 18 }} />
                    <Typography fontSize="14px" fontWeight={400}>
                      {row.carer}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ borderBottom: "1px solid #fff" }}>
                  <Typography
                    fontSize="14px"
                    fontWeight={400}
                    color="text.light"
                  >
                    {row.scheduled}
                  </Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: "1px solid #fff" }}>
                  <Typography
                    fontSize="14px"
                    fontWeight={400}
                    color="text.light"
                  >
                    {row.actual}
                  </Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: "1px solid #fff" }}>
                  <StatusBadge status={row.status} />
                </TableCell>
                <TableCell sx={{ borderBottom: "1px solid #fff" }}>
                  <TaskProgress tasks={row.tasks} />
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ borderBottom: "1px solid #fff" }}
                >
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDrawer(row)}
                  >
                    <KeyboardArrowRightIcon sx={{ color: "#475569" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <VisitDetailDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        log={selectedLog}
      />
    </Box>
  );
}

const headerStyle = {
  fontSize: "10px",
  fontWeight: 700,
  color: "text.grey",
  letterSpacing: "0.05em",
  py: 1.5,
  borderBottom: "1px solid #83D8FF",
};
