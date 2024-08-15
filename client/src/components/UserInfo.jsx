import React, { useState } from "react";
import ContactInformation from "./ContactInformation";
import ShippingAddress from "./ShippingAddress";

const UserInfo = () => {
  const [email, setEmail] = useState("");
  return (
    <div class="col-md-7 col-lg-8">
      <ContactInformation email={email} setEmail={setEmail} />
      <ShippingAddress email={email} />
    </div>
  );
};

export default UserInfo;
