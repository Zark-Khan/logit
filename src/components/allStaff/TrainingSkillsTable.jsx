import React, { useState } from "react";
import {
  Box, Typography, Button, Paper, Chip,
  InputAdornment, TextField,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { ROW_BORDER, HEADER_BORDER, TABLE_BG } from "./StaffTableStyles";

const staffRows = [
  {
    id: 1, name: "Sarah Thompson", role: "Carer",
    mandatoryTraining: 12, mandatoryMax: 12,
    specialistSkills: ["Medication", "Dementia"],
    qualityScore: 4,
  },
  {
    id: 2, name: "James Wilson", role: "Nurse",
    mandatoryTraining: 12, mandatoryMax: 12,
    specialistSkills: ["Medication", "Dementia", "Nursing"],
    qualityScore: 5,
  },
  {
    id: 3, name: "Emily Barker", role: "Supervisor",
    mandatoryTraining: 12, mandatoryMax: 12,
    specialistSkills: ["Medication", "Dementia"],
    qualityScore: 4,
  },
  {
    id: 4, name: "Michael Chen", role: "Carer",
    mandatoryTraining: 8, mandatoryMax: 12,
    specialistSkills: ["Medication", "Dementia"],
    qualityScore: 2,
  },
];

const SKILL_STYLES = {
  "Medication": { bg: "rgba(14,165,233,0.12)", color: "#0EA5E9" },
  "Dementia":   { bg: "rgba(168,85,247,0.12)", color: "#9333ea" },
  "Nursing":    { bg: "rgba(34,197,94,0.12)",  color: "#16a34a" },
};

function TrainingBar({ current, max }) {
  const pct = Math.min(current / max, 1) * 100;
  const isComplete = current === max;
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, minWidth: 160 }}>
      <Box sx={{ flex: 1, height: 7, borderRadius: 4, bgcolor: "rgba(0,0,0,0.07)", overflow: "hidden" }}>
        <Box sx={{
          width: `${pct}%`, height: "100%", borderRadius: 4,
          bgcolor: isComplete ? "#8AC642" : "#f97316",
          transition: "width 0.4s ease",
        }} />
      </Box>
      <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748b", minWidth: 32 }}>
        {current}/{max}
      </Typography>
    </Box>
  );
}

function QualityStars({ score, max = 5 }) {
  return (
    <Box sx={{ display: "flex", gap: 0.2 }}>
      {Array.from({ length: max }).map((_, i) => (
        i < score
          ? <StarIcon      key={i} sx={{ fontSize: 16, color: "#f59e0b" }} />
          : <StarBorderIcon key={i} sx={{ fontSize: 16, color: "#d1d5db" }} />
      ))}
    </Box>
  );
}

export default function TrainingSkillsTable() {
  const [search, setSearch] = useState("");

  const filtered = staffRows.filter((r) =>
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
              Capability & Skills Matrix
            </Typography>
            <Typography sx={{ fontSize: "0.68rem", color: "text.secondary", mt: 0.2 }}>
              Mapping staff skills to patient requirements
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

        <Button
          size="small"
          variant="outlined"
          sx={{
            borderRadius: 2, textTransform: "none", fontSize: "0.72rem", fontWeight: 700,
            py: 0.5, px: 1.8, height: 32,
            borderColor: "rgba(14,165,233,0.4)", color: "#0EA5E9",
            "&:hover": { borderColor: "#0EA5E9", bgcolor: "rgba(14,165,233,0.06)" },
          }}
        >
          Filter: All
        </Button>
      </Box>

      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {["Staff Member", "Mandatory Training", "Specialist Skills", "Quality Score", ""].map((h) => (
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
                  <TrainingBar current={row.mandatoryTraining} max={row.mandatoryMax} />
                </TableCell>
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  <Box sx={{ display: "flex", gap: 0.7, flexWrap: "wrap" }}>
                    {row.specialistSkills.map((skill) => {
                      const s = SKILL_STYLES[skill] ?? { bg: "#f3f4f6", color: "#6b7280" };
                      return (
                        <Chip key={skill} label={skill} size="small" sx={{
                          bgcolor: s.bg, color: s.color, fontWeight: 600, fontSize: "0.62rem", height: 20, borderRadius: 1,
                        }} />
                      );
                    })}
                  </Box>
                </TableCell>
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  <QualityStars score={row.qualityScore} />
                </TableCell>
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  <Button size="small" variant="text" sx={{
                    borderRadius: 1.5, textTransform: "none", fontSize: "0.68rem", fontWeight: 700,
                    py: 0.3, px: 1.2, color: "#0EA5E9", "&:hover": { bgcolor: "rgba(14,165,233,0.08)" },
                    whiteSpace: "nowrap",
                  }}>UPDATE SKILLS</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
