import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#0EA5E9" },
    success: { main: "#8AC642" },
    warning: { main: "#FFA500" },
    text: {
      primary: "#0D0F12",
      secondary: "#84919A",
      paper: "#FFFFFF",
      grey: "#475569",
      darkGrey: "#454545",
      light: "#666666",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
      bgLight: "#8AC6421A",
      bgOrange: "#FFEDD575",
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    // custom scale
    fontSizes: {
      xs: "0.75rem", // 12px
      base: "0.875rem", // 14px
      sm: "1rem", // 16px
      xl: "2.25rem", // 36px
    },

    body1: { fontSize: "0.875rem" }, // base — 14px
    body2: { fontSize: "0.75rem" }, // xs   — 12px
    h6: { fontSize: "1rem" }, // sm   — 16px
    h3: { fontSize: "2rem" }, // 32px
    h1: { fontSize: "2.25rem" }, // xl   — 36px
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: '"Poppins", sans-serif',
          // fontSize: "0.875rem",
        },
        input: {
          "&::placeholder": {
            color: "#84919A", // uses your --gray variable value
            opacity: 1,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: "#FFFFFF",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#0EA5E9",
            borderWidth: "1px",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#0EA5E9",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#0EA5E9",
            borderWidth: "2px",
          },
        },
      },
    },
  },
});

export default theme;
