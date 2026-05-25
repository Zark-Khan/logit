import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";

// Dummy data for the detail page based on the selected category
const CATEGORY_DATA = {
  roster: {
    title: "Roster Reports",
    description:
      "Select a specific report type from the options below to view detailed analytics and records.",
    category: "CLIENT",
    reports: [
      {
        id: "client_roster",
        title: "Client Roster",
        description:
          "Comprehensive view of client care rosters an assigned staff.",
      },
      {
        id: "client_schedule",
        title: "Client Schedule",
        description:
          "Detailed daily and weekly schedules for individual clients.",
      },
      {
        id: "unassigned_appts",
        title: "Unassigned Appointments",
        description:
          "Track and manage client appointments lacking assigned carers.",
      },
    ],
  },
  diary: {
    title: "Diary Reports",
    description:
      "Select a specific report type from the options below to view detailed analytics and records.",
    category: "CLIENT",
    reports: [
      {
        id: "client_diary",
        title: "Client Diary",
        description:
          "Detailed daily logs, notes, and observations for individual clients.",
      },
    ],
  },
  // Adding a fallback for others just to prevent errors
  default: {
    title: "Category Reports",
    description: "Select a specific report type from the options below.",
    category: "GENERAL",
    reports: [
      {
        id: "general_1",
        title: "General Report 1",
        description: "A comprehensive general report.",
      },
    ],
  },
};

export default function ReportCategoryDetail() {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const data = CATEGORY_DATA[categoryId] || CATEGORY_DATA.default;

  return (
    <Box>
      {/* Back Button */}
      <Box
        onClick={() => navigate("/reports")}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          mb: 3,
          cursor: "pointer",
          color: "text.primary",
          "&:hover": { color: "#8AC642" },
          transition: "color 0.2s",
        }}
      >
        <KeyboardBackspaceIcon sx={{ fontSize: 18, color: "#475569" }} />
        <Typography fontSize="14px" fontWeight={700} color={"#475569"}>
          Back to Library
        </Typography>
      </Box>

      {/* Hero Banner */}
      <Box
        sx={{
          bgcolor: "#8AC64233",
          border: "1px solid #8AC642",
          borderRadius: "24px",
          p: 4,
          mb: 4,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Box
            sx={{
              bgcolor: "#fff",
              p: 0.5,
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              gap: 0.75,
            }}
          >
            <Typography
              fontSize="10px"
              fontWeight={700}
              color="#528910"
              letterSpacing="0.05em"
            >
              {data.category}
            </Typography>
          </Box>
          <Typography sx={{ color: "#475569" }}>•</Typography>
          <Typography
            fontSize="10px"
            fontWeight={700}
            color="#475569"
            letterSpacing="0.05em"
          >
            REPORT CATEGORY
          </Typography>
        </Box>
        <Typography
          fontSize="30px"
          fontWeight={700}
          color="text.primary"
          mb={1}
        >
          {data.title}
        </Typography>
        <Typography fontSize="16px" color="text.light" fontWeight={400}>
          {data.description}
        </Typography>
      </Box>

      {/* Reports Grid */}
      <Box
        sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3 }}
      >
        {data.reports.map((report) => (
          <Box
            key={report.id}
            onClick={() => navigate(`/reports/${categoryId}/${report.id}`)}
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "16px",
                  bgcolor: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <DescriptionOutlinedIcon
                  sx={{ color: "#8AC642", fontSize: 22 }}
                />
              </Box>
              <IconButton size="small" sx={{ color: "#8AC642"}}>
                <MoreHorizIcon sx={{ fontSize: 23 }} />
              </IconButton>
            </Box>

            {/* Card Body */}
            <Box sx={{ mb: 4, flex: 1 }}>
              <Typography
                fontSize="18px"
                fontWeight={700}
                color="text.primary"
                mb={1}
              >
                {report.title}
              </Typography>
              <Typography
                fontSize="14px"
                color="text.light"
                fontWeight={400}
                sx={{ lineHeight: 1.5 }}
              >
                {report.description}
              </Typography>
            </Box>

            {/* Card Footer */}
            <Box
              sx={{
                borderTop: "1px solid #ffffff",
                pt: 2,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Typography fontSize="12px" fontWeight={700} color="#528910">
                Open Report{" "}
                <KeyboardArrowRightIcon
                  sx={{ fontSize: 14, verticalAlign: "middle", ml: 0.25 }}
                />
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
