import { useAssessmentStore } from "../../../../store/useAssessmentStore";
import React, { useState } from "react";
import { Box, Typography, TextField, Grid, Stepper, Step, StepLabel } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableChartIcon from "@mui/icons-material/TableChart";
import DescriptionIcon from "@mui/icons-material/Description";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { labelSx, inputSx } from "./careAssessmentStyles";
function SelectableButtonGroup({
  options,
  mt,
  mb,
  value,
  onChange
}) {
  return <Box sx={{
    display: "flex",
    flexWrap: "wrap",
    gap: 3,
    mb: mb !== undefined ? mb : 2,
    mt: mt || 0
  }}>
      {options.map(opt => {
      const isSelected = value === opt;
      return <Box key={opt} onClick={() => onChange(opt)} sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        cursor: "pointer"
      }}>
            <Box sx={{
          width: 16,
          height: 16,
          border: "1px solid",
          borderColor: isSelected ? "#0EA5E9" : "#E2E8F0",
          borderRadius: "4px",
          bgcolor: isSelected ? "#0EA5E9" : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
              {isSelected && <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>}
            </Box>
            <Typography fontSize="14px" color="text.primary">
              {opt}
            </Typography>
          </Box>;
    })}
    </Box>;
}
export default function CareAssessmentForm({
  client
}) {
  const {
    assessments,
    updateAssessment
  } = useAssessmentStore();
  const careAssessment = assessments["careAssessment"] || {};
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["1", "2", "3"];
  return <>
      {/* Stepper */}
      <Box sx={{
      width: "100%",
      mb: 8,
      px: 10
    }}>
        <Stepper activeStep={activeStep} connector={<Box sx={{
        flex: 1,
        height: "1px",
        bgcolor: "#E2E8F0",
        mx: 2
      }} />}>
          {steps.map(label => <Step key={label}>
              <StepLabel StepIconComponent={({
            active,
            completed
          }) => <Box sx={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#fff",
            border: active || completed ? "1px solid #0D0F12" : "1px solid #E2E8F0",
            color: active || completed ? "#0D0F12" : "#CBD5E1",
            fontSize: "12px",
            fontWeight: 700,
            position: "relative"
          }}>
                    {(active || completed) && <Box sx={{
              width: 8,
              height: 8,
              bgcolor: "#0D0F12",
              borderRadius: "50%"
            }} />}
                    {!active && !completed && <Box sx={{
              width: 8,
              height: 8,
              bgcolor: "#CBD5E1",
              borderRadius: "50%"
            }} />}
                    <Typography sx={{
              position: "absolute",
              bottom: -24,
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "11px",
              fontWeight: 700
            }}>
                      {label}
                    </Typography>
                  </Box>} />
            </Step>)}
        </Stepper>
      </Box>

      <Box sx={{
      px: 2
    }}>
        {activeStep === 0 && <>
            {/* Section Header */}
            <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 4
        }}>
              <InfoOutlinedIcon sx={{
            color: "text.primary",
            fontSize: 20
          }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Personal details
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={6}>
                <Typography sx={labelSx}>Name</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.name || ""} onChange={e => updateAssessment("careAssessment", "name", e.target.value)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Date of Birth</Typography>
                <TextField fullWidth size="small" sx={inputSx} placeholder="mm/dd/yyyy" InputProps={{
              endAdornment: <CalendarTodayIcon sx={{
                fontSize: 18,
                color: "text.primary"
              }} />
            }} value={careAssessment.dateOfBirth || ""} onChange={e => updateAssessment("careAssessment", "dateOfBirth", e.target.value)} />
              </Grid>

              <Grid size={6}>
                <Typography sx={labelSx}>Gender</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.gender || ""} onChange={e => updateAssessment("careAssessment", "gender", e.target.value)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Age</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.age || ""} onChange={e => updateAssessment("careAssessment", "age", e.target.value)} />
              </Grid>

              <Grid size={6}>
                <Typography sx={labelSx}>Marital Status</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.maritalStatus || ""} onChange={e => updateAssessment("careAssessment", "maritalStatus", e.target.value)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Ethnic Group</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.ethnicGroup || ""} onChange={e => updateAssessment("careAssessment", "ethnicGroup", e.target.value)} />
              </Grid>

              <Grid size={6}>
                <Typography sx={labelSx}>Religion</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.religion || ""} onChange={e => updateAssessment("careAssessment", "religion", e.target.value)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>NHS No.</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.nHSNo || ""} onChange={e => updateAssessment("careAssessment", "nHSNo", e.target.value)} />
              </Grid>

              <Grid size={12}>
                <Typography sx={labelSx}>Any Drug Allergies?</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.anyDrugAllergies || ""} onChange={e => updateAssessment("careAssessment", "anyDrugAllergies", e.target.value)} />
              </Grid>

              <Grid size={12}>
                <Typography sx={labelSx}>Details of GP</Typography>
                <TextField fullWidth multiline rows={6} sx={inputSx} value={careAssessment.detailsOfGP || ""} onChange={e => updateAssessment("careAssessment", "detailsOfGP", e.target.value)} />
              </Grid>
            </Grid>

            {/* â”€â”€ Contact Details Section â”€â”€ */}
            <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 4,
          mt: 6
        }}>
              <InfoOutlinedIcon sx={{
            color: "text.primary",
            fontSize: 20
          }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Contact Details
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={6}>
                <Typography sx={labelSx}>Name</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.name || ""} onChange={e => updateAssessment("careAssessment", "name", e.target.value)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Phone number</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.phoneNumber || ""} onChange={e => updateAssessment("careAssessment", "phoneNumber", e.target.value)} />
              </Grid>

              <Grid size={6}>
                <Typography sx={labelSx}>Address</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.address || ""} onChange={e => updateAssessment("careAssessment", "address", e.target.value)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Name of Assessor</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.nameOfAssessor || ""} onChange={e => updateAssessment("careAssessment", "nameOfAssessor", e.target.value)} />
              </Grid>

              <Grid size={6}>
                <Typography sx={labelSx}>Personal ID</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.personalID || ""} onChange={e => updateAssessment("careAssessment", "personalID", e.target.value)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Location Of Assessment</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.locationOfAssessment || ""} onChange={e => updateAssessment("careAssessment", "locationOfAssessment", e.target.value)} />
              </Grid>

              <Grid size={6}>
                <Typography sx={labelSx}>Date Of Assessment</Typography>
                <TextField fullWidth size="small" sx={inputSx} placeholder="mm/dd/yyyy" InputProps={{
              endAdornment: <CalendarTodayIcon sx={{
                fontSize: 18,
                color: "text.primary"
              }} />
            }} value={careAssessment.dateOfAssessment || ""} onChange={e => updateAssessment("careAssessment", "dateOfAssessment", e.target.value)} />
              </Grid>
            </Grid>

            {/* â”€â”€ Next of kin Information (1st) Section â”€â”€ */}
            <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 4,
          mt: 6
        }}>
              <InfoOutlinedIcon sx={{
            color: "text.primary",
            fontSize: 20
          }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Next of kin Information (1st)
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={6}>
                <Typography sx={labelSx}>Name</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.name || ""} onChange={e => updateAssessment("careAssessment", "name", e.target.value)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Relationship</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.relationship || ""} onChange={e => updateAssessment("careAssessment", "relationship", e.target.value)} />
              </Grid>

              <Grid size={6}>
                <Typography sx={labelSx}>Phone number</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.phoneNumber || ""} onChange={e => updateAssessment("careAssessment", "phoneNumber", e.target.value)} />
              </Grid>
            </Grid>

            {/* â”€â”€ Next of kin Information (2nd) Section â”€â”€ */}
            <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 4,
          mt: 6
        }}>
              <InfoOutlinedIcon sx={{
            color: "text.primary",
            fontSize: 20
          }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Next of kin Information (2nd)
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={6}>
                <Typography sx={labelSx}>Name</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.name || ""} onChange={e => updateAssessment("careAssessment", "name", e.target.value)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Relationship</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.relationship || ""} onChange={e => updateAssessment("careAssessment", "relationship", e.target.value)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Phone number</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.phoneNumber || ""} onChange={e => updateAssessment("careAssessment", "phoneNumber", e.target.value)} />
              </Grid>
            </Grid>

            {/* â”€â”€ Legal Power of Attorney Section â”€â”€ */}
            <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 4,
          mt: 6
        }}>
              <InfoOutlinedIcon sx={{
            color: "text.primary",
            fontSize: 20
          }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Is there any legal power of attorney for:
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {/* Health and Welfare */}
              <Grid size={6}>
                <Typography sx={labelSx}>Health and Welfare</Typography>
                <SelectableButtonGroup options={["Yes", "No", "N/A"]} mb={2} value={careAssessment.healthAndWelfare} onChange={val => updateAssessment("careAssessment", "healthAndWelfare", val)} />
                <Typography sx={labelSx}>Name</Typography>
                <TextField fullWidth size="small" sx={{
              ...inputSx,
              mb: 3
            }} value={careAssessment.name || ""} onChange={e => updateAssessment("careAssessment", "name", e.target.value)} />
                <Typography sx={labelSx}>Contact Details</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.contactDetails || ""} onChange={e => updateAssessment("careAssessment", "contactDetails", e.target.value)} />
              </Grid>

              {/* Property and Finance */}
              <Grid size={6}>
                <Typography sx={labelSx}>Property and Finance</Typography>
                <SelectableButtonGroup options={["Yes", "No", "N/A"]} mb={2} value={careAssessment.propertyAndFinance} onChange={val => updateAssessment("careAssessment", "propertyAndFinance", val)} />
                <Typography sx={labelSx}>Name</Typography>
                <TextField fullWidth size="small" sx={{
              ...inputSx,
              mb: 3
            }} value={careAssessment.name || ""} onChange={e => updateAssessment("careAssessment", "name", e.target.value)} />
                <Typography sx={labelSx}>Contact Details</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.contactDetails || ""} onChange={e => updateAssessment("careAssessment", "contactDetails", e.target.value)} />
              </Grid>
            </Grid>

            {/* â”€â”€ CCG Section â”€â”€ */}
            <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 4,
          mt: 6
        }}>
              <InfoOutlinedIcon sx={{
            color: "text.primary",
            fontSize: 20
          }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Clinical Commissioning Group (CCG)
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={6}>
                <Typography sx={labelSx}>Name of CCG</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.nameOfCCG || ""} onChange={e => updateAssessment("careAssessment", "nameOfCCG", e.target.value)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Relationship</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.relationship || ""} onChange={e => updateAssessment("careAssessment", "relationship", e.target.value)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Phone number</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.phoneNumber || ""} onChange={e => updateAssessment("careAssessment", "phoneNumber", e.target.value)} />
              </Grid>
            </Grid>

            {/* â”€â”€ SW Section â”€â”€ */}
            <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 4,
          mt: 6
        }}>
              <InfoOutlinedIcon sx={{
            color: "text.primary",
            fontSize: 20
          }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Clinical Commissioning Group (SW)
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={6}>
                <Typography sx={labelSx}>Name of SW</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.nameOfSW || ""} onChange={e => updateAssessment("careAssessment", "nameOfSW", e.target.value)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Relationship</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.relationship || ""} onChange={e => updateAssessment("careAssessment", "relationship", e.target.value)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Phone number</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.phoneNumber || ""} onChange={e => updateAssessment("careAssessment", "phoneNumber", e.target.value)} />
              </Grid>
            </Grid>

            <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 4,
          mt: 6
        }}>
              <InfoOutlinedIcon sx={{
            color: "text.primary",
            fontSize: 20
          }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Adult Social Service Group (LLA)
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={6}>
                <Typography sx={labelSx}>Name of LLA</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.nameOfLLA || ""} onChange={e => updateAssessment("careAssessment", "nameOfLLA", e.target.value)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Relationship</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.relationship || ""} onChange={e => updateAssessment("careAssessment", "relationship", e.target.value)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Phone number</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.phoneNumber || ""} onChange={e => updateAssessment("careAssessment", "phoneNumber", e.target.value)} />
              </Grid>
            </Grid>

            {/* â”€â”€ Adult Social Service Group (SW) Section â”€â”€ */}
            <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 4,
          mt: 6
        }}>
              <InfoOutlinedIcon sx={{
            color: "text.primary",
            fontSize: 20
          }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Adult Social Service Group (SW)
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={6}>
                <Typography sx={labelSx}>Name of SW</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.nameOfSW || ""} onChange={e => updateAssessment("careAssessment", "nameOfSW", e.target.value)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Relationship</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.relationship || ""} onChange={e => updateAssessment("careAssessment", "relationship", e.target.value)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Phone number</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.phoneNumber || ""} onChange={e => updateAssessment("careAssessment", "phoneNumber", e.target.value)} />
              </Grid>
            </Grid>

            {/* â”€â”€ Independent Referral (CCG) Section â”€â”€ */}
            <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 4,
          mt: 6
        }}>
              <InfoOutlinedIcon sx={{
            color: "text.primary",
            fontSize: 20
          }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Independent Referral (CCG)
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={6}>
                <Typography sx={labelSx}>Name of CCG</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.nameOfCCG || ""} onChange={e => updateAssessment("careAssessment", "nameOfCCG", e.target.value)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Relationship</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.relationship || ""} onChange={e => updateAssessment("careAssessment", "relationship", e.target.value)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Phone number</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.phoneNumber || ""} onChange={e => updateAssessment("careAssessment", "phoneNumber", e.target.value)} />
              </Grid>
            </Grid>

            {/* â”€â”€ Independent Referral (SW) Section â”€â”€ */}
            <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 4,
          mt: 6
        }}>
              <InfoOutlinedIcon sx={{
            color: "text.primary",
            fontSize: 20
          }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Independent Referral (SW)
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={6}>
                <Typography sx={labelSx}>Name of SW</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.nameOfSW || ""} onChange={e => updateAssessment("careAssessment", "nameOfSW", e.target.value)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Relationship</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.relationship || ""} onChange={e => updateAssessment("careAssessment", "relationship", e.target.value)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Phone number</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.phoneNumber || ""} onChange={e => updateAssessment("careAssessment", "phoneNumber", e.target.value)} />
              </Grid>
            </Grid>

            {/* â”€â”€ Current Living Status Section â”€â”€ */}
            <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 4,
          mt: 6
        }}>
              <InfoOutlinedIcon sx={{
            color: "text.primary",
            fontSize: 20
          }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Current Living Status
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {/* Left: Living environment */}
              <Grid size={6}>
                <Typography sx={{
              ...labelSx,
              fontWeight: 700,
              fontSize: "14px"
            }}>
                  describe the nature of your current home environment.
                </Typography>
                <SelectableButtonGroup options={["Lives Alone", "With partner/spouse", "With family"]} mt={1} value={careAssessment.describeTheNatureOfYourCurrentHomeEnvironment} onChange={val => updateAssessment("careAssessment", "describeTheNatureOfYourCurrentHomeEnvironment", val)} />
              </Grid>

              {/* Right: Barriers */}
              <Grid size={6}>
                <Typography sx={{
              ...labelSx,
              fontWeight: 700,
              fontSize: "14px"
            }}>
                  Is there evidence of any barriers to service that staff should
                  know about?
                </Typography>
                <SelectableButtonGroup options={["Yes", "No", "N/A"]} mt={1} value={careAssessment.isThereEvidenceOfAnyBarriersToServiceThatStaffShouldKnowAbout} onChange={val => updateAssessment("careAssessment", "isThereEvidenceOfAnyBarriersToServiceThatStaffShouldKnowAbout", val)} />
              </Grid>

              {/* If yes provide details */}
              <Grid size={12}>
                <Typography sx={labelSx}>
                  if yes then provide details
                </Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} value={careAssessment.ifYesThenProvideDetails || ""} onChange={e => updateAssessment("careAssessment", "ifYesThenProvideDetails", e.target.value)} />
              </Grid>

              {/* Describe building */}
              <Grid size={12}>
                <Typography sx={labelSx}>
                  Describe (e.g. building type, layout, size, # of floors;
                  concerns such as access, clutter)
                </Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} value={careAssessment.describeEgBuildingTypeLayoutSizeOfFloorsConcernsSuchAsAccessClutter || ""} onChange={e => updateAssessment("careAssessment", "describeEgBuildingTypeLayoutSizeOfFloorsConcernsSuchAsAccessClutter", e.target.value)} />
              </Grid>

              {/* Informal Support */}
              <Grid size={12}>
                <Typography sx={labelSx}>
                  Description of Current Informal Support
                </Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} placeholder="who is involved and how they assist, e.g. family/friend(s), church" value={careAssessment.descriptionOfCurrentInformalSupport || ""} onChange={e => updateAssessment("careAssessment", "descriptionOfCurrentInformalSupport", e.target.value)} />
              </Grid>

              {/* Formal support */}
              <Grid size={12}>
                <Typography sx={labelSx}>
                  Description of current services/formal support not being
                  delivered by the agency
                </Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} placeholder="(e.g. delivered meals, community nursing, community transport, medical alarm monitoring, education, rehabilitation)" value={careAssessment.descriptionOfCurrentServicesformalSupportNotBeingDeliveredByTheAgency || ""} onChange={e => updateAssessment("careAssessment", "descriptionOfCurrentServicesformalSupportNotBeingDeliveredByTheAgency", e.target.value)} />
              </Grid>
            </Grid>

            {/* â”€â”€ Consent, Capacity and Legal Framework Section â”€â”€ */}
            <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 4,
          mt: 6
        }}>
              <InfoOutlinedIcon sx={{
            color: "text.primary",
            fontSize: 20
          }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Consent, Capacity and Legal Framework
              </Typography>
            </Box>

            {/* Question 1 */}
            <Box sx={{
          mb: 5
        }}>
              <Box sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 3
          }}>
                <Box sx={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              bgcolor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: 700,
              color: "text.light"
            }}>
                  1
                </Box>
                <Typography fontWeight={700} fontSize="14px" color="text.primary">
                  Has consent been obtained for assessment and care delivery?
                </Typography>
              </Box>

              <Grid container spacing={4}>
                <Grid size={6}>
                  <Typography sx={labelSx}>Response</Typography>
                  <TextField fullWidth size="small" sx={inputSx} placeholder="Yes" value={careAssessment.hasConsentBeenObtainedForAssessmentAndCareDeliveryResponse || ""} onChange={e => updateAssessment("careAssessment", "hasConsentBeenObtainedForAssessmentAndCareDeliveryResponse", e.target.value)} />
                </Grid>
                <Grid size={6}>
                  <Typography sx={labelSx}>Risk Before Action</Typography>
                  <TextField fullWidth size="small" sx={inputSx} placeholder="Low" value={careAssessment.hasConsentBeenObtainedForAssessmentAndCareDeliveryRiskBeforeAction || ""} onChange={e => updateAssessment("careAssessment", "hasConsentBeenObtainedForAssessmentAndCareDeliveryRiskBeforeAction", e.target.value)} />
                </Grid>
                <Grid size={12}>
                  <Typography sx={labelSx}>Details / Evidence</Typography>
                  <TextField fullWidth size="small" sx={inputSx} placeholder="Consent/best-interest decision documented" value={careAssessment.hasConsentBeenObtainedForAssessmentAndCareDeliveryDetailsEvidence || ""} onChange={e => updateAssessment("careAssessment", "hasConsentBeenObtainedForAssessmentAndCareDeliveryDetailsEvidence", e.target.value)} />
                </Grid>
                <Grid size={12}>
                  <Typography sx={labelSx}>Action Required</Typography>
                  <TextField fullWidth size="small" sx={inputSx} placeholder="No action required" value={careAssessment.actionRequired || ""} onChange={e => updateAssessment("careAssessment", "actionRequired", e.target.value)} />
                </Grid>
              </Grid>
            </Box>

            {/* Question 2 */}
            <Box sx={{
          mb: 5
        }}>
              <Box sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 3
          }}>
                <Box sx={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              bgcolor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: 700,
              color: "text.light"
            }}>
                  2
                </Box>
                <Typography fontWeight={700} fontSize="14px" color="text.primary">
                  Does the person have capacity to consent to each relevant care
                  task?
                </Typography>
              </Box>

              <Grid container spacing={4}>
                <Grid size={6}>
                  <Typography sx={labelSx}>Response</Typography>
                  <TextField fullWidth size="small" sx={inputSx} placeholder="Yes" value={careAssessment.doesThePersonHaveCapacityToConsentToEachRelevantCareTaskResponse || ""} onChange={e => updateAssessment("careAssessment", "doesThePersonHaveCapacityToConsentToEachRelevantCareTaskResponse", e.target.value)} />
                </Grid>
                <Grid size={6}>
                  <Typography sx={labelSx}>Risk Before Action</Typography>
                  <TextField fullWidth size="small" sx={inputSx} placeholder="Select" value={careAssessment.doesThePersonHaveCapacityToConsentToEachRelevantCareTaskRiskBeforeAction || ""} onChange={e => updateAssessment("careAssessment", "doesThePersonHaveCapacityToConsentToEachRelevantCareTaskRiskBeforeAction", e.target.value)} />
                </Grid>
                <Grid size={12}>
                  <Typography sx={labelSx}>Details / Evidence</Typography>
                  <TextField fullWidth size="small" sx={inputSx} placeholder="Enter details or evidence..." value={careAssessment.doesThePersonHaveCapacityToConsentToEachRelevantCareTaskDetailsEvidence || ""} onChange={e => updateAssessment("careAssessment", "doesThePersonHaveCapacityToConsentToEachRelevantCareTaskDetailsEvidence", e.target.value)} />
                </Grid>
                <Grid size={12}>
                  <Typography sx={labelSx}>Action Required</Typography>
                  <TextField fullWidth size="small" sx={inputSx} placeholder="Describe required actions if any..." value={careAssessment.actionRequired || ""} onChange={e => updateAssessment("careAssessment", "actionRequired", e.target.value)} />
                </Grid>
              </Grid>
            </Box>

            {/* Question 3 */}
            <Box sx={{
          mb: 5
        }}>
              <Box sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 3
          }}>
                <Box sx={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              bgcolor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: 700,
              color: "text.light"
            }}>
                  3
                </Box>
                <Typography fontWeight={700} fontSize="14px" color="text.primary">
                  Is a Mental Capacity Act assessment required for any decision?
                </Typography>
              </Box>

              <Grid container spacing={4}>
                <Grid size={6}>
                  <Typography sx={labelSx}>Response</Typography>
                  <TextField fullWidth size="small" sx={inputSx} placeholder="No" value={careAssessment.isAMentalCapacityActAssessmentRequiredForAnyDecisionResponse || ""} onChange={e => updateAssessment("careAssessment", "isAMentalCapacityActAssessmentRequiredForAnyDecisionResponse", e.target.value)} />
                </Grid>
                <Grid size={6}>
                  <Typography sx={labelSx}>Risk Before Action</Typography>
                  <TextField fullWidth size="small" sx={inputSx} placeholder="Select" value={careAssessment.isAMentalCapacityActAssessmentRequiredForAnyDecisionRiskBeforeAction || ""} onChange={e => updateAssessment("careAssessment", "isAMentalCapacityActAssessmentRequiredForAnyDecisionRiskBeforeAction", e.target.value)} />
                </Grid>
                <Grid size={12}>
                  <Typography sx={labelSx}>Details / Evidence</Typography>
                  <TextField fullWidth size="small" sx={inputSx} placeholder="Enter details or evidence..." value={careAssessment.isAMentalCapacityActAssessmentRequiredForAnyDecisionDetailsEvidence || ""} onChange={e => updateAssessment("careAssessment", "isAMentalCapacityActAssessmentRequiredForAnyDecisionDetailsEvidence", e.target.value)} />
                </Grid>
                <Grid size={12}>
                  <Typography sx={labelSx}>Action Required</Typography>
                  <TextField fullWidth size="small" sx={inputSx} placeholder="Describe required actions if any..." value={careAssessment.actionRequired || ""} onChange={e => updateAssessment("careAssessment", "actionRequired", e.target.value)} />
                </Grid>
              </Grid>
            </Box>

            {/* Question 4 */}
            <Box sx={{
          mb: 5
        }}>
              <Box sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 3
          }}>
                <Box sx={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              bgcolor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: 700,
              color: "text.light"
            }}>
                  4
                </Box>
                <Typography fontWeight={700} fontSize="14px" color="text.primary">
                  Are best-interest decisions documented where the person lacks
                  capacity?
                </Typography>
              </Box>

              <Grid container spacing={4}>
                <Grid size={6}>
                  <Typography sx={labelSx}>Response</Typography>
                  <TextField fullWidth size="small" sx={inputSx} placeholder="No" value={careAssessment.areBestinterestDecisionsDocumentedWhereThePersonLacksCapacityResponse || ""} onChange={e => updateAssessment("careAssessment", "areBestinterestDecisionsDocumentedWhereThePersonLacksCapacityResponse", e.target.value)} />
                </Grid>
                <Grid size={6}>
                  <Typography sx={labelSx}>Risk Before Action</Typography>
                  <TextField fullWidth size="small" sx={inputSx} placeholder="Select" value={careAssessment.areBestinterestDecisionsDocumentedWhereThePersonLacksCapacityRiskBeforeAction || ""} onChange={e => updateAssessment("careAssessment", "areBestinterestDecisionsDocumentedWhereThePersonLacksCapacityRiskBeforeAction", e.target.value)} />
                </Grid>
                <Grid size={12}>
                  <Typography sx={labelSx}>Details / Evidence</Typography>
                  <TextField fullWidth size="small" sx={inputSx} placeholder="Enter details or evidence..." value={careAssessment.areBestinterestDecisionsDocumentedWhereThePersonLacksCapacityDetailsEvidence || ""} onChange={e => updateAssessment("careAssessment", "areBestinterestDecisionsDocumentedWhereThePersonLacksCapacityDetailsEvidence", e.target.value)} />
                </Grid>
                <Grid size={12}>
                  <Typography sx={labelSx}>Action Required</Typography>
                  <TextField fullWidth size="small" sx={inputSx} placeholder="Describe required actions if any..." value={careAssessment.actionRequired || ""} onChange={e => updateAssessment("careAssessment", "actionRequired", e.target.value)} />
                </Grid>
              </Grid>
            </Box>

            {/* Question 5 */}
            <Box sx={{
          mb: 5
        }}>
              <Box sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 3
          }}>
                <Box sx={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              bgcolor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: 700,
              color: "text.light"
            }}>
                  5
                </Box>
                <Typography fontWeight={700} fontSize="14px" color="text.primary">
                  Are parents, guardians, advocates, deputies or attorneys
                  involved where appropriate?
                </Typography>
              </Box>

              <Grid container spacing={4}>
                <Grid size={6}>
                  <Typography sx={labelSx}>Response</Typography>
                  <TextField fullWidth size="small" sx={inputSx} placeholder="N/A" value={careAssessment.areParentsGuardiansAdvocatesDeputiesOrAttorneysInvolvedWhereAppropriateResponse || ""} onChange={e => updateAssessment("careAssessment", "areParentsGuardiansAdvocatesDeputiesOrAttorneysInvolvedWhereAppropriateResponse", e.target.value)} />
                </Grid>
                <Grid size={6}>
                  <Typography sx={labelSx}>Risk Before Action</Typography>
                  <TextField fullWidth size="small" sx={inputSx} placeholder="Select" value={careAssessment.areParentsGuardiansAdvocatesDeputiesOrAttorneysInvolvedWhereAppropriateRiskBeforeAction || ""} onChange={e => updateAssessment("careAssessment", "areParentsGuardiansAdvocatesDeputiesOrAttorneysInvolvedWhereAppropriateRiskBeforeAction", e.target.value)} />
                </Grid>
                <Grid size={12}>
                  <Typography sx={labelSx}>Details / Evidence</Typography>
                  <TextField fullWidth size="small" sx={inputSx} placeholder="Enter details or evidence..." value={careAssessment.areParentsGuardiansAdvocatesDeputiesOrAttorneysInvolvedWhereAppropriateDetailsEvidence || ""} onChange={e => updateAssessment("careAssessment", "areParentsGuardiansAdvocatesDeputiesOrAttorneysInvolvedWhereAppropriateDetailsEvidence", e.target.value)} />
                </Grid>
                <Grid size={12}>
                  <Typography sx={labelSx}>Action Required</Typography>
                  <TextField fullWidth size="small" sx={inputSx} placeholder="Describe required actions if any..." value={careAssessment.actionRequired || ""} onChange={e => updateAssessment("careAssessment", "actionRequired", e.target.value)} />
                </Grid>
              </Grid>
            </Box>

            {/* Question 6 */}
            <Box sx={{
          mb: 5
        }}>
              <Box sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 3
          }}>
                <Box sx={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              bgcolor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: 700,
              color: "text.light"
            }}>
                  6
                </Box>
                <Typography fontWeight={700} fontSize="14px" color="text.primary">
                  Are any restrictions, deprivation of liberty concerns or legal
                  orders identified?
                </Typography>
              </Box>

              <Grid container spacing={4}>
                <Grid size={6}>
                  <Typography sx={labelSx}>Response</Typography>
                  <TextField fullWidth size="small" sx={inputSx} placeholder="Select" value={careAssessment.areAnyRestrictionsDeprivationOfLibertyConcernsOrLegalOrdersIdentifiedResponse || ""} onChange={e => updateAssessment("careAssessment", "areAnyRestrictionsDeprivationOfLibertyConcernsOrLegalOrdersIdentifiedResponse", e.target.value)} />
                </Grid>
                <Grid size={6}>
                  <Typography sx={labelSx}>Risk Before Action</Typography>
                  <TextField fullWidth size="small" sx={inputSx} placeholder="Select" value={careAssessment.areAnyRestrictionsDeprivationOfLibertyConcernsOrLegalOrdersIdentifiedRiskBeforeAction || ""} onChange={e => updateAssessment("careAssessment", "areAnyRestrictionsDeprivationOfLibertyConcernsOrLegalOrdersIdentifiedRiskBeforeAction", e.target.value)} />
                </Grid>
                <Grid size={12}>
                  <Typography sx={labelSx}>Details / Evidence</Typography>
                  <TextField fullWidth size="small" sx={inputSx} placeholder="Enter details or evidence..." value={careAssessment.areAnyRestrictionsDeprivationOfLibertyConcernsOrLegalOrdersIdentifiedDetailsEvidence || ""} onChange={e => updateAssessment("careAssessment", "areAnyRestrictionsDeprivationOfLibertyConcernsOrLegalOrdersIdentifiedDetailsEvidence", e.target.value)} />
                </Grid>
                <Grid size={12}>
                  <Typography sx={labelSx}>Action Required</Typography>
                  <TextField fullWidth size="small" sx={inputSx} placeholder="Describe required actions if any..." value={careAssessment.actionRequired || ""} onChange={e => updateAssessment("careAssessment", "actionRequired", e.target.value)} />
                </Grid>
              </Grid>
            </Box>

            {/* Cancel / Next Buttons */}
            <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 6,
          mb: 2
        }}>
              <Box sx={{
            bgcolor: "#fff",
            color: "text.primary",
            px: 5,
            py: 1.2,
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
            border: "1px solid #E2E8F0"
          }}>
                Cancel
              </Box>
              <Box onClick={() => setActiveStep(1)} sx={{
            bgcolor: "primary.main",
            color: "#fff",
            px: 5,
            py: 1.2,
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
            "&:hover": {
              opacity: 0.9
            }
          }}>
                Next
              </Box>
            </Box>
          </>}

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â• STEP 2 CONTENT â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        {activeStep === 1 && <>
            {/* â”€â”€ Cognition Section â”€â”€ */}
            <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 4
        }}>
              <InfoOutlinedIcon sx={{
            color: "text.primary",
            fontSize: 20
          }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Cognition
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {/* Is there a DOLS in place? */}
              <Grid size={6}>
                <Typography sx={labelSx}>Is there a DOLS in place?</Typography>
                <SelectableButtonGroup options={["Yes", "No", "N/A"]} mt={1} value={careAssessment.isThereADOLSInPlace} onChange={val => updateAssessment("careAssessment", "isThereADOLSInPlace", val)} />
              </Grid>

              {/* Is there a Will? */}
              <Grid size={6}>
                <Typography sx={labelSx}>Is there a Will?</Typography>
                <SelectableButtonGroup options={["Yes", "No", "N/A"]} mt={1} value={careAssessment.isThereAWill} onChange={val => updateAssessment("careAssessment", "isThereAWill", val)} />
              </Grid>

              {/* There will comments */}
              <Grid size={12}>
                <Typography sx={labelSx}>There will comments</Typography>
                <TextField fullWidth multiline rows={4} sx={inputSx} value={careAssessment.thereWillComments || ""} onChange={e => updateAssessment("careAssessment", "thereWillComments", e.target.value)} />
              </Grid>

              {/* Are there any safeguarding concerns? */}
              <Grid size={12}>
                <Typography sx={labelSx}>
                  Are there any safeguarding concerns?
                </Typography>
                <SelectableButtonGroup options={["Yes", "No", "N/A"]} mt={1} value={careAssessment.areThereAnySafeguardingConcerns} onChange={val => updateAssessment("careAssessment", "areThereAnySafeguardingConcerns", val)} />
              </Grid>

              {/* Safeguarding concern */}
              <Grid size={12}>
                <Box sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1
            }}>
                  <Typography sx={{
                ...labelSx,
                mb: 0
              }}>
                    Safeguarding concern
                  </Typography>
                  <Box sx={{
                display: "flex",
                alignItems: "center",
                gap: 1
              }}>
                    <Typography fontSize="11px" fontWeight={700} color="text.primary">
                      EXPORT:
                    </Typography>
                    <Box sx={{
                  display: "flex",
                  gap: 0.5
                }}>
                      <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.3,
                    cursor: "pointer"
                  }}>
                        <PictureAsPdfIcon sx={{
                      fontSize: 14,
                      color: "#EF4444"
                    }} />
                        <Typography fontSize="11px" fontWeight={700} color="#EF4444">
                          PDF
                        </Typography>
                      </Box>
                      <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.3,
                    cursor: "pointer",
                    ml: 1
                  }}>
                        <TableChartIcon sx={{
                      fontSize: 14,
                      color: "#22C55E"
                    }} />
                        <Typography fontSize="11px" fontWeight={700} color="#22C55E">
                          CSV
                        </Typography>
                      </Box>
                      <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.3,
                    cursor: "pointer",
                    ml: 1
                  }}>
                        <DescriptionIcon sx={{
                      fontSize: 14,
                      color: "#3B82F6"
                    }} />
                        <Typography fontSize="11px" fontWeight={700} color="#3B82F6">
                          Word
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <TextField fullWidth multiline rows={4} sx={inputSx} value={careAssessment.word || ""} onChange={e => updateAssessment("careAssessment", "word", e.target.value)} />
              </Grid>

              {/* Live Safeguarding concern */}
              <Grid size={12}>
                <Box sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1
            }}>
                  <Typography sx={{
                ...labelSx,
                mb: 0
              }}>
                    Live Safeguarding concern
                  </Typography>
                  <Box sx={{
                display: "flex",
                alignItems: "center",
                gap: 1
              }}>
                    <Typography fontSize="11px" fontWeight={700} color="text.primary">
                      EXPORT:
                    </Typography>
                    <Box sx={{
                  display: "flex",
                  gap: 0.5
                }}>
                      <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.3,
                    cursor: "pointer"
                  }}>
                        <PictureAsPdfIcon sx={{
                      fontSize: 14,
                      color: "#EF4444"
                    }} />
                        <Typography fontSize="11px" fontWeight={700} color="#EF4444">
                          PDF
                        </Typography>
                      </Box>
                      <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.3,
                    cursor: "pointer",
                    ml: 1
                  }}>
                        <TableChartIcon sx={{
                      fontSize: 14,
                      color: "#22C55E"
                    }} />
                        <Typography fontSize="11px" fontWeight={700} color="#22C55E">
                          CSV
                        </Typography>
                      </Box>
                      <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.3,
                    cursor: "pointer",
                    ml: 1
                  }}>
                        <DescriptionIcon sx={{
                      fontSize: 14,
                      color: "#3B82F6"
                    }} />
                        <Typography fontSize="11px" fontWeight={700} color="#3B82F6">
                          Word
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <TextField fullWidth multiline rows={4} sx={inputSx} value={careAssessment.word || ""} onChange={e => updateAssessment("careAssessment", "word", e.target.value)} />
              </Grid>
            </Grid>

            {/* â”€â”€ Behaviour Section â”€â”€ */}
            <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 4,
          mt: 6
        }}>
              <InfoOutlinedIcon sx={{
            color: "text.primary",
            fontSize: 20
          }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Behaviour
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={12}>
                <Typography sx={labelSx}>select behaviour</Typography>
                <SelectableButtonGroup options={["No issues at present", "Agitated", "Verbally Abusive", "Anxious", "Cooperative behaviour", "Withdrawn"]} mt={1} value={careAssessment.selectBehaviour} onChange={val => updateAssessment("careAssessment", "selectBehaviour", val)} />
              </Grid>

              <Grid size={12}>
                <Typography sx={labelSx}>Comments</Typography>
                <TextField fullWidth multiline rows={4} sx={inputSx} value={careAssessment.selectBehaviourComments || ""} onChange={e => updateAssessment("careAssessment", "selectBehaviourComments", e.target.value)} />
              </Grid>
            </Grid>

            {/* â”€â”€ Cognition (Mental Capacity) Section â”€â”€ */}
            <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 4,
          mt: 6
        }}>
              <InfoOutlinedIcon sx={{
            color: "text.primary",
            fontSize: 20
          }} />
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
                <SelectableButtonGroup options={["Mentally alert", "Confused at times"]} mt={1} value={careAssessment.cognitionMentalCapacity} onChange={val => updateAssessment("careAssessment", "cognitionMentalCapacity", val)} />
              </Grid>

              {/* Oriented to */}
              <Grid size={6}>
                <Typography sx={labelSx}>Oriented to</Typography>
                <SelectableButtonGroup options={["Person", "Place", "Time", "Child"]} mt={1} value={careAssessment.orientedTo} onChange={val => updateAssessment("careAssessment", "orientedTo", val)} />
              </Grid>

              {/* Seizures / Epilepsy */}
              <Grid size={12}>
                <Typography sx={labelSx}>Seizures / Epilepsy</Typography>
                <SelectableButtonGroup options={["No history of seizures", "Clonic seizures daily", "No episodes in 3 months", "Rescue medicines administered", "Tonic seizures daily", "Needs hospital treatment"]} mt={1} value={careAssessment.seizuresEpilepsy} onChange={val => updateAssessment("careAssessment", "seizuresEpilepsy", val)} />
              </Grid>

              {/* Comments */}
              <Grid size={12}>
                <Typography sx={labelSx}>Comments</Typography>
                <TextField fullWidth multiline rows={4} sx={inputSx} value={careAssessment.seizuresEpilepsyComments || ""} onChange={e => updateAssessment("careAssessment", "seizuresEpilepsyComments", e.target.value)} />
              </Grid>
            </Grid>

            {/* â”€â”€ Psychosocial Section â”€â”€ */}
            <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 4,
          mt: 6
        }}>
              <InfoOutlinedIcon sx={{
            color: "text.primary",
            fontSize: 20
          }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Psychosocial
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={12}>
                <Typography sx={labelSx}>Psychosocial wellbeing</Typography>
                <SelectableButtonGroup options={["Low mood", "Depressed", "Withdrawn", "Content", "Happy"]} mt={1} value={careAssessment.psychosocialWellbeing} onChange={val => updateAssessment("careAssessment", "psychosocialWellbeing", val)} />
              </Grid>
              <Grid size={12}>
                <Typography sx={labelSx}>Comments</Typography>
                <TextField fullWidth multiline rows={4} sx={inputSx} value={careAssessment.psychosocialWellbeingComments || ""} onChange={e => updateAssessment("careAssessment", "psychosocialWellbeingComments", e.target.value)} />
              </Grid>
            </Grid>

            {/* â”€â”€ Mobility Section â”€â”€ */}
            <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 4,
          mt: 6
        }}>
              <InfoOutlinedIcon sx={{
            color: "text.primary",
            fontSize: 20
          }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Mobility
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={12}>
                <Typography sx={labelSx}>Mobility status</Typography>
                <SelectableButtonGroup options={["Independent", "Needs assistance", "Uses mobility aid", "Bedbound"]} mt={1} value={careAssessment.mobilityStatus} onChange={val => updateAssessment("careAssessment", "mobilityStatus", val)} />
              </Grid>
              <Grid size={12}>
                <Typography sx={labelSx}>Comments</Typography>
                <TextField fullWidth multiline rows={4} sx={inputSx} value={careAssessment.mobilityStatusComments || ""} onChange={e => updateAssessment("careAssessment", "mobilityStatusComments", e.target.value)} />
              </Grid>
            </Grid>

            {/* â”€â”€ Communication Section â”€â”€ */}
            <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 4,
          mt: 6
        }}>
              <InfoOutlinedIcon sx={{
            color: "text.primary",
            fontSize: 20
          }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Communication
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={12}>
                <Typography sx={labelSx}>Communication ability</Typography>
                <SelectableButtonGroup options={["Verbal", "Non-verbal", "Uses communication aids"]} mt={1} value={careAssessment.communicationAbility} onChange={val => updateAssessment("careAssessment", "communicationAbility", val)} />
              </Grid>
              <Grid size={12}>
                <Typography sx={labelSx}>Comments</Typography>
                <TextField fullWidth multiline rows={4} sx={inputSx} value={careAssessment.communicationAbilityComments || ""} onChange={e => updateAssessment("careAssessment", "communicationAbilityComments", e.target.value)} />
              </Grid>
            </Grid>

            {/* â”€â”€ Breathing Section â”€â”€ */}
            <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 4,
          mt: 6
        }}>
              <InfoOutlinedIcon sx={{
            color: "text.primary",
            fontSize: 20
          }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Breathing
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={12}>
                <Typography sx={labelSx}>Breathing</Typography>
                <SelectableButtonGroup options={["Normal", "Shortness of breath", "Oxygen therapy"]} mt={1} value={careAssessment.breathing} onChange={val => updateAssessment("careAssessment", "breathing", val)} />
              </Grid>
              <Grid size={12}>
                <Typography sx={labelSx}>Comments</Typography>
                <TextField fullWidth multiline rows={4} sx={inputSx} value={careAssessment.breathingComments || ""} onChange={e => updateAssessment("careAssessment", "breathingComments", e.target.value)} />
              </Grid>
            </Grid>

            {/* Previous / Next Buttons */}
            <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 6,
          mb: 2
        }}>
              <Box onClick={() => setActiveStep(0)} sx={{
            bgcolor: "#fff",
            color: "text.primary",
            px: 5,
            py: 1.2,
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
            border: "1px solid #E2E8F0"
          }}>
                Previous
              </Box>
              <Box onClick={() => setActiveStep(2)} sx={{
            bgcolor: "primary.main",
            color: "#fff",
            px: 5,
            py: 1.2,
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
            "&:hover": {
              opacity: 0.9
            }
          }}>
                Next
              </Box>
            </Box>
          </>}

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â• STEP 3 CONTENT â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        {activeStep === 2 && <>
            {/* â”€â”€ Baseline Function Section â”€â”€ */}
            <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 4
        }}>
              <InfoOutlinedIcon sx={{
            color: "text.primary",
            fontSize: 20
          }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Baseline Function
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={6}>
                <Typography sx={labelSx}>
                  Number of falls in the last 12 months:
                </Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.numberOfFallsInTheLast12Months || ""} onChange={e => updateAssessment("careAssessment", "numberOfFallsInTheLast12Months", e.target.value)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Reason for falls:</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.reasonForFalls || ""} onChange={e => updateAssessment("careAssessment", "reasonForFalls", e.target.value)} />
              </Grid>

              {/* Is the person on four or more medicines? */}
              <Grid size={6}>
                <Typography sx={labelSx}>
                  Is the person on four or more medicines?
                </Typography>
                <SelectableButtonGroup options={["YES", "NO", "N/A"]} mt={1} value={careAssessment.isThePersonOnFourOrMoreMedicines} onChange={val => updateAssessment("careAssessment", "isThePersonOnFourOrMoreMedicines", val)} />
              </Grid>

              {/* Is the person at risk of falls? */}
              <Grid size={6}>
                <Typography sx={labelSx}>
                  Is the person at risk of falls?
                </Typography>
                <SelectableButtonGroup options={["YES", "NO", "N/A"]} mt={1} value={careAssessment.isThePersonAtRiskOfFalls} onChange={val => updateAssessment("careAssessment", "isThePersonAtRiskOfFalls", val)} />
              </Grid>

              {/* Latest falls risk assessment outcome? Date */}
              <Grid size={6}>
                <Typography sx={labelSx}>
                  Latest falls risk assessment outcome? Date:
                </Typography>
                <TextField fullWidth size="small" sx={inputSx} placeholder="mm/dd/yyyy" InputProps={{
              endAdornment: <CalendarTodayIcon sx={{
                fontSize: 18,
                color: "text.primary"
              }} />
            }} value={careAssessment.latestFallsRiskAssessmentOutcomeDate || ""} onChange={e => updateAssessment("careAssessment", "latestFallsRiskAssessmentOutcomeDate", e.target.value)} />
              </Grid>

              {/* Risk Level */}
              <Grid size={6}>
                <Typography sx={labelSx}>Risk Level</Typography>
                <SelectableButtonGroup options={["Low", "Medium", "High"]} mt={1} value={careAssessment.riskLevel} onChange={val => updateAssessment("careAssessment", "riskLevel", val)} />
              </Grid>

              {/* State risk identified */}
              <Grid size={12}>
                <Typography sx={labelSx}>
                  State risk identified from the falls this risk assessment:
                </Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} value={careAssessment.riskLevelStateRiskIdentifiedFromTheFallsThisRiskAssessment || ""} onChange={e => updateAssessment("careAssessment", "riskLevelStateRiskIdentifiedFromTheFallsThisRiskAssessment", e.target.value)} />
              </Grid>

              {/* Current mobility */}
              <Grid size={12}>
                <Typography sx={labelSx}>
                  Current mobility, including any walking aids if required and
                  approximate distance
                </Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} value={careAssessment.currentMobilityIncludingAnyWalkingAidsIfRequiredAndApproximateDistance || ""} onChange={e => updateAssessment("careAssessment", "currentMobilityIncludingAnyWalkingAidsIfRequiredAndApproximateDistance", e.target.value)} />
              </Grid>

              {/* Stairs */}
              <Grid size={12}>
                <Typography sx={labelSx}>Stairs:</Typography>
                <SelectableButtonGroup options={["YES", "NO", "N/A"]} mt={1} value={careAssessment.stairs} onChange={val => updateAssessment("careAssessment", "stairs", val)} />
              </Grid>

              {/* Current transfers */}
              <Grid size={12}>
                <Typography sx={labelSx}>
                  Current transfers, including any equipment if needed:
                </Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} value={careAssessment.currentTransfersIncludingAnyEquipmentIfNeeded || ""} onChange={e => updateAssessment("careAssessment", "currentTransfersIncludingAnyEquipmentIfNeeded", e.target.value)} />
              </Grid>

              {/* Bed / Chair / Toilet */}
              <Grid size={4}>
                <Typography sx={labelSx}>Bed</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.bed || ""} onChange={e => updateAssessment("careAssessment", "bed", e.target.value)} />
              </Grid>
              <Grid size={4}>
                <Typography sx={labelSx}>Chair</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.chair || ""} onChange={e => updateAssessment("careAssessment", "chair", e.target.value)} />
              </Grid>
              <Grid size={4}>
                <Typography sx={labelSx}>Toilet</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.toilet || ""} onChange={e => updateAssessment("careAssessment", "toilet", e.target.value)} />
              </Grid>
            </Grid>

            {/* â”€â”€ Nutrition (Food and Drink) Section â”€â”€ */}
            <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 4,
          mt: 6
        }}>
              <InfoOutlinedIcon sx={{
            color: "text.primary",
            fontSize: 20
          }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Nutrition (Food and Drink)
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={6}>
                <Typography sx={labelSx}>
                  Any unintentional weight loss?
                </Typography>
                <SelectableButtonGroup options={["YES", "NO", "N/A"]} mt={1} value={careAssessment.anyUnintentionalWeightLoss} onChange={val => updateAssessment("careAssessment", "anyUnintentionalWeightLoss", val)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Any swallowing problems?</Typography>
                <SelectableButtonGroup options={["YES", "NO", "N/A"]} mt={1} value={careAssessment.anySwallowingProblems} onChange={val => updateAssessment("careAssessment", "anySwallowingProblems", val)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Details:</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.details || ""} onChange={e => updateAssessment("careAssessment", "details", e.target.value)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Details:</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.details || ""} onChange={e => updateAssessment("careAssessment", "details", e.target.value)} />
              </Grid>
              <Grid size={12}>
                <Typography sx={labelSx}>
                  What is their MUST (Malnutrition Universal Screening Tool)
                  score?
                </Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.whatIsTheirMUSTMalnutritionUniversalScreeningToolScore || ""} onChange={e => updateAssessment("careAssessment", "whatIsTheirMUSTMalnutritionUniversalScreeningToolScore", e.target.value)} />
              </Grid>
              <Grid size={12}>
                <Typography sx={labelSx}>Meal information</Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} placeholder="e.g. Can they feed themselves? Are they slow to eat? On supplements" value={careAssessment.mealInformation || ""} onChange={e => updateAssessment("careAssessment", "mealInformation", e.target.value)} />
              </Grid>
              <Grid size={12}>
                <Typography sx={labelSx}>Comments:</Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} value={careAssessment.comments || ""} onChange={e => updateAssessment("careAssessment", "comments", e.target.value)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>
                  Highest weight in past 6 months or on admission?
                </Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.highestWeightInPast6MonthsOrOnAdmission || ""} onChange={e => updateAssessment("careAssessment", "highestWeightInPast6MonthsOrOnAdmission", e.target.value)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>
                  Latest nutritional risk assessment outcome:
                </Typography>
                <SelectableButtonGroup options={["Low", "Medium", "High"]} mt={1} value={careAssessment.latestNutritionalRiskAssessmentOutcome} onChange={val => updateAssessment("careAssessment", "latestNutritionalRiskAssessmentOutcome", val)} />
              </Grid>
              <Grid size={12}>
                <Typography sx={labelSx}>
                  Highest weight in the last six months or on admission?
                </Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.highestWeightInTheLastSixMonthsOrOnAdmission || ""} onChange={e => updateAssessment("careAssessment", "highestWeightInTheLastSixMonthsOrOnAdmission", e.target.value)} />
              </Grid>
              <Grid size={12}>
                <Typography sx={labelSx}>
                  Latest dietician/SALT recommendations where applicable:
                </Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} value={careAssessment.latestDieticianSALTRecommendationsWhereApplicable || ""} onChange={e => updateAssessment("careAssessment", "latestDieticianSALTRecommendationsWhereApplicable", e.target.value)} />
              </Grid>
            </Grid>

            {/* â”€â”€ Infection Prevention and Control Section â”€â”€ */}
            <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 4,
          mt: 6
        }}>
              <InfoOutlinedIcon sx={{
            color: "text.primary",
            fontSize: 20
          }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Infection Prevention and Control
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={12}>
                <Typography sx={labelSx}>
                  Is the person an infection risk?
                </Typography>
                <SelectableButtonGroup options={["YES", "NO", "N/A"]} mt={1} value={careAssessment.isThePersonAnInfectionRisk} onChange={val => updateAssessment("careAssessment", "isThePersonAnInfectionRisk", val)} />
              </Grid>
              <Grid size={12}>
                <Typography sx={labelSx}>
                  If yes, please list (ie: MRSA, C.Diff, TB)
                </Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} value={careAssessment.ifYesPleaseListIeMRSACDiffTB || ""} onChange={e => updateAssessment("careAssessment", "ifYesPleaseListIeMRSACDiffTB", e.target.value)} />
              </Grid>
              <Grid size={12}>
                <Typography sx={labelSx}>
                  Please give details of results and treatment:
                </Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} value={careAssessment.pleaseGiveDetailsOfResultsAndTreatment || ""} onChange={e => updateAssessment("careAssessment", "pleaseGiveDetailsOfResultsAndTreatment", e.target.value)} />
              </Grid>
              <Grid size={12}>
                <Typography sx={labelSx}>
                  Give details of any current infection outbreak:
                </Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} value={careAssessment.giveDetailsOfAnyCurrentInfectionOutbreak || ""} onChange={e => updateAssessment("careAssessment", "giveDetailsOfAnyCurrentInfectionOutbreak", e.target.value)} />
              </Grid>
            </Grid>

            {/* â”€â”€ End of Life Care Section â”€â”€ */}
            <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 4,
          mt: 6
        }}>
              <InfoOutlinedIcon sx={{
            color: "text.primary",
            fontSize: 20
          }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                End of Life Care
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={6}>
                <Typography sx={labelSx}>
                  Clinical Nurse Specialist (CNS) name:
                </Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.clinicalNurseSpecialistCNSName || ""} onChange={e => updateAssessment("careAssessment", "clinicalNurseSpecialistCNSName", e.target.value)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>
                  Is there an Advanced Care Plan?
                </Typography>
                <SelectableButtonGroup options={["YES", "NO", "N/A"]} mt={1} value={careAssessment.isThereAnAdvancedCarePlan} onChange={val => updateAssessment("careAssessment", "isThereAnAdvancedCarePlan", val)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Review date:</Typography>
                <TextField fullWidth size="small" sx={inputSx} placeholder="mm/dd/yyyy" InputProps={{
              endAdornment: <CalendarTodayIcon sx={{
                fontSize: 18,
                color: "text.primary"
              }} />
            }} value={careAssessment.reviewDate || ""} onChange={e => updateAssessment("careAssessment", "reviewDate", e.target.value)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>
                  Is there a RESPECT form in place?
                </Typography>
                <SelectableButtonGroup options={["YES", "NO", "N/A"]} mt={1} value={careAssessment.isThereARESPECTFormInPlace} onChange={val => updateAssessment("careAssessment", "isThereARESPECTFormInPlace", val)} />
              </Grid>
              <Grid size={12}>
                <Typography sx={labelSx}>
                  Preferred place of care at end of life:
                </Typography>
                <SelectableButtonGroup options={["YES", "NO", "N/A"]} mt={1} value={careAssessment.preferredPlaceOfCareAtEndOfLife} onChange={val => updateAssessment("careAssessment", "preferredPlaceOfCareAtEndOfLife", val)} />
              </Grid>
              <Grid size={12}>
                <Typography sx={labelSx}>If yes, please specify:</Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} value={careAssessment.ifYesPleaseSpecify || ""} onChange={e => updateAssessment("careAssessment", "ifYesPleaseSpecify", e.target.value)} />
              </Grid>
              <Grid size={12}>
                <Typography sx={labelSx}>
                  Has pain been assessed using a pain assessment tool?
                </Typography>
                <SelectableButtonGroup options={["YES", "NO", "N/A"]} mt={1} value={careAssessment.hasPainBeenAssessedUsingAPainAssessmentTool} onChange={val => updateAssessment("careAssessment", "hasPainBeenAssessedUsingAPainAssessmentTool", val)} />
              </Grid>
              <Grid size={12}>
                <Typography sx={labelSx}>If yes, please specify:</Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} value={careAssessment.ifYesPleaseSpecify || ""} onChange={e => updateAssessment("careAssessment", "ifYesPleaseSpecify", e.target.value)} />
              </Grid>
            </Grid>

            {/* â”€â”€ Baseline: Referrals Section â”€â”€ */}
            <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 4,
          mt: 6
        }}>
              <InfoOutlinedIcon sx={{
            color: "text.primary",
            fontSize: 20
          }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Baseline: Referrals
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={12}>
                <Typography sx={labelSx}>
                  Is a referral required (please tick as appropriate):
                </Typography>
                <SelectableButtonGroup options={["Supportive home team", "Pain team", "Pharmacist", "Falls service", "Physio", "Heart failure", "Tissue Viability", "Continence Service", "District Nurse", "Speech and Language Therapy", "Dietician", "Respiratory Team", "Psychiatry", "Continuing care for CHC consideration"]} mt={1} value={careAssessment.isAReferralRequiredPleaseTickAsAppropriate} onChange={val => updateAssessment("careAssessment", "isAReferralRequiredPleaseTickAsAppropriate", val)} />
              </Grid>
              <Grid size={12}>
                <Typography sx={labelSx}>List Other Service</Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} value={careAssessment.listOtherService || ""} onChange={e => updateAssessment("careAssessment", "listOtherService", e.target.value)} />
              </Grid>
            </Grid>

            {/* â”€â”€ Current equipment/adaptive aids Section â”€â”€ */}
            <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 4,
          mt: 6
        }}>
              <InfoOutlinedIcon sx={{
            color: "text.primary",
            fontSize: 20
          }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Current equipment/adaptive aids
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {/* General */}
              <Grid size={6}>
                <Typography sx={labelSx}>General</Typography>
                <SelectableButtonGroup options={["Manual wheelchair", "Power wheelchair", "Bariatric wheelchair", "Straight legged walker", "Two-wheeled walker", "Four-wheeled walker", "With seat", "Scooter", "Stair lift", "Splints", "Prosthesis", "Other"]} mt={1} value={careAssessment.general} onChange={val => updateAssessment("careAssessment", "general", val)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Other (please specify)</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.otherPleaseSpecify || ""} onChange={e => updateAssessment("careAssessment", "otherPleaseSpecify", e.target.value)} />
              </Grid>

              <Grid size={12}>
                <Typography sx={labelSx}>Comments</Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} value={careAssessment.otherPleaseSpecifyComments || ""} onChange={e => updateAssessment("careAssessment", "otherPleaseSpecifyComments", e.target.value)} />
              </Grid>

              {/* Bedroom - Bed */}
              <Grid size={12}>
                <Typography sx={labelSx}>Bedroom - Bed</Typography>
                <SelectableButtonGroup options={["Normal", "Hospital", "Adjustable", "Bariatric"]} mt={1} value={careAssessment.bedroomBed} onChange={val => updateAssessment("careAssessment", "bedroomBed", val)} />
              </Grid>

              {/* Mattress */}
              <Grid size={12}>
                <Typography sx={labelSx}>
                  Mattress (describe, including toppers/cushions)
                </Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} value={careAssessment.mattressDescribeIncludingTopperscushions || ""} onChange={e => updateAssessment("careAssessment", "mattressDescribeIncludingTopperscushions", e.target.value)} />
              </Grid>

              {/* Additional Bedroom Equipment */}
              <Grid size={12}>
                <Typography sx={labelSx}>
                  Additional Bedroom Equipment
                </Typography>
                <SelectableButtonGroup options={["Lift (ceiling/portable)", "Bed rail", "Transfer bench"]} mt={1} value={careAssessment.additionalBedroomEquipment} onChange={val => updateAssessment("careAssessment", "additionalBedroomEquipment", val)} />
              </Grid>

              <Grid size={12}>
                <Typography sx={labelSx}>Comments</Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} value={careAssessment.additionalBedroomEquipmentComments || ""} onChange={e => updateAssessment("careAssessment", "additionalBedroomEquipmentComments", e.target.value)} />
              </Grid>

              {/* Bathroom */}
              <Grid size={6}>
                <Typography sx={labelSx}>Bathroom</Typography>
                <SelectableButtonGroup options={["Grab bars", "Tub bar", "Safety grips/bath mats", "Bath board", "Bath chair", "Commode", "Raised toilet seat", "Bath bench", "Hand-held shower", "Lift (ceiling/portable)", "Other"]} mt={1} value={careAssessment.bathroom} onChange={val => updateAssessment("careAssessment", "bathroom", val)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Other (please specify)</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.otherPleaseSpecify || ""} onChange={e => updateAssessment("careAssessment", "otherPleaseSpecify", e.target.value)} />
              </Grid>

              <Grid size={12}>
                <Typography sx={labelSx}>Comments</Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} value={careAssessment.otherPleaseSpecifyComments || ""} onChange={e => updateAssessment("careAssessment", "otherPleaseSpecifyComments", e.target.value)} />
              </Grid>

              {/* Other equipment */}
              <Grid size={12}>
                <Typography sx={labelSx}>
                  Other equipment (describe, e.g. kitchen equipment, etc.)
                </Typography>
                <TextField fullWidth multiline rows={3} sx={inputSx} value={careAssessment.otherEquipmentDescribeEgKitchenEquipmentEtc || ""} onChange={e => updateAssessment("careAssessment", "otherEquipmentDescribeEgKitchenEquipmentEtc", e.target.value)} />
              </Grid>
            </Grid>

            {/* â”€â”€ Baseline (Signature) Section â”€â”€ */}
            <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 4,
          mt: 6
        }}>
              <InfoOutlinedIcon sx={{
            color: "text.primary",
            fontSize: 20
          }} />
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                Baseline
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={6}>
                <Typography sx={labelSx}>Name</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.name || ""} onChange={e => updateAssessment("careAssessment", "name", e.target.value)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Signature</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.signature || ""} onChange={e => updateAssessment("careAssessment", "signature", e.target.value)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Qualification</Typography>
                <TextField fullWidth size="small" sx={inputSx} value={careAssessment.qualification || ""} onChange={e => updateAssessment("careAssessment", "qualification", e.target.value)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Date</Typography>
                <TextField fullWidth size="small" sx={inputSx} placeholder="mm/dd/yyyy" InputProps={{
              endAdornment: <CalendarTodayIcon sx={{
                fontSize: 18,
                color: "text.primary"
              }} />
            }} value={careAssessment.date || ""} onChange={e => updateAssessment("careAssessment", "date", e.target.value)} />
              </Grid>
              <Grid size={6}>
                <Typography sx={labelSx}>Time</Typography>
                <TextField fullWidth size="small" sx={inputSx} placeholder="--:-- --" type="time" value={careAssessment.time || ""} onChange={e => updateAssessment("careAssessment", "time", e.target.value)} />
              </Grid>
            </Grid>

            {/* Previous / Finish Buttons */}
            <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 6,
          mb: 2
        }}>
              <Box onClick={() => setActiveStep(1)} sx={{
            bgcolor: "#fff",
            color: "text.primary",
            px: 5,
            py: 1.2,
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
            border: "1px solid #E2E8F0"
          }}>
                Previous
              </Box>
              <Box sx={{
            bgcolor: "primary.main",
            color: "#fff",
            px: 5,
            py: 1.2,
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
            "&:hover": {
              opacity: 0.9
            }
          }}>
                Finish
              </Box>
            </Box>
          </>}
      </Box>
    </>;
}