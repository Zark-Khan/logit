import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

// ─── Stats Cards ─────────────────────────────────────────────────────────────
const STATS = [
  {
    label: "Total Revenue",
    value: "£142,400",
    badge: "+12.5%",
    badgeColor: "#059669",
    badgeBg: "#ECFDF5",
    cardBg: "#0596691A",
    borderColor: "#05966980",
    icon: TrendingUpIcon,
    iconColor: "#059669",
    iconBg: "#FFFFFF",
  },
  {
    label: "Outstanding Invoices",
    value: "£12,840",
    badge: "8 Pending",
    badgeColor: "#D97706",
    badgeBg: "#FEF3C7",
    cardBg: "#D977061A",
    borderColor: "#D9770680",
    icon: ReceiptOutlinedIcon,
    iconColor: "#D97706",
    iconBg: "#FFFFFF",
  },
  {
    label: "Payroll Summary",
    value: "£84,200",
    badge: "42 Staff",
    badgeColor: "#2563EB",
    badgeBg: "#DBEAFE",
    cardBg: "#2563EB1A",
    borderColor: "#2563EB80",
    icon: PeopleOutlinedIcon,
    iconColor: "#2563EB",
    iconBg: "#FFFFFF",
  },
  {
    label: "Pending Payments",
    value: "£4,250",
    badge: "Action Required",
    badgeColor: "#E11D48",
    badgeBg: "#FEE2E2",
    cardBg: "#E11D481A",
    borderColor: "#E11D4880",
    icon: AccountBalanceWalletOutlinedIcon,
    iconColor: "#EF4444",
    iconBg: "#FFFFFF",
  },
];

// ─── Recent Invoices ──────────────────────────────────────────────────────────
const RECENT_INVOICES = [
  {
    name: "Arthur Morgan",
    sub: "INV-2024-001 · Mar 01, 2024",
    amount: "£1,250.00",
    status: "PAID",
    statusColor: "#059669",
  },
  {
    name: "Sadie Adler",
    sub: "INV-2024-002 · Feb 28, 2024",
    amount: "£840.00",
    status: "SENT",
    statusColor: "#0EA5E9",
  },
  {
    name: "John Marston",
    sub: "INV-2024-003 · Feb 26, 2024",
    amount: "£2,100.00",
    status: "OVERDUE",
    statusColor: "#EF4444",
  },
  {
    name: "Charles Smith",
    sub: "INV-2024-004 · Feb 25, 2024",
    amount: "£950.00",
    status: "PAID",
    statusColor: "#059669",
  },
];

// ─── Quick Actions ────────────────────────────────────────────────────────────
const QUICK_ACTIONS = [
  {
    label: "Generate Invoices",
    desc: "Run billing for current period",
    icon: AddCircleOutlineIcon,
    color: "#0EA5E9",
    bg: "#FFFFFF",
    action: "generate",
  },
  {
    label: "Review Timesheets",
    desc: "Approve hours for payroll",
    icon: AccessTimeOutlinedIcon,
    color: "#D97706",
    bg: "#FFFFFF",
    action: "timesheets",
  },
  {
    label: "Export Reports",
    desc: "Download financial summaries",
    icon: FileDownloadOutlinedIcon,
    color: "#059669",
    bg: "#FFFFFF",
    action: "export",
  },
];

export default function OverviewTab({ onAction }) {
  return (
    <Box>
      {/* ── Stats Cards ── */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <Grid key={s.label} size={{ xs: 12, sm: 6, md: 3 }}>
              <Box
                sx={{
                  bgcolor: s.cardBg,
                  borderRadius: "20px",
                  border: "1px solid",
                  borderColor: s.borderColor,
                  p: 2.5,
                }}
              >
                {/* Top row: icon + badge */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: "10px",
                      bgcolor: s.iconBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon sx={{ color: s.iconColor, fontSize: 18 }} />
                  </Box>
                  <Box
                    sx={{
                      px: 1.5,
                      py: 0.4,
                      borderRadius: "20px",
                      bgcolor: "transparent",
                      color: s.badgeColor,
                      fontSize: "12px",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {s.badge}
                  </Box>
                </Box>

                {/* Label */}
                <Typography
                  fontSize="14px"
                  color="#64748B"
                  fontWeight={700}
                  mb={0.5}
                >
                  {s.label}
                </Typography>

                {/* Value */}
                <Typography
                  fontSize="24px"
                  fontWeight={700}
                  color="text.primary"
                >
                  {s.value}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>

      {/* ── Bottom Row ── */}
      <Grid container spacing={2}>
        {/* Recent Invoices */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Box
            sx={{
              bgcolor: "#E0F5FF",
              borderRadius: "20px",
              border: "1px solid #83D8FF",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 3,
                py: 2,
              }}
            >
              <Typography fontSize="16px" fontWeight={700} color="text.primary">
                Recent Invoices
              </Typography>
              <Typography
                fontSize="12px"
                fontWeight={700}
                color="#2563EB"
                sx={{ cursor: "pointer" }}
                onClick={() => onAction && onAction("viewAll")}
              >
                View All
              </Typography>
            </Box>

            {/* Rows */}
            {RECENT_INVOICES.map((inv, i) => (
              <Box
                key={inv.name}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 3,
                  py: 1.75,
                  bgcolor: "#E0F5FF",
                  borderTop: "1px solid rgba(255,255,255,0.8)",
                  cursor: "pointer",
                }}
              >
                {/* Left: doc icon + text */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "10px",
                      bgcolor: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <ArticleOutlinedIcon
                      sx={{ color: "#0EA5E9", fontSize: 18 }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      fontSize="14px"
                      fontWeight={700}
                      color="text.primary"
                    >
                      {inv.name}
                    </Typography>
                    <Typography
                      fontSize="12px"
                      color="text.light"
                      fontWeight={400}
                    >
                      {inv.sub}
                    </Typography>
                  </Box>
                </Box>

                {/* Right: amount + status */}
                <Box sx={{ textAlign: "right" }}>
                  <Typography
                    fontSize="14px"
                    fontWeight={700}
                    color="text.primary"
                    mb={0.5}
                  >
                    {inv.amount}
                  </Typography>
                  <Typography
                    fontSize="10px"
                    fontWeight={700}
                    color={inv.statusColor}
                  >
                    {inv.status}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Quick Actions */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Box
            sx={{
              bgcolor: "#8AC64233",
              borderRadius: "20px",
              border: "1px solid #8AC642",
              p: 3,
              // height: "100%",
            }}
          >
            <Typography
              fontSize="16px"
              fontWeight={700}
              color="text.primary"
              mb={2.5}
            >
              Quick Actions
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {QUICK_ACTIONS.map((qa) => {
                const QIcon = qa.icon;
                return (
                  <Box
                    key={qa.label}
                    onClick={() => onAction && onAction(qa.action)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      cursor: "pointer",
                    }}
                  >
                    <Box
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: "10px",
                        bgcolor: qa.bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <QIcon sx={{ color: qa.color, fontSize: 18 }} />
                    </Box>
                    <Box>
                      <Typography
                        fontSize="14px"
                        fontWeight={700}
                        color="text.primary"
                      >
                        {qa.label}
                      </Typography>
                      <Typography
                        fontSize="12px"
                        color="text.light"
                        fontWeight={400}
                      >
                        {qa.desc}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
