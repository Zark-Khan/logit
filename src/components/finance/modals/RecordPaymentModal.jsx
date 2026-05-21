import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Paper,
  Avatar,
  ClickAwayListener,
  Popper,
  Fade,
  Divider,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SyncIcon from "@mui/icons-material/Sync";
import CheckIcon from "@mui/icons-material/Check";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const CLIENTS = [
  { name: "Arthur Morgan", sub: "Private Funding · ID: CL-2094", color: "#0EA5E9" },
  { name: "Sadie Adler", sub: "Private Funding · ID: CL-2094", color: "#E11D48" },
  { name: "John Marston", sub: "Private Funding · ID: CL-2094", color: "#D97706" },
  { name: "Charles Smith", sub: "Private Funding · ID: CL-2094", color: "#059669" },
  { name: "Bill Williamson", sub: "Private Funding · ID: CL-2094", color: "#8B5CF6" },
];

const PAYMENT_METHODS = [
  { id: "Bank Transfer", label: "Bank Transfer", icon: <AccountBalanceIcon sx={{ fontSize: 16 }} /> },
  { id: "Credit Card", label: "Credit Card", icon: <CreditCardIcon sx={{ fontSize: 16 }} /> },
  { id: "Direct Debit", label: "Direct Debit", icon: <SyncIcon sx={{ fontSize: 16 }} /> },
  { id: "Cash", label: "Cash", icon: <AttachMoneyIcon sx={{ fontSize: 16 }} /> },
];

// Helper component for bold input labels
const Label = ({ children }) => (
  <Typography
    fontSize="13px"
    fontWeight={700}
    color="#0D0F12"
    sx={{ mb: 0.75, fontFamily: '"Poppins", sans-serif' }}
  >
    {children}
  </Typography>
);

export default function RecordPaymentModal({ open, onClose, onRecord }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("Bank Transfer");
  const [reference, setReference] = useState("");

  const containerRef = useRef(null);
  const clientInputRef = useRef(null);

  // Set default date to today's date in local YYYY-MM-DD
  useEffect(() => {
    if (open) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      setDate(`${yyyy}-${mm}-${dd}`);
      
      // Reset form states on reopen
      setSearchQuery("");
      setSelectedClient(null);
      setAmount("");
      setSelectedMethod("Bank Transfer");
      setReference("");
      setShowDropdown(false);
    }
  }, [open]);

  const filteredClients = CLIENTS.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Deterministic format to "MMM DD, YYYY"
  const formatDateStr = (dateStr) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length !== 3) return dateStr;
    const year = parts[0];
    const monthIdx = parseInt(parts[1], 10) - 1;
    const day = parts[2];

    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const monthName = months[monthIdx] || "Jan";
    const formattedDay = day.padStart(2, "0");

    return `${monthName} ${formattedDay}, ${year}`;
  };

  const handleRecord = () => {
    const clientName = selectedClient ? selectedClient.name : searchQuery.trim();
    // if (!clientName) {
    //   alert("Please select or enter a client.");
    //   return;
    // }
    // if (!amount || isNaN(parseFloat(amount))) {
    //   alert("Please enter a valid amount.");
    //   return;
    // }

    const formattedAmount = `£${parseFloat(amount).toLocaleString("en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

    const newPayment = {
      date: formatDateStr(date),
      client: clientName,
      method: selectedMethod,
      amount: formattedAmount,
      reference: reference.trim() || `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
      status: "COMPLETED",
    };

    onRecord(newPayment);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: 512,
          maxHeight: "90vh", // Scrollable center if it hits height limit
          borderRadius: "24px",
          boxShadow: "0px 25px 50px -12px rgba(0, 0, 0, 0.15)",
          overflow: "hidden", // Locks header and footer in place
          display: "flex",
          flexDirection: "column",
          bgcolor: "#FFFFFF",
        },
      }}
      sx={{
        zIndex: 1301,
        "& .MuiBackdrop-root": {
          bgcolor: "rgba(15, 23, 42, 0.4)",
          backdropFilter: "blur(8px)",
        },
      }}
    >
      {/* Sticky Header Section */}
      <Box sx={{ px: 3.5, pt: 3.5, pb: 2.25, display: "flex", justifyContent: "space-between", alignItems: "flex-start", bgcolor: "#FFFFFF" }}>
        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
          {/* Green dollar icon container */}
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "12px",
              bgcolor: "#E6FBF3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1.5px solid #D1FAE5",
              flexShrink: 0,
            }}
          >
            <AttachMoneyIcon sx={{ color: "#10B981", fontSize: 22 }} />
          </Box>
          <Box>
            <Typography fontSize="18px" fontWeight={800} color="#0D0F12" sx={{ lineHeight: 1.2 }}>
              Record Payment
            </Typography>
            <Typography fontSize="12px" color="#64748B" fontWeight={500} mt={0.5}>
              Manually record a payment from a client
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: "#94A3B8",
            bgcolor: "#F8FAFC",
            border: "1px solid #F1F5F9",
            "&:hover": { bgcolor: "#F1F5F9" },
          }}
        >
          <CloseIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>

      {/* Header Divider (0.8px #F8FAFC style or consistent light theme) */}
      <Divider sx={{ borderColor: "#F8FAFC", borderWidth: "0.8px" }} />

      {/* Scrollable Center Form Content */}
      <Box 
        ref={containerRef} 
        sx={{ 
          px: 3.5, 
          py: 2.5, 
          overflowY: "auto", 
          display: "flex", 
          flexDirection: "column", 
          gap: 2.25, 
          flex: 1,
          bgcolor: "#FFFFFF"
        }}
      >
        {/* Select Client Field */}
        <ClickAwayListener onClickAway={() => setShowDropdown(false)}>
          <Box>
            <Label>Select Client</Label>
            <TextField
              ref={clientInputRef}
              fullWidth
              size="small"
              placeholder="Search for a client..."
              value={searchQuery}
              onFocus={() => {
                setShowDropdown(true);
              }}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (selectedClient && e.target.value !== selectedClient.name) {
                  setSelectedClient(null);
                }
                setShowDropdown(true);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#94A3B8", fontSize: 18 }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",
                  bgcolor: "#F8FAFC",
                  "& fieldset": { borderColor: "#E2E8F0" },
                  "&:hover fieldset": { borderColor: "#CBD5E1" },
                  "&.Mui-focused fieldset": { borderColor: "#0EA5E9", borderWidth: "1.5px" },
                },
              }}
            />
            {/* Popper based Auto-complete dropdown */}
            <Popper
              open={showDropdown && Boolean(clientInputRef.current)}
              anchorEl={clientInputRef.current}
              placement="bottom-start"
              transition
              style={{ zIndex: 1400, width: clientInputRef.current ? clientInputRef.current.clientWidth : "auto" }}
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={150}>
                  <Paper
                    elevation={3}
                    sx={{
                      mt: 1,
                      borderRadius: "14px",
                      maxHeight: 180,
                      overflowY: "auto",
                      border: "1px solid #F1F5F9",
                      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.04)",
                      bgcolor: "#FFFFFF",
                    }}
                  >
                    {filteredClients.map((client) => (
                      <MenuItem
                        key={client.name}
                        onClick={() => {
                          setSelectedClient(client);
                          setSearchQuery(client.name);
                          setShowDropdown(false);
                        }}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          p: 1.5,
                          transition: "background-color 0.15s",
                          "&:hover": { bgcolor: "#F8FAFC" },
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 28,
                            height: 28,
                            fontSize: "11px",
                            fontWeight: 800,
                            bgcolor: client.color + "20",
                            color: client.color,
                          }}
                        >
                          {client.name[0]}
                        </Avatar>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                          <Typography fontSize="13px" fontWeight={700} color="#0D0F12" sx={{ lineHeight: 1.2 }}>
                            {client.name}
                          </Typography>
                          <Typography fontSize="10px" color="#94A3B8" fontWeight={500} sx={{ mt: 0.25 }}>
                            {client.sub}
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))}
                    {filteredClients.length === 0 && (
                      <Typography fontSize="12px" color="#94A3B8" sx={{ p: 2, textAlign: "center" }}>
                        No matching clients found
                      </Typography>
                    )}
                  </Paper>
                </Fade>
              )}
            </Popper>
          </Box>
        </ClickAwayListener>

        {/* Date & Amount Row */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* Payment Date */}
          <Box sx={{ flex: 1 }}>
            <Label>Payment Date</Label>
            <TextField
              type="date"
              fullWidth
              size="small"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarTodayIcon sx={{ color: "#94A3B8", fontSize: 16, mr: 0.5 }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",
                  bgcolor: "#F8FAFC",
                  "& fieldset": { borderColor: "#E2E8F0" },
                  "&:hover fieldset": { borderColor: "#CBD5E1" },
                  "&.Mui-focused fieldset": { borderColor: "#0EA5E9", borderWidth: "1.5px" },
                },
                "& input": {
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: "13px",
                  color: "#0D0F12",
                  fontWeight: 500,
                },
              }}
            />
          </Box>

          {/* Amount */}
          <Box sx={{ flex: 1 }}>
            <Label>Amount</Label>
            <TextField
              fullWidth
              size="small"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ mr: 1 }}>
                    <Typography sx={{ color: "#94A3B8", fontWeight: 700, fontSize: "14px" }}>£</Typography>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",
                  bgcolor: "#F8FAFC",
                  "& fieldset": { borderColor: "#E2E8F0" },
                  "&:hover fieldset": { borderColor: "#CBD5E1" },
                  "&.Mui-focused fieldset": { borderColor: "#0EA5E9", borderWidth: "1.5px" },
                },
                "& input": {
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: "13px",
                  color: "#0D0F12",
                  fontWeight: 600,
                },
              }}
            />
          </Box>
        </Box>

        {/* Payment Method 2x2 Grid */}
        <Box>
          <Label>Payment Method</Label>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
            {PAYMENT_METHODS.map((method) => {
              const isSelected = selectedMethod === method.id;
              return (
                <Box
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    p: 1.5,
                    borderRadius: "14px",
                    border: "1.5px solid",
                    borderColor: isSelected ? "#0EA5E9" : "#F1F5F9",
                    bgcolor: isSelected ? "#E0F5FF33" : "#FFFFFF",
                    cursor: "pointer",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      borderColor: isSelected ? "#0EA5E9" : "#CBD5E1",
                      bgcolor: isSelected ? "#E0F5FF33" : "#F8FAFC",
                    },
                  }}
                >
                  {/* Small icon circle */}
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      bgcolor: isSelected ? "#0EA5E915" : "#F1F5F9",
                      color: isSelected ? "#0EA5E9" : "#64748B",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "all 0.2s",
                    }}
                  >
                    {method.icon}
                  </Box>
                  <Typography fontSize="13px" fontWeight={700} color={isSelected ? "#0EA5E9" : "#0D0F12"} transition="all 0.2s">
                    {method.label}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Reference / Transaction ID */}
        <Box>
          <Label>Reference / Transaction ID</Label>
          <TextField
            fullWidth
            size="small"
            placeholder="e.g. TXN-98234"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "14px",
                bgcolor: "#F8FAFC",
                "& fieldset": { borderColor: "#E2E8F0" },
                "&:hover fieldset": { borderColor: "#CBD5E1" },
                "&.Mui-focused fieldset": { borderColor: "#0EA5E9", borderWidth: "1.5px" },
              },
              "& input": {
                fontFamily: '"Poppins", sans-serif',
                fontSize: "13px",
                color: "#0D0F12",
                fontWeight: 500,
              },
            }}
          />
        </Box>

        {/* Auto-Apply Alert Banner */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1.5,
            p: 2,
            borderRadius: "16px",
            bgcolor: "#F0F7FF",
            border: "1px solid #E0F2FE",
          }}
        >
          {/* Blue check icon in white circle */}
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              bgcolor: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1.5px solid #BFDBFE",
              flexShrink: 0,
              boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
            }}
          >
            <CheckIcon sx={{ color: "#2563EB", fontSize: 13, stroke: "currentColor", strokeWidth: 1.5 }} />
          </Box>
          <Box>
            <Typography fontSize="12px" fontWeight={800} color="#1E3A8A" sx={{ lineHeight: 1.2, mb: 0.5 }}>
              Auto-Apply to Invoice
            </Typography>
            <Typography fontSize="11px" color="#3B82F6" fontWeight={500} sx={{ lineHeight: 1.4 }}>
              This payment will be automatically applied to the oldest outstanding invoice for this client.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Footer Divider (0.8px #F8FAFC style or consistent light theme) */}
      <Divider sx={{ borderColor: "#F8FAFC", borderWidth: "0.8px" }} />

      {/* Sticky Footer Section */}
      <Box sx={{ px: 3.5, pt: 2.25, pb: 3.5, display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: "#FFFFFF" }}>
        {/* Cancel Button */}
        <Button
          onClick={onClose}
          sx={{
            bgcolor: "#F1F5F9",
            color: "#475569",
            borderRadius: "16px",
            px: 3.5,
            py: 1.25,
            textTransform: "none",
            fontWeight: 700,
            fontSize: "14px",
            fontFamily: '"Poppins", sans-serif',
            "&:hover": { bgcolor: "#E2E8F0" },
          }}
        >
          Cancel
        </Button>

        {/* Record Payment Button */}
        <Button
          onClick={handleRecord}
          endIcon={<ChevronRightIcon sx={{ fontSize: 16 }} />}
          sx={{
            bgcolor: "#009BE5",
            color: "#FFFFFF",
            borderRadius: "16px",
            px: 3.5,
            py: 1.25,
            textTransform: "none",
            fontWeight: 700,
            fontSize: "14px",
            fontFamily: '"Poppins", sans-serif',
            boxShadow: "0px 8px 16px rgba(0, 155, 229, 0.2)",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              bgcolor: "#0084C1",
              boxShadow: "none",
            },
          }}
        >
          Record Payment
        </Button>
      </Box>
    </Dialog>
  );
}
