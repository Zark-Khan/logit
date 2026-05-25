const fs = require('fs');

function replaceFile(path, regex, replacement) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(regex, replacement);
  fs.writeFileSync(path, content);
}

replaceFile('src/components/careDelivery/incidents/IncidentDetailDrawer.jsx', /,\s*Avatar\b/, '');
replaceFile('src/components/careDelivery/incidents/IncidentDetailDrawer.jsx', /\bAvatar\s*,\s*/, '');
replaceFile('src/components/careDelivery/incidents/IncidentDetailDrawer.jsx', /import\s*{\s*Avatar\s*}\s*from\s*['"]@mui\/material['"];?\n/, '');

replaceFile('src/components/careDelivery/medication/MedicationDetailDrawer.jsx', /import MedicationOutlinedIcon from ['"]@mui\/icons-material\/MedicationOutlined['"];?\n/, '');

replaceFile('src/components/careDelivery/medication/MedicationTab.jsx', /,\s*IconButton\b/, '');
replaceFile('src/components/careDelivery/medication/MedicationTab.jsx', /\bIconButton\s*,\s*/, '');

replaceFile('src/components/careDelivery/visits/VisitDetailDrawer.jsx', /,\s*Grid\b/, '');
replaceFile('src/components/careDelivery/visits/VisitDetailDrawer.jsx', /\bGrid\s*,\s*/, '');

replaceFile('src/components/clientDetail/tabs/CarePlan/ReviewAssessment.jsx', /}, \[categoryId\]\);/, '}, [categoryId, tabs]);');

replaceFile('src/components/clientDetail/tabs/CarePlan/index.jsx', /const outlineBtnSx = \{[^}]+\};\n\n?/g, '');
replaceFile('src/components/clientDetail/tabs/CarePlan/index.jsx', /const outlineBtnSx = \{\n(?:\s+.*?\n)*\s+\};\n/g, ''); // Multiline handle

replaceFile('src/components/finance/invoices/InvoicesTab.jsx', /import CalendarTodayOutlinedIcon from ['"]@mui\/icons-material\/CalendarTodayOutlined['"];?\n/, '');

replaceFile('src/components/finance/modals/ExportReportsModal.jsx', /,\s*Divider\b/, '');
replaceFile('src/components/finance/modals/ExportReportsModal.jsx', /\bDivider\s*,\s*/, '');

replaceFile('src/components/finance/modals/InvoicePreviewModal.jsx', /,\s*Divider\b/, '');
replaceFile('src/components/finance/modals/InvoicePreviewModal.jsx', /\bDivider\s*,\s*/, '');

replaceFile('src/components/finance/modals/PaymentRecordedSuccessModal.jsx', /,\s*Avatar\b/, '');
replaceFile('src/components/finance/modals/PaymentRecordedSuccessModal.jsx', /\bAvatar\s*,\s*/, '');
replaceFile('src/components/finance/modals/PaymentRecordedSuccessModal.jsx', /import CheckIcon from ['"]@mui\/icons-material\/Check['"];?\n/, '');
replaceFile('src/components/finance/modals/PaymentRecordedSuccessModal.jsx', /import ChevronRightIcon from ['"]@mui\/icons-material\/ChevronRight['"];?\n/, '');

replaceFile('src/components/finance/modals/ReviewTimesheetsModal.jsx', /,\s*Divider\b/, '');
replaceFile('src/components/finance/modals/ReviewTimesheetsModal.jsx', /\bDivider\s*,\s*/, '');

replaceFile('src/components/finance/payments/PaymentsTab.jsx', /,\s*TextField\b/, '');
replaceFile('src/components/finance/payments/PaymentsTab.jsx', /\bTextField\s*,\s*/, '');
replaceFile('src/components/finance/payments/PaymentsTab.jsx', /,\s*InputAdornment\b/, '');
replaceFile('src/components/finance/payments/PaymentsTab.jsx', /\bInputAdornment\s*,\s*/, '');
replaceFile('src/components/finance/payments/PaymentsTab.jsx', /,\s*Menu\b/, '');
replaceFile('src/components/finance/payments/PaymentsTab.jsx', /\bMenu\s*,\s*/, '');
replaceFile('src/components/finance/payments/PaymentsTab.jsx', /,\s*MenuItem\b/, '');
replaceFile('src/components/finance/payments/PaymentsTab.jsx', /\bMenuItem\s*,\s*/, '');

replaceFile('src/components/finance/payments/TransactionDetailDrawer.jsx', /,\s*Divider\b/, '');
replaceFile('src/components/finance/payments/TransactionDetailDrawer.jsx', /\bDivider\s*,\s*/, '');

replaceFile('src/components/reports/ReportViewer.jsx', /,\s*InputAdornment\b/, '');
replaceFile('src/components/reports/ReportViewer.jsx', /\bInputAdornment\s*,\s*/, '');
replaceFile('src/components/reports/ReportViewer.jsx', /,\s*IconButton\b/, '');
replaceFile('src/components/reports/ReportViewer.jsx', /\bIconButton\s*,\s*/, '');

console.log("Done.");
