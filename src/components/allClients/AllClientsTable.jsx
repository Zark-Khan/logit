import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  InputAdornment,
  TextField,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";

const CLIENT_HEADER_BORDER = "1px solid rgba(138, 198, 66, 0.5)";
const CLIENT_TABLE_BG = "rgba(138, 198, 66, 0.15)";
const ROW_BORDER = "1px solid #ffffff";

const searchFieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 3,
    fontSize: "0.82rem",
    bgcolor: "background.paper",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E2E8F0",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#8AC642",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#8AC642",
      borderWidth: "1px",
    },
  },
};

const dropdownSx = {
  fontSize: "12px",
  fontWeight: 600,
  height: 36,
  borderRadius: 3,
  color: "text.grey",
  bgcolor: "background.paper",
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E2E8F0" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#8AC642" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(138,198,66,0.4)",
  },
  "& .MuiSelect-select": {
    py: 0,
    pl: 2.83,
    pr: "44px !important",
  },
  "& .MuiSelect-icon": {
    fontSize: "1.1rem",
    right: "16px",
    color: "text.grey",
  },
};

const menuItemSx = {
  fontSize: "12px",
  color: "text.grey",
  fontWeight: 600,
};

const tableHeaderSx = {
  bgcolor: "background.paper",
  fontSize: "10px",
  fontWeight: 700,
  color: "text.grey",
  textTransform: "uppercase",
  borderBottom: ROW_BORDER,
  whiteSpace: "nowrap",
  py: 1.38,
};

const allClientsRows = [
  {
    id: "0041",
    name: "Margaret Hall",
    avatar: "M",
    status: "ACTIVE",
    risk: "Low Risk",
    riskColor: "#8AC642", // green
    careDetails: "Personal Care",
    branch: "Central Branch",
    assignedTeam: { initials: "AM", name: "Alex Marshall" },
    nextVisit: "Today, 14:00",
    visitColor: "#0EA5E9",
  },
  {
    id: "0045",
    name: "Arthur Reed",
    avatar: "A",
    status: "ACTIVE",
    risk: "Med Risk",
    riskColor: "#FEA400", // orange
    careDetails: "Medication Support",
    branch: "West Branch",
    assignedTeam: { initials: "ST", name: "Sarah Thompson" },
    nextVisit: "Tomorrow, 09:30",
    visitColor: "#0EA5E9",
  },
  {
    id: "0089",
    name: "John Doe",
    avatar: "J",
    status: "ON HOLD",
    statusColor: "#FEA400", // orange
    risk: "Low Risk",
    riskColor: "#8AC642",
    careDetails: "Home Help",
    branch: "Central Branch",
    assignedTeam: { initials: "AM", name: "Alex Marshall" },
    nextVisit: "Paused",
    visitColor: "#EF4444",
  },
  {
    id: "0092",
    name: "Emma Davis",
    avatar: "E",
    status: "ACTIVE",
    risk: "High Risk",
    riskColor: "#EF4444", // red
    careDetails: "Complex Care",
    branch: "North Branch",
    assignedTeam: { initials: "JW", name: "James Wilson" },
    nextVisit: "Today, 17:00",
    visitColor: "#0EA5E9",
  },
];

export default function AllClientsTable() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [branchFilter, setBranchFilter] = useState("All Branches");

  return (
    <Paper
      elevation={0}
      sx={{ border: CLIENT_HEADER_BORDER, borderRadius: 4, overflow: "hidden" }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2.5,
          py: 1.8,
          bgcolor: CLIENT_TABLE_BG,
          flexWrap: "wrap",
          gap: 1.5,
        }}
      >
        <TextField
          size="small"
          placeholder="Search by name or ID..."
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
            width: 320,
          }}
        />
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            IconComponent={KeyboardArrowDownIcon}
            sx={dropdownSx}
          >
            {["All Status", "Active", "On Hold"].map((r) => (
              <MenuItem key={r} value={r} sx={menuItemSx}>
                {r}
              </MenuItem>
            ))}
          </Select>
          <Select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            IconComponent={KeyboardArrowDownIcon}
            sx={dropdownSx}
          >
            {["All Branches", "Central", "West", "North"].map((b) => (
              <MenuItem key={b} value={b} sx={menuItemSx}>
                {b}
              </MenuItem>
            ))}
          </Select>
          <IconButton
            sx={{
              bgcolor: "#ffffff !important",
              borderRadius: "10px",
              width: 36,
              height: 36,
              "&:hover": { bgcolor: "#E2E8F0" },
            }}
          >
            <PublishOutlinedIcon sx={{ fontSize: 18, color: "#94A3B8" }} />
          </IconButton>
        </Box>
      </Box>

      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {[
                "Client Info",
                "Status",
                "Care Details",
                "Assigned Team",
                "Next Visit",
                "Actions",
              ].map((h) => (
                <TableCell key={h} sx={tableHeaderSx}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody sx={{ backgroundColor: CLIENT_TABLE_BG }}>
            {allClientsRows.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:hover": { bgcolor: "rgba(138, 198, 66, 0.08)" },
                  transition: "background 0.15s ease",
                  "&:last-child td, &:last-child th": { border: "none" },
                }}
              >
                {/* Client Info */}
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        fontSize: "14px",
                        bgcolor: "rgba(0,0,0,0.6)",
                        fontWeight: 700,
                        color: "#fff",
                      }}
                      src={`https://ui-avatars.com/api/?name=${row.name}&background=random`}
                    />
                    <Box>
                      <Typography
                        fontWeight={700}
                        fontSize="14px"
                        color="text.primary"
                      >
                        {row.name}
                      </Typography>
                      <Typography
                        fontSize="10px"
                        fontWeight="600"
                        color="text.secondary"
                      >
                        ID: {row.id}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>

                {/* Status */}
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  <Chip
                    label={row.status}
                    size="small"
                    sx={{
                      bgcolor: row.statusColor
                        ? `${row.statusColor}18`
                        : "rgba(138,198,66,0.12)",
                      color: row.statusColor || "#8AC642",
                      fontWeight: 700,
                      fontSize: "10px",
                      height: "20px",
                      borderRadius: "4px",
                      px: "0px !important",
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      mt: 0.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        bgcolor: row.riskColor,
                      }}
                    />
                    <Typography
                      fontSize="10px"
                      fontWeight={600}
                      color={row.riskColor}
                    >
                      {row.risk}
                    </Typography>
                  </Box>
                </TableCell>

                {/* Care Details */}
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  <Typography
                    fontSize="12px"
                    fontWeight={700}
                    color="text.primary"
                  >
                    {row.careDetails}
                  </Typography>
                  <Typography
                    fontSize="10px"
                    fontWeight={400}
                    color="text.secondary"
                  >
                    {row.branch}
                  </Typography>
                </TableCell>

                {/* Assigned Team */}
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar
                      sx={{
                        width: 24,
                        height: 24,
                        fontSize: "10px",
                        fontWeight: 700,
                        bgcolor: "#528910",
                        color: "#fff",
                      }}
                    >
                      {row.assignedTeam.initials}
                    </Avatar>
                    <Typography
                      fontSize="12px"
                      fontWeight={600}
                      color="text.primary"
                    >
                      {row.assignedTeam.name}
                    </Typography>
                  </Box>
                </TableCell>

                {/* Next Visit */}
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  <Typography
                    fontSize="11px"
                    fontWeight={700}
                    color={row.visitColor}
                  >
                    {row.nextVisit}
                  </Typography>
                </TableCell>

                {/* Actions */}
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => navigate(`/clients/all-clients/${row.id}`)}
                      sx={{
                        bgcolor: "#fff",
                        color: "#0EA5E9",
                        borderRadius: "8px",
                        p: 0.5,
                        "&:hover": { bgcolor: "#f0f9ff" },
                      }}
                    >
                      <PersonOutlineOutlinedIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{
                        bgcolor: "#fff",
                        color: "#FEA400",
                        borderRadius: "8px",
                        p: 0.5,
                        "&:hover": { bgcolor: "#fffbf0" },
                      }}
                    >
                      <DescriptionOutlinedIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{
                        bgcolor: "#fff",
                        color: "#94A3B8",
                        borderRadius: "8px",
                        p: 0.5,
                        "&:hover": { bgcolor: "#f8fafc" },
                      }}
                    >
                      <PersonAddOutlinedIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
