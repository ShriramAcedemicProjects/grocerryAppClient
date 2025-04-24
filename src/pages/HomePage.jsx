// src/pages/Home.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
// import Navbar from '../components/Navbar';
import SliderComponent from './SliderComponent';
import About from './About';
import Header from './Header';
import Footer from './Footer';
import CategoryGrid from './CategoryGrid';
// import Navbar from '../components/Navbar'
const Home = () => {
  return (
    <>
    <Header />
    <Box>
      {/* <Navbar /> */}
      <SliderComponent />
      
      <Box
  sx={{
    p: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // this centers horizontally
    textAlign: "center",  // optional: centers text inside Typography
  }}
>
  <Typography variant="h4" mb={2}>
    Browse Categories
  </Typography>
  <CategoryGrid />
</Box>
<About />
    </Box>
    <Footer />
    </>
  );
};

export default Home;
