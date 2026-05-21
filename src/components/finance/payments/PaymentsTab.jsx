import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Download from "@mui/icons-material/Download";
import RecordPaymentModal from "../modals/RecordPaymentModal";
import PaymentRecordedSuccessModal from "../modals/PaymentRecordedSuccessModal";
import TransactionDetailDrawer from "./TransactionDetailDrawer";

const INITIAL_PAYMENTS = [
  {
    date: "Mar 02, 2024",
    client: "Arthur Morgan",
    method: "Direct Debit",
    amount: "£1,250.00",
    reference: "TXN-98234",
    status: "COMPLETED",
  },
  {
    date: "Mar 01, 2024",
    client: "Charles Smith",
    method: "Bank Transfer",
    amount: "£950.00",
    reference: "TXN-98235",
    status: "COMPLETED",
  },
  {
    date: "Feb 28, 2024",
    client: "Bill Williamson",
    method: "Credit Card",
    amount: "£1,100.00",
    reference: "TXN-98236",
    status: "COMPLETED",
  },
  {
    date: "Feb 27, 2024",
    client: "Sadie Adler",
    method: "Direct Debit",
    amount: "£840.00",
    reference: "TXN-98237",
    status: "PROCESSING",
  },
];

const labelSx = {
  fontSize: "12px",
  fontWeight: 700,
  color: "#475569",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

export default function PaymentsTab() {
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);
  // Modals & Drawer State
  const [recordOpen, setRecordOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [recordedAmount, setRecordedAmount] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);


  // Handle Recording a New Payment
  const handleRecordPayment = (newPayment) => {
    setPayments((prev) => [newPayment, ...prev]);
    setRecordedAmount(newPayment.amount);
    setSuccessOpen(true);
  };

  // Download Receipt as a TXT file
  const handleDownloadReceipt = (payment) => {
    if (!payment) return;
    const content = `=========================================
           PAYMENT RECEIPT
=========================================
Reference No:  ${payment.reference}
Date:          ${payment.date}
Client Name:   ${payment.client}
Payment Method: ${payment.method}
Amount Paid:   ${payment.amount}
Status:        ${payment.status}

-----------------------------------------
Thank you for your payment!
=========================================`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `receipt_${payment.reference}.txt`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to CSV Functionality
  const handleExportCSV = () => {
    const headers = "Date,Client,Method,Amount,Reference,Status\n";
    const rows = payments
      .map(
        (p) =>
          `"${p.date}","${p.client}","${p.method}","${p.amount.replace(
            "£",
            "",
          )}","${p.reference}","${p.status}"`,
      )
      .join("\n");
    const blob = new Blob([headers + rows], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "payment_transactions.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
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
        {/* Card Header (Payment Transactions title + primary actions) */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 3,
            py: 3,
            borderBottom: "0.8px solid #FFFFFF",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "16px",
              lineHeight: "24px",
              color: "#0D0F12",
            }}
          >
            Payment Transactions
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {/* Export CSV Button */}
            <Button
              onClick={handleExportCSV}
              startIcon={<Download />}
              sx={{
                bgcolor: "#FFFFFF",
                borderRadius: "12px",
                border: "1px solid #E2E8F0",
                color: "#475569",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "14px",
                px: 2.5,
                py: 1,
                "&:hover": { bgcolor: "#F8FAFC" },
              }}
            >
              Export CSV
            </Button>

            {/* Record Payment Button */}
            <Button
              onClick={() => setRecordOpen(true)}
              startIcon={<AddIcon sx={{ fontSize: 18 }} />}
              sx={{
                width: 178,
                height: 36,
                background: "linear-gradient(90deg, #0EA5E9 0%, #8AC642 100%)",
                color: "#FFFFFF",
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "14px",
                boxShadow:
                  "0px 4px 6px -4px #E0F2FE, 0px 10px 15px -3px #E0F2FE",
                "&:hover": { opacity: 0.95 },
              }}
            >
              Record Payment
            </Button>
          </Box>
        </Box>

        {/* Table Body Container */}
        <Box sx={{ overflowX: "auto" }}>
          {/* Header Row */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns:
                "185.4fr 214.56fr 196.98fr 153.54fr 160.91fr 181.54fr 185.48fr",
              px: 3,
              py: 2,
              bgcolor: "#FFFFFF",
              minWidth: 1000,
            }}
          >
            <Typography sx={labelSx}>Date</Typography>
            <Typography sx={labelSx}>Client</Typography>
            <Typography sx={labelSx}>Method</Typography>
            <Typography sx={labelSx}>Amount</Typography>
            <Typography sx={labelSx}>Reference</Typography>
            <Typography sx={labelSx}>Status</Typography>
            <Typography sx={{ ...labelSx, textAlign: "right" }}>
              Actions
            </Typography>
          </Box>

          {/* Table Data Rows */}
          {payments.length === 0 ? (
            <Box sx={{ py: 8, textAlign: "center", bgcolor: "#FFFFFF" }}>
              <Typography fontSize="14px" fontWeight={500} color="#94A3B8">
                No matching transactions found.
              </Typography>
            </Box>
          ) : (
            payments.map((p, i) => {
              const isCompleted = p.status === "COMPLETED";
              return (
                <Box
                  key={`${p.reference}-${i}`}
                  onClick={() => setSelectedPayment(p)}
                  sx={{
                    display: "grid",
                    gridTemplateColumns:
                      "185.4fr 214.56fr 196.98fr 153.54fr 160.91fr 181.54fr 185.48fr",
                    px: 3,
                    py: 2.25,
                    borderTop: "0.8px solid #FFFFFF",
                    alignItems: "center",
                    cursor: "pointer",
                    minWidth: 1000,
                    transition: "background-color 0.15s ease",
                  }}
                >
                  {/* Date */}
                  <Typography fontSize="14px" color="#666666" fontWeight={500}>
                    {p.date}
                  </Typography>

                  {/* Client Avatar + Name */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        fontSize: "12px",
                        fontWeight: 800,
                        bgcolor: "#FFFFFF",
                        color: "#0EA5E9",
                      }}
                    >
                      {p.client[0]}
                    </Avatar>
                    <Typography
                      fontSize="14px"
                      fontWeight={700}
                      color="#0D0F12"
                    >
                      {p.client}
                    </Typography>
                  </Box>

                  {/* Method */}
                  <Typography fontSize="14px" color="#475569" fontWeight={500}>
                    {p.method}
                  </Typography>

                  {/* Amount */}
                  <Typography fontSize="14px" fontWeight={700} color="#0D0F12">
                    {p.amount}
                  </Typography>

                  {/* Reference */}
                  <Typography
                    fontSize="14px"
                    color="#666666"
                    fontWeight={500}
                    fontFamily="Consolas"
                  >
                    {p.reference}
                  </Typography>

                  {/* Status Badge Pill */}
                  <Box>
                    <Box
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: "9999px",
                        bgcolor: "#FFFFFF",
                        color: isCompleted ? "#059669" : "#D97706",
                        fontSize: "10px",
                        fontWeight: 700,
                        display: "inline-flex",
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                      }}
                    >
                      {p.status}
                    </Box>
                  </Box>

                  {/* Actions */}
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      size="small"
                      onClick={() => handleDownloadReceipt(p)}
                      startIcon={<Download sx={{ fontSize: 12 }} />}
                      sx={{
                        bgcolor: "#FFFFFF",
                        borderRadius: "8px",
                        border: "1px solid #E2E8F0",
                        color: "#2563EB",
                        textTransform: "none",
                        fontWeight: 700,
                        fontSize: "10px",
                        px: 2,
                        py: 0.5,
                        boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
                        "&:hover": { bgcolor: "#F8FAFC" },
                      }}
                    >
                      RECEIPT
                    </Button>
                  </Box>
                </Box>
              );
            })
          )}
        </Box>
      </Box>

      {/* Integration Modals & Drawer */}
      <RecordPaymentModal
        open={recordOpen}
        onClose={() => setRecordOpen(false)}
        onRecord={handleRecordPayment}
      />

      <PaymentRecordedSuccessModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        amount={recordedAmount}
      />

      <TransactionDetailDrawer
        open={Boolean(selectedPayment)}
        onClose={() => setSelectedPayment(null)}
        payment={selectedPayment}
        onViewReceipt={() => {
          handleDownloadReceipt(selectedPayment);
          setSelectedPayment(null);
        }}
      />
    </Box>
  );
}
