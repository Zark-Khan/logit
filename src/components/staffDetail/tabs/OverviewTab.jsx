import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const StatCard = ({ label, value, sub, subColor }) => (
  <Box
    sx={{
      flex: 1,
      // minWidth: 120,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "start",
      gap: 0.5,
      bgcolor: "#fff",
      border: "1px solid #F1F5F9",
      borderRadius: "12px",
      px: 2,
      py: 1.5,
    }}
  >
    <Typography
      fontSize="10px"
      fontWeight={700}
      color="text.grey"
      textTransform="uppercase"
    >
      {label}
    </Typography>
    <Typography fontSize="14px" fontWeight={700} color="text.primary">
      {value}
    </Typography>
    {sub && (
      <Typography fontSize="10px" fontWeight={400} color="text.grey" mt={0.3}>
        {sub}
      </Typography>
    )}
  </Box>
);

export default function OverviewTab({ staff }) {
  return (
    <Box>
      <Typography
        fontSize="20px"
        fontWeight={700}
        color="text.primary"
        mb={0.4}
      >
        Overview
      </Typography>
      <Typography fontSize="14px" color="text.light" mb={3.5}>
        Detailed information and settings for {staff.name}'s overview.
      </Typography>

      {/* Stat cards row */}
      <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", mb: 2.5 }}>
        <StatCard
          label="Hours Worked (MTD)"
          value="142.5"
          sub="+26 vs last month"
        />
        <StatCard
          label="Compliance Rating"
          value="98%"
          sub="Status: Excellent"
        />
        <StatCard
          label="Reliability Score"
          value="4.9"
          sub="Based on 62 visits"
        />
      </Box>

      {/* Summary info + Quick View */}
      <Box
        sx={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}
      >
        {/* Summary Info */}
        <Box
          sx={{
            px: 2.5,
            py: 2,
            flex: 1,
          }}
        >
          <Typography
            fontSize="14px"
            fontWeight={700}
            color="text.secondary"
            textTransform="uppercase"
            letterSpacing="0.06em"
            mb={1.5}
          >
            Summary Info
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
            }}
          >
            <Box>
              <Typography fontSize="12px" color="text.light" mb={0.3}>
                Joined Date
              </Typography>
              <Typography fontSize="12px" fontWeight={700} color="text.primary">
                2022-01-12
              </Typography>
            </Box>
            <Box>
              <Typography fontSize="12px" color="text.light" mb={0.3}>
                Branch
              </Typography>
              <Typography fontSize="12px" fontWeight={700} color="text.primary">
                Central
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Today's Quick View */}
        <Box
          sx={{
            flex: 1,
            bgcolor: "#fff",
            border: "1px solid #E0F2FE",
            borderRadius: "16px",
            px: 2.5,
            py: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
            gap: 0.5,
          }}
        >
          <Typography
            fontSize="12px"
            fontWeight={700}
            color="primary.main"
            textTransform="uppercase"
          >
            Today's Quick View
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
            <AccessTimeIcon sx={{ fontSize: 13, color: "#0EA5E9" }} />
            <Typography fontSize="14px" fontWeight={700} color="text.primary">
              Shift: 14:00 – 18:00
            </Typography>
          </Box>
          <Typography fontSize="12px" color="text.light">
            Client: Margaret Hill (Central Area)
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
