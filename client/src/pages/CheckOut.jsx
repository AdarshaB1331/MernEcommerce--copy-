import React from "react";
import UserInfo from "../components/UserInfo";
import OrderSummary from "../components/OrderSummary";

const CheckOut = () => {
  return (
    <div className="container checkout-container">
      <div className="row g-5">
        <UserInfo />
        <OrderSummary />
      </div>
    </div>
  );
};

export default CheckOut;
