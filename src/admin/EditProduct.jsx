import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from './AdminLayout';

const categories = [
  "Fruits & Vegetables",
  "Dairy",
  "Beverages",
  "Snacks",
  "Bakery",
];

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: "",
    basicPrice: "",
    discount: "",
    tax: "",
    sellingPrice: "",
    stock: "",
    imageUrl: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/ProductsAPI/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProductData(response.data);
      } catch (error) {
        console.error("Failed to load product data:", error);
        alert("Could not load product data.");
      }
    };

    fetchProduct();
  }, [id, token]);

  // Recalculate selling price only when basicPrice, discount, or tax changes
  useEffect(() => {
    const bp = parseFloat(productData.basicPrice) || 0;
    const dis = parseFloat(productData.discount) || 0;
    const tx = parseFloat(productData.tax) || 0;

    if (!isNaN(bp)) {
      const discountAmount = (bp * dis) / 100;
      const taxAmount = (bp * tx) / 100;
      const finalPrice = bp - discountAmount + taxAmount;

      setProductData((prev) => ({
        ...prev,
        price: finalPrice.toFixed(2),
        sellingPrice: finalPrice.toFixed(2),
      }));
    }
  }, [productData.basicPrice, productData.discount, productData.tax]);

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/ProductsAPI/update/${id}`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Product updated successfully!");
      navigate("/product-list", { replace: true });
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Failed to update product.");
      navigate("/Adminproduct-list", { replace: true });
    }
  };

  return (
    <AdminLayout>
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 5, pb: 8 }}>
        <Typography variant="h4" gutterBottom>
          Edit Product
        </Typography>

        <form onSubmit={handleUpdate}>
          <TextField
            fullWidth
            label="Product Name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            margin="normal"
            required
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={productData.category}
              onChange={handleChange}
              label="Category"
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Basic Price"
            name="basicPrice"
            type="number"
            value={productData.basicPrice}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Discount (%)"
            name="discount"
            type="number"
            value={productData.discount}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Tax (%)"
            name="tax"
            type="number"
            value={productData.tax}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Stock"
            name="stock"
            type="number"
            value={productData.stock}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Image URL"
            name="imageUrl"
            value={productData.imageUrl}
            onChange={handleChange}
            margin="normal"
          />

          {productData.basicPrice && productData.sellingPrice && (
            <Paper elevation={3} sx={{ p: 2, mt: 2, textAlign: "center" }}>
              <Typography variant="body1" sx={{ textDecoration: "line-through", color: "gray" }}>
                ₹{parseFloat(productData.basicPrice).toFixed(2)}
              </Typography>
              <Typography variant="h6" sx={{ color: "green", fontWeight: "bold" }}>
                ₹{productData.sellingPrice} (Offer Price)
              </Typography>
            </Paper>
          )}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button variant="outlined" color="secondary" onClick={() => navigate("/product-list", { replace: true })}>
              Back to List
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Update Product
            </Button>
          </Box>
        </form>
      </Box>
    </AdminLayout>
  );
};

export default EditProduct;
