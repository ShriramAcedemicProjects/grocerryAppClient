import React, { useEffect, useState } from 'react';
import {
  Box, Grid, Typography, Button, Rating, Divider, TextField, Snackbar, Alert
} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [snackOpen, setSnackOpen] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/ProductsAPI/${productId}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      await addToCart(productId, quantity);
      setSnackOpen(true);
    } catch (error) {
      alert("Failed to add product to cart.");
    }
  };

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <>
      <Header />

      <Box sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={5} >
            <img src={product.imageUrl} alt={product.name} width="100%"  />
          </Grid>

          <Grid item xs={12} md={7}>
            <Typography variant="h4" gutterBottom>{product.name}</Typography>
            <Rating value={4} readOnly />
            <Typography variant="body2" color="text.secondary" mt={1}>
              Category: {product.category}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" color="text.secondary">
              MRP: <s>₹{product.basicPrice}</s>
            </Typography>
            <Typography variant="h4" color="primary" gutterBottom>
              ₹{product.sellingPrice}
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={2}>
              Inclusive of all taxes
            </Typography>

            {product.inStock ? (
              <Typography color="green">In Stock</Typography>
            ) : (
              <Typography color="red">Currently we are running out of stock.</Typography>
            )}

            <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
              <TextField
                label="Qty"
                type="number"
                size="small"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                sx={{ width: 100, mr: 2 }}
                inputProps={{ min: 1 }}
                disabled={!product.inStock}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ mr: 2 }}
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                Add to Cart
              </Button>
              
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6 }}>
          <Typography variant="h6">Product Description</Typography>
          <Typography variant="body1" color="text.secondary">
            {product.description || "No description available."}
          </Typography>
        </Box>
      </Box>

      <Footer />

      <Snackbar open={snackOpen} autoHideDuration={3000} onClose={() => setSnackOpen(false)}>
        <Alert onClose={() => setSnackOpen(false)} severity="success" sx={{ width: '100%' }}>
          Product added to cart!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductDetail;
