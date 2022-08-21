import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "../../components/header/Header";
import { Box } from "@mui/system";
import { styled } from "@mui/material";
import StudentTable from "./StudentTable";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function ViewStudent() {
  
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <StudentTable />
      </Box>
    </Box>
  );
}
