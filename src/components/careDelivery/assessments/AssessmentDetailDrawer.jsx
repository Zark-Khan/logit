import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Avatar,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import StatusBadge from "../shared/StatusBadge";
import {
  FileIcon,
  PencilIcon,
  DownloadIcon,
} from "../../staffOverview/LineIcons";
import { initialsOf, refOf } from "./assessmentData";

const cardSx = {
  bgcolor: "#fff",
  borderRadius: "16px",
  border: "1px solid #F1F5F9",
  boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
};

const labelSx = {
  fontSize: "9px",
  fontWeight: 700,
  color: "text.grey",
  letterSpacing: "0.06em",
};

// Plain-text report so "Download Report" produces a real file without a backend
const buildReport = (a) =>
  [
    `${a.title}`,
    `Client: ${a.client}`,
    `Ref: ${refOf(a.id)}`,
    `Date: ${a.date}`,
    `Assessed by: ${a.assessedBy}`,
    `Risk level: ${a.riskLevel}`,
    `Status: ${a.status}`,
    `Outcome score: ${a.score}`,
    "",
    "Assessment details",
    "------------------",
    ...(a.details.length
      ? a.details.flatMap((d, i) => [
          `${i + 1}. ${d.question}`,
          `   Response: ${d.answer}`,
          ...(d.notes ? [`   Notes: ${d.notes}`] : []),
        ])
      : ["No details recorded."]),
  ].join("\n");

export default function AssessmentDetailDrawer({ open, onClose, assessment }) {
  if (!assessment) return null;

  const handleDownload = () => {
    const blob = new Blob([buildReport(assessment)], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${refOf(assessment.id)}-${assessment.title.replace(/\s+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: { xs: "100%", sm: 520 }, p: 0 } }}
      sx={{ zIndex: 1301 }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          bgcolor: "#F8FAFC",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            px: 2.5,
            py: 2,
            bgcolor: "#fff",
            borderBottom: "1px solid #F1F5F9",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "12px",
                bgcolor: "#FAF5FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AssignmentOutlinedIcon sx={{ color: "#9333EA", fontSize: 22 }} />
            </Box>
            <Box>
              <Typography fontSize="18px" fontWeight={700} color="text.primary">
                {assessment.title}
              </Typography>
              <Typography fontSize="11px" color="text.light">
                {assessment.client} &bull; Ref: {refOf(assessment.id)}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <IconButton
              size="small"
              aria-label="Edit assessment"
              sx={{
                bgcolor: "#F8FAFC",
                color: "text.grey",
                "&:hover": { bgcolor: "#E2E8F0" },
              }}
            >
              <PencilIcon size={15} />
            </IconButton>
            <IconButton
              size="small"
              onClick={onClose}
              aria-label="Close"
              sx={{ color: "text.grey" }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Content */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 1.5,
            }}
          >
            <Box sx={{ ...cardSx, p: 1.75 }}>
              <Typography sx={{ ...labelSx, mb: 0.75 }}>DATE</Typography>
              <Typography fontSize="13px" fontWeight={700} color="text.primary">
                {assessment.date}
              </Typography>
            </Box>
            <Box sx={{ ...cardSx, p: 1.75 }}>
              <Typography sx={{ ...labelSx, mb: 0.75 }}>RISK LEVEL</Typography>
              <StatusBadge
                status={assessment.riskLevel}
                label={assessment.riskLevel.replace(" RISK", "")}
              />
            </Box>
            <Box sx={{ ...cardSx, p: 1.75 }}>
              <Typography sx={{ ...labelSx, mb: 0.75 }}>STATUS</Typography>
              <StatusBadge status={assessment.status} />
            </Box>
          </Box>

          <Box
            sx={{
              ...cardSx,
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar
                sx={{
                  width: 34,
                  height: 34,
                  fontSize: "12px",
                  fontWeight: 700,
                  bgcolor: "#F1F5F9",
                  color: "text.primary",
                }}
              >
                {initialsOf(assessment.assessedBy)}
              </Avatar>
              <Box>
                <Typography sx={{ ...labelSx, mb: 0.25 }}>
                  ASSESSED BY
                </Typography>
                <Typography
                  fontSize="13px"
                  fontWeight={700}
                  color="text.primary"
                >
                  {assessment.assessedBy}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Typography sx={{ ...labelSx, mb: 0.25 }}>
                OUTCOME SCORE
              </Typography>
              <Typography fontSize="20px" fontWeight={700} color="#2563EB">
                {assessment.score}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ ...cardSx, p: 2.25 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 2,
                color: "#A855F7",
              }}
            >
              <FileIcon size={16} />
              <Typography fontSize="14px" fontWeight={700} color="text.primary">
                Assessment Details
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
              {assessment.details.length > 0 ? (
                assessment.details.map((detail, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 1.75,
                      borderRadius: "12px",
                      bgcolor: "#FCFDFE",
                      border: "1px solid #F1F5F9",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 2,
                        mb: detail.notes ? 0.75 : 0,
                      }}
                    >
                      <Typography
                        fontSize="13px"
                        fontWeight={700}
                        color="text.primary"
                      >
                        {detail.question}
                      </Typography>
                      <Box
                        sx={{
                          fontSize: "10px",
                          fontWeight: 700,
                          color: "#2563EB",
                          bgcolor: "#EFF6FF",
                          px: 1,
                          py: 0.3,
                          borderRadius: "6px",
                          flexShrink: 0,
                        }}
                      >
                        {detail.answer}
                      </Box>
                    </Box>
                    {detail.notes && (
                      <Typography
                        fontSize="11px"
                        color="text.light"
                        fontStyle="italic"
                      >
                        "{detail.notes}"
                      </Typography>
                    )}
                  </Box>
                ))
              ) : (
                <Typography fontSize="13px" color="text.light">
                  No details recorded for this assessment.
                </Typography>
              )}
            </Box>
          </Box>
        </Box>

        {/* Footer */}
        <Box sx={{ p: 2, borderTop: "1px solid #F1F5F9", bgcolor: "#fff" }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleDownload}
            startIcon={<DownloadIcon size={16} />}
            sx={{
              borderRadius: "12px",
              bgcolor: "#0EA5E9",
              color: "#fff",
              py: 1.3,
              fontWeight: 700,
              textTransform: "none",
              fontSize: "14px",
              boxShadow: "0 8px 20px rgba(14,165,233,0.2)",
              "&:hover": { bgcolor: "#0284C7" },
            }}
          >
            Download Report
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
