import React from "react";
import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import BreakfastDiningOutlinedIcon from "@mui/icons-material/BreakfastDiningOutlined";
import RiceBowlOutlinedIcon from "@mui/icons-material/RiceBowlOutlined";
import EmojiFoodBeverageOutlinedIcon from "@mui/icons-material/EmojiFoodBeverageOutlined";
import DinnerDiningOutlinedIcon from "@mui/icons-material/DinnerDiningOutlined";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const bpData = [
  { date: "06 Mar", time: "09:05 AM", sys: 118, dia: 76 },
  { date: "07 Mar", time: "09:15 AM", sys: 122, dia: 82 },
  { date: "08 Mar", time: "09:10 AM", sys: 120, dia: 80 },
  { date: "09 Mar", time: "09:20 AM", sys: 124, dia: 84 },
  { date: "10 Mar", time: "09:00 AM", sys: 121, dia: 79 },
];

const SYS_COLOR = "#0EA5E9";
const DIA_COLOR = "#8AC642";

function BpTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { date, time, sys, dia } = payload[0].payload;
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 16px rgba(15,23,42,0.12)",
        px: 1.5,
        py: 1.25,
      }}
    >
      <Typography fontSize="9px" fontWeight={600} color="text.light">
        {date.toUpperCase()} • {time}
      </Typography>
      <Typography
        fontSize="12px"
        fontWeight={700}
        color="text.primary"
        my={0.5}
      >
        BP: {sys} / {dia}
      </Typography>
      <Box sx={{ display: "flex", gap: 1.5 }}>
        {[
          { label: "SYS", color: SYS_COLOR },
          { label: "DIA", color: DIA_COLOR },
        ].map((l) => (
          <Box
            key={l.label}
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          >
            <Box
              sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: l.color }}
            />
            <Typography fontSize="9px" fontWeight={600} color="text.secondary">
              {l.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function StatCard({ title, value, sub }) {
  return (
    <Paper
      elevation={0}
      sx={{
        px: 1.5,
        py: 1.5,
        borderRadius: "8px",
        border: "1px solid #0EA5E9",
        bgcolor: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: "9px",
          fontWeight: 700,
          textTransform: "uppercase",
          color: "text.primary",
          letterSpacing: 0.5,
          mb: 0.75,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: 700,
          color: "#0EA5E9",
          lineHeight: 1.2,
        }}
      >
        {value}
      </Typography>
      <Typography sx={{ fontSize: "10px", color: "text.secondary", mt: 0.5 }}>
        {sub}
      </Typography>
    </Paper>
  );
}

export default function ClientOverviewTab({ client }) {
  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} color="text.primary">
          Overview
        </Typography>
        <Typography fontSize="14px" color="text.secondary" sx={{ mt: 0.3 }}>
          Manage information and care delivery for {client.name}.
        </Typography>
      </Box>

      {/* Row 1: Stat Cards */}
      <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard
            title="Weekly Care Hours"
            value="18.5h"
            sub="Standard Plan"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard
            title="Total Visits (MTD)"
            value="42"
            sub="100% attendance"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard
            title="Current Risk Level"
            value="Low"
            sub="Last assessed: 2 days ago"
          />
        </Grid>
      </Grid>

      {/* Row 2: Daily Food & BP Health Tracker */}
      <Grid container spacing={2.5} sx={{ mb: 2.5, alignItems: "stretch" }}>
        {/* Daily Food */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: "15px", mb: 2 }}>
            Daily Food
          </Typography>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "16px",
              border: "1px solid #FEA40080",
              bgcolor: "#fff",
              width: "100%",
              flex: 1,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3.5 }}>
              {[
                {
                  time: "08:30 AM",
                  title: "Breakfast",
                  desc: "Oatmeal with banana and tea",
                  icon: <BreakfastDiningOutlinedIcon sx={{ fontSize: 18 }} />,
                },
                {
                  time: "01:00 PM",
                  title: "Lunch",
                  desc: "Grilled chicken, rice, and vegetables",
                  icon: <RiceBowlOutlinedIcon sx={{ fontSize: 18 }} />,
                },
                {
                  time: "04:30 PM",
                  title: "Tea Time",
                  desc: "Tea with digestive biscuits and fruit",
                  icon: <EmojiFoodBeverageOutlinedIcon sx={{ fontSize: 18 }} />,
                },
                {
                  time: "07:30 PM",
                  title: "Dinner",
                  desc: "Vegetable soup and whole grain bread",
                  icon: <DinnerDiningOutlinedIcon sx={{ fontSize: 18 }} />,
                },
              ].map((item, i) => (
                <Box
                  key={i}
                  sx={{ display: "flex", alignItems: "center", gap: 2 }}
                >
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      flexShrink: 0,
                      bgcolor: "rgba(249, 115, 22, 0.1)",
                      color: "#F97316",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "14px",
                        color: "text.primary",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "text.secondary",
                        mt: 0.2,
                      }}
                    >
                      {item.desc}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "text.primary",
                      alignSelf: "flex-start",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.time}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* BP Health Tracker */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: "15px", mb: 2 }}>
            BP Health Tracker
          </Typography>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "16px",
              border: "1px solid #8AC642",
              bgcolor: "#fff",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <Box sx={{ flexGrow: 1, minHeight: 250, width: "100%" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={bpData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#94A3B8", fontWeight: 600 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#94A3B8", fontWeight: 600 }}
                    domain={[60, 150]}
                    ticks={[65, 85, 105, 125, 145]}
                  />
                  <Tooltip
                    content={<BpTooltip />}
                    cursor={{ stroke: "#CBD5E1", strokeWidth: 1 }}
                    defaultIndex={1}
                  />
                  <Line
                    type="monotone"
                    dataKey="sys"
                    stroke={SYS_COLOR}
                    strokeWidth={2}
                    dot={{ r: 3.5, strokeWidth: 0, fill: SYS_COLOR }}
                    activeDot={{ r: 5, strokeWidth: 0 }}
                    name="SYS"
                  />
                  <Line
                    type="monotone"
                    dataKey="dia"
                    stroke={DIA_COLOR}
                    strokeWidth={2}
                    dot={{ r: 3.5, strokeWidth: 0, fill: DIA_COLOR }}
                    activeDot={{ r: 5, strokeWidth: 0 }}
                    name="DIA"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Row 3: Care Summary & Next Scheduled Event */}
      <Grid container spacing={2.5}>
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: "15px", mb: 2 }}>
            Care Summary
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: "12px",
                border: "1px solid #8AC642",
                bgcolor: "#fff",
              }}
            >
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#528910",
                  mb: 1,
                }}
              >
                Carer - Sarah Thompson
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "text.secondary",
                  lineHeight: 1.6,
                }}
              >
                Margaret is currently receiving daily morning and evening
                personal care support. Her primary goals are maintaining
                independence at home and managing mobility safely. No active
                incidents in the last 30 days.
              </Typography>
              <Typography
                sx={{
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "text.primary",
                  mt: 1.5,
                  textAlign: "right",
                }}
              >
                12 January, 2026
              </Typography>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: "12px",
                border: "1px solid #8AC642",
                bgcolor: "#fff",
              }}
            >
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#528910",
                  mb: 1,
                }}
              >
                Carer - James Wilson
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "text.secondary",
                  lineHeight: 1.6,
                }}
              >
                Margaret is currently receiving daily morning and evening
                personal care support. Her primary goals are maintaining
                independence at home and managing mobility safely. No active
                incidents in the last 30 days.
              </Typography>
              <Typography
                sx={{
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "text.primary",
                  mt: 1.5,
                  textAlign: "right",
                }}
              >
                12 February, 2026
              </Typography>
            </Paper>
          </Box>
        </Grid>

        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: "15px", mb: 2 }}>
            Next Scheduled Event
          </Typography>

          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: "12px",
              border: "1px solid #0EA5E9",
              bgcolor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#0EA5E9",
                  mb: 0.5,
                }}
              >
                Today, 14:00
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "text.secondary" }}>
                Morning Routine + Medication
              </Typography>
            </Box>
            <Button
              size="small"
              sx={{
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                color: "#0EA5E9",
                whiteSpace: "nowrap",
              }}
            >
              View Visit
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
