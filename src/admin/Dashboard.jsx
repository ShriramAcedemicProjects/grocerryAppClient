import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import AdminLayout from "./AdminLayout";

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AdminLayout>
    <Box
      sx={{
        padding: isMobile ? 2 : 3,
        marginTop: isMobile ? 1 : 2,
        width: "100%",
      }}
    >
      <Typography
        variant={isMobile ? "h5" : "h4"}
        gutterBottom
        sx={{ fontWeight: 600 }}
      >
        Welcome to the Admin Panel
      </Typography>
      <Typography variant="body1">
        Here you can manage your products, categories, and orders.
      </Typography>
    </Box>
    </AdminLayout>
  );
};

export default Dashboard;
