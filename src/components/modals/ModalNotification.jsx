import React from "react";
import Modal from "react-modal";
import LogoEdbyte from "../../assets/LogoEdbyte.png";

// Estilos para el modal
const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo negro transparente
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // definir ancho
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#FFFFFF", // Fondo blanco
    borderRadius: "20px",
    padding: "0",
    boxShadow: "10px 4px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px", // Define el ancho máximo que desees
    width: "90%", // Opcional: Define un ancho relativo si lo prefieres
  },
};

// Pintarlo en el root
Modal.setAppElement("#root");

// Componente Modal
const ModalTicket = ({ isOpen, description, onRequestClose }) => {
  return (
    // Creamos el modal utilizando la librería modal que facilita crear modals, pasamos parámetros ya recogidos
    <Modal isOpen={isOpen} style={customStyles} onRequestClose={onRequestClose}>
      <div className="rounded-lg overflow-hidden relative flex flex-col justify-center py-5">
        <div>
          <h2 className="text-xl font-bold text-center textoVerdeEdbyte">
            Aviso importante
          </h2>
        </div>
        <div className="bg-white mx-4   text-center">
          <p>
            <span
              className="flex flex-col justify-center"
              role="img"
              aria-label="Ticket Emoji"
            >
             
            </span>
          </p>

          <h2 className="text-lg font-bold text-center my-4  textoAzulEdbyte">
            {description}
          </h2>

          <img
            src={LogoEdbyte}
            alt="Logo Edbyte"
            className="mx-auto mt-4 w-52"
          />
          <p className="mt-4 text-center text-sm max-w-xs mx-auto">
            “Compromiso permanente con entregar servicios de calidad”
          </p>

          <div className="flex flex-row">
            <button
              className=" text-white fondoEdbyteVerde rounded mt-4 py-2 w-28 mx-auto"
              onClick={onRequestClose}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalTicket;
