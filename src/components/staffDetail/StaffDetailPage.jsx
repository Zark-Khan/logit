import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Chip,
  Grid,  // ← add this import
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import PhoneIcon from "@mui/icons-material/PhoneOutlined";
import EmailIcon from "@mui/icons-material/EmailOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOnOutlined";
import StaffDetailNav from "./StaffDetailNav";
import OverviewTab from "./tabs/OverviewTab";
import PersonalDetailsTab from "./tabs/PersonalDetailsTab";
import EmploymentContractTab from "./tabs/EmploymentContractTab";
import AvailabilityScheduleTab from "./tabs/AvailabilityScheduleTab";
import LeaveAbsencesTab from "./tabs/LeaveAbsencesTab";
import SkillsTrainingTab from "./tabs/SkillsTrainingTab";
import ComplianceDocumentsTab from "./tabs/ComplianceDocumentsTab";
import RosteringAssignmentsTab from "./tabs/RosteringAssignmentsTab";
import TimesheetsPayTab from "./tabs/TimesheetsPayTab";
import PerformanceActivityTab from "./tabs/PerformanceActivityTab";
import AssignedClientsTab from "./tabs/AssignedClientsTab";
import AccountAccessTab from "./tabs/AccountAccessTab";

/* ─── mock data (swap with API later) ─── */
const STAFF_MAP = {
  1: {
    id: 1,
    name: "Sarah Thompson",
    email: "s.thompson@logitcare.com",
    phone: "+44 7700 900123",
    branch: "Central Branch",
    role: "Carer",
    status: "Active",
  },
  2: {
    id: 2,
    name: "James Wilson",
    email: "jwilson@logitcare.com",
    phone: "+44 7700 900456",
    branch: "North Branch",
    role: "Nurse",
    status: "Active",
  },
  3: {
    id: 3,
    name: "Emily Barker",
    email: "e.barker@logitcare.com",
    phone: "+44 7700 900789",
    branch: "South Branch",
    role: "Supervisor",
    status: "On leave",
  },
  4: {
    id: 4,
    name: "Michael Chen",
    email: "m.chen@logitcare.com",
    phone: "+44 7700 900321",
    branch: "East Branch",
    role: "Carer",
    status: "Active",
  },
};

const PLACEHOLDER_CONTENT = ({ tab, name }) => (
  <Box sx={{ py: 4, textAlign: "center" }}>
    <Typography fontSize="15px" fontWeight={600} color="text.primary" mb={1}>
      {tab}
    </Typography>
    <Typography fontSize="12px" color="text.secondary">
      Content for {name}'s {tab} section will appear here.
    </Typography>
  </Box>
);

export default function StaffDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");

  const staff = STAFF_MAP[Number(id)] ?? STAFF_MAP[1];

  const renderTab = () => {
    if (activeTab === "Overview") return <OverviewTab staff={staff} />;
    if (activeTab === "Personal Details") return <PersonalDetailsTab staff={staff} />;
    if (activeTab === "Employment & Contract") return <EmploymentContractTab staff={staff} />;
    if (activeTab === "Availability & Schedule") return <AvailabilityScheduleTab staff={staff} />;
    if (activeTab === "Leave & Absences") return <LeaveAbsencesTab staff={staff} />;
    if (activeTab === "Skills & Training") return <SkillsTrainingTab staff={staff} />;
    if (activeTab === "Compliance & Documents") return <ComplianceDocumentsTab staff={staff} />;
    if (activeTab === "Rostering & Assignments") return <RosteringAssignmentsTab staff={staff} />;
    if (activeTab === "Timesheets & Pay") return <TimesheetsPayTab staff={staff} />;
    if (activeTab === "Performance & Activity") return <PerformanceActivityTab staff={staff} />;
    if (activeTab === "Assigned Clients") return <AssignedClientsTab staff={staff} />;
    if (activeTab === "Account & Access") return <AccountAccessTab staff={staff} />;
    return <PLACEHOLDER_CONTENT tab={activeTab} name={staff.name} />;
  };

  return (
    <Box sx={{ py: 3 }}>
      {/* ── Breadcrumb ── */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.8,
          mb: 2.5,
          cursor: "pointer",
          width: "fit-content",
        }}
        onClick={() => navigate("/staff/all-staff")}
      >
        <ArrowBackIcon
  sx={{
    width: 8,
    height: 24,
    color: "#94A3B8",
  }}
/>
        <Typography fontSize="14px" color="text.secondary" fontWeight={500}>
          Staff
        </Typography>
        <Typography fontSize="12px" color="#CBD5E1">
          /
        </Typography>
        <Typography fontSize="14px" fontWeight={700} color="text.primary">
          {staff.name}
        </Typography>
      </Box>

      {/* ── Profile Header Card ── */}
      <Box
        sx={{
          bgcolor: "#E0F5FF",
          border: "1px solid #83D8FF",
          borderRadius: "16px",
          px: 3,
          py: 3.343,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          mb: 2.5,
        }}
      >
        {/* Left: avatar + info */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, p:2 }}>
          <Avatar
            sx={{
              width: 58,
              height: 58,
              fontSize: "22px",
              fontWeight: 700,
              bgcolor: "rgba(14,165,233,0.15)",
              color: "#0EA5E9",
              border: "2px solid #83D8FF",
            }}
          >
            {staff.name[0]}
          </Avatar>

          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb:1 }}>
              <Typography fontWeight={700} fontSize="30px" color="text.primary">
                {staff.name}
              </Typography>
              <Chip
                label={staff.role.toUpperCase()}
                size="small"
                sx={{
                  bgcolor: "background.default",
                  color: "#0EA5E9",
                  fontWeight: 700,
                  fontSize: "12px",
                  height: 24,
                  borderRadius: "8px",
                  px:0.4
                }}
              />
              <Chip
                label={staff.status.toUpperCase()}
                size="small"
                sx={{
                  bgcolor:
                    staff.status === "Active"
                      ? "#528910"
                      : "rgba(249,115,22,0.12)",
                  color:"text.paper",
                  fontWeight: 700,
                  fontSize: "12px",
                  height: 24,
                  borderRadius: "8px",
                  px:0.4
                }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.1 }}>
                <EmailIcon sx={{ fontSize: 15, color: "text.secondary" }} />
                <Typography fontSize="14px" color="text.secondary">
                  {staff.email}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.1 }}>
                <PhoneIcon sx={{ fontSize: 15, color: "text.secondary" }} />
                <Typography fontSize="14px" color="text.secondary">
                  {staff.phone}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.1 }}>
                <LocationOnIcon sx={{ fontSize: 15, color: "text.secondary" }} />
                <Typography fontSize="14px" color="text.secondary">
                  {staff.branch}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Right: Edit Profile */}
        <Button
          startIcon={<EditIcon sx={{ fontSize: 13 }} />}
          variant="contained"
          sx={{
            background: "linear-gradient(90deg, #8AC642 0%, #528910 100%)",
            color: "#fff",
            fontWeight: 700,
            fontSize: "16px",
            textTransform: "none",
            borderRadius: "12px",
            px: 3.15,
            py: 1.25,
            "&:hover": { bgcolor: "#7ab536" },
            boxShadow: "none",
          }}
        >
          Edit Profile
        </Button>
      </Box>

 
<Grid container spacing={4}>
  <Grid size={{ xs: 12, md: 3 }}>
    <StaffDetailNav activeTab={activeTab} onTabChange={setActiveTab} />
  </Grid>

  {/* Right content area */}
  <Grid size={{ xs: 12, md: 9 }}>
    <Box
      sx={{
        bgcolor: "#E0F5FF",
        border: "1px solid #83D8FF",
        borderRadius: "16px",
        px: 3,
        py: 2.5,
        minHeight: 420,
      }}
    >
      {renderTab()}
    </Box>
  </Grid>
</Grid>
    </Box>
  );
}
