import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const ProfileCard = ({ token, onSignOut }) => {
  const [decoded, setDecoded] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setDecoded(decodedToken);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, [token]);

  return (
    <div>
      {decoded ? (
        <div className="flex-shrink-0 dropdown">
          <button
            className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              margin: 0,
              cursor: "pointer",
            }}
          >
            <Link to="/profile">
              {" "}
              <img
                src="https://github.com/mdo.png"
                alt="Profile"
                width="32"
                height="32"
                className="rounded-circle"
                img
              />
            </Link>
          </button>
          <ul className="dropdown-menu text-small shadow">
            <li>
              <Link to="/profile" className="dropdown-item disabled-item">
                {decoded.name}
              </Link>
            </li>

            <li>
              <Link to="/profile" className="dropdown-item disabled-item">
                {decoded.email}
              </Link>
            </li>
            <li>
              <Link to="/profile" className="dropdown-item">
                Profile
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button onClick={onSignOut} className="dropdown-item">
                Sign out
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ProfileCard;
