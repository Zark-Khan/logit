import React from "react";
import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import ReportsLibrary from "../components/reports/ReportsLibrary";
import ReportCategoryDetail from "../components/reports/ReportCategoryDetail";
import ReportViewer from "../components/reports/ReportViewer";

export default function ReportsPage() {
  return (
    <Box sx={{ py: 3, pb: 10 }}>
      <Routes>
        <Route index element={<ReportsLibrary />} />
        <Route path=":categoryId" element={<ReportCategoryDetail />} />
        <Route path=":categoryId/:reportId" element={<ReportViewer />} />
      </Routes>
    </Box>
  );
}
