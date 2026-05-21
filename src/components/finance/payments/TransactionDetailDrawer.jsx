import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

function SectionHeader({ children }) {
  return (
    <Typography
      fontSize="12px"
      fontWeight={700}
      color="#475569"
      sx={{ mb: 1.25, letterSpacing: "0.05em", textTransform: "uppercase" }}
      
    >
      {children}
    </Typography>
  );
}

export default function TransactionDetailDrawer({ open, onClose, payment, onViewReceipt }) {
  const [localPayment, setLocalPayment] = React.useState(null);

  React.useEffect(() => {
    if (payment) {
      setLocalPayment(payment);
    }
  }, [payment]);

  const displayPayment = payment || localPayment;

  if (!displayPayment) return null;

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
                width: 44,
                height: 44,
                borderRadius: "50%",
                bgcolor: "#ECFDF5",
                color: "#10B981",
                fontSize: "20px",
                fontWeight: 700,
                
              }}
            >
              $
            </Avatar>
            <Box>
              <Typography fontSize="10px" fontWeight={700} color="#0D0F12"  sx={{ lineHeight: 1.2 }}>
                {displayPayment.reference}
              </Typography>
              <Typography fontSize="14px" fontWeight={500} color="text.light" >
                {displayPayment.client} • {displayPayment.date}
              </Typography>
            </Box>
          </Box>
          <IconButton
            onClick={onClose}
            sx={{
              bgcolor: "#F8FAFC",
              border: "1px solid #E2E8F0",
              borderRadius: "50%",
              p: 1,
              color: "#64748B",
              "&:hover": { bgcolor: "#F1F5F9" },
            }}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, overflowY: "auto", px: 4, py: 3.5, display: "flex", flexDirection: "column", gap: 3 }}>
          
          {/* Status & Amount Banner */}
          <Box
            sx={{
              p: 2.5,
              borderRadius: "16px",
              bgcolor: "#ECFDF5",
              border: "1px solid #D1FAE5",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <CheckCircleIcon sx={{ color: "#10B981", fontSize: 20 }} />
              <Box>
                <Typography fontSize="14px" fontWeight={700} color="#065F46" letterSpacing="0.05em">
                  PAYMENT COMPLETED
                </Typography>
                <Typography fontSize="12px" color="#065F46" fontWeight={500}>
                  Transaction settled successfully
                </Typography>
              </Box>
            </Box>
            <Typography fontSize="24px" fontWeight={700} color="#065F46" >
              {displayPayment.amount}
            </Typography>
          </Box>

          {/* Payment Method & Date Row */}
          <Box sx={{ display: "flex", gap: 2 }}>
            {/* Payment Method */}
            <Box sx={{ flex: 1, bgcolor: "#F8FAFC", borderRadius: "16px", p: 2, border: "1px solid #F1F5F9" }}>
              <Typography fontSize="10px" fontWeight={700} color="#94A3B8" letterSpacing="0.05em" sx={{ mb: 1, textTransform: "uppercase" }} >
                PAYMENT METHOD
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <AccountBalanceOutlinedIcon sx={{ color: "#3B82F6", fontSize: 16 }} />
                <Typography fontSize="14px" fontWeight={700} color="text.primary" >
                  {displayPayment.method}
                </Typography>
              </Box>
            </Box>

            {/* Transaction Date */}
            <Box sx={{ flex: 1, bgcolor: "#F8FAFC", borderRadius: "16px", p: 2, border: "1px solid #F1F5F9" }}>
              <Typography fontSize="10px" fontWeight={700} color="#94A3B8" letterSpacing="0.05em" sx={{ mb: 1, textTransform: "uppercase" }} >
                TRANSACTION DATE
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CalendarTodayOutlinedIcon sx={{ color: "#3B82F6", fontSize: 16 }} />
                <Typography fontSize="14px" fontWeight={700} color="text.primary" >
                  {displayPayment.date}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Applied To Section */}
          <Box>
            <SectionHeader>APPLIED TO</SectionHeader>
            <Box sx={{ border: "1px solid #F8FAFC", borderRadius: "16px", overflow: "hidden" }}>
              {/* Columns Header */}
              <Box sx={{ display: "flex", justifyContent: "space-between", px: 2.5, py: 1.5, bgcolor: "#F8FAFC" }}>
                <Typography fontSize="10px" fontWeight={700} color="text.grey" letterSpacing="0.05em" >
                  INVOICE ID
                </Typography>
                <Typography fontSize="10px" fontWeight={700} color="text.grey" letterSpacing="0.05em" >
                  AMOUNT APPLIED
                </Typography>
              </Box>
              {/* Row Content */}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, bgcolor: "#fff" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", bgcolor: "#EFF6FF" }}>
                    <CheckCircleIcon sx={{ color: "#3B82F6", fontSize: 16 }} />
                  </Box>
                  <Box>
                    <Typography fontSize="14px" fontWeight={700} color="text.primary" >
                      INV-2024-001
                    </Typography>
                    <Typography fontSize="12px" color="#64748B" fontWeight={500} >
                      Mar 01, 2024
                    </Typography>
                  </Box>
                </Box>
                <Typography fontSize="14px" fontWeight={700} color="#059669" >
                  {displayPayment.amount}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Update Status Section */}
          <Box>
            <SectionHeader>UPDATE STATUS</SectionHeader>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                border: "1px solid #F1F5F9",
                borderRadius: "12px",
                bgcolor: "#fff",
                cursor: "pointer",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#10B981" }} />
                <Typography fontSize="14px" fontWeight={700} color="text.primary" >
                  Completed
                </Typography>
              </Box>
              <KeyboardArrowDownIcon sx={{ color: "#94A3B8", fontSize: 18 }} />
            </Box>
          </Box>

          {/* Client Information Section */}
          <Box>
            <SectionHeader>CLIENT INFORMATION</SectionHeader>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                border: "1px solid #F1F5F9",
                borderRadius: "16px",
                bgcolor: "#fff",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Avatar sx={{ width: 36, height: 36, bgcolor: "#F1F5F9", color: "#64748B" }}>
                  <PersonOutlineIcon sx={{ fontSize: 20 }} />
                </Avatar>
                <Box>
                  <Typography fontSize="14px" fontWeight={700} color="text.primary" >
                    {displayPayment.client}
                  </Typography>
                  <Typography fontSize="12px" color="#64748B" fontWeight={500} >
                    ID: CL-2934 • Private Funding
                  </Typography>
                </Box>
              </Box>
              <Typography
                fontSize="12px"
                fontWeight={700}
                color="#2563EB"
                sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
                
              >
                View Profile
              </Typography>
            </Box>
          </Box>

          {/* Receipt Preview Section */}
          <Box>
            <SectionHeader>RECEIPT PREVIEW</SectionHeader>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                p: 3.5,
                bgcolor: "#F8FAFC",
                border: "1px dashed #E2E8F0",
                borderRadius: "20px",
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  bgcolor: "#F8FAFC",
                  border: "1px dashed #E2E8F0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
                }}
              >
                <PrintOutlinedIcon sx={{ color: "#94A3B8", fontSize: 20 }} />
              </Box>
              <Typography fontSize="12px" color="#64748B" sx={{ maxWidth: 320, lineHeight: 1.6 }} >
                A digital receipt has been generated for this transaction. You can download or print it for your records.
              </Typography>
              <Button
                variant="outlined"
                onClick={onViewReceipt}
                startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 16 }} />}
                sx={{
                  bgcolor: "#fff",
                  color: "text.primary",
                  border: "1px solid #E2E8F0",
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "12px",
                  px: 2.5,
                  py: 1,
                  boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
                  "&:hover": { bgcolor: "#F8FAFC", borderColor: "#CBD5E1" },
                }}
              >
                Download Receipt
              </Button>
            </Box>
          </Box>

        </Box>

        {/* Footer Actions */}
        <Box
          sx={{
            p: 3,
            borderTop: "1px solid #F1F5F9",
            bgcolor: "#fff",
          }}
        >
          <Button
            fullWidth
            variant="contained"
            onClick={onClose}
            sx={{
              borderRadius: "14px",
              textTransform: "none",
              bgcolor: "#0EA5E9",
              color: "#fff",
              fontWeight: 700,
              fontSize: "15px",
              py: 1.8,
              boxShadow: "0 10px 20px rgba(14, 165, 233, 0.2)",
              "&:hover": { bgcolor: "#0284C7", boxShadow: "none" },
            }}
          >
            Update & Close
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
