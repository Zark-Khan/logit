import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import StatusBadge from "../shared/StatusBadge";
import AssessmentDetailDrawer from "./AssessmentDetailDrawer";
import CreateAssessmentModal from "./CreateAssessmentModal";

const ASSESSMENT_DATA = [
  {
    id: 1,
    title: "Mobility Assessment",
    client: "Arthur Morgan",
    date: "26 Feb 2026",
    score: "18/30",
    riskLevel: "MEDIUM RISK",
    status: "COMPLETED",
    assessedBy: "Sarah Thompson",
    initials: "ST",
    ref: "AS-001",
    details: [
      {
        question: "Can the client walk 50m without assistance?",
        answer: "Yes",
        notes: '"Arthur is able to walk with a stick but requires standby assistance for longer distances."',
      },
      {
        question: "Has the client had a fall in the last 6 months?",
        answer: "No",
        notes: '"No falls reported since last assessment."',
      },
      {
        question: "Is the client able to manage their own medication?",
        answer: "Partial",
        notes: '"Requires prompting and supervision to ensure correct dosage is taken."',
      },
    ]
  },
  {
    id: 2,
    title: "Falls Risk Assessment",
    client: "John Marston",
    date: "25 Feb 2026",
    score: "24/30",
    riskLevel: "HIGH RISK",
    status: "COMPLETED",
    assessedBy: "Sarah Thompson",
    initials: "ST",
    ref: "AS-002",
    details: []
  },
  {
    id: 3,
    title: "Medication Risk",
    client: "Sadie Adler",
    date: "20 Feb 2026",
    score: "Low Risk",
    riskLevel: "LOW RISK",
    status: "COMPLETED",
    assessedBy: "Emily Davis",
    initials: "ED",
    ref: "AS-003",
    details: []
  },
  {
    id: 4,
    title: "Nutrition Assessment",
    client: "Charles Smith",
    date: "15 Feb 2026",
    score: "Normal",
    riskLevel: "MEDIUM RISK",
    status: "COMPLETED",
    assessedBy: "Michael Brown",
    initials: "MB",
    ref: "AS-004",
    details: []
  },
];

export default function AssessmentsTab() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  const handleOpenDrawer = (assessment) => {
    setSelectedAssessment(assessment);
    setDrawerOpen(true);
  };

  return (
    <Box>
      {/* Section Title */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            bgcolor: "#F3E8FF", // Light purple
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AssignmentOutlinedIcon sx={{ color: "#A855F7", fontSize: 18 }} />
        </Box>
        <Typography fontSize="20px" fontWeight={700} color="text.primary">
          Assessments
        </Typography>
      </Box>

      {/* Header and Search */}
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
          placeholder="Search by assessment, client or carer..."
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
            onClick={() => setCreateModalOpen(true)}
            startIcon={<span>+</span>}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              background: "linear-gradient(135deg, #0EA5E9, #8AC642)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "14px",
              px: 3,
              py: "1px !important",
            }}
          >
            New Assessment
          </Button>
        </Box>
      </Box>

      {/* List Container */}
      <Box
        sx={{
          borderRadius: "24px",
          border: "1px solid #83D8FF",
          bgcolor: "#E0F5FF",
          overflow: "hidden",
        }}
      >
        <Typography fontSize="16px" fontWeight={700} color="text.primary" sx={{ p: 3 }}>
          Recent Assessments
        </Typography>
        
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {ASSESSMENT_DATA.map((item, index) => (
            <Box
              key={item.id}
              sx={{
                p: 2,
                px: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderTop: "1px solid #fff",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onClick={() => handleOpenDrawer(item)}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "12px",
                    bgcolor: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AssignmentOutlinedIcon sx={{ color: "#A855F7", fontSize: 22 }} />
                </Box>
                <Box>
                  <Typography fontSize="15px" fontWeight={700} color="text.primary" mb={0.2}>
                    {item.title}
                  </Typography>
                  <Typography fontSize="13px" color="text.light" fontWeight={500}>
                    {item.client} &bull; {item.date}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Box sx={{ textAlign: "center", minWidth: 60 }}>
                  <Typography fontSize="14px" fontWeight={800} color="text.primary">
                    {item.score}
                  </Typography>
                  <Typography fontSize="9px" fontWeight={800} color="text.grey" sx={{ mt: 0.2 }}>
                    OUTCOME
                  </Typography>
                </Box>
                
                <Box sx={{ minWidth: 90, display: "flex", justifyContent: "center" }}>
                  <StatusBadge status={item.riskLevel} />
                </Box>

                <IconButton size="small" sx={{ color: "#64748B", p: 0.5 }}>
                  <EditOutlinedIcon sx={{ fontSize: 20 }} />
                </IconButton>
                
                <KeyboardArrowRightIcon sx={{ color: "#CBD5E1", fontSize: 24 }} />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <AssessmentDetailDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        assessment={selectedAssessment}
      />

      <CreateAssessmentModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </Box>
  );
}
