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
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import StatusBadge from "../shared/StatusBadge";

export default function AssessmentDetailDrawer({ open, onClose, assessment }) {
  if (!assessment) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 672 },
          bgcolor: "#fff",
          p: 0,
          zIndex: 1301,
        },
      }}
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
            p: 4,
            pb: 3,
            bgcolor: "#fff",
            borderBottom: "1px solid #F1F5F9",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "16px",
                  bgcolor: "#FAF5FF", // Light purple
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AssignmentOutlinedIcon
                  sx={{ color: "#9333EA", fontSize: 28 }}
                />
              </Box>
              <Box>
                <Typography
                  fontSize="20px"
                  fontWeight={700}
                  color="text.primary"
                >
                  {assessment.title}
                </Typography>
                <Typography fontSize="12px" color="text.light" fontWeight={400}>
                  {assessment.client} &bull; Ref: {assessment.ref}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                size="small"
                sx={{
                  bgcolor: "#F8FAFC",
                  "&:hover": { bgcolor: "#E2E8F0" },
                  width: 40,
                  height: 40,
                }}
              >
                <EditOutlinedIcon
                  sx={{ fontSize: 20, color: "text.primary" }}
                />
              </IconButton>
              <IconButton
                size="small"
                onClick={onClose}
                sx={{ width: 40, height: 40 }}
              >
                <CloseIcon sx={{ fontSize: 24, color: "text.primary" }} />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Content Area */}
        <Box sx={{ flex: 1, overflowY: "auto", p: 4 }}>
          {/* Stats Row */}
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <Box
              sx={{
                flex: 1,
                bgcolor: "#fff",
                p: 2.5,
                borderRadius: "24px",
                display: "flex",
                flexDirection: "column",
                gap: 1,
                border: "1px solid #F1F5F9",
              }}
            >
              <Typography
                fontSize="10px"
                fontWeight={700}
                color="text.grey"
                sx={{ letterSpacing: "0.05em" }}
              >
                DATE
              </Typography>
              <Typography fontSize="14px" fontWeight={700} color="text.primary">
                {assessment.date}
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                bgcolor: "#fff",
                p: 2.5,
                borderRadius: "24px",
                display: "flex",
                flexDirection: "column",
                gap: 1,
                alignItems: "flex-start",
                border: "1px solid #F1F5F9",
              }}
            >
              <Typography
                fontSize="10px"
                fontWeight={700}
                color="text.grey"
                sx={{ letterSpacing: "0.05em" }}
              >
                RISK LEVEL
              </Typography>
              <StatusBadge status={assessment.riskLevel} />
            </Box>
            <Box
              sx={{
                flex: 1,
                bgcolor: "#fff",
                p: 2.5,
                borderRadius: "24px",
                display: "flex",
                flexDirection: "column",
                gap: 1,
                alignItems: "flex-start",
                border: "1px solid #F1F5F9",
              }}
            >
              <Typography
                fontSize="10px"
                fontWeight={700}
                color="text.grey"
                sx={{ letterSpacing: "0.05em" }}
              >
                STATUS
              </Typography>
              <StatusBadge status={assessment.status} />
            </Box>
          </Box>

          {/* Assessed By Row */}
          <Box
            sx={{
              bgcolor: "#fff",
              p: 3,
              borderRadius: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  fontSize: "14px",
                  fontWeight: 700,
                  bgcolor: "#F1F5F9",
                  color: "text.primary",
                }}
              >
                {assessment.initials}
              </Avatar>
              <Box>
                <Typography
                  fontSize="10px"
                  fontWeight={700}
                  color="text.grey"
                  sx={{ letterSpacing: "0.05em", mb: 0.5 }}
                >
                  ASSESSED BY
                </Typography>
                <Typography
                  fontSize="14px"
                  fontWeight={700}
                  color="text.primary"
                >
                  {assessment.assessedBy}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Typography
                fontSize="10px"
                fontWeight={700}
                color="text.grey"
                sx={{ letterSpacing: "0.05em", mb: 0.5 }}
              >
                OUTCOME SCORE
              </Typography>
              <Typography fontSize="24px" fontWeight={700} color="#2563EB">
                {assessment.score}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ bgcolor: "#fff", borderRadius: "24px", p: 3, mb: 4 }}>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AssignmentOutlinedIcon
                  sx={{ color: "#A855F7", fontSize: 18 }}
                />
              </Box>
              <Typography fontSize="16px" fontWeight={700} color="text.primary">
                Assessment Details
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {assessment.details && assessment.details.length > 0 ? (
                assessment.details.map((detail, index) => (
                  <Box key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                        gap: 2,
                      }}
                    >
                      <Typography
                        fontSize="14px"
                        fontWeight={700}
                        color="text.primary"
                      >
                        {detail.question}
                      </Typography>
                      <Typography
                        fontSize="12px"
                        fontWeight={700}
                        color="#0EA5E9"
                        sx={{
                          bgcolor: "#EFF6FF",
                          px: 2,
                          py: 1,
                          borderRadius: "12px",
                          flexShrink: 0,
                        }}
                      >
                        {detail.answer}
                      </Typography>
                    </Box>
                    <Typography
                      fontSize="12px"
                      color="text.light"
                      fontStyle="italic"
                    >
                      {detail.notes}
                    </Typography>
                    {index < assessment.details.length - 1 && (
                      <Box sx={{ mt: 3, height: "1px", bgcolor: "#F1F5F9" }} />
                    )}
                  </Box>
                ))
              ) : (
                <Typography fontSize="13px" color="text.light">
                  No details available for this assessment.
                </Typography>
              )}
            </Box>
          </Box>
        </Box>

        {/* Footer */}
        <Box sx={{ p: 3, borderTop: "1px solid #F1F5F9", bgcolor: "#fff" }}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<FileDownloadOutlinedIcon />}
            sx={{
              borderRadius: "12px",
              bgcolor: "#0EA5E9",
              color: "#fff",
              py: 1.5,
              fontWeight: 700,
              textTransform: "none",
              fontSize: "14px",
              "&:hover": { bgcolor: "#0284C7" },
              boxShadow: "none",
            }}
          >
            Download Report
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
