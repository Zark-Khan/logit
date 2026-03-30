import React, { useState } from "react";
import {
  Box, Typography, Button, Paper, Chip,
  InputAdornment, TextField,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { ROW_BORDER, HEADER_BORDER, TABLE_BG } from "./StaffTableStyles";

const complianceRows = [
  {
    id: 1, name: "Sarah Thompson", role: "Carer",
    overallStatus: "FULLY COMPLIANT",
    problemItems: [],
    nextExpiry: "12 Jun 2025", expiryExpired: false,
  },
  {
    id: 2, name: "James Wilson", role: "Nurse",
    overallStatus: "EXPIRING SOON",
    problemItems: ["DBS Renewal"],
    nextExpiry: "Expired", expiryExpired: true,
  },
  {
    id: 3, name: "Emily Barker", role: "Supervisor",
    overallStatus: "FULLY COMPLIANT",
    problemItems: [],
    nextExpiry: "12 Jun 2025", expiryExpired: false,
  },
  {
    id: 4, name: "Michael Chen", role: "Carer",
    overallStatus: "CRITICAL RISK",
    problemItems: ["DBS Renewal", "ID Verification"],
    nextExpiry: "Expired", expiryExpired: true,
  },
];

const OVERALL_STATUS_STYLES = {
  "FULLY COMPLIANT": { bg: "#dcfce7", color: "#16a34a", border: "1px solid #bbf7d0" },
  "EXPIRING SOON":   { bg: "#fef9c3", color: "#b45309", border: "1px solid #fde68a" },
  "CRITICAL RISK":   { bg: "#fee2e2", color: "#dc2626", border: "1px solid #fca5a5" },
};

const PROBLEM_ITEM_STYLES = {
  "DBS Renewal":     { bg: "#fef3c7", color: "#92400e" },
  "ID Verification": { bg: "#ede9fe", color: "#6d28d9" },
};

export default function ComplianceLegalTable() {
  const [search, setSearch] = useState("");

  const nonCompliantCount = complianceRows.filter(
    (r) => r.overallStatus !== "FULLY COMPLIANT"
  ).length;

  const filtered = complianceRows.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Paper elevation={0} sx={{ border: HEADER_BORDER, borderRadius: 4, overflow: "hidden" }}>
      <Box sx={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        px: 2.5, py: 1.6, bgcolor: TABLE_BG, flexWrap: "wrap", gap: 1.5,
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: "text.primary" }}>
              Compliance & Legal Audit
            </Typography>
            <Typography sx={{ fontSize: "0.68rem", color: "text.secondary", mt: 0.2 }}>
              Real-time status of professional credentials.
            </Typography>
          </Box>
          <TextField
            size="small"
            placeholder="Search staff by name..."
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
              width: 210,
            }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 1.2, alignItems: "center" }}>
          <Chip
            label={`Non-Compliant (${nonCompliantCount})`}
            size="small"
            sx={{
              bgcolor: "#fff0f0", color: "#dc2626",
              border: "1.5px solid #fca5a5", fontWeight: 700,
              fontSize: "0.72rem", height: 30, borderRadius: 2,
            }}
          />
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
            Export Report
          </Button>
        </Box>
      </Box>

      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {["Staff Member", "Overall Status", "Problem Items", "Next Expiry", ""].map((h) => (
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
                <TableCell colSpan={5} align="center" sx={{ py: 5, border: "none" }}>
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
                  <Typography fontWeight={700} fontSize="0.85rem" color="text.primary">{row.name}</Typography>
                  <Typography fontSize="0.68rem" color="text.secondary">{row.role}</Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  {(() => {
                    const s = OVERALL_STATUS_STYLES[row.overallStatus] ?? { bg: "#f3f4f6", color: "#6b7280", border: "1px solid #e5e7eb" };
                    return (
                      <Chip
                        label={row.overallStatus}
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
                  {row.problemItems.length === 0 ? (
                    <Typography fontSize="0.78rem" color="text.secondary">None</Typography>
                  ) : (
                    <Box sx={{ display: "flex", gap: 0.8, flexWrap: "wrap" }}>
                      {row.problemItems.map((item) => {
                        const s = PROBLEM_ITEM_STYLES[item] ?? { bg: "#f3f4f6", color: "#6b7280" };
                        return (
                          <Chip key={item} label={item} size="small" sx={{
                            bgcolor: s.bg, color: s.color, fontWeight: 600, fontSize: "0.6rem", height: 20, borderRadius: 1,
                          }} />
                        );
                      })}
                    </Box>
                  )}
                </TableCell>
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  <Typography fontSize="0.78rem" fontWeight={row.expiryExpired ? 700 : 400} color={row.expiryExpired ? "#f97316" : "text.secondary"}>
                    {row.nextExpiry}
                  </Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  <Box sx={{
                    width: 28, height: 28, borderRadius: 1.5, border: "1.5px solid rgba(14,165,233,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                    "&:hover": { bgcolor: "rgba(14,165,233,0.06)", borderColor: "#0EA5E9" }, transition: "all 0.15s ease",
                  }}>
                    <FileUploadOutlinedIcon sx={{ fontSize: 15, color: "#0EA5E9" }} />
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
