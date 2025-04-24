// AdminOrders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
  Select,
  MenuItem,
} from "@mui/material";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const adminToken = localStorage.getItem("userToken");

  const fetchAllOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/OrderAPI/all-orders", {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      setOrders(res.data.orders);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handlePrint = async (orderId) => {
    try {
      const res = await axios.get(`http://localhost:5000/OrderAPI/print-bill/${orderId}`, {
        responseType: "blob",
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    } catch (error) {
      console.error("Error printing bill:", error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/OrderAPI/update-status/${orderId.trim()}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${adminToken}` },
          "Content-Type": "application/json",
        }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box p={3}>
      <Typography variant="h5" mb={3}>
        All Orders
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Print</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order._id}</TableCell>
              <TableCell>
                {order.userId?.firstName} {order.userId?.lastName}
              </TableCell>
              <TableCell>₹{order.totalAmount}</TableCell>
              <TableCell>
                <Select
                  value={order.orderStatus}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  size="small"
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Shipped">Shipped</MenuItem>
                  <MenuItem value="Out for Delivery">Out for Delivery</MenuItem>
                  <MenuItem value="Delivered">Delivered</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
                <Button variant="outlined" onClick={() => handlePrint(order._id)}>
                  Print Bill
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default AdminOrders;
