import React, { useState } from "react";
import {
  Box,
  Typography,
  Modal,
  IconButton,
  Avatar,
  Tabs,
  Tab,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

export default function VisitDetailModal({ open, onClose, visit, client }) {
  const [activeTab, setActiveTab] = useState(0);

  if (!visit) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          borderRadius: "24px",
          boxShadow: 24,
          overflow: "hidden",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Box sx={{ p: 3, display: "flex", alignItems: "flex-start", gap: 2 }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              fontSize: "14px",
              fontWeight: 700,
              bgcolor: "#F1F5F9",
              color: "text.primary",
            }}
          >
            {client?.name
              ?.split(" ")
              .map((n) => n[0])
              .join("")}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography fontWeight={700} fontSize="16px" color="text.primary">
              {client?.name}
            </Typography>
            <Typography fontSize="14px" color="text.light">
              10:00 - 11:00, 25 Feb 2026
            </Typography>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  bgcolor: "#E0F2FE",
                  px: 1,
                  py: 0.3,
                  borderRadius: "6px",
                }}
              >
                <AccessTimeIcon sx={{ fontSize: 14, color: "primary.main" }} />
                <Typography
                  fontSize="10px"
                  fontWeight={700}
                  color="primary.main"
                >
                  IN PROGRESS
                </Typography>
              </Box>
            </Box>
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>

        {/* Tabs */}
        <Box sx={{ px: 3 }}>
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
            <Tab label="Alerts" />
            <Tab label="Activities" />
            <Tab label="Observations" />
          </Tabs>
        </Box>

        {/* Content */}
        <Box sx={{ p: 3, overflowY: "auto", flex: 1, bgcolor: "#F8FAFC" }}>
          {activeTab === 0 && <DetailsContent />}
          {activeTab === 1 && <AlertsContent />}
          {activeTab === 2 && <ActivitiesContent />}
          {activeTab === 3 && <ObservationsContent />}
        </Box>
      </Box>
    </Modal>
  );
}

function DetailsContent() {
  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid size={{ xs: 6 }} sx={{ display: "flex", flexDirection: "column" }}>
        <DetailBox
          icon={<AccessTimeIcon />}
          title="Planned"
          content={
            <Box>
              <Typography fontSize="14px" color="text.light" sx={{ mb: 2.5 }}>
                10:00 - 11:00
              </Typography>
              <Typography
                fontSize="14px"
                fontWeight={700}
                color="text.primary"
                sx={{ mb: 1 }}
              >
                Actuals
              </Typography>
              <Typography fontSize="14px" color="text.light">
                09:25 -
              </Typography>
            </Box>
          }
        />
      </Grid>
      <Grid size={{ xs: 6 }} sx={{ display: "flex", flexDirection: "column" }}>
        <DetailBox
          icon={<LocationOnOutlinedIcon />}
          title="Client location"
          value="36 Cairns Avenue Streatham SW16 5BW"
        />
      </Grid>
      <Grid size={{ xs: 6 }} sx={{ display: "flex", flexDirection: "column" }}>
        <DetailBox
          icon={<NotificationsNoneIcon />}
          title="Alerts"
          value="No alert raised"
        />
      </Grid>
      <Grid size={{ xs: 6 }} sx={{ display: "flex", flexDirection: "column" }}>
        <DetailBox
          icon={<GroupOutlinedIcon />}
          title="Care team"
          content={
            <Typography fontSize="14px" fontWeight={400} color="primary.main">
              Priya Sasikumar
            </Typography>
          }
        />
      </Grid>
      <Grid size={{ xs: 6 }} sx={{ display: "flex", flexDirection: "column" }}>
        <DetailBox
          icon={<LoginOutlinedIcon />}
          title="Check in"
          content={
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
              <CheckCircleIcon
                sx={{ fontSize: 16, color: "#16A34A", mt: 0.2 }}
              />
              <Box>
                <Typography fontSize="14px" color="text.primary">
                  <Box component="span" sx={{ fontWeight: 700 }}>
                    09:25
                  </Box>{" "}
                  Priya Sasikumar
                </Typography>
                <Typography fontSize="12px" color="text.light">
                  checked in using geolocation
                </Typography>
              </Box>
            </Box>
          }
        />
      </Grid>
      <Grid size={{ xs: 6 }} sx={{ display: "flex", flexDirection: "column" }}>
        <DetailBox
          icon={<LogoutOutlinedIcon />}
          title="Check out"
          value="No check outs recorded"
        />
      </Grid>
    </Grid>
  );
}

function DetailBox({ icon, title, value, content }) {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: "16px",
        p: 2.5,
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography fontSize="14px" fontWeight={700} color="text.primary">
          {title}
        </Typography>
        {React.cloneElement(icon, { sx: { fontSize: 20, color: "#475569" } })}
      </Box>
      {content ? (
        content
      ) : (
        <Typography fontSize="14px" color="text.light" sx={{ lineHeight: 1.5 }}>
          {value}
        </Typography>
      )}
    </Box>
  );
}

function AlertsContent() {
  return (
    <Box
      sx={{
        py: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: "12px",
          bgcolor: "#E0F2FE",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
        }}
      >
        <NotificationsNoneIcon sx={{ color: "primary.main" }} />
      </Box>
      <Typography fontWeight={700} fontSize="14px" color="text.primary">
        No alerts raised
      </Typography>
      <Typography fontSize="12px" color="text.light">
        There are no alerts recorded for this visit.
      </Typography>
    </Box>
  );
}

function ActivitiesContent() {
  const activities = [
    {
      time: "09:30",
      title: "Personal Care",
      desc: "Assisted with morning routine and dressing.",
      status: "COMPLETED",
    },
    {
      time: "09:45",
      title: "Medication",
      desc: "Prompted and observed morning medications.",
      status: "COMPLETED",
    },
    {
      time: "10:05",
      title: "Nutrition",
      desc: "Prepared breakfast and ensured hydration.",
      status: "COMPLETED",
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {activities.map((act, i) => (
        <Box
          key={i}
          sx={{
            bgcolor: "#fff",
            border: "1px solid #E2E8F0",
            borderRadius: "16px",
            p: 3,
            display: "flex",
            gap: 3,
          }}
        >
          <Typography
            fontSize="14px"
            fontWeight={700}
            color="#475569"
            sx={{ mt: 0.3, minWidth: 45 }}
          >
            {act.time}
          </Typography>
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography fontWeight={700} fontSize="15px" color="text.primary">
                {act.title}
              </Typography>
              <Box
                sx={{
                  bgcolor: "#F0FDF4",
                  px: 1.2,
                  py: 0.4,
                  borderRadius: "6px",
                }}
              >
                <Typography fontSize="10px" fontWeight={700} color="#16A34A">
                  {act.status}
                </Typography>
              </Box>
            </Box>
            <Typography
              fontSize="14px"
              color="text.light"
              sx={{ lineHeight: 1.5 }}
            >
              {act.desc}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

function ObservationsContent() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="body1" sx={{ fontSize: "16px" }}>
              📝
            </Typography>
          </Box>
          <Typography fontWeight={700} fontSize="14px" color="text.primary">
            General notes
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              border: "1px solid #E2E8F0",
              px: 1,
              py: 0.4,
              borderRadius: "8px",
              cursor: "pointer",
              bgcolor: "#fff",
            }}
          >
            <Typography
              fontSize="20px"
              sx={{ color: "primary.main", lineHeight: 0.5 }}
            >
              +
            </Typography>
            <Typography fontSize="11px" fontWeight={700} color="text.primary">
              Add a new note
            </Typography>
          </Box>
          <HelpOutlineIcon sx={{ fontSize: 16, color: "text.grey" }} />
        </Box>

        <Box
          sx={{
            bgcolor: "#fff",
            border: "1px solid #E2E8F0",
            borderRadius: "16px",
            p: 2.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: "#F1F5F9",
                fontSize: "12px",
                color: "text.primary",
              }}
            >
              YK
            </Avatar>
            <Box>
              <Typography fontWeight={700} fontSize="14px" color="text.primary">
                Yogabrindha Kanagaraj
              </Typography>
              <Typography fontSize="11px" color="text.light" fontStyle="italic">
                Carer
              </Typography>
            </Box>
          </Box>
          <Typography
            fontSize="10px"
            fontWeight={700}
            color="text.secondary"
            sx={{ mb: 1 }}
          >
            CREATED • 25 FEB 2026, 21:38
          </Typography>
          <Typography
            fontSize="14px"
            color="text.light"
            sx={{ lineHeight: 1.6, mb: 2 }}
          >
            I arrived after I rang intercom, harsha mom opened the door for me
            and we exchanged greetings.she is in her room .after i went
            upstairs. After that I gave water through the tube using syringe. I
            cleaned her bed and table.Assisted with personal care. We undressed,
            removed pad and wiped , applied body cream , clean pad put on and
            dressed, myself and mom use the slide sheet edges to move harsha to
            new position and make them comfortable in bed. After that my shift
            finished and I left she was comfortable in bed with her mom.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              fontSize="11px"
              fontWeight={700}
              color="primary.main"
              sx={{ cursor: "pointer" }}
            >
              Edit note
            </Typography>
            <Typography
              fontSize="11px"
              fontWeight={700}
              color="#8AC642"
              sx={{ cursor: "pointer" }}
            >
              See note history
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
          <RemoveRedEyeOutlinedIcon sx={{ fontSize: 18, color: "text.grey" }} />
          <Typography fontWeight={700} fontSize="14px" color="text.primary">
            Observations
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Typography fontSize="11px" fontWeight={700} color="primary.main">
            3
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <ObservationItem
            icon={<WarningAmberIcon />}
            title="Drinks"
            value="230ml Water"
            meta="OBSERVED • PEG TUBE"
            time="25 FEB, 21:37"
          />
          <ObservationItem
            icon={<HelpOutlineIcon />}
            title="Toilet visits"
            value="Wet incontinence pad observed"
            time="25 FEB, 21:37"
          />
          <ObservationItem
            icon={<HelpOutlineIcon />}
            title="Mood"
            value="Okay"
            time="25 FEB, 21:37"
          />
        </Box>
      </Box>
    </Box>
  );
}

function ObservationItem({ icon, title, value, meta, time }) {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: "16px",
        p: 2,
        display: "flex",
        gap: 2,
      }}
    >
      <Box sx={{ mt: 0.5 }}>
        {React.cloneElement(icon, { sx: { fontSize: 18, color: "text.grey" } })}
      </Box>
      <Box sx={{ flex: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Typography fontWeight={700} fontSize="14px" color="text.primary">
              {title}
            </Typography>
            <Typography fontSize="11px" color="text.secondary" sx={{ mt: 0.2 }}>
              {time}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography fontWeight={700} fontSize="14px" color="text.primary">
              {value}
            </Typography>
            {meta && (
              <Box
                sx={{
                  display: "flex",
                  gap: 0.5,
                  mt: 0.5,
                  justifyContent: "flex-end",
                }}
              >
                {meta.split(" • ").map((m, i) => (
                  <Box
                    key={i}
                    sx={{
                      bgcolor: "#F1F5F9",
                      px: 0.8,
                      py: 0.2,
                      borderRadius: "4px",
                    }}
                  >
                    <Typography
                      fontSize="8px"
                      fontWeight={700}
                      color="text.secondary"
                    >
                      {m}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
