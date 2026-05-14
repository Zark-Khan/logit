import React from "react";
import { Box, Typography, Button, Chip } from "@mui/material";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";

const DocCard = ({ title, expires, badge, badgeBg, badgeColor, iconColor }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      bgcolor: "#fff",
      borderRadius: "12px",
      px: { xs: 2.5, sm: 3 },
      py: 2,
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
      <InsertDriveFileOutlinedIcon sx={{ color: iconColor || "#94A3B8", fontSize: "22px" }} />
      <Box>
        <Typography fontSize="14px" fontWeight={700} color="text.primary">
          {title}
        </Typography>
        <Typography fontSize="10px" color="text.light" mt={0.1}>
          {expires}
        </Typography>
      </Box>
    </Box>
    <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
      <Chip
        label={badge}
        size="small"
        sx={{
          bgcolor: badgeBg,
          color: badgeColor,
          fontWeight: 700,
          fontSize: "9px",
          height: 22,
          borderRadius: "6px",
          px: 0.5,
        }}
      />
      <Button
        sx={{
          color: "#0EA5E9",
          fontWeight: 700,
          fontSize: "10px",
          textTransform: "uppercase",
          minWidth: "auto",
          letterSpacing: "0.02em",
          p: 0,
          "&:hover": { bgcolor: "transparent", color: "#0284c7" },
        }}
      >
        Upload New
      </Button>
    </Box>
  </Box>
);

export default function ComplianceDocumentsTab({ staff }) {
  const documents = [
    {
      title: "Passport / Right to Work",
      expires: "Expires: 12 Jun 2028",
      badge: "VALID",
      badgeBg: "#DCFCE7",
      badgeColor: "#8AC642",
    },
    {
      title: "Enhanced DBS Check",
      expires: "Expires: 05 Mar 2026",
      badge: "VALID",
      badgeBg: "#DCFCE7",
      badgeColor: "#8AC642",
      iconColor: "#0EA5E9",
    },
    {
      title: "Professional Liability Insurance",
      expires: "Expires: Needs Update",
      badge: "PENDING",
      badgeBg: "#FFEDD5",
      badgeColor: "#F97316",
    },
    {
      title: "Medical Fitness Certificate",
      expires: "Expires: N/A",
      badge: "VALID",
      badgeBg: "#DCFCE7",
      badgeColor: "#8AC642",
    },
    {
      title: "Proof of Address",
      expires: "Expires: Expired 2 months ago",
      badge: "EXPIRED",
      badgeBg: "#FEE2E2",
      badgeColor: "#EF4444",
    },
  ];

  return (
    <Box>
      <Typography fontSize="20px" fontWeight={700} color="text.primary" mb={0.4}>
        Compliance & Documents
      </Typography>
      <Typography fontSize="14px" color="text.light" mb={3.5}>
        Detailed information and settings for {staff.name}'s compliance & documents.
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {documents.map((doc, idx) => (
          <DocCard key={idx} {...doc} />
        ))}
      </Box>
    </Box>
  );
}
