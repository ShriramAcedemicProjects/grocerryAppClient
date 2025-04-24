import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Box, Toolbar } from "@mui/material";

const AdminLayout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <Header onToggleDrawer={handleDrawerToggle} />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Sidebar open={drawerOpen} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar /> {/* to offset AppBar */}
          {children}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default AdminLayout;
