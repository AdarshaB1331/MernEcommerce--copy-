import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  const [token, setToken] = useState(sessionStorage.getItem("User"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(sessionStorage.getItem("User"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <>
      <Navbar token={token} />
      <Outlet />
    </>
  );
}

export default App;
