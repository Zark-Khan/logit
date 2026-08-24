import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckIcon from "@mui/icons-material/Check";
import { useClientDetailsStore } from "../../../../store/useClientDetailsStore";
import { CONTENT_CARD_SX } from "../../clientDetailStyles";

const STEPS = [
  { n: 1, label: "Personal details" },
  { n: 2, label: "Medical details" },
  { n: 3, label: "Primary Contacts" },
  { n: 4, label: "Advance planning" },
  { n: 5, label: "Admin" },
];

const STEP_TITLES = {
  1: "Personal Details",
  2: "Medical Details",
  3: "Primary Contacts",
  4: "Advance Planning",
  5: "Admin",
};

// The design uses the client's first name in every step's subtitle.
const firstNameOf = (name) => (name || "").split(" ")[0];

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    bgcolor: "#F9FAFB",
    borderRadius: "12px",
    fontSize: "14px",
    color: "#101828",
    "& fieldset": { borderColor: "#F3F4F6" },
    "&:hover fieldset": { borderColor: "#E5E7EB" },
    "&.Mui-focused fieldset": { borderColor: "#0EA5E9" },
  },
  "& .MuiOutlinedInput-input": { padding: "14.8px 16.8px" },
};

const textareaSx = {
  ...fieldSx,
  "& .MuiOutlinedInput-root": {
    ...fieldSx["& .MuiOutlinedInput-root"],
    alignItems: "flex-start",
  },
};

function FormField({ label, value, onChange, multiline }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}>
      <Typography fontSize="14px" fontWeight={700} color="#101828">
        {label}
      </Typography>
      <TextField
        fullWidth
        multiline={multiline}
        minRows={multiline ? 4 : 1}
        placeholder="Type your answer..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={multiline ? textareaSx : fieldSx}
      />
    </Box>
  );
}

function FormSection({ title, children }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>
      <Typography
        fontSize="14px"
        fontWeight={700}
        color="#0EA5E9"
        sx={{ textTransform: "uppercase", letterSpacing: "0.7px" }}
      >
        {title}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>
        {children}
      </Box>
    </Box>
  );
}

const emptyContact = () => ({
  firstName: "",
  lastName: "",
  relationship: "",
  phone: "",
  email: "",
  contactType: "",
  bestInterest: "",
});

function ContactCard({ index, contact, onChange, onRemove }) {
  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: "rgba(249, 250, 251, 0.5)",
        border: "1px solid #F3F4F6",
        borderRadius: "16px",
        p: 3,
        pt: 4,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        width: "100%",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -13,
          left: 24,
          bgcolor: "#fff",
          border: "1px solid #F3F4F6",
          borderRadius: "9999px",
          px: 1.6,
          py: 0.6,
        }}
      >
        <Typography
          fontSize="10px"
          fontWeight={700}
          color="#99A1AF"
          sx={{ textTransform: "uppercase", letterSpacing: "1px", whiteSpace: "nowrap" }}
        >
          Contact #{index + 1}
        </Typography>
      </Box>

      {onRemove && (
        <Box
          onClick={onRemove}
          sx={{
            position: "absolute",
            top: -13,
            right: 24,
            bgcolor: "#fff",
            border: "1px solid #F3F4F6",
            borderRadius: "9999px",
            px: 1.6,
            py: 0.6,
            cursor: "pointer",
          }}
        >
          <Typography
            fontSize="10px"
            fontWeight={700}
            color="#EF4444"
            sx={{ textTransform: "uppercase", letterSpacing: "1px", whiteSpace: "nowrap" }}
          >
            Remove
          </Typography>
        </Box>
      )}

      <Box sx={{ display: "flex", gap: 3, width: "100%" }}>
        <FormField
          label="First name"
          value={contact.firstName}
          onChange={(v) => onChange("firstName", v)}
        />
        <FormField
          label="Last name"
          value={contact.lastName}
          onChange={(v) => onChange("lastName", v)}
        />
      </Box>
      <Box sx={{ display: "flex", gap: 3, width: "100%" }}>
        <FormField
          label="Relationship"
          value={contact.relationship}
          onChange={(v) => onChange("relationship", v)}
        />
        <FormField
          label="Phone number"
          value={contact.phone}
          onChange={(v) => onChange("phone", v)}
        />
      </Box>
      <FormField label="Email address" value={contact.email} onChange={(v) => onChange("email", v)} />
      <FormField
        label="Type of contact (e.g. Emergency, Next of kin)"
        value={contact.contactType}
        onChange={(v) => onChange("contactType", v)}
      />
      <FormField
        label="Does the person make best interest decisions or can general care be discussed?"
        value={contact.bestInterest}
        onChange={(v) => onChange("bestInterest", v)}
      />
    </Box>
  );
}

function FormStepper({ activeStep, maxStepReached, onStepClick }) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        px: 1,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "20px",
          height: "2px",
          bgcolor: "rgba(138, 198, 66, 0.3)",
        }}
      />
      {STEPS.map((step) => {
        const isActive = step.n === activeStep;
        const isCompleted = step.n < activeStep;
        const isReachable = step.n <= maxStepReached;
        return (
          <Box
            key={step.n}
            onClick={() => isReachable && onStepClick(step.n)}
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1.5,
              cursor: isReachable ? "pointer" : "default",
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: isActive ? "#0EA5E9" : isCompleted ? "#8AC642" : "#fff",
                border: isActive
                  ? "1px solid #0EA5E9"
                  : isCompleted
                  ? "1px solid #8AC642"
                  : "1px solid #E5E7EB",
                boxShadow: isActive
                  ? "0px 10px 15px -3px rgba(14,165,233,0.2), 0px 4px 6px -4px rgba(14,165,233,0.2)"
                  : "none",
              }}
            >
              {isCompleted ? (
                <CheckIcon sx={{ fontSize: 18, color: "#fff" }} />
              ) : (
                <Typography fontSize="14px" fontWeight={700} color={isActive ? "#fff" : "#475569"}>
                  {step.n}
                </Typography>
              )}
            </Box>
            <Typography
              fontSize="12px"
              fontWeight={700}
              color={isActive ? "#0EA5E9" : "#475569"}
              sx={{ whiteSpace: "nowrap" }}
            >
              {step.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

export default function ClientDetailsForm({ client, onComplete }) {
  const [activeStep, setActiveStep] = useState(1);
  const [maxStepReached, setMaxStepReached] = useState(1);

  const getForm = useClientDetailsStore((s) => s.getForm);
  const updateField = useClientDetailsStore((s) => s.updateField);
  const markComplete = useClientDetailsStore((s) => s.markComplete);

  const personal = getForm(client.id, "personalDetails");
  const setPersonal = (field) => (value) =>
    updateField(client.id, "personalDetails", field, value);

  const medical = getForm(client.id, "medicalDetails");
  const setMedical = (field) => (value) =>
    updateField(client.id, "medicalDetails", field, value);

  const primary = getForm(client.id, "primaryContacts");
  const setPrimaryField = (field) => (value) =>
    updateField(client.id, "primaryContacts", field, value);
  const contacts =
    primary.contacts && primary.contacts.length > 0 ? primary.contacts : [emptyContact()];
  const updateContact = (index, field, value) => {
    setPrimaryField("contacts")(
      contacts.map((c, i) => (i === index ? { ...c, [field]: value } : c))
    );
  };
  const addContact = () => setPrimaryField("contacts")([...contacts, emptyContact()]);
  const removeContact = (index) =>
    setPrimaryField("contacts")(contacts.filter((_, i) => i !== index));

  const advance = getForm(client.id, "advancePlanning");
  const setAdvance = (field) => (value) =>
    updateField(client.id, "advancePlanning", field, value);

  const admin = getForm(client.id, "admin");
  const setAdmin = (field) => (value) => updateField(client.id, "admin", field, value);

  const handlePrevious = () => {
    if (activeStep > 1) setActiveStep((s) => s - 1);
  };

  const handleSaveContinue = () => {
    if (activeStep < STEPS.length) {
      const next = activeStep + 1;
      setActiveStep(next);
      setMaxStepReached((m) => Math.max(m, next));
    } else {
      markComplete(client.id);
      onComplete?.();
    }
  };

  const firstName = firstNameOf(client.name);

  return (
    <>
      <Box sx={{ ...CONTENT_CARD_SX, display: "flex", flexDirection: "column", gap: 5 }}>
        <Box>
          <Typography variant="h5" fontWeight={700} color="text.primary">
            Client details
          </Typography>
          <Typography fontSize="14px" color="text.secondary" sx={{ mt: 0.3 }}>
            Manage information and care delivery for {client.name}.
          </Typography>
        </Box>

        <FormStepper
          activeStep={activeStep}
          maxStepReached={maxStepReached}
          onStepClick={setActiveStep}
        />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Typography fontSize="24px" fontWeight={700} color="#101828">
            {STEP_TITLES[activeStep]}
          </Typography>
          <Typography fontSize="16px" color="text.light">
            Please provide the necessary details to complete the {firstName} profile.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {activeStep === 1 ? (
            <>
              <FormSection title="Culture and religion">
                <FormField
                  label={`What is ${client.name}'s ethnicity?`}
                  value={personal.ethnicity || ""}
                  onChange={setPersonal("ethnicity")}
                />
                <FormField
                  label={`What is ${client.name}'s religion?`}
                  value={personal.religion || ""}
                  onChange={setPersonal("religion")}
                />
                <FormField
                  label={`How do culture and/or religion(s) impact ${client.name}'s care needs?`}
                  value={personal.cultureReligionImpact || ""}
                  onChange={setPersonal("cultureReligionImpact")}
                  multiline
                />
              </FormSection>

              <FormSection title="Sexuality">
                <Box sx={{ display: "flex", gap: 3, width: "100%" }}>
                  <FormField
                    label={`What is ${client.name}'s sex?`}
                    value={personal.sex || ""}
                    onChange={setPersonal("sex")}
                  />
                  <FormField
                    label={`What is ${client.name}'s gender?`}
                    value={personal.gender || ""}
                    onChange={setPersonal("gender")}
                  />
                </Box>
                <FormField
                  label={`What is ${client.name}'s sexual orientation?`}
                  value={personal.sexualOrientation || ""}
                  onChange={setPersonal("sexualOrientation")}
                />
                <FormField
                  label={`How does sex, gender, or sexual orientation impact ${client.name}'s care needs?`}
                  value={personal.sexGenderImpact || ""}
                  onChange={setPersonal("sexGenderImpact")}
                  multiline
                />
              </FormSection>

              <FormSection title="Life History">
                <FormField
                  label={`What are ${client.name}'s previous jobs and occupations?`}
                  value={personal.jobsOccupations || ""}
                  onChange={setPersonal("jobsOccupations")}
                  multiline
                />
                <FormField
                  label={`Who are the important people in ${client.name}'s life?`}
                  value={personal.importantPeople || ""}
                  onChange={setPersonal("importantPeople")}
                  multiline
                />
                <FormField
                  label={`Are there any significant places for ${client.name}?`}
                  value={personal.significantPlaces || ""}
                  onChange={setPersonal("significantPlaces")}
                  multiline
                />
                <FormField
                  label="Are there any other notes regarding life history?"
                  value={personal.otherLifeHistoryNotes || ""}
                  onChange={setPersonal("otherLifeHistoryNotes")}
                  multiline
                />
              </FormSection>

              <FormSection title="Preferences">
                <FormField
                  label={`What are ${client.name}'s daily routines and preferences?`}
                  value={personal.dailyRoutines || ""}
                  onChange={setPersonal("dailyRoutines")}
                  multiline
                />
                <FormField
                  label="Are there any specific dislikes or triggers?"
                  value={personal.dislikesTriggers || ""}
                  onChange={setPersonal("dislikesTriggers")}
                  multiline
                />
                <FormField
                  label={`What are ${client.name}'s hobbies and interests?`}
                  value={personal.hobbiesInterests || ""}
                  onChange={setPersonal("hobbiesInterests")}
                  multiline
                />
              </FormSection>
            </>
          ) : activeStep === 2 ? (
            <>
              <FormSection title="Health details">
                <FormField
                  label={`What is ${client.name}'s NHS number?`}
                  value={medical.nhsNumber || ""}
                  onChange={setMedical("nhsNumber")}
                />
                <FormField
                  label="Please provide the medical history."
                  value={medical.medicalHistory || ""}
                  onChange={setMedical("medicalHistory")}
                  multiline
                />
                <FormField
                  label="What medical support is required?"
                  value={medical.medicalSupport || ""}
                  onChange={setMedical("medicalSupport")}
                  multiline
                />
              </FormSection>

              <FormSection title="Allergies and intolerances">
                <FormField
                  label="Please list any allergies or contraindicated medications."
                  value={medical.allergiesIntolerances || ""}
                  onChange={setMedical("allergiesIntolerances")}
                  multiline
                />
              </FormSection>

              <FormSection title="Doctor / GP">
                <Box sx={{ display: "flex", gap: 3, width: "100%" }}>
                  <FormField
                    label="GP practice name?"
                    value={medical.gpPracticeName || ""}
                    onChange={setMedical("gpPracticeName")}
                  />
                  <FormField
                    label="GP practice location?"
                    value={medical.gpPracticeLocation || ""}
                    onChange={setMedical("gpPracticeLocation")}
                  />
                </Box>
                <Box sx={{ display: "flex", gap: 3, width: "100%" }}>
                  <FormField
                    label="GP's name?"
                    value={medical.gpName || ""}
                    onChange={setMedical("gpName")}
                  />
                  <FormField
                    label="GP's phone number?"
                    value={medical.gpPhone || ""}
                    onChange={setMedical("gpPhone")}
                  />
                </Box>
              </FormSection>

              <FormSection title="Pharmacist">
                <FormField
                  label="Pharmacist details (Name, Address, Phone)?"
                  value={medical.pharmacistDetails || ""}
                  onChange={setMedical("pharmacistDetails")}
                  multiline
                />
              </FormSection>
            </>
          ) : activeStep === 3 ? (
            <>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography
                    fontSize="14px"
                    fontWeight={700}
                    color="#0EA5E9"
                    sx={{ textTransform: "uppercase", letterSpacing: "0.7px" }}
                  >
                    NoK / emergency contacts
                  </Typography>
                  <Typography
                    fontSize="12px"
                    fontWeight={700}
                    color="#0EA5E9"
                    onClick={addContact}
                    sx={{ cursor: "pointer" }}
                  >
                    + Add another contact
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
                  {contacts.map((contact, index) => (
                    <ContactCard
                      key={index}
                      index={index}
                      contact={contact}
                      onChange={(field, value) => updateContact(index, field, value)}
                      onRemove={contacts.length > 1 ? () => removeContact(index) : null}
                    />
                  ))}
                </Box>
              </Box>

              <FormSection title="Other professionals">
                <FormField
                  label="Details of other professionals involved in care?"
                  value={primary.otherProfessionals || ""}
                  onChange={setPrimaryField("otherProfessionals")}
                  multiline
                />
              </FormSection>
            </>
          ) : activeStep === 4 ? (
            <FormSection title="Capacity and documentation">
              <FormField
                label={`Does the ${firstName} have capacity to make decisions related to their health and wellbeing?`}
                value={advance.hasCapacity || ""}
                onChange={setAdvance("hasCapacity")}
              />
              <FormField
                label="Health and Welfare LPA"
                value={advance.healthWelfareLpa || ""}
                onChange={setAdvance("healthWelfareLpa")}
              />
              <FormField
                label="Property and Financial Affairs LPA"
                value={advance.propertyFinancialLpa || ""}
                onChange={setAdvance("propertyFinancialLpa")}
              />
              <FormField
                label="Do Not Attempt Cardiopulmonary Resuscitation (DNACPR)"
                value={advance.dnacpr || ""}
                onChange={setAdvance("dnacpr")}
              />
              <FormField
                label="Advance Decision to Refuse Treatment (ADRT / Living Will)"
                value={advance.adrt || ""}
                onChange={setAdvance("adrt")}
              />
              <FormField
                label="Recommended Summary Plan for Emergency Care and Treatment (ReSPECT)"
                value={advance.respect || ""}
                onChange={setAdvance("respect")}
              />
            </FormSection>
          ) : (
            <>
              <FormSection title="Identifiers">
                <FormField
                  label="Unique client identifier"
                  value={admin.uniqueClientIdentifier || ""}
                  onChange={setAdmin("uniqueClientIdentifier")}
                />
              </FormSection>

              <FormSection title="Status">
                <Box sx={{ display: "flex", gap: 3, width: "100%" }}>
                  <FormField
                    label="Service start date"
                    value={admin.serviceStartDate || ""}
                    onChange={setAdmin("serviceStartDate")}
                  />
                  <FormField
                    label="Current Status"
                    value={admin.currentStatus || ""}
                    onChange={setAdmin("currentStatus")}
                  />
                </Box>
              </FormSection>

              <FormSection title="Regulated care">
                <FormField
                  label={`Does ${firstName} receive regulated care?`}
                  value={admin.regulatedCare || ""}
                  onChange={setAdmin("regulatedCare")}
                />
              </FormSection>

              <FormSection title="Risk management">
                <FormField
                  label={`Assign an overall risk level to ${firstName} in line with your contingency plan.`}
                  value={admin.riskLevel || ""}
                  onChange={setAdmin("riskLevel")}
                />
                <FormField
                  label="Risk level details"
                  value={admin.riskLevelDetails || ""}
                  onChange={setAdmin("riskLevelDetails")}
                  multiline
                />
                <FormField
                  label="Family involvement level"
                  value={admin.familyInvolvement || ""}
                  onChange={setAdmin("familyInvolvement")}
                />
                <FormField
                  label={`What is the contingency plan for ${firstName}'s care, in the case of a staffing crisis?`}
                  value={admin.staffingCrisisPlan || ""}
                  onChange={setAdmin("staffingCrisisPlan")}
                  multiline
                />
                <FormField
                  label={`What is the contingency plan for ${firstName}'s care, in the case of adverse weather conditions?`}
                  value={admin.adverseWeatherPlan || ""}
                  onChange={setAdmin("adverseWeatherPlan")}
                  multiline
                />
              </FormSection>

              <FormSection title="Accessible Information Standard">
                <FormField
                  label={`Does ${firstName} have any communication or information needs?`}
                  value={admin.communicationNeeds || ""}
                  onChange={setAdmin("communicationNeeds")}
                />
                <FormField
                  label="Additional details"
                  value={admin.communicationAdditionalDetails || ""}
                  onChange={setAdmin("communicationAdditionalDetails")}
                  multiline
                />
                <FormField
                  label={`What is ${firstName}'s preferred method of contact for admin matters?`}
                  value={admin.preferredContactMethod || ""}
                  onChange={setAdmin("preferredContactMethod")}
                />
              </FormSection>

              <FormSection title="Funding arrangements">
                <Box sx={{ display: "flex", gap: 3, width: "100%" }}>
                  <FormField
                    label="Please select one or more funding options"
                    value={admin.fundingOptions || ""}
                    onChange={setAdmin("fundingOptions")}
                  />
                  <FormField
                    label="Local authority ID"
                    value={admin.localAuthorityId || ""}
                    onChange={setAdmin("localAuthorityId")}
                  />
                </Box>
              </FormSection>

              <FormSection title="Matching">
                <FormField
                  label="Staff preferences"
                  value={admin.staffPreferences || ""}
                  onChange={setAdmin("staffPreferences")}
                />
                <FormField
                  label="Other preferences"
                  value={admin.otherPreferences || ""}
                  onChange={setAdmin("otherPreferences")}
                  multiline
                />
              </FormSection>
            </>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: activeStep === 1 ? "flex-end" : "space-between",
          mt: 3,
        }}
      >
        {activeStep > 1 && (
          <Button
            variant="outlined"
            onClick={handlePrevious}
            sx={{
              bgcolor: "#fff",
              borderColor: "#E2E8F0",
              color: "#475569",
              fontWeight: 700,
              fontSize: "14px",
              textTransform: "none",
              borderRadius: "12px",
              px: 4,
              py: 1.8,
              "&:hover": { borderColor: "#E2E8F0", bgcolor: "#F8FAFC" },
            }}
          >
            Previous
          </Button>
        )}
        <Button
          variant="contained"
          onClick={handleSaveContinue}
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
            boxShadow:
              "0px 4px 6px -1px rgba(14,165,233,0.2), 0px 2px 4px -2px rgba(14,165,233,0.2)",
            "&:hover": { bgcolor: "#0C92CE" },
          }}
        >
          {activeStep === STEPS.length ? "Save Client Details" : "Save & Continue"}
        </Button>
      </Box>
    </>
  );
}
