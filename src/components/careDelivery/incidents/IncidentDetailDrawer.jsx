import React from "react";
import { Drawer, Box, Typography, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import {
  ShieldAlertIcon,
  PencilIcon,
  FileIcon,
  ActivityIcon,
  DownloadIcon,
} from "../../staffOverview/LineIcons";
import {
  TYPE_CONFIG,
  STATUS_STYLES,
  SEVERITY_STYLES,
  FOLLOW_UP_STYLES,
  refOf,
  downloadText,
} from "./incidentData";

const cardSx = {
  bgcolor: "#fff",
  borderRadius: "16px",
  border: "1px solid #F1F5F9",
  boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
};

const labelSx = {
  fontSize: "9px",
  fontWeight: 700,
  color: "#64748B",
  letterSpacing: "0.12em",
};

function Pill({ style, children }) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        px: 1,
        py: 0.3,
        borderRadius: "4px",
        fontSize: "9px",
        fontWeight: 700,
        letterSpacing: "0.05em",
        ...style,
      }}
    >
      {children}
    </Box>
  );
}

function Section({ icon, color, title, children }) {
  return (
    <Box sx={{ ...cardSx, p: 2.25 }}>
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.75, color }}
      >
        {icon}
        <Typography fontSize="14px" fontWeight={700} color="text.primary">
          {title}
        </Typography>
      </Box>
      {children}
    </Box>
  );
}

const buildReport = (i) =>
  [
    i.title,
    `Ref: ${refOf(i.id)}`,
    `Reported by: ${i.reportedBy}`,
    `Date & time: ${i.time}`,
    `Location: ${i.location || "—"}`,
    `Severity: ${i.severity}`,
    `Status: ${i.status}`,
    `Follow-up: ${i.followUp}`,
    "",
    "Description",
    i.description || "—",
    "",
    `Witnesses: ${i.witnesses.length ? i.witnesses.join(", ") : "None recorded"}`,
    "",
    "Immediate actions taken",
    i.immediateActions || "—",
    "",
    "Investigation log",
    ...i.logs.map(
      (l) => `- ${l.time}: ${l.text}${l.subtext ? ` (${l.subtext})` : ""}`,
    ),
  ].join("\n");

export default function IncidentDetailDrawer({ open, onClose, incident }) {
  if (!incident) return null;

  const type = TYPE_CONFIG[incident.type] || TYPE_CONFIG.other;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: "100%", sm: 500 }, bgcolor: "#F8FAFC", p: 0 },
      }}
      sx={{ zIndex: 1301 }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Header */}
        <Box
          sx={{
            px: 2.5,
            py: 2,
            bgcolor: "#fff",
            borderBottom: "1px solid #F1F5F9",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: "12px",
                bgcolor: type.bgcolor,
                color: type.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShieldAlertIcon size={20} />
            </Box>
            <Box>
              <Typography fontSize="17px" fontWeight={700} color="text.primary">
                {incident.title}
              </Typography>
              <Typography fontSize="11px" color="text.light">
                Ref: {refOf(incident.id)} &bull; Reported by{" "}
                {incident.reportedBy}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <IconButton
              size="small"
              aria-label="Edit incident"
              sx={{
                bgcolor: "#F8FAFC",
                color: "text.grey",
                "&:hover": { bgcolor: "#E2E8F0" },
              }}
            >
              <PencilIcon size={15} />
            </IconButton>
            <IconButton
              size="small"
              onClick={onClose}
              aria-label="Close"
              sx={{ color: "text.grey" }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Content */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 1.5,
            }}
          >
            {[
              {
                label: "SEVERITY",
                value: incident.severity,
                style: SEVERITY_STYLES[incident.severity],
              },
              {
                label: "STATUS",
                value: incident.status,
                style: STATUS_STYLES[incident.status],
              },
              {
                label: "FOLLOW-UP",
                value: incident.followUp,
                style: FOLLOW_UP_STYLES[incident.followUp],
              },
            ].map((s) => (
              <Box key={s.label} sx={{ ...cardSx, p: 1.75 }}>
                <Typography sx={{ ...labelSx, mb: 0.75 }}>{s.label}</Typography>
                <Pill style={s.style}>{s.value}</Pill>
              </Box>
            ))}
          </Box>

          <Section
            icon={<FileIcon size={16} />}
            color="#EF4444"
            title="Incident Description"
          >
            <Box
              sx={{
                bgcolor: "#F8FAFC",
                borderRadius: "12px",
                p: 1.75,
                mb: 2,
                border: "1px solid #F1F5F9",
              }}
            >
              <Typography
                fontSize="12px"
                color="text.grey"
                fontStyle="italic"
                sx={{ lineHeight: 1.6 }}
              >
                "{incident.description}"
              </Typography>
            </Box>
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
            >
              <Box>
                <Typography
                  sx={{ ...labelSx, letterSpacing: "0.06em", mb: 0.4 }}
                >
                  DATE & TIME
                </Typography>
                <Typography
                  fontSize="13px"
                  fontWeight={700}
                  color="text.primary"
                >
                  {incident.time}
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{ ...labelSx, letterSpacing: "0.06em", mb: 0.4 }}
                >
                  LOCATION
                </Typography>
                <Typography
                  fontSize="13px"
                  fontWeight={700}
                  color="text.primary"
                >
                  {incident.location || "—"}
                </Typography>
              </Box>
            </Box>
          </Section>

          <Section
            icon={<PeopleOutlineOutlinedIcon sx={{ fontSize: 18 }} />}
            color="#3B82F6"
            title="Witnesses"
          >
            {incident.witnesses.length > 0 ? (
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {incident.witnesses.map((w) => (
                  <Box
                    key={w}
                    sx={{
                      px: 1.5,
                      py: 0.75,
                      borderRadius: "10px",
                      bgcolor: "#F8FAFC",
                      border: "1px solid #F1F5F9",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "text.grey",
                    }}
                  >
                    {w}
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography fontSize="12px" color="text.light">
                No witnesses recorded.
              </Typography>
            )}
          </Section>

          <Section
            icon={<CheckCircleOutlinedIcon sx={{ fontSize: 18 }} />}
            color="#10B981"
            title="Immediate Actions Taken"
          >
            <Box
              sx={{
                p: 1.5,
                borderRadius: "12px",
                border: "1px solid #D1FAE5",
                bgcolor: "#F6FEFA",
                color: "text.grey",
                fontSize: "12px",
              }}
            >
              {incident.immediateActions || "No immediate actions recorded."}
            </Box>
          </Section>

          <Section
            icon={<ActivityIcon size={16} />}
            color="#D97706"
            title="Investigation Log"
          >
            <Box sx={{ position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  left: "6px",
                  top: "10px",
                  bottom: "10px",
                  width: "2px",
                  bgcolor: "#F1F5F9",
                }}
              />
              {incident.logs.map((log, index) => (
                <Box
                  key={index}
                  sx={{
                    position: "relative",
                    pl: 3.5,
                    mb: index < incident.logs.length - 1 ? 2.5 : 0,
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      left: 0,
                      top: "2px",
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      bgcolor: index === 0 ? "#fff" : "#F8FAFC",
                      border:
                        index === 0 ? "2px solid #F59E0B" : "2px solid #E2E8F0",
                      zIndex: 1,
                    }}
                  />
                  <Typography
                    fontSize="9px"
                    fontWeight={700}
                    color="#64748B"
                    sx={{
                      mb: 0.25,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    {log.time}
                  </Typography>
                  <Typography
                    fontSize="12px"
                    fontWeight={700}
                    color="text.primary"
                  >
                    {log.text}
                  </Typography>
                  {log.subtext && (
                    <Typography fontSize="11px" color="text.light">
                      {log.subtext}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          </Section>
        </Box>

        {/* Footer */}
        <Box sx={{ p: 2, bgcolor: "#fff", borderTop: "1px solid #F1F5F9" }}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<DownloadIcon size={16} />}
            onClick={() =>
              downloadText(
                `${refOf(incident.id)}-incident-report.txt`,
                buildReport(incident),
              )
            }
            sx={{
              borderRadius: "12px",
              bgcolor: "#0EA5E9",
              color: "#fff",
              py: 1.3,
              fontWeight: 700,
              textTransform: "none",
              fontSize: "14px",
              boxShadow: "0 8px 20px rgba(14,165,233,0.2)",
              "&:hover": { bgcolor: "#0284C7" },
            }}
          >
            Export Incident Report
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
