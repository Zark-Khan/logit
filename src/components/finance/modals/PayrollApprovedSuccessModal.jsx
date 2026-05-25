import React from "react";
import { Dialog, Box, Typography, Button } from "@mui/material";

export default function PayrollApprovedSuccessModal({ open, onClose, staffCount = 42 }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: 440,
          borderRadius: "24px",
          p: 4,
          textAlign: "center",
          boxShadow: "0px 25px 50px -12px rgba(0, 0, 0, 0.15)",
        },
      }}
      sx={{
        zIndex: 1302,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3.5,
        }}
      >
        {/* Success Icon */}
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            bgcolor: "#ECFDF5",
            boxShadow: "0px 4px 6px -4px #D1FAE5, 0px 10px 15px -3px #D1FAE5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
          }}
        >
         
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="#10B981"
                strokeWidth="2.5"
              />
              <path
                d="M8 12.5L10.5 15L16 9"
                stroke="#10B981"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
          
        {/* Title & Subtitle */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography
            fontSize="24px"
            fontWeight={700}
            color="text.primary"
            sx={{ lineHeight: 1.2 }}
          >
            Payroll Approved!
          </Typography>
          <Typography
            fontSize="16px"
            color="text.light"
            fontWeight={400}
            sx={{ lineHeight: 1.6, maxWidth: 340, mx: "auto" }}
          >
            All {staffCount} staff payroll have been successfully approved for payroll.
          </Typography>
        </Box>

        {/* Action Button */}
        <Button
          fullWidth
          onClick={onClose}
          sx={{
            bgcolor: "#0EA5E9",
            color: "#fff",
            borderRadius: "16px",
            py: 2,
            fontWeight: 700,
            fontSize: "16px",
            textTransform: "none",
            boxShadow: "none",
          }}
        >
          Back to Payroll
        </Button>
      </Box>
    </Dialog>
  );
}
