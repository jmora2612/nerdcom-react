import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import nerdComApi from "../../api/nerdComApi";
import { onLoadStatus, onLoadOneStatus } from "../../store/status/statusSlice";

export const useStatusStore = () => {
  const { status, oneStatus } = useSelector((state) => state.status);

  const dispatch = useDispatch();

  const startSavingStatus = async (save) => {
    try {
      const { description } = save;
      const { data } = await nerdComApi.post("/estados", {
        description,
      });
      Swal.fire("Estado creado", data.message, "success");
    } catch ({ response }) {
      Swal.fire("Error", response.data.message, "error");
      return response.data.message;
    }
  };

  const loadStatus = async () => {
    try {
      const { data: res } = await nerdComApi.get(`/estados`);
      const result = res.data;
      dispatch(onLoadStatus(result));
    } catch ({ response }) {
      return response;
    }
  };

  const loadOneStatus = async (id) => {
    try {
      const { data: res } = await nerdComApi.get(`/estados/${id}`);
      const result = res.data;
      dispatch(onLoadOneStatus(result));
    } catch ({ response }) {
      return response;
    }
  };

  const updateStatus = async (id, update) => {
    try {
      const { data: res } = await nerdComApi.put(`/estados/${id}`, update);
      Swal.fire("Estado actualizado", res.message, "success");
    } catch ({ response }) {
      Swal.fire("Error", response.data.message, "error");
      return response;
    }
  };

  return {
    //propiedades
    status,
    oneStatus,
    //Metodos
    loadStatus,
    startSavingStatus,
    loadOneStatus,
    updateStatus
  };
};
