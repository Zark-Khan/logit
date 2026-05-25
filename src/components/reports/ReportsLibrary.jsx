import React, { useState } from "react";
import { Box, Typography, InputAdornment, TextField, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const CATEGORIES = [
  { id: "client", label: "Client", icon: PeopleAltOutlinedIcon, subtitle: "Care recipient focus and risk tracking" },
  { id: "staff", label: "Staff", icon: PersonOutlineOutlinedIcon },
  { id: "financial", label: "Financial", icon: AttachMoneyOutlinedIcon },
];

const REPORTS = [
  { id: "roster", title: "Roster", description: "View and manage client rosters and schedules." },
  { id: "diary", title: "Diary", description: "Daily logs and notes for client care." },
  { id: "respite", title: "Respite", description: "Track respite care hours and usage." },
  { id: "checklist", title: "Checklist", description: "Daily, weekly, and monthly care checklists." },
  { id: "medication", title: "Medication", description: "Medication administration records and schedules." },
  { id: "other", title: "Other", description: "Additional client-related reports and documents." },
];

export default function ReportsLibrary() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("client");

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 5 }}>
        <Box>
          <Typography fontSize="24px" fontWeight={700} color="text.primary" mb={0.5}>
            Reports Library
          </Typography>
          <Typography fontSize="14px" color="text.light" fontWeight={400}>
            Transform raw system data into decision-making information.
          </Typography>
        </Box>
        <Box>
          <TextField
            placeholder="Search reports..."
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#94A3B8", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              width: 300,
              "& .MuiOutlinedInput-root": {
                bgcolor: "#fff",
                borderRadius: "12px",
                "& fieldset": { borderColor: "#E2E8F0" },
                "&:hover fieldset": { borderColor: "#CBD5E1" },
                "&.Mui-focused fieldset": { borderColor: "#0EA5E9", borderWidth: "1.5px" },
              },
            }}
          />
        </Box>
      </Box>

      {/* Main Content Layout */}
      <Box sx={{ display: "flex", gap: 4 }}>
        
        {/* Sidebar */}
        <Box sx={{ width: 280, flexShrink: 0 }}>
          <Typography fontSize="10px" fontWeight={700} color="#94A3B8" sx={{ textTransform: "uppercase", letterSpacing: "0.05em", mb: 2, pl: 1 }}>
            CATEGORIES
          </Typography>
          
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              
              return (
                <Box
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 2,
                    borderRadius: "16px",
                    cursor: "pointer",
                    border: "1px solid",
                    borderColor: isActive ? "#8AC64240" : "transparent",
                    bgcolor: "#FFFFFF",
                    transition: "all 0.2s",
                    "&:hover": {
                      bgcolor: isActive ? "#F3F9EC" : "#F8FAFC",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: "10px",
                        bgcolor: isActive ? "#8AC6421C" : "#F1F5F9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon sx={{ color: isActive ? "#8AC642" : "#94A3B8", fontSize: 20 }} />
                    </Box>
                    <Box>
                      <Typography fontSize="14px" fontWeight={isActive ? 700 : 600} color={isActive ? "text.primary" : "#64748B"}>
                        {cat.label}
                      </Typography>
                      {cat.subtitle && isActive && (
                        <Typography fontSize="10px" color="text.light" sx={{ mt: 0.25, lineHeight: 1.3 }}>
                          {cat.subtitle}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  {isActive && <KeyboardArrowRightIcon sx={{ color: "#666666", fontSize: 20 }} />}
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Grid Content */}
        <Box sx={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3 }}>
          {REPORTS.map((report) => (
            <Box
              key={report.id}
              onClick={() => navigate(`/reports/${report.id}`)}
              sx={{
                bgcolor: "#8AC64233",
                border: "1px solid #8AC642",
                borderRadius: "24px",
                p: 3,
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(138, 198, 66, 0.2)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              {/* Card Header */}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "16px",
                    bgcolor: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <DescriptionOutlinedIcon sx={{ color: "#8AC642", fontSize: 21 }} />
                </Box>
                <IconButton size="small" sx={{ color: "#E2E8F0" }}>
                  <MoreHorizIcon sx={{ fontSize: 23 }} />
                </IconButton>
              </Box>

              {/* Card Body */}
              <Box sx={{ mb: 4, flex: 1 }}>
                <Typography fontSize="16px" fontWeight={700} color="text.primary">
                  {report.title}
                </Typography>
                <Typography fontSize="12px" color="text.light" fontWeight={400} sx={{ lineHeight: 1.5 }}>
                  {report.description}
                </Typography>
              </Box>

              {/* Card Footer */}
              <Box sx={{ borderTop: "1px solid #ffffff", pt: 2, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                <Typography fontSize="10px" fontWeight={700} color="#528910">
                  Generate Report <KeyboardArrowRightIcon sx={{ fontSize: 14, verticalAlign: "middle", ml: 0.25 }} />
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

      </Box>
    </Box>
  );
}
