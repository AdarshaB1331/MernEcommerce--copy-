// store/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.find((item) => item.id === newItem.id);

      if (existingItem) {
        // If the item already exists, just increment its quantity
        existingItem.quantity += newItem.quantity;
      } else {
        // If the item doesn't exist, add it to the cart
        state.push(newItem);
      }
    },
    deleteCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.find((item) => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
    clearCart: (state, action) => {
      return [];
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
