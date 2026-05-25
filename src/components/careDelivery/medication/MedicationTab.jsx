import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  SvgIcon,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddMedicationModal from "./AddMedicationModal";
import MedicationDetailDrawer from "./MedicationDetailDrawer";

function PillIcon(props) {
  return (
    <SvgIcon
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.5 20.5l-6-6a4.95 4.95 0 1 1 7-7l6 6a4.95 4.95 0 1 1-7 7z" />
      <line x1="8.5" y1="8.5" x2="15.5" y2="15.5" />
    </SvgIcon>
  );
}

const MEDICATION_DATA = [
  {
    id: 1,
    name: "Paracetamol 400mg",
    client: "Arthur Morgan",
    frequency: "Twice Daily",
    time: "Today, 09:15 AM",
    status: "ON TRACK",
    prescribedBy: "Dr. Miller",
    startDate: "2026-01-01",
    endDate: "Ongoing",
    route: "Oral (Tablet/Capsule)",
    reason: "",
    reportedBy: "",
    reportedAt: "",
  },
  {
    id: 2,
    name: "Amlodipine 5mg",
    client: "Sadie Adler",
    frequency: "Once Daily",
    time: "Today, 08:30 AM",
    status: "ON TRACK",
    prescribedBy: "Dr. Smith",
    startDate: "2026-01-15",
    endDate: "Ongoing",
    route: "Oral (Tablet/Capsule)",
    reason: "",
    reportedBy: "",
    reportedAt: "",
  },
  {
    id: 3,
    name: "Metformin 400mg",
    client: "John Marston",
    frequency: "Three Times Daily",
    time: "Yesterday, 06:00 PM",
    status: "MISSED",
    prescribedBy: "Dr. Miller",
    startDate: "2026-01-01",
    endDate: "Ongoing",
    route: "Oral (Tablet/Capsule)",
    reason:
      "Client was asleep during the scheduled time and carer decided not to wake them as per care plan guidelines for non-critical medication.",
    reportedBy: "Sarah Thompson",
    reportedAt: "Today, 07:30 AM",
  },
  {
    id: 4,
    name: "Warfarin 3mg",
    client: "Charles Smith",
    frequency: "Once Daily",
    time: "Today, 10:00 AM",
    status: "ON TRACK",
    prescribedBy: "Dr. Brown",
    startDate: "2026-02-10",
    endDate: "Ongoing",
    route: "Oral (Tablet/Capsule)",
    reason: "",
    reportedBy: "",
    reportedAt: "",
  },
];

export default function MedicationTab() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);

  const handleOpenDrawer = (med) => {
    setSelectedMedication(med);
    setDrawerOpen(true);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 4 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "12px",
            bgcolor: "#FFF1F2", // Light pink/red
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PillIcon sx={{ color: "#F43F5E", fontSize: 20 }} />
        </Box>
        <Typography fontSize="18px" fontWeight={700} color="text.primary">
          Medication Management
        </Typography>
      </Box>

      {/* Filter Bar */}
      <Box
        sx={{
          bgcolor: "#E0F5FF",
          border: "1px solid #83D8FF",
          borderRadius: "24px",
          p: 1.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <TextField
          placeholder="Search by medicine or client ..."
          InputProps={{
            startAdornment: (
              <SearchIcon sx={{ color: "#94A3B8", mr: 1, fontSize: 20 }} />
            ),
          }}
          sx={{
            width: 448,
            "& .MuiOutlinedInput-root": {
              bgcolor: "#fff",
              borderRadius: "16px",
              height: 44,
              "& fieldset": { border: "none" },
            },
            "& input::placeholder": {
              color: "#94A3B8",
              opacity: 1,
              fontSize: "14px",
              fontWeight: 400,
            },
          }}
        />

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            select
            defaultValue="Missed"
            sx={{
              width: 140,
              "& .MuiOutlinedInput-root": {
                bgcolor: "#fff",
                borderRadius: "12px",
                height: 37,
                "& fieldset": { border: "none" },
              },
              "& .MuiSelect-select": {
                color: "#EF4444",
                fontWeight: 700,
                fontSize: "14px",
              },
            }}
          >
            <MenuItem value="Missed">Missed</MenuItem>
            <MenuItem value="All">All Status</MenuItem>
          </TextField>

          <TextField
            select
            defaultValue="Today"
            sx={{
              width: 180,
              "& .MuiOutlinedInput-root": {
                bgcolor: "#fff",
                borderRadius: "12px",
                height: 37,
                "& fieldset": { border: "none" },
              },
              "& .MuiSelect-select": {
                color: "text.light",
                fontWeight: 400,
                fontSize: "14px",
              },
            }}
          >
            <MenuItem value="Today">Today, 1 Mar 2026</MenuItem>
          </TextField>

          <Button
            variant="contained"
            onClick={() => setAddModalOpen(true)}
            startIcon={<span>+</span>}
            sx={{
              borderRadius: "12px",
              background: "linear-gradient(135deg, #8AC642 0%, #0EA5E9 100%)",
              textTransform: "none",
              fontWeight: 700,
              px: 3,
              boxShadow: "none",
              color: "#ffffff",
              height: 37,
              py: "unset !important",
            }}
          >
            Add Medication
          </Button>
        </Box>
      </Box>

      {/* List Container */}
      <Box
        sx={{
          borderRadius: "24px",
          border: "1px solid #83D8FF",
          bgcolor: "#E0F5FF",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 3,
          }}
        >
          <Typography fontSize="16px" fontWeight={700} color="text.primary">
            Active Medications
          </Typography>
          <Typography fontSize="12px" fontWeight={700} color="text.grey">
            Showing all clients
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {MEDICATION_DATA.map((item, index) => (
            <Box
              key={item.id}
              sx={{
                p: 2,
                px: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderTop: "1px solid #fff",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onClick={() => handleOpenDrawer(item)}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "12px",
                    bgcolor: "#FFF1F2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PillIcon sx={{ color: "#F43F5E", fontSize: 22 }} />
                </Box>
                <Box>
                  <Typography
                    fontSize="14px"
                    fontWeight={700}
                    color="text.primary"
                    mb={0.2}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    fontSize="12px"
                    color="text.light"
                    fontWeight={400}
                  >
                    {item.client} &bull; {item.frequency}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ textAlign: "right" }}>
                <Typography
                  fontSize="12px"
                  fontWeight={700}
                  color="text.primary"
                  mb={0.2}
                >
                  {item.time}
                </Typography>
                <Typography
                  fontSize="10px"
                  fontWeight={700}
                  color={item.status === "MISSED" ? "#EF4444" : "#10B981"}
                  sx={{ letterSpacing: "0.05em" }}
                >
                  {item.status}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <AddMedicationModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
      />

      <MedicationDetailDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        medication={selectedMedication}
      />
    </Box>
  );
}
