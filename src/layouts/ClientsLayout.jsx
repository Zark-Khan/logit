import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, Button, Tabs, Tab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AddNewClientModal } from "../components/allClients/AddNewClientModal";

const TABS = [
  { label: "Overview", path: "/clients" },
  { label: "All Clients", path: "/clients/all-clients" },
  { label: "Assessments", path: "/clients/assessments" },
  { label: "Care Plans", path: "/clients/care-plans" },
  { label: "Medical Records", path: "/clients/medical-records" },
  { label: "Funding & Billing", path: "/clients/funding-billing" },
];

export default function ClientsLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [modalOpen, setModalOpen] = useState(false);

  const activeTab = TABS.findIndex((t) =>
    t.path === "/clients" ? pathname === "/clients" : pathname.startsWith(t.path),
  );

  return (
    <Box sx={{ py: 3 }}>
      {/* Page header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 2.5,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={700} color="text.primary">
            Client Management
          </Typography>
          <Typography variant="h6" color="text.light" mt={0.3}>
            Oversee service users, care pathways, and delivery records.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setModalOpen(true)}
          sx={{
            background: "linear-gradient(90deg, #8AC642 0%, #0EA5E9 100%)",
            borderRadius: 3,
            textTransform: "none",
            fontWeight: 700,
            px: 2.63,
            py: 1,
            color: "text.paper",
            boxShadow: "none",
          }}
        >
          Add New Client
        </Button>
      </Box>

      {/* Tabs */}
      <Tabs
        value={activeTab === -1 ? 0 : activeTab}
        onChange={(_, i) => navigate(TABS[i].path)}
        sx={{
          mb: 3,
          minHeight: 36,
          bgcolor: "transparent",
          borderRadius: 3,
          border: "1px solid #E2E8F0",
          p: 0.8,
          width: "fit-content",
          "& .MuiTabs-indicator": {
            height: "100%",
            bgcolor: "#8AC642", // match green from the design
            borderRadius: "12px",
            zIndex: 0,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          },
          "& .MuiTab-root": {
            textTransform: "none",
            minHeight: 34,
            fontSize: "12px",
            color: "text.light",
            px: 2.5,
            py: 0.5,
            mr: 0.5,
            zIndex: 1,
            transition: "all 0.2s ease",
            fontWeight: 700,
          },
          "& .Mui-selected": {
            color: "#fff !important",
            fontWeight: 700,
          },
        }}
      >
        {TABS.map((t) => (
          <Tab key={t.label} label={t.label} />
        ))}
      </Tabs>

      {/* Active tab page renders here */}
      <Outlet />

      <AddNewClientModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </Box>
  );
}
