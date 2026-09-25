import React, { useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import IncidentDetailDrawer from "./IncidentDetailDrawer";
import ReportIncidentModal from "./ReportIncidentModal";
import {
  ShieldAlertIcon,
  PencilIcon,
  DownloadIcon,
} from "../../staffOverview/LineIcons";
import {
  INITIAL_INCIDENTS,
  STATUS_OPTIONS,
  STATUS_STYLES,
  TYPE_CONFIG,
  refOf,
  downloadText,
} from "./incidentData";

const FILTERS = ["All", ...STATUS_OPTIONS];

const CSV_COLUMNS = [
  ["Ref", (i) => refOf(i.id)],
  ["Incident", (i) => i.title],
  ["Reported by", (i) => i.reportedBy],
  ["Date & time", (i) => i.time],
  ["Location", (i) => i.location],
  ["Severity", (i) => i.severity],
  ["Status", (i) => i.status],
  ["Follow-up", (i) => i.followUp],
];

const toCsv = (rows) =>
  [
    CSV_COLUMNS.map(([h]) => h),
    ...rows.map((r) => CSV_COLUMNS.map(([, get]) => get(r))),
  ]
    .map((cells) =>
      cells.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(","),
    )
    .join("\n");

export default function IncidentsTab() {
  const [incidents, setIncidents] = useState(INITIAL_INCIDENTS);
  const [activeFilter, setActiveFilter] = useState("All");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);

  const visible = incidents.filter(
    (i) => activeFilter === "All" || i.status === activeFilter.toUpperCase(),
  );
  const countFor = (f) =>
    f === "All"
      ? incidents.length
      : incidents.filter((i) => i.status === f.toUpperCase()).length;

  const handleOpenDrawer = (incident) => {
    setSelectedIncident(incident);
    setDrawerOpen(true);
  };

  const handleSubmit = (incident) => {
    // Newest first
    setIncidents((prev) => [
      { ...incident, id: Math.max(0, ...prev.map((i) => i.id)) + 1 },
      ...prev,
    ]);
    setModalOpen(false);
  };

  const handleExport = () =>
    downloadText(
      `incident-report-${activeFilter.toLowerCase()}.csv`,
      toCsv(visible),
      "text/csv",
    );

  return (
    <Box>
      {/* Page Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "10px",
              bgcolor: "#FFFBEB",
              color: "#D97706",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ShieldAlertIcon size={18} />
          </Box>
          <Typography fontSize="20px" fontWeight={700} color="text.primary">
            Incidents &amp; Safeguarding
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Button
            variant="outlined"
            onClick={handleExport}
            disabled={visible.length === 0}
            startIcon={<DownloadIcon size={16} />}
            sx={{
              borderRadius: "12px",
              borderColor: "#E2E8F0",
              bgcolor: "#fff",
              color: "#475569",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "14px",
              px: 2.5,
              "&:hover": { bgcolor: "#F8FAFC", borderColor: "#CBD5E1" },
            }}
          >
            Report
          </Button>

          <Button
            variant="contained"
            onClick={() => setModalOpen(true)}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "14px",
              px: 2.5,
              background: "linear-gradient(135deg, #0EA5E9, #8AC642)",
              boxShadow: "0 4px 14px rgba(14,165,233,0.35)",
              "&:hover": {
                background: "linear-gradient(135deg, #0284c7, #76ad34)",
              },
              color: "text.paper",
            }}
          >
            + Report Incident
          </Button>
        </Box>
      </Box>

      {/* Incident Logs */}
      <Box
        sx={{
          borderRadius: "20px",
          border: "1px solid #BAE6FD",
          bgcolor: "#E0F5FF",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1.5,
            px: 3,
            py: 2,
          }}
        >
          <Typography fontSize="16px" fontWeight={700} color="text.primary">
            Incident Logs
          </Typography>

          <Box
            sx={{ display: "flex", gap: 0.5 }}
            role="tablist"
            aria-label="Filter incidents by status"
          >
            {FILTERS.map((f) => {
              const selected = activeFilter === f;
              return (
                <Box
                  key={f}
                  component="button"
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveFilter(f)}
                  sx={{
                    px: 1.75,
                    py: 0.6,
                    border: "none",
                    borderRadius: "8px",
                    fontFamily: "inherit",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                    bgcolor: selected ? "#fff" : "transparent",
                    color: selected ? "text.primary" : "#475569",
                    boxShadow: selected
                      ? "0 1px 3px rgba(15,23,42,0.08)"
                      : "none",
                    transition: "all 0.15s",
                  }}
                >
                  {f}{" "}
                  <Box component="span" sx={{ color: "#94A3B8" }}>
                    {countFor(f)}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>

        {visible.length === 0 && (
          <Typography
            fontSize="14px"
            color="text.secondary"
            sx={{ px: 3, pb: 3 }}
          >
            No {activeFilter.toLowerCase()} incidents.
          </Typography>
        )}

        {visible.map((item) => {
          const tc = TYPE_CONFIG[item.type] || TYPE_CONFIG.other;
          const ss = STATUS_STYLES[item.status] || STATUS_STYLES.OPEN;
          return (
            <Box
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() => handleOpenDrawer(item)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOpenDrawer(item);
                }
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 3,
                py: 1.75,
                borderTop: "1px solid #fff",
                cursor: "pointer",
                transition: "background-color 0.15s",
                "&:hover": { bgcolor: "rgba(255,255,255,0.45)" },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: "10px",
                    bgcolor: tc.bgcolor,
                    color: tc.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <ShieldAlertIcon size={18} />
                </Box>
                <Box>
                  <Typography
                    fontSize="14px"
                    fontWeight={700}
                    color="text.primary"
                    mb={0.25}
                  >
                    {item.title}
                  </Typography>
                  <Typography fontSize="12px" color="text.light">
                    Reported by {item.reportedBy} &bull; {item.time}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  sx={{
                    px: 1,
                    py: 0.4,
                    borderRadius: "4px",
                    bgcolor: ss.bgcolor,
                    color: ss.color,
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.status}
                </Box>
                <IconButton
                  size="small"
                  aria-label={`Edit ${item.title}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenDrawer(item);
                  }}
                  sx={{ color: "#64748B", p: 0.75 }}
                >
                  <PencilIcon size={15} />
                </IconButton>
                <KeyboardArrowRightIcon
                  sx={{ color: "#CBD5E1", fontSize: 22 }}
                />
              </Box>
            </Box>
          );
        })}
      </Box>

      <IncidentDetailDrawer
        key={selectedIncident?.id ?? "none"}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        incident={selectedIncident}
      />

      <ReportIncidentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </Box>
  );
}
