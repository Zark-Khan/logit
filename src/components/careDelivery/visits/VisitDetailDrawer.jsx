import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Drawer,
  Divider,
  Paper,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import CheckIcon from "@mui/icons-material/Check";
import StatusBadge from "../shared/StatusBadge";
import {
  ActivityIcon,
  ClipboardCheckIcon,
  PillIcon,
  FileIcon,
} from "../../staffOverview/LineIcons";

// Mock visit content (same for every log until there's real per-visit data)
const TASKS = [
  { label: "Personal care & washing", status: "Completed" },
  { label: "Meal preparation (Breakfast)", status: "Completed" },
  { label: "Mobility support (Transfer to chair)", status: "Completed" },
  { label: "Companionship & wellbeing check", status: "Completed" },
  {
    label: "Housekeeping (Light cleaning)",
    status: "Skipped",
    reason: "Client requested to rest",
  },
];

const OBSERVATIONS = [
  { label: "MOOD", value: "Positive", color: "#059669" },
  { label: "APPETITE", value: "Good", color: "#059669" },
  { label: "MOBILITY", value: "Stable", color: "#2563EB" },
];

export function LabelText({ children }) {
  return (
    <Typography
      fontSize="9px"
      fontWeight={700}
      color="#94A3B8"
      sx={{ mb: 0.4, letterSpacing: "0.06em" }}
    >
      {children}
    </Typography>
  );
}

export function ValueText({ children }) {
  return (
    <Typography fontSize="13px" fontWeight={700} color="text.primary">
      {children}
    </Typography>
  );
}

// "08:58 - 10:02" -> "08:58 - 10:02 (64m)"; leaves "Ongoing" / "--" as-is
const withDuration = (actual) => {
  const [start, end] = (actual || "").split(" - ");
  const toMin = (t) => {
    const m = /^(\d{1,2}):(\d{2})$/.exec((t || "").trim());
    return m ? Number(m[1]) * 60 + Number(m[2]) : null;
  };
  const a = toMin(start);
  const b = toMin(end);
  return a !== null && b !== null && b > a ? `${actual} (${b - a}m)` : actual;
};

function SectionCard({ icon, iconColor, title, action, children }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.25,
        borderRadius: "16px",
        border: "1px solid #F1F5F9",
        bgcolor: "#fff",
        boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: iconColor }}>
          {icon}
          <Typography fontSize="14px" fontWeight={700} color="text.primary">
            {title}
          </Typography>
        </Box>
        {action}
      </Box>
      {children}
    </Paper>
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
        gap: 1.5,
        px: 1.5,
        py: 1.1,
        borderRadius: "10px",
        bgcolor: "#F8FAFC",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
        <Box
          sx={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            bgcolor: isSkipped ? "#FFFBEB" : "#ECFDF5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {isSkipped ? (
            <WarningAmberRoundedIcon sx={{ color: "#F59E0B", fontSize: 14 }} />
          ) : (
            <CheckCircleOutlineIcon sx={{ color: "#10B981", fontSize: 14 }} />
          )}
        </Box>
        <Box>
          <Typography fontSize="12px" fontWeight={500} color="text.primary">
            {label}
          </Typography>
          {reason && (
            <Typography
              fontSize="9px"
              fontWeight={700}
              color="#F43F5E"
              sx={{ fontStyle: "italic" }}
            >
              Reason: {reason}
            </Typography>
          )}
        </Box>
      </Box>
      <Typography
        fontSize="10px"
        fontWeight={700}
        color={isSkipped ? "#D97706" : "#059669"}
        sx={{ flexShrink: 0 }}
      >
        {status}
      </Typography>
    </Box>
  );
}

export default function VisitDetailDrawer({ open, onClose, log }) {
  // Approval is per drawer session; the parent remounts this per log
  const [approved, setApproved] = useState(false);
  if (!log) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 440 },
          p: 0,
          backgroundColor: "#F8FAFC",
          overflow: "hidden",
        },
      }}
      sx={{ zIndex: 1301 }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Header */}
        <Box
          sx={{
            px: 2.5,
            py: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            bgcolor: "#fff",
          }}
        >
          <Box>
            <Typography fontSize="18px" fontWeight={700} color="text.primary">
              Visit Detail
            </Typography>
            <Typography fontSize="11px" color="text.grey">
              Ref: VST-2026-0301-{String(40 + log.id).padStart(3, "0")}
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small" aria-label="Close" sx={{ color: "text.grey" }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: "#F1F5F9" }} />

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
          <SectionCard
            icon={<ActivityIcon size={16} />}
            iconColor="#2563EB"
            title="Visit Summary"
            action={<StatusBadge status={log.status} />}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                rowGap: 2,
                columnGap: 2,
              }}
            >
              <Box>
                <LabelText>CLIENT</LabelText>
                <ValueText>{log.client}</ValueText>
              </Box>
              <Box>
                <LabelText>CARER</LabelText>
                <ValueText>{log.carer}</ValueText>
              </Box>
              <Box>
                <LabelText>ACTUAL TIME</LabelText>
                <ValueText>{withDuration(log.actual)}</ValueText>
              </Box>
              <Box>
                <LabelText>LOCATION</LabelText>
                <ValueText>221B Baker Street</ValueText>
              </Box>
            </Box>
          </SectionCard>

          <SectionCard
            icon={<ClipboardCheckIcon size={16} />}
            iconColor="#10B981"
            title="Care Tasks Checklist"
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {TASKS.map((t) => (
                <TaskItem key={t.label} {...t} />
              ))}
            </Box>
          </SectionCard>

          <SectionCard
            icon={<PillIcon size={16} />}
            iconColor="#8B5CF6"
            title="Medication Administration"
          >
            <Box
              sx={{
                p: 1.75,
                borderRadius: "10px",
                border: "1px solid #EDE9FE",
                bgcolor: "#fff",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography fontSize="13px" fontWeight={700} color="text.primary">
                  Paracetamol 500mg
                </Typography>
                <StatusBadge status="GIVEN" />
              </Box>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <Typography fontSize="11px" color="text.grey">
                  Dosage:{" "}
                  <Box component="span" sx={{ fontWeight: 700, color: "text.primary" }}>
                    2 Tablets
                  </Box>
                </Typography>
                <Typography fontSize="11px" color="text.grey">
                  Time:{" "}
                  <Box component="span" sx={{ fontWeight: 700, color: "text.primary" }}>
                    09:15 AM
                  </Box>
                </Typography>
              </Box>
              <Typography
                fontSize="9px"
                color="#94A3B8"
                sx={{ fontStyle: "italic", mt: 1 }}
              >
                Notes: Taken with water, no issues reported.
              </Typography>
            </Box>
          </SectionCard>

          <SectionCard
            icon={<FileIcon size={16} />}
            iconColor="#475569"
            title="Visit Notes"
          >
            <Box sx={{ p: 1.75, borderRadius: "10px", bgcolor: "#F8FAFC", mb: 2 }}>
              <Typography fontSize="12px" color="#475569" sx={{ lineHeight: 1.7 }}>
                Arthur was in good spirits this morning. He enjoyed his breakfast
                and was able to transfer to his armchair with minimal assistance.
                We discussed his upcoming doctor's appointment. No concerns noted
                regarding his skin or mobility today.
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 3 }}>
              {OBSERVATIONS.map((o) => (
                <Box key={o.label}>
                  <LabelText>{o.label}</LabelText>
                  <Typography fontSize="11px" fontWeight={700} color={o.color}>
                    {o.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </SectionCard>
        </Box>

        {/* Footer */}
        <Box sx={{ p: 2, borderTop: "1px solid #F1F5F9", bgcolor: "#fff" }}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => setApproved(true)}
            disabled={approved}
            startIcon={approved ? <CheckIcon /> : null}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              bgcolor: "#0EA5E9",
              color: "#fff",
              fontWeight: 700,
              fontSize: "14px",
              py: 1.3,
              boxShadow: "0 8px 20px rgba(14, 165, 233, 0.2)",
              "&:hover": { bgcolor: "#0284C7" },
              "&.Mui-disabled": { bgcolor: "#10B981", color: "#fff" },
            }}
          >
            {approved ? "Log Approved" : "Approve Log"}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
