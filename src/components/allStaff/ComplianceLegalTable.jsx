import React, { useState } from "react";
import {
  Box, Typography, Button, Paper, Chip,
  InputAdornment, TextField,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { ROW_BORDER, HEADER_BORDER, TABLE_BG, searchFieldSx, tableHeaderSx } from "./StaffTableStyles";

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
  "FULLY COMPLIANT": { bg: "#DCFCE7", color: "#8AC642" },
  "EXPIRING SOON":   { bg: "#FFEDD5", color: "#FEA500" },
  "CRITICAL RISK":   { bg: "#FEE2E2", color: "#EF4444" },
};

const PROBLEM_ITEM_STYLES = {
  "DBS Renewal":     { bg: "#FFFFFF", color: "#0D0F12" },
  "ID Verification": { bg: "#FEF2F2", color: "#DC2626" },
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
            <Typography sx={{ fontWeight: 700, fontSize: "18px", color: "text.primary" }}>
              Compliance & Legal Audit
            </Typography>
            <Typography sx={{ fontSize: "12px", color: "text.light", mt: 0.2 }}>
              Real-time status of professional credentials.
            </Typography>
          </Box>
          <TextField
            size="small"
            placeholder="Search staff by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 16, color: "#9CA3AF" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              ...searchFieldSx,
              width: 256,
            }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 1.2, alignItems: "center" }}>
          <Chip
            label={`Non-Compliant (${nonCompliantCount})`}
            size="small"
            sx={{
              bgcolor: "#FEF2F2", color: "#dc2626",
              border: "1px solid #FEE2E2", fontWeight: 700,
              fontSize: "12px", height: 33.6, borderRadius: 4,
              px:1.91
            }}
          />
          <Button
            size="small"
            variant="outlined"
            sx={{
              borderRadius: 4,
              textTransform: "none",
              fontSize: "12px",
              fontWeight: 700,
              px: 2.16,
              height: 33.6,
              borderColor: "#E2E8F0",
              color: "text.grey",
              bgcolor: "background.default",
              "&:hover": {
                borderColor: "primary.main",
                bgcolor: "rgba(14,165,233,0.06)",
              },
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
                <TableCell key={h} sx={tableHeaderSx}>
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
                  <Typography fontWeight={700} fontSize="14px" color="text.primary">{row.name}</Typography>
                  <Typography fontSize="12px" color="text.light" fontWeight={600}>{row.role}</Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  {(() => {
                    const s = OVERALL_STATUS_STYLES[row.overallStatus] ?? { bg: "#f3f4f6", color: "#6b7280", border: "1px solid #e5e7eb" };
                    return (
                        <Chip
                          label={row.overallStatus}
                          size="small"
                          sx={{
                            bgcolor: s.bg,
                            color: s.color,
                            fontWeight: 700,
                            fontSize: "10px",
                            height: 21.6,
                            borderRadius: 1,
                          }}
                        />
                    );
                  })()}
                </TableCell>
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  {row.problemItems.length === 0 ? (
                    <Typography fontSize="10px" color="text.light" fontStyle="italic">None</Typography>
                  ) : (
                    <Box sx={{ display: "flex", gap: 0.8, flexWrap: "wrap" }}>
                      {row.problemItems.map((item) => {
                        const s = PROBLEM_ITEM_STYLES[item] ?? { bg: "#f3f4f6", color: "#6b7280" };
                        return (
                          <Chip key={item} label={item} size="small" sx={{
                            bgcolor: s.bg, color: s.color, fontWeight: 600, fontSize: "9px", height: 17.5, borderRadius: 1,
                          }} />
                        );
                      })}
                    </Box>
                  )}
                </TableCell>
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  <Typography fontSize="12px" fontWeight={700} color={row.expiryExpired ? "#F97316" : "text.light"}>
                    {row.nextExpiry}
                  </Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  <Box sx={{
                    width: 28, height: 28, borderRadius: 1,
                    display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                    "&:hover": { bgcolor: "rgba(14,165,233,0.06)", borderColor: "#0EA5E9" }, transition: "all 0.15s ease",
                  }}>
                    <FileUploadOutlinedIcon sx={{ fontSize: 16, color: "primary.main" }} />
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
