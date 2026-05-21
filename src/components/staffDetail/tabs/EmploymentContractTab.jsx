import React from "react";
import { Box, Typography, Button, Chip } from "@mui/material";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";

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

export default function EmploymentContractTab({ staff }) {
  return (
    <Box>
      <Typography
        fontSize="20px"
        fontWeight={700}
        color="text.primary"
        mb={0.4}
      >
        Employment & Contract
      </Typography>
      <Typography fontSize="14px" color="text.light" mb={3.5}>
        Detailed information and settings for {staff.name}'s employment &
        contract.
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3.5 }}>
        {/* Top 4 Details */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <DetailCard label="Current Role" value={staff.role || "Carer"} />
            <DetailCard label="Contract Type" value="Permanent Full-Time" />
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <DetailCard label="Base Pay Rate" value="£16.50 / hour" />
            <DetailCard label="Overtime Rule" value="1.5x after 40h" />
          </Box>
        </Box>

        {/* Employment Documents */}
        <Box>
          <Typography
            fontSize="14px"
            fontWeight={700}
            color="text.primary"
            mb={1.5}
          >
            Employment Documents
          </Typography>
          <DetailCard
            sx={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              py: 2.5,
              px: { xs: 2, sm: 3 },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
              <InsertDriveFileOutlinedIcon
                sx={{ color: "#94A3B8", fontSize: "20px" }}
              />
              <Box>
                <Typography
                  fontSize="14px"
                  fontWeight={700}
                  color="text.primary"
                >
                  Signed Employment Contract
                </Typography>
                <Typography fontSize="12px" color="text.light" mt={0.1}>
                  Expires: N/A
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
              <Chip
                label="VALID"
                size="small"
                sx={{
                  bgcolor: "#DCFCE7",
                  color: "#166534",
                  fontWeight: 700,
                  fontSize: "10px",
                  height: 22,
                  borderRadius: "6px",
                  px: 0.5,
                }}
              />
              <Button
                sx={{
                  color: "#0EA5E9",
                  fontWeight: 700,
                  fontSize: "12px",
                  textTransform: "uppercase",
                  minWidth: "auto",
                  letterSpacing: "0.02em",
                  p: 0,
                  "&:hover": { bgcolor: "transparent", color: "#0284c7" },
                }}
              >
                Upload New
              </Button>
            </Box>
          </DetailCard>
        </Box>
      </Box>
    </Box>
  );
}
