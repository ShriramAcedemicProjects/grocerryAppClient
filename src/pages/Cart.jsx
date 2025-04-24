import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  CircularProgress,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const userToken = localStorage.getItem("userToken");
  const navigate = useNavigate();

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/CartAPI/show", {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setCart(res.data.cart?.items || []);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await axios.put(
        "http://localhost:5000/CartAPI/update",
        { productId, quantity: newQuantity },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/CartAPI/remove/${productId}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      fetchCart();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const calculateTotal = () =>
    cart.reduce((acc, item) => acc + item.quantity * item.product.price, 0).toFixed(2);

  return (
    <>
      <Header />
      <Box p={3}>
        <Typography variant="h5" fontWeight={600} mb={3}>
          My Cart
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : cart.length === 0 ? (
          <Typography align="center" mt={5}>
            Your cart is empty.
          </Typography>
        ) : (
          <>
            {cart.map((item) => (
              <Card key={item.product._id} sx={{ display: "flex", mb: 2, p: 1 }}>
                <CardMedia
                  component="img"
                  image={item.product.imageUrl}
                  alt={item.product.name}
                  sx={{ width: 120, height: 120, objectFit: "contain" }}
                />
                <Box sx={{ display: "flex", flexDirection: "column", flex: 1, ml: 2 }}>
                  <CardContent sx={{ flex: "1 0 auto", p: 0 }}>
                    <Typography variant="h6">{item.product.name}</Typography>
                    <Typography variant="body2" color="text.secondary" mt={1}>
                      ₹{item.product.price.toFixed(2)} x {item.quantity}
                    </Typography>
                    <Box display="flex" alignItems="center" mt={1}>
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleQuantityChange(item.product._id, item.quantity - 1)
                        }
                      >
                        <Remove />
                      </IconButton>
                      <Typography mx={1}>{item.quantity}</Typography>
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleQuantityChange(item.product._id, item.quantity + 1)
                        }
                      >
                        <Add />
                      </IconButton>
                    </Box>
                  </CardContent>
                  <IconButton
                    sx={{ alignSelf: "flex-end", mt: 1 }}
                    onClick={() => handleDelete(item.product._id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </Card>
            ))}

            <Divider sx={{ my: 3 }} />

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">₹{calculateTotal()}</Typography>
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              onClick={() => navigate("/buy-now")}
            >
              Proceed to Buy
            </Button>
          </>
        )}
      </Box>
      <Footer />
    </>
  );
};

export default Cart;
