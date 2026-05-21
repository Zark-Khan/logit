import React from "react";
import {
  Dialog,
  Box,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function PaymentRecordedSuccessModal({ open, onClose, amount }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: 440, // Match RecordPaymentModal precisely!
          borderRadius: "24px", // Match RecordPaymentModal precisely!
          p: 4,
          textAlign: "center",
          boxShadow: "0px 25px 50px -12px rgba(0, 0, 0, 0.15)",
        },
      }}
      sx={{
        zIndex: 1302,
        "& .MuiBackdrop-root": {
          bgcolor: "rgba(15, 23, 42, 0.4)",
          backdropFilter: "blur(8px)", // Match RecordPaymentModal precisely!
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3.5 }}>
        
        {/* Success Icon Badge */}
        <Avatar
          sx={{
            width: 56,
            height: 56,
            bgcolor: "#E6FBF3",
            color: "#10B981",
            border: "1.5px solid #D1FAE5",
          }}
        >
          <CheckIcon sx={{ fontSize: 28, fontWeight: 700 }} />
        </Avatar>

        {/* Title & Subtitle */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography fontSize="18px" fontWeight={800} color="#0D0F12" sx={{ lineHeight: 1.2 }}>
            Payment Recorded!
          </Typography>
          <Typography fontSize="12px" color="#64748B" fontWeight={500} sx={{ lineHeight: 1.6 }}>
            The payment of <span style={{ fontWeight: 700, color: "#0D0F12" }}>{amount}</span> has been successfully recorded and applied to the oldest outstanding invoice for this client.
          </Typography>
        </Box>

        {/* Action Button */}
        <Button
          fullWidth
          onClick={onClose}
          endIcon={<ChevronRightIcon sx={{ fontSize: 16 }} />}
          sx={{
            bgcolor: "#009BE5",
            color: "#FFFFFF",
            borderRadius: "100px",
            py: 1.4,
            textTransform: "none",
            fontWeight: 700,
            fontSize: "14px",
            boxShadow: "0px 8px 16px rgba(0, 155, 229, 0.2)",
            "&:hover": {
              bgcolor: "#0084C1",
              boxShadow: "none",
            },
          }}
        >
          Back to Payments
        </Button>

      </Box>
    </Dialog>
  );
}
