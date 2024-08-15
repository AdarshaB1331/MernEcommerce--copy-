import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { cartActions } from "../store/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";

const ShippingAddress = ({ email }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const onCheckOut = async () => {
    const token = sessionStorage.getItem("User");
    if (!firstName || !lastName || !address || !city) {
      toast.error("None of the fields can be empty");
      return;
    }
    if (!token) {
      toast.error("Please log in ");
      return;
    }

    try {
      const res = await fetch("https://mernecommercebackend-lpgw.onrender.com/api/users/checkout", {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          address,
          city,
          cartItemss: cartItems,

          totalPrice,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setDisableButton(true);
        dispatch(cartActions.clearCart());
        toast.success("Your order was succesfully placed");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else if (!token) {
        setDisableButton(false);
        toast.error("Unauthorized. Please log in.");
        setDisableButton(false);
        // Redirect to login or handle unauthorized error
      } else {
        setDisableButton(false);
        toast.error("Failed to create blog");
        setDisableButton(false);
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("Failed to create blog");
    }
  };
  const onButton = () => {
    setDisableButton(true);
    onCheckOut();
  };
  return (
    <div className="shipping-address">
      <h3>Shipping Address</h3>
      <div className="shipping-address-wrapper">
        <input
          style={{ maxWidth: "500px", marginBottom: "20px" }}
          className="form-control"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          placeholder="First name"
        />
        <input
          style={{ maxWidth: "500px", marginBottom: "20px" }}
          className="form-control"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          placeholder="Last name"
        />
        <input
          style={{ maxWidth: "500px", marginBottom: "20px" }}
          className="form-control"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          placeholder="Address"
        />
        <input
          style={{ maxWidth: "500px", marginBottom: "20px" }}
          className="form-control"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          type="text"
          placeholder="City"
        />
        <button
          disabled={disableButton}
          type="button"
          onClick={onButton}
          style={{ maxWidth: "500px" }}
          className="w-100 btn btn-primary btn-lg"
        >
          Checkout
        </button>
      </div>

      <ToastContainer style={{ marginRight: "500px" }} />
    </div>
  );
};

export default ShippingAddress;
