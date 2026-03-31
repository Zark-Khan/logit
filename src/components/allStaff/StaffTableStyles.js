export const ROW_BORDER = "1px solid #ffffff";
export const HEADER_BORDER = "1px solid #2EBEFF85";
export const TABLE_BG = "#73D3FF38";

export const dropdownSx = {
  fontSize: "12px",
  fontWeight: 600,
  height: 36,
  borderRadius: 3,
  color: "text.grey",
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E2E8F0" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#0EA5E9" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(14,165,233,0.4)",
  },
  "& .MuiSelect-select": { 
    py: 0, 
    pl: 2.83, 
    pr: "44px !important",
  },
  "& .MuiSelect-icon": {
    fontSize: "1.1rem",
    right: "16px",
    color: "text.grey",
  },
};

export const menuItemSx = {
  fontSize: "12px",
  color: "text.grey",
  fontWeight: 600,
};

export const searchFieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 3,
    fontSize: "0.82rem",
    bgcolor: "background.paper",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E2E8F0",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#0EA5E9",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#0EA5E9",
      borderWidth: "1px",
    },
  },
};

export const tableHeaderSx = {
  bgcolor: "background.paper",
  fontSize: "10px",
  fontWeight: 700,
  color: "text.grey",
  textTransform: "uppercase",
  borderBottom: ROW_BORDER,
  whiteSpace: "nowrap",
  py: 1.38,
};
