import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  Legend, ResponsiveContainer,
} from "recharts";

const METRICS = [
  { label: "Active Carers",  value: "42"   },
  { label: "Active Clients", value: "156"  },
  { label: "Required Hrs",   value: "2.8k" },
  { label: "Booked Hrs",     value: "2.5k" },
];

const HOURS_DATA = [
  { day: "Mon", required: 48, booked: 42 },
  { day: "Tue", required: 52, booked: 50 },
  { day: "Wed", required: 45, booked: 40 },
  { day: "Thu", required: 58, booked: 54 },
  { day: "Fri", required: 50, booked: 48 },
  { day: "Sat", required: 35, booked: 30 },
  { day: "Sun", removed: 30, booked: 28 },
];

export default function BusinessSnapshot() {
  return (
    <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: "1px solid #D9E8FC", height: "100%", backgroundColor:"#D9E8FC38" }}>
      <Typography variant="h6" fontWeight={700} mb={2}>Business Snapshot</Typography>

      {/* Metric cards grid */}
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5, mb: 1.5 }}>
        {METRICS.map(({ label, value }) => (
          <Box
            key={label}
            sx={{
              p: 1.5, borderRadius: 2, border: "1px solid #D2D9E3", backgroundColor:"#9CA3AF1A"
            }}
          >
            <Typography color="text.light"
              sx={{ fontSize: "10px", textTransform: "uppercase", fontWeight: 700, mb: 0.3 }}>
              {label}
            </Typography>
            <Typography sx={{fontSize:"24px"}} fontWeight={700} color="text.primary">
              {value}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Hours Delivery chart */}
      <Typography variant="body2" fontWeight={600}
        sx={{ textTransform: "uppercase",  mb: 1, color: "text.primary", textAlign:"center" }}>
        Hours Delivery
      </Typography>

      <ResponsiveContainer width="100%" height={204}>
              <BarChart data={HOURS_DATA} barSize={18} barGap={3}>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#84919A" }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "1px solid #E9EDF0", fontSize: 12 }}
                  cursor={{ fill: "rgba(14,165,233,0.05)" }}
                />
                <Legend
                  iconType="square"
                  iconSize={8}
                  wrapperStyle={{ fontSize: 10 }}
                />
                <Bar dataKey="booked"   name="Booked"   fill="#0EA5E9" radius={[3, 3, 0, 0]} />
                <Bar dataKey="required" name="Required" fill="#C4CEDC" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
    </Paper>
  );
}
