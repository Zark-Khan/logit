import React from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function TimesheetsPayTab({ staff }) {
  return (
    <Box>
      <Typography
        fontSize="20px"
        fontWeight={700}
        color="text.primary"
        mb={0.4}
      >
        Timesheets & Pay
      </Typography>
      <Typography fontSize="14px" color="text.light" mb={3.5}>
        Detailed information and settings for {staff.name}'s timesheets & pay.
      </Typography>

      {/* Next Expected Pay Card */}
      <Box
        sx={{
          bgcolor: "#fff",
          borderRadius: "16px",
          p: 3,
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            fontSize="10px"
            fontWeight={700}
            color="text.grey"
            textTransform="uppercase"
            mb={0.5}
            letterSpacing="0.06em"
          >
            NEXT EXPECTED PAY
          </Typography>
          <Typography
            fontSize="32px"
            fontWeight={700}
            color="text.primary"
            mb={0.5}
            lineHeight={1.2}
          >
            £2,450.80
          </Typography>
          <Typography
            fontSize="10px"
            fontWeight={700}
            color="#22C55E"
            textTransform="uppercase"
            letterSpacing="0.06em"
          >
            CALCULATED FOR CURRENT CYCLE
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Select
            size="small"
            defaultValue="Monthly"
            IconComponent={KeyboardArrowDownIcon}
            sx={{
              borderRadius: "12px",
              fontSize: "12px",
              fontWeight: 600,
              px: 1,
              color: "text.primary",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #E2E8F0",
              },
              bgcolor: "transparent",
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #E2E8F0",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          >
            <MenuItem
              value="Monthly"
              sx={{ fontSize: "12px", fontWeight: 600 }}
            >
              Monthly
            </MenuItem>
            <MenuItem value="Weekly" sx={{ fontSize: "12px", fontWeight: 600 }}>
              Weekly
            </MenuItem>
          </Select>
          <Button
            variant="contained"
            sx={{
              bgcolor: "primary.main",
              color: "#fff",
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "12px",
              px: 2,
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#0284C7",
                boxShadow: "none",
              },
            }}
          >
            View Payslip
          </Button>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer
        component={Box}
        sx={{
          borderRadius: "16px",
          border: "1px solid #83D8FF",
          bgcolor: "#fff",
          overflow: "hidden",
        }}
      >
        <Table size="medium">
          <TableHead sx={{ bgcolor: "transparent" }}>
            <TableRow>
              <TableCell
                sx={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "text.primary",
                  borderBottom: "1px solid #83D8FF",
                  py: 2,
                }}
              >
                Date
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "text.primary",
                  borderBottom: "1px solid #83D8FF",
                  py: 2,
                }}
              >
                Activity
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "text.primary",
                  borderBottom: "1px solid #83D8FF",
                  py: 2,
                }}
              >
                Hours
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "text.primary",
                  borderBottom: "1px solid #83D8FF",
                  py: 2,
                }}
              >
                Gross
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ bgcolor: "#E0F5FF" }}>
            <TableRow>
              <TableCell
                sx={{
                  fontSize: "14px",
                  color: "text.secondary",
                  borderBottom: "1px solid #83D8FF",
                  py: 2,
                  fontWeight: 400,
                }}
              >
                22 May
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  color: "text.secondary",
                  borderBottom: "1px solid #83D8FF",
                  py: 2,
                  fontWeight: 400,
                }}
              >
                Standard Care (Margaret Hall)
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  color: "text.secondary",
                  borderBottom: "1px solid #83D8FF",
                  py: 2,
                  fontWeight: 400,
                }}
              >
                6h
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  color: "text.secondary",
                  borderBottom: "1px solid #83D8FF",
                  py: 2,
                  fontWeight: 400,
                }}
              >
                £132.00
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                sx={{
                  fontSize: "14px",
                  color: "text.secondary",
                  py: 2,
                  fontWeight: 400,
                }}
              >
                21 May
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  color: "text.secondary",
                  py: 2,
                  fontWeight: 400,
                }}
              >
                Overtime (Weekend)
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  color: "text.secondary",
                  py: 2,
                  fontWeight: 400,
                }}
              >
                4h
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  color: "text.secondary",
                  py: 2,
                  fontWeight: 400,
                }}
              >
                £99.00
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
