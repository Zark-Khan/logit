import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

const DOCUMENTS = [
  {
    name: "Initial Care Assessment.pdf",
    category: "ASSESSMENT",
    date: "12 MAY 2024",
  },
  {
    name: "Signed Consent - GDPR.pdf",
    category: "LEGAL",
    date: "14 MAY 2024",
  },
  {
    name: "Local Authority Funding Approval.pdf",
    category: "FINANCE",
    date: "15 MAY 2024",
  },
  {
    name: "MAR Chart - May Cycle.pdf",
    category: "MEDICAL",
    date: "01 MAY 2024",
  },
];

const DocumentCard = ({ doc }) => (
  <Box
    sx={{
      bgcolor: "#fff",
      borderRadius: "16px",
      p: 2,
      mb: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.04)",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Box
        sx={{
          bgcolor: "#F0F9FF",
          p: 1,
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DescriptionIcon sx={{ color: "#0EA5E9" }} />
      </Box>
      <Box>
        <Typography fontWeight={700} fontSize="14px" color="text.primary">
          {doc.name}
        </Typography>
        <Typography
          fontWeight={700}
          fontSize="10px"
          color="#84919A"
          sx={{ mt: 0.2 }}
        >
          {doc.category} • {doc.date}
        </Typography>
      </Box>
    </Box>
    <IconButton size="small" sx={{ color: "text.light" }}>
      <FileDownloadOutlinedIcon />
    </IconButton>
  </Box>
);

export default function DocumentsTab({ client }) {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography fontWeight={700} fontSize="20px" color="text.primary">
          Documents
        </Typography>
        <Typography fontSize="14px" color="text.light" sx={{ mt: 0.5 }}>
          Manage information and care delivery for{" "}
          {client?.name || "Margaret Hall"}.
        </Typography>
      </Box>

      <Box>
        {DOCUMENTS.map((doc, index) => (
          <DocumentCard key={index} doc={doc} />
        ))}
      </Box>
    </Box>
  );
}
