import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Drawer,
  Divider,
  Paper,
  Grid,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TimelineIcon from "@mui/icons-material/Timeline";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import StatusBadge from "../shared/StatusBadge";

export function LabelText({ children }) {
  return (
    <Typography
      fontSize="11px"
      fontWeight={700}
      color="#94A3B8"
      sx={{ mb: 0.5, letterSpacing: "0.02em" }}
    >
      {children}
    </Typography>
  );
}

export function ValueText({ children }) {
  return (
    <Typography fontSize="14px" fontWeight={700} color="text.primary">
      {children}
    </Typography>
  );
}

function TaskItem({ label, status, reason }) {
  const isSkipped = status === "Skipped";
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        borderRadius: "12px",
        border: "1px solid #F8FAFC",
        bgcolor: "#f8fafc",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            bgcolor: isSkipped ? "#FFFBEB" : "#ECFDF5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {isSkipped ? (
            <ErrorOutlineIcon sx={{ color: "#F59E0B", fontSize: 18 }} />
          ) : (
            <CheckCircleOutlineIcon sx={{ color: "#10B981", fontSize: 18 }} />
          )}
        </Box>
        <Box>
          <Typography fontSize="14px" fontWeight={600} color="text.primary">
            {label}
          </Typography>
          {reason && (
            <Typography
              fontSize="10px"
              fontWeight={700}
              color="#F43F5E"
              sx={{ fontStyle: "italic", mt: 0.2 }}
            >
              Reason: {reason}
            </Typography>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          color: isSkipped ? "#D97706" : "#059669",
          fontSize: "12px",
          fontWeight: 700,
        }}
      >
        {status}
      </Box>
    </Box>
  );
}

export default function VisitDetailDrawer({ open, onClose, log }) {
  if (!log) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 672 },
          p: 0,
          backgroundColor: "#f8fafc",
          overflow: "hidden",
          zIndex: 1301,
        },
      }}
      sx={{ zIndex: 1301 }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Header */}
        <Box
          sx={{
            p: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            bgcolor: "#fff",
          }}
        >
          <Box>
            <Typography fontSize="20px" fontWeight={700} color="text.primary">
              Visit Detail
            </Typography>
            <Typography fontSize="12px" color="text.grey" fontWeight={500}>
              Ref: VST-2026-0301-042
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{ color: "text.grey" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: "#F1F5F9" }} />

        {/* Content Area */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* Section 1: Visit Summary */}
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: "16px",
              border: "1px solid #F1F5F9",
              bgcolor: "#fff",
            }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <TimelineIcon sx={{ color: "#2563EB", fontSize: 20 }} />
                <Typography
                  fontSize="16px"
                  fontWeight={700}
                  color="text.primary"
                >
                  Visit Summary
                </Typography>
              </Box>
              <StatusBadge status={log.status} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Box>
                  <LabelText>CLIENT</LabelText>
                  <ValueText>{log.client}</ValueText>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <LabelText>CARER</LabelText>
                  <ValueText>{log.carer}</ValueText>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Box>
                  <LabelText>ACTUAL TIME</LabelText>
                  <ValueText>{log.actual} (64m)</ValueText>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <LabelText>LOCATION</LabelText>
                  <ValueText>221B Baker Street</ValueText>
                </Box>
              </Box>
            </Box>
          </Paper>

          {/* Section 2: Care Tasks Checklist */}
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: "16px",
              border: "1px solid #F1F5F9",
              bgcolor: "#fff",
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}
            >
              <AssignmentTurnedInIcon sx={{ color: "#10B981", fontSize: 20 }} />
              <Typography fontSize="16px" fontWeight={700} color="text.primary">
                Care Tasks Checklist
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <TaskItem label="Personal care & washing" status="Completed" />
              <TaskItem
                label="Meal preparation (Breakfast)"
                status="Completed"
              />
              <TaskItem
                label="Mobility support (Transfer to chair)"
                status="Completed"
              />
              <TaskItem
                label="Companionship & wellbeing check"
                status="Completed"
              />
              <TaskItem
                label="Housekeeping (Light cleaning)"
                status="Skipped"
                reason="Client requested to rest"
              />
            </Box>
          </Paper>

          {/* Section 3: Medication Administration */}
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: "16px",
              border: "1px solid #F1F5F9",
              bgcolor: "#fff",
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}
            >
              <MedicalServicesIcon sx={{ color: "#8B5CF6", fontSize: 20 }} />
              <Typography fontSize="16px" fontWeight={700} color="text.primary">
                Medication Administration
              </Typography>
            </Box>
            <Box
              sx={{
                p: 2,
                borderRadius: "12px",
                border: "1px solid #F8FAFC",
                bgcolor: "#F8FAFC",
              }}
            >
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography
                  fontSize="14px"
                  fontWeight={700}
                  color="text.primary"
                >
                  Paracetamol 500mg
                </Typography>
                <StatusBadge status="GIVEN" />
              </Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Typography
                    fontSize="12px"
                    fontWeight={500}
                    color="text.grey"
                  >
                    Dosage:
                  </Typography>
                  <Typography
                    fontSize="12px"
                    fontWeight={700}
                    color="text.primary"
                  >
                    2 Tablets
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                  }}
                >
                  <Typography
                    fontSize="12px"
                    fontWeight={500}
                    color="text.grey"
                  >
                    Time:
                  </Typography>
                  <Typography
                    fontSize="12px"
                    fontWeight={700}
                    color="text.primary"
                  >
                    09:15 AM
                  </Typography>
                </Box>
                <Box />
              </Box>
              <Typography
                fontSize="11px"
                color="#94A3B8"
                sx={{ fontStyle: "italic", mt: 2, display: "block" }}
              >
                Notes: Taken with water, no issues reported.
              </Typography>
            </Box>
          </Paper>

          {/* Section 4: Visit Notes */}
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: "16px",
              border: "1px solid #F1F5F9",
              bgcolor: "#fff",
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}
            >
              <DescriptionIcon sx={{ color: "#F59E0B", fontSize: 20 }} />
              <Typography fontSize="16px" fontWeight={700} color="text.primary">
                Visit Notes
              </Typography>
            </Box>
            <Typography
              fontSize="14px"
              color="#475569"
              sx={{ mb: 4, lineHeight: 1.7 }}
            >
              Arthur was in good spirits this morning. He enjoyed his breakfast
              and was able to transfer to his armchair with minimal assistance.
              We discussed his upcoming doctor's appointment. No concerns noted
              regarding his skin or mobility today.
            </Typography>
            <Box sx={{ display: "flex", gap: 5 }}>
              <Box>
                <Typography
                  fontSize="10px"
                  fontWeight={700}
                  color="#94A3B8"
                  mb={0.5}
                >
                  MOOD
                </Typography>
                <Typography fontSize="13px" fontWeight={700} color="#059669">
                  Positive
                </Typography>
              </Box>
              <Box>
                <Typography
                  fontSize="10px"
                  fontWeight={700}
                  color="#94A3B8"
                  mb={0.5}
                >
                  APPETITE
                </Typography>
                <Typography fontSize="13px" fontWeight={700} color="#059669">
                  Good
                </Typography>
              </Box>
              <Box>
                <Typography
                  fontSize="10px"
                  fontWeight={700}
                  color="#94A3B8"
                  mb={0.5}
                >
                  MOBILITY
                </Typography>
                <Typography fontSize="13px" fontWeight={700} color="#2563EB">
                  Stable
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Action Footer */}
        <Box sx={{ p: 3, borderTop: "1px solid #F1F5F9", bgcolor: "#fff" }}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              borderRadius: "14px",
              textTransform: "none",
              bgcolor: "#0EA5E9",
              color: "#fff",
              fontWeight: 700,
              fontSize: "16px",
              py: 1.8,
              boxShadow: "0 10px 20px rgba(14, 165, 233, 0.2)",
              "&:hover": { bgcolor: "#0284C7", boxShadow: "none" },
            }}
          >
            Approve Log
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
