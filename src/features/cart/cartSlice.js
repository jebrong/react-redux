import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";
import axios from "axios";

const url = "https://www.course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems: [],
  amount: null,
  value: null,
  isLoading: true,
};

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async function () {
    try {
      const response = await axios(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

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

  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.cartItems = action.payload;

        state.isLoading = false;
      })
      .addCase(getCartItems.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { clearCart, removeItem, updateItem, updateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
