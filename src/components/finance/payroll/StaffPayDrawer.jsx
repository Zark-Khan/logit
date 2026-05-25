import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Avatar,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

function SectionHeader({ children }) {
  return (
    <Typography
      fontSize="12px"
      fontWeight={700}
      color="#475569"
      sx={{ mb: 2, letterSpacing: "0.05em", textTransform: "uppercase" }}
    >
      {children}
    </Typography>
  );
}

export default function StaffPayDrawer({
  open,
  onClose,
  staffRecord,
  onApprove,
}) {
  const [localStaff, setLocalStaff] = React.useState(null);

  React.useEffect(() => {
    if (staffRecord) {
      setLocalStaff(staffRecord);
    }
  }, [staffRecord]);

  const displayStaff = staffRecord || localStaff;

  if (!displayStaff) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 672 },
          p: 0,
          backgroundColor: "#fff",
          overflow: "hidden",
          zIndex: 1301,
          boxShadow: "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
        },
      }}
      sx={{ zIndex: 1301 }}
    >
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Box
          sx={{
            px: 4,
            py: 3,
            bgcolor: "#fff",
            borderBottom: "1px solid #F1F5F9",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                borderRadius: "16px",
                bgcolor: "#EFF6FF",
                color: "#2563EB",
                fontSize: "24px",
                fontWeight: 700,
              }}
            >
              {displayStaff.name[0]}
            </Avatar>
            <Box>
              <Typography
                fontSize="20px"
                fontWeight={700}
                color="text.primary"
                sx={{ lineHeight: 1.2, mb: 0.5 }}
              >
                {displayStaff.name}
              </Typography>
              <Typography fontSize="14px" fontWeight={400} color="text.light">
                {displayStaff.role} • Central Branch
              </Typography>
            </Box>
          </Box>
          <IconButton
            onClick={onClose}
            sx={{
              bgcolor: "#fff",
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
              p: 1,
              color: "#64748B",
              "&:hover": { bgcolor: "#F8FAFC" },
            }}
          >
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>

        {/* Content */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            px: 4,
            py: 4,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {/* Status & Amount Banner */}
          <Box
            sx={{
              p: 2.5,
              borderRadius: "16px",
              bgcolor: "#ECFDF5",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid #D1FAE5",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <CheckCircleOutlineIcon sx={{ color: "#10B981", fontSize: 24 }} />
              <Box>
                <Typography
                  fontSize="14px"
                  fontWeight={700}
                  color="#065F46"
                  letterSpacing="0.05em"
                >
                  {displayStaff.status === "APPROVED"
                    ? "PAYROLL APPROVED"
                    : "PAYROLL PENDING"}
                </Typography>
                <Typography fontSize="12px" color="#065F46" fontWeight={400}>
                  {displayStaff.status === "APPROVED"
                    ? "Ready for disbursement"
                    : "Requires review"}
                </Typography>
              </Box>
            </Box>
            <Typography fontSize="24px" fontWeight={700} color="#065F46">
              {displayStaff.grossPay}
            </Typography>
          </Box>

          {/* KPI Cards Row */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box
              sx={{
                flex: 1,
                bgcolor: "#F8FAFC",
                borderRadius: "16px",
                p: 2,
                border: "1px solid #F1F5F9",
              }}
            >
              <Typography
                fontSize="10px"
                fontWeight={700}
                color="#64748B"
                letterSpacing="0.05em"
                mb={1}
              >
                TOTAL HOURS
              </Typography>
              <Typography fontSize="20px" fontWeight={700} color="text.primary">
                {displayStaff.workedHours}
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                bgcolor: "#F8FAFC",
                borderRadius: "16px",
                p: 2,
                border: "1px solid #F1F5F9",
              }}
            >
              <Typography
                fontSize="10px"
                fontWeight={700}
                color="#64748B"
                letterSpacing="0.05em"
                mb={1}
              >
                OVERTIME
              </Typography>
              <Typography fontSize="20px" fontWeight={700} color="#059669">
                {displayStaff.overtime}
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                bgcolor: "#F8FAFC",
                borderRadius: "16px",
                p: 2,
                border: "1px solid #F1F5F9",
              }}
            >
              <Typography
                fontSize="10px"
                fontWeight={700}
                color="#64748B"
                letterSpacing="0.05em"
                mb={1}
              >
                GROSS PAY
              </Typography>
              <Typography fontSize="20px" fontWeight={700} color="text.primary">
                {displayStaff.grossPay}
              </Typography>
            </Box>
          </Box>

          {/* Staff Information */}
          <Box>
            <SectionHeader>STAFF INFORMATION</SectionHeader>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  p: 2,
                  border: "1px solid #F1F5F9",
                  borderRadius: "16px",
                }}
              >
                <WorkOutlineIcon sx={{ color: "#475569", fontSize: 20 }} />
                <Box>
                  <Typography
                    fontSize="10px"
                    fontWeight={700}
                    color="#475569"
                    letterSpacing="0.05em"
                    mb={0.25}
                  >
                    ROLE
                  </Typography>
                  <Typography
                    fontSize="14px"
                    fontWeight={700}
                    color="text.primary"
                  >
                    {displayStaff.role}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  p: 2,
                  border: "1px solid #F1F5F9",
                  borderRadius: "16px",
                }}
              >
                <LocationOnOutlinedIcon
                  sx={{ color: "#475569", fontSize: 20 }}
                />
                <Box>
                  <Typography
                    fontSize="10px"
                    fontWeight={700}
                    color="#475569"
                    letterSpacing="0.05em"
                    mb={0.25}
                  >
                    BRANCH
                  </Typography>
                  <Typography
                    fontSize="14px"
                    fontWeight={700}
                    color="text.primary"
                  >
                    Central London
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: "700",
                color: "#475569",
                letterSpacing: "0.05em",
                mb: 2,
              }}
            >
              PAY BREAKDOWN
            </Typography>
            <Box
              sx={{
                backgroundColor: "#F8FAFC",
                borderRadius: "24px",
                border: "1px solid #F1F5F9",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2.5,
                  p: 3,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography fontSize="14px" fontWeight={400} color="#475569">
                    Regular Hours (160h @ £15.00)
                  </Typography>
                  <Typography
                    fontSize="14px"
                    fontWeight={700}
                    color="text.primary"
                  >
                    £2,400.00
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography fontSize="14px" fontWeight={400} color="#475569">
                    Overtime (12.5h @ £22.50)
                  </Typography>
                  <Typography fontSize="14px" fontWeight={700} color="#059669">
                    £281.25
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography fontSize="14px" fontWeight={400} color="#475569">
                    Travel Allowance
                  </Typography>
                  <Typography
                    fontSize="14px"
                    fontWeight={700}
                    color="text.primary"
                  >
                    £158.75
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  bgcolor: "#fff",
                  p: 3,
                  borderTop: "1.5px dashed #E2E8F0",
                }}
              >
                <Typography
                  fontSize="18px"
                  fontWeight={700}
                  color="text.primary"
                  sx={{ fontStyle: "italic", textTransform: "uppercase" }}
                >
                  GROSS PAY
                </Typography>
                <Typography
                  fontSize="24px"
                  fontWeight={700}
                  color="text.primary"
                >
                  {displayStaff.grossPay}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Estimated Deductions */}
          <Box>
            <SectionHeader>ESTIMATED DEDUCTIONS</SectionHeader>
            <Box
              sx={{
                p: 3,
                borderRadius: "24px",
                bgcolor: "#FFF1F24D",
                border: "1px solid #FFE4E680",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    fontSize="14px"
                    fontWeight={400}
                    color="#BE123CB2"
                  >
                    Income Tax (PAYE)
                  </Typography>
                  <Typography fontSize="14px" fontWeight={700} color="#881337">
                    -£425.00
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    fontSize="14px"
                    fontWeight={400}
                    color="#BE123CB2"
                  >
                    National Insurance
                  </Typography>
                  <Typography fontSize="14px" fontWeight={700} color="#881337">
                    -£182.50
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    fontSize="14px"
                    fontWeight={400}
                    color="#BE123CB2"
                  >
                    Pension Contribution
                  </Typography>
                  <Typography fontSize="14px" fontWeight={700} color="#881337">
                    -£85.00
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2.5, borderColor: "#FECDD380" }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography fontSize="14px" fontWeight={700} color="#881337">
                  Total Deductions
                </Typography>
                <Typography fontSize="18px" fontWeight={700} color="#881337">
                  -£692.50
                </Typography>
              </Box>
              <Divider sx={{ my: 2.5, borderColor: "#FECDD380" }} />

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
              >
                <Typography
                  fontSize="14px"
                  fontWeight={700}
                  color="#4C0519"
                  sx={{ textTransform: "uppercase" }}
                >
                  NET PAY (EST.)
                </Typography>
                <Typography fontSize="24px" fontWeight={700} color="#4C0519">
                  £2,147.50
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Footer Actions */}
        <Box
          sx={{
            p: 3,
            borderTop: "1px solid #F1F5F9",
            bgcolor: "#fff",
            display: "flex",
            gap: 2,
          }}
        >
          <Button
            fullWidth
            onClick={() => onApprove(displayStaff)}
            sx={{
              borderRadius: "14px",
              textTransform: "none",
              bgcolor: "#0EA5E9",
              color: "#fff",
              fontWeight: 700,
              fontSize: "14px",
              py: 1.8,
              boxShadow: "0 4px 14px 0 rgba(14,165,233,0.39)",
            }}
          >
            Approve for Payment
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              borderRadius: "14px",
              textTransform: "none",
              bgcolor: "#F8FAFC",
              color: "text.primary",
              border: "1px solid #F1F5F9",
              fontWeight: 700,
              fontSize: "14px",
              py: 1.8,
            }}
          >
            Download Payslip
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
