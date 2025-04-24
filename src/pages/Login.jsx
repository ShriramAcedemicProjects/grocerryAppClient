import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Link as MuiLink,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/UserAPI/login", formData);
  
      if (res.data.token) {
        localStorage.setItem("userToken", res.data.token);
  
        // ✅ Store the user info (firstName, etc.)
        localStorage.setItem("user", JSON.stringify(res.data.user));
  
        toast.success(`Welcome back, ${res.data.user.name}!`);
        navigate("/");
      } else {
        toast.error("Invalid login credentials.");
      }
    } catch (err) {
      toast.error("Login failed. Please try again.");
      console.error(err);
    }
  };
  

  return (
    <>
    <Header />
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
          User Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            color="primary"
          >
            Login
          </Button>
        </form>

        {/* 👇 Registration Link */}
        <Box textAlign="center" mt={3}>
          <Typography variant="body2">
            New to our shop?{" "}
            <MuiLink
              component="button"
              onClick={() => navigate("/register")}
              sx={{ color: "primary.main", fontWeight: "bold" }}
            >
              Register here
            </MuiLink>
          </Typography>
        </Box>

        <Box textAlign="center" mt={3}>
          <Typography variant="body2">
            Admin Login{" "}
            <MuiLink
              component="button"
              onClick={() => navigate("/Adminlogin")}
              sx={{ color: "primary.main", fontWeight: "bold" }}
            >
              Click Here
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Box>
    <Footer />
    </>
  );
};

export default Login;
