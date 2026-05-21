import React from "react";
import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const bpData = [
  { date: "06 Mar", sys: 110, dia: 70 },
  { date: "07 Mar", sys: 115, dia: 75 },
  { date: "08 Mar", sys: 122, dia: 82 },
  { date: "09 Mar", sys: 125, dia: 80 },
  { date: "10 Mar", sys: 118, dia: 76 },
];

function StatCard({ title, value, sub }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: "12px",
        border: "1px solid #47556980",
        bgcolor: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: "10px",
          fontWeight: 700,
          textTransform: "uppercase",
          color: "text.secondary",
          letterSpacing: 0.5,
          mb: 1,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: 700,
          color: "text.primary",
          lineHeight: 1.1,
        }}
      >
        {value}
      </Typography>
      <Typography sx={{ fontSize: "12px", color: "text.secondary", mt: 0.5 }}>
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
                  icon: <LocalCafeIcon sx={{ fontSize: 16 }} />,
                },
                {
                  time: "01:00 PM",
                  title: "Lunch",
                  desc: "Grilled chicken, rice, and vegetables",
                  icon: <RestaurantMenuIcon sx={{ fontSize: 16 }} />,
                },
                {
                  time: "04:30 PM",
                  title: "Tea Time",
                  desc: "Tea with digestive biscuits and fruit",
                  icon: <LocalCafeIcon sx={{ fontSize: 16 }} />,
                },
                {
                  time: "07:30 PM",
                  title: "Dinner",
                  desc: "Vegetable soup and whole grain bread",
                  icon: <FastfoodIcon sx={{ fontSize: 16 }} />,
                },
              ].map((item, i) => (
                <Box
                  key={i}
                  sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}
                >
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
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
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "text.primary",
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
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E2E8F0"
                  />
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
                    domain={["dataMin - 10", "dataMax + 10"]}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                    labelStyle={{
                      fontWeight: 700,
                      fontSize: "12px",
                      color: "text.primary",
                      marginBottom: "4px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sys"
                    stroke="#0EA5E9"
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
                    activeDot={{ r: 6 }}
                    name="SYS"
                  />
                  <Line
                    type="monotone"
                    dataKey="dia"
                    stroke="#8AC642"
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
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
                  fontSize: "14px",
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
                  fontSize: "14px",
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
              <Typography sx={{ fontSize: "14px", color: "text.secondary" }}>
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
