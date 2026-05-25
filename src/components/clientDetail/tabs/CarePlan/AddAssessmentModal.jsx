import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  Checkbox,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GroupsIcon from "@mui/icons-material/Groups";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ScienceIcon from "@mui/icons-material/Science";
import TimerIcon from "@mui/icons-material/Timer";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import BackHandIcon from "@mui/icons-material/BackHand";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import WcIcon from "@mui/icons-material/Wc";

const ASSESSMENTS = [
  { id: "behaviour", label: "Behaviour", icon: <GroupsIcon /> },
  {
    id: "communication",
    label: "Communication",
    icon: <ChatBubbleOutlineIcon />,
  },
  { id: "coshh", label: "COSHH", icon: <ScienceIcon /> },
  { id: "covid", label: "COVID-19", icon: <TimerIcon /> },
  { id: "dysphagia", label: "Dysphagia", icon: <FlashOnIcon /> },
  { id: "endoflife", label: "End of life", icon: <FavoriteBorderIcon /> },
  { id: "falls", label: "Falls risk", icon: <TrendingUpIcon /> },
  { id: "manual", label: "Manual handling", icon: <BackHandIcon /> },
  { id: "mental", label: "Mental capacity", icon: <LightbulbOutlinedIcon /> },
  { id: "moving", label: "Moving and handling", icon: <SyncAltIcon /> },
  { id: "oral", label: "Oral care", icon: <SentimentSatisfiedAltIcon /> },
  { id: "skin", label: "Skin integrity", icon: <AccessibilityNewIcon /> },
  { id: "toileting", label: "Toileting", icon: <WcIcon /> },
];

export default function AddAssessmentModal({ open, onClose, onAdd }) {
  const [selected, setSelected] = useState([]);

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleAll = () => {
    if (selected.length === ASSESSMENTS.length) setSelected([]);
    else setSelected(ASSESSMENTS.map((a) => a.id));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: "24px", p: 1 },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Typography variant="h5" fontWeight={700} color="text.primary">
              Add assessments
            </Typography>
            <Typography fontSize="14px" color="text.light" sx={{ mt: 0.5 }}>
              Select additional assessments that are relevant to Margaret's
              needs and potential risks.
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{ color: "text.light" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ mt: 1, px: 3, py: 0 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
          <Checkbox
            checked={selected.length === ASSESSMENTS.length}
            indeterminate={
              selected.length > 0 && selected.length < ASSESSMENTS.length
            }
            onChange={toggleAll}
            sx={{
              p: 0,
              color: "#E2E8F0",
              "&.Mui-checked": { color: "primary.main" },
            }}
          />
          <Typography fontSize="14px" fontWeight={700} color="text.grey">
            {selected.length} of {ASSESSMENTS.length} assessments selected
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            maxHeight: 380,
            overflowY: "auto",
            pr: 1.5,
            "&::-webkit-scrollbar": { width: "6px" },
            "&::-webkit-scrollbar-track": { bgcolor: "transparent" },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: "#E2E8F0",
              borderRadius: "10px",
            },
          }}
        >
          {ASSESSMENTS.map((item) => {
            const isChecked = selected.includes(item.id);
            return (
              <Box
                key={item.id}
                onClick={() => toggle(item.id)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 1.5,
                  borderRadius: "16px",
                  border: "1px solid",
                  borderColor: isChecked ? "primary.main" : "#E2E8F0",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  bgcolor: isChecked ? "rgba(14, 165, 233, 0.02)" : "#fff",
                  "&:hover": { borderColor: "primary.main" },
                }}
              >
                <Checkbox
                  checked={isChecked}
                  sx={{
                    p: 0,
                    color: "#E2E8F0",
                    "&.Mui-checked": { color: "primary.main" },
                  }}
                />
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "10px",
                    bgcolor: "#F1F5F9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {React.cloneElement(item.icon, {
                    sx: {
                      fontSize: 20,
                      color: isChecked ? "primary.main" : "text.light",
                    },
                  })}
                </Box>
                <Typography
                  fontSize="14px"
                  fontWeight={700}
                  color="text.primary"
                >
                  {item.label}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1, justifyContent: "end" }}>
        <Button
          onClick={onClose}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            color: "text.primary",
            px: 3,
            border: "1px solid #E2E8F0",
            borderRadius: "10px",
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => onAdd(selected)}
          disabled={selected.length === 0}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            bgcolor: "primary.main",
            color: "#fff",
            "&.Mui-disabled": {
              bgcolor: "rgba(14, 165, 233, 0.5)",
              color: "#fff",
            },
            px: 4,
            py: 1.2,
            borderRadius: "10px",
            boxShadow: "none",
            "&:hover": { bgcolor: "#0C8FCC", boxShadow: "none" },
          }}
        >
          Add assessments
        </Button>
      </DialogActions>
    </Dialog>
  );
}
