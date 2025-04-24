// src/theme.js
import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: {
              main: "#4caf50",
            },
            background: {
              default: "#f5f5f5",
              paper: "#ffffff",
            },
          }
        : {
            primary: {
              main: "#81c784",
            },
            background: {
              default: "#121212",
              paper: "#1d1d1d",
            },
          }),
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
    },
  });
