import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Homepage from "./pages/Homepage.jsx";
import Menpage from "./pages/Menpage.jsx";
import Womenpage from "./pages/Womenpage.jsx";
import ExploreAllpage from "./pages/ExploreAllpage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckOut from "./pages/CheckOut.jsx";
import adarshaStore from "./store/index.js";
import { Provider } from "react-redux";
import CreateAccount from "./pages/CreateAccount.jsx";
import Login from "./pages/Login.jsx";
import UserProfile from "./pages/UserProfile.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Homepage /> },
      {
        path: "/men",
        element: <Menpage />,
      },
      { path: "/women", element: <Womenpage /> },
      { path: "/all", element: <ExploreAllpage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/checkout", element: <CheckOut /> },
      { path: "/create-account", element: <CreateAccount /> },
      { path: "/login", element: <Login /> },
      { path: "/profile", element: <UserProfile /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={adarshaStore}>
      {" "}
      <RouterProvider router={router}>
        {" "}
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
