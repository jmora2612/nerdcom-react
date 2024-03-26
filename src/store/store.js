import { configureStore } from "@reduxjs/toolkit";
import { statusSlice } from "./status/statusSlice";
import { typeTransactionSlice } from "./typeTransaction/typeTransactionSlice";
import { productSlice } from "./product/productSlice";
import { transactionSlice } from "./transaction/transactionSlice";

export const store = configureStore({
  reducer: {
    status: statusSlice.reducer,
    typeTransaction: typeTransactionSlice.reducer,
    product: productSlice.reducer,
    transaction: transactionSlice.reducer,
  },
  //middleware
  //esto es para que las fechas no se revise si se pueden serializar
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
