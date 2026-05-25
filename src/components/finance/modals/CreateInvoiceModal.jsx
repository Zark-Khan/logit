import React, { useState } from "react";
import {
  Dialog,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  TextField,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

const CLIENTS = [
  {
    name: "Arthur Morgan",
    sub: "Private Funding • ID: CL-2934",
    avatarColor: "#E0F2FE",
    textColor: "#0EA5E9",
    initials: "A",
    address: "221B Baker Street, London, NW1 6XE, United Kingdom",
  },
  {
    name: "Sadie Adler",
    sub: "Private Funding • ID: CL-2934",
    avatarColor: "#E0F2FE",
    textColor: "#0EA5E9",
    initials: "S",
    address: "102 Outlaw Trail, Austin, TX 78701, United States",
  },
  {
    name: "John Marston",
    sub: "Private Funding • ID: CL-2934",
    avatarColor: "#E0F2FE",
    textColor: "#0EA5E9",
    initials: "J",
    address: "Beecher's Hope, West Elizabeth, NW 8901, United States",
  },
];

const StepDot = ({ n, active }) => (
  <Box
    sx={{
      width: 40,
      height: 40,
      borderRadius: "50%",
      bgcolor: active ? "#0EA5E9" : "#fff",
      border: active ? "none" : "1px solid #F1F5F9",
      color: active ? "#fff" : "#475569",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      fontWeight: 700,
      transition: "all 0.3s ease",
    }}
  >
    {n}
  </Box>
);

export default function CreateInvoiceModal({ open, onClose }) {
  const [step, setStep] = useState(0);
  const [selectedClient, setSelectedClient] = useState(CLIENTS[0]); // default select first client for smoother preview
  const [searchQuery, setSearchQuery] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [lineItems, setLineItems] = useState([
    { name: "Domiciliary Care Services", hours: 40, rate: 25.0 },
  ]);

  // Form states for adding items inline
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemHours, setNewItemHours] = useState("");
  const [newItemRate, setNewItemRate] = useState("");

  const handleAddItemSubmit = () => {
    if (newItemName && newItemHours && newItemRate) {
      setLineItems([
        ...lineItems,
        {
          name: newItemName,
          hours: parseFloat(newItemHours) || 0,
          rate: parseFloat(newItemRate) || 0,
        },
      ]);
      setNewItemName("");
      setNewItemHours("");
      setNewItemRate("");
      setShowAddForm(false);
    }
  };

  const handleClose = () => {
    setStep(0);
    setSelectedClient(CLIENTS[0]);
    setSearchQuery("");
    setInvoiceDate("");
    setDueDate("");
    setLineItems([
      { name: "Domiciliary Care Services", hours: 40, rate: 25.0 },
    ]);
    setShowAddForm(false);
    onClose();
  };

  const filteredClients = CLIENTS.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalAmount = lineItems.reduce(
    (sum, item) => sum + item.hours * item.rate,
    0,
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: step === 3 ? 448 : 672,
          borderRadius: "32px",
          boxShadow: "0 24px 48px -12px rgba(16,24,40,0.18)",
          overflow: "hidden",
          p: 0,
          display: "flex",
          flexDirection: "column",
          maxHeight: "90vh",
        },
      }}
    >
      {/* Header - Only display for steps 1, 2, 3 (0, 1, 2 in code indices) */}
      {step < 3 && (
        <Box sx={{ px: 5, pt: 5, pb: 2, bgcolor: "#fff" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
              {/* Light blue circular container with plus icon */}
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "16px",
                  bgcolor: "#F0F9FF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1.5px solid #E0F2FE",
                }}
              >
                <AddIcon sx={{ color: "#0EA5E9", fontSize: 20 }} />
              </Box>
              <Box>
                <Typography
                  fontSize="20px"
                  fontWeight={700}
                  color="text.primary"
                  sx={{ lineHeight: 1.2 }}
                >
                  Create New Invoice
                </Typography>
                <Typography
                  fontSize="10px"
                  color="text.light"
                  fontWeight={400}
                  sx={{ mt: 0.5 }}
                >
                  Manually generate an invoice for a client
                </Typography>
              </Box>
            </Box>
            <IconButton
              size="small"
              onClick={handleClose}
              sx={{
                color: "text.light",
                bgcolor: "#fff",
                border: "1.5px solid #F1F5F9",
                "&:hover": { bgcolor: "#F8FAFC" },
                width: 36,
                height: 36,
              }}
            >
              <CloseIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>

          {/* Step Dots */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 1 }}>
            <Box sx={{ position: "relative", width: "100%", maxWidth: 350 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  zIndex: 2,
                  position: "relative",
                }}
              >
                {[1, 2, 3].map((n, i) => (
                  <StepDot key={n} n={n} active={step >= i} />
                ))}
              </Box>
              {/* Connecting background line */}
              <Box
                sx={{
                  position: "absolute",
                  left: 16,
                  right: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  height: "1.5px",
                  bgcolor: "#E2E8F0",
                  zIndex: 1,
                }}
              />
            </Box>
          </Box>
        </Box>
      )}

      {/* Step 1: Select Client */}
      {step === 0 && (
        <Box
          sx={{
            px: 5,
            pb: 5,
            pt: 3,
            bgcolor: "#fff",
            flex: 1,
            overflowY: "auto",
          }}
        >
          <Typography
            fontSize="14px"
            fontWeight={700}
            color="text.primary"
            mb={2}
          >
            Select Client
          </Typography>
          <TextField
            fullWidth
            placeholder="Search for a client..."
            size="medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                bgcolor: "#F8FAFC",
                px: 2,
                "& fieldset": { border: "none" },
                "&:hover fieldset": { border: "none" },
                "&.Mui-focused fieldset": { border: "1px solid #0EA5E9" },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#94A3B8", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {filteredClients.map((c) => {
              const isSelected = selectedClient?.name === c.name;
              return (
                <Box
                  key={c.name}
                  onClick={() => setSelectedClient(c)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    py: 2.25,
                    px: 3,
                    border: "1px solid #F1F5F9",
                    borderRadius: "16px",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    bgcolor: isSelected ? "#E0F5FF" : "#fff",
                    "&:hover": {
                      bgcolor: "#E0F5FF",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        bgcolor: "#F1F5F9",
                        color: "text.primary",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "14px",
                        fontWeight: 700,
                      }}
                    >
                      {c.initials}
                    </Box>
                    <Box>
                      <Typography
                        fontSize="14px"
                        fontWeight={700}
                        color="text.primary"
                      >
                        {c.name}
                      </Typography>
                      <Typography
                        fontSize="12px"
                        color="text.light"
                        fontWeight={400}
                        sx={{ mt: 0.25 }}
                      >
                        {c.sub}
                      </Typography>
                    </Box>
                  </Box>
                  <KeyboardArrowRightIcon
                    sx={{
                      color: "#CBD5E1",
                      fontSize: 22,
                    }}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
      )}

      {/* Step 2: Invoice Details */}
      {step === 1 && (
        <Box
          sx={{
            px: 5,
            pb: 5,
            pt: 3,
            bgcolor: "#fff",
            flex: 1,
            overflowY: "auto",
          }}
        >
          <Box sx={{ display: "flex", gap: 3.5, mb: 4.5 }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                fontSize="14px"
                fontWeight={700}
                color="text.primary"
                mb={1.25}
              >
                Invoice Date
              </Typography>
              <TextField
                fullWidth
                type="date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "16px",
                    bgcolor: "#F8FAFC",
                    px: 1.5,
                    "& fieldset": { border: "none" },
                    "&:hover fieldset": { border: "none" },
                    "&.Mui-focused fieldset": { border: "1px solid #0EA5E9" },
                  },
                  "& .MuiInputBase-input": {
                    color: "#84919A",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayOutlinedIcon
                        sx={{ color: "#84919A", fontSize: 18 }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                fontSize="14px"
                fontWeight={700}
                color="text.primary"
                mb={1.25}
              >
                Due Date
              </Typography>
              <TextField
                fullWidth
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "16px",
                    bgcolor: "#F8FAFC",
                    px: 1.5,
                    "& fieldset": { border: "none" },
                    "&:hover fieldset": { border: "none" },
                    "&.Mui-focused fieldset": { border: "1px solid #0EA5E9" },
                  },
                  "& .MuiInputBase-input": {
                    color: "#84919A",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayOutlinedIcon
                        sx={{ color: "#84919A", fontSize: 18 }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2.5,
            }}
          >
            <Typography fontSize="14px" fontWeight={700} color="text.primary">
              Line Items
            </Typography>
            <Button
              startIcon={<AddIcon sx={{ fontSize: 16 }} />}
              onClick={() => setShowAddForm(true)}
              sx={{
                textTransform: "none",
                fontWeight: 700,
                fontSize: "12px",
                color: "#0EA5E9",
                "&:hover": { bgcolor: "transparent", opacity: 0.8 },
                p: 0,
              }}
            >
              Add Item
            </Button>
          </Box>

          {/* Line Item addition form */}
          {showAddForm && (
            <Box
              sx={{
                p: 2.5,
                borderRadius: "16px",
                bgcolor: "#F8FAFC",
                border: "1.5px dashed #CBD5E1",
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                mb: 3,
              }}
            >
              <Typography fontSize="12px" fontWeight={700} color="#475569">
                New Line Item Details
              </Typography>
              <Box sx={{ display: "flex", gap: 1.5 }}>
                <TextField
                  placeholder="Item Description"
                  size="small"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  sx={{
                    flex: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      bgcolor: "#fff",
                    },
                  }}
                />
                <TextField
                  placeholder="Hours"
                  size="small"
                  type="number"
                  value={newItemHours}
                  onChange={(e) => setNewItemHours(e.target.value)}
                  sx={{
                    flex: 1,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      bgcolor: "#fff",
                    },
                  }}
                />
                <TextField
                  placeholder="Rate (£)"
                  size="small"
                  type="number"
                  value={newItemRate}
                  onChange={(e) => setNewItemRate(e.target.value)}
                  sx={{
                    flex: 1,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      bgcolor: "#fff",
                    },
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                <Button
                  size="small"
                  onClick={() => setShowAddForm(false)}
                  sx={{
                    textTransform: "none",
                    color: "text.light",
                    fontWeight: 600,
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleAddItemSubmit}
                  sx={{
                    textTransform: "none",
                    bgcolor: "#0EA5E9",
                    borderRadius: "8px",
                    fontWeight: 600,
                    "&:hover": { bgcolor: "#0284C7" },
                  }}
                >
                  Add
                </Button>
              </Box>
            </Box>
          )}

          {/* Line Items List */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {lineItems.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 2.5,
                  px: 3.5,
                  borderRadius: "16px",
                  bgcolor: "#F8FAFC",
                  border: "#F1F5F9",
                }}
              >
                <Box sx={{ flex: 2 }}>
                  <Typography
                    fontSize="14px"
                    fontWeight={700}
                    color="text.primary"
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    fontSize="10px"
                    fontWeight={700}
                    color="#64748B"
                    sx={{ letterSpacing: "0.05em", mt: 0.5 }}
                  >
                    SERVICE
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, textAlign: "center" }}>
                  <Typography
                    fontSize="14px"
                    fontWeight={700}
                    color="text.primary"
                  >
                    {item.hours}
                  </Typography>
                  <Typography
                    fontSize="10px"
                    fontWeight={700}
                    color="#64748B"
                    sx={{ letterSpacing: "0.05em", mt: 0.5 }}
                  >
                    HOURS
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, textAlign: "right" }}>
                  <Typography
                    fontSize="14px"
                    fontWeight={700}
                    color="text.primary"
                  >
                    £ {item.rate.toFixed(2)}
                  </Typography>
                  <Typography
                    fontSize="10px"
                    fontWeight={700}
                    color="#64748B"
                    sx={{ letterSpacing: "0.05em", mt: 0.5 }}
                  >
                    RATE
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {step === 2 && (
        <Box
          sx={{
            px: 5,
            pb: 5,
            pt: 3,
            bgcolor: "#fff",
            flex: 1,
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              p: 4,
              borderRadius: "24px",
              bgcolor: "#F8FAFC",
              border: "1px solid #F1F5F9",
              mb: 1.5,
            }}
          >
            {/* Brand Header */}
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}
            >
              <Box>
                <Typography
                  fontSize="24px"
                  fontWeight={900}
                  fontStyle="italic"
                  color="text.primary"
                  sx={{ letterSpacing: "0.05em", lineHeight: 1.1 }}
                >
                  LOGIT
                </Typography>
                <Typography
                  fontSize="10px"
                  fontWeight={700}
                  color="text.light"
                  sx={{ letterSpacing: "0.08em", mt: 0.5 }}
                >
                  INVOICE PREVIEW
                </Typography>
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Typography
                  fontSize="14px"
                  fontWeight={700}
                  color="text.primary"
                  sx={{ lineHeight: 1.2 }}
                >
                  INV-2024-042
                </Typography>
                <Typography
                  fontSize="12px"
                  fontWeight={400}
                  color="text.light"
                  sx={{ mt: 0.25 }}
                >
                  {invoiceDate
                    ? new Date(invoiceDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Mar 27, 2024"}
                </Typography>
              </Box>
            </Box>

            <Divider
              sx={{ borderColor: "#E2E8F0", borderWidth: "1px", my: 3.5 }}
            />

            {/* Bill To & Total */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Box>
                <Typography
                  fontSize="10px"
                  fontWeight={700}
                  color="text.light"
                  mb={0.75}
                  sx={{ letterSpacing: "0.05em" }}
                >
                  BILL TO
                </Typography>
                <Typography
                  fontSize="14px"
                  fontWeight={700}
                  color="text.primary"
                  mb={0.5}
                >
                  {selectedClient?.name}
                </Typography>
                <Typography
                  fontSize="12px"
                  color="text.light"
                  sx={{ lineHeight: 1.45 }}
                >
                  {selectedClient?.address.split(",")[0]}
                  <br />
                  {selectedClient?.address.split(",").slice(1, 3).join(",")}
                  <br />
                  {selectedClient?.address.split(",").slice(3).join(",")}
                </Typography>
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Typography
                  fontSize="10px"
                  fontWeight={700}
                  color="text.light"
                  mb={0.75}
                  sx={{ letterSpacing: "0.05em" }}
                >
                  TOTAL AMOUNT
                </Typography>
                <Typography
                  fontSize="30px"
                  fontWeight={700}
                  color="text.primary"
                >
                  £
                  {totalAmount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {/* Step 4: Success Screen */}
      {step === 3 && (
        <Box sx={{ px: 4, py: 4, bgcolor: "#fff", textAlign: "center" }}>
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
              mb: 3.5,
            }}
          >
            <svg
              width="33"
              height="33"
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

          <Typography
            fontSize="24px"
            fontWeight={700}
            color="text.primary"
            mb={1.5}
          >
            Invoice Created!
          </Typography>
          <Typography
            fontSize="16px"
            color="text.light"
            sx={{ maxWidth: 340, mx: "auto", mb: 4.5, lineHeight: 1.5 }}
          >
            Invoice INV-2024-042 has been successfully created and sent to the
            client.
          </Typography>

          <Button
            fullWidth
            onClick={handleClose}
            sx={{
              bgcolor: "#0EA5E9",
              color: "#fff",
              borderRadius: "16px",
              py: 2,
              fontWeight: 700,
              fontSize: "14px",
              textTransform: "none",
              boxShadow: "none",
              "&:hover": { bgcolor: "#0284C7" },
            }}
          >
            Back to Invoices
          </Button>
        </Box>
      )}

      {/* Footer controls */}
      {step < 3 && (
        <>
          <Divider sx={{ borderColor: "#F1F5F9", borderWidth: "0.5px" }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 5,
              py: 3.5,
              bgcolor: "#fff",
            }}
          >
            <Button
              onClick={step === 0 ? handleClose : () => setStep((s) => s - 1)}
              sx={{
                bgcolor: "#F1F5F9",
                color: "#475569",
                borderRadius: "16px",
                px: 4,
                py: 1.5,
                textTransform: "none",
                fontWeight: 700,
                fontSize: "14px",
                "&:hover": { bgcolor: "#E2E8F0" },
              }}
            >
              {step === 0 ? (
                "Cancel"
              ) : (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <KeyboardArrowRightIcon
                    sx={{ fontSize: 18, mr: 0.5, transform: "rotate(180deg)" }}
                  />
                  Back
                </Box>
              )}
            </Button>
            <Button
              onClick={() => setStep((s) => s + 1)}
              disabled={step === 0 && !selectedClient}
              sx={{
                bgcolor: "#0EA5E9",
                color: "#fff",
                borderRadius: "16px",
                px: 4.5,
                py: 1.5,
                textTransform: "none",
                fontWeight: 700,
                fontSize: "14px",
                boxShadow: "0 4px 14px 0 rgba(14,165,233,0.39)",
                "&:hover": {
                  bgcolor: "#0284C7",
                  boxShadow: "0 6px 20px rgba(14,165,233,0.23)",
                },
                "&:disabled": {
                  bgcolor: "#E2E8F0",
                  color: "#94A3B8",
                  boxShadow: "none",
                },
              }}
            >
              {step === 0 && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  Continue
                  <KeyboardArrowRightIcon sx={{ fontSize: 18, ml: 0.5 }} />
                </Box>
              )}
              {step === 1 && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  Continue
                  <KeyboardArrowRightIcon sx={{ fontSize: 18, ml: 0.5 }} />
                </Box>
              )}
              {step === 2 && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  Create & Send
                  <KeyboardArrowRightIcon sx={{ fontSize: 18, ml: 0.5 }} />
                </Box>
              )}
            </Button>
          </Box>
        </>
      )}
    </Dialog>
  );
}
