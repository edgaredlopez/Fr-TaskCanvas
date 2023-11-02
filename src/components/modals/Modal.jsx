import React from "react";
import Modal from "react-modal";

// Estilos para el modal
const customStyles = {
  overlay: {
    zIndex: 100, 
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo negro transparente
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#003C71",
    borderRadius: "20px",
    padding: "0",
    boxShadow: "10px 4px 10px rgba(0, 0, 0, 0.1)",
  },
};

let tituloModal = "";

// Pintarlo en el root
Modal.setAppElement("#root");

// Componente Modal
const AppModal = ({ isOpen, type, description, onRequestClose }) => {
  // Variavle para guardar el color del header
  let modalColor;

  // Coloremos y titulamos segun el type
  switch (type) {
    case "success":
      modalColor = "bg-green-500";
      tituloModal = "Confirmación";
      break;
    case "danger":
      modalColor = "bg-yellow-500";
      tituloModal = "Alerta";
      break;
    case "error":
      modalColor = "bg-red-500";
      tituloModal = "Error";
      break;
    default:
      modalColor = "bg-blue-500";
  }

  if (isOpen) {
    setTimeout(() => {
      onRequestClose();
    }, 3000);
  }
  // Creamos el contenido a retornar
  return (
    // creamos el modal utilizando la libreria modal que facilita crear modals, pasamos parametros ya recigidos
    <Modal isOpen={isOpen} style={customStyles} onRequestClose={onRequestClose}>
      <div className="rounded-lg overflow-hidden">
        <div className={` p-4 ${modalColor}`}>
          <h2 className="text-white text-lg font-bold  text-center">
            {tituloModal}
          </h2>
        </div>
        <div className="bg-white p-4 flex flex-col ">
          <p className="text-slate-900">{description}</p>
          <button
            className=" text-slate-800 border-slate-950 mt-4 py-2 px-4 border  rounded self-center hover:bg-slate-200 hover:text-gray-800 hover:border-gray-800"
            onClick={onRequestClose}
          >
            Aceptar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AppModal;
