import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar, { NAVBAR_HEIGHT } from "../components/dashboard/Navbar";

export default function DashboardLayout() {
  return (
    <Box sx={{ backgroundColor: "background.default", px: { xs: 2, sm: 3, md: 10 } }}>
      <Navbar />
      <Box sx={{ pt: `${NAVBAR_HEIGHT}px` }}>
        <Outlet />  {/* each dashboard page renders here */}
      </Box>
    </Box>
  );
}