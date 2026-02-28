import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeItem } from "../CartSlice";
import { useNavigate } from "react-router-dom";

function CartItem() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate total amount
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.cost.substring(1));
      return total + price * item.quantity;
    }, 0);
  };

  // Increment quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrement quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Remove item
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Continue shopping
  const handleContinueShopping = () => {
    navigate("/products");
  };

  // Checkout alert
  const handleCheckout = () => {
    alert("Checkout functionality coming soon!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => {
            const price = parseFloat(item.cost.substring(1));
            const subtotal = (price * item.quantity).toFixed(2);

            return (
              <div
                key={item.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid gray",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  padding: "10px",
                }}
              >
                <img src={item.image} alt={item.name} width={100} />
                <div style={{ marginLeft: "10px", flex: 1 }}>
                  <h4>{item.name}</h4>
                  <p>Unit Price: {item.cost}</p>
                  <p>Subtotal: ${subtotal}</p>
                  <div>
                    <button onClick={() => handleDecrement(item)}>-</button>
                    <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                    <button onClick={() => handleIncrement(item)}>+</button>
                  </div>
                  <button
                    onClick={() => handleRemove(item)}
                    style={{ marginTop: "5px", backgroundColor: "red", color: "white" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}

          <h3>Total: ${calculateTotalAmount().toFixed(2)}</h3>
          <button onClick={handleContinueShopping} style={{ marginRight: "10px" }}>
            Continue Shopping
          </button>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
  );
}

export default CartItem;
