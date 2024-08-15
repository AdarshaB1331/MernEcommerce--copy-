import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";

const adarshaStore = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});
export default adarshaStore;
