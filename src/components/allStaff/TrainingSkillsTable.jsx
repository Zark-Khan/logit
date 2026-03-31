import React, { useState } from "react";
import {
  Box, Typography, Button, Paper, Chip,
  InputAdornment, TextField,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import { ROW_BORDER, HEADER_BORDER, TABLE_BG, searchFieldSx, tableHeaderSx } from "./StaffTableStyles";

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
  "Medication": { bg: "#F0F9FF", color: "#0EA5E9" },
  "Dementia":   { bg: "#FAF5FF", color: "#9333EA" },
  "Nursing":    { bg: "#F0FDF4",  color: "#16A34A" },
};

function TrainingBar({ current, max }) {
  const pct = Math.min(current / max, 1) * 100;
  const isComplete = current === max;
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, minWidth: 160 }}>
      <Box sx={{ flex: 1, height: 6, borderRadius: 4, bgcolor: "#F1F5F9", overflow: "hidden" }}>
        <Box sx={{
          width: `${pct}%`, height: 6, borderRadius: 4,
          bgcolor: isComplete ? "#8AC642" : "#FB923C",
          transition: "width 0.4s ease",
        }} />
      </Box>
      <Typography sx={{ fontSize: "10px", fontWeight: 700, color: "text.primary" }}>
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
          : <StarIcon key={i} sx={{ fontSize: 16, color: "text.primary"}} />
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
            <Typography sx={{ fontWeight: 700, fontSize: "18px", color: "text.primary" }}>
              Capability & Skills Matrix
            </Typography>
            <Typography sx={{ fontSize: "12px", color: "text.light", mt: 0.2 }}>
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
                  <SearchIcon sx={{ fontSize: 16, color: "text.light" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              ...searchFieldSx,
              width: 256,
            }}
          />
        </Box>

        <Button
          size="small"
          variant="outlined"
          sx={{
            borderRadius: 3, textTransform: "none", fontSize: "12px", fontWeight: 700,
             px: 3.45, height: 36.2, bgcolor: "background.default",
            borderColor: "#E2E8F0", color: "text.grey",
            "&:hover": { borderColor: "#0EA5E9", bgcolor: "rgba(14,165,233,0.06)" },
          }}
        >
          Filter by Skill: All
        </Button>
      </Box>

      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {["Staff Member", "Mandatory Training", "Specialist Skills", "Quality Score", ""].map((h) => (
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
                  <Typography color="text.light" fontSize="14px">No staff members found.</Typography>
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
                  <TrainingBar current={row.mandatoryTraining} max={row.mandatoryMax} />
                </TableCell>
                <TableCell sx={{ borderBottom: ROW_BORDER, py: 1.8 }}>
                  <Box sx={{ display: "flex", gap: 0.7, flexWrap: "wrap" }}>
                    {row.specialistSkills.map((skill) => {
                      const s = SKILL_STYLES[skill] ?? { bg: "#f3f4f6", color: "#6b7280" };
                      return (
                        <Chip key={skill} label={skill} size="small" sx={{
                          bgcolor: s.bg, color: s.color, fontWeight: 600, fontSize: "0.62rem", height: 20, borderRadius: 6,
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
                    borderRadius: 1.5, textTransform: "none", fontSize: "10px", fontWeight: 700,
                    py: 0.3, px: 1.2, color: "primary.main", "&:hover": { bgcolor: "rgba(14,165,233,0.08)" },
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
