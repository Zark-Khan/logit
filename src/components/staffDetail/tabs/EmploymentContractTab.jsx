import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  IconButton,
  LinearProgress,
} from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DetailCard from "./DetailCard";

const formatSize = (bytes) =>
  bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;

function UploadRow({ upload, onRemove }) {
  const done = upload.progress >= 100;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        p: 1.5,
        bgcolor: "#F0F7FF",
        border: "1px solid #93C5FD",
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          width: 28,
          height: 28,
          flexShrink: 0,
          alignSelf: "flex-start",
          borderRadius: "6px",
          bgcolor: "#DBEAFE",
          color: "#3B82F6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ArrowUpwardRoundedIcon sx={{ fontSize: 16 }} />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          fontSize="13px"
          fontWeight={500}
          color="text.primary"
          noWrap
        >
          {upload.name}
        </Typography>
        <Typography fontSize="10px" color="text.light" mt={0.2} mb={0.8}>
          {formatSize(upload.size)} •{" "}
          {done ? "Upload complete" : `Uploading... ${upload.progress}%`}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={upload.progress}
          sx={{
            width: "70%",
            height: 4,
            borderRadius: 2,
            bgcolor: "#E2E8F0",
            "& .MuiLinearProgress-bar": {
              borderRadius: 2,
              bgcolor: done ? "#22C55E" : "#3B82F6",
            },
          }}
        />
      </Box>
      <IconButton
        size="small"
        onClick={onRemove}
        aria-label={done ? "Remove file" : "Cancel upload"}
        sx={{
          width: 24,
          height: 24,
          bgcolor: "#fff",
          border: "1px solid #E2E8F0",
          color: "#94A3B8",
          "&:hover": { bgcolor: "#F8FAFC", color: "text.primary" },
        }}
      >
        <CloseRoundedIcon sx={{ fontSize: 14 }} />
      </IconButton>
    </Box>
  );
}

export default function EmploymentContractTab({ staff }) {
  const fileInputRef = useRef(null);
  const timersRef = useRef({});
  const [uploads, setUploads] = useState([]);

  // Clear any simulated uploads still running when the tab unmounts
  useEffect(() => {
    const timers = timersRef.current;
    return () => Object.values(timers).forEach(clearInterval);
  }, []);

  const stopTimer = (id) => {
    clearInterval(timersRef.current[id]);
    delete timersRef.current[id];
  };

  // No backend: simulate upload progress for the selected file
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file
    if (!file) return;

    const id = `${Date.now()}-${file.name}`;
    setUploads((prev) => [
      ...prev,
      { id, name: file.name, size: file.size, progress: 0 },
    ]);

    timersRef.current[id] = setInterval(() => {
      setUploads((prev) =>
        prev.map((u) => {
          if (u.id !== id) return u;
          const progress = Math.min(
            100,
            u.progress + Math.ceil(Math.random() * 12),
          );
          if (progress === 100) stopTimer(id);
          return { ...u, progress };
        }),
      );
    }, 300);
  };

  const removeUpload = (id) => {
    stopTimer(id);
    setUploads((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <Box>
      <Typography
        fontSize="20px"
        fontWeight={700}
        color="text.primary"
        mb={0.4}
      >
        Employment & Contract
      </Typography>
      <Typography fontSize="14px" color="text.light" mb={3.5}>
        Detailed information and settings for {staff.name}'s employment &
        contract.
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Top 4 Details */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <DetailCard label="Current Role" value={staff.role || "Carer"} />
            <DetailCard label="Contract Type" value="Permanent Full-Time" />
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <DetailCard label="Base Pay Rate" value="£16.50 / hour" />
            <DetailCard label="Overtime Rule" value="1.5x after 40h" />
          </Box>
        </Box>

        {/* Employment Documents */}
        <Box sx={{ bgcolor: "#fff", borderRadius: "12px", px: 2.5, py: 2 }}>
          <Typography
            fontSize="14px"
            fontWeight={700}
            color="text.primary"
            mb={2}
          >
            Employment Documents
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              px: { xs: 0, sm: 2 },
              py: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
              <DescriptionOutlinedIcon
                sx={{ color: "#94A3B8", fontSize: "20px" }}
              />
              <Box>
                <Typography
                  fontSize="14px"
                  fontWeight={700}
                  color="text.primary"
                >
                  Signed Employment Contract
                </Typography>
                <Typography fontSize="12px" color="text.light" mt={0.1}>
                  Expires: N/A
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
              <Chip
                label="VALID"
                size="small"
                sx={{
                  bgcolor: "#DCFCE7",
                  color: "#166534",
                  fontWeight: 700,
                  fontSize: "10px",
                  height: 22,
                  borderRadius: "6px",
                  px: 0.5,
                }}
              />
              <input
                ref={fileInputRef}
                type="file"
                hidden
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                sx={{
                  color: "#0EA5E9",
                  fontWeight: 700,
                  fontSize: "12px",
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

          {uploads.length > 0 && (
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}
            >
              {uploads.map((u) => (
                <UploadRow
                  key={u.id}
                  upload={u}
                  onRemove={() => removeUpload(u.id)}
                />
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
