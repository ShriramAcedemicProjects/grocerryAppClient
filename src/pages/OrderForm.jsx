// OrderForm.jsx
import React, { useState } from "react";
import axios from "axios";

const OrderForm = ({ products }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const handleItemChange = (productId, quantity) => {
    const updatedItems = selectedItems.map((item) =>
      item.product === productId ? { ...item, quantity } : item
    );
    if (!updatedItems.some((item) => item.product === productId)) {
      updatedItems.push({ product: productId, quantity });
    }
    setSelectedItems(updatedItems);

    // Calculate total amount
    const total = updatedItems.reduce((sum, item) => {
      const product = products.find((prod) => prod._id === item.product);
      return sum + product.price * item.quantity;
    }, 0);
    setTotalAmount(total);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "/api/orders/create",
        {
          items: selectedItems,
          totalAmount,
          shippingAddress,
          paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      alert("Order placed successfully!");
    } catch (error) {
      console.error(error);
      alert("Error placing order.");
    }
  };

  return (
    <div>
      <h2>Create Order</h2>
      <form onSubmit={handleSubmit}>
        <h3>Select Items</h3>
        {products.map((product) => (
          <div key={product._id}>
            <h4>{product.name}</h4>
            <input
              type="number"
              min="1"
              onChange={(e) =>
                handleItemChange(product._id, parseInt(e.target.value))
              }
            />
          </div>
        ))}
        <h3>Shipping Address</h3>
        <input
          type="text"
          placeholder="Street"
          value={shippingAddress.street}
          onChange={(e) =>
            setShippingAddress({ ...shippingAddress, street: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="City"
          value={shippingAddress.city}
          onChange={(e) =>
            setShippingAddress({ ...shippingAddress, city: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="State"
          value={shippingAddress.state}
          onChange={(e) =>
            setShippingAddress({ ...shippingAddress, state: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Pincode"
          value={shippingAddress.pincode}
          onChange={(e) =>
            setShippingAddress({ ...shippingAddress, pincode: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Phone"
          value={shippingAddress.phone}
          onChange={(e) =>
            setShippingAddress({ ...shippingAddress, phone: e.target.value })
          }
        />
        <h3>Payment Method</h3>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="COD">Cash on Delivery</option>
          {/* Add other payment methods as needed */}
        </select>
        <button type="submit">Place Order</button>
      </form>
      <h3>Total: {totalAmount}</h3>
    </div>
  );
};

export default OrderForm;
