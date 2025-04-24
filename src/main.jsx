import React from "react";
import ReactDOM from "react-dom/client"; // Updated import
import App from "./App"; // Import your App component
import { CartProvider } from "./pages/CartContext"; // Import CartProvider

// Create a root element for React 18
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <CartProvider> {/* Wrap your app with CartProvider */}
    <App />
  </CartProvider>
);
