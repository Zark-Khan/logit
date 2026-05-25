import React from "react";
import {
  Dialog,
  Box,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LogoDesktop from "../../../assets/logit-desktop.svg";

const LINES = [
  {
    desc: "Standard Care Services",
    sub: "Feb 01 - Feb 15, 2024",
    hours: "32.5h",
    rate: "£25.00",
    total: "£812.50",
  },
  {
    desc: "Weekend Premium Cover",
    sub: "Feb 03, Feb 10",
    hours: "12.0h",
    rate: "£35.00",
    total: "£420.00",
  },
  {
    desc: "Administrative Fee",
    sub: "",
    hours: "1",
    rate: "£17.50",
    total: "£17.50",
  },
];

export default function InvoicePreviewModal({ open, onClose, invoice }) {
  const inv = invoice || {
    id: "INV-2024-001",
    client: "Arthur Morgan",
    date: "Mar 01, 2024",
    amount: "£1,250.00",
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{ zIndex: 1300 }}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: 896,
          borderRadius: "32px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          overflow: "hidden",
          bgcolor: "#fff",
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: "rgba(13, 15, 18, 0.5)",
            backdropFilter: "blur(4px)",
          },
        },
      }}
    >
      {/* Modal Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 3,
          bgcolor: "rgba(248, 250, 252, 0.5)",
          borderBottom: "0.8px solid #F1F5F9",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Document icon */}
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "12px",
              bgcolor: "#EFF6FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
            }}
          >
            <DescriptionOutlinedIcon sx={{ color: "#3B82F6", fontSize: 20 }} />
          </Box>
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "28px",
                color: "text.primary",
              }}
            >
              Invoice Preview
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "20px",
                color: "#666666",
              }}
            >
              {inv.id} • {inv.client}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            size="small"
            sx={{
              color: "#64748B",
              border: "1px solid #F1F5F9",
              borderRadius: "8px",
              "&:hover": { bgcolor: "#F8FAFC" },
            }}
          >
            <PrintOutlinedIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              color: "#64748B",
              border: "1px solid #F1F5F9",
              borderRadius: "8px",
              "&:hover": { bgcolor: "#F8FAFC" },
            }}
          >
            <DownloadOutlinedIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <Box
            sx={{
              width: "1px",
              height: 24,
              bgcolor: "#E2E8F0",
              mx: 0.5,
            }}
          />
          <IconButton
            size="small"
            onClick={onClose}
            sx={{ color: "#94A3B8", "&:hover": { bgcolor: "#F8FAFC" } }}
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      </Box>

      {/* Invoice Paper */}
      <Box
        sx={{
          p: "48px",
          bgcolor: "rgba(241, 245, 249, 0.3)",
          overflowY: "auto",
          maxHeight: "calc(100vh - 250px)",
        }}
      >
        <Box
          sx={{
            bgcolor: "#fff",
            borderRadius: "2px",
            border: "1px solid #E2E8F0",
            overflow: "hidden",
            p: "76px",
            boxShadow:
              "0px 8px 10px -6px rgba(0,0,0,0.1), 0px 20px 25px -5px rgba(0,0,0,0.1)",
          }}
        >
          {/* Logo + Invoice Number */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: "48px",
            }}
          >
            <Box>
              {/* LOGIT Logo */}
              <Box
                component="img"
                src={LogoDesktop}
                sx={{ width: 103, height: 44, mb: 1.5 }}
              />
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "16px",
                  color: "#666666",
                }}
              >
                123 Business Avenue
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "16px",
                  color: "#666666",
                }}
              >
                London, EC1A 1BB
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "16px",
                  color: "#666666",
                }}
              >
                United Kingdom
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "16px",
                  color: "#666666",
                }}
              >
                +44 20 7123 4567
              </Typography>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: "36px",
                  color: "#E2E8F0",
                  letterSpacing: "3.6px",
                  textTransform: "uppercase",
                  lineHeight: "40px",
                  mb: 1.5,
                }}
              >
                INVOICE
              </Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "text.primary",
                }}
              >
                {inv.id}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "16px",
                  color: "#666666",
                }}
              >
                Date: {inv.date}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "16px",
                  color: "#666666",
                }}
              >
                Due Date: Mar 15, 2024
              </Typography>
            </Box>
          </Box>

          {/* Bill To + Payment Details */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: "48px",
              mb: "48px",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "10px",
                  lineHeight: "15px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#475569",
                  mb: 1.5,
                }}
              >
                Bill To
              </Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "text.primary",
                  mb: "4px",
                }}
              >
                {inv.client}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "16px",
                  color: "#666666",
                }}
              >
                45 Care Lane
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "16px",
                  color: "#666666",
                }}
              >
                Manchester, M1 1AA
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "16px",
                  color: "#666666",
                }}
              >
                arthur.m@example.com
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "10px",
                  lineHeight: "15px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#475569",
                  mb: 1.5,
                }}
              >
                Payment Details
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "16px",
                  color: "#666666",
                }}
              >
                Bank: Barclays Bank
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "16px",
                  color: "#666666",
                }}
              >
                Account: **** 5678
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "16px",
                  color: "#666666",
                }}
              >
                Sort Code: 20-30-40
              </Typography>
            </Box>
          </Box>

          {/* Line Items Table */}
          {/* Table Header */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "349.35fr 78.83fr 90.78fr 113.08fr",
              pt: "15px",
              pb: "17.5px",
              borderBottom: "1.6px solid text.primary",
            }}
          >
            {[
              { text: "Description", align: "left" },
              { text: "Hours", align: "center" },
              { text: "Rate", align: "center" },
              { text: "Total", align: "right" },
            ].map(({ text, align }) => (
              <Typography
                key={text}
                sx={{
                  fontWeight: 700,
                  fontSize: "10px",
                  lineHeight: "15px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "text.primary",
                  textAlign: align,
                }}
              >
                {text}
              </Typography>
            ))}
          </Box>

          {/* Table Rows */}
          {LINES.map((ln, i) => (
            <Box
              key={i}
              sx={{
                display: "grid",
                gridTemplateColumns: "349.35fr 78.83fr 90.78fr 113.08fr",
                py: "24px",
                borderTop: i === 0 ? "none" : "0.8px solid #F1F5F9",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "text.primary",
                  }}
                >
                  {ln.desc}
                </Typography>
                {ln.sub && (
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: "10px",
                      lineHeight: "15px",
                      color: "#666666",
                      mt: "4px",
                    }}
                  >
                    {ln.sub}
                  </Typography>
                )}
              </Box>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "text.primary",
                  textAlign: "center",
                }}
              >
                {ln.hours}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "text.primary",
                  textAlign: "center",
                }}
              >
                {ln.rate}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "text.primary",
                  textAlign: "right",
                }}
              >
                {ln.total}
              </Typography>
            </Box>
          ))}

          {/* Totals */}
          <Box
            sx={{
              borderTop: "1.6px solid #F1F5F9",
              pt: "32px",
              mt: "48px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 0.75,
            }}
          >
            {[
              { label: "Subtotal", val: "£1,250.00" },
              { label: "VAT (0%)", val: "£0.00" },
            ].map(({ label, val }) => (
              <Box
                key={label}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: 204,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#475569",
                  }}
                >
                  {label}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "text.primary",
                    textAlign: "right",
                  }}
                >
                  {val}
                </Typography>
              </Box>
            ))}

            {/* Total Due */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: 204,
                borderTop: "0.8px solid #E2E8F0",
                pt: "12px",
                mt: "12px",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  fontStyle: "italic",
                  fontSize: "18px",
                  lineHeight: "28px",
                  color: "text.primary",
                  textTransform: "uppercase",
                }}
              >
                TOTAL DUE
              </Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "32px",
                  color: "text.primary",
                  textAlign: "right",
                }}
              >
                {inv.amount}
              </Typography>
            </Box>
          </Box>

          {/* Thank You Footer */}
          <Box
            sx={{
              textAlign: "center",
              borderTop: "0.8px solid #F1F5F9",
              pt: "48px",
              mt: "48px",
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "10px",
                lineHeight: "15px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#94A3B8",
                mb: 0.5,
              }}
            >
              Thank you for your business
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "10px",
                lineHeight: "15px",
                color: "#94A3B8",
              }}
            >
              Please quote invoice number {inv.id} when making payment.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Footer Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 4,
          bgcolor: "rgba(248, 250, 252, 0.5)",
          borderTop: "0.8px solid #F1F5F9",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: "#ECFDF5",
            px: 2,
            py: 1,
            borderRadius: "9999px",
          }}
        >
          <CheckCircleOutlinedIcon sx={{ color: "#528910", fontSize: 16 }} />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "12px",
              lineHeight: "24px",
              color: "#528910",
            }}
          >
            Ready to send
          </Typography>
        </Box>
        <Button
          startIcon={<SendOutlinedIcon />}
          sx={{
            height: 52,
            borderRadius: "16px",
            bgcolor: "#0EA5E9",
            color: "#fff",
            textTransform: "none",

            fontWeight: 700,
            fontSize: "16px",
            px: 4,
            boxShadow: "0 4px 12px rgba(14,165,233,0.3)",
            "&:hover": { bgcolor: "#0284C7" },
          }}
        >
          Send to Client
        </Button>
      </Box>
    </Dialog>
  );
}
