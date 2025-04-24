import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Button, CircularProgress, Card, CardContent, Divider } from "@mui/material";

const BillingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, address, totalAmount, paymentMethod } = location.state || {};
  const [user, setUser] = useState(null);
  const userToken = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/UserAPI/profile", {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setUser(res.data.user);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUser();
  }, []);

  const handleConfirmOrder = async () => {
    try {
      const orderPayload = {
        items: cartItems.map(item => ({
          productId: item.product._id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          image: item.product.image,
        })),
        totalAmount,
        shippingAddress: address,
        paymentMethod,
      };

      const res = await axios.post("http://localhost:5000/OrderAPI/add-order", orderPayload, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      if (res.data.success) {
        alert("Order confirmed!");
        navigate("/my-orders");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to confirm order.");
    }
  };

  if (!user) return <CircularProgress />;

  return (
    <Box p={3}>
      <Typography variant="h5">Billing Summary</Typography>
      <Divider sx={{ my: 2 }} />

      <Typography><strong>Name:</strong> {user.firstName} {user.lastName}</Typography>
      <Typography><strong>Phone:</strong> {user.phone}</Typography>
      {/* Render individual address fields */}
      <Typography><strong>Address:</strong> {address.street}, {address.city}, {address.state}, {address.pincode}</Typography>
      <Typography><strong>Phone:</strong> {address.phone}</Typography>
      <Typography><strong>Payment Method:</strong> {paymentMethod}</Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6">Items:</Typography>
      {cartItems.map(item => (
        <Card key={item.product._id} sx={{ my: 1 }}>
          <CardContent>
            <Typography>{item.product.name}</Typography>
            <Typography>Qty: {item.quantity} | ₹{item.product.price}</Typography>
          </CardContent>
        </Card>
      ))}

      <Typography variant="h6" mt={2}>Total: ₹{totalAmount}</Typography>

      <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={handleConfirmOrder}>
        Confirm Order
      </Button>
    </Box>
  );
};

export default BillingPage;
