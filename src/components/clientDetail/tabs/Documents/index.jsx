import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { FileIcon, DownloadIcon } from "../../../staffOverview/LineIcons";

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
      borderRadius: "12px",
      border: "1px solid #F1F5F9",
      px: 2,
      py: 2.25,
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
          width: 36,
          height: 36,
          flexShrink: 0,
          bgcolor: "#F0F9FF",
          color: "#0EA5E9",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FileIcon size={18} />
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
    <IconButton
      size="small"
      aria-label={`Download ${doc.name}`}
      sx={{ color: "#64748B", mr: 1, "&:hover": { color: "#0EA5E9" } }}
    >
      <DownloadIcon size={18} />
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
