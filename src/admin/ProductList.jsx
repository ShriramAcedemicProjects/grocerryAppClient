import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Switch,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import AdminLayout from "./AdminLayout";
import { Link , useLocation} from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  // Use useCallback to memoize the fetchProducts function
  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/ProductsAPI/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  }, [token]);
  

  // Fetch products on component mount
  const location = useLocation();
  useEffect(() => {
    fetchProducts();
  }, [location]);

  // Handle deleting a product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/ProductsAPI/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts(); // Refresh the product list after deletion
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // Handle toggling the stock status of a product
  const handleToggleStock = async (id, currentStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/ProductsAPI/update/${id}`,
        { inStock: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchProducts(); // Refresh the product list after status change
    } catch (err) {
      console.error("Error updating stock status:", err);
    }
  };

  return (
    <AdminLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Product List
        </Typography>

        {/* Add Product Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            component={Link}
            to="/add-product"
          >
            Add New Product
          </Button>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{ width: 50, height: 50, objectFit: "cover" }}
                  />
                </TableCell>
                <TableCell>
                  {product.name}
                  {!product.inStock && (
                    <Typography variant="caption" color="error" display="block">
                      (Currently we are running out of stock)
                    </Typography>
                  )}
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>₹{product.sellingPrice}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Switch
                    checked={product.inStock}
                    onChange={() => handleToggleStock(product._id, product.inStock)}
                    color="success"
                  />
                </TableCell>
                <TableCell>
                  {/* Edit Product Button */}
                  <Tooltip title="Edit Product">
                    <IconButton
                      color="primary"
                      component={Link}
                      to={`/edit-product/${product._id}`}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>

                  {/* Delete Product Button */}
                  <Tooltip title="Delete">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(product._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </AdminLayout>
  );
};

export default ProductList;
