import React, { useState } from "react";
import {
  Dialog,
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const CATEGORIES = [
  { label: "Revenue & Billing", count: 12 },
  { label: "Payroll & Staff", count: 8 },
  { label: "Compliance & Audit", count: 5 },
  { label: "Client Summaries", count: 15 },
];

const REPORTS = [
  {
    title: "Monthly Revenue Summary",
    desc: "Detailed breakdown of income by service type",
    meta: "PDF, XLSX  •  MAR 2024",
  },
  {
    title: "Outstanding Invoices Report",
    desc: "List of all unpaid invoices with aging data",
    meta: "XLSX  •  CURRENT",
  },
  {
    title: "Staff Payroll Breakdown",
    desc: "Individual staff earnings and hours summary",
    meta: "PDF, CSV  •  MAR 2024",
  },
  {
    title: "Client Funding Audit",
    desc: "Summary of funding sources and balances",
    meta: "PDF, XLSX  •  CURRENT",
  },
];

const btnBase = {
  borderRadius: "16px",
  px: 3.5,
  py: 1.25,
  textTransform: "none",
  fontWeight: 700,
  fontSize: "14px",
  boxShadow: "none",
};

export default function ExportReportsModal({ open, onClose }) {
  const [exported, setExported] = useState(false);
  const [selectedReport, setSelectedReport] = useState("Monthly Revenue Summary");

  const handleClose = () => {
    setExported(false);
    setSelectedReport("Monthly Revenue Summary");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: exported ? 448 : 896,
          maxHeight: "85vh",
          borderRadius: "24px",
          boxShadow: "0 24px 48px -12px rgba(16,24,40,0.18)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {exported ? (
        /* ── Success ── */
        <Box sx={{ p: 4, textAlign: "center", bgcolor: "#fff" }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              bgcolor: "#D1FAE5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2.5,
            }}
          >
            <CheckCircleIcon sx={{ color: "#059669", fontSize: 36 }} />
          </Box>
          <Typography fontSize="24px" fontWeight={700} color="text.primary" mb={1}>
            Report Exported!
          </Typography>
          <Typography fontSize="16px" color="text.light" fontWeight={500} sx={{ mb: 4, maxWidth: 320, mx: "auto", lineHeight: 1.6 }}>
            The finance summary report has been successfully exported to your downloads.
          </Typography>
          <Button
            onClick={handleClose}
            fullWidth
            sx={{
              ...btnBase,
              bgcolor: "#0EA5E9",
              color: "#fff",
              "&:hover": { bgcolor: "#0284C7" },
              py:2
            }}
          >
            Go to Downloads
          </Button>
        </Box>
      ) : (
        <>
          {/* ── Header ── */}
          <Box sx={{ px: 3, pt: 3, pb: 2.5, bgcolor: "#fff", borderBottom: "1px solid #F1F5F9" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "16px",
                    bgcolor: "#FAF5FF", // light purple
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #F3E8FF",
                  }}
                >
                  <FileDownloadOutlinedIcon sx={{ color: "#A855F7", fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography fontSize="20px" fontWeight={700} color="text.primary">
                    Export Reports
                  </Typography>
                  <Typography fontSize="14px" color="text.light" fontWeight={400}>
                    Download financial summaries and detailed data exports
                  </Typography>
                </Box>
              </Box>
              <IconButton size="small" onClick={handleClose} sx={{ color: "text.grey" }}>
                <CloseIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Box>
          </Box>

          {/* ── Body ── */}
          <Box sx={{ display: "flex", flex: 1, minHeight: 0, bgcolor: "#fff" }}>
            
            {/* Left Sidebar */}
            <Box
              sx={{
                width: 320,
                borderRight: "1px solid #F1F5F9",
                display: "flex",
                flexDirection: "column",
                p: 3,
              }}
            >
              <Typography
                fontSize="12px"
                fontWeight={700}
                color="text.light"
                sx={{ textTransform: "uppercase", letterSpacing: "0.06em", mb: 2 }}
              >
                Categories
              </Typography>
              
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {CATEGORIES.map((cat, i) => (
                  <Box
                    key={cat.label}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      p: 1.5,
                      borderRadius: "12px",
                      cursor: "pointer",
                      "&:hover": { bgcolor: "#F8FAFC" },
                    }}
                  >
                    <Typography fontSize="14px" fontWeight={700} color="text.primary">
                      {cat.label}
                    </Typography>
                    <Box
                      sx={{
                        px: 1.25,
                        py: 0.25,
                        color: "text.light",
                        fontSize: "10px",
                        fontWeight: 700,
                      }}
                    >
                      {cat.count}
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Quick Filters */}
              <Box sx={{ p: 1.5, mt: 2 }}>
                <Typography fontSize="12px" fontWeight={700} color="text.primary" mb={2}>
                  Quick Filters
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5, color: "text.light" }}>
                  <CalendarTodayOutlinedIcon sx={{ fontSize: 14 }} />
                  <Typography fontSize="12px" fontWeight={400}>Last 30 Days</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, color: "text.light" }}>
                  <FilterAltOutlinedIcon sx={{ fontSize: 14 }} />
                  <Typography fontSize="12px" fontWeight={400}>All Branches</Typography>
                </Box>
              </Box>
            </Box>

            {/* Right Content */}
            <Box sx={{ flex: 1, p: 4, overflowY: "auto", display: "flex", flexDirection: "column" }}>
              
              {/* Search Bar */}
              <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
                <TextField
                  fullWidth
                  placeholder="Search reports..."
                  variant="outlined"
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      bgcolor: "#F8FAFC",
                      "& fieldset": { borderColor: "#F8FAFC" },
                      "&:hover fieldset": { borderColor: "#F8FAFC" },
                      "&.Mui-focused fieldset": { borderColor: "#F8FAFC" },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "text.light", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  // variant="outlined"
                  startIcon={<FilterListIcon />}
                  sx={{
                    color: "text.primary",
                    textTransform: "none",
                    fontWeight: 700,
                    px: 3,
                    fontSize:"12px"
                  }}
                >
                  Filters
                </Button>
              </Box>

              {/* Reports List */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {REPORTS.map((rep) => {
                  const isSelected = selectedReport === rep.title;
                  return (
                    <Box
                      key={rep.title}
                      onClick={() => setSelectedReport(rep.title)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 2.5,
                        borderRadius: "16px",
                        border: isSelected ? "1px solid" : "none",
                        borderColor: isSelected ? "#E9D5FF" : "none",
                        bgcolor: isSelected ? "#FAF5FF" : "transparent",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        "&:hover": { bgcolor: isSelected ? "none" : "#FAF5FF" },
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: isSelected ? "12px": "none",
                            bgcolor: isSelected ? "#A855F7" : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <DescriptionOutlinedIcon sx={{ color: isSelected ? "#fff" : "#64748B", fontSize: 24 }} />
                        </Box>
                        <Box>
                          <Typography fontSize="14px" fontWeight={700} color="text.primary" mb={0.25}>
                            {rep.title}
                          </Typography>
                          <Typography fontSize="12px" color="text.light" fontWeight={400} mb={0.75}>
                            {rep.desc}
                          </Typography>
                          <Typography fontSize="10px" fontWeight={700} color="text.grey" sx={{ letterSpacing: "0.05em" }}>
                            {rep.meta}
                          </Typography>
                        </Box>
                      </Box>
                      <KeyboardArrowRightIcon sx={{ color: isSelected ? "#A855F7" : "#CBD5E1", fontSize: 20 }} />
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>

          {/* ── Footer ── */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 3,
              bgcolor: "#fff",
              borderTop: "1px solid #F1F5F9",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MoreVertIcon sx={{ color: "#94A3B8", fontSize: 18 }} />
              </Box>
              <Typography fontSize="12px" color="text.light" fontWeight={500}>
                Select a report to configure export settings
              </Typography>
            </Box>

            <Button
              onClick={() => setExported(true)}
              startIcon={<FileDownloadOutlinedIcon />}
              sx={{
                ...btnBase,
                background: "linear-gradient(135deg,#0EA5E9,#38BDF8)",
                color: "#fff",
                "&:hover": { opacity: 0.9 },
              }}
            >
              Export Report
            </Button>
          </Box>
        </>
      )}
    </Dialog>
  );
}
