import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, Button, Tabs, Tab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { AddNewStaffModal } from "../components/allStaff/AddNewStaffModal";

const TABS = [
  { label: "Overview", path: "/staff" },
  { label: "All Staff", path: "/staff/all-staff" },
  { label: "Availability", path: "/staff/availability" },
  { label: "Timesheets", path: "/staff/timesheets" },
  { label: "Compliance", path: "/staff/compliance" },
  { label: "Training & Skills", path: "/staff/training" },
];

export default function StaffLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const activeTab = TABS.findIndex((t) =>
    t.path === "/staff" ? pathname === "/staff" : pathname.startsWith(t.path),
  );
const [open, setOpen] = useState(false);

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
            Staff Management
          </Typography>
          <Typography variant="h6" color="text.light" mt={0.3}>
            Oversee your workforce, compliance, and training across all
            branches.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            background: "linear-gradient(90deg, #0EA5E9 0%, #8AC642 100%)",
            borderRadius: 3,
            textTransform: "none",
            fontWeight: 700,
            px: 2.63,
            py: 1,
            color: "text.paper",
          }}
          onClick={() => setOpen(true)}
        >
          Add New Staff
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
          "& .MuiTabs-indicator": { display: "none" },
          "& .MuiTab-root": {
            textTransform: "none",
            minHeight: 34,
            // borderRadius: 2,
            fontSize: "12px",
            color: "text.light",
            px: 1.5,
            py: 0.5,
            mr: 0.5,
            transition: "all 0.18s ease",
            fontWeight: 700,
          },
          "& .Mui-selected": {
            bgcolor: "#0EA5E9",
            color: "#fff !important",
            fontWeight: 700,
            borderRadius: 3,
            px: 2.5,
            py: 0.3,
          },
        }}
      >
        {TABS.map((t) => (
          <Tab key={t.label} label={t.label} />
        ))}
      </Tabs>

      {/* Active tab page renders here */}
      <Outlet />
      <AddNewStaffModal
        open={open}
        onClose={() => setOpen(false)}
      />  
    </Box>
  );
}
