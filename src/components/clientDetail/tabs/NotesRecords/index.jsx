import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Paper,
} from "@mui/material";

const NOTES = [
  {
    name: "Sarah Thompson",
    role: "CARE RECORD",
    time: "2 hours ago",
    content:
      "Margaret had a good morning. Ate all her breakfast and was encouraged to drink plenty of fluids. Mobility was stable.",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Thompson&background=random",
  },
  {
    name: "James Wilson",
    role: "ADMIN",
    time: "5 hours ago",
    content:
      "Confirmed GP appointment for next Tuesday at 10:30am. Taxi service notified.",
    avatar: "https://ui-avatars.com/api/?name=James+Wilson&background=random",
  },
];

const NoteItem = ({ note }) => (
  <Box sx={{ mb: 4 }}>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 1.5,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Avatar
          src={note.avatar}
          sx={{
            width: 40,
            height: 40,
            borderRadius: "24px",
            bgcolor: "text.light",
          }}
        />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography fontWeight={700} fontSize="14px" color="text.primary">
            {note.name}
          </Typography>
          <Typography fontSize="16px" color="text.light">
            •
          </Typography>
          <Typography
            fontWeight={700}
            fontSize="10px"
            color="#0EA5E9"
            sx={{ textTransform: "uppercase" }}
          >
            {note.role}
          </Typography>
        </Box>
      </Box>
      <Typography fontSize="10px" color="#94A3B8" fontWeight={400}>
        {note.time}
      </Typography>
    </Box>
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: "16px",
        border: "1px solid #E2E8F0",
        bgcolor: "#fff",
      }}
    >
      <Typography
        fontSize="12px"
        color="text.primary"
        fontWeight={400}
        lineHeight={1.6}
      >
        {note.content}
      </Typography>
    </Paper>
  </Box>
);

export default function NotesRecordsTab({ client }) {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography fontWeight={700} fontSize="20px" color="text.primary">
          Notes & Records
        </Typography>
        <Typography fontSize="14px" color="text.light" sx={{ mt: 0.5 }}>
          Manage information and care delivery for{" "}
          {client?.name || "Margaret Hall"}.
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: "24px",
          bgcolor: "#fff",
          mb: 6,
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.04)",
        }}
      >
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="Add a new daily record or office note..."
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "16px",
              bgcolor: "#F8FAFC",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E2E8F0",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E2E8F0",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#0EA5E9",
              },
            },
            "& textarea": {
              fontSize: "14px",
              fontWeight: 400,
              "&::placeholder": {
                color: "#94A3B8",
                opacity: 1,
              },
            },
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#0EA5E9",
              color: "#fff",
              fontWeight: 700,
              fontSize: "10px",
              textTransform: "none",
              borderRadius: "8px",
              px: 1.8,
              py: 0.6,
              boxShadow: "none",
              "&:hover": { bgcolor: "#0284C7", boxShadow: "none" },
            }}
          >
            POST NOTE
          </Button>
        </Box>
      </Paper>

      <Box>
        {NOTES.map((note, index) => (
          <NoteItem key={index} note={note} />
        ))}
      </Box>
    </Box>
  );
}
