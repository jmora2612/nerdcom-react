import Modal from "react-modal";

export const ModalComponent = ({ isOpen, onRequestClose, info }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "40%",
      height: "50%",
      borderRadius: "10px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Ejemplo de Modal"
      style={customStyles}
    >
      <h1 className="flex justify-center">Información del producto</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 items-center mx-5 mt-8 gap-4 mt-20">
        <span>N* {info.index}</span>
        <span>Descripcion: {info.description}</span>

        <span>Cantidad: {info.amount}</span>

        <span>Costo: {info.price}</span>

        <span>
          Fecha entrada:{" "}
          {new Date(info.entryDate).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
        <span>
          Fecha salida:{" "}
          {new Date(info.expirationDate).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>

        <span>Estado: {info.status}</span>
      </div>
    </Modal>
  );
};
