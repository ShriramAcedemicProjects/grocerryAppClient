import React, { useState } from 'react';
import { useCart } from './CartContext';
import { Button, Input, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';

const AddToCart = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    const productId = product._id;
    const items = [{ product: productId, quantity }];
    
    try {
      const response = await axios.post(
        'http://localhost:5000/cart/add',
        { items },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );

      if (response.status === 200) {
        addToCart(items);
        alert('Product added to cart');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to add product to cart. Please login.');
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min={1}
        />
        <Button onClick={handleAddToCart}>Add to Cart</Button>
      </CardContent>
    </Card>
  );
};

export default AddToCart;
