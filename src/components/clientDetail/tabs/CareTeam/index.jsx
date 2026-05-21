import React from "react";
import { Box, Typography, Avatar, Grid, Link } from "@mui/material";

const TEAM_MEMBERS = [
  {
    name: "Sarah Thompson",
    initials: "ST",
    role: "PRIMARY CARER",
    visits: 12,
    color: "text.light",
  },
  {
    name: "James Wilson",
    initials: "JW",
    role: "SUPPORT CARER",
    visits: 8,
    color: "text.light",
  },
  {
    name: "Alex Marshall",
    initials: "AM",
    role: "COORDINATOR",
    visits: 2,
    color: "text.light",
  },
];

const CareTeamCard = ({ member }) => (
  <Box
    sx={{
      bgcolor: "#fff",
      borderRadius: "16px",
      p: 2,
      display: "flex",
      alignItems: "center",
      gap: 1.5,
      boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.04)",
      position: "relative",
      minHeight: "75px",
    }}
  >
    <Avatar
      variant="rounded"
      sx={{
        width: 40,
        height: 40,
        borderRadius: "12px",
        bgcolor: member.color,
        fontSize: "20px",
        fontWeight: 700,
      }}
    >
      {member.initials}
    </Avatar>

    <Box sx={{ flex: 1 }}>
      <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 0.5 }}>
        <Typography
          fontWeight={700}
          fontSize="14px"
          color="text.primary"
          sx={{ whiteSpace: "nowrap" }}
        >
          {member.name}
        </Typography>
        <Typography
          fontWeight={700}
          fontSize="12px"
          color="text.primary"
          sx={{ whiteSpace: "nowrap" }}
        >
          {member.visits} Visits
        </Typography>
      </Box>
      <Typography
        fontWeight={700}
        fontSize="10px"
        color="#0EA5E9"
        sx={{ mt: 0.2, textTransform: "uppercase" }}
      >
        {member.role}
      </Typography>
    </Box>

    <Link
      href="#"
      underline="none"
      sx={{
        position: "absolute",
        bottom: 12,
        right: 16,
        fontSize: "10px",
        fontWeight: 700,
        color: "text.light",
      }}
    >
      PROFILE
    </Link>
  </Box>
);

export default function CareTeamTab({ client }) {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography fontWeight={700} fontSize="20px" color="text.primary">
          Care Team
        </Typography>
        <Typography fontSize="14px" color="text.light" sx={{ mt: 0.5 }}>
          Manage information and care delivery for{" "}
          {client?.name || "Margaret Hall"}.
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {TEAM_MEMBERS.map((member, index) => (
          <Grid size={{ xs: 6 }} key={index}>
            <CareTeamCard member={member} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
