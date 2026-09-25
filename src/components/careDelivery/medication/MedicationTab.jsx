import React, { useState } from "react";
import { Box, Typography, Button, TextField, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddMedicationModal from "./AddMedicationModal";
import MedicationDetailDrawer from "./MedicationDetailDrawer";
import { PillIcon } from "../../staffOverview/LineIcons";
import { INITIAL_MEDICATIONS, STATUS_FILTERS } from "./medicationData";

export default function MedicationTab() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [medications, setMedications] = useState(INITIAL_MEDICATIONS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const query = search.trim().toLowerCase();
  const visible = medications.filter(
    (m) =>
      (statusFilter === "All Status" ||
        m.status === statusFilter.toUpperCase()) &&
      (!query ||
        `${m.name} ${m.dose}`.toLowerCase().includes(query) ||
        m.client.toLowerCase().includes(query)),
  );

  const handleAdd = (med) => {
    setMedications((prev) => [
      ...prev,
      { ...med, id: Math.max(0, ...prev.map((m) => m.id)) + 1 },
    ]);
    setAddModalOpen(false);
  };

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
          <Box sx={{ color: "#F43F5E", display: "flex" }}>
            <PillIcon size={18} />
          </Box>
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          inputProps={{ "aria-label": "Search by medicine or client" }}
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
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            inputProps={{ "aria-label": "Filter by status" }}
            sx={{
              width: 140,
              "& .MuiOutlinedInput-root": {
                bgcolor: "#fff",
                borderRadius: "12px",
                height: 37,
                "& fieldset": { border: "none" },
              },
              "& .MuiSelect-select": {
                color:
                  statusFilter === "Missed"
                    ? "#EF4444"
                    : statusFilter === "On Track"
                      ? "#10B981"
                      : "text.primary",
                fontWeight: 700,
                fontSize: "14px",
              },
            }}
          >
            {STATUS_FILTERS.map((s) => (
              <MenuItem key={s} value={s} sx={{ fontSize: "14px" }}>
                {s}
              </MenuItem>
            ))}
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
              background: "linear-gradient(135deg, #0EA5E9 0%, #8AC642 100%)",
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
            {statusFilter === "All Status"
              ? "Showing all clients"
              : `Showing ${statusFilter.toLowerCase()} only`}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {visible.length === 0 && (
            <Typography
              fontSize="14px"
              color="text.secondary"
              sx={{ px: 3, pb: 3 }}
            >
              No medications match your search and filter.
            </Typography>
          )}
          {visible.map((item) => (
            <Box
              key={item.id}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOpenDrawer(item);
                }
              }}
              sx={{
                "&:hover": { bgcolor: "rgba(255,255,255,0.45)" },
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
                  <Box sx={{ color: "#F43F5E", display: "flex" }}>
                    <PillIcon size={18} />
                  </Box>
                </Box>
                <Box>
                  <Typography
                    fontSize="14px"
                    fontWeight={700}
                    color="text.primary"
                    mb={0.2}
                  >
                    {item.name} {item.dose}
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
        onAdd={handleAdd}
      />

      <MedicationDetailDrawer
        key={selectedMedication?.id ?? "none"}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        medication={selectedMedication}
      />
    </Box>
  );
}
