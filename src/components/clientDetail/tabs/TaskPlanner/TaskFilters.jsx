import React from "react";
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Divider,
} from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { DAYS, TASK_TYPES } from "./taskPlannerData";

const groupLabelSx = {
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.6px",
  textTransform: "uppercase",
  color: "text.secondary",
  mb: 1,
};

const controlLabelSx = {
  m: 0,
  "& .MuiFormControlLabel-label": { fontSize: "12px", color: "text.darkGrey" },
};

export default function TaskFilters({
  dayFilter,
  onDayFilterChange,
  typeFilters,
  onTypeFilterToggle,
}) {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        borderRadius: "16px",
        border: "1px solid #F1F5F9",
        p: 2.5,
        mb: 2.5,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
        <FilterAltOutlinedIcon sx={{ fontSize: 16, color: "#0EA5E9" }} />
        <Typography fontSize="14px" fontWeight={700} color="text.primary">
          Filters
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "#F1F5F9", mb: 2 }} />

      <Typography sx={groupLabelSx}>Days of the week</Typography>
      <RadioGroup
        value={dayFilter}
        onChange={(e) => onDayFilterChange(e.target.value)}
        sx={{ mb: 2.5 }}
      >
        {["All", ...DAYS].map((day) => (
          <FormControlLabel
            key={day}
            value={day}
            sx={{
              ...controlLabelSx,
              ...(dayFilter === day && {
                "& .MuiFormControlLabel-label": {
                  fontSize: "12px",
                  color: "#0EA5E9",
                  fontWeight: 600,
                },
              }),
            }}
            control={
              <Radio
                size="small"
                sx={{ py: 0.4, color: "#CBD5E1", "&.Mui-checked": { color: "#0EA5E9" } }}
              />
            }
            label={day}
          />
        ))}
      </RadioGroup>

      <Divider sx={{ borderColor: "#F1F5F9", mb: 2 }} />

      <Typography sx={groupLabelSx}>Task type</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxHeight: 200,
          overflowY: "auto",
        }}
      >
        {TASK_TYPES.map((type) => (
          <FormControlLabel
            key={type}
            sx={controlLabelSx}
            control={
              <Checkbox
                size="small"
                checked={typeFilters.includes(type)}
                onChange={() => onTypeFilterToggle(type)}
                sx={{ py: 0.4, color: "#CBD5E1", "&.Mui-checked": { color: "#0EA5E9" } }}
              />
            }
            label={type}
          />
        ))}
      </Box>
    </Box>
  );
}
