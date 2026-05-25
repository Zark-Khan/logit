import React, { useState } from "react";
import { Box, Typography, Button, Avatar } from "@mui/material";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RunPayrollCycleModal from "../modals/RunPayrollCycleModal";
import PayrollApprovedSuccessModal from "../modals/PayrollApprovedSuccessModal";
import PayrollProcessedSuccessModal from "../modals/PayrollProcessedSuccessModal";
import StaffPayDrawer from "./StaffPayDrawer";

// Dummy Data
const INITIAL_STAFF = [
  {
    id: 1,
    name: "Arthur Morgan",
    role: "Senior Carer",
    workedHours: "160h",
    overtime: "12h",
    grossPay: "£2,840.00",
    status: "APPROVED",
  },
  {
    id: 2,
    name: "Sadie Adler",
    role: "Carer",
    workedHours: "142h",
    overtime: "0h",
    grossPay: "£2,130.00",
    status: "PENDING",
  },
  {
    id: 3,
    name: "John Marston",
    role: "Nurse",
    workedHours: "155h",
    overtime: "8h",
    grossPay: "£3,450.00",
    status: "APPROVED",
  },
  {
    id: 4,
    name: "Charles Smith",
    role: "Carer",
    workedHours: "120h",
    overtime: "4h",
    grossPay: "£1,860.00",
    status: "APPROVED",
  },
];

const labelSx = {
  fontSize: "12px",
  fontWeight: 700,
  color: "#475569",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
};

export default function PayrollTab() {
  const [staffData, setStaffData] = useState(INITIAL_STAFF);

  // Modals / Drawer State
  const [runCycleOpen, setRunCycleOpen] = useState(false);
  const [processedSuccessOpen, setProcessedSuccessOpen] = useState(false);
  const [approveSuccessOpen, setApproveSuccessOpen] = useState(false);

  const [selectedStaff, setSelectedStaff] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleApproveAll = () => {
    setStaffData((prev) =>
      prev.map((s) =>
        s.status === "PENDING" ? { ...s, status: "APPROVED" } : s,
      ),
    );
    setApproveSuccessOpen(true);
  };

  const handleRunPayrollCycle = () => {
    setRunCycleOpen(false);
    setProcessedSuccessOpen(true);
  };

  const handleApproveSingle = (staff) => {
    setStaffData((prev) =>
      prev.map((s) => (s.id === staff.id ? { ...s, status: "APPROVED" } : s)),
    );
    // Optionally close drawer or keep it open with new status
    setSelectedStaff({ ...staff, status: "APPROVED" });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Header section with Page Title and Main Action */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "10px",
              bgcolor: "#EFF6FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <GroupsOutlinedIcon sx={{ color: "#2563EB", fontSize: 20 }} />
          </Box>
          <Typography fontSize="20px" fontWeight={700} color="text.primary">
            Payroll Management
          </Typography>
        </Box>
        <Button
          onClick={() => setRunCycleOpen(true)}
          sx={{
            background: "linear-gradient(90deg, #0EA5E9 0%, #8AC642 100%)",
            color: "#FFFFFF",
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 700,
            fontSize: "14px",
            px: 3,
            py: 1,
            boxShadow: "0px 4px 6px -4px #E0F2FE, 0px 10px 15px -3px #E0F2FE",
            "&:hover": { opacity: 0.95 },
          }}
        >
          Run Payroll Cycle
        </Button>
      </Box>

      {/* Main Figma Sky Blue Card Container */}
      <Box
        sx={{
          bgcolor: "#E0F5FF",
          borderRadius: "24px",
          border: "1px solid #83D8FF",
          boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
          overflow: "hidden",
        }}
      >
        {/* Card Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 4,
            py: 2.5,
            borderBottom: "1px solid #FFFFFF",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "16px",
              lineHeight: "24px",
              color: "text.primary",
            }}
          >
            Staff Pay Summary (Current Period)
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography fontSize="12px" fontWeight={700} color="#475569">
              Feb 01 - Feb 28, 2024
            </Typography>
            <Button
              onClick={handleApproveAll}
              startIcon={<CheckCircleOutlineIcon sx={{ fontSize: 16 }} />}
              sx={{
                bgcolor: "#EFFDDE70",
                borderRadius: "10px",
                border: "1px solid #52891059",
                color: "#528910",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "12px",
                px: 2,
                py: 0.75,
              }}
            >
              Approve All Pending
            </Button>
          </Box>
        </Box>

        {/* Table Body Container */}
        <Box sx={{ overflowX: "auto" }}>
          {/* Header Row */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "3fr 1.5fr 1.5fr 1.5fr 1.5fr 1fr",
              px: 4,
              py: 2,
              bgcolor: "#FFFFFF",
              minWidth: 900,
            }}
          >
            <Typography sx={labelSx}>STAFF MEMBER</Typography>
            <Typography sx={labelSx}>WORKED HOURS</Typography>
            <Typography sx={labelSx}>OVERTIME</Typography>
            <Typography sx={labelSx}>GROSS PAY</Typography>
            <Typography sx={labelSx}>STATUS</Typography>
            <Typography sx={{ ...labelSx, textAlign: "right" }}>
              ACTIONS
            </Typography>
          </Box>

          {/* Table Data Rows */}
          {staffData.map((staff, i) => {
            const isApproved = staff.status === "APPROVED";
            return (
              <Box
                key={staff.id}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "3fr 1.5fr 1.5fr 1.5fr 1.5fr 1fr",
                  px: 4,
                  py: 2,
                  bgcolor: "#E0F5FF",
                  borderBottom:
                    i === staffData.length - 1 ? "none" : "1px solid #F1F5F9",
                  alignItems: "center",
                  minWidth: 900,
                }}
              >
                {/* STAFF MEMBER */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "8px",
                      bgcolor: "#DBEAFE",
                      color: "#2563EB",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    {staff.name[0]}
                  </Avatar>
                  <Box>
                    <Typography
                      fontSize="14px"
                      fontWeight={700}
                      color="text.primary"
                    >
                      {staff.name}
                    </Typography>
                    <Typography
                      fontSize="10px"
                      color="text.light"
                      fontWeight={400}
                    >
                      {staff.role}
                    </Typography>
                  </Box>
                </Box>

                {/* WORKED HOURS */}
                <Typography fontSize="14px" fontWeight={400} color="text.light">
                  {staff.workedHours}
                </Typography>

                {/* OVERTIME */}
                <Typography fontSize="14px" fontWeight={400} color="text.light">
                  {staff.overtime}
                </Typography>

                {/* GROSS PAY */}
                <Typography
                  fontSize="14px"
                  fontWeight={700}
                  color="text.primary"
                >
                  {staff.grossPay}
                </Typography>

                {/* STATUS */}
                <Box>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: "20px",
                      bgcolor: isApproved ? "#ECFDF5" : "#FFFBEB",
                    }}
                  >
                    <Typography
                      fontSize="10px"
                      fontWeight={700}
                      color={isApproved ? "#059669" : "#D97706"}
                      letterSpacing="0.05em"
                    >
                      {staff.status}
                    </Typography>
                  </Box>
                </Box>

                {/* ACTIONS */}
                <Box sx={{ textAlign: "right" }}>
                  <Typography
                    onClick={() => {
                      setSelectedStaff(staff);
                      setDrawerOpen(true);
                    }}
                    fontSize="12px"
                    fontWeight={700}
                    color="#2563EB"
                    sx={{
                      cursor: "pointer",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Review
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Modals & Drawers */}
      <RunPayrollCycleModal
        open={runCycleOpen}
        onClose={() => setRunCycleOpen(false)}
        onRun={handleRunPayrollCycle}
      />

      <PayrollProcessedSuccessModal
        open={processedSuccessOpen}
        onClose={() => setProcessedSuccessOpen(false)}
        staffCount={staffData.length}
        totalDisbursed="£28,450.00"
      />

      <PayrollApprovedSuccessModal
        open={approveSuccessOpen}
        onClose={() => setApproveSuccessOpen(false)}
        staffCount={staffData.length}
      />

      <StaffPayDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        staffRecord={selectedStaff}
        onApprove={handleApproveSingle}
      />
    </Box>
  );
}
