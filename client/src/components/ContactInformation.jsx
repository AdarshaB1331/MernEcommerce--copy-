// ContactInformation.js
import React from "react";

const ContactInformation = ({ email, setEmail }) => {
  return (
    <div className="contact-info">
      <h3>Contact Information</h3>
      <input
        style={{ maxWidth: "500px", marginBottom: "40px" }}
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
      />
    </div>
  );
};

export default ContactInformation;
