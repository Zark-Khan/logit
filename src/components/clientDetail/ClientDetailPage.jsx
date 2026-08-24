import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Avatar, Button, Chip, Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneIcon from "@mui/icons-material/PhoneOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ClientDetailNav from "./ClientDetailNav";
import ClientOverviewTab from "./tabs/ClientOverview";
import ClientDetailsTab from "./tabs/ClientDetails";
import CareAssessmentTab from "./tabs/CareAssessment";
import CareFeedTab from "./tabs/CareFeed";
import CarePlanTab from "./tabs/CarePlan";
import TaskPlannerTab from "./tabs/TaskPlanner";
import MedicationTab from "./tabs/Medication";
import ScheduleVisitsTab from "./tabs/ScheduleVisits";
import CareTeamTab from "./tabs/CareTeam";
import DocumentsTab from "./tabs/Documents";
import ReferralTab from "./tabs/Referral";
import NotesRecordsTab from "./tabs/NotesRecords";
import RisksIncidentsTab from "./tabs/RisksIncidents";
import FundingFinanceTab from "./tabs/FundingFinance";
import { ScheduleVisitModal } from "./ScheduleVisitModal";
import { CONTENT_CARD_SX } from "./clientDetailStyles";
import { useClientDetailsStore } from "../../store/useClientDetailsStore";
import { NAVBAR_HEIGHT } from "../dashboard/Navbar";

const CLIENTS_MAP = {
  "0041": {
    id: "0041",
    name: "Margaret Hall",
    phone: "+44 7700 900222",
    address: "12 Rose Gardens, London, NW1 4PJ",
    coordinator: "Alex Marshall",
    status: "ACTIVE",
    risk: "LOW RISK",
  },
  "0045": {
    id: "0045",
    name: "Arthur Reed",
    phone: "+44 7700 900333",
    address: "34 Oak Lane, London, NW2 5QL",
    coordinator: "Sarah Thompson",
    status: "ACTIVE",
    risk: "MED RISK",
  },
  // No "Client details" data yet — opening the Client Details tab for these
  // shows the step-by-step form (see tabs/ClientDetails/ClientDetailsForm.jsx)
  // instead of the read-only view.
  "0089": {
    id: "0089",
    name: "John Doe",
    phone: "+44 7700 900444",
    address: "18 Birch Street, London, NW3 6RT",
    coordinator: "Alex Marshall",
    status: "ON HOLD",
    risk: "LOW RISK",
  },
  "0092": {
    id: "0092",
    name: "Emma Davis",
    phone: "+44 7700 900555",
    address: "27 Maple Avenue, London, N4 8QW",
    coordinator: "James Wilson",
    status: "ACTIVE",
    risk: "HIGH RISK",
  },
};

const STATUS_BG = {
  ACTIVE: "#528910",
  "ON HOLD": "#FEA400",
};

const RISK_COLOR = {
  "LOW RISK": "text.light",
  "MED RISK": "#FEA400",
  "HIGH RISK": "#EF4444",
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

export default function ClientDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");
  const [visitModalOpen, setVisitModalOpen] = useState(false);
  const detailsComplete = useClientDetailsStore((s) => s.isComplete(id));
  const showsDetailsForm = activeTab === "Client Details" && !detailsComplete;

  const client = CLIENTS_MAP[id] ?? {
    id,
    name: "New Client",
    phone: "—",
    address: "—",
    coordinator: "—",
    status: "ACTIVE",
    risk: "LOW RISK",
  };

  const renderTab = () => {
    if (activeTab === "Overview") return <ClientOverviewTab client={client} />;
    if (activeTab === "Client Details")
      return <ClientDetailsTab client={client} />;
    if (activeTab === "Care Assessment")
      return <CareAssessmentTab client={client} />;
    if (activeTab === "Care Feed") return <CareFeedTab client={client} />;
    if (activeTab === "Care Plan") return <CarePlanTab client={client} />;
    if (activeTab === "Task Planner")
      return <TaskPlannerTab key={client.id} client={client} />;
    if (activeTab === "Medication") return <MedicationTab client={client} />;
    if (activeTab === "Schedule & Visits")
      return <ScheduleVisitsTab client={client} />;
    if (activeTab === "Care Team") return <CareTeamTab client={client} />;
    if (activeTab === "Documents") return <DocumentsTab client={client} />;
    if (activeTab === "Referral") return <ReferralTab client={client} />;
    if (activeTab === "Notes & Records")
      return <NotesRecordsTab client={client} />;
    if (activeTab === "Risks & Incidents")
      return <RisksIncidentsTab client={client} />;
    if (activeTab === "Funding & Finance")
      return <FundingFinanceTab client={client} />;
    return <PLACEHOLDER_CONTENT tab={activeTab} name={client.name} />;
  };

  return (
    <>
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
          onClick={() => navigate("/clients/all-clients")}
        >
          <ArrowBackIcon sx={{ width: 18, height: 18, color: "#94A3B8" }} />
          <Typography fontSize="14px" color="text.secondary" fontWeight={400}>
            Clients
          </Typography>
          <Typography fontSize="12px" color="#CBD5E1">
            /
          </Typography>
          <Typography fontSize="14px" fontWeight={700} color="text.primary">
            {client.name}
          </Typography>
        </Box>

        {/* ── Profile Header Card ── */}
        <Box
          sx={{
            bgcolor: "rgba(138, 198, 66, 0.15)", // Pale green
            border: "1px solid #8AC642",
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }}>
            <Avatar
              src={`https://ui-avatars.com/api/?name=${client.name}&background=random`}
              sx={{
                width: 58,
                height: 58,
                borderRadius: "12px",
                border: "2px solid #8AC642",
              }}
            />

            <Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <Typography
                  fontWeight={700}
                  fontSize="30px"
                  color="text.primary"
                >
                  {client.name}
                </Typography>
                <Chip
                  label={client.status}
                  size="small"
                  sx={{
                    bgcolor: STATUS_BG[client.status] ?? "#94A3B8",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "10px",
                    height: 20,
                    borderRadius: "4px",
                    px: 0.2,
                  }}
                />
                <Chip
                  label={client.risk}
                  size="small"
                  sx={{
                    bgcolor: "#ffffff",
                    color: RISK_COLOR[client.risk] ?? "text.light",
                    fontWeight: 700,
                    fontSize: "10px",
                    height: 20,
                    borderRadius: "4px",
                    px: 0.2,
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  flexWrap: "wrap",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                  <LocationOnIcon
                    sx={{ fontSize: 15, color: "text.secondary" }}
                  />
                  <Typography
                    fontSize="12px"
                    color="text.secondary"
                    fontWeight={400}
                  >
                    {client.address}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                  <PhoneIcon sx={{ fontSize: 15, color: "text.secondary" }} />
                  <Typography
                    fontSize="12px"
                    color="text.secondary"
                    fontWeight={400}
                  >
                    {client.phone}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                  <PersonOutlineIcon
                    sx={{ fontSize: 15, color: "text.secondary" }}
                  />
                  <Typography
                    fontSize="12px"
                    color="text.secondary"
                    fontWeight={400}
                  >
                    Coordinator: {client.coordinator}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Right: Buttons */}
          <Box sx={{ display: "flex", gap: 1.5, p: 2 }}>
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(to right, #0EA5E9, #0A6F9C)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "12px",
                textTransform: "none",
                borderRadius: "12px",
                px: 3,
                py: 0.8,
                boxShadow: "none",
              }}
              onClick={() => setVisitModalOpen(true)}
            >
              + Add Visit
            </Button>
            <Button
              variant="outlined"
              sx={{
                bgcolor: "#fff",
                borderColor: "#E2E8F0",
                color: "text.primary",
                fontWeight: 700,
                fontSize: "12px",
                textTransform: "none",
                borderRadius: "12px",
                px: 3,
                py: 0.8,
                "&:hover": { bgcolor: "#F8FAFC", borderColor: "#E2E8F0" },
              }}
            >
              Upload Document
            </Button>
          </Box>
        </Box>

        <Grid container spacing={4}>
          <Grid 
            size={{ xs: 12, md: 3 }} 
            sx={{
              position: "sticky",
              // Clear the fixed AppBar, plus a small breathing gap.
              top: `${NAVBAR_HEIGHT + 16}px`,
              alignSelf: "flex-start",
              // No max-height/overflow here on purpose: the nav renders at its
              // natural height like the design. Capping it clipped the last
              // items, which read as the page cutting the nav off in white.
            }}
          >
            <ClientDetailNav activeTab={activeTab} onTabChange={setActiveTab} />
          </Grid>

          {/* Right content area — the Client Details form supplies its own card
              so its Previous / Save buttons can sit outside it. */}
          <Grid size={{ xs: 12, md: 9 }}>
            {showsDetailsForm ? (
              renderTab()
            ) : (
              <Box sx={CONTENT_CARD_SX}>{renderTab()}</Box>
            )}
          </Grid>
        </Grid>
      </Box>

      <ScheduleVisitModal
        open={visitModalOpen}
        onClose={() => setVisitModalOpen(false)}
        clientName={client.name}
      />
    </>
  );
}
