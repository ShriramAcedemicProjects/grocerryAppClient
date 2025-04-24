import React from "react";
import { Box, Typography, Container, Grid, Link as MuiLink } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#f1f8e9", py: 4, mt: 5 }}>
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ color: "#2e7d32" }}>
              GreenGrocer
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Freshness delivered to your doorstep with quality and care.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ color: "#2e7d32" }}>
              Quick Links
            </Typography>
            <MuiLink href="/products" color="inherit" underline="hover" sx={linkStyle}>
              Products
            </MuiLink>
            <br />
            <MuiLink href="/about" color="inherit" underline="hover" sx={linkStyle}>
              About Us
            </MuiLink>
            <br />
            <MuiLink href="/login" color="inherit" underline="hover" sx={linkStyle}>
              Login
            </MuiLink>
          </Grid>
        </Grid>

        <Box mt={4}>
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} GreenGrocer. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

const linkStyle = {
  color: "#4caf50",
  fontWeight: 500,
  fontSize: "0.95rem",
};

export default Footer;

