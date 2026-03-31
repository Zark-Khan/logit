import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  InputAdornment,
  TextField,
  IconButton,
  Badge,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import NavLogo from "../../assets/NavLogo.svg";

const NAV_LINKS = [
  { label: "Staff", path: "/staff" },
  { label: "Clients", path: "/clients", disabled: true },
  { label: "Rostering", path: "/rostering", disabled: true },
  { label: "Care Delivery", path: "/care-delivery", disabled: true },
  { label: "Finance", path: "/finance", disabled: true },
  { label: "Reports", path: "/reports", disabled: true },
  { label: "Settings", path: "/settings", disabled: true },
];

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #E9EDF0",
        zIndex: theme.zIndex.drawer + 1,
        px: { xs: 2, sm: 3, md: 10 },
        overflow: "visible", // ← allow children to bleed out
      }}
    >
      <Toolbar
        sx={{
          gap: 3,
          minHeight: "64.8px !important",
          padding: "unset !important",
        }}
      >
        {/* Logo */}
        <Box
          onClick={() => navigate("/dashboard")}
          sx={{ display: "flex", alignItems: "center", flexShrink: 0, cursor: "pointer" }}
        >
          <Box component="img" src={NavLogo} alt="Logit" />
        </Box>

        {/* Nav links */}
        {!isMobile && (
          <Box
            sx={{
              display: "flex",
              gap: 0.5,
              alignItems: "center",
              height: "100%",
            }}
          >
            {NAV_LINKS.map(({ label, path, disabled }) => {
              const isActive = location.pathname.startsWith(path);
              return (
                <Typography
                  key={label}
                  onClick={() => !disabled && navigate(path)}
                  variant="body1"
                  sx={{
                    px: 1.5,
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    cursor: disabled ? "default" : "pointer",
                    fontWeight: 500,
                    color: isActive ? "primary.main" : (disabled ? "text.disabled" : "text.primary"),
                    whiteSpace: "nowrap",
                    position: "relative",
                    "&::after": isActive
                      ? {
                          content: '""',
                          position: "absolute",
                          bottom: -4,
                          left: 0,
                          right: 0,
                          height: 3,
                          borderRadius: "3px 3px 0 0",
                          backgroundColor: "#0EA5E9",
                        }
                      : {},

                    transition: "all 0.18s ease",

                    "&:hover": {
                      color: disabled ? "text.disabled" : "primary.main",
                    },
                  }}
                >
                  {label}
                </Typography>
              );
            })}
          </Box>
        )}

        <Box sx={{ flex: 1 }} />

        {/* Search */}
        <TextField
          size="small"
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" sx={{ color: "primary.main" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            width: 256,
            "& .MuiOutlinedInput-root": {
              height: 35.4,
              borderRadius: 6,
              backgroundColor: "#F8FAFC",
              "& fieldset": { borderColor: "#E2E8F0" },
              "&:hover fieldset": { borderColor: "#E2E8F0" },
              "&.Mui-focused fieldset": {
                borderColor: "#E2E8F0",
                borderWidth: "1px",
              },
            },
          }}
        />

        {/* Bell */}
        <IconButton size="small">
          <Badge
            variant="dot"
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "#FEA500",
                minWidth: 8,
                height: 8,
                top: 4,
                right: 4,
              },
            }}
          >
            <NotificationsNoneOutlinedIcon sx={{ color: "text.secondary" }} />
          </Badge>
        </IconButton>

        {/* User */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
          }}
        >
          <Box
            sx={{ textAlign: "right", display: { xs: "none", sm: "block" } }}
          >
            <Typography
              variant="body1"
              fontWeight={600}
              color="text.primary"
            >
              Alex Marshall
            </Typography>
            <Typography
              variant="body2"
              color="text.light"
            >
              Administrator
            </Typography>
          </Box>
          <Avatar
            sx={{
              width: 34,
              height: 34,
              bgcolor: "#0EA5E9",
              fontSize: "0.8rem",
              fontWeight: 700,
            }}
          >
            AM
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
