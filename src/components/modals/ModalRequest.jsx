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
const ModalRequest = ({ isOpen, type, description, onRequestClose, funcionExecute, ID  }) => {
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
          
          <div className="flex flex-row gap-5 justify-center">
          <button
            className=" text-white border-green-500 bg-green-500 w-1/4 mt-4 py-1 px-4 border  rounded self-center hover:bg-green-400"
            onClick={() => funcionExecute(ID)}
          >
            Sí
          </button>
          <button
            className=" text-white border-yellow-500 bg-yellow-500 w-1/4 mt-4 py-1 px-4 border  rounded self-center hover:bg-yellow-400"
            onClick={onRequestClose}
          >
            No
          </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalRequest;
