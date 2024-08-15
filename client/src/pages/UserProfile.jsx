import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Corrected import, removed destructuring
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const [userOrders, setUserOrders] = useState([]);
  const storedToken = sessionStorage.getItem("User");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameEdit, setNameEdit] = useState(false);
  const [emailEdit, setEmailEdit] = useState(false);
  const [okEdit, setokEdit] = useState(false);

  const [disableButton, setDisableButton] = useState(false);
  let decoded = null;

  if (storedToken) {
    decoded = jwtDecode(storedToken);
  }

  useEffect(() => {
    if (decoded) {
      setName(decoded.name || "");
      setEmail(decoded.email || "");
      getOrder();
    }
  }, [storedToken]);

  const onName = (e) => {
    setName(e.target.value);
  };

  const onEmail = (e) => {
    setEmail(e.target.value);
  };
  const onNameClick = () => {
    setNameEdit(true);
    setokEdit(true);
  };
  const onEmailClick = () => {
    setEmailEdit(true);
    setokEdit(true);
  };

  const getOrder = async () => {
    try {
      const res = await fetch("https://mernecommercebackend-lpgw.onrender.com/api/users/getOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({ _id: decoded?._id }),
      });

      if (res.ok) {
        let data = await res.json();
        const orders = data.orders.map((order) => order.items).flat(); // Flatten the items array
        setUserOrders(orders);
      }
    } catch (error) {}
  };

  const onEmailOkClick = () => {
    if (!email) {
      toast.error("Email fields can be empty");
      return;
    }
    updateProfile();
  };
  const updateProfile = async () => {
    setDisableButton(true);
    const token = sessionStorage.getItem("User");
    if (!name || !email) {
      toast.error("None of the fields can be empty");
      return;
    }
    if (!token) {
      toast.error("Unauthorized. Please log in.");
      return;
    }

    try {
      const res = await fetch("https://mernecommercebackend-lpgw.onrender.com/api/users/updateProfile", {
        method: "PATCH",
        body: JSON.stringify({
          id: decoded._id,
          name,
          email,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();

        sessionStorage.removeItem("User");
        sessionStorage.setItem("User", data);

        setDisableButton(true);
        toast.success("Profile updated successfully");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else if (!token) {
        setDisableButton(false);
        toast.error("Unauthorized. Please log in.");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      setDisableButton(false);
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Profile</h1>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <h4 style={{ minWidth: "100px" }}>Name:</h4>
          <input
            onChange={onName}
            value={name}
            style={{ flex: 1, marginRight: "20px" }}
            readOnly={!nameEdit}
            type="text"
            className="form-control"
            aria-label="Username"
          />
          <button
            style={{ backgroundColor: okEdit ? "black" : "" }}
            onClick={onNameClick}
            type="button"
            className="btn btn-success"
          >
            Edit
          </button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <h4 style={{ minWidth: "100px" }}>Email:</h4>
          <input
            readOnly={!emailEdit}
            onChange={onEmail}
            value={email}
            style={{ flex: 1, marginRight: "20px" }}
            type="text"
            className="form-control"
            aria-label="Username"
          />
          <button
            style={{ backgroundColor: okEdit ? "black" : "" }}
            onClick={onEmailClick}
            type="button"
            className="btn btn-success"
          >
            Edit
          </button>
          {okEdit && (
            <button
              disabled={disableButton}
              onClick={onEmailOkClick}
              style={{
                marginLeft: "60px",
                width: "100px",
                // Dynamically set the background color based on okEdit
              }}
              type="button"
              className="btn btn-danger"
            >
              Ok
            </button>
          )}
        </div>
      </div>

      <h1 style={{ textAlign: "center", marginTop: "40px" }}>Your Orders</h1>
      <ul
        className="list-group"
        style={{ maxWidth: "500px", marginLeft: "400px", marginTop: "40px" }}
      >
        {userOrders.length > 0 ? (
          userOrders.map((item, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between lh-sm"
            >
              <div>
                <h6 className="my-0">{item.title}</h6>{" "}
                <small className="text-body-secondary">
                  Quantity: {item.quantity}
                </small>
              </div>
              <span className="text-body-secondary">${item.price}</span>
            </li>
          ))
        ) : (
          <li className="list-group-item">No orders found.</li>
        )}
      </ul>
      <ToastContainer style={{ marginRight: "500px" }} />
    </div>
  );
};

export default UserProfile;
