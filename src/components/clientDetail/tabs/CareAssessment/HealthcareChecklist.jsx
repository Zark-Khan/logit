import React from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { labelSx, inputSx } from "./careAssessmentStyles";

export default function HealthcareChecklist({ client }) {
  return (
    <Box
      sx={{
        borderRadius: "16px",
        p: 4,
        minHeight: "60vh",
      }}
    >
      {/* â”€â”€ Section Header â”€â”€ */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 4 }}>
        <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 20 }} />
        <Typography fontWeight={700} fontSize="15px" color="text.primary">
          Patient Demographics
        </Typography>
      </Box>
      <Box sx={{ height: "1px", bgcolor: "#fff", mb: 3 }} />
      {/* â”€â”€ Date / Name Row â”€â”€ */}
      <Grid container spacing={4}>
        <Grid size={6}>
          <Typography sx={labelSx}>Date of completion of Checklist</Typography>
          <TextField
            fullWidth
            size="small"
            type="date"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                bgcolor: "#fff",
                fontSize: "14px",
                "& fieldset": { borderColor: "#E2E8F0" },
                "&:hover fieldset": { borderColor: "#0EA5E9" },
                "&.Mui-focused fieldset": {
                  borderColor: "#0EA5E9",
                  borderWidth: "1.5px",
                },
              },
            }}
          />
        </Grid>
        <Grid size={6}>
          <Typography sx={labelSx}>Name</Typography>
          <TextField fullWidth size="small" sx={inputSx} />
        </Grid>
      </Grid>

      {/* â”€â”€ D.O.B. / NHS Row â”€â”€ */}
      <Grid container spacing={4} sx={{ mt: 1 }}>
        <Grid size={6}>
          <Typography sx={labelSx}>D.O.B.</Typography>
          <TextField
            fullWidth
            size="small"
            type="date"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                bgcolor: "#fff",
                fontSize: "14px",
                "& fieldset": { borderColor: "#E2E8F0" },
                "&:hover fieldset": { borderColor: "#0EA5E9" },
                "&.Mui-focused fieldset": {
                  borderColor: "#0EA5E9",
                  borderWidth: "1.5px",
                },
              },
            }}
          />
        </Grid>
        <Grid size={6}>
          <Typography sx={labelSx}>NHS number and GP/Practice</Typography>
          <TextField fullWidth size="small" sx={inputSx} />
        </Grid>
      </Grid>

      {/* â”€â”€ Permanent Address â”€â”€ */}
      <Box sx={{ mt: 3 }}>
        <Typography sx={labelSx}>
          Permanent address and telephone number
        </Typography>
        <TextField fullWidth multiline rows={3} sx={inputSx} />
      </Box>

      {/* â”€â”€ Current Location â”€â”€ */}
      <Box sx={{ mt: 3 }}>
        <Typography sx={labelSx}>
          Current location (if different from permanent address)
        </Typography>
        <TextField fullWidth multiline rows={3} sx={inputSx} />
      </Box>

      {/* â”€â”€ Q1: Gender at birth â”€â”€ */}
      <Box sx={{ mt: 4 }}>
        <Typography
          fontWeight={700}
          fontSize="14px"
          color="text.primary"
          sx={{ mb: 2 }}
        >
          1. What was your gender as birth?
        </Typography>
        <RadioGroup defaultValue="">
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {[
              "Male",
              "Female",
              "Other",
              "Indeterminate",
              "I prefer not to answer",
            ].map((opt) => (
              <Box key={opt} sx={{ width: "20%", minWidth: "140px" }}>
                <FormControlLabel
                  value={opt}
                  control={
                    <Radio
                      size="small"
                      sx={{
                        color: "#CBD5E1",
                        "&.Mui-checked": { color: "#0EA5E9" },
                        p: 0.5,
                      }}
                    />
                  }
                  label={
                    <Typography fontSize="14px" color="text.secondary">
                      {opt}
                    </Typography>
                  }
                  sx={{ mr: 0 }}
                />
              </Box>
            ))}
          </Box>
        </RadioGroup>
      </Box>

      {/* â”€â”€ Q2: Age Group â”€â”€ */}
      <Box sx={{ mt: 4 }}>
        <Typography
          fontWeight={700}
          fontSize="14px"
          color="text.primary"
          sx={{ mb: 2 }}
        >
          2. Which age group applies to you?
        </Typography>
        <RadioGroup defaultValue="">
          <Box sx={{ display: "flex", flexWrap: "wrap", rowGap: 1.5 }}>
            {[
              "0-18",
              "18-24",
              "25-34",
              "35-44",
              "45-54",
              "55-64",
              "65-74",
              "75-84",
              "85+",
              "I prefer not to answer",
            ].map((opt) => (
              <Box key={opt} sx={{ width: "20%", minWidth: "140px" }}>
                <FormControlLabel
                  value={opt}
                  control={
                    <Radio
                      size="small"
                      sx={{
                        color: "#CBD5E1",
                        "&.Mui-checked": { color: "#0EA5E9" },
                        p: 0.5,
                      }}
                    />
                  }
                  label={
                    <Typography fontSize="14px" color="text.secondary">
                      {opt}
                    </Typography>
                  }
                  sx={{ mr: 0 }}
                />
              </Box>
            ))}
          </Box>
        </RadioGroup>
      </Box>

      {/* â”€â”€ Q3: Disability â”€â”€ */}
      <Box sx={{ mt: 4 }}>
        <Typography
          fontWeight={700}
          fontSize="14px"
          color="text.primary"
          sx={{ mb: 2 }}
        >
          3. Do you have a disability as defined by the Equalities Act 2010?
        </Typography>
        <RadioGroup row defaultValue="">
          <Box sx={{ display: "flex", gap: 4 }}>
            {["Yes", "No", "I prefer not to answer"].map((opt) => (
              <FormControlLabel
                key={opt}
                value={opt}
                control={
                  <Radio
                    size="small"
                    sx={{
                      color: "#CBD5E1",
                      "&.Mui-checked": { color: "#0EA5E9" },
                      p: 0.5,
                    }}
                  />
                }
                label={
                  <Typography fontSize="14px" color="text.primary">
                    {opt}
                  </Typography>
                }
                sx={{ mr: 0 }}
              />
            ))}
          </Box>
        </RadioGroup>
      </Box>

      {/* â”€â”€ Q4: Ethnic Group â”€â”€ */}
      <Box sx={{ mt: 4 }}>
        <Typography
          fontWeight={700}
          fontSize="14px"
          color="text.primary"
          sx={{ mb: 2 }}
        >
          4. What is your ethnic group?
        </Typography>
        <RadioGroup
          defaultValue=""
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            gap: 1,
          }}
        >
          {[
            "White - British",
            "White - Irish",
            "White - Other",
            "Mixed - White/Black Caribbean",
            "Mixed - White/Black African",
            "Mixed - White/Asian",
            "Mixed - Other",
            "Asian - Indian",
            "Asian - Pakistani",
            "Asian - Bangladeshi",
            "Asian - Other",
            "Black - African",
            "Black - Caribbean",
            "Black - Other",
            "Chinese",
            "Other",
            "I prefer not to answer",
          ].map((opt) => (
            <FormControlLabel
              key={opt}
              value={opt}
              control={
                <Radio
                  size="small"
                  sx={{
                    color: "#CBD5E1",
                    "&.Mui-checked": { color: "#0EA5E9" },
                    p: 0.5,
                  }}
                />
              }
              label={
                <Typography fontSize="14px" color="text.primary">
                  {opt}
                </Typography>
              }
              sx={{ mr: 3, minWidth: "180px" }}
            />
          ))}
        </RadioGroup>
      </Box>

      {/* â”€â”€ Q5: Religious / Belief System Affiliation â”€â”€ */}
      <Box sx={{ mt: 4 }}>
        <Typography
          fontWeight={700}
          fontSize="14px"
          color="text.primary"
          sx={{ mb: 2 }}
        >
          5. What is your religious or other belief system affiliation?
        </Typography>
        <RadioGroup
          defaultValue=""
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            gap: 1,
          }}
        >
          {[
            "Baha'i",
            "Buddhist",
            "Christian",
            "Hindu",
            "Jewish",
            "Muslim",
            "Pagan",
            "Sikh",
            "Zoroastrian",
            "Other",
            "None",
            "I prefer not to answer",
          ].map((opt) => (
            <FormControlLabel
              key={opt}
              value={opt}
              control={
                <Radio
                  size="small"
                  sx={{
                    color: "#CBD5E1",
                    "&.Mui-checked": { color: "#0EA5E9" },
                    p: 0.5,
                  }}
                />
              }
              label={
                <Typography fontSize="14px" color="text.primary">
                  {opt}
                </Typography>
              }
              sx={{ mr: 3, minWidth: "130px" }}
            />
          ))}
        </RadioGroup>
      </Box>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â• HEALTH ASSESSMENT CATEGORIES â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <Box sx={{ mt: 6 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 4 }}>
          <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 20 }} />
          <Typography fontWeight={700} fontSize="15px" color="text.primary">
            Health Assessment Categories
          </Typography>
        </Box>

        {/* â”€â”€ Breathing â”€â”€ */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
          <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 18 }} />
          <Typography fontWeight={700} fontSize="14px" color="text.primary">
            Breathing
          </Typography>
        </Box>
        <Box sx={{ height: "1px", bgcolor: "#fff", mb: 3 }} />

        {/* Level Cards Row */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Level C - Green */}
          <Grid size={4}>
            <Box
              sx={{
                bgcolor: "#F0FDF4",
                border: "1px solid #DCFCE7",
                borderRadius: "12px",
                p: 3,
                height: "100%",
              }}
            >
              <Typography
                fontWeight={700}
                fontSize="14px"
                sx={{ color: "#15803D", mb: 2 }}
              >
                LEVEL C
              </Typography>
              <Typography fontSize="14px" color="text.primary" sx={{ mb: 2 }}>
                Normal breathing, no issues with shortness of breath.
              </Typography>
              <Typography
                fontWeight={700}
                fontSize="14px"
                color="text.primary"
                sx={{ textAlign: "center", mb: 2 }}
              >
                OR
              </Typography>
              <Typography fontSize="14px" color="text.primary">
                Shortness of breath or a condition, which may require the use of
                inhalers or a nebuliser and has no impact on daily living
                activities.
              </Typography>
            </Box>
          </Grid>

          {/* Level B - Amber */}
          <Grid size={4}>
            <Box
              sx={{
                bgcolor: "#FFFBEB",
                border: "1px solid #FEF3C7",
                borderRadius: "12px",
                p: 3,
                height: "100%",
              }}
            >
              <Typography
                fontWeight={700}
                fontSize="14px"
                sx={{ color: "#B45309", mb: 2 }}
              >
                LEVEL B
              </Typography>
              <Typography fontSize="14px" color="text.primary" sx={{ mb: 2 }}>
                Shortness of breath or a condition, which may require the use of
                inhalers or a nebuliser and limit some daily living activities.
              </Typography>
              <Typography
                fontWeight={700}
                fontSize="14px"
                color="text.primary"
                sx={{ textAlign: "center", mb: 2 }}
              >
                OR
              </Typography>
              <Typography fontSize="14px" color="text.primary">
                Requires any of the following: low level oxygen therapy (24%);
                room air ventilators via a facial or nasal mask; other
                therapeutic appliances to maintain airflow.
              </Typography>
            </Box>
          </Grid>

          {/* Level A - Red */}
          <Grid size={4}>
            <Box
              sx={{
                bgcolor: "#FEF2F2",
                border: "1px solid #FEE2E2",
                borderRadius: "12px",
                p: 3,
                height: "100%",
              }}
            >
              <Typography
                fontWeight={700}
                fontSize="14px"
                sx={{ color: "#B91C1C", mb: 2 }}
              >
                LEVEL A
              </Typography>
              <Typography fontSize="14px" color="text.primary" sx={{ mb: 2 }}>
                Is able to breathe independently through a tracheotomy that they
                can manage themselves, or with the support of carers or care
                workers.
              </Typography>
              <Typography
                fontWeight={700}
                fontSize="14px"
                color="text.primary"
                sx={{ textAlign: "center", mb: 2 }}
              >
                OR
              </Typography>
              <Typography fontSize="14px" color="text.primary">
                Breathlessness due to a condition which is not responding to
                therapeutic treatment and limits all daily living activities.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Selected Level */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={labelSx}>Selected Level</Typography>
          <RadioGroup row defaultValue="" sx={{ display: "flex", gap: 3 }}>
            {["A", "B", "C"].map((level) => (
              <FormControlLabel
                key={level}
                value={level}
                control={
                  <Radio
                    size="small"
                    sx={{
                      color: "#CBD5E1",
                      "&.Mui-checked": { color: "#0EA5E9" },
                      p: 0.5,
                    }}
                  />
                }
                label={
                  <Typography fontSize="14px" color="text.primary">
                    {level}
                  </Typography>
                }
                sx={{ mr: 0 }}
              />
            ))}
          </RadioGroup>
        </Box>

        {/* Brief description */}
        <Box sx={{ mb: 6 }}>
          <Typography sx={labelSx}>
            Brief description of need and source of evidence:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Enter details here.."
            sx={inputSx}
          />
        </Box>

        {/* â”€â”€ Nutrition â”€â”€ */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
          <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 18 }} />
          <Typography fontWeight={700} fontSize="14px" color="text.primary">
            Nutrition
          </Typography>
        </Box>
        <Box sx={{ height: "1px", bgcolor: "#fff", mb: 3 }} />

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={4}>
            <Box
              sx={{
                bgcolor: "#F0FDF4",
                border: "1px solid #DCFCE7",
                borderRadius: "12px",
                p: 3,
                height: "100%",
              }}
            >
              <Typography
                fontWeight={700}
                fontSize="14px"
                sx={{ color: "#15803D", mb: 2 }}
              >
                LEVEL C
              </Typography>
              <Typography fontSize="14px" color="text.primary" sx={{ mb: 2 }}>
                Able to take adequate food and drink by mouth to meet all
                nutritional requirements.
              </Typography>
              <Typography
                fontWeight={700}
                fontSize="14px"
                color="text.primary"
                sx={{ textAlign: "center", mb: 2 }}
              >
                OR
              </Typography>
              <Typography fontSize="14px" color="text.primary">
                Needs supervision, prompting with meals, or may need feeding
                and/or a special diet.
              </Typography>
            </Box>
          </Grid>
          <Grid size={4}>
            <Box
              sx={{
                bgcolor: "#FFFBEB",
                border: "1px solid #FEF3C7",
                borderRadius: "12px",
                p: 3,
                height: "100%",
              }}
            >
              <Typography
                fontWeight={700}
                fontSize="14px"
                sx={{ color: "#B45309", mb: 2 }}
              >
                LEVEL B
              </Typography>
              <Typography fontSize="14px" color="text.primary" sx={{ mb: 2 }}>
                Needs feeding to ensure adequate intake of food and takes a long
                time (half an hour or more), including liquidised food.
              </Typography>
              <Typography
                fontWeight={700}
                fontSize="14px"
                color="text.primary"
                sx={{ textAlign: "center", mb: 2 }}
              >
                OR
              </Typography>
              <Typography fontSize="14px" color="text.primary">
                Unable to take any food and drink by mouth, but all nutritional
                requirements are being adequately maintained by artificial
                means.
              </Typography>
            </Box>
          </Grid>
          <Grid size={4}>
            <Box
              sx={{
                bgcolor: "#FEF2F2",
                border: "1px solid #FEE2E2",
                borderRadius: "12px",
                p: 3,
                height: "100%",
              }}
            >
              <Typography
                fontWeight={700}
                fontSize="14px"
                sx={{ color: "#B91C1C", mb: 2 }}
              >
                LEVEL A
              </Typography>
              <Typography fontSize="14px" color="text.primary" sx={{ mb: 2 }}>
                Dysphagia requiring skilled intervention to ensure adequate
                nutrition/hydration and minimise the risk of choking and
                aspiration.
              </Typography>
              <Typography
                fontWeight={700}
                fontSize="14px"
                color="text.primary"
                sx={{ textAlign: "center", mb: 2 }}
              >
                OR
              </Typography>
              <Typography fontSize="14px" color="text.primary">
                Nutritional status 'at risk' and may be associated with
                unintended, significant weight loss.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mb: 3 }}>
          <Typography sx={labelSx}>Selected Level</Typography>
          <RadioGroup row defaultValue="" sx={{ display: "flex", gap: 3 }}>
            {["A", "B", "C"].map((level) => (
              <FormControlLabel
                key={level}
                value={level}
                control={
                  <Radio
                    size="small"
                    sx={{
                      color: "#CBD5E1",
                      "&.Mui-checked": { color: "#0EA5E9" },
                      p: 0.5,
                    }}
                  />
                }
                label={
                  <Typography fontSize="14px" color="text.secondary">
                    {level}
                  </Typography>
                }
                sx={{ mr: 0 }}
              />
            ))}
          </RadioGroup>
        </Box>
        <Box>
          <Typography sx={labelSx}>
            Brief description of need and source of evidence:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Enter details here.."
            sx={inputSx}
          />
        </Box>

        {/* â”€â”€ Continence â”€â”€ */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3, mt: 6 }}
        >
          <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 18 }} />
          <Typography fontWeight={700} fontSize="14px" color="text.primary">
            Continence
          </Typography>
        </Box>
        <Box sx={{ height: "1px", bgcolor: "#fff", mb: 3 }} />

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={4}>
            <Box
              sx={{
                bgcolor: "#F0FDF4",
                border: "1px solid #DCFCE7",
                borderRadius: "12px",
                p: 3,
                height: "100%",
              }}
            >
              <Typography
                fontWeight={700}
                fontSize="14px"
                sx={{ color: "#15803D", mb: 2 }}
              >
                LEVEL C
              </Typography>
              <Typography fontSize="14px" color="text.primary" sx={{ mb: 2 }}>
                Continent of urine and faeces.
              </Typography>
              <Typography
                fontWeight={700}
                fontSize="14px"
                color="text.primary"
                sx={{ textAlign: "center", mb: 2 }}
              >
                OR
              </Typography>
              <Typography fontSize="14px" color="text.primary" sx={{ mb: 2 }}>
                Continence care is routine on a day-to-day basis.
              </Typography>
              <Typography
                fontWeight={700}
                fontSize="14px"
                color="text.primary"
                sx={{ textAlign: "center", mb: 2 }}
              >
                OR
              </Typography>
              <Typography fontSize="14px" color="text.primary">
                Incontinence of urine managed through medication, regular
                toileting, use of penile sheaths, etc.
              </Typography>
            </Box>
          </Grid>
          <Grid size={4}>
            <Box
              sx={{
                bgcolor: "#FFFBEB",
                border: "1px solid #FEF3C7",
                borderRadius: "12px",
                p: 3,
                height: "100%",
              }}
            >
              <Typography
                fontWeight={700}
                fontSize="14px"
                sx={{ color: "#B45309", mb: 2 }}
              >
                LEVEL B
              </Typography>
              <Typography fontSize="14px" color="text.primary" sx={{ mb: 2 }}>
                Continence care is routine but requires monitoring to minimise
                risks.
              </Typography>
              <Typography
                fontWeight={700}
                fontSize="14px"
                color="text.primary"
                sx={{ textAlign: "center", mb: 2 }}
              >
                OR
              </Typography>
              <Typography fontSize="14px" color="text.primary">
                Risks include those associated with urinary catheters, double
                incontinence, chronic urinary tract infections.
              </Typography>
            </Box>
          </Grid>
          <Grid size={4}>
            <Box
              sx={{
                bgcolor: "#FEF2F2",
                border: "1px solid #FEE2E2",
                borderRadius: "12px",
                p: 3,
                height: "100%",
              }}
            >
              <Typography
                fontWeight={700}
                fontSize="14px"
                sx={{ color: "#B91C1C", mb: 2 }}
              >
                LEVEL A
              </Typography>
              <Typography fontSize="14px" color="text.primary" sx={{ mb: 2 }}>
                Continence care is problematic and requires timely and skilled
                intervention, beyond routine care.
              </Typography>
              <Typography
                fontWeight={700}
                fontSize="14px"
                color="text.primary"
                sx={{ textAlign: "center", mb: 2 }}
              >
                OR
              </Typography>
              <Typography fontSize="14px" color="text.primary">
                Examples include frequent bladder wash outs/irrigation, manual
                evacuations, frequent re-catheterization.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mb: 3 }}>
          <Typography sx={labelSx}>Selected Level</Typography>
          <RadioGroup row defaultValue="" sx={{ display: "flex", gap: 3 }}>
            {["A", "B", "C"].map((level) => (
              <FormControlLabel
                key={level}
                value={level}
                control={
                  <Radio
                    size="small"
                    sx={{
                      color: "#CBD5E1",
                      "&.Mui-checked": { color: "#0EA5E9" },
                      p: 0.5,
                    }}
                  />
                }
                label={
                  <Typography fontSize="14px" color="text.secondary">
                    {level}
                  </Typography>
                }
                sx={{ mr: 0 }}
              />
            ))}
          </RadioGroup>
        </Box>
        <Box>
          <Typography sx={labelSx}>
            Brief description of need and source of evidence:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Enter details here.."
            sx={inputSx}
          />
        </Box>

        {/* â”€â”€ Skin and tissue viability â”€â”€ */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3, mt: 6 }}
        >
          <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 18 }} />
          <Typography fontWeight={700} fontSize="14px" color="text.primary">
            Skin and tissue viability
          </Typography>
        </Box>
        <Box sx={{ height: "1px", bgcolor: "#fff", mb: 3 }} />

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={4}>
            <Box
              sx={{
                bgcolor: "#F0FDF4",
                border: "1px solid #DCFCE7",
                borderRadius: "12px",
                p: 3,
                height: "100%",
              }}
            >
              <Typography
                fontWeight={700}
                fontSize="14px"
                sx={{ color: "#15803D", mb: 2 }}
              >
                LEVEL C
              </Typography>
              <Typography fontSize="14px" color="text.primary" sx={{ mb: 2 }}>
                No risk of pressure damage or skin condition.
              </Typography>
              <Typography
                fontWeight={700}
                fontSize="14px"
                color="text.primary"
                sx={{ textAlign: "center", mb: 2 }}
              >
                OR
              </Typography>
              <Typography fontSize="14px" color="text.primary">
                Risk of skin breakdown which requires preventative intervention
                once a day or less than daily.
              </Typography>
            </Box>
          </Grid>
          <Grid size={4}>
            <Box
              sx={{
                bgcolor: "#FFFBEB",
                border: "1px solid #FEF3C7",
                borderRadius: "12px",
                p: 3,
                height: "100%",
              }}
            >
              <Typography
                fontWeight={700}
                fontSize="14px"
                sx={{ color: "#B45309", mb: 2 }}
              >
                LEVEL B
              </Typography>
              <Typography fontSize="14px" color="text.primary" sx={{ mb: 2 }}>
                Risk of skin breakdown which requires preventative intervention
                several times each day.
              </Typography>
              <Typography
                fontWeight={700}
                fontSize="14px"
                color="text.primary"
                sx={{ textAlign: "center", mb: 2 }}
              >
                OR
              </Typography>
              <Typography fontSize="14px" color="text.primary">
                Pressure damage or open wound(s), pressure ulcer(s) with partial
                thickness skin loss, which is responding to treatment.
              </Typography>
            </Box>
          </Grid>
          <Grid size={4}>
            <Box
              sx={{
                bgcolor: "#FEF2F2",
                border: "1px solid #FEE2E2",
                borderRadius: "12px",
                p: 3,
                height: "100%",
              }}
            >
              <Typography
                fontWeight={700}
                fontSize="14px"
                sx={{ color: "#B91C1C", mb: 2 }}
              >
                LEVEL A
              </Typography>
              <Typography fontSize="14px" color="text.primary" sx={{ mb: 2 }}>
                Pressure damage or open wound(s), pressure ulcer(s) with partial
                thickness skin loss, which is not responding to treatment.
              </Typography>
              <Typography
                fontWeight={700}
                fontSize="14px"
                color="text.primary"
                sx={{ textAlign: "center", mb: 2 }}
              >
                OR
              </Typography>
              <Typography fontSize="14px" color="text.primary">
                Pressure damage or open wound(s), pressure ulcer(s) with full
                thickness skin loss, which is responding to treatment.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mb: 3 }}>
          <Typography sx={labelSx}>Selected Level</Typography>
          <RadioGroup row defaultValue="" sx={{ display: "flex", gap: 3 }}>
            {["A", "B", "C"].map((level) => (
              <FormControlLabel
                key={level}
                value={level}
                control={
                  <Radio
                    size="small"
                    sx={{
                      color: "#CBD5E1",
                      "&.Mui-checked": { color: "#0EA5E9" },
                      p: 0.5,
                    }}
                  />
                }
                label={
                  <Typography fontSize="14px" color="text.secondary">
                    {level}
                  </Typography>
                }
                sx={{ mr: 0 }}
              />
            ))}
          </RadioGroup>
        </Box>
        <Box>
          <Typography sx={labelSx}>
            Brief description of need and source of evidence:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Enter details here.."
            sx={inputSx}
          />
        </Box>

        {/* â”€â”€ Mobility â”€â”€ */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3, mt: 6 }}
        >
          <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 18 }} />
          <Typography fontWeight={700} fontSize="14px" color="text.primary">
            Mobility
          </Typography>
        </Box>
        <Box sx={{ height: "1px", bgcolor: "#fff", mb: 3 }} />

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={4}>
            <Box
              sx={{
                bgcolor: "#F0FDF4",
                border: "1px solid #DCFCE7",
                borderRadius: "12px",
                p: 3,
                height: "100%",
              }}
            >
              <Typography
                fontWeight={700}
                fontSize="14px"
                sx={{ color: "#15803D", mb: 2 }}
              >
                LEVEL C
              </Typography>
              <Typography fontSize="14px" color="text.primary" sx={{ mb: 2 }}>
                Independently mobile.
              </Typography>
              <Typography
                fontWeight={700}
                fontSize="14px"
                color="text.primary"
                sx={{ textAlign: "center", mb: 2 }}
              >
                OR
              </Typography>
              <Typography fontSize="14px" color="text.primary">
                Able to weight bear but needs some assistance and/or requires
                mobility equipment in daily living.
              </Typography>
            </Box>
          </Grid>
          <Grid size={4}>
            <Box
              sx={{
                bgcolor: "#FFFBEB",
                border: "1px solid #FEF3C7",
                borderRadius: "12px",
                p: 3,
                height: "100%",
              }}
            >
              <Typography
                fontWeight={700}
                fontSize="14px"
                sx={{ color: "#B45309", mb: 2 }}
              >
                LEVEL B
              </Typography>
              <Typography fontSize="14px" color="text.primary" sx={{ mb: 2 }}>
                Not able to consistently weight bear.
              </Typography>
              <Typography
                fontWeight={700}
                fontSize="14px"
                color="text.primary"
                sx={{ textAlign: "center", mb: 2 }}
              >
                OR
              </Typography>
              <Typography fontSize="14px" color="text.primary">
                Completely unable to weight bear but is able to assist or
                cooperate with transfers and/or repositioning.
              </Typography>
            </Box>
          </Grid>
          <Grid size={4}>
            <Box
              sx={{
                bgcolor: "#FEF2F2",
                border: "1px solid #FEE2E2",
                borderRadius: "12px",
                p: 3,
                height: "100%",
              }}
            >
              <Typography
                fontWeight={700}
                fontSize="14px"
                sx={{ color: "#B91C1C", mb: 2 }}
              >
                LEVEL A
              </Typography>
              <Typography fontSize="14px" color="text.primary" sx={{ mb: 2 }}>
                Completely unable to weight bear and is unable to assist or
                cooperate with transfers and/or repositioning.
              </Typography>
              <Typography
                fontWeight={700}
                fontSize="14px"
                color="text.primary"
                sx={{ textAlign: "center", mb: 2 }}
              >
                OR
              </Typography>
              <Typography fontSize="14px" color="text.primary">
                At high risk of falls (as evidenced in a falls history and risk
                assessment).
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mb: 3 }}>
          <Typography sx={labelSx}>Selected Level</Typography>
          <RadioGroup row defaultValue="" sx={{ display: "flex", gap: 3 }}>
            {["A", "B", "C"].map((level) => (
              <FormControlLabel
                key={level}
                value={level}
                control={
                  <Radio
                    size="small"
                    sx={{
                      color: "#CBD5E1",
                      "&.Mui-checked": { color: "#0EA5E9" },
                      p: 0.5,
                    }}
                  />
                }
                label={
                  <Typography fontSize="14px" color="text.secondary">
                    {level}
                  </Typography>
                }
                sx={{ mr: 0 }}
              />
            ))}
          </RadioGroup>
        </Box>
        <Box>
          <Typography sx={labelSx}>
            Brief description of need and source of evidence:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Enter details here.."
            sx={inputSx}
          />
        </Box>

        {/* â”€â”€ Communication â”€â”€ */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3, mt: 6 }}
        >
          <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 18 }} />
          <Typography fontWeight={700} fontSize="14px" color="text.primary">
            Communication
          </Typography>
        </Box>
        <Box sx={{ height: "1px", bgcolor: "#fff", mb: 3 }} />

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={4}>
            <Box
              sx={{
                bgcolor: "#F0FDF4",
                border: "1px solid #DCFCE7",
                borderRadius: "12px",
                p: 3,
                height: "100%",
              }}
            >
              <Typography
                fontWeight={700}
                fontSize="14px"
                sx={{ color: "#15803D", mb: 2 }}
              >
                LEVEL C
              </Typography>
              <Typography fontSize="14px" color="text.primary" sx={{ mb: 2 }}>
                Able to communicate clearly, verbally or non-verbally.
              </Typography>
              <Typography
                fontWeight={700}
                fontSize="14px"
                color="text.primary"
                sx={{ textAlign: "center", mb: 2 }}
              >
                OR
              </Typography>
              <Typography fontSize="14px" color="text.primary">
                Needs assistance to communicate their needs.
              </Typography>
            </Box>
          </Grid>
          <Grid size={4}>
            <Box
              sx={{
                bgcolor: "#FFFBEB",
                border: "1px solid #FEF3C7",
                borderRadius: "12px",
                p: 3,
                height: "100%",
              }}
            >
              <Typography
                fontWeight={700}
                fontSize="14px"
                sx={{ color: "#B45309", mb: 2 }}
              >
                LEVEL B
              </Typography>
              <Typography fontSize="14px" color="text.primary">
                Communication about needs is difficult to understand or the
                individual is sometimes unable to reliably communicate, even
                when assisted.
              </Typography>
            </Box>
          </Grid>
          <Grid size={4}>
            <Box
              sx={{
                bgcolor: "#FEF2F2",
                border: "1px solid #FEE2E2",
                borderRadius: "12px",
                p: 3,
                height: "100%",
              }}
            >
              <Typography
                fontWeight={700}
                fontSize="14px"
                sx={{ color: "#B91C1C", mb: 2 }}
              >
                LEVEL A
              </Typography>
              <Typography fontSize="14px" color="text.primary">
                Unable to reliably communicate their needs at any time and in
                any way, even when all practicable steps to assist them have
                been taken.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mb: 3 }}>
          <Typography sx={labelSx}>Selected Level</Typography>
          <RadioGroup row defaultValue="" sx={{ display: "flex", gap: 3 }}>
            {["A", "B", "C"].map((level) => (
              <FormControlLabel
                key={level}
                value={level}
                control={
                  <Radio
                    size="small"
                    sx={{
                      color: "#CBD5E1",
                      "&.Mui-checked": { color: "#0EA5E9" },
                      p: 0.5,
                    }}
                  />
                }
                label={
                  <Typography fontSize="14px" color="text.secondary">
                    {level}
                  </Typography>
                }
                sx={{ mr: 0 }}
              />
            ))}
          </RadioGroup>
        </Box>
        <Box>
          <Typography sx={labelSx}>
            Brief description of need and source of evidence:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Enter details here.."
            sx={inputSx}
          />
        </Box>

        {/* â”€â”€ Psychological and emotional needs â”€â”€ */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3, mt: 6 }}
        >
          <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 18 }} />
          <Typography fontWeight={700} fontSize="14px" color="text.primary">
            Psychological and emotional needs
          </Typography>
        </Box>
        <Box sx={{ height: "1px", bgcolor: "#fff", mb: 3 }} />

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={4}>
            <Box
              sx={{
                bgcolor: "#F0FDF4",
                border: "1px solid #DCFCE7",
                borderRadius: "12px",
                p: 3,
                height: "100%",
              }}
            >
              <Typography
                fontWeight={700}
                fontSize="14px"
                sx={{ color: "#15803D", mb: 2 }}
              >
                LEVEL C
              </Typography>
              <Typography fontSize="14px" color="text.primary" sx={{ mb: 2 }}>
                Psychological and emotional needs are not having an impact on
                their health and well-being.
              </Typography>
              <Typography
                fontWeight={700}
                fontSize="14px"
                color="text.primary"
                sx={{ textAlign: "center", mb: 2 }}
              >
                OR
              </Typography>
              <Typography fontSize="14px" color="text.primary">
                Mood disturbance or anxiety symptoms or periods of distress,
                which respond to prompts.
              </Typography>
            </Box>
          </Grid>
          <Grid size={4}>
            <Box
              sx={{
                bgcolor: "#FFFBEB",
                border: "1px solid #FEF3C7",
                borderRadius: "12px",
                p: 3,
                height: "100%",
              }}
            >
              <Typography
                fontWeight={700}
                fontSize="14px"
                sx={{ color: "#B45309", mb: 2 }}
              >
                LEVEL B
              </Typography>
              <Typography fontSize="14px" color="text.primary">
                Mood disturbance, hallucinations or anxiety symptoms which do
                not readily respond to prompts and have an increasing impact.
              </Typography>
            </Box>
          </Grid>
          <Grid size={4}>
            <Box
              sx={{
                bgcolor: "#FEF2F2",
                border: "1px solid #FEE2E2",
                borderRadius: "12px",
                p: 3,
                height: "100%",
              }}
            >
              <Typography
                fontWeight={700}
                fontSize="14px"
                sx={{ color: "#B91C1C", mb: 2 }}
              >
                LEVEL A
              </Typography>
              <Typography fontSize="14px" color="text.primary">
                Mood disturbance, hallucinations or anxiety symptoms that have a
                severe impact on the individual's health and/or well-being.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mb: 3 }}>
          <Typography sx={labelSx}>Selected Level</Typography>
          <RadioGroup row defaultValue="" sx={{ display: "flex", gap: 3 }}>
            {["A", "B", "C"].map((level) => (
              <FormControlLabel
                key={level}
                value={level}
                control={
                  <Radio
                    size="small"
                    sx={{
                      color: "#CBD5E1",
                      "&.Mui-checked": { color: "#0EA5E9" },
                      p: 0.5,
                    }}
                  />
                }
                label={
                  <Typography fontSize="14px" color="text.secondary">
                    {level}
                  </Typography>
                }
                sx={{ mr: 0 }}
              />
            ))}
          </RadioGroup>
        </Box>
        <Box>
          <Typography sx={labelSx}>
            Brief description of need and source of evidence:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Enter details here.."
            sx={inputSx}
          />
        </Box>

        {/* â”€â”€ Cognition â”€â”€ */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3, mt: 6 }}
        >
          <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 18 }} />
          <Typography fontWeight={700} fontSize="14px" color="text.primary">
            Cognition
          </Typography>
        </Box>
        <Box sx={{ height: "1px", bgcolor: "#fff", mb: 3 }} />

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={4}>
            <Box
              sx={{
                bgcolor: "#F0FDF4",
                border: "1px solid #DCFCE7",
                borderRadius: "12px",
                p: 3,
                height: "100%",
              }}
            >
              <Typography
                fontWeight={700}
                fontSize="14px"
                sx={{ color: "#15803D", mb: 2 }}
              >
                LEVEL C
              </Typography>
              <Typography fontSize="14px" color="text.primary" sx={{ mb: 2 }}>
                No evidence of impairment, confusion or disorientation.
              </Typography>
              <Typography
                fontWeight={700}
                fontSize="14px"
                color="text.primary"
                sx={{ textAlign: "center", mb: 2 }}
              >
                OR
              </Typography>
              <Typography fontSize="14px" color="text.primary">
                Cognitive impairment which requires some supervision, prompting
                or assistance with more complex activities.
              </Typography>
            </Box>
          </Grid>
          <Grid size={4}>
            <Box
              sx={{
                bgcolor: "#FFFBEB",
                border: "1px solid #FEF3C7",
                borderRadius: "12px",
                p: 3,
                height: "100%",
              }}
            >
              <Typography
                fontWeight={700}
                fontSize="14px"
                sx={{ color: "#B45309", mb: 2 }}
              >
                LEVEL B
              </Typography>
              <Typography fontSize="14px" color="text.primary">
                Cognitive impairment that requires some supervision, prompting
                and/or assistance with basic care needs.
              </Typography>
            </Box>
          </Grid>
          <Grid size={4}>
            <Box
              sx={{
                bgcolor: "#FEF2F2",
                border: "1px solid #FEE2E2",
                borderRadius: "12px",
                p: 3,
                height: "100%",
              }}
            >
              <Typography
                fontWeight={700}
                fontSize="14px"
                sx={{ color: "#B91C1C", mb: 2 }}
              >
                LEVEL A
              </Typography>
              <Typography fontSize="14px" color="text.primary">
                Cognitive impairment that could for example include frequent
                short-term memory issues and maybe disorientation to time and
                place.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mb: 3 }}>
          <Typography sx={labelSx}>Selected Level</Typography>
          <RadioGroup row defaultValue="" sx={{ display: "flex", gap: 3 }}>
            {["A", "B", "C"].map((level) => (
              <FormControlLabel
                key={level}
                value={level}
                control={
                  <Radio
                    size="small"
                    sx={{
                      color: "#CBD5E1",
                      "&.Mui-checked": { color: "#0EA5E9" },
                      p: 0.5,
                    }}
                  />
                }
                label={
                  <Typography fontSize="14px" color="text.secondary">
                    {level}
                  </Typography>
                }
                sx={{ mr: 0 }}
              />
            ))}
          </RadioGroup>
        </Box>
        <Box>
          <Typography sx={labelSx}>
            Brief description of need and source of evidence:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Enter details here.."
            sx={inputSx}
          />
        </Box>

        {/* â”€â”€ Behaviour â”€â”€ */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3, mt: 6 }}
        >
          <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 18 }} />
          <Typography fontWeight={700} fontSize="14px" color="text.primary">
            Behaviour
          </Typography>
        </Box>
        <Box sx={{ height: "1px", bgcolor: "#fff", mb: 3 }} />

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={4}>
            <Box
              sx={{
                bgcolor: "#F0FDF4",
                border: "1px solid #DCFCE7",
                borderRadius: "12px",
                p: 3,
                height: "100%",
              }}
            >
              <Typography
                fontWeight={700}
                fontSize="14px"
                sx={{ color: "#15803D", mb: 2 }}
              >
                LEVEL C
              </Typography>
              <Typography fontSize="14px" color="text.primary" sx={{ mb: 2 }}>
                No evidence of 'challenging' behaviour.
              </Typography>
              <Typography
                fontWeight={700}
                fontSize="14px"
                color="text.primary"
                sx={{ textAlign: "center", mb: 2 }}
              >
                OR
              </Typography>
              <Typography fontSize="14px" color="text.primary">
                Some incidents of 'challenging' behaviour that does not pose a
                risk to self, others or property.
              </Typography>
            </Box>
          </Grid>
          <Grid size={4}>
            <Box
              sx={{
                bgcolor: "#FFFBEB",
                border: "1px solid #FEF3C7",
                borderRadius: "12px",
                p: 3,
                height: "100%",
              }}
            >
              <Typography
                fontWeight={700}
                fontSize="14px"
                sx={{ color: "#B45309", mb: 2 }}
              >
                LEVEL B
              </Typography>
              <Typography fontSize="14px" color="text.primary">
                'Challenging' behaviour that follows a predictable pattern and
                can be managed by skilled carers.
              </Typography>
            </Box>
          </Grid>
          <Grid size={4}>
            <Box
              sx={{
                bgcolor: "#FEF2F2",
                border: "1px solid #FEE2E2",
                borderRadius: "12px",
                p: 3,
                height: "100%",
              }}
            >
              <Typography
                fontWeight={700}
                fontSize="14px"
                sx={{ color: "#B91C1C", mb: 2 }}
              >
                LEVEL A
              </Typography>
              <Typography fontSize="14px" color="text.primary">
                'Challenging' behaviour of type and/or frequency that poses a
                predictable risk to self, others or property.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mb: 3 }}>
          <Typography sx={labelSx}>Selected Level</Typography>
          <RadioGroup row defaultValue="" sx={{ display: "flex", gap: 3 }}>
            {["A", "B", "C"].map((level) => (
              <FormControlLabel
                key={level}
                value={level}
                control={
                  <Radio
                    size="small"
                    sx={{
                      color: "#CBD5E1",
                      "&.Mui-checked": { color: "#0EA5E9" },
                      p: 0.5,
                    }}
                  />
                }
                label={
                  <Typography fontSize="14px" color="text.secondary">
                    {level}
                  </Typography>
                }
                sx={{ mr: 0 }}
              />
            ))}
          </RadioGroup>
        </Box>
        <Box>
          <Typography sx={labelSx}>
            Brief description of need and source of evidence:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Enter details here.."
            sx={inputSx}
          />
        </Box>
        {/* ── Drug Therapies ── */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3, mt: 6 }}
        >
          <InfoOutlinedIcon sx={{ color: "text.secondary", fontSize: 18 }} />
          <Typography fontWeight={700} fontSize="14px" color="text.primary">
            Drug Therapies
          </Typography>
        </Box>
        <Box sx={{ height: "1px", bgcolor: "#fff", mb: 3 }} />

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={4}>
            <Box
              sx={{
                bgcolor: "#F0FDF4",
                border: "1px solid #DCFCE7",
                borderRadius: "12px",
                p: 3,
                height: "100%",
              }}
            >
              <Typography
                fontWeight={700}
                fontSize="14px"
                sx={{ color: "#15803D", mb: 2 }}
              >
                LEVEL C
              </Typography>
              <Typography fontSize="14px" color="text.primary" sx={{ mb: 2 }}>
                Symptoms are managed effectively and without any problems.
              </Typography>
              <Typography
                fontWeight={700}
                fontSize="14px"
                color="text.primary"
                sx={{ textAlign: "center", mb: 2 }}
              >
                OR
              </Typography>
              <Typography fontSize="14px" color="text.primary">
                Requires supervision/administration of and/or prompting with
                medication.
              </Typography>
            </Box>
          </Grid>
          <Grid size={4}>
            <Box
              sx={{
                bgcolor: "#FFFBEB",
                border: "1px solid #FEF3C7",
                borderRadius: "12px",
                p: 3,
                height: "100%",
              }}
            >
              <Typography
                fontWeight={700}
                fontSize="14px"
                sx={{ color: "#B45309", mb: 2 }}
              >
                LEVEL B
              </Typography>
              <Typography fontSize="14px" color="text.primary" sx={{ mb: 2 }}>
                Requires the administration of medication (by a registered
                nurse, carer or care worker).
              </Typography>
              <Typography
                fontWeight={700}
                fontSize="14px"
                color="text.primary"
                sx={{ textAlign: "center", mb: 2 }}
              >
                OR
              </Typography>
              <Typography fontSize="14px" color="text.primary">
                Moderate pain which follows a predictable pattern.
              </Typography>
            </Box>
          </Grid>
          <Grid size={4}>
            <Box
              sx={{
                bgcolor: "#FEF2F2",
                border: "1px solid #FEE2E2",
                borderRadius: "12px",
                p: 3,
                height: "100%",
              }}
            >
              <Typography
                fontWeight={700}
                fontSize="14px"
                sx={{ color: "#B91C1C", mb: 2 }}
              >
                LEVEL A
              </Typography>
              <Typography fontSize="14px" color="text.primary" sx={{ mb: 2 }}>
                Requires administration and monitoring of medication regime by a
                registered nurse because there are risks associated with
                fluctuation.
              </Typography>
              <Typography
                fontWeight={700}
                fontSize="14px"
                color="text.primary"
                sx={{ textAlign: "center", mb: 2 }}
              >
                OR
              </Typography>
              <Typography fontSize="14px" color="text.primary">
                Moderate pain or other symptoms which is/are having a
                significant effect on other domains.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mb: 3 }}>
          <Typography sx={labelSx}>Selected Level</Typography>
          <RadioGroup row defaultValue="" sx={{ display: "flex", gap: 3 }}>
            {["A", "B", "C"].map((level) => (
              <FormControlLabel
                key={level}
                value={level}
                control={
                  <Radio
                    size="small"
                    sx={{
                      color: "#CBD5E1",
                      "&.Mui-checked": { color: "#0EA5E9" },
                      p: 0.5,
                    }}
                  />
                }
                label={
                  <Typography fontSize="14px" color="text.secondary">
                    {level}
                  </Typography>
                }
                sx={{ mr: 0 }}
              />
            ))}
          </RadioGroup>
        </Box>
        <Box>
          <Typography sx={labelSx}>
            Brief description of need and source of evidence:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Enter details here.."
            sx={inputSx}
          />
        </Box>

        {/* ── Altered states of consciousness ── */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3, mt: 6 }}
        >
          <InfoOutlinedIcon sx={{ color: "text.secondary", fontSize: 18 }} />
          <Typography fontWeight={700} fontSize="14px" color="text.primary">
            Altered states of consciousness
          </Typography>
        </Box>
        <Box sx={{ height: "1px", bgcolor: "#fff", mb: 3 }} />

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={4}>
            <Box
              sx={{
                bgcolor: "#F0FDF4",
                border: "1px solid #DCFCE7",
                borderRadius: "12px",
                p: 3,
                height: "100%",
              }}
            >
              <Typography
                fontWeight={700}
                fontSize="14px"
                sx={{ color: "#15803D", mb: 2 }}
              >
                LEVEL C
              </Typography>
              <Typography fontSize="14px" color="text.primary" sx={{ mb: 2 }}>
                No evidence of altered states of consciousness (ASC).
              </Typography>
              <Typography
                fontWeight={700}
                fontSize="14px"
                color="text.primary"
                sx={{ textAlign: "center", mb: 2 }}
              >
                OR
              </Typography>
              <Typography fontSize="14px" color="text.primary">
                History of ASC but effectively managed and there is a low risk
                of harm.
              </Typography>
            </Box>
          </Grid>
          <Grid size={4}>
            <Box
              sx={{
                bgcolor: "#FFFBEB",
                border: "1px solid #FEF3C7",
                borderRadius: "12px",
                p: 3,
                height: "100%",
              }}
            >
              <Typography
                fontWeight={700}
                fontSize="14px"
                sx={{ color: "#B45309", mb: 2 }}
              >
                LEVEL B
              </Typography>
              <Typography fontSize="14px" color="text.primary">
                Occasional (monthly or less frequently) episodes of ASC that
                require the supervision of a carer.
              </Typography>
            </Box>
          </Grid>
          <Grid size={4}>
            <Box
              sx={{
                bgcolor: "#FEF2F2",
                border: "1px solid #FEE2E2",
                borderRadius: "12px",
                p: 3,
                height: "100%",
              }}
            >
              <Typography
                fontWeight={700}
                fontSize="14px"
                sx={{ color: "#B91C1C", mb: 2 }}
              >
                LEVEL A
              </Typography>
              <Typography fontSize="14px" color="text.primary">
                Frequent episodes of ASC that require the supervision of a carer
                or care worker to minimise the risk of harm.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mb: 3 }}>
          <Typography sx={labelSx}>Selected Level</Typography>
          <RadioGroup row defaultValue="" sx={{ display: "flex", gap: 3 }}>
            {["A", "B", "C"].map((level) => (
              <FormControlLabel
                key={level}
                value={level}
                control={
                  <Radio
                    size="small"
                    sx={{
                      color: "#CBD5E1",
                      "&.Mui-checked": { color: "#0EA5E9" },
                      p: 0.5,
                    }}
                  />
                }
                label={
                  <Typography fontSize="14px" color="text.secondary">
                    {level}
                  </Typography>
                }
                sx={{ mr: 0 }}
              />
            ))}
          </RadioGroup>
        </Box>
        <Box>
          <Typography sx={labelSx}>
            Brief description of need and source of evidence:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Enter details here.."
            sx={inputSx}
          />
        </Box>
      </Box>

      {/* Submit Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: "primary.main",
            color: "#fff",
            textTransform: "none",
            fontWeight: 700,
            fontSize: "14px",
            px: 4,
            py: 1.2,
            borderRadius: "8px",
            "&:hover": { bgcolor: "primary.main" },
          }}
        >
          Submit Checklist
        </Button>
      </Box>
    </Box>
  );
}
