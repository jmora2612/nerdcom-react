import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useStatusStore } from "../../hooks/statusHooks/useStatusStore";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useProductStore } from "../../hooks/product/useProductStore";

export const ProductAdd = () => {
  const { id } = useParams();
  const { status, loadStatus } = useStatusStore();

  const { oneProduct, startSavingProduct, updateProduct, loadOneProduct } =
    useProductStore();

  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { isValid, errors },
    reset,
    setValue,
    watch,
  } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    loadStatus();
  }, []);

  useEffect(() => {
    if (id) loadOneProduct(id);
  }, [id]);

  useEffect(() => {
    if (oneProduct && id) {
      setValue("description", oneProduct.description || "");
      setValue("entryDate", formatDate(oneProduct.entryDate) || "");
      setValue("expirationDate", formatDate(oneProduct.expirationDate) || "");
      setValue("amount", oneProduct.amount || "");
      setValue("price", oneProduct.price || "");
      setValue("status", oneProduct.status || "");
    }
  }, [oneProduct]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const onSubmit = async (data) => {
    id ? await updateProduct(id, data) : await startSavingProduct(data);
    reset();
    navigate("/articulo");
  };

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-md w-4/5">
          <h2 className="text-xl font-semibold mb-4">
            {id ? "Actualizar datos" : "Guardar datos"}
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-3 gap-2 sm:gap-5">
              <div className="flex flex-col mb-2">
                <span>Descripcion</span>
                <input
                  type="text"
                  className={clsx("p-2 border rounded-md bg-gray-200 w-full", {
                    "border-red-500": errors.description?.type === "required",
                  })}
                  {...register("description", { required: true })}
                  value={watch("description") || ""}
                />
                {errors.description?.type === "required" && (
                  <span
                    className={clsx({
                      "text-red-500 mb-5":
                        errors.description?.type === "required",
                    })}
                  >
                    La descripcion es requerida
                  </span>
                )}
              </div>
              <div className="flex flex-col mb-2">
                <span>Fecha ingreso</span>
                <input
                  type="date"
                  className={clsx("p-2 border rounded-md bg-gray-200 w-full", {
                    "border-red-500": errors.entryDate?.type === "required",
                  })}
                  {...register("entryDate", { required: true })}
                  value={watch("entryDate") || ""}
                />
                {errors.entryDate?.type === "required" && (
                  <span
                    className={clsx({
                      "text-red-500 mb-5":
                        errors.entryDate?.type === "required",
                    })}
                  >
                    La fecha ingreso es requerida
                  </span>
                )}
              </div>

              <div className="flex flex-col mb-2">
                <span>Fecha Vencimiento</span>
                <input
                  type="date"
                  className={clsx("p-2 border rounded-md bg-gray-200 w-full", {
                    "border-red-500":
                      errors.expirationDate?.type === "required",
                  })}
                  {...register("expirationDate", { required: true })}
                  value={watch("expirationDate") || ""}
                />
                {errors.expirationDate?.type === "required" && (
                  <span
                    className={clsx({
                      "text-red-500 mb-5":
                        errors.expirationDate?.type === "required",
                    })}
                  >
                    La fecha vencimiento es requerida
                  </span>
                )}
              </div>

              <div className="flex flex-col mb-2">
                <span>Cantidad</span>
                <input
                  type="text"
                  className={clsx("p-2 border rounded-md bg-gray-200 w-full", {
                    "border-red-500": errors.amount?.type === "required",
                  })}
                  {...register("amount", { required: true })}
                  value={watch("amount") || ""}
                />
                {errors.amount?.type === "required" && (
                  <span
                    className={clsx({
                      "text-red-500 mb-5": errors.amount?.type === "required",
                    })}
                  >
                    La cantidad es requerida
                  </span>
                )}
              </div>

              <div className="flex flex-col mb-2">
                <span>Costo</span>
                <input
                  type="text"
                  className={clsx("p-2 border rounded-md bg-gray-200 w-full", {
                    "border-red-500": errors.price?.type === "required",
                  })}
                  {...register("price", { required: true })}
                  value={watch("price") || ""}
                />
                {errors.price?.type === "required" && (
                  <span
                    className={clsx({
                      "text-red-500 mb-5": errors.price?.type === "required",
                    })}
                  >
                    La costo es requerida
                  </span>
                )}
              </div>

              <div className="flex flex-col mb-2">
                <span>Estado</span>
                <select
                  className="p-2 border rounded-md bg-gray-200"
                  {...register("status", { required: true })}
                >
                  <option value="">[Seleccione]</option>
                  {status.map((el) => (
                    <option key={el._id} value={el._id}>
                      {el.description}
                    </option>
                  ))}
                </select>
                {errors.status?.type === "required" && (
                  <span
                    className={clsx({
                      "text-red-500 mb-5": errors.status?.type === "required",
                    })}
                  >
                    La estado es requerida
                  </span>
                )}
              </div>
            </div>
            <div>
              <button
                className="w-full bg-blue-500 text-white 
                font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
