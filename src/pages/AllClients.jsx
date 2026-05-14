import React from "react";
import { Box } from "@mui/material";
import AllClientsTable from "../components/allClients/AllClientsTable";

export default function AllClients() {
  return (
    <Box sx={{ py: 3 }}>
      <AllClientsTable />
    </Box>
  );
}
