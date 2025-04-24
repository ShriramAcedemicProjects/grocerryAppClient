import React, { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
// import jwtDecode from "jwt-decode"; // Import jwt-decode

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve the stored user token (JWT) from localStorage
    const storedToken = localStorage.getItem("userToken");

    if (storedToken) {
      try {
        // Decode the JWT to get the user data (payload)
        const decodedToken = jwtDecode(storedToken);

        // Ensure the decoded token has the required user fields
        if (decodedToken.firstName && decodedToken.lastName && decodedToken.email && decodedToken.phone) {
          setUser(decodedToken);
        } else {
          console.error("Decoded token is missing required fields.");
        }
      } catch (error) {
        console.error("Error decoding JWT from localStorage", error);
      }
    }
  }, []);

  // Display a message if the user is not logged in
  if (!user) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        Please log in to view your profile.
      </Typography>
    );
  }

  // Render the user profile details
  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 500 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          My Profile
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>First Name:</strong> {user.firstName}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          <strong>Last Name:</strong> {user.lastName}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          <strong>Email:</strong> {user.email}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          <strong>Phone Number:</strong> {user.phone}
        </Typography>
        <Typography variant="body2" sx={{ mt: 3, color: "gray" }}>
          (This information is fetched from your login session)
        </Typography>
      </Paper>
    </Box>
  );
};

export default Profile;
