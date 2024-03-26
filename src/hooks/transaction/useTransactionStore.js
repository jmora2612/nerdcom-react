import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import nerdComApi from "../../api/nerdComApi";
import {
  onLoadTransaction,
  onLoadOneTransaction,
} from "../../store/transaction/transactionSlice";

export const useTransactionStore = () => {
  const { transaction, oneTransaction } = useSelector(
    (state) => state.transaction
  );

  const dispatch = useDispatch();

  const startSavingTransaction = async (save) => {
    try {
      const {
        description,
        transactionType,
        product,
        documentDate,
        amount,
        price,
        totalPrice,
        status,
      } = save;
      const { data } = await nerdComApi.post("/transaccion", {
        description,
        transactionType,
        product,
        documentDate,
        amount,
        price,
        totalPrice,
        status,
      });
      Swal.fire("Transaccion creada", data.message, "success");
    } catch ({ response }) {
      Swal.fire("Error", response.data.message, "error");
      return response.data.message;
    }
  };

  const loadTransaction = async () => {
    try {
      const { data: res } = await nerdComApi.get(`/transaccion`);
      const result = res.data;
      dispatch(onLoadTransaction(result));
    } catch ({ response }) {
      return response;
    }
  };

  const loadOneTransaction = async (id) => {
    try {
      const { data: res } = await nerdComApi.get(`/transaccion/${id}`);
      const result = res.data;
      dispatch(onLoadOneTransaction(result));
    } catch ({ response }) {
      return response;
    }
  };

  const updateTransaction = async (id, update) => {
    try {
      const { data: res } = await nerdComApi.put(`/transaccion/${id}`, update);
      Swal.fire("Transaccion actualizada", res.message, "success");
    } catch ({ response }) {
      Swal.fire("Error", response.data.message, "error");
      return response;
    }
  };

  return {
    //propiedades
    transaction,
    oneTransaction,
    //Metodos
    loadTransaction,
    startSavingTransaction,
    loadOneTransaction,
    updateTransaction,
  };
};
