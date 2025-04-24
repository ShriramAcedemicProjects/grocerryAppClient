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
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminLayout from "./AdminLayout";

const categories = [
  "Fruits & Vegetables",
  "Dairy",
  "Beverages",
  "Snacks",
  "Grains",
];

const AddProduct = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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
    const bp = parseFloat(productData.basicPrice);
    const dis = parseFloat(productData.discount) || 0;
    const tx = parseFloat(productData.tax) || 0;
  
    if (!isNaN(bp)) {
      const discountAmount = (bp * dis) / 100;
      const taxAmount = (bp * tx) / 100;
      const finalPrice = bp - discountAmount + taxAmount;
      const formattedPrice = finalPrice.toFixed(2);
  
      if (
        productData.price !== formattedPrice ||
        productData.sellingPrice !== formattedPrice
      ) {
        setProductData((prev) => ({
          ...prev,
          price: formattedPrice,
          sellingPrice: formattedPrice,
        }));
      }
    }
  }, [productData.basicPrice, productData.discount, productData.tax,productData.price,productData.sellingPrice]);
  

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/ProductsAPI/add", productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Product added successfully!");
      setProductData({
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
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product.");
    }
  };

  return (
    <AdminLayout>
      <Box
        sx={{
          maxWidth: 600,
          mx: "auto",
          mt: 5,
          mb: 10, // 👈 adds space to avoid footer overlap
        }}
      >
        {/* Title + Product List Button */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <Typography variant="h4">Add Product</Typography>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/Adminproduct-list")}
          >
            Product List
          </Button>
        </Stack>

        <form onSubmit={handleSubmit}>
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

          {/* Price Preview Display */}
          {productData.basicPrice && productData.sellingPrice && (
            <Paper elevation={3} sx={{ p: 2, mt: 2, textAlign: "center" }}>
              <Typography
                variant="body1"
                sx={{ textDecoration: "line-through", color: "gray" }}
              >
                ₹{parseFloat(productData.basicPrice).toFixed(2)}
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "green", fontWeight: "bold" }}
              >
                ₹{productData.sellingPrice} (Offer Price)
              </Typography>
            </Paper>
          )}

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 3 }}
          >
            Add Product
          </Button>
        </form>
      </Box>
    </AdminLayout>
  );
};

export default AddProduct;
