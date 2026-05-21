import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import OverviewTab from "../components/finance/overview/OverviewTab";
import InvoicesTab from "../components/finance/invoices/InvoicesTab";
import PaymentsTab from "../components/finance/payments/PaymentsTab";
import PayrollTab from "../components/finance/payroll/PayrollTab";
import GenerateInvoicesModal from "../components/finance/modals/GenerateInvoicesModal";
import ReviewTimesheetsModal from "../components/finance/modals/ReviewTimesheetsModal";
import ExportReportsModal from "../components/finance/modals/ExportReportsModal";

const TABS = ["Overview", "Invoices", "Payments", "Payroll"];

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState(0);
  const [generateOpen, setGenerateOpen] = useState(false);
  const [timesheetsOpen, setTimesheetsOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  const handleAction = (action) => {
    if (action === "generate") setGenerateOpen(true);
    if (action === "timesheets") setTimesheetsOpen(true);
    if (action === "export") setExportOpen(true);
    if (action === "viewAll") setActiveTab(1);
  };

  return (
    <Box sx={{ py: 3, pb: 10 }}>
      {/* Page Header */}
      <Box sx={{ mb: 5, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <Box>
          <Typography fontSize="24px" fontWeight={700} color="text.primary" mb={0.5}>
            Finance
          </Typography>
          <Typography fontSize="14px" color="text.light">
            Manage billing, payroll, and financial performance
          </Typography>
        </Box>

        {/* Tabs */}
        <Box
          sx={{
            display: "flex",
            p: 0.5,
            border: "1px solid #E2E8F0",
            borderRadius: "16px",
            bgcolor: "#fff",
            gap: 0.5,
          }}
        >
          {TABS.map((tab, i) => (
            <Box
              key={tab}
              onClick={() => setActiveTab(i)}
              sx={{
                px: 2.5,
                py: 1,
                borderRadius: "12px",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s",
                bgcolor: activeTab === i ? "primary.main" : "transparent",
                color: activeTab === i ? "#fff" : "text.light",
                "&:hover": { color: activeTab === i ? "#fff" : "primary.main" },
              }}
            >
              {tab}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Tab Content */}
      <Box>
        {activeTab === 0 && <OverviewTab onAction={handleAction} />}
        {activeTab === 1 && <InvoicesTab />}
        {activeTab === 2 && <PaymentsTab />}
        {activeTab === 3 && <PayrollTab />}
      </Box>

      {/* Modals */}
      <GenerateInvoicesModal open={generateOpen} onClose={() => setGenerateOpen(false)} />
      <ReviewTimesheetsModal open={timesheetsOpen} onClose={() => setTimesheetsOpen(false)} />
      <ExportReportsModal open={exportOpen} onClose={() => setExportOpen(false)} />
    </Box>
  );
}
