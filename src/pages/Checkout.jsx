import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:5000/CartAPI/show", {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setCartItems(res.data.cart.items || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const calculateTotal = () => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    );
    return total.toFixed(2);
  };

  const handlePlaceOrder = async () => {
    const { street, city, state, pincode, phone } = address;

    if (!street || !city || !state || !pincode || !phone) {
      return alert("Please fill in all the fields in the delivery address.");
    }

    if (cartItems.length === 0) {
      return alert("Your cart is empty.");
    }

    setPlacingOrder(true);

    const orderPayload = {
      items: cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      totalAmount: parseFloat(calculateTotal()), // Ensuring it's a number, not string
      shippingAddress: {
        street,
        city,
        state,
        pincode,
        phone,
      },
      paymentMethod,
    };

    try {
      const res = await axios.post("http://localhost:5000/OrderAPI/create", orderPayload, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      if (res.status === 201 || res.status === 200) {
        alert("Order placed successfully!");

        // Optionally clear cart here by calling the backend if needed

        navigate("/my-orders");
      }
    } catch (error) {
      console.error("Order failed:", error?.response?.data || error.message);
      alert("Failed to place order. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return <CircularProgress sx={{ mt: 4 }} />;
  }

  return (
    <>
      <Header />
      <Box p={3}>
        <Typography variant="h5" fontWeight={600} mb={2}>
          Checkout
        </Typography>

        {cartItems.map((item) => (
          <Card key={item.product._id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="subtitle1">{item.product.name}</Typography>
              <Typography variant="body2">
                ₹{item.product.price} x {item.quantity}
              </Typography>
            </CardContent>
          </Card>
        ))}

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Delivery Address
        </Typography>
        {["street", "city", "state", "pincode", "phone"].map((field) => (
          <TextField
            key={field}
            fullWidth
            variant="outlined"
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            value={address[field]}
            onChange={(e) => setAddress({ ...address, [field]: e.target.value })}
            sx={{ mb: 2 }}
          />
        ))}

        <Typography variant="h6" gutterBottom>
          Payment Method
        </Typography>
        <RadioGroup
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          sx={{ mb: 3 }}
        >
          <FormControlLabel value="COD" control={<Radio />} label="Cash on Delivery" />
          {/* You can add more payment methods later */}
        </RadioGroup>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Total: ₹{calculateTotal()}</Typography>
        </Box>

        <Button
          variant="contained"
          fullWidth
          disabled={placingOrder}
          onClick={handlePlaceOrder}
        >
          {placingOrder ? "Placing Order..." : "Place Order"}
        </Button>
      </Box>
      <Footer />
    </>
  );
};

export default Checkout;
