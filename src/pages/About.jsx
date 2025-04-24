import React from "react";
import { Box, Typography, Container, Grid, Card, CardContent } from "@mui/material";
import { LocalShipping, VerifiedUser, SupportAgent,Inventory2 } from "@mui/icons-material";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
const About = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Hero Section */}
      <Box textAlign="center" mb={5}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          About Our Grocery Store
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Freshness at your doorstep, with quality you can trust.
        </Typography>
      </Box>

      {/* Description Section */}
      <Box mb={6} textAlign={"center"}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1" color="text.secondary">
          We aim to provide high-quality groceries delivered to your home with the click of a button.
          Whether it's farm-fresh vegetables or pantry essentials, we make shopping easy, fast, and reliable.
        </Typography>
      </Box>

      {/* Features Section */}
      <Grid container spacing={4} justifyContent={"center"}>
        <Grid item xs={12} md={4} >
          <Card sx={{ textAlign: "center", py: 4 }}>
            <CardContent >
              <LocalShipping fontSize="large" color="primary" />
              <Typography variant="h6" mt={2}>
                Fast Delivery
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Get your groceries delivered in under 2 hours, wherever you are.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: "center", py: 4 }}>
            <CardContent>
              <VerifiedUser fontSize="large" color="primary" />
              <Typography variant="h6" mt={2}>
                Quality Guaranteed
              </Typography>
              <Typography variant="body2" color="text.secondary">
                We source the best products and ensure quality in every order.
              </Typography>
            </CardContent>
          </Card>
        </Grid>



        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: "center", py: 4 }}>
            <CardContent>
              <SupportAgent fontSize="large" color="primary" />
              <Typography variant="h6" mt={2}>
                24/7 Support
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Our support team is always ready to assist you with any queries.
              </Typography>


            </CardContent>
          </Card>
        </Grid>

        
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: "center", py: 4 }}>
            <CardContent>
              <Inventory2 fontSize="large" color="primary" />
              <Typography variant="h6" mt={2}>
                No Minimum Order
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Buy what you need. Without pressure. No minimum order value.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
