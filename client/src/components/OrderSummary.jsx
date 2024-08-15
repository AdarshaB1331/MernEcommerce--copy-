import React from "react";
import { useSelector } from "react-redux";

const OrderSummary = () => {
  const cartItems = useSelector((store) => store.cart);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div style={{ width: "380PX" }} className="col-md-5 col-lg-4 order-md-last">
      {" "}
      <h3>Order Summary</h3>
      {cartItems &&
        cartItems.map((item) => (
          <h5 key={item.id}>
            {item.quantity} {item.title} ------ $
            {(item.quantity * item.price).toFixed(2)}
          </h5>
        ))}
      <h3 style={{ marginTop: "50px" }}>Total: ${totalPrice.toFixed(2)}</h3>
    </div>
  );
};

export default OrderSummary;
