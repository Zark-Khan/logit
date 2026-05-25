import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  IconButton,
  Dialog,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function VisitDetailModal({ open, onClose, client }) {
  const [tab, setTab] = useState(0);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "32px",
          p: 0,
          height: "85vh",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* Header - Fixed */}
      <Box sx={{ p: 5, pb: 2 }}>
        {/* Modal Tabs Container */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              p: 0.5,
              bgcolor: "#fff",
              border: "1px solid #E2E8F0",
              borderRadius: "16px",
              gap: 0.5,
            }}
          >
            {[
              "Appointment",
              "Tasks",
              "Requirements",
              "Finance",
              "Notes",
              "Travel",
              "History",
            ].map((label, i) => (
              <Box
                key={label}
                onClick={() => setTab(i)}
                sx={{
                  px: 2.5,
                  py: 1,
                  borderRadius: "12px",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  bgcolor: tab === i ? "primary.main" : "transparent",
                  color: tab === i ? "#fff" : "text.light",
                  position: "relative",
                  "&:hover": { color: tab === i ? "#fff" : "primary.main" },
                }}
              >
                {label}
              </Box>
            ))}
          </Box>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{ color: "text.primary" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            mb: 5,
          }}
        >
          <Typography fontSize="30px" fontWeight={700} color="text.primary">
            Client:{" "}
            <Box component="span" sx={{ color: "primary.main" }}>
              {client.name}
            </Box>
          </Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            <ActionLink
              icon={<CloseIcon sx={{ fontSize: 16 }} />}
              label="Cancel"
              color="#475569"
            />
            <ActionLink
              icon={<DeleteOutlineIcon sx={{ fontSize: 16 }} />}
              label="Delete"
              color="#EF4444"
            />
            <ActionLink
              icon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
              label="View in schedule"
              color="#475569"
            />
          </Box>
        </Box>
      </Box>

      {/* Scrollable Content Area */}
      <Box sx={{ flex: 1, overflowY: "auto", px: 5, py: 2 }}>
        {tab === 0 && (
          <Grid container spacing={8}>
            {/* Left Column */}
            <Grid item xs={12} md={5}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3.5 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  <Typography
                    fontSize="14px"
                    fontWeight={700}
                    color="#475569"
                    sx={{ minWidth: 100 }}
                  >
                    Start time{" "}
                    <Box component="span" sx={{ color: "#EF4444" }}>
                      *
                    </Box>
                  </Typography>
                  <TextField
                    fullWidth
                    value="09:00"
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <AccessTimeIcon
                          sx={{ color: "#94A3B8", fontSize: 20 }}
                        />
                      ),
                    }}
                    sx={{ ...inputSx, maxWidth: 200 }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  <Typography
                    fontSize="14px"
                    fontWeight={700}
                    color="#475569"
                    sx={{ minWidth: 100 }}
                  >
                    End time{" "}
                    <Box component="span" sx={{ color: "#EF4444" }}>
                      *
                    </Box>
                  </Typography>
                  <TextField
                    fullWidth
                    value="10:00"
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <AccessTimeIcon
                          sx={{ color: "#94A3B8", fontSize: 20 }}
                        />
                      ),
                    }}
                    sx={{ ...inputSx, maxWidth: 200 }}
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Typography
                    fontSize="14px"
                    fontWeight={700}
                    color="#475569"
                    sx={{ minWidth: 100 }}
                  >
                    Duration
                  </Typography>
                  <Typography
                    fontSize="14px"
                    fontWeight={700}
                    color="text.primary"
                  >
                    1 hours
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} md={7}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <CarerSection
                  label="Carer 1"
                  value="Sarah Thompson"
                  showRecommend
                />
                <RunSection value="Not in run." />
                <CarerSection
                  label="Carer 2"
                  value="Ruth Omoregie"
                  showRecommend
                />
                <RunSection value="Not in run." />
                <CarerSection
                  label="Shadow"
                  value="Not Required"
                  showRecommend
                />
                <RunSection value="Not in run." />
              </Box>
            </Grid>
          </Grid>
        )}

        {tab === 1 && (
          <Box sx={{ py: 10 }}>
            <Typography fontSize="16px" fontWeight={700} color="text.grey">
              No Tasks created. To create Tasks go to{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                Admin &gt; Tasks
              </Box>
              .
            </Typography>
          </Box>
        )}

        {tab === 2 && (
          <Box sx={{ py: 6, display: "flex", gap: 15 }}>
            <RequirementItem label="Maggy Summers" />
            <RequirementItem label="Naomi Jensen" />
          </Box>
        )}

        {tab === 3 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <FinanceSection carerName="Sarah Thompson" />
            <FinanceSection carerName="Ruth Omoregie" />
          </Box>
        )}

        {tab === 4 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4, py: 2 }}>
            <NoteField
              label="Notes to carer"
              placeholder="Enter notes to carer..."
            />
            <NoteField
              label="Finance notes"
              placeholder="Enter finance notes..."
            />
            <NoteField
              label="Sarah Thompson"
              placeholder="Enter notes for Sarah Thompson..."
            />
            <NoteField
              label="Ruth Omoregie"
              placeholder="Enter notes for Ruth Omoregie..."
            />
          </Box>
        )}

        {tab === 5 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 6, py: 2 }}>
            <TravelSection
              carerName="Sarah Thompson"
              method="public transport"
              clientName={client.name}
            />
            <TravelSection
              carerName="Ruth Omoregie"
              method="public transport"
              clientName={client.name}
            />
          </Box>
        )}

        {tab === 6 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, py: 2 }}>
            <Typography
              fontSize="14px"
              fontWeight={400}
              color="#334155"
              sx={{ lineHeight: 1.6 }}
            >
              <Box
                component="span"
                sx={{ color: "primary.main", fontWeight: 700 }}
              >
                Appointment
              </Box>
              {" created from the schedule for "}
              <Box
                component="span"
                sx={{ color: "primary.main", fontWeight: 700 }}
              >
                {client.name}
              </Box>
              {" attended by "}
              <Box
                component="span"
                sx={{ color: "primary.main", fontWeight: 700 }}
              >
                Sarah Thompson
              </Box>
              {" and "}
              <Box
                component="span"
                sx={{ color: "primary.main", fontWeight: 700 }}
              >
                Ruth Omoregie
              </Box>
              {" on "}
              <Box component="span" sx={{ fontWeight: 700 }}>
                17th Jan 2026 15:19:06
              </Box>
              {" by "}
              <Box component="span" sx={{ fontWeight: 700 }}>
                Saranya Natarjan
              </Box>
            </Typography>

            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}
            >
              <HistoryBullet
                text={
                  <>
                    Carer 1 was set from Required to{" "}
                    <BlueBold>Sarah Thompson</BlueBold>.
                  </>
                }
              />
              <HistoryBullet
                text={
                  <>
                    Carer 2 was set from Required to{" "}
                    <BlueBold>Ruth Omoregie</BlueBold>.
                  </>
                }
              />
              <HistoryBullet
                text={
                  <>
                    Invoice group for <BlueBold>Sarah Thompson</BlueBold> was
                    set to <ItalicGrey>(choose automatically)</ItalicGrey>.
                  </>
                }
              />
              <HistoryBullet
                text={
                  <>
                    Invoice group for <BlueBold>Ruth Omoregie</BlueBold> was set
                    to <ItalicGrey>(choose automatically)</ItalicGrey>.
                  </>
                }
              />
              <HistoryBullet
                text={
                  <>
                    Invoice rate for <BlueBold>Sarah Thompson</BlueBold> was set
                    to <ItalicGrey>(choose automatically)</ItalicGrey>.
                  </>
                }
              />
              <HistoryBullet
                text={
                  <>
                    Invoice rate for <BlueBold>Ruth Omoregie</BlueBold> was set
                    to <ItalicGrey>(choose automatically)</ItalicGrey>.
                  </>
                }
              />
              <HistoryBullet
                text={
                  <>
                    Pay group for <BlueBold>Sarah Thompson</BlueBold> was set to{" "}
                    <ItalicGrey>(choose automatically)</ItalicGrey>.
                  </>
                }
              />
              <HistoryBullet
                text={
                  <>
                    Pay group for <BlueBold>Ruth Omoregie</BlueBold> was set to{" "}
                    <ItalicGrey>(choose automatically)</ItalicGrey>.
                  </>
                }
              />
              <HistoryBullet
                text={
                  <>
                    Pay rate for <BlueBold>Sarah Thompson</BlueBold> was set to{" "}
                    <ItalicGrey>(choose automatically)</ItalicGrey>.
                  </>
                }
              />
              <HistoryBullet
                text={
                  <>
                    Pay rate for <BlueBold>Ruth Omoregie</BlueBold> was set to{" "}
                    <ItalicGrey>(choose automatically)</ItalicGrey>.
                  </>
                }
              />
              <HistoryBullet
                text={
                  <>
                    The start date was set to{" "}
                    <Box component="span" sx={{ fontWeight: 700 }}>
                      19/01/2026
                    </Box>
                    .
                  </>
                }
              />
              <HistoryBullet
                text={
                  <>
                    The start time was set to{" "}
                    <Box component="span" sx={{ fontWeight: 700 }}>
                      17:00
                    </Box>
                    .
                  </>
                }
              />
              <HistoryBullet
                text={
                  <>
                    The end time was set to{" "}
                    <Box component="span" sx={{ fontWeight: 700 }}>
                      19:00
                    </Box>
                    .
                  </>
                }
              />
            </Box>
          </Box>
        )}
      </Box>

      {/* Footer - Fixed */}
      <Box sx={{ p: 5, pt: 2 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            sx={{
              borderRadius: "14px",
              textTransform: "none",
              fontWeight: 700,
              px: 3,
              py: 1.2,
              bgcolor: "#F1F5F9",
              color: "text.primary",
              boxShadow: "none",
            }}
          >
            Save
          </Button>
          <Button
            variant="contained"
            sx={{
              borderRadius: "14px",
              textTransform: "none",
              fontWeight: 700,
              px: 3,
              py: 1.2,
              bgcolor: "primary.main",
              color: "#fff",
              boxShadow: "0 10px 25px rgba(14, 165, 233, 0.3)",
            }}
          >
            Save & update schedule
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

function ActionLink({ icon, label, color }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.8,
        color,
        cursor: "pointer",
      }}
    >
      {icon}
      <Typography fontSize="13px" fontWeight={700}>
        {label}
      </Typography>
    </Box>
  );
}

function CarerSection({ label, value, showRecommend }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "100px 1fr 110px",
        alignItems: "center",
        gap: 1.5,
      }}
    >
      <Typography fontSize="13px" fontWeight={700} color="#475569">
        {label}
      </Typography>
      <Paper
        elevation={0}
        sx={{
          px: 2,
          py: 1.2,
          borderRadius: "10px",
          border: "1px solid #E2E8F0",
          bgcolor: "#F8FAFC",
        }}
      >
        <Typography fontSize="13px" fontWeight={700}>
          {value}
        </Typography>
      </Paper>
      {showRecommend && (
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            fontSize: "11px",
            fontWeight: 700,
            color: "primary.main",
            bgcolor: "#F1F5F9",
            borderRadius: "8px",
            boxShadow: "none",
            px: 1.5,
            py: 0.5,
            "&:hover": { bgcolor: "#E2E8F0", boxShadow: "none" },
          }}
        >
          Recommend
        </Button>
      )}
    </Box>
  );
}

function RunSection({ value }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "100px 1fr",
        alignItems: "center",
        gap: 1.5,
      }}
    >
      <Typography fontSize="13px" fontWeight={700} color="#475569">
        Run
      </Typography>
      <Paper
        elevation={0}
        sx={{
          px: 2,
          py: 1.2,
          borderRadius: "10px",
          border: "1px solid #E2E8F0",
          bgcolor: "#F8FAFC",
        }}
      >
        <Typography fontSize="13px" fontWeight={700} color="text.primary">
          {value}
        </Typography>
      </Paper>
    </Box>
  );
}

function RequirementItem({ label }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      <Box
        sx={{
          width: 20,
          height: 20,
          borderRadius: "4px",
          border: "2px solid #E2E8F0",
          cursor: "pointer",
        }}
      />
      <Typography fontSize="16px" fontWeight={700} color="#334155">
        {label}
      </Typography>
    </Box>
  );
}

function FinanceSection({ carerName }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography fontSize="18px" fontWeight={700} color="text.primary" mb={1}>
        Carer: {carerName}
      </Typography>

      <FinanceField
        label="Invoice group"
        value="Private (Invoice Group)"
        hint="Invoice group chosen automatically"
        required
      />
      <FinanceField
        label="Invoice rate"
        value="Do not invoice"
        hint="Invoice rate chosen automatically, click for more information"
        required
      />
      <FinanceField
        label="Payment group"
        value="Private (Payment Group)"
        hint="Payment group chosen automatically"
        required
      />
      <FinanceField
        label="Pay rate"
        value="Do not pay"
        hint="Pay rate chosen automatically, click for more information"
        required
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "180px 1fr",
          gap: 2,
          alignItems: "center",
          mt: 2,
        }}
      >
        <Typography fontSize="14px" fontWeight={700} color="text.grey">
          Actual times
        </Typography>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Typography fontSize="12px" fontWeight={700} color="#94A3B8">
              Start time
            </Typography>
            <TextField
              size="small"
              placeholder="--:-- --"
              InputProps={{
                endAdornment: (
                  <AccessTimeIcon sx={{ color: "#94A3B8", fontSize: 18 }} />
                ),
              }}
              sx={financeInputSx}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Typography fontSize="12px" fontWeight={700} color="#94A3B8">
              End time
            </Typography>
            <TextField
              size="small"
              placeholder="--:-- --"
              InputProps={{
                endAdornment: (
                  <AccessTimeIcon sx={{ color: "#94A3B8", fontSize: 18 }} />
                ),
              }}
              sx={financeInputSx}
            />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "180px 1fr",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Typography fontSize="14px" fontWeight={700} color="text.grey">
          Reason (start time)
        </Typography>
        <Box sx={{ display: "flex", gap: 4 }}>
          <TextField
            size="small"
            value="--"
            sx={{ ...financeInputSx, width: "100%", maxWidth: 240 }}
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
            <Typography
              fontSize="14px"
              fontWeight={700}
              color="text.grey"
              sx={{ minWidth: 120 }}
            >
              Reason (end time)
            </Typography>
            <TextField
              size="small"
              value="--"
              sx={{ ...financeInputSx, width: "100%", maxWidth: 240 }}
            />
          </Box>
        </Box>
      </Box>

      <FinanceField label="Charge by" value="rostered times" />
      <FinanceField label="Pay by" value="rostered times" />
      <FinanceField
        label="Chargeable mileage"
        value="0.0"
        hint="Use this location to store any mileage to be charged to the client"
      />
    </Box>
  );
}

function FinanceField({ label, value, hint, required }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "180px 1fr",
        gap: 1,
        alignItems: "flex-start",
      }}
    >
      <Typography
        fontSize="14px"
        fontWeight={700}
        color="text.grey"
        sx={{ pt: 1.5 }}
      >
        {label}{" "}
        {required && (
          <Box component="span" sx={{ color: "#EF4444" }}>
            *
          </Box>
        )}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Paper
          elevation={0}
          sx={{
            px: 2.5,
            py: 1.8,
            borderRadius: "12px",
            border: "1px solid #E2E8F0",
            bgcolor: "#F8FAFC",
          }}
        >
          <Typography fontSize="14px" fontWeight={700} color="text.primary">
            {value}
          </Typography>
        </Paper>
        {hint && (
          <Box
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: "4px",
              bgcolor: "#FFFBEB",
              width: "fit-content",
            }}
          >
            <Typography fontSize="11px" fontWeight={700} color="#D97706">
              {hint}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

function NoteField({ label, placeholder }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "180px 1fr",
        gap: 2,
        alignItems: "flex-start",
      }}
    >
      <Typography
        fontSize="14px"
        fontWeight={700}
        color="text.grey"
        sx={{ pt: 2 }}
      >
        {label}
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        placeholder={placeholder}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "16px",
            bgcolor: "#F8FAFC",
            "& fieldset": { borderColor: "#E2E8F0" },
            "&.Mui-focused fieldset": { borderColor: "primary.main" },
          },
          "& .MuiInputBase-input": {
            fontSize: "14px",
            fontWeight: 400,
            color: "text.grey",
          },
        }}
      />
    </Box>
  );
}

function TravelSection({ carerName, method, clientName }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography fontSize="18px" fontWeight={700} color="text.primary">
          Carer: {carerName}
        </Typography>
        <Box sx={{ width: "2px", height: "20px", bgcolor: "#CBD5E1" }} />
        <Typography fontSize="18px" fontWeight={700} color="text.primary">
          Travel method: {method}
        </Typography>
      </Box>

      <Box sx={{ borderBottom: "1px dashed #E2E8F0", mb: 1 }} />

      <Grid container spacing={4}>
        <Grid item xs={6} sx={{ borderRight: "1px dotted #E2E8F0" }}>
          <RouteInfo
            from="Home"
            to={clientName}
            distance="127.4 Miles"
            time="3 Hours 6 Minutes"
          />
        </Grid>
        <Grid item xs={6}>
          <RouteInfo
            from={clientName}
            to="Home"
            distance="127.5 Miles"
            time="3 Hours 2 Minutes"
          />
        </Grid>
      </Grid>
    </Box>
  );
}

function RouteInfo({ from, to, distance, time }) {
  const isClient = (name) => name !== "Home";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      <Typography fontSize="14px" fontWeight={700} color="text.primary">
        {isClient(from) ? (
          <Box component="span" sx={{ color: "primary.main" }}>
            {from}
          </Box>
        ) : (
          from
        )}
        {" To "}
        {isClient(to) ? (
          <Box component="span" sx={{ color: "primary.main" }}>
            {to}
          </Box>
        ) : (
          to
        )}
      </Typography>
      <Box>
        <Typography fontSize="14px" color="#475569">
          Approximate Distance: {distance}
        </Typography>
        <Typography fontSize="14px" color="#475569">
          Approximate Travel Time: {time}
        </Typography>
      </Box>
      <Button
        variant="contained"
        startIcon={
          <LocationOnIcon
            sx={{ fontSize: "12px", width: "12px", height: "12px" }}
          />
        }
        sx={{
          width: "fit-content",
          bgcolor: "primary.main",
          color: "#fff",
          fontSize: "12px",
          fontWeight: 700,
          textTransform: "none",
          borderRadius: "8px",
          px: 2,
          py: 0.8,
          boxShadow: "none",
          "&:hover": { bgcolor: "#0A8DBC", boxShadow: "none" },
        }}
      >
        Get Directions
      </Button>
    </Box>
  );
}

function HistoryBullet({ text }) {
  return (
    <Box sx={{ display: "flex", gap: 1.5, alignItems: "baseline" }}>
      <Box
        sx={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          bgcolor: "#334155",
          mt: 1.2,
        }}
      />
      <Typography fontSize="14px" color="#334155" sx={{ lineHeight: 1.8 }}>
        {text}
      </Typography>
    </Box>
  );
}

function BlueBold({ children }) {
  return (
    <Box component="span" sx={{ color: "primary.main", fontWeight: 700 }}>
      {children}
    </Box>
  );
}

function ItalicGrey({ children }) {
  return (
    <Box component="span" sx={{ color: "text.grey", fontStyle: "italic" }}>
      {children}
    </Box>
  );
}

const financeInputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    bgcolor: "#F8FAFC",
    fontSize: "14px",
    "& fieldset": { borderColor: "#E2E8F0" },
    "& input": { py: 1, fontWeight: 700 },
  },
};

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    bgcolor: "#F8FAFC",
    "& fieldset": { borderColor: "#E2E8F0" },
    "&.Mui-focused fieldset": { borderColor: "primary.main" },
  },
};
