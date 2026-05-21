import React from "react";
import { Box, Typography } from "@mui/material";

const DetailCard = ({ label, value, sub, children, sx }) => (
  <Box
    sx={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "start",
      gap: 0.5,
      bgcolor: "#fff",
      borderRadius: "12px",
      minHeight: "72px",
      px: 2.5,
      py: 1.5,
      ...sx,
    }}
  >
    {label && (
      <Typography
        fontSize="10px"
        fontWeight={700}
        color="text.grey"
        textTransform="uppercase"
      >
        {label}
      </Typography>
    )}
    {value && (
      <Typography fontSize="14px" fontWeight={700} color="text.primary">
        {value}
      </Typography>
    )}
    {sub && (
      <Typography fontSize="10px" fontWeight={400} color="text.grey" mt={0.3}>
        {sub}
      </Typography>
    )}
    {children}
  </Box>
);

export default function PersonalDetailsTab({ staff }) {
  return (
    <Box>
      <Typography
        fontSize="20px"
        fontWeight={700}
        color="text.primary"
        mb={0.4}
      >
        Personal Details
      </Typography>
      <Typography fontSize="14px" color="text.light" mb={3.5}>
        Detailed information and settings for {staff.name}'s personal details.
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3.5 }}>
        {/* Top 4 Details */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <DetailCard label="Full Legal Name" value={staff.name} />
            <DetailCard label="Date of Birth" value="14 May 1988" />
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <DetailCard label="Primary Phone" value={staff.phone} />
            <DetailCard label="Email Address" value={staff.email} />
          </Box>
        </Box>

        {/* Residential Address */}
        <Box>
          <Typography
            fontSize="14px"
            fontWeight={700}
            color="text.primary"
            mb={1.5}
          >
            Residential Address
          </Typography>
          <DetailCard sx={{ minHeight: "auto", py: 2.5, gap: 0.3 }}>
            <Typography fontSize="14px" color="text.light">
              42 Willow Lane, Central District
            </Typography>
            <Typography fontSize="14px" color="text.light">
              London, E1 4PX
            </Typography>
            <Typography fontSize="14px" color="text.light">
              United Kingdom
            </Typography>
          </DetailCard>
        </Box>

        {/* Emergency Contact */}
        <Box>
          <Typography
            fontSize="14px"
            fontWeight={700}
            color="text.primary"
            mb={1.5}
          >
            Emergency Contact
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <DetailCard
              label="Contact Name"
              value="Robert Thompson"
              sub="Relationship: Husband"
            />
            <DetailCard label="Emergency Phone" value="+44 7700 900555" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
