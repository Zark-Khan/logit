import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Avatar,
  IconButton,
  Drawer,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

import InvoicePreviewModal from "../modals/InvoicePreviewModal";
import CreateInvoiceModal from "../modals/CreateInvoiceModal";

const INVOICES = [
  { id: "INV-2024-001", client: "Arthur Morgan", date: "Mar 01, 2024", amount: "£1,250.00", status: "PAID", color: "#0EA5E9" },
  { id: "INV-2024-002", client: "Sadie Adler", date: "Feb 28, 2024", amount: "£840.00", status: "SENT", color: "#E11D48" },
  { id: "INV-2024-003", client: "John Marston", date: "Feb 26, 2024", amount: "£2,100.00", status: "OVERDUE", color: "#D97706" },
  { id: "INV-2024-004", client: "Charles Smith", date: "Feb 25, 2024", amount: "£950.00", status: "DRAFT", color: "#059669" },
  { id: "INV-2024-005", client: "Bill Williamson", date: "Feb 24, 2024", amount: "£1,100.00", status: "PAID", color: "#7C3AED" },
];

const STATUS_STYLES = {
  PAID: { color: "#059669" },
  SENT: { color: "#0EA5E9" },
  OVERDUE: { color: "#EF4444" },
  DRAFT: { color: "#64748B" },
};

const DETAIL = {
  billingPeriod: "Feb 01 - Feb 15, 2024",
  paymentMethod: "Direct Debit",
  fundingSource: "Private Funding",
  lines: [
    { desc: "Morning Care Visit", hours: "20.5h", total: "£512.50" },
    { desc: "Evening Care Visit", hours: "15.0h", total: "£375.00" },
    { desc: "Weekend Surcharge", hours: "4.5h", total: "£112.50" },
  ],
  subtotal: "£1,000.00",
  vat: "£0.00",
  total: "£1,000.00",
};

const labelSx = {
  fontSize: "12px",
  fontWeight: 700,
  color: "text.grey",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  mb: 0.5,
};

export default function InvoicesTab() {
  const [selected, setSelected] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <Box>
      <Box
        sx={{
          bgcolor: "#E0F5FF",
          borderRadius: "24px",
          border: "1px solid #83D8FF",
        }}
      >
        {/* Toolbar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            // mb: 3,
            p: 3,
          }}
        >
          {/* Search */}
          <TextField
            placeholder="Search invoices, clients..."
            size="small"
            sx={{
              flex: 1,
              minWidth: 448,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                bgcolor: "#fff",
                "& fieldset": { borderColor: "transparent" },
                "&:hover fieldset": { borderColor: "#E2E8F0" },
                "&.Mui-focused fieldset": { borderColor: "#0EA5E9" },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#94A3B8", fontSize: 18 }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Status Filter */}
          <Button
            endIcon={<KeyboardArrowDownIcon sx={{ fontSize: 16 }} />}
            sx={{
              borderRadius: "12px",
              border: "1px solid #E2E8F0",
              color: "#528910",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "14px",
              px: 2.5,
              bgcolor: "#fff",
              "&:hover": { bgcolor: "#F8FAFC" },
            }}
          >
            Paid
          </Button>

          {/* Date Filter */}
          <Button
            endIcon={<KeyboardArrowDownIcon sx={{ fontSize: 16 }} />}
            sx={{
              borderRadius: "12px",
              border: "1px solid #E2E8F0",
              color: "text.light",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "14px",
              px: 2.5,
              bgcolor: "#fff",
              "&:hover": { bgcolor: "#F8FAFC" },
            }}
          >
            Today, 1 Mar 2026
          </Button>

          {/* New Invoice */}
          <Button
            startIcon={<AddIcon />}
            onClick={() => setCreateOpen(true)}
            sx={{
              borderRadius: "12px",
              background: "linear-gradient(135deg,#0EA5E9,#8AC642)",
              color: "#fff",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "14px",
              px: 3,
              boxShadow: "0 4px 12px rgba(14,165,233,0.3)",
              "&:hover": { opacity: 0.92 },
            }}
          >
            New Invoice
          </Button>
        </Box>

        <Box
          sx={{
            bgcolor: "#fff",
            overflow: "hidden",
          }}
        >
          {/* Header Row */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1.5fr 1fr 1fr 0.8fr 0.8fr",
              px: 2,
              py: 1.75,
              borderBottom: "1px solid #F1F5F9",
            }}
          >
            {["INVOICE ID", "CLIENT", "DATE", "AMOUNT", "STATUS", "ACTIONS"].map(
              (h) => (
                <Typography key={h} sx={labelSx}>
                  {h}
                </Typography>
              ),
            )}
          </Box>

          {/* Data Rows */}
          {INVOICES.map((inv, i) => {
            const ss = STATUS_STYLES[inv.status];
            return (
              <Box
                key={inv.id}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1.5fr 1fr 1fr 0.8fr 0.8fr",
                  px: 2,
                  py: 2.25,
                  bgcolor: "#E0F5FF",
                  borderTop: i === 0 ? "none" : "1px solid #F8FAFC",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => setSelected(inv)}
              >
                {/* Invoice ID */}
                <Typography fontSize="14px" fontWeight={700} color="text.primary">
                  {inv.id}
                </Typography>

                {/* Client */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      fontSize: "12px",
                      fontWeight: 800,
                      bgcolor: "#ffffff",
                      color: "text.primary",
                    }}
                  >
                    {inv.client[0]}
                  </Avatar>
                  <Typography fontSize="14px" fontWeight={600} color="text.grey">
                    {inv.client}
                  </Typography>
                </Box>

                {/* Date */}
                <Typography fontSize="14px" color="text.light" fontWeight={500}>
                  {inv.date}
                </Typography>

                {/* Amount */}
                <Typography fontSize="14px" fontWeight={700} color="text.primary">
                  {inv.amount}
                </Typography>

                {/* Status */}
                <Box
                  sx={{
                    px: 1,
                    py: 0.4,
                    borderRadius: "50px",
                    bgcolor: "#fff",
                    color: ss.color,
                    fontSize: "10px",
                    fontWeight: 700,
                    display: "inline-flex",
                    width: "fit-content",
                    letterSpacing: "0.05em",
                  }}
                >
                  {inv.status}
                </Box>

                {/* Actions */}
                <Box onClick={(e) => e.stopPropagation()}>
                  <Button
                    size="small"
                    onClick={() => setPreviewOpen(inv)}
                    sx={{
                      borderRadius: "8px",
                      border: "1px solid #ffffff",
                      color: "#2563EB",
                      textTransform: "none",
                      fontWeight: 700,
                      fontSize: "10px",
                      px: 1.5,
                      minWidth: 0,
                      bgcolor: "#fff",
                      "&:hover": { bgcolor: "#F8FAFC" },
                    }}
                  >
                    GENERATE
                  </Button>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Drawer
        anchor="right"
        open={!!selected}
        onClose={() => setSelected(null)}
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
        {selected && (
          <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            {/* Header */}
            <Box
              sx={{
                px: 4,
                py: 4,
                bgcolor: "rgba(248, 250, 252, 0.5)",
                borderBottom: "0.8px solid #F8FAFC",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {/* Green document icon */}
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "16px",
                    bgcolor: "#ECFDF5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <Box
                    component="svg"
                    viewBox="0 0 24 24"
                    sx={{ width: 24, height: 24, fill: "none" }}
                  >
                    <path
                      d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                      stroke="#059669"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M14 2V8H20" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 13H16" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 17H16" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 9H10" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </Box>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      
                      fontSize: "20px",
                      fontWeight: 700,
                      lineHeight: "28px",
                      color: "#0D0F12",
                    }}
                  >
                    {selected.id}
                  </Typography>
                  <Typography
                    sx={{
                      
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "20px",
                      color: "#666666",
                    }}
                  >
                    {selected.client} • {selected.date}
                  </Typography>
                </Box>
              </Box>
              <IconButton
                onClick={() => setSelected(null)}
                sx={{
                  bgcolor: "rgba(255,255,255,0)",
                  boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
                  borderRadius: "12px",
                  p: 1,
                  "&:hover": { bgcolor: "#F8FAFC" },
                }}
              >
                <CloseIcon sx={{ fontSize: 20, color: "#0D0F12" }} />
              </IconButton>
            </Box>

            {/* Scrollable content */}
            <Box sx={{ flex: 1, overflowY: "auto", p: 4 }}>
              {/* Status + Amount Banner */}
              <Box
                sx={{
                  p: 3,
                  borderRadius: "24px",
                  bgcolor: "#ECFDF5",
                  border: "1px solid #D1FAE5",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <CheckCircleOutlinedIcon sx={{ color: "#059669", fontSize: 24 }} />
                  <Box>
                    <Typography
                      sx={{
                        
                        fontSize: "14px",
                        fontWeight: 700,
                        lineHeight: "20px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#065F46",
                      }}
                    >
                      Invoice Paid
                    </Typography>
                    <Typography
                      sx={{
                        
                        fontSize: "12px",
                        fontWeight: 400,
                        lineHeight: "16px",
                        color: "#065F46",
                        opacity: 0.8,
                      }}
                    >
                      Payment received on {selected.date}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  sx={{
                    
                    fontSize: "24px",
                    fontWeight: 700,
                    lineHeight: "32px",
                    color: "#065F46",
                  }}
                >
                  {selected.amount}
                </Typography>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
                {[
                  { icon: DownloadOutlinedIcon, label: "Download PDF" },
                  { icon: SendOutlinedIcon, label: "Resend Email" },
                  { icon: LocalPrintshopOutlinedIcon, label: "Print Copy" },
                ].map(({ icon: Icon, label }) => (
                  <Box
                    key={label}
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                      cursor: "pointer",
                      py: 2,
                      borderRadius: "16px",
                      border: "1px solid #F1F5F9",
                      bgcolor: "#fff",
                      transition: "all 0.15s ease",
                      "&:hover": { bgcolor: "#F8FAFC", borderColor: "#E2E8F0" },
                    }}
                  >
                    <Icon sx={{ color: "#475569", fontSize: 20 }} />
                    <Typography
                      sx={{
                        
                        fontSize: "12px",
                        fontWeight: 700,
                        lineHeight: "16px",
                        color: "#475569",
                        textAlign: "center",
                      }}
                    >
                      {label}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Invoice Details Section */}
              <Typography
                sx={{
                  
                  fontSize: "12px",
                  fontWeight: 700,
                  lineHeight: "16px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#475569",
                  mb: 3,
                }}
              >
                Invoice Details
              </Typography>

              <Box
                sx={{
                  bgcolor: "#F8FAFC",
                  borderRadius: "24px",
                  border: "1px solid #F1F5F9",
                  overflow: "hidden",
                }}
              >
                {/* Detail rows */}
                <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
                  {[
                    { label: "Billing Period", value: DETAIL.billingPeriod },
                    { label: "Payment Method", value: DETAIL.paymentMethod },
                    { label: "Funding Source", value: DETAIL.fundingSource, highlight: true },
                  ].map(({ label, value, highlight }) => (
                    <Box
                      key={label}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          
                          fontSize: "14px",
                          fontWeight: 500,
                          lineHeight: "20px",
                          color: "#475569",
                        }}
                      >
                        {label}
                      </Typography>
                      <Typography
                        sx={{
                          
                          fontSize: "14px",
                          fontWeight: 700,
                          lineHeight: "20px",
                          color: highlight ? "#2563EB" : "#0D0F12",
                        }}
                      >
                        {value}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                {/* Line Items Table */}
                <Box
                  sx={{
                    bgcolor: "#fff",
                    borderTop: "0.8px solid #F1F5F9",
                  }}
                >
                  {/* Table Header */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "2fr 1fr 1fr",
                      px: 3,
                      py: 1.5,
                    }}
                  >
                    {["DESCRIPTION", "HOURS", "TOTAL"].map((h) => (
                      <Typography
                        key={h}
                        sx={{
                          
                          fontSize: "11px",
                          fontWeight: 700,
                          lineHeight: "16px",
                          letterSpacing: "0.05em",
                          textTransform: "uppercase",
                          color: "#666666",
                          textAlign: h === "TOTAL" ? "right" : "left",
                        }}
                      >
                        {h}
                      </Typography>
                    ))}
                  </Box>

                  {/* Table Body */}
                  {DETAIL.lines.map((ln, i) => (
                    <Box
                      key={i}
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "2fr 1fr 1fr",
                        px: 3,
                        py: 1.75,
                        borderTop: "0.8px solid #F8FAFC",
                      }}
                    >
                      <Typography
                        sx={{
                          
                          fontSize: "14px",
                          fontWeight: 500,
                          lineHeight: "20px",
                          color: "#0D0F12",
                        }}
                      >
                        {ln.desc}
                      </Typography>
                      <Typography
                        sx={{
                          
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "20px",
                          color: "#475569",
                        }}
                      >
                        {ln.hours}
                      </Typography>
                      <Typography
                        sx={{
                          
                          fontSize: "14px",
                          fontWeight: 700,
                          lineHeight: "20px",
                          color: "#0D0F12",
                          textAlign: "right",
                        }}
                      >
                        {ln.total}
                      </Typography>
                    </Box>
                  ))}

                  {/* Footer totals */}
                  <Box sx={{ borderTop: "0.8px solid #E2E8F0" }}>
                    {[
                      { label: "Subtotal", val: DETAIL.subtotal },
                      { label: "VAT (0%)", val: DETAIL.vat },
                    ].map(({ label, val }) => (
                      <Box
                        key={label}
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "2fr 1fr 1fr",
                          px: 3,
                          py: 1,
                        }}
                      >
                        <Box />
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: 700,
                            lineHeight: "20px",
                            color: "#475569",
                          }}
                        >
                          {label}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: 700,
                            lineHeight: "20px",
                            color: "#0D0F12",
                            textAlign: "right",
                          }}
                        >
                          {val}
                        </Typography>
                      </Box>
                    ))}
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "2fr 1fr 1fr",
                        px: 3,
                        py: 1.5,
                      }}
                    >
                      <Box />
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 700,
                          fontStyle: "italic",
                          lineHeight: "20px",
                          color: "#0D0F12",
                        }}
                      >
                        TOTAL
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 700,
                          fontStyle: "italic",
                          lineHeight: "20px",
                          color: "#0D0F12",
                          textAlign: "right",
                        }}
                      >
                        {DETAIL.total}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Drawer>

      <InvoicePreviewModal
        open={!!previewOpen}
        onClose={() => setPreviewOpen(null)}
        invoice={previewOpen}
      />
      <CreateInvoiceModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />
    </Box>
  );
}

