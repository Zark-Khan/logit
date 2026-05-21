import React from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  ClickAwayListener,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PersonIcon from "@mui/icons-material/Person";
import HelpIcon from "@mui/icons-material/Help";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckIcon from "@mui/icons-material/Check";
import HistoryIcon from "@mui/icons-material/History";

export default function MedicationDashboard({ setView, client }) {
  const [showDropdown, setShowDropdown] = React.useState(false);

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
          <Typography fontWeight={700} fontSize="16px" sx={{ mb: 1 }}>
            Add medication
          </Typography>
          <Typography fontSize="14px" color="text.light" sx={{ mb: 3 }}>
            Search the NHS{" "}
            <Box
              component="span"
              sx={{ color: "primary.main", fontWeight: 600 }}
            >
              medicines database
            </Box>{" "}
            (dm+d) below.
          </Typography>

          <ClickAwayListener onClickAway={() => setShowDropdown(false)}>
            <Box sx={{ position: "relative" }}>
              <TextField
                fullWidth
                placeholder="e.g. Paracetamol"
                size="small"
                onFocus={() => setShowDropdown(true)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    borderColor: showDropdown ? "primary.main" : "#E2E8F0",
                    borderWidth: 1,
                    bgcolor: "#fff",
                    fontSize: "14px",
                    "& fieldset": {
                      borderColor: showDropdown
                        ? "primary.main !important"
                        : "#E2E8F0 !important",
                    },
                    "&:hover fieldset": {
                      borderColor: showDropdown
                        ? "primary.main !important"
                        : "#CBD5E1 !important",
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        sx={{
                          color: showDropdown
                            ? "primary.main"
                            : "text.secondary",
                          fontSize: 20,
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Search Dropdown Mockup */}
              {showDropdown && (
                <Paper
                  sx={{
                    position: "absolute",
                    top: "110%",
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    borderRadius: "12px",
                    border: "1px solid #E2E8F0",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    overflow: "hidden",
                  }}
                >
                  {[
                    { name: "Paracetamol", desc: "1g tablets", active: true },
                    { name: "Paracetamol", desc: "400mg tablets" },
                    { name: "Paracetamol", desc: "400mg capsules" },
                    { name: "Paracetamol", desc: "Plus tablets" },
                  ].map((item, i) => (
                    <Box
                      key={i}
                      onClick={() => setView("add-med")}
                      sx={{
                        p: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer",
                        "&:hover": { bgcolor: "#F0F9FF" },
                        borderBottom: i < 3 ? "1px solid #F1F5F9" : "none",
                      }}
                    >
                      <Typography
                        fontSize="14px"
                        fontWeight={700}
                        color="primary.main"
                      >
                        {item.name}{" "}
                        <Box
                          component="span"
                          sx={{ color: "text.primary", fontWeight: 400 }}
                        >
                          {item.desc}
                        </Box>
                      </Typography>
                      {item.active && (
                        <CheckIcon
                          sx={{ fontSize: 18, color: "primary.main" }}
                        />
                      )}
                    </Box>
                  ))}
                </Paper>
              )}
            </Box>
          </ClickAwayListener>
        </Paper>

        {/* Medication Schedule */}
        <Paper
          elevation={0}
          sx={{
            ...cardSx,
            cursor: "pointer",
            "&:hover": { borderColor: "primary.main" },
          }}
          onClick={() => setView("schedule")}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "8px",
              bgcolor: "rgba(138, 198, 66, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <HistoryIcon sx={{ color: "#8AC642", fontSize: 20 }} />
          </Box>
          <Typography fontWeight={700} fontSize="16px" sx={{ mb: 1 }}>
            Medication scheduling
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography fontSize="13px" color="text.light">
              View and update {client.name}'s medications.
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "primary.main",
              }}
            >
              <Typography fontSize="13px" fontWeight={700}>
                View schedule
              </Typography>
              <ArrowForwardIcon sx={{ fontSize: 16 }} />
            </Box>
          </Box>
        </Paper>

        {/* Medication Monitoring */}
        <Paper
          elevation={0}
          sx={{
            ...cardSx,
            cursor: "pointer",
            "&:hover": { borderColor: "primary.main" },
          }}
          onClick={() => setView("mar-chart")}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "8px",
              bgcolor: "rgba(138, 198, 66, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <AssignmentTurnedInIcon sx={{ color: "#8AC642", fontSize: 20 }} />
          </Box>
          <Typography fontWeight={700} fontSize="16px" sx={{ mb: 1 }}>
            Medication monitoring
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography fontSize="13px" color="text.light">
              Monitor {client.name}'s MAR chart in real-time.
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "primary.main",
              }}
            >
              <Typography fontSize="13px" fontWeight={700}>
                View MAR chart
              </Typography>
              <ArrowForwardIcon sx={{ fontSize: 16 }} />
            </Box>
          </Box>
        </Paper>

        {/* Personal Details */}
        <Paper
          elevation={0}
          sx={{
            ...cardSx,
            cursor: "pointer",
            "&:hover": { borderColor: "primary.main" },
          }}
          onClick={() => setView("medical-info")}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "8px",
              bgcolor: "rgba(138, 198, 66, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <PersonIcon sx={{ color: "#8AC642", fontSize: 20 }} />
          </Box>
          <Typography fontWeight={700} fontSize="16px" sx={{ mb: 1 }}>
            Personal details
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography fontSize="14px" color="text.light">
              Update Margaret's medical information, including allergies.
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "primary.main",
              }}
            >
              <Typography fontSize="14px" fontWeight={700}>
                Update details
              </Typography>
              <ArrowForwardIcon sx={{ fontSize: 16 }} />
            </Box>
          </Box>
        </Paper>

        {/* Help and Support */}
        <Paper elevation={0} sx={cardSx}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "8px",
              bgcolor: "rgba(138, 198, 66, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <HelpIcon sx={{ color: "#8AC642", fontSize: 20 }} />
          </Box>
          <Typography fontWeight={700} fontSize="16px" sx={{ mb: 1 }}>
            Help and support
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography fontSize="14px" color="text.light">
              Learn how to use medication manager.
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "primary.main",
                cursor: "pointer",
              }}
            >
              <Typography fontSize="14px" fontWeight={700}>
                Go to help centre
              </Typography>
              <ArrowForwardIcon sx={{ fontSize: 16 }} />
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

const cardSx = {
  p: 3.5,
  borderRadius: "24px",
  border: "1px solid #E2E8F0",
  bgcolor: "#fff",
};
