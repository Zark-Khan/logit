import React, { useRef, useState } from "react";
import { Box, Typography, Button, Chip, IconButton } from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

const STATUS_STYLES = {
  VALID: { bgcolor: "#DCFCE7", color: "#8AC642" },
  PENDING: { bgcolor: "#FFEDD5", color: "#F97316" },
  EXPIRED: { bgcolor: "#FEE2E2", color: "#EF4444" },
};

const INITIAL_DOCUMENTS = [
  {
    id: 1,
    title: "Passport / Right to Work",
    expires: "Expires: 12 Jun 2028",
    status: "VALID",
  },
  {
    id: 2,
    title: "Enhanced DBS Check",
    expires: "Expires: 05 Mar 2026",
    status: "VALID",
    iconColor: "#0EA5E9",
  },
  {
    id: 3,
    title: "Professional Liability Insurance",
    expires: "Expires: Needs Update",
    status: "PENDING",
  },
  {
    id: 4,
    title: "Medical Fitness Certificate",
    expires: "Expires: N/A",
    status: "VALID",
  },
  {
    id: 5,
    title: "Proof of Address",
    expires: "Expires: Expired 2 months ago",
    status: "EXPIRED",
  },
];

const ActionIconButton = ({ label, color, bgcolor, border, onClick, children }) => (
  <IconButton
    size="small"
    aria-label={label}
    onClick={onClick}
    sx={{
      width: 24,
      height: 24,
      borderRadius: "6px",
      color,
      bgcolor,
      border,
      "&:hover": { bgcolor, filter: "brightness(0.96)" },
    }}
  >
    {children}
  </IconButton>
);

const DocCard = ({ title, expires, status, iconColor, onUploadNew, onEdit, onDelete }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 2,
      bgcolor: "#fff",
      borderRadius: "12px",
      px: { xs: 2, sm: 2.5 },
      py: 1.75,
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 2.5, minWidth: 0 }}>
      <DescriptionOutlinedIcon
        sx={{ color: iconColor || "#94A3B8", fontSize: "18px", flexShrink: 0 }}
      />
      <Box sx={{ minWidth: 0 }}>
        <Typography fontSize="14px" fontWeight={700} color="text.primary">
          {title}
        </Typography>
        <Typography fontSize="10px" color="text.light" mt={0.1}>
          {expires}
        </Typography>
      </Box>
    </Box>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexShrink: 0 }}>
      <Chip
        label={status}
        size="small"
        sx={{
          ...STATUS_STYLES[status],
          fontWeight: 700,
          fontSize: "9px",
          height: 20,
          borderRadius: "6px",
          px: 0.5,
        }}
      />
      <Button
        onClick={onUploadNew}
        sx={{
          color: "#0EA5E9",
          fontWeight: 700,
          fontSize: "10px",
          textTransform: "uppercase",
          minWidth: "auto",
          letterSpacing: "0.02em",
          p: 0,
          mr: 1,
          "&:hover": { bgcolor: "transparent", color: "#0284c7" },
        }}
      >
        Upload New
      </Button>
      <Box sx={{ display: "flex", gap: 0.75 }}>
        <ActionIconButton
          label={`Edit ${title}`}
          onClick={onEdit}
          color="#3B82F6"
          bgcolor="#EFF6FF"
          border="1px solid #BFDBFE"
        >
          <EditOutlinedIcon sx={{ fontSize: 14 }} />
        </ActionIconButton>
        <ActionIconButton
          label={`Delete ${title}`}
          onClick={onDelete}
          color="#EF4444"
          bgcolor="#FEF2F2"
          border="1px solid #FECACA"
        >
          <DeleteOutlineRoundedIcon sx={{ fontSize: 15 }} />
        </ActionIconButton>
      </Box>
    </Box>
  </Box>
);

export default function ComplianceDocumentsTab({ staff }) {
  const fileInputRef = useRef(null);
  // null = add a new document; otherwise the id of the row being replaced
  const uploadTargetRef = useRef(null);
  const [documents, setDocuments] = useState(INITIAL_DOCUMENTS);

  const openFilePicker = (targetId = null) => {
    uploadTargetRef.current = targetId;
    fileInputRef.current?.click();
  };

  // No backend: a picked file becomes a PENDING document awaiting review
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file
    if (!file) return;

    const targetId = uploadTargetRef.current;
    const pending = { expires: "Expires: Awaiting review", status: "PENDING" };
    if (targetId == null) {
      const title = file.name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ");
      setDocuments((prev) => [...prev, { id: Date.now(), title, ...pending }]);
    } else {
      setDocuments((prev) =>
        prev.map((d) => (d.id === targetId ? { ...d, ...pending } : d)),
      );
    }
  };

  const deleteDocument = (id) =>
    setDocuments((prev) => prev.filter((d) => d.id !== id));

  return (
    <Box>
      <input
        ref={fileInputRef}
        type="file"
        hidden
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        onChange={handleFileSelect}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 2,
          mb: 3.5,
        }}
      >
        <Box>
          <Typography
            fontSize="20px"
            fontWeight={700}
            color="text.primary"
            mb={0.4}
          >
            Compliance & Documents
          </Typography>
          <Typography fontSize="14px" color="text.light">
            Detailed information and settings for {staff.name}'s compliance &
            documents.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<ArrowUpwardRoundedIcon sx={{ fontSize: 16 }} />}
          onClick={() => openFilePicker()}
          sx={{
            flexShrink: 0,
            bgcolor: "#0EA5E9",
            color: "#fff",
            textTransform: "none",
            fontSize: "12px",
            fontWeight: 600,
            borderRadius: "8px",
            px: 2,
            py: 0.9,
            boxShadow: "none",
            "&:hover": { bgcolor: "#0284c7", boxShadow: "none" },
          }}
        >
          Upload Document
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {documents.map((doc) => (
          <DocCard
            key={doc.id}
            {...doc}
            onUploadNew={() => openFilePicker(doc.id)}
            onDelete={() => deleteDocument(doc.id)}
          />
        ))}
      </Box>
    </Box>
  );
}
