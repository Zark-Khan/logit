import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Drawer,
  Divider,
  Paper,
  Avatar,
  Button,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";

export default function CarePlanDetailDrawer({ open, onClose, plan }) {
  if (!plan) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 672 },
          p: 0,
          backgroundColor: "#f8fafc",
          overflow: "hidden",
          zIndex: 1301,
        },
      }}
      sx={{ zIndex: 1301 }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Header */}
        <Box
          sx={{
            p: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "#fff",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              sx={{
                width: 48,
                height: 48,
                bgcolor: "#F1F5F9",
                color: "text.grey",
                fontSize: "14px",
                fontWeight: 700,
                borderRadius: "16px",
              }}
            >
              {plan.initials}
            </Avatar>
            <Box>
              <Typography fontSize="20px" fontWeight={700} color="text.primary">
                {plan.name}
              </Typography>
              <Typography fontSize="12px" color="text.grey" fontWeight={500}>
                Care Plan Ref: CP-001
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton size="small" sx={{ color: "text.grey" }}>
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={onClose}
              size="small"
              sx={{ color: "text.grey" }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Divider sx={{ borderColor: "#F1F5F9" }} />

        {/* Content Area */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* Status and Risk Cards */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Paper
              elevation={0}
              sx={{
                flex: 1,
                p: 2,
                borderRadius: "24px",
                border: "1px solid #F1F5F9",
                bgcolor: "#fff",
              }}
            >
              <Typography
                fontSize="10px"
                fontWeight={700}
                color="text.grey"
                mb={1}
              >
                PLAN STATUS
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "#10B981",
                  }}
                />
                <Typography
                  fontSize="14px"
                  fontWeight={700}
                  color="text.primary"
                >
                  Active
                </Typography>
              </Box>
            </Paper>
            <Paper
              elevation={0}
              sx={{
                flex: 1,
                p: 2,
                borderRadius: "24px",
                border: "1px solid #F1F5F9",
                bgcolor: "#fff",
              }}
            >
              <Typography
                fontSize="10px"
                fontWeight={700}
                color="text.grey"
                mb={1}
              >
                RISK LEVEL
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <GppMaybeOutlinedIcon sx={{ color: "#D97706", fontSize: 18 }} />
                <Typography
                  fontSize="14px"
                  fontWeight={700}
                  color="text.primary"
                >
                  Medium Risk
                </Typography>
              </Box>
            </Paper>
          </Box>

          {/* Section: Care Goals */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: "24px",
              border: "1px solid #F1F5F9",
              bgcolor: "#fff",
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}
            >
              <FlagOutlinedIcon sx={{ color: "#2563EB", fontSize: 20 }} />
              <Typography fontSize="16px" fontWeight={700} color="text.primary">
                Care Goals (4)
              </Typography>
            </Box>
            <Stack spacing={1.5}>
              {[1, 2, 3, 4].map((i) => (
                <Box key={i}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      borderRadius: "12px",
                      border: "1px solid #F8FAFC",
                      bgcolor: "#F8FAFC4D",
                      p: 2,
                    }}
                  >
                    <Typography
                      fontSize="10px"
                      fontWeight={700}
                      color="#94A3B8"
                      width={24}
                      height={24}
                      textAlign="center"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        borderRadius: "8px",
                        border: "1px solid #F8FAFC",
                        bgcolor: "#FFFFFF",
                        boxShadow:
                          "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      }}
                    >
                      {i}
                    </Typography>
                    <Box>
                      <Typography
                        fontSize="14px"
                        fontWeight={500}
                        color="text.primary"
                        sx={{ mb: 1, lineHeight: 1.5 }}
                      >
                        Improve mobility and independence in daily activities
                        through consistent support and encouragement.
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Typography
                          fontSize="10px"
                          fontWeight={700}
                          color="#94A3B8"
                        >
                          PRIORITY:
                        </Typography>
                        <Box
                          sx={{
                            px: 1,
                            py: 0.2,
                            bgcolor: "#EFF6FF",
                            color: "#2563EB",
                            borderRadius: "4px",
                            fontSize: "10px",
                            fontWeight: 700,
                          }}
                        >
                          Medium
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Paper>

          {/* Section: Daily Routine & Tasks */}
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: "24px",
              border: "1px solid #F1F5F9",
              bgcolor: "#fff",
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}
            >
              <ListAltOutlinedIcon sx={{ color: "#10B981", fontSize: 20 }} />
              <Typography fontSize="16px" fontWeight={700} color="text.primary">
                Daily Routine & Tasks (12)
              </Typography>
            </Box>
            <Box>
              {["MORNING", "LUNCH", "BEDTIME"].map((time, idx) => (
                <Box key={time} sx={{ mt: idx === 0 ? 0 : 3 }}>
                  <Typography
                    fontSize="10px"
                    fontWeight={700}
                    color="text.grey"
                    mb={2}
                    sx={{ letterSpacing: "0.05em" }}
                  >
                    {time}
                  </Typography>
                  <Stack spacing={3}>
                    {[1, 2, 3, 4].map((t) => (
                      <Box
                        key={t}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                          }}
                        >
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              bgcolor: "#10B981",
                            }}
                          />
                          <Typography
                            fontSize="14px"
                            fontWeight={500}
                            color="text.primary"
                          >
                            Personal care and grooming support
                          </Typography>
                        </Box>
                        <Typography fontSize="10px" color="text.grey">
                          Daily
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              ))}
            </Box>
          </Paper>

          {/* Section: Risk Mitigation */}
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: "24px",
              border: "1px solid #F1F5F9",
              bgcolor: "#fff",
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}
            >
              <GppMaybeOutlinedIcon sx={{ color: "#E11D48", fontSize: 20 }} />
              <Typography fontSize="16px" fontWeight={700} color="text.primary">
                Risk Mitigation Strategies
              </Typography>
            </Box>
            <Box
              p={2}
              borderRadius={"24px"}
              border={"1px solid #FFE4E6"}
              bgcolor={"#FFF1F24D"}
            >
              <Typography
                fontSize="14px"
                color="#475569"
                sx={{ lineHeight: 1.7 }}
              >
                Client has a history of falls. Ensure all walking aids are
                within reach and the environment is clear of hazards. Carer to
                provide standby assistance during transfers.
              </Typography>
            </Box>
          </Paper>

          {/* Section: Review History */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: "24px",
              border: "1px solid #F1F5F9",
              bgcolor: "#fff",
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}
            >
              <HistoryOutlinedIcon sx={{ color: "#8B5CF6", fontSize: 20 }} />
              <Typography fontSize="16px" fontWeight={700} color="text.primary">
                Review History
              </Typography>
            </Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1.5,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      bgcolor: "#94A3B8",
                    }}
                  />
                  <Typography
                    fontSize="12px"
                    fontWeight={500}
                    color="text.grey"
                  >
                    Last Review
                  </Typography>
                </Box>
                <Typography
                  fontSize="12px"
                  fontWeight={700}
                  color="text.primary"
                >
                  01 Sep 2025
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      bgcolor: "#2563EB",
                    }}
                  />
                  <Typography
                    fontSize="12px"
                    fontWeight={500}
                    color="text.grey"
                  >
                    Next Review Due
                  </Typography>
                </Box>
                <Typography fontSize="12px" fontWeight={700} color="#2563EB">
                  15 Mar 2026
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Footer */}
        <Box sx={{ p: 3, borderTop: "1px solid #F1F5F9", bgcolor: "#fff" }}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<PictureAsPdfOutlinedIcon />}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              bgcolor: "#0EA5E9",
              color: "#fff",
              fontWeight: 700,
              fontSize: "16px",
              py: 1.5,
              boxShadow: "none",
              "&:hover": { bgcolor: "#0284C7" },
            }}
          >
            Export PDF
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
