import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import nerdComApi from "../../api/nerdComApi";
import { onLoadOneTypeTransaction, onLoadTypeTransaction } from "../../store/typeTransaction/typeTransactionSlice";

export const useTypeTransactionStore = () => {
  const { typeTransaction, oneTypeTransaction } = useSelector((state) => state.typeTransaction);

  const dispatch = useDispatch();

  const startSavingTypeTransaction = async (save) => {
    try {
      const { description } = save;
      const { data } = await nerdComApi.post("/tipo-transaccion", {
        description,
      });
      Swal.fire("Tipo de transaccion creada", data.message, "success");
    } catch ({ response }) {
      Swal.fire("Error", response.data.message, "error");
      return response.data.message;
    }
  };

  const loadTypeTransaction = async () => {
    try {
      const { data: res } = await nerdComApi.get(`/tipo-transaccion`);
      const result = res.data;
      dispatch(onLoadTypeTransaction(result));
    } catch ({ response }) {
      return response;
    }
  };

  const loadOneTypeTransaction = async (id) => {
    try {
      const { data: res } = await nerdComApi.get(`/tipo-transaccion/${id}`);
      const result = res.data;
      dispatch(onLoadOneTypeTransaction(result));
    } catch ({ response }) {
      return response;
    }
  };

  const updateTypeTransaction = async (id, update) => {
    try {
      const { data: res } = await nerdComApi.put(`/tipo-transaccion/${id}`, update);
      Swal.fire("Tipo de transaccion actualizada", res.message, "success");
    } catch ({ response }) {
      Swal.fire("Error", response.data.message, "error");
      return response;
    }
  };

  return {
    //propiedades
    typeTransaction,
    oneTypeTransaction,
    //Metodos
    loadTypeTransaction,
    startSavingTypeTransaction,
    loadOneTypeTransaction,
    updateTypeTransaction
  };
};
