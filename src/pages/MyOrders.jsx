// MyOrders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Divider,
} from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/OrderAPI/my-orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      setOrders(data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      alert("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Header />
      <Box p={3}>
        <Typography variant="h5" fontWeight={600} mb={3}>
          My Orders
        </Typography>

        {orders.length === 0 ? (
          <Typography>No orders found.</Typography>
        ) : (
          <Grid container spacing={2}>
            {orders.map((order) => (
              <Grid item xs={12} key={order._id}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Order ID: {order._id}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Status: {order.orderStatus}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Total: ₹{order.totalAmount}
                    </Typography>

                    <Divider sx={{ my: 1 }} />

                    {order.shippingAddress && (
  <>
    <Typography variant="body2">
      Shipping Address:{" "}
      {Object.entries(order.shippingAddress)
        .filter(([key]) => key !== "phone")
        .map(([_, value]) => value)
        .join(", ")}
    </Typography>
    <Typography variant="body2">
      Phone: {order.shippingAddress.phone}
    </Typography>
  </>
)}

                    <Divider sx={{ my: 1 }} />

                    <Typography variant="body2" fontWeight="bold">
                      Items:
                    </Typography>
                    {order.items.map((item, index) => (
                      <Typography key={index} variant="body2">
                        • {item.product.name} (Qty: {item.quantity})
                      </Typography>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      <Footer />
    </>
  );
};

export default MyOrders;
