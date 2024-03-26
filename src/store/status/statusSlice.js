import { createSlice } from "@reduxjs/toolkit";

export const statusSlice = createSlice({
  name: "status",
  initialState: {
    status: [],
    oneStatus:{}
  },
  reducers: {
    onLoadStatus: (state, { payload }) => {
      state.status = payload;
    },
    onLoadOneStatus: (state, { payload }) => {
      state.oneStatus = payload;
    },
  },
});
export const { onLoadStatus, onLoadOneStatus } = statusSlice.actions;
