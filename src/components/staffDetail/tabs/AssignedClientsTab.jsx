import React from "react";
import { Box, Typography } from "@mui/material";

export default function AssignedClientsTab({ staff }) {
  const clients = [
    { initial: "M", name: "Margaret Hall", details: "Personal Care • Daily" },
    { initial: "A", name: "Arthur Reed", details: "Medication • Tues / Thurs" },
    { initial: "E", name: "Emma Davis", details: "Domestic Help • Mon / Wed / Fri" },
  ];

  return (
    <Box>
      <Typography fontSize="20px" fontWeight={700} color="text.primary" mb={0.4}>
        Assigned Clients
      </Typography>
      <Typography fontSize="14px" color="text.light" mb={3.5}>
        Detailed information and settings for {staff.name}'s assigned clients.
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {clients.map((client, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "#fff",
              borderRadius: "12px",
              px: 3,
              py: 2.5,
            }}
          >
            <Typography
              sx={{
                width: 48,
                fontWeight: 700,
                fontSize: "14px",
                color: "text.primary",
              }}
            >
              {client.initial}
            </Typography>
            <Box>
              <Typography fontWeight={700} fontSize="14px" color="text.primary" mb={0.3}>
                {client.name}
              </Typography>
              <Typography fontSize="12px" color="text.secondary">
                {client.details}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
