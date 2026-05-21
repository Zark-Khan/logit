import React, { useState } from "react";
import {
  Dialog,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  Avatar,
  AvatarGroup,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const STAFF_LIST = [
  { id: 1, name: "Arthur Morgan", hours: "32h", initial: "A" },
  { id: 2, name: "Sadie Adler", hours: "32h", initial: "S" },
  { id: 3, name: "John Marston", hours: "32h", initial: "J" },
  { id: 4, name: "Charles Smith", hours: "32h", initial: "C" },
  { id: 5, name: "Bill Williamson", hours: "32h", initial: "B" },
  { id: 6, name: "Javier Escuella", hours: "32h", initial: "J" },
];

const SHIFTS = [
  { date: "Mar 01, 2024", desc: "Morning Shift • 80.0 Miles", hours: "8.0h", status: "PAID" },
  { date: "Mar 02, 2024", desc: "Afternoon Shift • 12.0 Miles", hours: "8.0h", status: "PAID" },
  { date: "Mar 03, 2024", desc: "Evening Shift • 15.0 Miles", hours: "8.0h", status: "PAID" },
];

const btnBase = {
  borderRadius: "16px",
  px: 3.5,
  py: 1.25,
  textTransform: "none",
  fontWeight: 700,
  fontSize: "14px",
  boxShadow: "none",
};

export default function ReviewTimesheetsModal({ open, onClose }) {
  const [activeId, setActiveId] = useState(1);
  const [success, setSuccess] = useState(false);

  const handleClose = () => {
    setSuccess(false);
    onClose();
  };

  const handleApproveAll = () => {
    setSuccess(true);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: success ? 448 : 896,
          borderRadius: "24px",
          boxShadow: "0 24px 48px -12px rgba(16,24,40,0.18)",
          overflow: "hidden",
          backgroundColor:"#F8FAFC4D !important"
        },
      }}
    >
      {success ? (
        /* ── Success State ── */
        <Box sx={{ p: 4, textAlign: "center", bgcolor: "#fff" }}>
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              bgcolor: "#D1FAE5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2.5,
            }}
          >
            <CheckCircleIcon sx={{ color: "#059669", fontSize: 36 }} />
          </Box>
          <Typography fontSize="24px" fontWeight={700} color="text.primary" mb={1}>
            Timesheets Approved!
          </Typography>
          <Typography fontSize="16px" color="text.grey" fontWeight={500} sx={{ mb: 4 }}>
            All staff timesheets have been successfully approved for payroll.
          </Typography>
          <Button
            onClick={handleClose}
            sx={{
              bgcolor: "#0EA5E9",
              color: "#fff",
              borderRadius: "16px",
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontWeight: 700,
              fontSize: "16px",
              "&:hover": { bgcolor: "#0284C7" },
            }}
          >
            Go to Payroll
          </Button>
        </Box>
      ) : (
        <>
          {/* ── Header ── */}
          <Box sx={{ px: 3, pt: 3, pb: 2.5, bgcolor: "#fff", borderBottom: "1px solid #F1F5F9" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "12px",
                    bgcolor: "#D1FAE5", // light green
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AccessTimeIcon sx={{ color: "#059669", fontSize: 22 }} />
                </Box>
                <Box>
                  <Typography fontSize="20px" fontWeight={700} color="text.primary">
                    Review Timesheets
                  </Typography>
                  <Typography fontSize="14px" color="text.light" fontWeight={400}>
                    Approve or reject staff hours for the current payroll cycle
                  </Typography>
                </Box>
              </Box>
              <IconButton size="small" onClick={handleClose} sx={{ color: "text.grey" }}>
                <CloseIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Box>
          </Box>

          {/* ── Body (2 Columns) ── */}
          <Box sx={{ display: "flex", height: 540, bgcolor: "#fff" }}>
            
            {/* Left Sidebar */}
            <Box
              sx={{
                width: 280,
                borderRight: "1px solid #F1F5F9",
                display: "flex",
                flexDirection: "column",
                bgcolor: "#fff",
              }}
            >
              <Typography
                fontSize="12px"
                fontWeight={700}
                color="#94A3B8"
                sx={{ textTransform: "uppercase", letterSpacing: "0.06em", px: 3, pt: 3, pb: 1.5 }}
              >
                Pending Review
              </Typography>
              
              {/* Staff List */}
              <Box sx={{ flex: 1, overflowY: "auto", px: 2 }}>
                {STAFF_LIST.map((staff) => {
                  const isActive = activeId === staff.id;
                  return (
                    <Box
                      key={staff.id}
                      onClick={() => setActiveId(staff.id)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 1.5,
                        mb: 0.5,
                        borderRadius: "12px",
                        bgcolor: isActive ? "#EFF6FF" : "transparent",
                        cursor: "pointer",
                        border: isActive && "1px solid #DBEAFE",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            bgcolor: isActive ? "#fff" : "#F1F5F9",
                            color: "text.primary",
                            fontSize: "12px",
                            fontWeight: 700,
                           
                          }}
                        >
                          {staff.initial}
                        </Avatar>
                        <Box>
                          <Typography fontSize="14px" fontWeight={700} color="text.primary">
                            {staff.name}
                          </Typography>
                          <Typography fontSize="12px" color="text.light" fontWeight={500}>
                            {staff.hours}
                          </Typography>
                        </Box>
                      </Box>
                      <KeyboardArrowRightIcon
                        sx={{ color: isActive ? "#2563EB" : "#CBD5E1", fontSize: 18 }}
                      />
                    </Box>
                  );
                })}
              </Box>

              {/* Bottom Info */}
              <Box sx={{ p: 2, borderTop: "1px solid #F1F5F9", display: "flex", alignItems: "center", gap: 1.5 }}>
                <AvatarGroup max={3} sx={{ "& .MuiAvatar-root": { width: 32, height: 32, fontSize: "10px" } }}>
                  <Avatar sx={{ bgcolor: "#F1F5F9", color: "#64748B" }}>T</Avatar>
                  <Avatar sx={{ bgcolor: "#F1F5F9", color: "#64748B" }}>M</Avatar>
                  <Avatar sx={{ bgcolor: "#F1F5F9", color: "#64748B" }}>S</Avatar>
                </AvatarGroup>
                <Typography fontSize="12px" color="text.grey" fontWeight={500}>
                  +3 staff members pending review
                </Typography>
              </Box>
            </Box>

            {/* Right Content */}
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", bgcolor: "#fff" }}>
              <Box sx={{ flex: 1, overflowY: "auto", p: 4 }}>
                
                {/* Profile Header */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      sx={{
                        width: 64,
                        height: 64,
                        bgcolor: "#FFFFFF",
                        color: "text.grey",
                        fontSize: "24px",
                        fontWeight: 700,
                        border: "1px solid #F1F5F9",
                         borderRadius: "16px",
                      }}
                    >
                      A
                    </Avatar>
                    <Box>
                      <Typography fontSize="24px" fontWeight={700} color="text.primary">
                        Arthur Morgan
                      </Typography>
                      <Typography fontSize="14px" color="text.grey" fontWeight={500}>
                        Senior Carer • Central Branch
                      </Typography>
                    </Box>
                  </Box>
                  
                  {/* Action Buttons */}
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center"   }}>
                    <IconButton
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "10px",
                        bgcolor: "#FEF2F2",
                        color: "#EF4444",
                        "&:hover": { bgcolor: "#FEE2E2" },
                      }}
                    >
                      <ClearIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                    <IconButton
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "10px",
                        bgcolor: "#ECFDF5",
                        color: "#10B981",
                        "&:hover": { bgcolor: "#D1FAE5" },
                      }}
                    >
                      <CheckIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                  </Box>
                </Box>

                {/* Stats Row */}
                <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
                  <Box sx={{ flex: 1, p: 2.5, borderRadius: "24px", border: "1px solid #F1F5F9", bgcolor: "#fff" }}>
                    <Typography fontSize="10px" fontWeight={700} color="text.grey" sx={{ textTransform: "uppercase", letterSpacing: "0.06em", mb: 0.5 }}>
                      Total Hours
                    </Typography>
                    <Typography fontSize="20px" fontWeight={700} color="text.primary">
                      240.0h
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1, p: 2.5, borderRadius: "24px", border: "1px solid #F1F5F9", bgcolor: "#fff" }}>
                    <Typography fontSize="10px" fontWeight={700} color="text.grey" sx={{ textTransform: "uppercase", letterSpacing: "0.06em", mb: 0.5 }}>
                      Overtime
                    </Typography>
                    <Typography fontSize="20px" fontWeight={700} color="#059669">
                      12.5h
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1, p: 2.5, borderRadius: "24px", border: "1px solid #F1F5F9", bgcolor: "#fff" }}>
                    <Typography fontSize="10px" fontWeight={700} color="text.grey" sx={{ textTransform: "uppercase", letterSpacing: "0.06em", mb: 0.5 }}>
                      Gross Pay
                    </Typography>
                    <Typography fontSize="20px" fontWeight={700} color="text.primary">
                      £2,840.00
                    </Typography>
                  </Box>
                </Box>
                      <Box sx={{border: "1px solid #F1F5F9",bgcolor:"#fff",borderRadius:"24px",p:2.5}}>

                {/* Shift Breakdown */}
                <Typography fontSize="12px" fontWeight={700} color="#64748B" sx={{ textTransform: "uppercase", letterSpacing: "0.06em", mb: 2 }}>
                  Shift Breakdown
                </Typography>
                
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                  {SHIFTS.map((s, i) => (
                    <Box
                      key={i}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        py: 1,
                        borderBottom: i === SHIFTS.length - 1 ? "none" : "1px solid #F8FAFC",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: "10px",
                            bgcolor: "#F8FAFC",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <InsertDriveFileOutlinedIcon sx={{ color: "#94A3B8", fontSize: 18 }} />
                        </Box>
                        <Box>
                          <Typography fontSize="14px" fontWeight={700} color="text.primary">
                            {s.date}
                          </Typography>
                          <Typography fontSize="12px" color="text.light" fontWeight={500}>
                            {s.desc}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ textAlign: "right" }}>
                        <Typography fontSize="14px" fontWeight={700} color="text.primary" mb={0.25}>
                          {s.hours}
                        </Typography>
                        <Typography fontSize="10px" fontWeight={700} color="#10B981" sx={{ letterSpacing: "0.05em" }}>
                          {s.status}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
                </Box>
              </Box>

              {/* Footer Button inside Right Content */}
              <Box sx={{ p: 3, borderTop: "1px solid #F1F5F9", display: "flex", justifyContent: "flex-end", bgcolor: "#fff" }}>
                <Button
                  onClick={handleApproveAll}
                  startIcon={<CheckCircleOutlineIcon />}
                  sx={{
                    ...btnBase,
                    bgcolor: "#0EA5E9",
                    color: "#fff",
                    "&:hover": { bgcolor: "#0284C7" },
                  }}
                >
                  Approve all (42)
                </Button>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Dialog>
  );
}
