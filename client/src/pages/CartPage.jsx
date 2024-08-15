import React from "react";
import CartProduct from "../components/CartProduct";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartPage = () => {
  // Accessing cart items from Redux store
  const cartItems = useSelector((store) => store.cart);

  // Calculate total price

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "40px" }}>Cart Items</h1>

      {/* Rendering cart items conditionally */}
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => <CartProduct key={index} item={item} />)
      ) : (
        <h1 style={{ textAlign: "center", marginTop: "100px" }}>
          Cart Is Empty....
        </h1>
      )}
      {cartItems.length > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "100px",
          }}
        >
          <Link
            to="/checkout"
            style={{
              maxWidth: "490px",
              fontSize: "19px",
              padding: "19px",
              fontWeight: "bold",
              marginLeft: "450px",
              marginTop: "100px",
            }}
            type="button"
            className="btn btn-dark"
          >
            Go to Checkout
          </Link>
          <h3 style={{ marginLeft: "160px", marginTop: "100px" }}>
            Total : ${totalPrice.toFixed(2)}
          </h3>
        </div>
      )}
    </div>
  );
};

export default CartPage;
