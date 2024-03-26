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
      width: "30%",
      height: "30%",
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
      <h1 className="flex justify-center">Información</h1>

      <div className="grid grid-cols-2 items-center mx-5 my-4 mt-20">
        {/* <h1>Informacion de estatus</h1> */}
        <span>N* {info.index}</span>
        <span>
          Descripcion: {info.description}
        </span>
      </div>
      {/* <button onClick={onRequestClose}>Cerrar Modal</button> */}
    </Modal>
  );
};
