import React, { useState } from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckIcon from "@mui/icons-material/Check";
import AssessmentModule from "./AssessmentModule";
import { GROUPS, getModuleById, COVERAGE } from "./config";
import { useCareAssessmentStore } from "../../../../store/useCareAssessmentStore";

function GroupStepper({ activeStep, maxStepReached, onStepClick }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 2,
        overflowX: "auto",
        pb: 1,
        "&::-webkit-scrollbar": { height: 6 },
        "&::-webkit-scrollbar-thumb": { bgcolor: "#E2E8F0", borderRadius: 3 },
      }}
    >
      {GROUPS.map((g) => {
        const isActive = g.step === activeStep;
        const isDone = g.step < activeStep;
        const reachable = g.step <= maxStepReached;
        return (
          <Box
            key={g.id}
            onClick={() => reachable && onStepClick(g.step)}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              minWidth: 104,
              cursor: reachable ? "pointer" : "default",
              opacity: reachable ? 1 : 0.55,
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: isActive ? "#0EA5E9" : isDone ? "#8AC642" : "#fff",
                border: isActive
                  ? "1px solid #0EA5E9"
                  : isDone
                  ? "1px solid #8AC642"
                  : "1px solid #E5E7EB",
              }}
            >
              {isDone ? (
                <CheckIcon sx={{ fontSize: 17, color: "#fff" }} />
              ) : (
                <Typography fontSize="13px" fontWeight={700} color={isActive ? "#fff" : "#475569"}>
                  {g.step}
                </Typography>
              )}
            </Box>
            <Typography
              fontSize="11px"
              fontWeight={700}
              align="center"
              color={isActive ? "#0EA5E9" : "#475569"}
              sx={{ lineHeight: 1.3 }}
            >
              {g.title}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

export default function CareAssessmentForm({ client }) {
  const [activeStep, setActiveStep] = useState(1);
  const [maxStepReached, setMaxStepReached] = useState(1);

  const getModuleValues = useCareAssessmentStore((s) => s.getModuleValues);
  const setField = useCareAssessmentStore((s) => s.setField);

  const group = GROUPS.find((g) => g.step === activeStep) || GROUPS[0];

  const goTo = (step) => {
    setActiveStep(step);
    setMaxStepReached((m) => Math.max(m, step));
  };

  const modules = group.modules.map((id) => ({ id, mod: getModuleById(id) }));
  const ready = modules.filter((m) => m.mod);
  const pending = modules.filter((m) => !m.mod);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <GroupStepper activeStep={activeStep} maxStepReached={maxStepReached} onStepClick={goTo} />

      <Box>
        <Typography fontSize="24px" fontWeight={700} color="#101828">
          {group.title}
        </Typography>
        <Typography fontSize="15px" color="text.light">
          {group.description}
        </Typography>
      </Box>

      {ready.map(({ id, mod }, i) => (
        <Box key={id}>
          {i > 0 && <Divider sx={{ mb: 4, borderColor: "#E2E8F0" }} />}
          <AssessmentModule
            module={mod}
            clientName={client.name}
            values={getModuleValues(client.id, id)}
            onChange={(fieldId, value) => setField(client.id, id, fieldId, value)}
          />
        </Box>
      ))}

      {pending.length > 0 && (
        <Box
          sx={{
            p: 2.5,
            bgcolor: "#F8FAFC",
            border: "1px dashed #CBD5E1",
            borderRadius: "12px",
          }}
        >
          <Typography fontSize="13px" fontWeight={700} color="text.primary" mb={0.5}>
            {pending.length} module{pending.length > 1 ? "s" : ""} in this step still to be
            transcribed from the source documents
          </Typography>
          <Typography fontSize="12px" color="text.secondary">
            {pending.map((p) => p.id).join(", ")}
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: activeStep === 1 ? "flex-end" : "space-between",
          borderTop: "1px solid #F1F5F9",
          pt: 3,
        }}
      >
        {activeStep > 1 && (
          <Button
            variant="outlined"
            onClick={() => goTo(activeStep - 1)}
            sx={{
              bgcolor: "#fff",
              borderColor: "#E2E8F0",
              color: "#475569",
              fontWeight: 700,
              fontSize: "14px",
              textTransform: "none",
              borderRadius: "12px",
              px: 4,
              py: 1.5,
              "&:hover": { borderColor: "#E2E8F0", bgcolor: "#F8FAFC" },
            }}
          >
            Previous
          </Button>
        )}
        {activeStep < GROUPS.length && (
          <Button
            variant="contained"
            onClick={() => goTo(activeStep + 1)}
            endIcon={<ArrowForwardIcon sx={{ fontSize: 18 }} />}
            sx={{
              bgcolor: "#0EA5E9",
              color: "#fff",
              fontWeight: 700,
              fontSize: "14px",
              textTransform: "none",
              borderRadius: "12px",
              px: 4,
              py: 1.5,
              boxShadow: "none",
              "&:hover": { bgcolor: "#0C92CE" },
            }}
          >
            Save &amp; Continue
          </Button>
        )}
      </Box>

      <Typography fontSize="11px" color="text.secondary" align="right">
        Assessment coverage: {COVERAGE.done} of {COVERAGE.total} modules transcribed
      </Typography>
    </Box>
  );
}
