import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { Grid, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { toast } from 'react-toastify';

const ProductsByCategory = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/ProductsAPI/category/${categoryName}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, [categoryName]);

  const handleAddToCart = (product) => {
    toast.success(`Adding ${product.name} to cart`);
  };
const navigate = useNavigate();
  const handleViewProduct = (product) => {
    toast.success(`Viewing ${product.name}`);
    navigate(`/product/${product._id}`);

  };

  return (
    <>
      <Header />
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {categoryName} Products
        </Typography>
        {products.length === 0 && (
          <Typography variant="subtitle1" color="text.secondary">
            No products available in this category.
          </Typography>
        )}
      </Box>

      <Grid container spacing={2} sx={{ p: 2 }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <ProductCard
              product={product}
              handleAddToCart={handleAddToCart}
              handleViewProduct={handleViewProduct}
            />
          </Grid>
        ))}
      </Grid>

      <Footer />
    </>
  );
};

export default ProductsByCategory;
