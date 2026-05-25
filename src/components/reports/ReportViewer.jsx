import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import TableViewIcon from "@mui/icons-material/TableView";

import { REPORT_CONFIGS } from "./reportConfigs";

export default function ReportViewer() {
  const navigate = useNavigate();
  const { categoryId, reportId } = useParams();
  const config = REPORT_CONFIGS[reportId] || REPORT_CONFIGS.client_roster;

  const [isLoading, setIsLoading] = useState(false);

  const handleRunReport = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 400);
  };

  const renderFilterInput = (filter) => {
    if (filter.type === "dateRange") {
      return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TextField
            size="small"
            placeholder="04/09/2026"
            InputProps={{
              endAdornment: (
                <CalendarTodayIcon
                  sx={{ fontSize: 16, color: "text.primary" }}
                />
              ),
            }}
            sx={{
              width: 140,
              bgcolor: "#fff",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": { borderRadius: "8px" },
            }}
          />
          <Typography fontSize="12px" fontWeight={700} color="text.primary">
            TO
          </Typography>
          <TextField
            size="small"
            placeholder="04/09/2026"
            InputProps={{
              endAdornment: (
                <CalendarTodayIcon
                  sx={{ fontSize: 16, color: "text.primary" }}
                />
              ),
            }}
            sx={{
              width: 140,
              bgcolor: "#fff",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": { borderRadius: "8px" },
            }}
          />
        </Box>
      );
    }
    if (filter.type === "date") {
      return (
        <TextField
          size="small"
          placeholder={filter.placeholder || "04/10/2026"}
          InputProps={{
            endAdornment: (
              <CalendarTodayIcon sx={{ fontSize: 16, color: "text.primary" }} />
            ),
          }}
          sx={{
            width: 180,
            bgcolor: "#fff",
            borderRadius: "8px",
            "& .MuiOutlinedInput-root": { borderRadius: "8px" },
          }}
        />
      );
    }

    // Default select/multiselect look
    return (
      <TextField
        size="small"
        placeholder={filter.placeholder}
        InputProps={{
          endAdornment:
            filter.type === "select" ? (
              <AddIcon sx={{ fontSize: 16, color: "#0EA5E9" }} />
            ) : (
              <AddIcon sx={{ fontSize: 16, color: "#0EA5E9" }} />
            ),
          startAdornment:
            filter.type === "select" && filter.placeholder.includes("All") ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "#F1F5F9",
                  px: 1,
                  py: 0.25,
                  borderRadius: "4px",
                  mr: 1,
                  gap: 0.5,
                }}
              >
                <Typography fontSize="12px" color="text.primary">
                  {filter.placeholder}
                </Typography>
                <CloseIcon
                  sx={{ fontSize: 12, color: "text.light", cursor: "pointer" }}
                />
              </Box>
            ) : null,
        }}
        sx={{
          minWidth: 200,
          flex: filter.type === "multiselect" ? 1 : "none",
          bgcolor: "#fff",
          borderRadius: "8px",
          "& .MuiOutlinedInput-root": { borderRadius: "8px" },
          "& input": { fontSize: "13px" },
        }}
      />
    );
  };

  return (
    <Box>
      {/* Top Navigation Row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box
          onClick={() => navigate(`/reports/${categoryId}`)}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            color: "text.primary",
            "&:hover": { color: "#8AC642" },
            transition: "color 0.2s",
          }}
        >
          <KeyboardBackspaceIcon sx={{ fontSize: 18 }} />
          <Typography fontSize="14px" fontWeight={700}>
            {config.categoryOptionsText}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1, color: "text.light" }}>
          <IconButton size="small" sx={{ color: "inherit" }}>
            <PrintOutlinedIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <IconButton size="small" sx={{ color: "inherit" }}>
            <ShareOutlinedIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <IconButton size="small" sx={{ color: "inherit" }}>
            <MailOutlineOutlinedIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      </Box>

      {/* Hero Banner */}
      <Box
        sx={{
          bgcolor: "#8AC64233",
          border: "1px solid #8AC642",
          borderRadius: "16px",
          p: 4,
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Box
            sx={{ width: 12, height: 4, bgcolor: "#fff", borderRadius: "2px" }}
          />
          <Typography
            fontSize="10px"
            fontWeight={700}
            color="text.primary"
            letterSpacing="0.05em"
          >
            SYSTEM GENERATED
          </Typography>
        </Box>
        <Typography
          fontSize="32px"
          fontWeight={700}
          color="text.primary"
          mb={1}
        >
          {config.title}
        </Typography>
        <Typography
          fontSize="15px"
          color="#475569"
          fontWeight={400}
          sx={{ maxWidth: 600 }}
        >
          {config.description}
        </Typography>
      </Box>

      {/* Filters Section */}
      <Box
        sx={{
          bgcolor: "#8AC64233",
          border: "1px solid #8AC642",
          borderRadius: "16px",
          p: 3,
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            mb: 4,
            pb: 4,
            borderBottom: "1.5px solid #8AC64280",
          }}
        >
          {config.filters.map((filter) => (
            <Box
              key={filter.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                flex: filter.type === "multiselect" ? 1 : "none",
              }}
            >
              <Typography
                fontSize="10px"
                fontWeight={700}
                color="text.primary"
                sx={{ textTransform: "uppercase" }}
              >
                {filter.label.replace("*", "")}{" "}
                <span style={{ color: "#EF4444" }}>
                  {filter.label.includes("*") ? "*" : ""}
                </span>
              </Typography>
              {renderFilterInput(filter)}
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            onClick={handleRunReport}
            startIcon={<TrendingUpIcon />}
            sx={{
              bgcolor: "#65A30D",
              color: "#fff",
              borderRadius: "12px",
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontWeight: 700,
              fontSize: "14px",
              boxShadow: "none",
              "&:hover": { bgcolor: "#4D7C0F", boxShadow: "none" },
            }}
          >
            Run Report
          </Button>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              bgcolor: "#fff",
              px: 3,
              py: 1.5,
              borderRadius: "12px",
            }}
          >
            {/* Actions */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography fontSize="11px" fontWeight={700} color="text.primary">
                ACTIONS:
              </Typography>
              <Box sx={{ display: "flex", gap: 2, color: "#0EA5E9" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    cursor: "pointer",
                  }}
                >
                  <MailOutlineOutlinedIcon sx={{ fontSize: 16 }} />
                  <Typography fontSize="12px" fontWeight={700}>
                    Email
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    cursor: "pointer",
                  }}
                >
                  <PrintOutlinedIcon sx={{ fontSize: 16 }} />
                  <Typography fontSize="12px" fontWeight={700}>
                    Print
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    cursor: "pointer",
                  }}
                >
                  <SaveOutlinedIcon sx={{ fontSize: 16 }} />
                  <Typography fontSize="12px" fontWeight={700}>
                    Save
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    cursor: "pointer",
                    color: "text.light",
                  }}
                >
                  <SettingsOutlinedIcon sx={{ fontSize: 16 }} />
                  <Typography fontSize="12px" fontWeight={700}>
                    Settings
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ width: "1px", height: "24px", bgcolor: "#E2E8F0" }} />

            {/* Export */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography fontSize="11px" fontWeight={700} color="text.primary">
                EXPORT:
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    cursor: "pointer",
                    color: "#EF4444",
                  }}
                >
                  <PictureAsPdfIcon sx={{ fontSize: 16 }} />
                  <Typography fontSize="12px" fontWeight={700}>
                    PDF
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    cursor: "pointer",
                    color: "#10B981",
                  }}
                >
                  <TableViewIcon sx={{ fontSize: 16 }} />
                  <Typography fontSize="12px" fontWeight={700}>
                    CSV
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    cursor: "pointer",
                    color: "#3B82F6",
                  }}
                >
                  <InsertDriveFileIcon sx={{ fontSize: 16 }} />
                  <Typography fontSize="12px" fontWeight={700}>
                    Word
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Table Section */}
      <TableContainer
        component={Box}
        sx={{
          border: "1px solid #8AC642",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          {/* Table Header */}
          <TableHead
            sx={{
              bgcolor: "#fff",
              "& th": { borderBottom: "1px solid #E2E8F0" },
            }}
          >
            <TableRow>
              {config.columns.map((col, i) => (
                <TableCell key={i} sx={{ px: 3, py: 2 }}>
                  <Typography
                    fontSize="11px"
                    fontWeight={700}
                    color="text.primary"
                    sx={{ textTransform: "uppercase" }}
                  >
                    {col}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody
            sx={{
              bgcolor: isLoading ? "#F8FAFC" : "#8AC64233",
              opacity: isLoading ? 0.5 : 1,
              transition: "opacity 0.2s",
            }}
          >
            {config.data.map((row, i) => (
              <TableRow
                key={i}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "& td": { borderBottom: "1px solid rgba(138, 198, 66, 0.2)" },
                  "&:hover": { bgcolor: "rgba(138, 198, 66, 0.4)" },
                }}
              >
                {Object.values(row).map((cellVal, j) => {
                  // Determine styling based on content
                  let color = "#475569";
                  let fontWeight = 400;
                  let isLink = false;

                  if (
                    cellVal === "Unassigned" ||
                    cellVal === "Carer required" ||
                    (typeof cellVal === "string" &&
                      cellVal.includes("**CANCELLED**"))
                  ) {
                    color = "#EF4444";
                  }
                  if (
                    typeof cellVal === "string" &&
                    (cellVal === "View Recommendations" ||
                      cellVal === "Edit entry" ||
                      config.columns[j] === "CLIENT" ||
                      config.columns[j] === "CLIENTS INVOLVED")
                  ) {
                    color = "#0EA5E9";
                    isLink = true;
                    fontWeight = 700;
                  }

                  return (
                    <TableCell key={j} sx={{ px: 3, py: 2 }}>
                      <Typography
                        fontSize="13px"
                        color={color}
                        fontWeight={fontWeight}
                        sx={{
                          cursor: isLink ? "pointer" : "default",
                          "&:hover": isLink
                            ? { textDecoration: "underline" }
                            : {},
                        }}
                      >
                        {typeof cellVal === "string"
                          ? cellVal.replace("**CANCELLED**", "CANCELLED")
                          : cellVal}
                      </Typography>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
