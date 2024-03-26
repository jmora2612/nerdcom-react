import { useEffect, useState } from "react";
import { useStatusStore } from "../../hooks/statusHooks/useStatusStore";
import { AiFillEye } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";
import { ModalComponent } from "./ModalComponent";
import { Link, useNavigate } from "react-router-dom";

export const Status = () => {
  const { status, loadStatus } = useStatusStore();
  const [modalIsOpen, setIsOpen] = useState(false);
  let [info, setInfo] = useState({});
  const navigate = useNavigate();
  const openModal = (data, index) => {
    info = { ...data, index: 1 + index };
    setInfo(info);
    setIsOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    loadStatus();
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center mx-5">
      <button className="self-end mr-4 mb-4 bg-blue-200 w-1/6 h-10 rounded-md shadow-md">
        <Link to="/agregar-estado" className="block font-semibold">
          Agregar
        </Link>
      </button>
      <table className="w-full">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              N*
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Descripcion
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {status.map((el, index) => (
            <tr
              key={el._id}
              className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {index + 1}
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {el.description}
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <div className="flex gap-2">
                  <AiFillEye
                    className="cursor-pointer"
                    onClick={() => openModal(el, index)}
                  />
                  <BsFillPencilFill
                    className="cursor-pointer"
                    onClick={() => navigate("/agregar-estado/"+el._id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalComponent
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        info={info}
      />
    </div>
  );
};
