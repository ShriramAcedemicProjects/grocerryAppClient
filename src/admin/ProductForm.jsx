// src/components/ProductForm.jsx

import React from "react";
import { TextField, Button } from "@mui/material";

const ProductForm = ({ productData, handleChange, handleSubmit, buttonText }) => {
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Name"
        name="name"
        value={productData.name}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Category"
        name="category"
        value={productData.category}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Basic Price"
        name="basicPrice"
        type="number"
        value={productData.basicPrice}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Selling Price"
        name="sellingPrice"
        type="number"
        value={productData.sellingPrice}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Price"
        name="price"
        type="number"
        value={productData.price}
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
        label="Discount (%)"
        name="discount"
        type="number"
        value={productData.discount}
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
      />
      <TextField
        fullWidth
        label="Image URL"
        name="imageUrl"
        value={productData.imageUrl}
        onChange={handleChange}
        margin="normal"
      />

      <Button
        variant="contained"
        color="primary"
        type="submit"
        sx={{ mt: 2 }}
      >
        {buttonText}
      </Button>
    </form>
  );
};

export default ProductForm;
