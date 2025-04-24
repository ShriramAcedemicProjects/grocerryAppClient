// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import About from './pages/About';
import UserRegistrationForm from './pages/UserRegistrationForm';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AdminLogin from './admin/AdminLogin';
import AddProduct from './admin/AddProduct';
import Dashboard from './admin/Dashboard';
import ProductList from './admin/ProductList';
import EditProduct from './admin/EditProduct';
import 'react-toastify/dist/ReactToastify.css';
import ProductsByCategory from './pages/ProductsByCategory';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import BillingPage from './pages/BillingPage';
import MyOrders from './pages/MyOrders';
import OrderForm from './pages/OrderForm';
import AdminOrders from './admin/AdminOrders';
// import Cart from './pages/Cart';
// import { CartProvider } from './pages/CartContext';

// import ProductCard from './pages/ProductCard';


const App = () => {
  
  return (
    <>
    <Router>
      <Routes>
      <Route path="/Adminlogin" element={<AdminLogin />} />
      <Route path="/Admindashboard" element={<Dashboard />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/Adminproduct-list" element={<ProductList />} />
      <Route path = "/edit-product/:id" element={<EditProduct />} />
      <Route path="/" element={<Home />} />
      <Route path= "/register" element={<UserRegistrationForm />} />
      <Route path  ="/products" element={<ProductsPage />} />
      <Route path ="/about" element ={<About />} />
      <Route path="/login" element ={<Login />} />
      <Route path ="/profile" element ={<Profile />} />
      <Route path ="/category/:categoryName" element = {<ProductsByCategory />} />
      <Route path="/product/:productId" element ={<ProductDetail/>} />
      <Route path = "/cart" element={<Cart />} />
      <Route path = "/buy-now" element={<Checkout />} />
      <Route path="/billing" element={<BillingPage />} />
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/order-form" element={<OrderForm />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
     
      </Routes>
    </Router>
        
      </>
  );
};

export default App;
