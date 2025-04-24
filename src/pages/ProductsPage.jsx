import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  CardActions,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext"; // ✅ Importing the Cart Context

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart(); // ✅ Using the Cart Context

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/ProductsAPI/all");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch products.");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product._id, 1); // ✅ Backend cart addition
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error("Something went wrong while adding to cart.");
    }
  };

  const handleViewProduct = (product) => {
    navigate(`/product/${product._id}`);
  };

  if (loading) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", marginTop: 4 }}>
        Loading products...
      </Typography>
    );
  }

  return (
    <>
      <Header />
      <Box sx={{ p: 3 }}>
        <ToastContainer position="top-right" autoClose={3000} />
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          Explore Our Products
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {products.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  maxWidth: 345,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: 3,
                  boxShadow: 4,
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  alt={product.name}
                  height="200"
                  image={product.imageUrl || "https://via.placeholder.com/150"}
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {product.name}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        textDecoration: "line-through",
                        color: "gray",
                        marginRight: 1,
                      }}
                    >
                      ₹{product.basicPrice}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ₹{product.sellingPrice}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions
                  sx={{ justifyContent: "space-between", px: 2, pb: 2 }}
                >
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={() => handleViewProduct(product)}
                  >
                    View
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default ProductsPage;
