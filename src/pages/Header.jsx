import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  Avatar
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleCart = () => {
    navigate("/cart");
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#ffffff", boxShadow: 3 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo */}
        <Box
          display="flex"
          alignItems="center"
          component={Link}
          to="/"
          sx={{ textDecoration: "none" }}
        >
          <ShoppingCartIcon sx={{ color: "#4caf50", fontSize: 32 }} />
          <Typography variant="h6" sx={{ ml: 1, color: "#4caf50", fontWeight: "bold" }}>
            GreenGrocer
          </Typography>
        </Box>

        {/* Right side menu including nav links and user options */}
        <Box display="flex" alignItems="center" gap={2}>
          <Button component={Link} to="/products" sx={navButtonStyle}>
            Products
          </Button>
          <Button component={Link} to="/about" sx={navButtonStyle}>
            About
          </Button>

          {!user ? (
            <Button component={Link} to="/login" sx={navButtonStyle}>
              Login
            </Button>
          ) : (
            <>
              <Button
                onClick={handleProfileClick}
                sx={{
                  ...navButtonStyle,
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 12px",
                }}
                startIcon={
                  <Avatar
                    alt={user.name}
                    src={user.profilePicture || ""}
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: "#4caf50",
                      fontSize: "1.2rem",
                    }}
                  />
                }
              >
                <Typography variant="body1" sx={{ color: "#4caf50", fontWeight: 600 }}>
                  {user.name}
                </Typography>
              </Button>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleProfileClose}>
                <MenuItem onClick={handleCart}>My Cart</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const navButtonStyle = {
  color: "#4caf50",
  fontWeight: 600,
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#e8f5e9",
  },
};

export default Header;
