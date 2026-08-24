import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import TaskFilters from "./TaskFilters";
import TasksHistory from "./TasksHistory";
import AddTaskModal from "./AddTaskModal";
import {
  DAYS,
  TIME_GROUPS,
  buildInitialTasks,
  INITIAL_HISTORY,
} from "./taskPlannerData";

function TaskCard({ task, onRemove }) {
  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: "#fff",
        border: "1px solid #F1F5F9",
        borderRadius: "12px",
        p: 2,
        pr: 5,
      }}
    >
      <IconButton
        size="small"
        onClick={onRemove}
        aria-label={`Remove ${task.title}`}
        sx={{ position: "absolute", top: 8, right: 8, color: "#94A3B8" }}
      >
        <CloseIcon sx={{ fontSize: 15 }} />
      </IconButton>

      <Typography fontSize="13px" fontWeight={700} color="text.primary">
        {task.title}
      </Typography>
      <Typography fontSize="11.5px" color="text.light" sx={{ mt: 0.4, lineHeight: 1.5 }}>
        {task.description}
      </Typography>
      <Box
        sx={{
          display: "inline-block",
          mt: 1.2,
          bgcolor: "#F1F5F9",
          color: "text.grey",
          fontSize: "10px",
          fontWeight: 600,
          borderRadius: "6px",
          px: 1,
          py: 0.4,
        }}
      >
        {task.type}
      </Box>
    </Box>
  );
}

function DaySection({ day, tasks, onRemoveTask }) {
  return (
    <Box sx={{ mb: 4 }}>
      {/* Day header bar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "#E8EBFA",
          borderRadius: "10px",
          px: 2,
          py: 1.2,
          mb: 2,
        }}
      >
        <Typography fontSize="14px" fontWeight={700} color="#2E3A87">
          {day}
        </Typography>
        <Box
          sx={{
            bgcolor: "#D5DAF5",
            color: "#4A55A8",
            fontSize: "10px",
            fontWeight: 700,
            borderRadius: "8px",
            px: 1,
            py: 0.3,
          }}
        >
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </Box>
      </Box>

      {TIME_GROUPS.map((group) => {
        const groupTasks = tasks.filter((t) => t.time === group);
        if (groupTasks.length === 0) return null;

        return (
          <Box key={group} sx={{ mb: 2.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, mb: 1.2 }}>
              <AccessTimeOutlinedIcon sx={{ fontSize: 13, color: "#8AC642" }} />
              <Typography
                fontSize="11px"
                fontWeight={700}
                sx={{ color: "#8AC642", textTransform: "uppercase", letterSpacing: "0.5px" }}
              >
                {group}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {groupTasks.map((task) => (
                <TaskCard key={task.id} task={task} onRemove={() => onRemoveTask(task.id)} />
              ))}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default function TaskPlannerTab({ client }) {
  const firstName = (client.name || "").split(" ")[0];

  const [tasks, setTasks] = useState(() => buildInitialTasks(firstName));
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [search, setSearch] = useState("");
  const [dayFilter, setDayFilter] = useState("All");
  const [typeFilters, setTypeFilters] = useState([]);
  const [addOpen, setAddOpen] = useState(false);

  const logHistory = (action, task) =>
    setHistory((prev) => {
      const [first, ...rest] = prev;
      if (first && first.date === "Today") {
        return [{ ...first, entries: [{ action, task }, ...first.entries] }, ...rest];
      }
      return [{ date: "Today", entries: [{ action, task }] }, ...prev];
    });

  const handleAddTask = (draft) => {
    const id = `t${Date.now()}`;
    setTasks((prev) => [...prev, { id, ...draft }]);
    logHistory("Created", draft.title);
  };

  const handleRemoveTask = (id) => {
    const removed = tasks.find((t) => t.id === id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (removed) logHistory("Deleted", removed.title);
  };

  const toggleTypeFilter = (type) =>
    setTypeFilters((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );

  const visibleTasks = useMemo(() => {
    const query = search.trim().toLowerCase();
    return tasks.filter((task) => {
      if (dayFilter !== "All" && task.day !== dayFilter) return false;
      if (typeFilters.length > 0 && !typeFilters.includes(task.type)) return false;
      if (
        query &&
        !task.title.toLowerCase().includes(query) &&
        !task.description.toLowerCase().includes(query)
      ) {
        return false;
      }
      return true;
    });
  }, [tasks, search, dayFilter, typeFilters]);

  const daysWithTasks = DAYS.map((day) => ({
    day,
    tasks: visibleTasks.filter((t) => t.day === day),
  })).filter((d) => d.tasks.length > 0);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} color="text.primary">
          Task Planner
        </Typography>
        <Typography fontSize="14px" color="text.secondary" sx={{ mt: 0.3 }}>
          Manage information and care delivery for {client.name}.
        </Typography>
      </Box>

      {/* Search + Add */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search task..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 18, color: "#94A3B8" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              bgcolor: "#fff",
              borderRadius: "9999px",
              fontSize: "13px",
              "& fieldset": { borderColor: "#E2E8F0" },
              "&:hover fieldset": { borderColor: "#CBD5E1" },
              "&.Mui-focused fieldset": { borderColor: "#0EA5E9" },
            },
          }}
        />
        <Button
          variant="contained"
          onClick={() => setAddOpen(true)}
          sx={{
            flexShrink: 0,
            bgcolor: "#0EA5E9",
            color: "#fff",
            fontWeight: 700,
            fontSize: "13px",
            textTransform: "none",
            borderRadius: "10px",
            px: 3,
            py: 1,
            boxShadow: "none",
            "&:hover": { bgcolor: "#0C92CE" },
          }}
        >
          + Add task
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Days + tasks */}
        <Grid size={{ xs: 12, md: 8 }}>
          {daysWithTasks.length > 0 ? (
            daysWithTasks.map(({ day, tasks: dayTasks }) => (
              <DaySection
                key={day}
                day={day}
                tasks={dayTasks}
                onRemoveTask={handleRemoveTask}
              />
            ))
          ) : (
            <Box sx={{ py: 6, textAlign: "center" }}>
              <Typography fontSize="13px" color="text.secondary">
                No tasks match the current search and filters.
              </Typography>
            </Box>
          )}
        </Grid>

        {/* Filters + history */}
        <Grid size={{ xs: 12, md: 4 }}>
          <TaskFilters
            dayFilter={dayFilter}
            onDayFilterChange={setDayFilter}
            typeFilters={typeFilters}
            onTypeFilterToggle={toggleTypeFilter}
          />
          <TasksHistory history={history} />
        </Grid>
      </Grid>

      <AddTaskModal open={addOpen} onClose={() => setAddOpen(false)} onAdd={handleAddTask} />
    </Box>
  );
}
