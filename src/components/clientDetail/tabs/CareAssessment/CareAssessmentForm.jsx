import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableChartIcon from "@mui/icons-material/TableChart";
import DescriptionIcon from "@mui/icons-material/Description";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { labelSx, inputSx } from "./careAssessmentStyles";

export default function CareAssessmentForm({ client }) {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["1", "2", "3"];

  return (
    <>
      {/* Stepper */}
      <Box sx={{ width: "100%", mb: 8, px: 10 }}>
        <Stepper
          activeStep={activeStep}
          connector={
            <Box sx={{ flex: 1, height: "1px", bgcolor: "#E2E8F0", mx: 2 }} />
          }
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                StepIconComponent={({ active, completed }) => (
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "#fff",
                      border:
                        active || completed
                          ? "1px solid #0D0F12"
                          : "1px solid #E2E8F0",
                      color: active || completed ? "#0D0F12" : "#CBD5E1",
                      fontSize: "12px",
                      fontWeight: 700,
                      position: "relative",
                    }}
                  >
                    {(active || completed) && (
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          bgcolor: "#0D0F12",
                          borderRadius: "50%",
                        }}
                      />
                    )}
                    {!active && !completed && (
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          bgcolor: "#CBD5E1",
                          borderRadius: "50%",
                        }}
                      />
                    )}
                    <Typography
                      sx={{
                        position: "absolute",
                        bottom: -24,
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontSize: "11px",
                        fontWeight: 700,
                      }}
                    >
                      {label}
                    </Typography>
                  </Box>
                )}
              />
            </Step>
          ))}
        </Stepper>
      </Box>

      <Box sx={{ px: 2 }}>
        {activeStep === 0 && (
          <>
            {/* Section Header */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 4 }}>
              <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 20 }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Personal details
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={6}>
                <Typography sx={labelSx}>Name</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Date of Birth</Typography>
                <TextField
                  fullWidth
                  size="small"
                  sx={inputSx}
                  placeholder="mm/dd/yyyy"
                  InputProps={{
                    endAdornment: (
                      <CalendarTodayIcon
                        sx={{ fontSize: 18, color: "text.primary" }}
                      />
                    ),
                  }}
                />
              </Grid>

              <Grid size={6}>
                <Typography sx={labelSx}>Gender</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Age</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>

              <Grid size={6}>
                <Typography sx={labelSx}>Marital Status</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Ethnic Group</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>

              <Grid size={6}>
                <Typography sx={labelSx}>Religion</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>NHS No.</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>

              <Grid size={12}>
                <Typography sx={labelSx}>Any Drug Allergies?</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>

              <Grid size={12}>
                <Typography sx={labelSx}>Details of GP</Typography>
                <TextField fullWidth multiline rows={6} sx={inputSx} />
              </Grid>
            </Grid>

            {/* â”€â”€ Contact Details Section â”€â”€ */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 4,
                mt: 6,
              }}
            >
              <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 20 }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Contact Details
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={6}>
                <Typography sx={labelSx}>Name</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Phone number</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>

              <Grid size={6}>
                <Typography sx={labelSx}>Address</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Name of Assessor</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>

              <Grid size={6}>
                <Typography sx={labelSx}>Personal ID</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Location Of Assessment</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>

              <Grid size={6}>
                <Typography sx={labelSx}>Date Of Assessment</Typography>
                <TextField
                  fullWidth
                  size="small"
                  sx={inputSx}
                  placeholder="mm/dd/yyyy"
                  InputProps={{
                    endAdornment: (
                      <CalendarTodayIcon
                        sx={{ fontSize: 18, color: "text.primary" }}
                      />
                    ),
                  }}
                />
              </Grid>
            </Grid>

            {/* â”€â”€ Next of kin Information (1st) Section â”€â”€ */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 4,
                mt: 6,
              }}
            >
              <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 20 }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Next of kin Information (1st)
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={6}>
                <Typography sx={labelSx}>Name</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Relationship</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>

              <Grid size={6}>
                <Typography sx={labelSx}>Phone number</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
            </Grid>

            {/* â”€â”€ Next of kin Information (2nd) Section â”€â”€ */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 4,
                mt: 6,
              }}
            >
              <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 20 }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Next of kin Information (2nd)
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={6}>
                <Typography sx={labelSx}>Name</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Relationship</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Phone number</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
            </Grid>

            {/* â”€â”€ Legal Power of Attorney Section â”€â”€ */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 4,
                mt: 6,
              }}
            >
              <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 20 }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Is there any legal power of attorney for:
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {/* Health and Welfare */}
              <Grid size={6}>
                <Typography sx={labelSx}>Health and Welfare</Typography>
                <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
                  {["Yes", "No", "N/A"].map((opt) => (
                    <Box
                      key={opt}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          border: "1px solid #E2E8F0",
                          borderRadius: "4px",
                        }}
                      />
                      <Typography fontSize="14px" color="text.primary">
                        {opt}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Typography sx={labelSx}>Name</Typography>
                <TextField fullWidth size="small" sx={{ ...inputSx, mb: 3 }} />
                <Typography sx={labelSx}>Contact Details</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>

              {/* Property and Finance */}
              <Grid size={6}>
                <Typography sx={labelSx}>Property and Finance</Typography>
                <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
                  {["Yes", "No", "N/A"].map((opt) => (
                    <Box
                      key={opt}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          border: "1px solid #E2E8F0",
                          borderRadius: "4px",
                        }}
                      />
                      <Typography fontSize="14px" color="text.primary">
                        {opt}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Typography sx={labelSx}>Name</Typography>
                <TextField fullWidth size="small" sx={{ ...inputSx, mb: 3 }} />
                <Typography sx={labelSx}>Contact Details</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
            </Grid>

            {/* â”€â”€ CCG Section â”€â”€ */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 4,
                mt: 6,
              }}
            >
              <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 20 }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Clinical Commissioning Group (CCG)
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={6}>
                <Typography sx={labelSx}>Name of CCG</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Relationship</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Phone number</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
            </Grid>

            {/* â”€â”€ SW Section â”€â”€ */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 4,
                mt: 6,
              }}
            >
              <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 20 }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Clinical Commissioning Group (SW)
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={6}>
                <Typography sx={labelSx}>Name of SW</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Relationship</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Phone number</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
            </Grid>

            {/* â”€â”€ LLA Section â”€â”€ */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 4,
                mt: 6,
              }}
            >
              <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 20 }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Adult Social Service Group (LLA)
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={6}>
                <Typography sx={labelSx}>Name of LLA</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Relationship</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Phone number</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
            </Grid>

            {/* â”€â”€ Adult Social Service Group (SW) Section â”€â”€ */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 4,
                mt: 6,
              }}
            >
              <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 20 }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Adult Social Service Group (SW)
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={6}>
                <Typography sx={labelSx}>Name of SW</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Relationship</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Phone number</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
            </Grid>

            {/* â”€â”€ Independent Referral (CCG) Section â”€â”€ */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 4,
                mt: 6,
              }}
            >
              <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 20 }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Independent Referral (CCG)
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={6}>
                <Typography sx={labelSx}>Name of CCG</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Relationship</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Phone number</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
            </Grid>

            {/* â”€â”€ Independent Referral (SW) Section â”€â”€ */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 4,
                mt: 6,
              }}
            >
              <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 20 }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Independent Referral (SW)
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={6}>
                <Typography sx={labelSx}>Name of SW</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Relationship</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Phone number</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
            </Grid>

            {/* â”€â”€ Current Living Status Section â”€â”€ */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 4,
                mt: 6,
              }}
            >
              <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 20 }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Current Living Status
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {/* Left: Living environment */}
              <Grid size={6}>
                <Typography
                  sx={{ ...labelSx, fontWeight: 700, fontSize: "14px" }}
                >
                  describe the nature of your current home environment.
                </Typography>
                <Box sx={{ display: "flex", gap: 3, mt: 1 }}>
                  {["Lives Alone", "With partner/spouse", "With family"].map(
                    (opt) => (
                      <Box
                        key={opt}
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Box
                          sx={{
                            width: 16,
                            height: 16,
                            border: "1px solid #E2E8F0",
                            borderRadius: "4px",
                          }}
                        />
                        <Typography fontSize="14px" color="text.primary">
                          {opt}
                        </Typography>
                      </Box>
                    ),
                  )}
                </Box>
              </Grid>

              {/* Right: Barriers */}
              <Grid size={6}>
                <Typography
                  sx={{ ...labelSx, fontWeight: 700, fontSize: "14px" }}
                >
                  Is there evidence of any barriers to service that staff should
                  know about?
                </Typography>
                <Box sx={{ display: "flex", gap: 3, mt: 1 }}>
                  {["Yes", "No", "N/A"].map((opt) => (
                    <Box
                      key={opt}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          border: "1px solid #E2E8F0",
                          borderRadius: "4px",
                        }}
                      />
                      <Typography fontSize="14px" color="text.primary">
                        {opt}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>

              {/* If yes provide details */}
              <Grid size={12}>
                <Typography sx={labelSx}>
                  if yes then provide details
                </Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} />
              </Grid>

              {/* Describe building */}
              <Grid size={12}>
                <Typography sx={labelSx}>
                  Describe (e.g. building type, layout, size, # of floors;
                  concerns such as access, clutter)
                </Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} />
              </Grid>

              {/* Informal Support */}
              <Grid size={12}>
                <Typography sx={labelSx}>
                  Description of Current Informal Support
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  sx={inputSx}
                  placeholder="who is involved and how they assist, e.g. family/friend(s), church"
                />
              </Grid>

              {/* Formal support */}
              <Grid size={12}>
                <Typography sx={labelSx}>
                  Description of current services/formal support not being
                  delivered by the agency
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  sx={inputSx}
                  placeholder="(e.g. delivered meals, community nursing, community transport, medical alarm monitoring, education, rehabilitation)"
                />
              </Grid>
            </Grid>

            {/* â”€â”€ Consent, Capacity and Legal Framework Section â”€â”€ */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 4,
                mt: 6,
              }}
            >
              <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 20 }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Consent, Capacity and Legal Framework
              </Typography>
            </Box>

            {/* Question 1 */}
            <Box sx={{ mb: 5 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}
              >
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    bgcolor: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#64748B",
                  }}
                >
                  1
                </Box>
                <Typography
                  fontWeight={700}
                  fontSize="14px"
                  color="text.primary"
                >
                  Has consent been obtained for assessment and care delivery?
                </Typography>
              </Box>

              <Grid container spacing={4}>
                <Grid size={6}>
                  <Typography sx={labelSx}>Response</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    sx={inputSx}
                    placeholder="Yes"
                  />
                </Grid>
                <Grid size={6}>
                  <Typography sx={labelSx}>Risk Before Action</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    sx={inputSx}
                    placeholder="Low"
                  />
                </Grid>
                <Grid size={12}>
                  <Typography sx={labelSx}>Details / Evidence</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    sx={inputSx}
                    placeholder="Consent/best-interest decision documented"
                  />
                </Grid>
                <Grid size={12}>
                  <Typography sx={labelSx}>Action Required</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    sx={inputSx}
                    placeholder="No action required"
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Question 2 */}
            <Box sx={{ mb: 5 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}
              >
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    bgcolor: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#64748B",
                  }}
                >
                  2
                </Box>
                <Typography
                  fontWeight={700}
                  fontSize="14px"
                  color="text.primary"
                >
                  Does the person have capacity to consent to each relevant care
                  task?
                </Typography>
              </Box>

              <Grid container spacing={4}>
                <Grid size={6}>
                  <Typography sx={labelSx}>Response</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    sx={inputSx}
                    placeholder="Yes"
                  />
                </Grid>
                <Grid size={6}>
                  <Typography sx={labelSx}>Risk Before Action</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    sx={inputSx}
                    placeholder="Select"
                  />
                </Grid>
                <Grid size={12}>
                  <Typography sx={labelSx}>Details / Evidence</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    sx={inputSx}
                    placeholder="Enter details or evidence..."
                  />
                </Grid>
                <Grid size={12}>
                  <Typography sx={labelSx}>Action Required</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    sx={inputSx}
                    placeholder="Describe required actions if any..."
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Question 3 */}
            <Box sx={{ mb: 5 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}
              >
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    bgcolor: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#64748B",
                  }}
                >
                  3
                </Box>
                <Typography
                  fontWeight={700}
                  fontSize="14px"
                  color="text.primary"
                >
                  Is a Mental Capacity Act assessment required for any decision?
                </Typography>
              </Box>

              <Grid container spacing={4}>
                <Grid size={6}>
                  <Typography sx={labelSx}>Response</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    sx={inputSx}
                    placeholder="No"
                  />
                </Grid>
                <Grid size={6}>
                  <Typography sx={labelSx}>Risk Before Action</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    sx={inputSx}
                    placeholder="Select"
                  />
                </Grid>
                <Grid size={12}>
                  <Typography sx={labelSx}>Details / Evidence</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    sx={inputSx}
                    placeholder="Enter details or evidence..."
                  />
                </Grid>
                <Grid size={12}>
                  <Typography sx={labelSx}>Action Required</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    sx={inputSx}
                    placeholder="Describe required actions if any..."
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Question 4 */}
            <Box sx={{ mb: 5 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}
              >
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    bgcolor: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#64748B",
                  }}
                >
                  4
                </Box>
                <Typography
                  fontWeight={700}
                  fontSize="14px"
                  color="text.primary"
                >
                  Are best-interest decisions documented where the person lacks
                  capacity?
                </Typography>
              </Box>

              <Grid container spacing={4}>
                <Grid size={6}>
                  <Typography sx={labelSx}>Response</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    sx={inputSx}
                    placeholder="No"
                  />
                </Grid>
                <Grid size={6}>
                  <Typography sx={labelSx}>Risk Before Action</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    sx={inputSx}
                    placeholder="Select"
                  />
                </Grid>
                <Grid size={12}>
                  <Typography sx={labelSx}>Details / Evidence</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    sx={inputSx}
                    placeholder="Enter details or evidence..."
                  />
                </Grid>
                <Grid size={12}>
                  <Typography sx={labelSx}>Action Required</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    sx={inputSx}
                    placeholder="Describe required actions if any..."
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Question 5 */}
            <Box sx={{ mb: 5 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}
              >
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    bgcolor: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#64748B",
                  }}
                >
                  5
                </Box>
                <Typography
                  fontWeight={700}
                  fontSize="14px"
                  color="text.primary"
                >
                  Are parents, guardians, advocates, deputies or attorneys
                  involved where appropriate?
                </Typography>
              </Box>

              <Grid container spacing={4}>
                <Grid size={6}>
                  <Typography sx={labelSx}>Response</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    sx={inputSx}
                    placeholder="N/A"
                  />
                </Grid>
                <Grid size={6}>
                  <Typography sx={labelSx}>Risk Before Action</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    sx={inputSx}
                    placeholder="Select"
                  />
                </Grid>
                <Grid size={12}>
                  <Typography sx={labelSx}>Details / Evidence</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    sx={inputSx}
                    placeholder="Enter details or evidence..."
                  />
                </Grid>
                <Grid size={12}>
                  <Typography sx={labelSx}>Action Required</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    sx={inputSx}
                    placeholder="Describe required actions if any..."
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Question 6 */}
            <Box sx={{ mb: 5 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}
              >
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    bgcolor: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#64748B",
                  }}
                >
                  6
                </Box>
                <Typography
                  fontWeight={700}
                  fontSize="14px"
                  color="text.primary"
                >
                  Are any restrictions, deprivation of liberty concerns or legal
                  orders identified?
                </Typography>
              </Box>

              <Grid container spacing={4}>
                <Grid size={6}>
                  <Typography sx={labelSx}>Response</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    sx={inputSx}
                    placeholder="Select"
                  />
                </Grid>
                <Grid size={6}>
                  <Typography sx={labelSx}>Risk Before Action</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    sx={inputSx}
                    placeholder="Select"
                  />
                </Grid>
                <Grid size={12}>
                  <Typography sx={labelSx}>Details / Evidence</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    sx={inputSx}
                    placeholder="Enter details or evidence..."
                  />
                </Grid>
                <Grid size={12}>
                  <Typography sx={labelSx}>Action Required</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    sx={inputSx}
                    placeholder="Describe required actions if any..."
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Cancel / Next Buttons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 6,
                mb: 2,
              }}
            >
              <Box
                sx={{
                  bgcolor: "#fff",
                  color: "text.primary",
                  px: 5,
                  py: 1.2,
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: "1px solid #E2E8F0",
                }}
              >
                Cancel
              </Box>
              <Box
                onClick={() => setActiveStep(1)}
                sx={{
                  bgcolor: "primary.main",
                  color: "#fff",
                  px: 5,
                  py: 1.2,
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                  "&:hover": { opacity: 0.9 },
                }}
              >
                Next
              </Box>
            </Box>
          </>
        )}

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â• STEP 2 CONTENT â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        {activeStep === 1 && (
          <>
            {/* â”€â”€ Cognition Section â”€â”€ */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 4 }}>
              <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 20 }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Cognition
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {/* Is there a DOLS in place? */}
              <Grid size={6}>
                <Typography sx={labelSx}>Is there a DOLS in place?</Typography>
                <Box sx={{ display: "flex", gap: 3, mt: 1 }}>
                  {["Yes", "No", "N/A"].map((opt) => (
                    <Box
                      key={opt}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          border: "1px solid #E2E8F0",
                          borderRadius: "4px",
                        }}
                      />
                      <Typography fontSize="14px" color="text.primary">
                        {opt}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>

              {/* Is there a Will? */}
              <Grid size={6}>
                <Typography sx={labelSx}>Is there a Will?</Typography>
                <Box sx={{ display: "flex", gap: 3, mt: 1 }}>
                  {["Yes", "No", "N/A"].map((opt) => (
                    <Box
                      key={opt}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          border: "1px solid #E2E8F0",
                          borderRadius: "4px",
                        }}
                      />
                      <Typography fontSize="14px" color="text.primary">
                        {opt}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>

              {/* There will comments */}
              <Grid size={12}>
                <Typography sx={labelSx}>There will comments</Typography>
                <TextField fullWidth multiline rows={4} sx={inputSx} />
              </Grid>

              {/* Are there any safeguarding concerns? */}
              <Grid size={12}>
                <Typography sx={labelSx}>
                  Are there any safeguarding concerns?
                </Typography>
                <Box sx={{ display: "flex", gap: 3, mt: 1 }}>
                  {["Yes", "No", "N/A"].map((opt) => (
                    <Box
                      key={opt}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          border: "1px solid #E2E8F0",
                          borderRadius: "4px",
                        }}
                      />
                      <Typography fontSize="14px" color="text.primary">
                        {opt}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>

              {/* Safeguarding concern */}
              <Grid size={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography sx={{ ...labelSx, mb: 0 }}>
                    Safeguarding concern
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      fontSize="11px"
                      fontWeight={700}
                      color="text.primary"
                    >
                      EXPORT:
                    </Typography>
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.3,
                          cursor: "pointer",
                        }}
                      >
                        <PictureAsPdfIcon
                          sx={{ fontSize: 14, color: "#EF4444" }}
                        />
                        <Typography
                          fontSize="11px"
                          fontWeight={700}
                          color="#EF4444"
                        >
                          PDF
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.3,
                          cursor: "pointer",
                          ml: 1,
                        }}
                      >
                        <TableChartIcon
                          sx={{ fontSize: 14, color: "#22C55E" }}
                        />
                        <Typography
                          fontSize="11px"
                          fontWeight={700}
                          color="#22C55E"
                        >
                          CSV
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.3,
                          cursor: "pointer",
                          ml: 1,
                        }}
                      >
                        <DescriptionIcon
                          sx={{ fontSize: 14, color: "#3B82F6" }}
                        />
                        <Typography
                          fontSize="11px"
                          fontWeight={700}
                          color="#3B82F6"
                        >
                          Word
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <TextField fullWidth multiline rows={4} sx={inputSx} />
              </Grid>

              {/* Live Safeguarding concern */}
              <Grid size={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography sx={{ ...labelSx, mb: 0 }}>
                    Live Safeguarding concern
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      fontSize="11px"
                      fontWeight={700}
                      color="text.primary"
                    >
                      EXPORT:
                    </Typography>
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.3,
                          cursor: "pointer",
                        }}
                      >
                        <PictureAsPdfIcon
                          sx={{ fontSize: 14, color: "#EF4444" }}
                        />
                        <Typography
                          fontSize="11px"
                          fontWeight={700}
                          color="#EF4444"
                        >
                          PDF
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.3,
                          cursor: "pointer",
                          ml: 1,
                        }}
                      >
                        <TableChartIcon
                          sx={{ fontSize: 14, color: "#22C55E" }}
                        />
                        <Typography
                          fontSize="11px"
                          fontWeight={700}
                          color="#22C55E"
                        >
                          CSV
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.3,
                          cursor: "pointer",
                          ml: 1,
                        }}
                      >
                        <DescriptionIcon
                          sx={{ fontSize: 14, color: "#3B82F6" }}
                        />
                        <Typography
                          fontSize="11px"
                          fontWeight={700}
                          color="#3B82F6"
                        >
                          Word
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <TextField fullWidth multiline rows={4} sx={inputSx} />
              </Grid>
            </Grid>

            {/* â”€â”€ Behaviour Section â”€â”€ */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 4,
                mt: 6,
              }}
            >
              <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 20 }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Behaviour
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={12}>
                <Typography sx={labelSx}>select behaviour</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mt: 1 }}>
                  {[
                    "No issues at present",
                    "Agitated",
                    "Verbally Abusive",
                    "Anxious",
                    "Cooperative behaviour",
                    "Withdrawn",
                  ].map((opt) => (
                    <Box
                      key={opt}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          border: "1px solid #E2E8F0",
                          borderRadius: "4px",
                        }}
                      />
                      <Typography fontSize="14px" color="text.primary">
                        {opt}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>

              <Grid size={12}>
                <Typography sx={labelSx}>Comments</Typography>
                <TextField fullWidth multiline rows={4} sx={inputSx} />
              </Grid>
            </Grid>

            {/* â”€â”€ Cognition (Mental Capacity) Section â”€â”€ */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 4,
                mt: 6,
              }}
            >
              <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 20 }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Cognition (Mental Capacity)
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {/* Cognition (Mental Capacity) checkboxes */}
              <Grid size={6}>
                <Typography sx={labelSx}>
                  Cognition (Mental Capacity)
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mt: 1 }}>
                  {["Mentally alert", "Confused at times"].map((opt) => (
                    <Box
                      key={opt}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          border: "1px solid #E2E8F0",
                          borderRadius: "4px",
                        }}
                      />
                      <Typography fontSize="14px" color="text.primary">
                        {opt}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>

              {/* Oriented to */}
              <Grid size={6}>
                <Typography sx={labelSx}>Oriented to</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mt: 1 }}>
                  {["Person", "Place", "Time", "Child"].map((opt) => (
                    <Box
                      key={opt}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          border: "1px solid #E2E8F0",
                          borderRadius: "4px",
                        }}
                      />
                      <Typography fontSize="14px" color="text.primary">
                        {opt}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>

              {/* Seizures / Epilepsy */}
              <Grid size={12}>
                <Typography sx={labelSx}>Seizures / Epilepsy</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mt: 1 }}>
                  {[
                    "No history of seizures",
                    "Clonic seizures daily",
                    "No episodes in 3 months",
                    "Rescue medicines administered",
                    "Tonic seizures daily",
                    "Needs hospital treatment",
                  ].map((opt) => (
                    <Box
                      key={opt}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          border: "1px solid #E2E8F0",
                          borderRadius: "4px",
                        }}
                      />
                      <Typography fontSize="14px" color="text.primary">
                        {opt}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>

              {/* Comments */}
              <Grid size={12}>
                <Typography sx={labelSx}>Comments</Typography>
                <TextField fullWidth multiline rows={4} sx={inputSx} />
              </Grid>
            </Grid>

            {/* â”€â”€ Psychosocial Section â”€â”€ */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 4,
                mt: 6,
              }}
            >
              <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 20 }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Psychosocial
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={12}>
                <Typography sx={labelSx}>Psychosocial wellbeing</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mt: 1 }}>
                  {[
                    "Low mood",
                    "Depressed",
                    "Withdrawn",
                    "Content",
                    "Happy",
                  ].map((opt) => (
                    <Box
                      key={opt}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          border: "1px solid #E2E8F0",
                          borderRadius: "4px",
                        }}
                      />
                      <Typography fontSize="14px" color="text.primary">
                        {opt}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
              <Grid size={12}>
                <Typography sx={labelSx}>Comments</Typography>
                <TextField fullWidth multiline rows={4} sx={inputSx} />
              </Grid>
            </Grid>

            {/* â”€â”€ Mobility Section â”€â”€ */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 4,
                mt: 6,
              }}
            >
              <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 20 }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Mobility
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={12}>
                <Typography sx={labelSx}>Mobility status</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mt: 1 }}>
                  {[
                    "Independent",
                    "Needs assistance",
                    "Uses mobility aid",
                    "Bedbound",
                  ].map((opt) => (
                    <Box
                      key={opt}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          border: "1px solid #E2E8F0",
                          borderRadius: "4px",
                        }}
                      />
                      <Typography fontSize="14px" color="text.primary">
                        {opt}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
              <Grid size={12}>
                <Typography sx={labelSx}>Comments</Typography>
                <TextField fullWidth multiline rows={4} sx={inputSx} />
              </Grid>
            </Grid>

            {/* â”€â”€ Communication Section â”€â”€ */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 4,
                mt: 6,
              }}
            >
              <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 20 }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Communication
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={12}>
                <Typography sx={labelSx}>Communication ability</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mt: 1 }}>
                  {["Verbal", "Non-verbal", "Uses communication aids"].map(
                    (opt) => (
                      <Box
                        key={opt}
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Box
                          sx={{
                            width: 16,
                            height: 16,
                            border: "1px solid #E2E8F0",
                            borderRadius: "4px",
                          }}
                        />
                        <Typography fontSize="14px" color="text.primary">
                          {opt}
                        </Typography>
                      </Box>
                    ),
                  )}
                </Box>
              </Grid>
              <Grid size={12}>
                <Typography sx={labelSx}>Comments</Typography>
                <TextField fullWidth multiline rows={4} sx={inputSx} />
              </Grid>
            </Grid>

            {/* â”€â”€ Breathing Section â”€â”€ */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 4,
                mt: 6,
              }}
            >
              <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 20 }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Breathing
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={12}>
                <Typography sx={labelSx}>Breathing</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mt: 1 }}>
                  {["Normal", "Shortness of breath", "Oxygen therapy"].map(
                    (opt) => (
                      <Box
                        key={opt}
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Box
                          sx={{
                            width: 16,
                            height: 16,
                            border: "1px solid #E2E8F0",
                            borderRadius: "4px",
                          }}
                        />
                        <Typography fontSize="14px" color="text.primary">
                          {opt}
                        </Typography>
                      </Box>
                    ),
                  )}
                </Box>
              </Grid>
              <Grid size={12}>
                <Typography sx={labelSx}>Comments</Typography>
                <TextField fullWidth multiline rows={4} sx={inputSx} />
              </Grid>
            </Grid>

            {/* Previous / Next Buttons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 6,
                mb: 2,
              }}
            >
              <Box
                onClick={() => setActiveStep(0)}
                sx={{
                  bgcolor: "#fff",
                  color: "text.primary",
                  px: 5,
                  py: 1.2,
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: "1px solid #E2E8F0",
                }}
              >
                Previous
              </Box>
              <Box
                onClick={() => setActiveStep(2)}
                sx={{
                  bgcolor: "primary.main",
                  color: "#fff",
                  px: 5,
                  py: 1.2,
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                  "&:hover": { opacity: 0.9 },
                }}
              >
                Next
              </Box>
            </Box>
          </>
        )}

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â• STEP 3 CONTENT â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        {activeStep === 2 && (
          <>
            {/* â”€â”€ Baseline Function Section â”€â”€ */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 4 }}>
              <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 20 }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Baseline Function
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={6}>
                <Typography sx={labelSx}>
                  Number of falls in the last 12 months:
                </Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Reason for falls:</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>

              {/* Is the person on four or more medicines? */}
              <Grid size={6}>
                <Typography sx={labelSx}>
                  Is the person on four or more medicines?
                </Typography>
                <Box sx={{ display: "flex", gap: 3, mt: 1 }}>
                  {["YES", "NO", "N/A"].map((opt) => (
                    <Box
                      key={opt}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          border: "1px solid #E2E8F0",
                          borderRadius: "4px",
                        }}
                      />
                      <Typography fontSize="14px" color="text.primary">
                        {opt}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>

              {/* Is the person at risk of falls? */}
              <Grid size={6}>
                <Typography sx={labelSx}>
                  Is the person at risk of falls?
                </Typography>
                <Box sx={{ display: "flex", gap: 3, mt: 1 }}>
                  {["YES", "NO", "N/A"].map((opt) => (
                    <Box
                      key={opt}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          border: "1px solid #E2E8F0",
                          borderRadius: "4px",
                        }}
                      />
                      <Typography fontSize="14px" color="text.primary">
                        {opt}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>

              {/* Latest falls risk assessment outcome? Date */}
              <Grid size={6}>
                <Typography sx={labelSx}>
                  Latest falls risk assessment outcome? Date:
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  sx={inputSx}
                  placeholder="mm/dd/yyyy"
                  InputProps={{
                    endAdornment: (
                      <CalendarTodayIcon
                        sx={{ fontSize: 18, color: "text.primary" }}
                      />
                    ),
                  }}
                />
              </Grid>

              {/* Risk Level */}
              <Grid size={6}>
                <Typography sx={labelSx}>Risk Level</Typography>
                <Box sx={{ display: "flex", gap: 3, mt: 1 }}>
                  {["Low", "Medium", "High"].map((opt) => (
                    <Box
                      key={opt}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          border: "1px solid #E2E8F0",
                          borderRadius: "4px",
                        }}
                      />
                      <Typography fontSize="14px" color="text.primary">
                        {opt}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>

              {/* State risk identified */}
              <Grid size={12}>
                <Typography sx={labelSx}>
                  State risk identified from the falls this risk assessment:
                </Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} />
              </Grid>

              {/* Current mobility */}
              <Grid size={12}>
                <Typography sx={labelSx}>
                  Current mobility, including any walking aids if required and
                  approximate distance
                </Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} />
              </Grid>

              {/* Stairs */}
              <Grid size={12}>
                <Typography sx={labelSx}>Stairs:</Typography>
                <Box sx={{ display: "flex", gap: 3, mt: 1 }}>
                  {["YES", "NO", "N/A"].map((opt) => (
                    <Box
                      key={opt}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          border: "1px solid #E2E8F0",
                          borderRadius: "4px",
                        }}
                      />
                      <Typography fontSize="14px" color="text.primary">
                        {opt}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>

              {/* Current transfers */}
              <Grid size={12}>
                <Typography sx={labelSx}>
                  Current transfers, including any equipment if needed:
                </Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} />
              </Grid>

              {/* Bed / Chair / Toilet */}
              <Grid size={4}>
                <Typography sx={labelSx}>Bed</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
              <Grid size={4}>
                <Typography sx={labelSx}>Chair</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
              <Grid size={4}>
                <Typography sx={labelSx}>Toilet</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
            </Grid>

            {/* â”€â”€ Nutrition (Food and Drink) Section â”€â”€ */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 4,
                mt: 6,
              }}
            >
              <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 20 }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Nutrition (Food and Drink)
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={6}>
                <Typography sx={labelSx}>
                  Any unintentional weight loss?
                </Typography>
                <Box sx={{ display: "flex", gap: 3, mt: 1 }}>
                  {["YES", "NO", "N/A"].map((opt) => (
                    <Box
                      key={opt}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          border: "1px solid #E2E8F0",
                          borderRadius: "4px",
                        }}
                      />
                      <Typography fontSize="14px" color="text.primary">
                        {opt}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Any swallowing problems?</Typography>
                <Box sx={{ display: "flex", gap: 3, mt: 1 }}>
                  {["YES", "NO", "N/A"].map((opt) => (
                    <Box
                      key={opt}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          border: "1px solid #E2E8F0",
                          borderRadius: "4px",
                        }}
                      />
                      <Typography fontSize="14px" color="text.primary">
                        {opt}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Details:</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Details:</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
              <Grid size={12}>
                <Typography sx={labelSx}>
                  What is their MUST (Malnutrition Universal Screening Tool)
                  score?
                </Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
              <Grid size={12}>
                <Typography sx={labelSx}>Meal information</Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  sx={inputSx}
                  placeholder="e.g. Can they feed themselves? Are they slow to eat? On supplements"
                />
              </Grid>
              <Grid size={12}>
                <Typography sx={labelSx}>Comments:</Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>
                  Highest weight in past 6 months or on admission?
                </Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>
                  Latest nutritional risk assessment outcome:
                </Typography>
                <Box sx={{ display: "flex", gap: 3, mt: 1 }}>
                  {["Low", "Medium", "High"].map((opt) => (
                    <Box
                      key={opt}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          border: "1px solid #E2E8F0",
                          borderRadius: "4px",
                        }}
                      />
                      <Typography fontSize="14px" color="text.primary">
                        {opt}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
              <Grid size={12}>
                <Typography sx={labelSx}>
                  Highest weight in the last six months or on admission?
                </Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
              <Grid size={12}>
                <Typography sx={labelSx}>
                  Latest dietician/SALT recommendations where applicable:
                </Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} />
              </Grid>
            </Grid>

            {/* â”€â”€ Infection Prevention and Control Section â”€â”€ */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 4,
                mt: 6,
              }}
            >
              <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 20 }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Infection Prevention and Control
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={12}>
                <Typography sx={labelSx}>
                  Is the person an infection risk?
                </Typography>
                <Box sx={{ display: "flex", gap: 3, mt: 1 }}>
                  {["YES", "NO", "N/A"].map((opt) => (
                    <Box
                      key={opt}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          border: "1px solid #E2E8F0",
                          borderRadius: "4px",
                        }}
                      />
                      <Typography fontSize="14px" color="text.primary">
                        {opt}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
              <Grid size={12}>
                <Typography sx={labelSx}>
                  If yes, please list (ie: MRSA, C.Diff, TB)
                </Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} />
              </Grid>
              <Grid size={12}>
                <Typography sx={labelSx}>
                  Please give details of results and treatment:
                </Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} />
              </Grid>
              <Grid size={12}>
                <Typography sx={labelSx}>
                  Give details of any current infection outbreak:
                </Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} />
              </Grid>
            </Grid>

            {/* â”€â”€ End of Life Care Section â”€â”€ */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 4,
                mt: 6,
              }}
            >
              <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 20 }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                End of Life Care
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={6}>
                <Typography sx={labelSx}>
                  Clinical Nurse Specialist (CNS) name:
                </Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>
                  Is there an Advanced Care Plan?
                </Typography>
                <Box sx={{ display: "flex", gap: 3, mt: 1 }}>
                  {["YES", "NO", "N/A"].map((opt) => (
                    <Box
                      key={opt}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          border: "1px solid #E2E8F0",
                          borderRadius: "4px",
                        }}
                      />
                      <Typography fontSize="14px" color="text.primary">
                        {opt}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Review date:</Typography>
                <TextField
                  fullWidth
                  size="small"
                  sx={inputSx}
                  placeholder="mm/dd/yyyy"
                  InputProps={{
                    endAdornment: (
                      <CalendarTodayIcon
                        sx={{ fontSize: 18, color: "text.primary" }}
                      />
                    ),
                  }}
                />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>
                  Is there a RESPECT form in place?
                </Typography>
                <Box sx={{ display: "flex", gap: 3, mt: 1 }}>
                  {["YES", "NO", "N/A"].map((opt) => (
                    <Box
                      key={opt}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          border: "1px solid #E2E8F0",
                          borderRadius: "4px",
                        }}
                      />
                      <Typography fontSize="14px" color="text.primary">
                        {opt}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
              <Grid size={12}>
                <Typography sx={labelSx}>
                  Preferred place of care at end of life:
                </Typography>
                <Box sx={{ display: "flex", gap: 3, mt: 1 }}>
                  {["YES", "NO", "N/A"].map((opt) => (
                    <Box
                      key={opt}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          border: "1px solid #E2E8F0",
                          borderRadius: "4px",
                        }}
                      />
                      <Typography fontSize="14px" color="text.primary">
                        {opt}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
              <Grid size={12}>
                <Typography sx={labelSx}>If yes, please specify:</Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} />
              </Grid>
              <Grid size={12}>
                <Typography sx={labelSx}>
                  Has pain been assessed using a pain assessment tool?
                </Typography>
                <Box sx={{ display: "flex", gap: 3, mt: 1 }}>
                  {["YES", "NO", "N/A"].map((opt) => (
                    <Box
                      key={opt}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          border: "1px solid #E2E8F0",
                          borderRadius: "4px",
                        }}
                      />
                      <Typography fontSize="14px" color="text.primary">
                        {opt}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
              <Grid size={12}>
                <Typography sx={labelSx}>If yes, please specify:</Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} />
              </Grid>
            </Grid>

            {/* â”€â”€ Baseline: Referrals Section â”€â”€ */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 4,
                mt: 6,
              }}
            >
              <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 20 }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Baseline: Referrals
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={12}>
                <Typography sx={labelSx}>
                  Is a referral required (please tick as appropriate):
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mt: 1 }}>
                  {[
                    "Supportive home team",
                    "Pain team",
                    "Pharmacist",
                    "Falls service",
                    "Physio",
                    "Heart failure",
                    "Tissue Viability",
                    "Continence Service",
                    "District Nurse",
                    "Speech and Language Therapy",
                    "Dietician",
                    "Respiratory Team",
                    "Psychiatry",
                    "Continuing care for CHC consideration",
                  ].map((opt) => (
                    <Box
                      key={opt}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        minWidth: "22%",
                      }}
                    >
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          border: "1px solid #E2E8F0",
                          borderRadius: "4px",
                          flexShrink: 0,
                        }}
                      />
                      <Typography fontSize="14px" color="text.primary">
                        {opt}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
              <Grid size={12}>
                <Typography sx={labelSx}>List Other Service</Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} />
              </Grid>
            </Grid>

            {/* â”€â”€ Current equipment/adaptive aids Section â”€â”€ */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 4,
                mt: 6,
              }}
            >
              <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 20 }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Current equipment/adaptive aids
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {/* General */}
              <Grid size={6}>
                <Typography sx={labelSx}>General</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 1 }}>
                  {[
                    "Manual wheelchair",
                    "Power wheelchair",
                    "Bariatric wheelchair",
                    "Straight legged walker",
                    "Two-wheeled walker",
                    "Four-wheeled walker",
                    "With seat",
                    "Scooter",
                    "Stair lift",
                    "Splints",
                    "Prosthesis",
                    "Other",
                  ].map((opt) => (
                    <Box
                      key={opt}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        minWidth: "45%",
                      }}
                    >
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          border: "1px solid #E2E8F0",
                          borderRadius: "4px",
                          flexShrink: 0,
                        }}
                      />
                      <Typography fontSize="14px" color="text.primary">
                        {opt}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Other (please specify)</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>

              <Grid size={12}>
                <Typography sx={labelSx}>Comments</Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} />
              </Grid>

              {/* Bedroom - Bed */}
              <Grid size={12}>
                <Typography sx={labelSx}>Bedroom - Bed</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mt: 1 }}>
                  {["Normal", "Hospital", "Adjustable", "Bariatric"].map(
                    (opt) => (
                      <Box
                        key={opt}
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Box
                          sx={{
                            width: 16,
                            height: 16,
                            border: "1px solid #E2E8F0",
                            borderRadius: "4px",
                          }}
                        />
                        <Typography fontSize="14px" color="text.primary">
                          {opt}
                        </Typography>
                      </Box>
                    ),
                  )}
                </Box>
              </Grid>

              {/* Mattress */}
              <Grid size={12}>
                <Typography sx={labelSx}>
                  Mattress (describe, including toppers/cushions)
                </Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} />
              </Grid>

              {/* Additional Bedroom Equipment */}
              <Grid size={12}>
                <Typography sx={labelSx}>
                  Additional Bedroom Equipment
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mt: 1 }}>
                  {[
                    "Lift (ceiling/portable)",
                    "Bed rail",
                    "Transfer bench",
                  ].map((opt) => (
                    <Box
                      key={opt}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          border: "1px solid #E2E8F0",
                          borderRadius: "4px",
                        }}
                      />
                      <Typography fontSize="14px" color="text.primary">
                        {opt}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>

              <Grid size={12}>
                <Typography sx={labelSx}>Comments</Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} />
              </Grid>

              {/* Bathroom */}
              <Grid size={6}>
                <Typography sx={labelSx}>Bathroom</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 1 }}>
                  {[
                    "Grab bars",
                    "Tub bar",
                    "Safety grips/bath mats",
                    "Bath board",
                    "Bath chair",
                    "Commode",
                    "Raised toilet seat",
                    "Bath bench",
                    "Hand-held shower",
                    "Lift (ceiling/portable)",
                    "Other",
                  ].map((opt) => (
                    <Box
                      key={opt}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        minWidth: "45%",
                      }}
                    >
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          border: "1px solid #E2E8F0",
                          borderRadius: "4px",
                          flexShrink: 0,
                        }}
                      />
                      <Typography fontSize="14px" color="text.primary">
                        {opt}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Other (please specify)</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>

              <Grid size={12}>
                <Typography sx={labelSx}>Comments</Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} />
              </Grid>

              {/* Other equipment */}
              <Grid size={12}>
                <Typography sx={labelSx}>
                  Other equipment (describe, e.g. kitchen equipment, etc.)
                </Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} />
              </Grid>
            </Grid>

            {/* â”€â”€ Baseline (Signature) Section â”€â”€ */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 4,
                mt: 6,
              }}
            >
              <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 20 }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Baseline
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={6}>
                <Typography sx={labelSx}>Name</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Signature</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Qualification</Typography>
                <TextField fullWidth size="small" sx={inputSx} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Date</Typography>
                <TextField
                  fullWidth
                  size="small"
                  sx={inputSx}
                  placeholder="mm/dd/yyyy"
                  InputProps={{
                    endAdornment: (
                      <CalendarTodayIcon
                        sx={{ fontSize: 18, color: "text.primary" }}
                      />
                    ),
                  }}
                />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Time</Typography>
                <TextField
                  fullWidth
                  size="small"
                  sx={inputSx}
                  placeholder="--:-- --"
                  type="time"
                />
              </Grid>
            </Grid>

            {/* Previous / Finish Buttons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 6,
                mb: 2,
              }}
            >
              <Box
                onClick={() => setActiveStep(1)}
                sx={{
                  bgcolor: "#fff",
                  color: "text.primary",
                  px: 5,
                  py: 1.2,
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: "1px solid #E2E8F0",
                }}
              >
                Previous
              </Box>
              <Box
                sx={{
                  bgcolor: "primary.main",
                  color: "#fff",
                  px: 5,
                  py: 1.2,
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                  "&:hover": { opacity: 0.9 },
                }}
              >
                Finish
              </Box>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
