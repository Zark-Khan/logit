import React from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Grid,
  Paper,
  Avatar,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { TargetIcon, PencilIcon } from "../../staffOverview/LineIcons";
import StatusBadge from "../shared/StatusBadge";
import CarePlanDetailDrawer from "./CarePlanDetailDrawer";
import CreateCarePlanModal from "./CreateCarePlanModal";
import { INITIAL_PLANS, RISK_COLORS } from "./carePlanData";

export default function CarePlansTab() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [createModalOpen, setCreateModalOpen] = React.useState(false);
  const [selectedPlan, setSelectedPlan] = React.useState(null);
  const [plans, setPlans] = React.useState(INITIAL_PLANS);
  const [search, setSearch] = React.useState("");

  const query = search.trim().toLowerCase();
  const visiblePlans = plans.filter(
    (p) => !query || p.name.toLowerCase().includes(query),
  );

  const handleCreatePlan = (plan) => {
    setPlans((prev) => [
      ...prev,
      { ...plan, id: Math.max(0, ...prev.map((p) => p.id)) + 1 },
    ]);
    setCreateModalOpen(false);
  };

  const handleViewPlan = (plan) => {
    setSelectedPlan(plan);
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
            bgcolor: "#EFF6FF",
            color: "#2563EB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TargetIcon size={18} />
        </Box>
        <Typography fontSize="20px" fontWeight={700} color="text.primary">
          Care Plans
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
          placeholder="Search by client or carer..."
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
              py: "1px !important ",
            }}
          >
            Create Care Plan
          </Button>
        </Box>
      </Box>

      {/* Plan Cards Grid */}
      <Grid container spacing={3} sx={{ flexWrap: "wrap" }}>
        {visiblePlans.map((plan) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={plan.id}>
            <PlanCard plan={plan} onView={() => handleViewPlan(plan)} />
          </Grid>
        ))}
      </Grid>
      {visiblePlans.length === 0 && (
        <Typography
          fontSize="14px"
          color="text.secondary"
          sx={{ py: 6, textAlign: "center" }}
        >
          No care plans match "{search}".
        </Typography>
      )}

      <CarePlanDetailDrawer
        key={selectedPlan?.id ?? "none"}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        plan={selectedPlan}
      />

      <CreateCarePlanModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreatePlan}
      />
    </Box>
  );
}

function PlanCard({ plan, onView }) {
  const riskColors = RISK_COLORS;

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "24px",
        border: "1px solid #83D8FF",
        bgcolor: "#E0F5FF",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box sx={{ p: 2.5 }}>
        {/* Card Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: "#fff",
                color: "#666666",
                fontSize: "12px",
                fontWeight: 700,
                border: "1px solid #E2E8F0",
              }}
            >
              {plan.initials}
            </Avatar>
            <Box>
              <Typography fontSize="16px" fontWeight={700} color="text.primary">
                {plan.name}
              </Typography>
              <Typography fontSize="12px" color="text.light" fontWeight={400}>
                Next review: {plan.nextReview}
              </Typography>
            </Box>
          </Box>
          <StatusBadge status={plan.status} />
        </Box>

        {/* Data Points */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 1,
            mb: 2.5,
          }}
        >
          <Box sx={{ textAlign: "center", flex: 1 }}>
            <Typography fontSize="18px" fontWeight={700} color="text.primary">
              {plan.goalsList.length}
            </Typography>
            <Typography fontSize="10px" fontWeight={700} color="text.light">
              GOALS
            </Typography>
          </Box>
          <Box
            sx={{
              height: 30,
              width: "1px",
              bgcolor: "#fff",
            }}
          />
          <Box sx={{ textAlign: "center", flex: 1 }}>
            <Typography fontSize="18px" fontWeight={700} color="text.primary">
              {plan.routine.length}
            </Typography>
            <Typography fontSize="10px" fontWeight={700} color="text.light">
              TASKS
            </Typography>
          </Box>
          <Box
            sx={{
              height: 30,
              width: "1px",
              bgcolor: "#fff",
            }}
          />
          <Box sx={{ textAlign: "center", flex: 1 }}>
            <Typography
              fontSize="18px"
              fontWeight={700}
              sx={{ color: riskColors[plan.risk] }}
            >
              {plan.risk}
            </Typography>
            <Typography fontSize="10px" fontWeight={700} color="text.light">
              RISK
            </Typography>
          </Box>
        </Box>

        {/* Actions Bar */}
        <Box
          sx={{
            mt: 2,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Box
            component="button"
            type="button"
            onClick={onView}
            sx={{
              border: "none",
              fontFamily: "inherit",
              flex: 1,
              height: 44,
              bgcolor: "#fff",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              cursor: "pointer",
              transition: "all 0.2s",
              "&:hover": { bgcolor: "#f8fafc" },
            }}
          >
            <VisibilityOutlinedIcon sx={{ fontSize: 18, color: "text.grey" }} />
            <Typography fontSize="14px" fontWeight={700} color="text.grey">
              View Plan
            </Typography>
          </Box>
          <IconButton
            size="small"
            aria-label={`Edit ${plan.name}'s care plan`}
            onClick={onView}
            sx={{
              width: 44,
              height: 44,
              bgcolor: "#fff",
              borderRadius: "16px",
              color: "text.grey",
              "&:hover": { bgcolor: "#f8fafc" },
            }}
          >
            <PencilIcon size={16} />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
}
