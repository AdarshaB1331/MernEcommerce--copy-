import React, { useEffect, useState } from "react";
import { TbShoppingBagHeart } from "react-icons/tb";
import { LuShoppingCart } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileCard from "./ProfileCard";

const Navbar = () => {
  const [token, setToken] = useState(sessionStorage.getItem("User"));
  const cartItems = useSelector((store) => store.cart);
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const location = useLocation();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("User");
    setToken(storedToken);
  }, [location]);

  const handleSignOut = () => {
    sessionStorage.removeItem("User");
    setToken(null);
  };

  return (
    <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <Link
        to="/"
        className="d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
      >
        <svg className="bi me-2" width="40" height="32">
          <use xlinkHref="#bootstrap"></use>
        </svg>
        <span style={{ fontSize: "25px", fontWeight: "bold" }} className="fs-4">
          Adarsha Store
        </span>
        <TbShoppingBagHeart
          size={30}
          className="fs-4"
          style={{
            marginLeft: "10px",
            fontSize: "40px",
            fontWeight: "bold",
            verticalAlign: "middle",
          }}
        />
      </Link>

      <ul
        className="nav nav-pills ml-auto"
        style={{ marginRight: "-40px", display: "flex", alignItems: "center" }}
      >
        <li className="nav-item">
          <Link
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: "20px",
              marginRight: "25px",
              textDecoration: "none",
            }}
            to="/"
            aria-current="page"
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: "20px",
              marginRight: "25px",
              textDecoration: "none",
            }}
            to="/men"
          >
            Men
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: "20px",
              marginRight: "25px",
              textDecoration: "none",
            }}
            to="/women"
          >
            Women
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: "20px",
              marginRight: "25px",
              textDecoration: "none",
            }}
            to="/all"
          >
            Explore All
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: "20px",
              marginRight: "25px",
              textDecoration: "none",
            }}
            to="/create-account"
          >
            Create Account
          </Link>
        </li>
        {!token && (
          <li className="nav-item">
            <Link
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "20px",
                marginRight: "25px",
                textDecoration: "none",
              }}
              to="/login"
            >
              Login
            </Link>
          </li>
        )}
      </ul>

      <Link
        style={{ position: "relative" }}
        to="/cart"
        className="d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
      >
        <svg className="bi me-2" width="40" height="32">
          <use xlinkHref="#bootstrap"></use>
        </svg>
        {token && <ProfileCard token={token} onSignOut={handleSignOut} />}
        <LuShoppingCart
          size={30}
          className="fs-4"
          style={{
            marginLeft: "100px",
            fontSize: "40px",
            fontWeight: "bold",
            verticalAlign: "middle",
          }}
        />
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {totalItems || 0}
          <span className="visually-hidden">unread messages</span>
        </span>
      </Link>
    </header>
  );
};

export default Navbar;
