import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Drawer,
  Divider,
  Paper,
  Avatar,
  Button,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  TargetIcon,
  ClipboardListIcon,
  ShieldAlertIcon,
  RefreshIcon,
  PencilIcon,
  DownloadIcon,
} from "../../staffOverview/LineIcons";
import { PLAN_STATUS_DISPLAY, RISK_COLORS, TIMES_OF_DAY } from "./carePlanData";

const PRIORITY_STYLES = {
  Low: { bgcolor: "#ECFDF5", color: "#059669" },
  Medium: { bgcolor: "#EFF6FF", color: "#2563EB" },
  High: { bgcolor: "#FFF1F2", color: "#E11D48" },
};

const cardSx = {
  p: 2.25,
  borderRadius: "16px",
  border: "1px solid #F1F5F9",
  bgcolor: "#fff",
  boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
};

function SectionTitle({ icon, color, children }) {
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.75, color }}
    >
      {icon}
      <Typography fontSize="14px" fontWeight={700} color="text.primary">
        {children}
      </Typography>
    </Box>
  );
}

function SmallLabel({ children }) {
  return (
    <Typography
      fontSize="9px"
      fontWeight={700}
      color="text.grey"
      sx={{ mb: 0.75, letterSpacing: "0.06em" }}
    >
      {children}
    </Typography>
  );
}

export default function CarePlanDetailDrawer({ open, onClose, plan }) {
  if (!plan) return null;

  const status = PLAN_STATUS_DISPLAY[plan.status] || PLAN_STATUS_DISPLAY.DRAFT;
  const routineByTime = TIMES_OF_DAY.map((time) => ({
    time,
    tasks: plan.routine.filter((t) => t.time === time),
  })).filter((g) => g.tasks.length > 0);

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
            alignItems: "center",
            bgcolor: "#fff",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: "#F1F5F9",
                color: "text.grey",
                fontSize: "13px",
                fontWeight: 700,
                borderRadius: "12px",
              }}
            >
              {plan.initials}
            </Avatar>
            <Box>
              <Typography fontSize="18px" fontWeight={700} color="text.primary">
                {plan.name}
              </Typography>
              <Typography fontSize="11px" color="text.grey">
                Care Plan Ref: CP-{String(plan.id).padStart(3, "0")}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <IconButton
              size="small"
              aria-label="Edit care plan"
              sx={{ color: "text.grey" }}
            >
              <PencilIcon size={16} />
            </IconButton>
            <IconButton
              onClick={onClose}
              size="small"
              aria-label="Close"
              sx={{ color: "text.grey" }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
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
          <Box
            sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}
          >
            <Paper elevation={0} sx={{ ...cardSx, p: 1.75 }}>
              <SmallLabel>PLAN STATUS</SmallLabel>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    bgcolor: status.color,
                  }}
                />
                <Typography
                  fontSize="13px"
                  fontWeight={700}
                  color="text.primary"
                >
                  {status.label}
                </Typography>
              </Box>
            </Paper>
            <Paper elevation={0} sx={{ ...cardSx, p: 1.75 }}>
              <SmallLabel>RISK LEVEL</SmallLabel>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75,
                  color: RISK_COLORS[plan.risk],
                }}
              >
                <ShieldAlertIcon size={15} />
                <Typography
                  fontSize="13px"
                  fontWeight={700}
                  color="text.primary"
                >
                  {plan.risk} Risk
                </Typography>
              </Box>
            </Paper>
          </Box>

          <Paper elevation={0} sx={cardSx}>
            <SectionTitle icon={<TargetIcon size={16} />} color="#2563EB">
              Care Goals ({plan.goalsList.length})
            </SectionTitle>
            <Stack spacing={1}>
              {plan.goalsList.map((goal, i) => (
                <Box
                  key={goal.id}
                  sx={{
                    display: "flex",
                    gap: 1.25,
                    borderRadius: "10px",
                    border: "1px solid #F1F5F9",
                    bgcolor: "#FCFDFE",
                    p: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      flexShrink: 0,
                      borderRadius: "6px",
                      bgcolor: "#fff",
                      border: "1px solid #F1F5F9",
                      fontSize: "9px",
                      fontWeight: 700,
                      color: "#94A3B8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {i + 1}
                  </Box>
                  <Box>
                    <Typography
                      fontSize="12px"
                      color="text.primary"
                      sx={{ mb: 0.75, lineHeight: 1.55 }}
                    >
                      {goal.text}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography
                        fontSize="9px"
                        fontWeight={700}
                        color="#94A3B8"
                      >
                        PRIORITY:
                      </Typography>
                      <Box
                        sx={{
                          ...PRIORITY_STYLES[goal.priority],
                          px: 0.75,
                          py: 0.1,
                          borderRadius: "4px",
                          fontSize: "9px",
                          fontWeight: 700,
                        }}
                      >
                        {goal.priority}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Paper>

          <Paper elevation={0} sx={cardSx}>
            <SectionTitle
              icon={<ClipboardListIcon size={16} />}
              color="#10B981"
            >
              Daily Routine & Tasks ({plan.routine.length})
            </SectionTitle>
            {routineByTime.map((group, idx) => (
              <Box key={group.time} sx={{ mt: idx === 0 ? 0 : 1.75 }}>
                <SmallLabel>{group.time.toUpperCase()}</SmallLabel>
                <Stack spacing={0.75}>
                  {group.tasks.map((task) => (
                    <Box
                      key={task.id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        px: 1.25,
                        py: 0.9,
                        borderRadius: "8px",
                        bgcolor: "#FCFDFE",
                        border: "1px solid #F8FAFC",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.25,
                        }}
                      >
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            bgcolor: "#10B981",
                            flexShrink: 0,
                          }}
                        />
                        <Typography fontSize="12px" color="text.primary">
                          {task.title}
                        </Typography>
                      </Box>
                      <Typography
                        fontSize="9px"
                        fontWeight={600}
                        color="text.grey"
                      >
                        Daily
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            ))}
          </Paper>

          <Paper elevation={0} sx={cardSx}>
            <SectionTitle icon={<ShieldAlertIcon size={16} />} color="#E11D48">
              Risk Mitigation Strategies
            </SectionTitle>
            <Box
              sx={{
                p: 1.75,
                borderRadius: "10px",
                border: "1px solid #FFE4E6",
                bgcolor: "#FFF8F8",
              }}
            >
              <Typography
                fontSize="12px"
                color="#475569"
                sx={{ lineHeight: 1.7 }}
              >
                {plan.riskNotes || "No risk notes recorded."}
              </Typography>
            </Box>
          </Paper>

          <Paper elevation={0} sx={cardSx}>
            <SectionTitle icon={<RefreshIcon size={16} />} color="#475569">
              Review History
            </SectionTitle>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
              {[
                {
                  label: "Last Review",
                  value: plan.lastReview,
                  dot: "#CBD5E1",
                  color: "text.primary",
                },
                {
                  label: "Next Review Due",
                  value: plan.nextReview,
                  dot: "#2563EB",
                  color: "#2563EB",
                },
              ].map((r) => (
                <Box
                  key={r.label}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        bgcolor: r.dot,
                      }}
                    />
                    <Typography fontSize="11px" color="text.grey">
                      {r.label}
                    </Typography>
                  </Box>
                  <Typography fontSize="11px" fontWeight={700} color={r.color}>
                    {r.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>

        {/* Footer */}
        <Box sx={{ p: 2, borderTop: "1px solid #F1F5F9", bgcolor: "#fff" }}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<DownloadIcon size={16} />}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              bgcolor: "#0EA5E9",
              color: "#fff",
              fontWeight: 700,
              fontSize: "14px",
              py: 1.3,
              boxShadow: "0 8px 20px rgba(14,165,233,0.2)",
              "&:hover": { bgcolor: "#0284C7" },
            }}
          >
            Export PDF
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
