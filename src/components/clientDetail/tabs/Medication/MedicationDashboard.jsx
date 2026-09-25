import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  ClickAwayListener,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckIcon from "@mui/icons-material/Check";
import {
  PillIcon,
  ClipboardCheckIcon,
  ClipboardPlusIcon,
  BookOpenIcon,
} from "../../../staffOverview/LineIcons";
import { MEDICINES, medicineLabel, firstNameOf } from "./medicationData";

const cardSx = {
  p: 3,
  borderRadius: "20px",
  border: "1px solid #E2E8F0",
  bgcolor: "#fff",
};

function ActionCard({ icon, title, description, linkLabel, onClick }) {
  return (
    <Paper
      elevation={0}
      onClick={onClick}
      sx={{
        ...cardSx,
        cursor: onClick ? "pointer" : "default",
        transition: "border-color 0.15s ease",
        "&:hover": onClick ? { borderColor: "primary.main" } : undefined,
      }}
    >
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: "8px",
          bgcolor: "#F8FAFC",
          border: "1px solid #EEF2F6",
          color: "#528910",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
        }}
      >
        {icon}
      </Box>
      <Typography fontWeight={700} fontSize="16px" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography fontSize="13px" color="text.light">
          {description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            flexShrink: 0,
            color: "primary.main",
            cursor: "pointer",
          }}
        >
          <Typography fontSize="13px" fontWeight={700}>
            {linkLabel}
          </Typography>
          <ArrowForwardIcon sx={{ fontSize: 16 }} />
        </Box>
      </Box>
    </Paper>
  );
}

export default function MedicationDashboard({
  setView,
  client,
  onSelectMedication,
}) {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const firstName = firstNameOf(client.name);

  const q = query.trim().toLowerCase();
  const results = MEDICINES.filter((m) =>
    medicineLabel(m).toLowerCase().includes(q),
  );

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight={700} color="text.primary">
          Medication
        </Typography>
        <Typography fontSize="14px" color="text.light" sx={{ mt: 0.3 }}>
          Manage information and care delivery for {client.name}.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        {/* Add Medication Card */}
        <Paper elevation={0} sx={cardSx}>
          <Typography fontWeight={700} fontSize="16px" sx={{ mb: 0.75 }}>
            Add medication
          </Typography>
          <Typography fontSize="13px" color="text.light" sx={{ mb: 2.5 }}>
            Search the NHS{" "}
            <Box component="span" sx={{ color: "primary.main" }}>
              medicines database
            </Box>{" "}
            (dm+d) below.
          </Typography>

          <ClickAwayListener onClickAway={() => setShowDropdown(false)}>
            <Box sx={{ position: "relative" }}>
              <TextField
                fullWidth
                placeholder="e.g. Paracetamol"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setShowDropdown(false);
                  if (e.key === "Enter" && results[0]) {
                    onSelectMedication(medicineLabel(results[0]));
                  }
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    bgcolor: showDropdown ? "#fff" : "#F8FAFC",
                    fontSize: "13px",
                    "& input": { py: 1.5 },
                    "& fieldset": { borderColor: "#E2E8F0" },
                    "&:hover fieldset": { borderColor: "#CBD5E1" },
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                      borderWidth: "1px",
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        sx={{
                          color: showDropdown ? "primary.main" : "#94A3B8",
                          fontSize: 20,
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />

              {showDropdown && (
                <Paper
                  sx={{
                    position: "absolute",
                    top: "calc(100% + 6px)",
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    borderRadius: "10px",
                    border: "1px solid #E2E8F0",
                    boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
                    overflow: "hidden",
                  }}
                >
                  {results.length === 0 ? (
                    <Typography
                      fontSize="13px"
                      color="text.light"
                      sx={{ px: 2, py: 1.75 }}
                    >
                      No medicines match "{query}".
                    </Typography>
                  ) : (
                    results.map((item, i) => (
                      <Box
                        key={medicineLabel(item)}
                        onClick={() => onSelectMedication(medicineLabel(item))}
                        sx={{
                          px: 2,
                          py: 1.5,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          cursor: "pointer",
                          bgcolor: i === 0 ? "#F0F9FF" : "transparent",
                          "&:hover": { bgcolor: "#F0F9FF" },
                          borderBottom:
                            i < results.length - 1
                              ? "1px solid #F1F5F9"
                              : "none",
                        }}
                      >
                        <Typography fontSize="13px" fontWeight={700} color="primary.main">
                          {item.name}{" "}
                          <Box
                            component="span"
                            sx={{ color: "text.primary", fontWeight: 400 }}
                          >
                            {item.desc}
                          </Box>
                        </Typography>
                        {i === 0 && (
                          <CheckIcon sx={{ fontSize: 16, color: "primary.main" }} />
                        )}
                      </Box>
                    ))
                  )}
                </Paper>
              )}
            </Box>
          </ClickAwayListener>
        </Paper>

        <ActionCard
          icon={<PillIcon size={18} />}
          title="Medication scheduling"
          description={`View and update ${firstName}'s medications.`}
          linkLabel="View schedule"
          onClick={() => setView("schedule")}
        />
        <ActionCard
          icon={<ClipboardCheckIcon size={18} />}
          title="Medication monitoring"
          description={`Monitor ${firstName}'s MAR chart in real-time.`}
          linkLabel="View MAR chart"
          onClick={() => setView("mar-chart")}
        />
        <ActionCard
          icon={<ClipboardPlusIcon size={18} />}
          title="Personal details"
          description={`Update ${firstName}'s medical information, including allergies.`}
          linkLabel="Update details"
          onClick={() => setView("medical-info")}
        />
        <ActionCard
          icon={<BookOpenIcon size={18} />}
          title="Help and support"
          description="Learn how to use medication manager."
          linkLabel="Go to help centre"
        />
      </Box>
    </Box>
  );
}
