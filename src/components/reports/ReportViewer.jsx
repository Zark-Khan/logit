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
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%" }}>
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
              flex: 1,
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
              flex: 1,
              bgcolor: "#fff",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": { borderRadius: "8px" },
            }}
          />
        </Box>
      );
    }
    // dateRangeAnd — shows AND between two date inputs (Checklist History by Date)
    if (filter.type === "dateRangeAnd") {
      return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%" }}>
          <TextField
            size="small"
            placeholder="04/13/2021"
            InputProps={{
              endAdornment: (
                <CalendarTodayIcon sx={{ fontSize: 16, color: "text.primary" }} />
              ),
            }}
            sx={{
              flex: 1,
              bgcolor: "#fff",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": { borderRadius: "8px" },
            }}
          />
          <Typography fontSize="12px" fontWeight={700} color="text.primary">
            AND
          </Typography>
          <TextField
            size="small"
            placeholder="04/14/2026"
            InputProps={{
              endAdornment: (
                <CalendarTodayIcon sx={{ fontSize: 16, color: "text.primary" }} />
              ),
            }}
            sx={{
              flex: 1,
              bgcolor: "#fff",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": { borderRadius: "8px" },
            }}
          />
        </Box>
      );
    }
    // dateRangeLabeled — shows UNTIL as a small stacked label between inputs (Respite)
    if (filter.type === "dateRangeLabeled") {
      return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TextField
            size="small"
            placeholder="04/10/2026"
            InputProps={{
              endAdornment: (
                <CalendarTodayIcon sx={{ fontSize: 16, color: "text.primary" }} />
              ),
            }}
            sx={{
              flex: 1,
              bgcolor: "#fff",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": { borderRadius: "8px" },
            }}
          />
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
            <Typography fontSize="9px" fontWeight={700} color="text.primary" sx={{ lineHeight: 1 }}>UNTIL</Typography>
            <Typography fontSize="16px" color="#EF4444" sx={{ lineHeight: 1 }}>•</Typography>
          </Box>
          <TextField
            size="small"
            placeholder="04/10/2026"
            InputProps={{
              endAdornment: (
                <CalendarTodayIcon sx={{ fontSize: 16, color: "text.primary" }} />
              ),
            }}
            sx={{
              flex: 1,
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
            width: "100%",
            bgcolor: "#fff",
            borderRadius: "8px",
            "& .MuiOutlinedInput-root": { borderRadius: "8px" },
          }}
        />
      );
    }

    // Dropdown type (GROUP BY) — plain input, no chip, no "+"
    if (filter.type === "dropdown") {
      return (
        <TextField
          size="small"
          value={filter.placeholder}
          InputProps={{ readOnly: true }}
          sx={{
            width: "100%",
            bgcolor: "#fff",
            borderRadius: "8px",
            "& .MuiOutlinedInput-root": { borderRadius: "8px" },
            "& input": { fontSize: "13px" },
          }}
        />
      );
    }

    // Select type — chip inside input + "+" as endAdornment
    if (filter.type === "select") {
      return (
        <TextField
          size="small"
          InputProps={{
            endAdornment: (
              <AddIcon
                sx={{
                  fontSize: 18,
                  color: "#0EA5E9",
                  cursor: "pointer",
                  "&:hover": { color: "#0284C7" },
                }}
              />
            ),
            startAdornment: filter.placeholder.includes("All") ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "#F1F5F9",
                  px: 1,
                  py: 0.25,
                  borderRadius: "4px",
                  mr: 0.5,
                  gap: 0.5,
                  whiteSpace: "nowrap",
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
          placeholder={
            filter.placeholder.includes("All") ? "" : filter.placeholder
          }
          sx={{
            width: "100%",
            bgcolor: "#fff",
            borderRadius: "8px",
            "& .MuiOutlinedInput-root": { borderRadius: "8px" },
            "& input": { fontSize: "13px" },
          }}
        />
      );
    }

    // Multiselect type (SHOW COLUMNS) — placeholder input + "+" as endAdornment
    return (
      <TextField
        size="small"
        placeholder={filter.placeholder}
        InputProps={{
          endAdornment: (
            <AddIcon
              sx={{
                fontSize: 18,
                color: "#0EA5E9",
                cursor: "pointer",
                "&:hover": { color: "#0284C7" },
              }}
            />
          ),
        }}
        sx={{
          width: "100%",
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
          onClick={() => navigate(config.categoryBackPath || `/reports/${categoryId}`)}
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
          {config.category && (
            <>
              <Box
                sx={{
                  bgcolor: "#fff",
                  px: 1,
                  py: 0.25,
                  borderRadius: "4px",
                }}
              >
                <Typography fontSize="10px" fontWeight={700} color="#528910" letterSpacing="0.05em">
                  {config.category}
                </Typography>
              </Box>
              <Typography sx={{ color: "#475569" }}>•</Typography>
            </>
          )}
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
        {config.filtersInline ? (
          /* All filters in a single row (Client Schedule, Unassigned Appts) */
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              alignItems: "flex-end",
            }}
          >
            {config.filters.map((filter) => (
              <Box
                key={filter.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  flex: (filter.type === "dateRangeLabeled" || filter.type === "dateRangeAnd") ? 2 : 1,
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
        ) : (
          /* Split layout: top filters + SHOW COLUMNS below divider (Client Roster) */
          <>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 3,
                mb: 0,
              }}
            >
              {config.filters
                .filter((f) => f.type !== "multiselect")
                .map((filter) => (
                  <Box
                    key={filter.id}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
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

            {config.filters.some((f) => f.type === "multiselect") && (
              <Box
                sx={{
                  borderTop: "1.5px solid #8AC64280",
                  mt: 3,
                  pt: 3,
                }}
              >
                {config.filters
                  .filter((f) => f.type === "multiselect")
                  .map((filter) => (
                    <Box
                      key={filter.id}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
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
            )}
          </>
        )}

        {/* Run Report + Actions/Export bar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
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
                }}
              >
                {Object.values(row).map((cellVal, j) => {
                  // Determine styling based on content
                  let color = "#475569";
                  let fontWeight = 400;
                  let isLink = false;

                  // Red for cancelled/unassigned/carer required
                  if (
                    cellVal === "Unassigned" ||
                    cellVal === "Carer required" ||
                    (typeof cellVal === "string" &&
                      cellVal.includes("**CANCELLED**"))
                  ) {
                    color = "#EF4444";
                  }
                  // Blue links for client names, actionable items, and document files
                  if (
                    typeof cellVal === "string" &&
                    (cellVal === "View Recommendations" ||
                      cellVal === "Edit entry" ||
                      config.columns[j] === "CLIENT" ||
                      config.columns[j] === "CLIENTS INVOLVED" ||
                      config.columns[j] === "DOCUMENT")
                  ) {
                    color = "#0EA5E9";
                    isLink = true;
                    fontWeight = 700;
                  }
                  // Green for carer names (non-error carer values)
                  if (
                    (config.columns[j] === "CARER(S)" ||
                      config.columns[j] === "CARER") &&
                    cellVal !== "Carer required" &&
                    cellVal !== "Unassigned" &&
                    cellVal
                  ) {
                    color = "#65A30D";
                  }

                  // Special rendering for cells containing **CANCELLED**
                  if (
                    typeof cellVal === "string" &&
                    cellVal.includes("**CANCELLED**")
                  ) {
                    const parts = cellVal.split("**CANCELLED**");
                    return (
                      <TableCell key={j} sx={{ px: 3, py: 2 }}>
                        <Typography
                          fontSize="13px"
                          color="#475569"
                          component="span"
                        >
                          {parts[0]}
                        </Typography>
                        <Typography
                          fontSize="13px"
                          color="#EF4444"
                          fontWeight={700}
                          component="span"
                        >
                          {"  **CANCELLED**"}
                        </Typography>
                      </TableCell>
                    );
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
                        {cellVal}
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
