import React from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

export default function MARChart({ onBack }) {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={700} color="text.primary">
            MAR Chart
          </Typography>
          <Typography fontSize="14px" color="text.light" sx={{ mt: 0.3 }}>
            Medication Administration Record for Margaret Hall.
          </Typography>
        </Box>
        <Box
          onClick={onBack}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "primary.main",
            cursor: "pointer",
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 16 }} />
          <Typography fontSize="14px" fontWeight={700}>
            Back to Medication
          </Typography>
        </Box>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: "24px",
          border: "1px solid #CBD5E1",
          bgcolor: "#fff",
        }}
      >
        {/* Header with controls */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography fontWeight={800} fontSize="20px">
            Margaret's MAR chart
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={
                <FileUploadOutlinedIcon sx={{ transform: "rotate(180deg)" }} />
              }
              sx={{
                textTransform: "none",
                borderRadius: "10px",
                borderColor: "#EF4444",
                color: "#EF4444",
                fontWeight: 700,
                px: 2,
                fontSize: "12px",
                "&:hover": {
                  borderColor: "#DC2626",
                  bgcolor: "rgba(239, 68, 68, 0.05)",
                },
              }}
            >
              Download PDF
            </Button>
            <Select
              value="monthly"
              size="small"
              sx={{
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: 600,
                minWidth: 120,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#E2E8F0",
                },
              }}
            >
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
            </Select>
          </Box>
        </Box>

        {/* MAR Chart Grid */}
        <Box
          sx={{
            width: "100%",
            overflowX: "auto",
            border: "1px solid #F1F5F9",
            borderRadius: "16px",
          }}
        >
          <Box sx={{ minWidth: 1000 }}>
            {/* Table Header */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "250px 80px 80px repeat(13, 1fr)",
                borderBottom: "1px solid #F1F5F9",
                bgcolor: "#F8FAFC",
              }}
            >
              {[
                "MEDICATION",
                "DOSE #",
                "TIME",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
                "13",
              ].map((h) => (
                <Typography
                  key={h}
                  fontSize="10px"
                  fontWeight={800}
                  color="text.secondary"
                  sx={{ p: 1.5, textAlign: "center" }}
                >
                  {h}
                </Typography>
              ))}
            </Box>

            {/* Row */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "250px 80px 80px repeat(13, 1fr)",
              }}
            >
              <Box
                sx={{
                  p: 2,
                  borderRight: "1px solid #F1F5F9",
                  borderBottom: "1px solid #F1F5F9",
                }}
              >
                <Typography
                  fontSize="14px"
                  fontWeight={700}
                  color="primary.main"
                >
                  Paracetamol 500mg tablets
                </Typography>
                <Typography
                  fontSize="10px"
                  fontWeight={700}
                  color="text.secondary"
                  sx={{ mt: 0.5, textTransform: "uppercase" }}
                >
                  SCHEDULED / 2 ORAL TABLETS
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRight: "1px solid #F1F5F9",
                  borderBottom: "1px solid #F1F5F9",
                }}
              >
                <Typography fontSize="14px" fontWeight={700}>
                  1
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRight: "1px solid #F1F5F9",
                  borderBottom: "1px solid #F1F5F9",
                }}
              >
                <Typography fontSize="14px" fontWeight={700}>
                  08:00
                </Typography>
              </Box>
              {Array.from({ length: 13 }).map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    borderRight: i < 12 ? "1px solid #F1F5F9" : "none",
                    borderBottom: "1px solid #F1F5F9",
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
