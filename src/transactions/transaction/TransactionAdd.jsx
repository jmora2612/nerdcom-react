import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useStatusStore } from "../../hooks/statusHooks/useStatusStore";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProductStore } from "../../hooks/product/useProductStore";
import { useTypeTransactionStore } from "../../hooks/typeTransactionHooks/useTypeTransactionStore";
import { useTransactionStore } from "../../hooks/transaction/useTransactionStore";

export const TransactionAdd = () => {
  const { id } = useParams();
  const { status, loadStatus } = useStatusStore();

  const { product, loadProduct } = useProductStore();

  const { typeTransaction, loadTypeTransaction } = useTypeTransactionStore();

  const {
    oneTransaction,
    startSavingTransaction,
    updateTransaction,
    loadOneTransaction,
  } = useTransactionStore();

  const [totalPrice, setTotalPrice] = useState("");

  const [amounts, setAmount] = useState("");

  const [price, setPrice] = useState("");

  useEffect(() => {
    setTotalPrice(amounts * price);
  }, [amounts, price]);

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
    loadTypeTransaction();
    loadProduct();
  }, []);

  useEffect(() => {
    if(oneTransaction) setTotalPrice(oneTransaction.totalPrice) || ''
  }, []);

  useEffect(() => {
    if (id) loadOneTransaction(id);
  }, [id]);

  useEffect(() => {
    if (oneTransaction && id) {
      setValue("description", oneTransaction.description || "");
      setValue("documentDate", formatDate(oneTransaction.documentDate) || "");
      setValue("amount", oneTransaction.amount || "");
      setValue("price", oneTransaction.price || "");
      setValue("totalPrice", oneTransaction.totalPrice || totalPrice)
      setValue("status", oneTransaction.status || "");
      setValue("transactionType", oneTransaction.transactionType || "")
      setValue("product", oneTransaction.product || "");
    }
  }, [oneTransaction]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const onSubmit = async (data) => {
    data = { ...data, totalPrice: totalPrice };
    id ? await updateTransaction(id, data) : await startSavingTransaction(data);
    reset();
    navigate("/transaccion");
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
                <span>Tipo de transaccion</span>
                <select
                  className="p-2 border rounded-md bg-gray-200"
                  {...register("transactionType", { required: true })}
                >
                  <option value="">[Seleccione]</option>
                  {typeTransaction.map((el) => (
                    <option key={el._id} value={el._id}>
                      {el.description}
                    </option>
                  ))}
                </select>
                {errors.transactionType?.type === "required" && (
                  <span
                    className={clsx({
                      "text-red-500 mb-5":
                        errors.transactionType?.type === "required",
                    })}
                  >
                    Tipo de transaccion es requerido
                  </span>
                )}
              </div>

              <div className="flex flex-col mb-2">
                <span>Articulo</span>
                <select
                  className="p-2 border rounded-md bg-gray-200"
                  {...register("product", { required: true })}
                >
                  <option value="">[Seleccione]</option>
                  {product.map((el) => (
                    <option key={el._id} value={el._id}>
                      {el.description}
                    </option>
                  ))}
                </select>
                {errors.product?.type === "required" && (
                  <span
                    className={clsx({
                      "text-red-500 mb-5": errors.product?.type === "required",
                    })}
                  >
                    Articulo es requerido
                  </span>
                )}
              </div>

              <div className="flex flex-col mb-2">
                <span>Fecha documento</span>
                <input
                  type="date"
                  className={clsx("p-2 border rounded-md bg-gray-200 w-full", {
                    "border-red-500": errors.documentDate?.type === "required",
                  })}
                  {...register("documentDate", { required: true })}
                  value={watch("documentDate") || ""}
                />
                {errors.documentDate?.type === "required" && (
                  <span
                    className={clsx({
                      "text-red-500 mb-5":
                        errors.documentDate?.type === "required",
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
                  // value={watch("amount") || ""}
                  onChange={(e) => setAmount(e.target.value)}
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
                  // value={watch("price") || ""}
                  onChange={(e) => setPrice(e.target.value)}
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
            </div>
            <div className="grid md:grid-cols-2 gap-2 sm:gap-5">
              <div className="flex flex-col mb-2">
                <span>Costo total</span>
                <input
                  type="text"
                  readOnly
                  className={clsx("p-2 border rounded-md bg-gray-200 w-full", {
                    "border-red-500": errors.totalPrice?.type === "required",
                  })}
                  {...register("totalPrice")}
                  value={totalPrice}
                />
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
