import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useAssessmentStore } from "../../../../store/useAssessmentStore";

export default function ReviewAssessment({ categoryId, categoryTitle, clientName, onBack }) {
  const { assessments, updateAssessment, toggleArrayField } = useAssessmentStore();
  
  // As the user requested, we pull answers from careAssessment if they are mapped, 
  // but we also check the specific categoryId (e.g. 'mobility' or 'personal-care').
  // By merging them or falling back, we ensure data is present. 
  // Extract data from the main assessment form for auto-mapping
  const careData = assessments['careAssessment'] || {};
  const data = assessments[categoryId] || {};

  // Auto-Mapping Logic
  // Bathing
  const defaultBathing = careData.bathroom && careData.bathroom.length > 0 ? "help" : "independently";
  const canWashThemself = data.canWashThemself !== undefined ? data.canWashThemself : defaultBathing;

  // Mobility
  let defaultMobility = "Independent";
  if (careData.mobilityStatus === "Needs assistance") defaultMobility = "Dependent - requires help from one person";
  if (careData.mobilityStatus === "Uses mobility aid") defaultMobility = "Independent with aids / equipment";
  if (careData.mobilityStatus === "Bedbound") defaultMobility = "Immobile";
  const levelOfMobility = data.levelOfMobility !== undefined ? data.levelOfMobility : defaultMobility;

  // Falls
  const defaultFalls = careData.isThePersonAtRiskOfFalls === "YES" ? "Yes" : "No";
  const hadFallBefore = data.hadFallBefore !== undefined ? data.hadFallBefore : defaultFalls;

  // Generic fallback for others
  const canMaintainOralHygiene = data.canMaintainOralHygiene;
  const wearsDentures = data.wearsDentures;
  const canMaintainPersonalAppearance = data.canMaintainPersonalAppearance;
  const canDressThemself = data.canDressThemself;
  const canToiletThemself = data.canToiletThemself;
  const bowelControl = data.bowelControl;
  const bladderControl = data.bladderControl;
  const shopping = data.shopping;
  const telephone = data.telephone;
  const laundry = data.laundry;

  // Details
  const bathingAdditionalDetails = data.bathingAdditionalDetails !== undefined ? data.bathingAdditionalDetails : (careData.bathroomDetails || "");
  const mobilityAdditionalDetails = data.mobilityAdditionalDetails !== undefined ? data.mobilityAdditionalDetails : (careData.mobilityStatusComments || "");


  const personalCareTabs = [
    { id: "bathing", label: "Bathing" },
    { id: "oral-hygiene", label: "Oral hygiene" },
    { id: "personal-appearance", label: "Personal appearance" },
    { id: "toilet", label: "Toilet" },
    { id: "review-details", label: "Review details" },
  ];

  const mobilityTabs = [
    { id: "mobility", label: "Mobility" },
    { id: "everyday-activities", label: "Everyday activities" },
    { id: "review-details", label: "Review details" },
  ];

  const tabs = categoryId === "mobility" ? mobilityTabs : personalCareTabs;
  
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  // Update active tab when category changes
  useEffect(() => {
    setActiveTab(tabs[0].id);
  }, [categoryId, tabs]);

  const handleRadioChange = (field, value) => {
    updateAssessment(categoryId, field, value);
  };

  const handleTextChange = (field, event) => {
    updateAssessment(categoryId, field, event.target.value);
  };

  const RadioOption = ({ label, checked, onClick }) => (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        p: 2,
        mb: 1,
        borderRadius: "8px",
        border: "1px solid",
        borderColor: checked ? "#0EA5E9" : "#E2E8F0",
        bgcolor: checked ? "#F0F9FF" : "#fff",
        cursor: "pointer",
        transition: "all 0.2s",
      }}
    >
      <Box
        sx={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          border: "1px solid",
          borderColor: checked ? "#0EA5E9" : "#CBD5E1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#fff",
        }}
      >
        {checked && <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#0EA5E9" }} />}
      </Box>
      <Typography fontSize="14px" fontWeight={checked ? 600 : 400} color="text.primary">
        {label}
      </Typography>
    </Box>
  );

  const CheckboxOption = ({ label, checked, onClick }) => (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        p: 2,
        mb: 1,
        borderRadius: "8px",
        border: "1px solid",
        borderColor: checked ? "#0EA5E9" : "#E2E8F0",
        bgcolor: checked ? "#F0F9FF" : "#fff",
        cursor: "pointer",
        transition: "all 0.2s",
      }}
    >
      <Box
        sx={{
          width: 16,
          height: 16,
          borderRadius: "4px",
          border: "1px solid",
          borderColor: checked ? "#0EA5E9" : "#CBD5E1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: checked ? "#0EA5E9" : "#fff",
        }}
      >
        {checked && <CheckCircleIcon sx={{ fontSize: 14, color: "#fff" }} />}
      </Box>
      <Typography fontSize="14px" fontWeight={checked ? 600 : 400} color="text.primary">
        {label}
      </Typography>
    </Box>
  );

  const YesNoToggle = ({ value, onChange }) => (
    <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
      {["Yes", "No"].map((opt) => (
        <Box
          key={opt}
          onClick={() => onChange(opt)}
          sx={{
            px: 3,
            py: 1,
            borderRadius: "6px",
            border: "1px solid",
            borderColor: value === opt ? "#0EA5E9" : "#E2E8F0",
            bgcolor: value === opt ? "#F0F9FF" : "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
          }}
        >
          <Typography fontSize="14px" fontWeight={value === opt ? 700 : 500} color={value === opt ? "text.primary" : "text.light"}>
            {opt}
          </Typography>
        </Box>
      ))}
    </Box>
  );

  const SectionCard = ({ id, title, sectionNum, children }) => (
    <Box
      id={id}
      sx={{
        bgcolor: "#fff",
        borderRadius: "16px",
        p: 4,
        mb: 3,
        border: "1px solid #E2E8F0",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography fontSize="16px" fontWeight={800} color="text.primary">
          {title}
        </Typography>
        <Typography fontSize="10px" fontWeight={700} color="text.light" letterSpacing="0.05em">
          SECTION {sectionNum}
        </Typography>
      </Box>
      {children}
    </Box>
  );

  const QuestionLabel = ({ children }) => (
    <Typography fontSize="14px" fontWeight={800} color="text.primary" sx={{ mb: 2 }}>
      {children}
    </Typography>
  );

  const DetailLabel = ({ children }) => (
    <Typography fontSize="12px" fontWeight={700} color="text.primary" sx={{ mt: 3, mb: 1 }}>
      {children}
    </Typography>
  );

  const renderPersonalCareSections = () => (
    <>
        {/* Section 1: Bathing */}
        <SectionCard id="bathing" title="Bathing" sectionNum="1">
          <QuestionLabel>Can {clientName} wash themself?</QuestionLabel>
          <RadioOption label="Yes, independently (with or without equipment)" checked={canWashThemself === "independently"} onClick={() => handleRadioChange("canWashThemself", "independently")} />
          <RadioOption label="Yes, with help" checked={canWashThemself === "help"} onClick={() => handleRadioChange("canWashThemself", "help")} />
          <RadioOption label="No, fully dependant" checked={canWashThemself === "dependant"} onClick={() => handleRadioChange("canWashThemself", "dependant")} />

          <DetailLabel>Additional details</DetailLabel>
          <TextField
            fullWidth
            multiline
            minRows={3}
            placeholder="Add details..."
            value={bathingAdditionalDetails}
            onChange={(e) => handleTextChange("bathingAdditionalDetails", e)}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", bgcolor: "#fff" } }}
          />
        </SectionCard>

        {/* Section 2: Oral hygiene */}
        <SectionCard id="oral-hygiene" title="Oral hygiene" sectionNum="2">
          <QuestionLabel>Can {clientName} maintain oral hygiene?</QuestionLabel>
          <RadioOption label="Yes, independently" checked={canMaintainOralHygiene === "independently"} onClick={() => handleRadioChange("canMaintainOralHygiene", "independently")} />
          <RadioOption label="Yes, with help" checked={canMaintainOralHygiene === "help"} onClick={() => handleRadioChange("canMaintainOralHygiene", "help")} />
          <RadioOption label="No, fully dependant" checked={canMaintainOralHygiene === "dependant"} onClick={() => handleRadioChange("canMaintainOralHygiene", "dependant")} />

          <DetailLabel>Additional details</DetailLabel>
          <TextField
            fullWidth
            multiline
            minRows={3}
            placeholder="Add details..."
            value={data.oralHygieneAdditionalDetails || ""}
            onChange={(e) => handleTextChange("oralHygieneAdditionalDetails", e)}
            sx={{ mb: 4, "& .MuiOutlinedInput-root": { borderRadius: "8px", bgcolor: "#fff" } }}
          />

          <QuestionLabel>Does {clientName} wear dentures?</QuestionLabel>
          <YesNoToggle value={wearsDentures} onChange={(val) => handleRadioChange("wearsDentures", val)} />

          <DetailLabel>Additional details</DetailLabel>
          <TextField
            fullWidth
            multiline
            minRows={3}
            placeholder="N/A"
            value={data.denturesAdditionalDetails || ""}
            onChange={(e) => handleTextChange("denturesAdditionalDetails", e)}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", bgcolor: "#fff" } }}
          />
        </SectionCard>

        {/* Section 3: Personal appearance */}
        <SectionCard id="personal-appearance" title="Personal appearance" sectionNum="3">
          <QuestionLabel>Can {clientName} maintain their personal appearance?</QuestionLabel>
          <RadioOption label="Yes, independently" checked={canMaintainPersonalAppearance === "independently"} onClick={() => handleRadioChange("canMaintainPersonalAppearance", "independently")} />
          <RadioOption label="Yes, with help" checked={canMaintainPersonalAppearance === "help"} onClick={() => handleRadioChange("canMaintainPersonalAppearance", "help")} />
          <RadioOption label="No, fully dependant" checked={canMaintainPersonalAppearance === "dependant"} onClick={() => handleRadioChange("canMaintainPersonalAppearance", "dependant")} />

          <DetailLabel>Additional details</DetailLabel>
          <TextField
            fullWidth
            multiline
            minRows={3}
            placeholder="Add details..."
            value={data.personalAppearanceAdditionalDetails || ""}
            onChange={(e) => handleTextChange("personalAppearanceAdditionalDetails", e)}
            sx={{ mb: 4, "& .MuiOutlinedInput-root": { borderRadius: "8px", bgcolor: "#fff" } }}
          />

          <QuestionLabel>Can {clientName} dress themself?</QuestionLabel>
          <RadioOption label="Yes, independently (with or without equipment)" checked={canDressThemself === "independently"} onClick={() => handleRadioChange("canDressThemself", "independently")} />
          <RadioOption label="Yes, with help" checked={canDressThemself === "help"} onClick={() => handleRadioChange("canDressThemself", "help")} />
          <RadioOption label="No, fully dependant" checked={canDressThemself === "dependant"} onClick={() => handleRadioChange("canDressThemself", "dependant")} />

          <DetailLabel>Additional details</DetailLabel>
          <TextField
            fullWidth
            multiline
            minRows={3}
            placeholder="Add details..."
            value={data.dressingAdditionalDetails || ""}
            onChange={(e) => handleTextChange("dressingAdditionalDetails", e)}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", bgcolor: "#fff" } }}
          />
        </SectionCard>

        {/* Section 4: Toilet */}
        <SectionCard id="toilet" title="Toilet" sectionNum="4">
          <QuestionLabel>Can {clientName} toilet themself?</QuestionLabel>
          <RadioOption label="Yes, independently" checked={canToiletThemself === "independently"} onClick={() => handleRadioChange("canToiletThemself", "independently")} />
          <RadioOption label="Yes, with help" checked={canToiletThemself === "help"} onClick={() => handleRadioChange("canToiletThemself", "help")} />
          <RadioOption label="No, fully dependant" checked={canToiletThemself === "dependant"} onClick={() => handleRadioChange("canToiletThemself", "dependant")} />

          <DetailLabel>Additional details</DetailLabel>
          <TextField
            fullWidth
            multiline
            minRows={3}
            placeholder="Add details..."
            value={data.toiletAdditionalDetails || ""}
            onChange={(e) => handleTextChange("toiletAdditionalDetails", e)}
            sx={{ mb: 4, "& .MuiOutlinedInput-root": { borderRadius: "8px", bgcolor: "#fff" } }}
          />

          <QuestionLabel>Does {clientName} have control over their bowels?</QuestionLabel>
          <RadioOption label="Continent" checked={bowelControl === "continent"} onClick={() => handleRadioChange("bowelControl", "continent")} />
          <RadioOption label="Occasional accident" checked={bowelControl === "occasional"} onClick={() => handleRadioChange("bowelControl", "occasional")} />
          <RadioOption label="Incontinent" checked={bowelControl === "incontinent"} onClick={() => handleRadioChange("bowelControl", "incontinent")} />

          <DetailLabel>Additional details</DetailLabel>
          <TextField
            fullWidth
            multiline
            minRows={3}
            placeholder="Add details..."
            value={data.bowelAdditionalDetails || ""}
            onChange={(e) => handleTextChange("bowelAdditionalDetails", e)}
            sx={{ mb: 4, "& .MuiOutlinedInput-root": { borderRadius: "8px", bgcolor: "#fff" } }}
          />

          <QuestionLabel>Does {clientName} have control over their bladder?</QuestionLabel>
          <RadioOption label="Continent" checked={bladderControl === "continent"} onClick={() => handleRadioChange("bladderControl", "continent")} />
          <RadioOption label="Occasional accident" checked={bladderControl === "occasional"} onClick={() => handleRadioChange("bladderControl", "occasional")} />
          <RadioOption label="Incontinent" checked={bladderControl === "incontinent"} onClick={() => handleRadioChange("bladderControl", "incontinent")} />

          <DetailLabel>Additional details</DetailLabel>
          <TextField
            fullWidth
            multiline
            minRows={3}
            placeholder="Add details..."
            value={data.bladderAdditionalDetails || ""}
            onChange={(e) => handleTextChange("bladderAdditionalDetails", e)}
            sx={{ mb: 4, "& .MuiOutlinedInput-root": { borderRadius: "8px", bgcolor: "#fff" } }}
          />

          <QuestionLabel>Does {clientName} need support with the following?</QuestionLabel>
          <CheckboxOption label="Catheter" checked={data.needsSupportWith?.includes("Catheter")} onClick={() => toggleArrayField(categoryId, "needsSupportWith", "Catheter")} />
          <CheckboxOption label="Incontinence pad" checked={data.needsSupportWith?.includes("Incontinence pad")} onClick={() => toggleArrayField(categoryId, "needsSupportWith", "Incontinence pad")} />
          <CheckboxOption label="Stoma bag" checked={data.needsSupportWith?.includes("Stoma bag")} onClick={() => toggleArrayField(categoryId, "needsSupportWith", "Stoma bag")} />
          <CheckboxOption label="Other (please specify)" checked={data.needsSupportWith?.includes("Other")} onClick={() => toggleArrayField(categoryId, "needsSupportWith", "Other")} />

          <DetailLabel>Additional details</DetailLabel>
          <TextField
            fullWidth
            multiline
            minRows={3}
            placeholder="Add details..."
            value={data.supportAdditionalDetails || ""}
            onChange={(e) => handleTextChange("supportAdditionalDetails", e)}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", bgcolor: "#fff" } }}
          />
        </SectionCard>
    </>
  );

  const renderMobilitySections = () => (
    <>
      {/* Section 1: Mobility */}
      <SectionCard id="mobility" title="Mobility" sectionNum="1">
        <QuestionLabel>What is {clientName}'s level of mobility?</QuestionLabel>
        <RadioOption label="Independent" checked={levelOfMobility === "Independent"} onClick={() => handleRadioChange("levelOfMobility", "Independent")} />
        <RadioOption label="Independent with aids / equipment" checked={levelOfMobility === "Independent with aids / equipment"} onClick={() => handleRadioChange("levelOfMobility", "Independent with aids / equipment")} />
        <RadioOption label="Dependent - requires help from one person" checked={levelOfMobility === "Dependent - requires help from one person"} onClick={() => handleRadioChange("levelOfMobility", "Dependent - requires help from one person")} />
        <RadioOption label="Immobile" checked={levelOfMobility === "Immobile"} onClick={() => handleRadioChange("levelOfMobility", "Immobile")} />
        
        <DetailLabel>Additional details</DetailLabel>
        <TextField
          fullWidth
          multiline
          minRows={3}
          placeholder="Add details..."
          value={mobilityAdditionalDetails}
          onChange={(e) => handleTextChange("mobilityAdditionalDetails", e)}
          sx={{ mb: 4, "& .MuiOutlinedInput-root": { borderRadius: "8px", bgcolor: "#fff" } }}
        />

        <QuestionLabel>Has {clientName} had a fall before?</QuestionLabel>
        <YesNoToggle value={hadFallBefore} onChange={(val) => handleRadioChange("hadFallBefore", val)} />
      </SectionCard>

      {/* Section 2: Everyday activities */}
      <SectionCard id="everyday-activities" title="Everyday activities" sectionNum="2">
        <QuestionLabel>Can {clientName} do their shopping?</QuestionLabel>
        <RadioOption label="Yes, independently" checked={shopping === "independently"} onClick={() => handleRadioChange("shopping", "independently")} />
        <RadioOption label="Yes, with help" checked={shopping === "help"} onClick={() => handleRadioChange("shopping", "help")} />
        <RadioOption label="No, fully dependent" checked={shopping === "dependent"} onClick={() => handleRadioChange("shopping", "dependent")} />
        
        <DetailLabel>Additional details</DetailLabel>
        <TextField
          fullWidth
          multiline
          minRows={3}
          placeholder="Add details..."
          value={data.shoppingDetails || ""}
          onChange={(e) => handleTextChange("shoppingDetails", e)}
          sx={{ mb: 4, "& .MuiOutlinedInput-root": { borderRadius: "8px", bgcolor: "#fff" } }}
        />

        <QuestionLabel>Can {clientName} use the telephone?</QuestionLabel>
        <RadioOption label="Yes, independently" checked={telephone === "independently"} onClick={() => handleRadioChange("telephone", "independently")} />
        <RadioOption label="Yes, with help" checked={telephone === "help"} onClick={() => handleRadioChange("telephone", "help")} />
        <RadioOption label="No, fully dependent" checked={telephone === "dependent"} onClick={() => handleRadioChange("telephone", "dependent")} />
        
        <DetailLabel>Additional details</DetailLabel>
        <TextField
          fullWidth
          multiline
          minRows={3}
          placeholder="Add details..."
          value={data.telephoneDetails || ""}
          onChange={(e) => handleTextChange("telephoneDetails", e)}
          sx={{ mb: 4, "& .MuiOutlinedInput-root": { borderRadius: "8px", bgcolor: "#fff" } }}
        />

        <QuestionLabel>Can {clientName} do their laundry?</QuestionLabel>
        <RadioOption label="Yes, independently" checked={laundry === "independently"} onClick={() => handleRadioChange("laundry", "independently")} />
        <RadioOption label="Yes, with help" checked={laundry === "help"} onClick={() => handleRadioChange("laundry", "help")} />
        <RadioOption label="No, fully dependent" checked={laundry === "dependent"} onClick={() => handleRadioChange("laundry", "dependent")} />
        
        <DetailLabel>Additional details</DetailLabel>
        <TextField
          fullWidth
          multiline
          minRows={3}
          placeholder="Add details..."
          value={data.laundryDetails || ""}
          onChange={(e) => handleTextChange("laundryDetails", e)}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", bgcolor: "#fff" } }}
        />
      </SectionCard>
    </>
  );

  return (
    <Box sx={{ bgcolor: "#F3F9EC", minHeight: "100vh", p: 4, borderRadius: "24px" }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3, cursor: "pointer", width: "fit-content" }} onClick={onBack}>
        <ArrowBackIcon sx={{ fontSize: 16, color: "#3B82F6" }} />
        <Typography fontSize="14px" fontWeight={700} color="#3B82F6">
          Back
        </Typography>
      </Box>

      <Typography variant="h5" fontWeight={800} color="text.primary" sx={{ mb: 1 }}>
        Review {clientName}'s {categoryTitle.toLowerCase()} assessment
      </Typography>
      <Typography fontSize="14px" color="text.light" sx={{ mb: 4 }}>
        Record {clientName}'s level of independence for each {categoryTitle.toLowerCase()} activity, and any support that is required
      </Typography>

      {/* Tabs */}
      <Box sx={{ display: "flex", bgcolor: "#fff", borderRadius: "12px", p: 1, mb: 4, gap: 1 }}>
        {tabs.map((tab) => (
          <Box
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            sx={{
              px: 3,
              py: 1,
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.2s",
              "&:hover": { bgcolor: "#F8FAFC" },
            }}
          >
            <Typography fontSize="13px" fontWeight={700} color={activeTab === tab.id ? "#0EA5E9" : "text.primary"}>
              {tab.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Sections */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        
        {categoryId === "mobility" ? renderMobilitySections() : renderPersonalCareSections()}

        {/* Section: Review details (Shared across all categories) */}
        <SectionCard id="review-details" title="Review details" sectionNum={categoryId === "mobility" ? "3" : "5"}>
          <Box sx={{ bgcolor: "#FFFBEB", borderRadius: "8px", p: 2, display: "flex", gap: 1.5, mb: 4, border: "1px solid #FEF3C7" }}>
            <WarningAmberIcon sx={{ color: "#D97706", fontSize: 20 }} />
            <Box>
              <Typography fontSize="14px" fontWeight={700} color="#92400E">
                Review details
              </Typography>
              <Typography fontSize="13px" color="#92400E" sx={{ mt: 0.5 }}>
                Review details will only be visible on the agency hub. This section will not be displayed in the carer app or care plan PDF.
              </Typography>
            </Box>
          </Box>

          <QuestionLabel>How would you define the outcome of this review?</QuestionLabel>
          <RadioOption label="No changes required" checked={data.reviewOutcome === "none"} onClick={() => handleRadioChange("reviewOutcome", "none")} />
          <RadioOption label="Minor changes required" checked={data.reviewOutcome === "minor"} onClick={() => handleRadioChange("reviewOutcome", "minor")} />
          <RadioOption label="Major changes required" checked={data.reviewOutcome === "major"} onClick={() => handleRadioChange("reviewOutcome", "major")} />

          <DetailLabel>Additional details</DetailLabel>
          <TextField
            fullWidth
            multiline
            minRows={3}
            placeholder="Add any additional details that will be helpful when auditing, e.g. significant changes, actions taken"
            value={data.reviewAdditionalDetails || ""}
            onChange={(e) => handleTextChange("reviewAdditionalDetails", e)}
            sx={{ mb: 6, "& .MuiOutlinedInput-root": { borderRadius: "8px", bgcolor: "#fff" } }}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #E2E8F0", pt: 3 }}>
            <Typography fontSize="13px" fontWeight={700} color="#EF4444" sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>
              Delete assessment
            </Typography>
            <Button
              variant="contained"
              onClick={onBack}
              sx={{
                bgcolor: "#0EA5E9",
                color: "#fff",
                fontWeight: 700,
                textTransform: "none",
                borderRadius: "8px",
                px: 3,
                boxShadow: "none",
                "&:hover": { bgcolor: "#0284C7", boxShadow: "none" }
              }}
            >
              Finish Review
            </Button>
          </Box>
        </SectionCard>

      </Box>
    </Box>
  );
}
