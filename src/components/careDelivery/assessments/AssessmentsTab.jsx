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
import { FileIcon, PencilIcon } from "../../staffOverview/LineIcons";
import StatusBadge from "../shared/StatusBadge";
import AssessmentDetailDrawer from "./AssessmentDetailDrawer";
import CreateAssessmentModal from "./CreateAssessmentModal";
import { INITIAL_ASSESSMENTS } from "./assessmentData";

export default function AssessmentsTab() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [assessments, setAssessments] = useState(INITIAL_ASSESSMENTS);
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();
  const visible = assessments.filter(
    (a) =>
      !query ||
      [a.title, a.client, a.assessedBy].some((v) =>
        v.toLowerCase().includes(query),
      ),
  );

  const handleCreate = (assessment) => {
    // Newest first, matching "Recent Assessments"
    setAssessments((prev) => [
      { ...assessment, id: Math.max(0, ...prev.map((a) => a.id)) + 1 },
      ...prev,
    ]);
    setCreateModalOpen(false);
  };

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
            width: 34,
            height: 34,
            borderRadius: "10px",
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
            "& input": { fontSize: "14px", color: "text.primary" },
            "& input::placeholder": { color: "#9CA3AF", opacity: 1 },
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
        <Typography
          fontSize="16px"
          fontWeight={700}
          color="text.primary"
          sx={{ p: 3 }}
        >
          Recent Assessments
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {visible.length === 0 && (
            <Typography
              fontSize="14px"
              color="text.secondary"
              sx={{ px: 3, pb: 3 }}
            >
              No assessments match "{search}".
            </Typography>
          )}
          {visible.map((item) => (
            <Box
              key={item.id}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOpenDrawer(item);
                }
              }}
              sx={{
                "&:hover": { bgcolor: "rgba(255,255,255,0.45)" },
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
                  <Box sx={{ color: "#A855F7", display: "flex" }}>
                    <FileIcon size={20} />
                  </Box>
                </Box>
                <Box>
                  <Typography
                    fontSize="15px"
                    fontWeight={700}
                    color="text.primary"
                    mb={0.2}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    fontSize="13px"
                    color="text.light"
                    fontWeight={400}
                  >
                    {item.client} &bull; {item.date}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Box sx={{ textAlign: "center", minWidth: 60 }}>
                  <Typography
                    fontSize="14px"
                    fontWeight={700}
                    color="text.primary"
                  >
                    {item.score}
                  </Typography>
                  <Typography
                    fontSize="9px"
                    fontWeight={700}
                    color="text.grey"
                    sx={{ mt: 0.2 }}
                  >
                    OUTCOME
                  </Typography>
                </Box>

                <Box
                  sx={{
                    minWidth: 90,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <StatusBadge status={item.riskLevel} />
                </Box>

                <IconButton
                  size="small"
                  aria-label={`Edit ${item.title} for ${item.client}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenDrawer(item);
                  }}
                  sx={{ color: "#64748B", p: 0.75 }}
                >
                  <PencilIcon size={16} />
                </IconButton>

                <KeyboardArrowRightIcon
                  sx={{ color: "#CBD5E1", fontSize: 24 }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <AssessmentDetailDrawer
        key={selectedAssessment?.id ?? "none"}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        assessment={selectedAssessment}
      />

      <CreateAssessmentModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreate}
      />
    </Box>
  );
}
