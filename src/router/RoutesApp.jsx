import { Navigate, Route, Routes } from "react-router-dom";
import { Status } from "../transactions/status/Status";
import { StatusAdd } from "../transactions/status/StatusAdd";
import { TransactionType } from "../transactions/transactionType/TransactionType";
import { TransactionTypeAdd } from "../transactions/transactionType/TransactionTypeAdd";
import { Product } from "../transactions/product/Product";
import { Transaction } from "../transactions/transaction/Transaction";
import { ProductAdd } from "../transactions/product/ProductAdd";
import { TransactionAdd } from "../transactions/transaction/TransactionAdd";

export const RoutesApp = () => {
  return (
    <Routes>
      <>
        <Route path="/" element={<Status />} />
        <Route path="/agregar-estado" element={<StatusAdd />} />
        <Route path="/agregar-estado/:id?" element={<StatusAdd />} />
        <Route path="/tipo-de-transaccion" element={<TransactionType />} />
        <Route
          path="/agregar-tipo-de-transaccion"
          element={<TransactionTypeAdd />}
        />
        <Route
          path="/agregar-tipo-de-transaccion/:id?"
          element={<TransactionTypeAdd />}
        />

        <Route path="/articulo" element={<Product />} />
        <Route path="/agregar-articulo" element={<ProductAdd />} />
        <Route path="/agregar-articulo/:id?" element={<ProductAdd />} />

        <Route path="/transaccion" element={<Transaction />} />
        <Route path="/agregar-transaccion" element={<TransactionAdd />} />
        <Route path="/agregar-transaccion/:id?" element={<TransactionAdd />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </>
    </Routes>
  );
};
