import React, { useState } from "react";
import { Box, Typography, TextField, Button, Avatar, Paper } from "@mui/material";

const INITIAL_NOTES = [
  {
    id: 1,
    name: "Sarah Thompson",
    role: "CARE RECORD",
    time: "2 hours ago",
    content:
      "Margaret had a good morning. Ate all her breakfast and was encouraged to drink plenty of fluids. Mobility was stable.",
    avatarColor: "#B8A99A",
  },
  {
    id: 2,
    name: "James Wilson",
    role: "ADMIN",
    time: "5 hours ago",
    content:
      "Confirmed GP appointment for next Tuesday at 10:30am. Taxi service notified.",
    avatarColor: "#6B8E4E",
  },
];

// Mock signed-in user for new notes (no auth/backend in this app)
const CURRENT_USER = { name: "Alex Marshall", avatarColor: "#0EA5E9" };

const initialsOf = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const NoteItem = ({ note }) => (
  <Box sx={{ display: "flex", gap: 1.75, mb: 3 }}>
    {/* Initials are generated locally so staff names aren't sent to a third-party avatar service */}
    <Avatar
      sx={{
        width: 32,
        height: 32,
        flexShrink: 0,
        fontSize: "12px",
        fontWeight: 700,
        bgcolor: note.avatarColor,
        color: "#fff",
      }}
    >
      {initialsOf(note.name)}
    </Avatar>
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          mb: 0.75,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography fontWeight={700} fontSize="13px" color="text.primary">
            {note.name}
          </Typography>
          <Typography fontSize="14px" color="text.light" lineHeight={1}>
            •
          </Typography>
          <Typography
            fontWeight={700}
            fontSize="9px"
            color="#0EA5E9"
            sx={{ textTransform: "uppercase", letterSpacing: 0.3 }}
          >
            {note.role}
          </Typography>
        </Box>
        <Typography fontSize="10px" color="#94A3B8" sx={{ flexShrink: 0 }}>
          {note.time}
        </Typography>
      </Box>
      <Paper
        elevation={0}
        sx={{ px: 1.75, py: 1.25, borderRadius: "8px", bgcolor: "#fff" }}
      >
        <Typography
          fontSize="12px"
          color="text.primary"
          lineHeight={1.6}
          sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
        >
          {note.content}
        </Typography>
      </Paper>
    </Box>
  </Box>
);

export default function NotesRecordsTab({ client }) {
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [draft, setDraft] = useState("");

  const postNote = () => {
    const content = draft.trim();
    if (!content) return;
    setNotes((prev) => [
      {
        id: Date.now(),
        name: CURRENT_USER.name,
        role: "OFFICE NOTE",
        time: "Just now",
        content,
        avatarColor: CURRENT_USER.avatarColor,
      },
      ...prev,
    ]);
    setDraft("");
  };

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
          p: 1.5,
          borderRadius: "12px",
          bgcolor: "#F8FAFC",
          border: "1px solid #EEF2F6",
          mb: 4,
        }}
      >
        <TextField
          fullWidth
          multiline
          minRows={3}
          placeholder="Add a new daily record or office note..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            // Ctrl/Cmd + Enter posts without leaving the keyboard
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) postNote();
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              bgcolor: "#fff",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E2E8F0" },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#CBD5E1",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#0EA5E9",
                borderWidth: "1px",
              },
            },
            "& textarea": {
              fontSize: "13px",
              "&::placeholder": { color: "#94A3B8", opacity: 1 },
            },
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1.5 }}>
          <Button
            variant="contained"
            onClick={postNote}
            disabled={!draft.trim()}
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
              "&.Mui-disabled": { bgcolor: "#BAE6FD", color: "#fff" },
            }}
          >
            POST NOTE
          </Button>
        </Box>
      </Paper>

      <Box>
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </Box>
    </Box>
  );
}
