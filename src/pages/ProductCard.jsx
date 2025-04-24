import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Box,
  Divider,
  Snackbar,
  Alert,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useCart } from './CartContext'; // ✅ Adjust this path based on your setup

const ProductCard = ({ product, handleViewProduct }) => {
  const { addToCart } = useCart();
  const [snackOpen, setSnackOpen] = useState(false);

  if (!product) return null;

  const isOutOfStock = product.inStock === false;

  const handleAdd = async () => {
    try {
      await addToCart(product._id, 1); // Always add 1 quantity from card
      setSnackOpen(true);
    } catch (err) {
      alert("Failed to add to cart.");
    }
  };

  return (
    <>
      <Card sx={{ maxWidth: 345, position: 'relative', display: 'flex', flexDirection: 'column' }}>
        {/* Out of Stock Label */}
        {isOutOfStock && (
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'red',
              color: 'white',
              px: 1.5,
              py: 0.5,
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              zIndex: 1,
            }}
          >
            Out of Stock
          </Box>
        )}

        {/* Product Image */}
        <CardMedia
          component="img"
          alt={product.name}
          height="200"
          image={product.imageUrl || 'https://via.placeholder.com/150'}
        />

        {/* Product Info */}
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {product.name}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography
              variant="body2"
              sx={{ textDecoration: 'line-through', color: 'gray', mr: 1 }}
            >
              ₹{product.basicPrice}
            </Typography>
            <Typography variant="h6" color="primary">
              ₹{product.sellingPrice}
            </Typography>
          </Box>
        </CardContent>

        {/* Actions */}
        <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
          <Button
            size="small"
            color="primary"
            startIcon={<VisibilityIcon />}
            onClick={() => handleViewProduct(product)}
            sx={{ flex: 1 }}
          >
            View
          </Button>

          <Divider orientation="vertical" flexItem />

          <Button
            size="small"
            color="primary"
            startIcon={<ShoppingCartIcon />}
            onClick={handleAdd}
            disabled={isOutOfStock}
            sx={{ flex: 1 }}
          >
            {isOutOfStock ? 'Unavailable' : 'Add'}
          </Button>
        </CardActions>
      </Card>

      {/* Success Snackbar */}
      <Snackbar open={snackOpen} autoHideDuration={3000} onClose={() => setSnackOpen(false)}>
        <Alert onClose={() => setSnackOpen(false)} severity="success" sx={{ width: '100%' }}>
          Product added to cart!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductCard;
