import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';

const categories = [
  { name: 'Fruits & Vegetables', icon: <LocalGroceryStoreIcon fontSize="large" /> },
  { name: 'Dairy', icon: <EmojiFoodBeverageIcon fontSize="large" /> },
  { name: 'Grains', icon: <BakeryDiningIcon fontSize="large" /> },
  { name: 'Beverages', icon: <LocalCafeIcon fontSize="large" /> },
  { name: 'Snacks', icon: <LocalPizzaIcon fontSize="large" /> },
];

const CategoryGrid = () => {
  const navigate = useNavigate();  // Initialize the navigate hook

  const handleCategoryClick = (category) => {
    // Navigate to the ProductsByCategory page with the category name
    navigate(`/category/${category}`);
  };

  return (
    <Grid container spacing={2} sx={{ mt: 2, px: 2 }} justifyContent={"center"}>
      {categories.map((cat) => (
        <Grid item xs={6} sm={4} md={3} lg={2} key={cat.name}>
          <Paper 
            elevation={3} 
            sx={{ textAlign: 'center', p: 2, cursor: 'pointer' }} 
            onClick={() => handleCategoryClick(cat.name)}  // Add onClick handler
          >
            {cat.icon}
            <Typography variant="body1" mt={1}>
              {cat.name}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoryGrid;
