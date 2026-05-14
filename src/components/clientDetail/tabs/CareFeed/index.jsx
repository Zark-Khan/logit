import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import VisitDetailModal from "./VisitDetailModal";
import AlertDetailModal from "./AlertDetailModal";

const FEED_DATA = [
  {
    id: 1,
    type: "visit",
    status: "IN PROGRESS",
    time: "09:25",
    date: "TODAY",
    alertsCount: 0,
    observationsCount: 0,
    tasksCount: 0,
    duration: "01H 07M 03S / 1 HOUR",
  },
  {
    id: 2,
    type: "visit",
    status: "COMPLETED",
    time: "18:19",
    date: "YESTERDAY",
    alertsCount: 0,
    observationsCount: 4,
    tasksCount: 0,
    duration: "1 HOUR 12 MINS / 1 HOUR",
  },
  {
    id: 3,
    type: "alert",
    title: "Visit not started in time",
    description: "A visit by Priya Sasikumar to Harshavardini Su...",
    comments: 0,
    time: "09:32",
    date: "17 FEB",
  },
];

export default function CareFeedTab({ client }) {
  const [filter, setFilter] = useState("All");
  const [visitModalOpen, setVisitModalOpen] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);

  const handleVisitClick = (visit) => {
    setSelectedVisit(visit);
    setVisitModalOpen(true);
  };

  const handleAlertClick = (alert) => {
    setSelectedAlert(alert);
    setAlertModalOpen(true);
  };

  const filteredData = FEED_DATA.filter((item) => {
    if (filter === "All") return true;
    if (filter === "Alerts") return item.type === "alert";
    if (filter === "Visits") return item.type === "visit";
    return true;
  });

  const getAlertsCount = () =>
    FEED_DATA.filter((i) => i.type === "alert").length;
  const getVisitsCount = () =>
    FEED_DATA.filter((i) => i.type === "visit").length;

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} color="text.primary">
          Care Feed
        </Typography>
        <Typography fontSize="14px" color="text.primary" sx={{ mt: 0.3 }}>
          Manage information and care delivery for {client.name}.
        </Typography>
      </Box>

      {/* Filters */}
      <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
        <FilterChip
          label="All"
          count={FEED_DATA.length}
          active={filter === "All"}
          onClick={() => setFilter("All")}
        />
        <FilterChip
          label="Alerts"
          count={getAlertsCount()}
          active={filter === "Alerts"}
          onClick={() => setFilter("Alerts")}
        />
        <FilterChip
          label="Visits"
          count={getVisitsCount()}
          active={filter === "Visits"}
          onClick={() => setFilter("Visits")}
        />
      </Box>
      <Box sx={{ height: "1px", bgcolor: "#fff", mb: 3 }} />

      {/* Feed List */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        {filteredData.map((item) =>
          item.type === "visit" ? (
            <VisitCard
              key={item.id}
              item={item}
              onClick={() => handleVisitClick(item)}
            />
          ) : (
            <AlertCard
              key={item.id}
              item={item}
              onClick={() => handleAlertClick(item)}
            />
          ),
        )}
      </Box>

      <VisitDetailModal
        open={visitModalOpen}
        onClose={() => setVisitModalOpen(false)}
        visit={selectedVisit}
        client={client}
      />

      <AlertDetailModal
        open={alertModalOpen}
        onClose={() => setAlertModalOpen(false)}
        alert={selectedAlert}
        client={client}
      />
    </Box>
  );
}

function FilterChip({ label, count, active, onClick }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        px: 4,
        py: 1,
        borderRadius: "16px",
        cursor: "pointer",
        bgcolor: active ? "#ffffff" : "transparent",
        transition: "all 0.2s ease",
      }}
    >
      <Typography
        fontSize="15px"
        fontWeight={700}
        color={active ? "primary.main" : "#64748B"}
      >
        {label}
      </Typography>
      <Box
        sx={{
          bgcolor: active ? "primary.main" : "#E2E8F0",
          color: active ? "#fff" : "#64748B",
          fontSize: "12px",
          fontWeight: 700,
          minWidth: 24,
          height: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "6px",
        }}
      >
        {count}
      </Box>
    </Box>
  );
}

function VisitCard({ item, onClick }) {
  const isInProgress = item.status === "IN PROGRESS";

  return (
    <Box
      onClick={onClick}
      sx={{
        bgcolor: "#fff",
        border: `1px solid ${isInProgress ? "#0EA5E9" : "#E2E8F0"}`,
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.2s ease",
        "&:hover": { transform: "translateY(-2px)" },
        outline: "none",
      }}
    >
      <Box sx={{ p: 2.5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "10px",
                bgcolor: "#F8FAFC",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #E2E8F0",
              }}
            >
              <CalendarTodayIcon
                sx={{
                  fontSize: 20,
                  color:
                    item.status === "COMPLETED" ? "primary.main" : "text.light",
                }}
              />
            </Box>
            <Typography fontWeight={700} fontSize="14px" color="text.primary">
              Visit
            </Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography fontSize="10px" fontWeight={700} color="text.secondary">
              {item.date}
            </Typography>
            <Typography fontWeight={700} fontSize="14px" color="text.primary">
              {item.time}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <NotificationsNoneIcon
              sx={{ fontSize: 18, color: "text.secondary" }}
            />
            <Typography fontSize="14px" fontWeight={600} color="text.primary">
              {item.alertsCount}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <RemoveRedEyeOutlinedIcon
              sx={{ fontSize: 18, color: "text.secondary" }}
            />
            <Typography fontSize="14px" fontWeight={600} color="text.primary">
              {item.observationsCount}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <CheckCircleOutlineIcon
              sx={{ fontSize: 18, color: "text.secondary" }}
            />
            <Typography fontSize="14px" fontWeight={600} color="text.primary">
              {item.tasksCount}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ px: 2.5, pb: 2.5 }}>
        <Box
          sx={{
            bgcolor: isInProgress ? "#E0F2FE" : "#F0FDF4",
            px: 2.5,
            py: 1.5,
            borderRadius: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            fontSize="10px"
            fontWeight={800}
            color={isInProgress ? "primary.main" : "#16A34A"}
          >
            {item.status}
          </Typography>
          <Typography
            fontSize="10px"
            fontWeight={700}
            color={isInProgress ? "primary.main" : "#16A34A"}
          >
            {item.duration}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

function AlertCard({ item, onClick }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        bgcolor: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: "16px",
        cursor: "pointer",
        "&:hover": { borderColor: "#EA580C" },
        overflow: "hidden",
        outline: "none",
      }}
    >
      <Box sx={{ p: 2.5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "10px",
                bgcolor: "#F8FAFC",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #E2E8F0",
              }}
            >
              <NotificationsNoneIcon
                sx={{ fontSize: 20, color: "text.secondary" }}
              />
            </Box>
            <Typography fontWeight={700} fontSize="14px" color="text.primary">
              Alert
            </Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography fontSize="10px" fontWeight={700} color="text.secondary">
              {item.date}
            </Typography>
            <Typography fontWeight={700} fontSize="14px" color="text.primary">
              {item.time}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <WarningAmberIcon sx={{ fontSize: 18, color: "#EA580C" }} />
          <Typography fontWeight={700} fontSize="14px" color="text.primary">
            {item.title}
          </Typography>
        </Box>
        <Typography fontSize="14px" color="text.light" sx={{ mb: 1.5 }}>
          {item.description}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <ChatBubbleOutlineIcon
            sx={{ fontSize: 16, color: "text.secondary" }}
          />
          <Typography fontSize="12px" fontWeight={600} color="text.primary">
            {item.comments}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ bgcolor: "#FFEDD575", px: 2.5, py: 1.2 }}>
        <Typography fontSize="10px" fontWeight={800} color="#EA580C">
          ACTION NEEDED
        </Typography>
      </Box>
    </Box>
  );
}
