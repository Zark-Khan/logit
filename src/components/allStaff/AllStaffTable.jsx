import React, { useState } from "react";
import {
  Box, Typography, Avatar, Button, Paper,
  InputAdornment,
  TextField,
  Select,
  MenuItem,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ROW_BORDER, HEADER_BORDER, TABLE_BG, dropdownSx } from "./StaffTableStyles";

const allStaffRows = [
  { id: 1, name: "Sarah Thompson", email: "s.thompson@logitcare.com", role: "Carer",      status: "Active",   compliance: "OK",      today: "ON SHIFT" },
  { id: 2, name: "James Wilson",   email: "jwilson@logitcare.com",    role: "Nurse",      status: "Active",   compliance: "EXPIRING", today: "OFF"      },
  { id: 3, name: "Emily Barker",   email: "e.barker@logitcare.com",   role: "Supervisor", status: "On leave", compliance: "OK",      today: "OFF"      },
  { id: 4, name: "Michael Chen",   email: "m.chen@logitcare.com",     role: "Carer",      status: "Active",   compliance: "MISSING", today: "LATE"     },
];

const STATUS_STYLES = {
  "Active":   { color: "#16a34a" },
  "On leave": { color: "#b45309" },
  "Inactive": { color: "#dc2626" },
};

const COMPLIANCE_STYLES = {
  "OK":       { bg: "#dcfce7", color: "#16a34a" },
  "EXPIRING": { bg: "#fef9c3", color: "#b45309" },
  "MISSING":  { bg: "#fee2e2", color: "#dc2626" },
};

const TODAY_STYLES = {
  "ON SHIFT": { dot: "#22c55e", color: "#16a34a" },
  "OFF":      { dot: "#94a3b8", color: "#64748b" },
  "LATE":     { dot: "#f97316", color: "#ea580c" },
};

export default function AllStaffTable() {
  const [search,       setSearch]       = useState("");
  const [roleFilter,   setRoleFilter]   = useState("All Roles");
  const [branchFilter, setBranchFilter] = useState("All Branches");

  const filtered = allStaffRows.filter((r) => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
                        r.email.toLowerCase().includes(search.toLowerCase());
    const matchRole   = roleFilter === "All Roles" || r.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <Paper elevation={0} sx={{ border: HEADER_BORDER, borderRadius: 4, overflow: "hidden" }}>
      <Box sx={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        px: 2.5, py: 1.8, bgcolor: TABLE_BG,
        flexWrap: "wrap", gap: 1.5,
      }}>
        <TextField
          size="small" placeholder="Search staff by name or role..."
          value={search} onChange={(e) => setSearch(e.target.value)}
          InputProps={{ startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ fontSize: 18, color: "text.secondary" }} />
            </InputAdornment>
          )}}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3, fontSize: "0.82rem", bgcolor: "background.paper" }, width: 280 }}
        />
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}
            IconComponent={KeyboardArrowDownIcon} sx={dropdownSx}>
            {["All Roles", "Carer", "Nurse", "Supervisor"].map((r) => (
              <MenuItem key={r} value={r} sx={{ fontSize: "0.78rem" }}>{r}</MenuItem>
            ))}
          </Select>
          <Select value={branchFilter} onChange={(e) => setBranchFilter(e.target.value)}
            IconComponent={KeyboardArrowDownIcon} sx={dropdownSx}>
            {["All Branches", "North", "South", "East", "West"].map((b) => (
              <MenuItem key={b} value={b} sx={{ fontSize: "0.78rem" }}>{b}</MenuItem>
            ))}
          </Select>
        </Box>
      </Box>

      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {["Staff Member", "Role", "Status", "Compliance", "Today", "Actions"].map((h) => (
                <TableCell key={h} sx={{
                  bgcolor: "background.paper", fontSize: "0.68rem", fontWeight: 700,
                  color: "text.secondary", textTransform: "uppercase", letterSpacing: 0.5,
                  borderBottom: ROW_BORDER, whiteSpace: "nowrap", py: 1.5,
                }}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody sx={{backgroundColor:TABLE_BG}}>
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
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar sx={{ width: 38, height: 38, fontSize: "0.85rem", bgcolor: "#0EA5E9" }}>
                      {row.name[0]}
                    </Avatar>
                    <Box>
                      <Typography fontWeight={600} fontSize="0.88rem" color="text.primary">{row.name}</Typography>
                      <Typography fontSize="0.7rem" color="text.secondary">{row.email}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  <Typography fontSize="0.82rem" color="text.secondary">{row.role}</Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  <Typography fontSize="0.82rem" fontWeight={600}
                    color={STATUS_STYLES[row.status]?.color ?? "text.secondary"}>
                    {row.status}
                  </Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  {(() => {
                    const s = COMPLIANCE_STYLES[row.compliance] ?? { bg: "#f3f4f6", color: "#6b7280" };
                    return <Chip label={row.compliance} size="small"
                      sx={{ bgcolor: s.bg, color: s.color, fontWeight: 700, fontSize: "0.62rem", height: 22 }} />;
                  })()}
                </TableCell>
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  {(() => {
                    const s = TODAY_STYLES[row.today] ?? { dot: "#94a3b8", color: "#64748b" };
                    return (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                        <Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: s.dot }} />
                        <Typography fontSize="0.78rem" fontWeight={600} color={s.color}>{row.today}</Typography>
                      </Box>
                    );
                  })()}
                </TableCell>
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button size="small" variant="outlined" sx={{
                      borderRadius: 1.5, textTransform: "none", fontSize: "0.7rem", fontWeight: 700,
                      py: 0.3, px: 1.2, borderColor: "rgba(14,165,233,0.4)", color: "#0EA5E9",
                      "&:hover": { borderColor: "#0EA5E9", bgcolor: "rgba(14,165,233,0.06)" },
                    }}>PROFILE</Button>
                    <Button size="small" variant="outlined" sx={{
                      borderRadius: 1.5, textTransform: "none", fontSize: "0.7rem", fontWeight: 700,
                      py: 0.3, px: 1.2, borderColor: "rgba(138,198,66,0.4)", color: "#8AC642",
                      "&:hover": { borderColor: "#8AC642", bgcolor: "rgba(138,198,66,0.06)" },
                    }}>SHIFT</Button>
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
