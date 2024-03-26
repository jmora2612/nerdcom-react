import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useStatusStore } from "../../hooks/statusHooks/useStatusStore";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export const StatusAdd = () => {
  const { id } = useParams();

  const { oneStatus, startSavingStatus, loadOneStatus, updateStatus } = useStatusStore();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { isValid, errors },
    reset,
    setValue,
    watch
  } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    if (id) loadOneStatus(id);
  }, [id]);


  useEffect(() => {
    if (oneStatus && id) {
      setValue("description", oneStatus.description || '');
    }
  }, [oneStatus]);

  const onSubmit = async (data) => {
    id ? await updateStatus(id, data) : await startSavingStatus(data);
    reset();
    navigate("/");
  };
  

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-md w-4/5">
          <h2 className="text-xl font-semibold mb-4">{id ? "Actualizar datos" : "Guardar datos"}</h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <span>Descripcion</span>
              <input
                type="text"
                className={clsx("p-2 border rounded-md bg-gray-200 w-full", {
                  "border-red-500": errors.description?.type === "required",
                })}
                {...register("description", { required: true })}
                value={watch('description') || ''}
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
