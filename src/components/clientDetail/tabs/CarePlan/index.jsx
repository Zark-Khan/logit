import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AddAssessmentModal from "./AddAssessmentModal";

export default function CarePlanTab({ client }) {
  const [view, setView] = useState("dashboard"); // 'dashboard', 'personal-care', 'documents'
  const [addModalOpen, setAddModalOpen] = useState(false);

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight={700} color="text.primary">
          Care Plan
        </Typography>
        <Typography fontSize="14px" color="text.light" sx={{ mt: 0.3 }}>
          Manage information and care delivery for {client.name}.
        </Typography>
      </Box>

      {view === "personal-care" ? (
        <PersonalCareDetail
          client={client}
          onBack={() => setView("dashboard")}
        />
      ) : view === "documents" ? (
        <DocumentsView client={client} onBack={() => setView("dashboard")} />
      ) : (
        <Box>
          {/* About Margaret */}
          <Section
            title="About Margaret"
            subtitle="Capture basic information about Margaret, including their likes and preferences."
          >
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <AssessmentCard
                  icon={<PersonOutlineIcon />}
                  title="Client information"
                  status="UPDATED 1 MAR 2026"
                />
              </Grid>
            </Grid>
          </Section>

          {/* Initial assessments */}
          <Section
            title="Initial assessments"
            subtitle="Carry out a holistic initial assessment across eight key areas of care."
          >
            <Grid container spacing={2}>
              {[
                {
                  title: "Personal care",
                  icon: <SentimentSatisfiedAltIcon />,
                  date: "27 FEB 2026",
                  id: "personal-care",
                },
                {
                  title: "Mobility",
                  icon: <DirectionsRunIcon />,
                  date: "27 FEB 2026",
                },
                {
                  title: "Family / Carer Support",
                  icon: <PeopleOutlineIcon />,
                  date: "27 FEB 2026",
                },
                {
                  title: "Environmental",
                  icon: <HomeOutlinedIcon />,
                  date: "27 FEB 2026",
                },
                {
                  title: "Nutrition and hydration",
                  icon: <RestaurantIcon />,
                  date: "27 FEB 2026",
                },
                {
                  title: "Medical",
                  icon: <MedicalServicesOutlinedIcon />,
                  date: "24 FEB 2026",
                },
                {
                  title: "Administrative",
                  icon: <BusinessCenterOutlinedIcon />,
                  date: "24 FEB 2026",
                },
                {
                  title: "Psychological",
                  icon: <LightbulbOutlinedIcon />,
                  date: "27 FEB 2026",
                },
              ].map((item, i) => (
                <Grid size={{ xs: 12, sm: 4 }} key={i}>
                  <AssessmentCard
                    icon={item.icon}
                    title={item.title}
                    status={`UPDATED ${item.date}`}
                    onClick={item.id ? () => setView(item.id) : undefined}
                  />
                </Grid>
              ))}
            </Grid>
          </Section>

          {/* Additional assessments */}
          <Section
            title="Additional assessments"
            subtitle="Select additional assessments that are relevant to Margaret's needs and potential risks."
          >
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Box
                  onClick={() => setAddModalOpen(true)}
                  sx={{
                    height: "100%",
                    minHeight: 80,
                    border: "1px dashed #BAE6FD",
                    bgcolor: "rgba(138, 198, 66, 0.05)",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    cursor: "pointer",
                    "&:hover": { bgcolor: "rgba(138, 198, 66, 0.1)" },
                  }}
                >
                  <AddIcon sx={{ color: "primary.main" }} />
                  <Typography
                    fontSize="14px"
                    fontWeight={700}
                    color="primary.main"
                  >
                    Add assessment
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <AssessmentCard
                  icon={<FlashOnIcon />}
                  title="Seizures"
                  status="UPDATED 27 FEB 2026"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <AssessmentCard
                  icon={<FavoriteBorderIcon />}
                  title="Condition specific"
                  status="UPDATED 27 FEB 2026"
                />
              </Grid>
            </Grid>
          </Section>

          {/* Documents */}
          <Section
            title="Documents"
            subtitle="Store and download care planning documents that can be shared with carers and third parties."
          >
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <AssessmentCard
                  icon={<DescriptionOutlinedIcon />}
                  title="Documents"
                  status="UPDATED 1 MAR 2026"
                  onClick={() => setView("documents")}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <AssessmentCard
                  icon={<CloudDownloadOutlinedIcon />}
                  title="Download documents"
                  status="UPLOADS AUTOMATICALLY"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <AssessmentCard
                  icon={<HistoryEduIcon />}
                  title="Signature documents"
                  status="NO DOCUMENTS SIGNED"
                />
              </Grid>
            </Grid>
          </Section>
        </Box>
      )}

      <AddAssessmentModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={(selected) => {
          console.log("Adding:", selected);
          setAddModalOpen(false);
        }}
      />
    </Box>
  );
}

function DocumentsView({ client, onBack }) {
  const documents = [
    {
      title: "Margaret Maya Pucacco (1065940) - Care Grid.pdf",
      date: "24th February 2026",
      display: true,
    },
    {
      title: "Margaret's discharge summary 24.02.2026.pdf",
      date: "24th February 2026",
      display: true,
    },
    { title: "Consent form AP.pdf", date: "27th February 2026", display: true },
    {
      title: "COMPREHENSIVE RISK ASSESSMENT AP.docx",
      date: "1st March 2026",
      display: false,
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 3,
          cursor: "pointer",
        }}
        onClick={onBack}
      >
        <ArrowBackIcon sx={{ fontSize: 16, color: "primary.main" }} />
        <Typography fontSize="14px" fontWeight={700} color="primary.main">
          Back
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight={700} color="text.primary">
          Upload documents
        </Typography>
        <Typography fontSize="14px" color="text.light" sx={{ mt: 0.3 }}>
          Drag and drop any documents relating to Margaret that you would like
          to save.
        </Typography>
      </Box>

      <Box
        sx={{
          bgcolor: "#fff",
          borderRadius: "24px",
          p: 4,
          border: "1px solid #E2E8F0",
        }}
      >
        {/* Banner */}
        <Box
          sx={{
            bgcolor: "#FFF7ED",
            border: "1px solid #FFEDD5",
            borderRadius: "12px",
            p: 2,
            display: "flex",
            gap: 2,
            mb: 4,
          }}
        >
          <WarningAmberIcon sx={{ color: "#F97316", mt: 0.2 }} />
          <Typography fontSize="14px" color="#9A3412" sx={{ lineHeight: 1.5 }}>
            Permissions can be set to display PDFs, jpgs and pngs to carers in
            the app. Other formats cannot be shared with the carer app
            currently.
          </Typography>
        </Box>

        {/* Upload Area */}
        <Box
          sx={{
            border: "1px dashed #E2E8F0",
            borderRadius: "16px",
            py: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            mb: 6,
            cursor: "pointer",
            "&:hover": { bgcolor: "#F8FAFC" },
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              bgcolor: "#F8FAFC",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #E2E8F0",
            }}
          >
            <ArrowBackIcon
              sx={{ transform: "rotate(90deg)", color: "text.light" }}
            />
          </Box>
          <Typography fontSize="14px" fontWeight={400} color="text.primary">
            Drag and drop or click and select a file
          </Typography>
        </Box>

        {/* Table Header */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 180px 180px",
            px: 2,
            mb: 1,
          }}
        >
          <Typography
            fontSize="10px"
            fontWeight={700}
            color="text.priamry"
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          >
            DOCUMENT TITLE <KeyboardArrowDownIcon sx={{ fontSize: 12 }} />
          </Typography>
          <Typography
            fontSize="10px"
            fontWeight={700}
            color="text.priamry"
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          >
            DATE UPLOADED <KeyboardArrowDownIcon sx={{ fontSize: 12 }} />
          </Typography>
          <Typography
            fontSize="10px"
            fontWeight={700}
            color="text.priamry"
            sx={{ textAlign: "center" }}
          >
            DISPLAY TO CARERS
          </Typography>
        </Box>

        {/* Document List */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {documents.map((doc, i) => (
            <Box
              key={i}
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 180px 180px",
                alignItems: "center",
                p: 2,
                borderRadius: "16px",
                border: "1px solid #F1F5F9",
              }}
            >
              <Typography fontSize="14px" fontWeight={600} color="text.light">
                {doc.title}
              </Typography>
              <Typography fontSize="14px" color="text.light">
                {doc.date}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1.5,
                }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    textTransform: "none",
                    fontSize: "11px",
                    fontWeight: 700,
                    borderRadius: "8px",
                    borderColor: "#E2E8F0",
                    color: "text.primary",
                  }}
                >
                  Download
                </Button>
                <Box
                  sx={{ width: 36, display: "flex", justifyContent: "center" }}
                >
                  {doc.title.includes(".pdf") ||
                  doc.title.includes(".png") ||
                  doc.title.includes(".jpg") ? (
                    <Box
                      sx={{
                        width: 36,
                        height: 20,
                        bgcolor: doc.display ? "#E0F2FE" : "#F1F5F9",
                        borderRadius: "10px",
                        position: "relative",
                        cursor: "pointer",
                      }}
                    >
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          bgcolor: doc.display ? "#0EA5E9" : "#CBD5E1",
                          position: "absolute",
                          top: 2,
                          left: doc.display ? 18 : 2,
                          transition: "all 0.2s",
                        }}
                      />
                    </Box>
                  ) : null}
                </Box>
                <IconButton size="small">
                  <DeleteOutlineIcon
                    fontSize="small"
                    sx={{ color: "text.light" }}
                  />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function Section({ title, subtitle, children }) {
  return (
    <Box sx={{ mb: 5 }}>
      <Typography
        fontWeight={700}
        fontSize="18px"
        color="text.primary"
        sx={{ mb: 0.5 }}
      >
        {title}
      </Typography>
      <Typography fontSize="14px" color="text.light" sx={{ mb: 3 }}>
        {subtitle}
      </Typography>
      {children}
    </Box>
  );
}

function AssessmentCard({ icon, title, status, onClick }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        bgcolor: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: "16px",
        p: 2.5,
        display: "flex",
        alignItems: "center",
        gap: 2,
        height: "100%",
        cursor: onClick ? "pointer" : "default",
        "&:hover": onClick
          ? { borderColor: "primary.main", transform: "translateY(-2px)" }
          : {},
        transition: "all 0.2s",
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "10px",
          bgcolor: "#F0F9FF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {React.cloneElement(icon, {
          sx: { fontSize: 20, color: "primary.main" },
        })}
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography
          fontWeight={700}
          fontSize="14px"
          color="text.primary"
          sx={{ mb: 0.5 }}
        >
          {title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <CheckCircleIcon sx={{ fontSize: 12, color: "text.light" }} />
          <Typography
            fontSize="10px"
            fontWeight={700}
            color="text.light"
            sx={{ textTransform: "uppercase" }}
          >
            {status}
          </Typography>
        </Box>
      </Box>
      {onClick && (
        <ChevronRightIcon sx={{ color: "text.light", fontSize: 20 }} />
      )}
    </Box>
  );
}

function PersonalCareDetail({ client, onBack }) {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 3,
          cursor: "pointer",
        }}
        onClick={onBack}
      >
        <ArrowBackIcon sx={{ fontSize: 16, color: "primary.main" }} />
        <Typography fontSize="14px" fontWeight={700} color="primary.main">
          Back to Margaret's care plan
        </Typography>
      </Box>

      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" fontWeight={700} color="text.primary">
          Personal care
        </Typography>
        <Typography fontSize="14px" color="text.light" sx={{ mt: 0.3 }}>
          Capture outcomes, tasks and risks related to Margaret's personal care
          needs.
        </Typography>
      </Box>

      {/* 1. Needs assessment */}
      <DetailSection
        number="1"
        title="Needs assessment"
        description="Record Margaret's level of independence for each personal care activity, and any support that is required"
        action={
          <Button variant="outlined" sx={outlineBtnSx}>
            Review assessment
          </Button>
        }
      >
        <Box sx={{ mb: 1.5 }}>
          <Typography
            fontSize="12px"
            fontWeight={700}
            color="text.light"
            sx={{ mb: 2 }}
          >
            Previous assessments
          </Typography>
          <StatusCard
            title="Review in progress"
            subtitle="Created 5th March 2026"
            by="By Muhammad Khan"
            color="#0EA5E9"
          />
          <StatusCard
            title="Complete"
            subtitle="Submitted 24th February 2026"
            by="By Mijanur Ali khatun"
            color="#16A34A"
            hasUpdate
          />
        </Box>
      </DetailSection>

      {/* 2. Assessment summary and outcomes */}
      <DetailSection
        number="2"
        title="Assessment summary and outcomes"
        description="Describe how your team can support Margaret"
      >
        <Box
          sx={{
            bgcolor: "#fff",
            borderRadius: "16px",
            border: "1px solid #E2E8F0",
            p: 2.5,
          }}
        >
          <Typography
            fontSize="14px"
            color="text.primary"
            sx={{ lineHeight: 1.6, mb: 2 }}
          >
            Margaret is a young child and is fully dependent on adults for
            personal care. During short break sessions, personal care support
            may include toileting/incontinence care and general hygiene as
            required.
            <br />
            <br />
            Our team will support Margaret by ensuring her personal care needs
            are met safely, respectfully, and in line with parental guidance.
            Dignity, privacy, and safeguarding principles must be maintained at
            all times.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography fontSize="10px" fontWeight={700} color="text.light">
              677 / 2000 characters
            </Typography>
            <Button variant="outlined" sx={outlineBtnSx}>
              Save changes
            </Button>
          </Box>
        </Box>
      </DetailSection>

      {/* 3. Tasks */}
      <DetailSection
        number="3"
        title="Tasks"
        description="Add tasks to support Margaret in achieving their outcomes."
      >
        <TextField
          fullWidth
          placeholder="Search for tasks to add..."
          size="small"
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              bgcolor: "#fff",
              fontSize: "14px",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 20, color: "text.light" }} />
              </InputAdornment>
            ),
          }}
        />
        <TaskCard
          title="Support with incontinence pad"
          sub="Weekly - Sun • Afternoon"
        />
        <TaskCard
          title="Assist with personal care"
          sub="Weekly - Sun • Afternoon"
        />
      </DetailSection>

      {/* 4. Risks and mitigations */}
      <DetailSection
        number="4"
        title="Risks and mitigations"
        description="Record any risks Margaret presents with, and the measures taken to mitigate them. If you feel Margaret's risk level has changed, you should consider the need to review the Care Plan and RAG status in Birdie and update accordingly."
        action={
          <Button variant="outlined" sx={outlineBtnSx}>
            Add new risk
          </Button>
        }
      >
        <Typography
          fontSize="12px"
          fontWeight={700}
          color="text.light"
          sx={{ mb: 2 }}
        >
          2 risks captured
        </Typography>
        <RiskCard
          title="Skin breakdown / infection"
          desc="Risk: incontinence may increase risk of skin irritation. Mitigation: Change promptly if required. Use products provided by parents. Report any redness, rash, or skin concerns immediately."
          severity="MEDIUM"
          severityColor="#F97316"
          severityBg="#FFEDD5"
          progress="50%"
          date="Submitted on 24 Feb 2026, 16:28"
        />
        <RiskCard
          title="Seizure during personal care"
          desc="Risk of seizure during personal care activities. Mitigation: Monitor closely, follow seizure management plan."
          severity="HIGH"
          severityColor="#EF4444"
          severityBg="#FEE2E2"
          progress="80%"
          date="Submitted on 24 Feb 2026, 16:30"
        />
      </DetailSection>
    </Box>
  );
}

function DetailSection({ number, title, description, children, action }) {
  return (
    <Box sx={{ mb: 6 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Box sx={{ display: "flex", gap: 1.5, mb: 2 }}>
            <Typography fontSize="18px" fontWeight={700} color="text.primary">
              {number}.
            </Typography>
            <Box>
              <Typography fontSize="18px" fontWeight={700} color="text.primary">
                {title}
              </Typography>
              <Typography
                fontSize="14px"
                color="text.light"
                sx={{ mt: 1, lineHeight: 1.6 }}
              >
                {description}
              </Typography>
              {action && <Box sx={{ mt: 3 }}>{action}</Box>}
            </Box>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>{children}</Grid>
      </Grid>
    </Box>
  );
}

function StatusCard({ title, subtitle, by, color, hasUpdate }) {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: "16px",
        p: 2.5,
        mb: 1.5,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography
          fontWeight={700}
          fontSize="14px"
          color={color}
          sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
        >
          {title}{" "}
          {title === "Complete" && <CheckCircleIcon sx={{ fontSize: 16 }} />}
        </Typography>
        <Typography
          fontSize="12px"
          color="text.primary"
          fontWeight={400}
          sx={{ mt: 0.5 }}
        >
          {subtitle}
        </Typography>
        <Typography fontSize="12px" color="text.light">
          {by}
        </Typography>
      </Box>
      {hasUpdate && (
        <Typography
          fontSize="12px"
          fontWeight={700}
          color="primary.main"
          sx={{ cursor: "pointer" }}
        >
          Update
        </Typography>
      )}
    </Box>
  );
}

function TaskCard({ title, sub }) {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: "16px",
        p: 2.5,
        mb: 1.5,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography fontWeight={700} fontSize="15px" color="text.primary">
          {title}
        </Typography>
        <Typography fontSize="12px" color="text.light" sx={{ mt: 0.5 }}>
          {sub}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          cursor: "pointer",
        }}
      >
        <EditIcon sx={{ fontSize: 16, color: "primary.main" }} />
        <Typography fontSize="12px" fontWeight={700} color="primary.main">
          Edit
        </Typography>
      </Box>
    </Box>
  );
}

function RiskCard({
  title,
  desc,
  severity,
  severityColor,
  severityBg,
  date,
  progress,
}) {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: "16px",
        mb: 1.5,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box sx={{ p: 2.5, pb: 1.5 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 1.5,
          }}
        >
          <Typography fontWeight={700} fontSize="16px" color="text.primary">
            {title}
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton size="small">
              <DeleteOutlineIcon fontSize="18px" sx={{ color: "text.light" }} />
            </IconButton>
            <IconButton size="small">
              <EditIcon fontSize="18px" sx={{ color: "text.light" }} />
            </IconButton>
          </Box>
        </Box>
        <Typography
          fontSize="14px"
          color="text.light"
          sx={{ mb: 2, lineHeight: 1.6 }}
        >
          {desc}
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <Box
            sx={{ px: 1.5, py: 0.5, bgcolor: "#F1F5F9", borderRadius: "6px" }}
          >
            <Typography fontSize="10px" fontWeight={700} color="text.light">
              Personal care
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography fontSize="12px" color="text.light">
            {date}
          </Typography>
          <Typography fontSize="10px" fontWeight={700} color={severityColor}>
            {severity}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          height: 6,
          bgcolor: severityBg,
          width: "100%",
          position: "relative",
        }}
      >
        <Box
          sx={{
            height: "100%",
            bgcolor: severityColor,
            width: progress,
            borderRadius: "0 4px 4px 0",
          }}
        />
      </Box>
    </Box>
  );
}

const outlineBtnSx = {
  textTransform: "none",
  borderRadius: "10px",
  fontWeight: 700,
  fontSize: "14px",
  borderColor: "#E2E8F0",
  color: "text.primary",
  bgcolor: "#fff",
  px: 2,
  "&:hover": { borderColor: "primary.main", bgcolor: "rgba(0,0,0,0.02)" },
};
