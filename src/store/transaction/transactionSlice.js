import { createSlice } from "@reduxjs/toolkit";

export const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transaction: [],
    oneTransaction: {},
  },
  reducers: {
    onLoadTransaction: (state, { payload }) => {
      state.transaction = payload;
    },
    onLoadOneTransaction: (state, { payload }) => {
      state.oneTransaction = payload;
    },
  },
});
export const { onLoadTransaction, onLoadOneTransaction } =
  transactionSlice.actions;
