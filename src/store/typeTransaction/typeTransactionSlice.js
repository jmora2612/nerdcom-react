import { createSlice } from "@reduxjs/toolkit";

export const typeTransactionSlice = createSlice({
  name: "typeTransaction",
  initialState: {
    typeTransaction: [],
    oneTypeTransaction: {},
  },
  reducers: {
    onLoadTypeTransaction: (state, { payload }) => {
      state.typeTransaction = payload;
    },
    onLoadOneTypeTransaction: (state, { payload }) => {
      state.oneTypeTransaction = payload;
    },
  },
});
export const { onLoadTypeTransaction, onLoadOneTypeTransaction } =
  typeTransactionSlice.actions;
