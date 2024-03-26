import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    oneProduct:{}
  },
  reducers: {
    onLoadProduct: (state, { payload }) => {
      state.product = payload;
    },
    onLoadOneProduct: (state, { payload }) => {
      state.oneProduct = payload;
    },
  },
});
export const { onLoadProduct, onLoadOneProduct } = productSlice.actions;
