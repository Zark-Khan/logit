import React, { useState } from "react";
import {
  Box,
  Typography,
  Modal,
  IconButton,
  Avatar,
  Tabs,
  Tab,
  Button,
  TextField,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function AlertDetailModal({ open, onClose, alert, client }) {
  const [activeTab, setActiveTab] = useState(0);

  if (!alert) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 520,
          maxHeight: "90vh",
          bgcolor: "#fff",
          borderRadius: "24px",
          boxShadow: "0 24px 48px rgba(0,0,0,0.15)",
          outline: "none",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header Section */}
        <Box sx={{ p: 3, pb: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", gap: 1.5 }}>
              <Avatar
                src={`https://ui-avatars.com/api/?name=${client?.name || "Margaret Hall"}&background=E2E8F0`}
                sx={{ width: 48, height: 48, borderRadius: "12px" }}
              />
              <Box>
                <Typography
                  fontWeight={700}
                  fontSize="18px"
                  color="text.primary"
                >
                  {client?.name || "Margaret Hall"}
                </Typography>
                <Typography fontSize="14px" color="text.light" fontWeight={400}>
                  18 Feb, 13:29
                </Typography>
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                    bgcolor: "#FFB81C",
                    color: "#fff",
                    px: 1,
                    py: 0.3,
                    borderRadius: "8px",
                    mt: 0.8,
                  }}
                >
                  <NotificationsIcon sx={{ fontSize: 14 }} />
                  <Typography fontSize="10px" fontWeight={700}>
                    ALERT
                  </Typography>
                </Box>
              </Box>
            </Box>
            <IconButton
              size="small"
              onClick={onClose}
              sx={{ color: "text.light" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Tabs
            value={activeTab}
            onChange={(e, v) => setActiveTab(v)}
            sx={{
              minHeight: 0,
              "& .MuiTab-root": {
                textTransform: "none",
                fontSize: "14px",
                fontWeight: 700,
                minWidth: 0,
                px: 0,
                color: "text.grey",
                minHeight: 40,
              },
              "& .MuiTabs-flexContainer": { gap: 3 },
              "& .Mui-selected": { color: "#0EA5E9 !important" },
              "& .MuiTabs-indicator": {
                height: 3,
                borderRadius: 0,
                bgcolor: "#0EA5E9",
              },
            }}
          >
            <Tab label="Details" />
            <Tab label="Comments" />
            <Tab label="Timeline" />
          </Tabs>
        </Box>

        {/* Content Area */}
        <Box sx={{ p: 3, pt: 1, overflowY: "auto", flex: 1 }}>
          {activeTab === 0 && <DetailsContent />}
          {activeTab === 1 && <CommentsContent />}
          {activeTab === 2 && <TimelineContent />}
        </Box>
      </Box>
    </Modal>
  );
}

function DetailsContent() {
  return (
    <Box>
      <Typography
        fontWeight={700}
        fontSize="18px"
        color="text.primary"
        sx={{ mb: 2 }}
      >
        Incident details
      </Typography>

      <Box sx={{ display: "flex", gap: 1.5, mb: 2.5 }}>
        <Avatar
          src="https://ui-avatars.com/api/?name=Priya+Sasikumar&background=F1F5F9"
          sx={{ width: 44, height: 44, borderRadius: "12px" }}
        />
        <Box>
          <Typography fontWeight={700} fontSize="16px" color="text.primary">
            Priya Sasikumar
          </Typography>
          <Typography fontSize="14px" color="text.light" fontStyle="italic">
            Carer
          </Typography>
        </Box>
      </Box>

      <Typography
        fontSize="14px"
        color="text.light"
        sx={{ mb: 3, lineHeight: 1.6 }}
      >
        A forced check-out was recorded for Priya Sasikumar visit with
        Harshavardini Sureshkumar
      </Typography>

      <Typography
        fontWeight={700}
        fontSize="15px"
        color="text.primary"
        sx={{ mb: 1.5 }}
      >
        Forced Geo location check out
      </Typography>

      <Typography
        fontSize="14px"
        color="text.light"
        sx={{ mb: 1.5, lineHeight: 1.6 }}
      >
        Priya Sasikumar checked out approximately 2.6 kilometres away from
        secure check-in zone
      </Typography>

      <Typography fontSize="14px" color="text.light" sx={{ mb: 2.5 }}>
        Client location: 36 Cairns Avenue, Streatham, SW165BW
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "8px",
              bgcolor: "#F0F9FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HomeOutlinedIcon sx={{ fontSize: 18, color: "primary.main" }} />
          </Box>
          <Typography fontSize="14px" color="text.primary">
            <Box component="span" sx={{ fontWeight: 700 }}>
              Secure check-in zone:
            </Box>{" "}
            200 metres
          </Typography>
          <InfoOutlinedIcon sx={{ fontSize: 16, color: "text.grey" }} />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "8px",
              bgcolor: "#F0F9FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PersonOutlineIcon sx={{ fontSize: 18, color: "primary.main" }} />
          </Box>
          <Typography fontSize="14px" color="text.primary">
            <Box component="span" sx={{ fontWeight: 700 }}>
              Carer location accuracy:
            </Box>{" "}
            Medium (40 metres)
          </Typography>
          <InfoOutlinedIcon sx={{ fontSize: 16, color: "text.grey" }} />
        </Box>
      </Box>

      <Typography fontSize="14px" color="text.primary" sx={{ mb: 3 }}>
        <Box component="span" sx={{ fontWeight: 700 }}>
          Carer distance from client home:
        </Box>{" "}
        Approx. 2.6 kilometres
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Button
          variant="outlined"
          sx={{
            borderColor: "#8AC642",
            color: "#8AC642",
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 700,
            fontSize: "14px",
            px: 2,
            "&:hover": {
              borderColor: "#7AB03B",
              bgcolor: "rgba(138, 198, 66, 0.05)",
            },
          }}
        >
          Show map
        </Button>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            cursor: "pointer",
          }}
        >
          <Typography fontSize="14px" fontWeight={700} color="primary.main">
            View visit details
          </Typography>
          <ArrowForwardIcon sx={{ fontSize: 16, color: "primary.main" }} />
        </Box>
      </Box>

      <Divider sx={{ mb: 4, borderColor: "#F1F5F9" }} />

      <Box sx={{ mb: 3 }}>
        <Typography
          fontSize="14px"
          fontWeight={700}
          color="text.primary"
          sx={{ mb: 1.5 }}
        >
          Choose status
        </Typography>
        <Box
          sx={{
            bgcolor: "#FFF7ED",
            border: "1px solid #FFEDD5",
            borderRadius: "10px",
            p: 1.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography fontSize="14px" fontWeight={700} color="#EA580C">
            Action needed
          </Typography>
          <KeyboardArrowDownIcon sx={{ color: "#EA580C" }} />
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography
          fontSize="14px"
          fontWeight={700}
          color="text.primary"
          sx={{ mb: 1.5 }}
        >
          Severity
        </Typography>
        <Box
          sx={{
            border: "1px solid #E2E8F0",
            borderRadius: "12px",
            p: 1.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <WarningAmberIcon sx={{ fontSize: 18, color: "#F97316" }} />
            <Typography fontSize="14px" fontWeight={700} color="text.primary">
              Medium
            </Typography>
          </Box>
          <KeyboardArrowDownIcon sx={{ color: "text.grey" }} />
        </Box>
      </Box>

      <Button
        variant="outlined"
        fullWidth
        sx={{
          borderColor: "#0EA5E9",
          color: "#0EA5E9",
          borderRadius: "10px",
          textTransform: "none",
          fontWeight: 700,
          fontSize: "14px",
          py: 1.2,
          "&:hover": {
            borderColor: "#0C8FCC",
            bgcolor: "rgba(14, 165, 233, 0.05)",
          },
        }}
      >
        Save changes
      </Button>
    </Box>
  );
}

function CommentsContent() {
  const comments = [
    {
      name: "Sarah Thompson",
      role: "MANAGER",
      date: "18 FEB, 14:05",
      text: "I've spoken with Priya, she mentioned her phone's GPS was acting up during checkout. She was definitely at the client's home.",
    },
    {
      name: "James Wilson",
      role: "SUPERVISOR",
      date: "18 FEB, 15:30",
      text: "Checked the map, the distance seems significant. I've asked Priya to ensure her location services are always on high accuracy.",
    },
  ];

  return (
    <Box>
      <TextField
        placeholder="Add a comment..."
        multiline
        rows={4}
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "16px",
            fontSize: "14px",
            bgcolor: "#fff",
            "& fieldset": { borderColor: "#CBD5E1" },
          },
          mb: 2,
        }}
      />
      <Button
        variant="outlined"
        sx={{
          borderColor: "#8AC642",
          color: "#8AC642",
          borderRadius: "10px",
          textTransform: "none",
          fontWeight: 700,
          fontSize: "14px",
          px: 3,
          py: 1,
          mb: 4,
          "&:hover": {
            borderColor: "#7AB03B",
            bgcolor: "rgba(138, 198, 66, 0.05)",
          },
        }}
      >
        Post comment
      </Button>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {comments.map((c, i) => (
          <Box key={i}>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  fontSize: "12px",
                  bgcolor: "#F1F5F9",
                  color: "text.primary",
                  fontWeight: 700,
                }}
              >
                {c.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Avatar>
              <Box>
                <Typography
                  fontSize="14px"
                  fontWeight={700}
                  color="text.primary"
                >
                  {c.name}
                </Typography>
                <Typography fontSize="10px" fontWeight={700} color="text.light">
                  {c.role} • {c.date}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ bgcolor: "#F8FAFC", borderRadius: "16px", p: 2.5 }}>
              <Typography
                fontSize="14px"
                color="text.light"
                sx={{ lineHeight: 1.6 }}
              >
                {c.text}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function TimelineContent() {
  const events = [
    {
      title: "Alert categorised",
      by: "Priya Sasikumar",
      date: "18 Feb 2026, 13:29",
    },
    {
      title: "Alert raised",
      by: "Priya Sasikumar",
      date: "18 Feb 2026, 13:29",
    },
  ];

  return (
    <Box sx={{ pl: 1 }}>
      {events.map((ev, i) => (
        <Box
          key={i}
          sx={{ display: "flex", gap: 3, position: "relative", pb: 4 }}
        >
          {/* Vertical Line */}
          {i < events.length - 1 && (
            <Box
              sx={{
                position: "absolute",
                left: 4.5,
                top: 12,
                bottom: -12,
                width: "1.5px",
                bgcolor: "#E2E8F0",
              }}
            />
          )}
          {/* Dot */}
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              bgcolor: "#94A3B8",
              mt: 0.8,
              zIndex: 1,
            }}
          />
          <Box>
            <Typography fontWeight={700} fontSize="15px" color="text.primary">
              {ev.title}
            </Typography>
            <Typography fontSize="14px" color="text.light">
              by {ev.by}, {ev.date}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
