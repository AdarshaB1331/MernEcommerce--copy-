import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const onAddToCart = () => {
    // When adding to cart, pass the quantity as 1
    toast.success("Added to cart");
    dispatch(cartActions.addToCart({ ...item, quantity: 1 }));
    // Show "Add to Cart" message
  };

  const truncateDescription = (description) => {
    const words = description.split(" ");
    if (words.length > 25) {
      return words.slice(0, 25).join(" ") + "...";
    } else {
      return description;
    }
  };

  return (
    <div style={{ height: "100%" }}>
      <div
        className="card"
        style={{
          width: "24rem",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            flex: "1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{
              width: "50%",
              height: "auto",
              maxWidth: "100%",
              maxHeight: "250px",
              alignSelf: "center",
            }}
            src={item.image}
            className="card-img-top"
            alt="..."
          />
        </div>
        <div
          className="card-body"
          style={{ flex: "1", display: "flex", flexDirection: "column" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h5 className="card-title">{item.title}</h5>
          </div>
          <p className="card-text" style={{ flex: "1" }}>
            {truncateDescription(item.description)}
          </p>
          <div>
            <button
              onClick={onAddToCart}
              href="#"
              style={{ fontWeight: "bold" }}
              className="btn btn-dark"
            >
              Add to Cart
            </button>
            <span
              style={{
                fontSize: "25px",
                fontWeight: "bold",
                marginLeft: "140px",
              }}
            >
              ${item.price}
            </span>
          </div>
        </div>
      </div>
      <ToastContainer style={{ marginRight: "400px", marginTop: "60px" }} />
    </div>
  );
};

export default ProductCard;
