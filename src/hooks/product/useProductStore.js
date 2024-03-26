import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import nerdComApi from "../../api/nerdComApi";
import {
  onLoadProduct,
  onLoadOneProduct,
} from "../../store/product/productSlice";

export const useProductStore = () => {
  const { product, oneProduct } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  const startSavingProduct = async (save) => {
    try {
      const { description, entryDate, expirationDate, amount, price, status } =
        save;
      const { data } = await nerdComApi.post("/articulos", {
        description,
        entryDate,
        expirationDate,
        amount,
        price,
        status,
      });
      Swal.fire("Producto creado", data.message, "success");
    } catch ({ response }) {
      Swal.fire("Error", response.data.message, "error");
      return response.data.message;
    }
  };

  const loadProduct = async () => {
    try {
      const { data: res } = await nerdComApi.get(`/articulos`);
      const result = res.data;
      dispatch(onLoadProduct(result));
    } catch ({ response }) {
      return response;
    }
  };

  const loadOneProduct = async (id) => {
    try {
      const { data: res } = await nerdComApi.get(`/articulos/${id}`);
      const result = res.data;
      dispatch(onLoadOneProduct(result));
    } catch ({ response }) {
      return response;
    }
  };

  const updateProduct = async (id, update) => {
    try {
      const { data: res } = await nerdComApi.put(`/articulos/${id}`, update);
      Swal.fire("Producto actualizado", res.message, "success");
    } catch ({ response }) {
      Swal.fire("Error", response.data.message, "error");
      return response;
    }
  };

  return {
    //propiedades
    product,
    oneProduct,
    //Metodos
    loadProduct,
    startSavingProduct,
    loadOneProduct,
    updateProduct,
  };
};
