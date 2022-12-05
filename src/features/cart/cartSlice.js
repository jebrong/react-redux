import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const initialState = {
  cartItems: cartItems,
  amount: cartItems.length,
  value: 0,
  isloading: true,
};

const cartSlice = createSlice({
  name: "bobby",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = cartItems.filter((item) => {
        return item.id !== itemId;
      });
    },
    updateItem: (state, action) => {
      const itemStatus = action.payload.status;
      const itemId = action.payload.id;
      const item = state.cartItems.find((item) => {
        return item.id === itemId;
      });

      itemStatus === "minus" ? --item.amount : ++item.amount;
      if (item.amount <= 0)
        state.cartItems = state.cartItems.filter((item) => {
          return item.id !== itemId;
        });
    },
    updateTotals: (state, action) => {
      let totalItems = 0;
      let totalValue = 0;

      state.cartItems.map((item) => {
        totalItems += item.amount;
        totalValue += item.amount * item.price;
      });

      state.amount = totalItems;
      state.value = totalValue;
    },
  },
});

export const { clearCart, removeItem, updateItem, updateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
