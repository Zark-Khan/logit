import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { GradCard } from "./StaffCommon";
import plusIcon from "../../assets/plusIcon.svg";

export default function TrainingSummaryCard() {
  return (
    <GradCard
      gradient="linear-gradient(135deg, #8B5CF6 0%, #AC96FF 100%)"
      sx={{
        position: "relative",
        width: "100%",
      }}
    >
      {/* Left Content */}
      <Box>
        {/* Header + "VIEW ALL" */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3.95,
            width: "90%",
          }}
        >
          <Typography fontWeight={600} fontSize="20px">
            Training Summary
          </Typography>

          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 700,
              opacity: 0.85,
              color: "text.paper",
              cursor: "pointer",
              "&:hover": { opacity: 1 },
            }}
          >
            VIEW ALL
          </Typography>
        </Box>

        {/* Stats */}
        <Box sx={{ display: "flex", gap: 6, alignItems: "center" }}>
          {/* Expired / Required */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 4,
                bgcolor: "rgba(255,255,255,0.18)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AccessTimeOutlinedIcon sx={{ fontSize: 21 }} />
            </Box>
            <Box>
              <Typography
                sx={{ fontSize: "30px", fontWeight: 700, lineHeight: 1 }}
              >
                0
              </Typography>
              <Typography
                sx={{
                  fontSize: "10px",
                  color: "text.paper",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                Expired / Required
              </Typography>
            </Box>
          </Box>

          {/* Expiring Within 1 Month */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 4,
                bgcolor: "rgba(255,255,255,0.18)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AssignmentOutlinedIcon sx={{ fontSize: 21 }} />
            </Box>
            <Box>
              <Typography
                sx={{ fontSize: "30px", fontWeight: 700, lineHeight: 1 }}
              >
                0
              </Typography>
              <Typography
                sx={{
                  fontSize: "10px",
                  color: "text.paper",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                Expiring Within 1 Month
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Right IconButton */}
      <IconButton
        sx={{
          position: "absolute",
          right: 16,
          top: "50%",
          transform: "translateY(-50%)",
          bgcolor: "background.default",
          p: 2.37,
        }}
      >
        <img src={plusIcon} alt="" />
      </IconButton>
    </GradCard>
  );
}
