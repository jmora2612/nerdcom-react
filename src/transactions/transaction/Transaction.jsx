import { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useTransactionStore } from "../../hooks/transaction/useTransactionStore";
import { ModalComponent } from "./ModalComponent";

export const Transaction = () => {
  const { transaction, loadTransaction } = useTransactionStore();
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
    loadTransaction();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");

    return `${day}-${month}-${year}`;
  };


  return (
    <div className="h-screen flex flex-col justify-center items-center mx-5">
      <button className="self-end mr-4 mb-4 bg-blue-200 w-1/6 h-10 rounded-md shadow-md">
        <Link to="/agregar-transaccion" className="block font-semibold">
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
              Tipo de transaccion
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Articulo
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Fecha documento
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Cantidad
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Costo
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Costo total
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Estatus
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
          {transaction.map((el, index) => (
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
                {el.transactionType}
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {el.product}
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {formatDate(el.documentDate)}
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {el.amount}
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {el.price}
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {el.totalPrice}
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {el.status}
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <div className="flex gap-2">
                  <AiFillEye
                    className="cursor-pointer"
                    onClick={() => openModal(el, index)}
                  />
                  <BsFillPencilFill
                    className="cursor-pointer"
                    onClick={() => navigate("/agregar-transaccion/" + el._id)}
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
