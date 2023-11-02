import React from "react";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { getColaboradoresAgencia } from "../../apis/Kanban.js";
import {
  patchActualizarDataTicket,
  patchCancelarTicket,
  patchTransferirTicket,
} from "../../apis/Kanban.js";
import ModalNotificacion from "./Modal.jsx";

// Estilos para el modal
const customStyles = {
  overlay: {
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
    maxHeight: "100%", // Altura máxima del contenido del modal
    overflowY: "auto", // Estilo de desbordamiento vertical automático
  },
};

// Componente Modal
const AppModal = ({
  modTicketOpen,
  onRequestCloseModTicket,
  dataJSON,
  CoordenadasTicketModificado,
  TablerosInicializadosConData,
  setTablerosInicializadosConData,
}) => {
  // Estados para mostrar, type y descipcion de AVISO POPUP
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalDescription, setModalDescription] = useState("");

  // Para manear los datos que se guardaran en el formulario
  const [valores, setValores] = useState({
    id: "",
    NoTicket: "",
    FechaYHora: "",
    FechaVencimiento: "",
    Descripcion: "",
  });

  // Para recibir y procesar los cambios que se hacen dentro de los campos del FORMULARIO
  const ManejadorDeCambio = (event) => {
    // Obtenemos el valor a cambiar
    const { name, value } = event.target;

    setValores({
      ...valores,
      [name]: value,
    });
  };

  // Para consultar datos de un colaborador por su USUARIO
  const CargarDataRecibidaDeTicketAlEstadoDeValores = async () => {
    try {
      setValores({
        id: dataJSON.id,
        NoTicket: dataJSON.NoTicket,
        FechaYHora: dataJSON.FechaYHora,
        FechaVencimiento: dataJSON.FechaCulminacion,
        Descripcion: dataJSON.Detalles,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Funcion qu se llamara para actualizar la data del TICKET
  const FuncionParaActualizarDataTicket = async () => {
    try {
      const responseAPI = await patchActualizarDataTicket(
        valores.id,
        valores.FechaVencimiento,
        valores.Descripcion
      );

      // Mostramos modal de aviso de peticion
      setModalOpen(true);
      setModalType(responseAPI.type);
      setModalDescription(responseAPI.message);

      if (responseAPI.type == "success") {
        // Obtener una copia del estado actual
        const estadoCopiaTemporal = { ...TablerosInicializadosConData };

        // Encuentra el ticket específico que deseas actualizar
        const ticketId = CoordenadasTicketModificado.IDTicket;
        const ticketIndex = estadoCopiaTemporal[
          CoordenadasTicketModificado.IDTablero
        ].findIndex((ticket) => ticket.id === ticketId);

        if (ticketIndex !== -1) {
          // Realiza los cambios necesarios en los campos del ticket específico
          estadoCopiaTemporal[CoordenadasTicketModificado.IDTablero][
            ticketIndex
          ].FechaCulminacion = valores.FechaVencimiento;

          estadoCopiaTemporal[CoordenadasTicketModificado.IDTablero][
            ticketIndex
          ].Detalles = valores.Descripcion;
        }

        // Actualiza el estado con el ticket modificado
        setTablerosInicializadosConData(estadoCopiaTemporal);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    CargarDataRecibidaDeTicketAlEstadoDeValores();
  }, []);

  const CloseInterno = () => {
    onRequestCloseModTicket();
    setValores({
      id: "",
      NoTicket: "",
      FechaYHora: "",
      FechaVencimiento: "",
      Descripcion: "",
    });
  };

  // Funcion de cierre por fondo y por botones de MODAL AVISOS
  const closeModal = () => {
    setModalOpen(false);
  };

  // Pintarlo en el root
  Modal.setAppElement("#root");
  // Creamos el contenido a retornar
  return (
    // creamos el modal utilizando la libreria modal que facilita crear modals, pasamos parametros ya recigidos
    <Modal
      isOpen={modTicketOpen}
      style={customStyles}
      onRequestClose={CloseInterno}
    >
      <div className="rounded-lg overflow-hidden ">
        <div className={` px-4 py-2 flex flex-row relative justify-center`}>
          <h2 className="text-white text-lg font-bold  text-center">
            Modificación de tarea
          </h2>
          <button
            className="absolute text-lg text-white font-bold right-4 w-8 h-8"
            onClick={CloseInterno}
          >
            X
          </button>
        </div>
        <div className="bg-white p-4 flex flex-col ">
          <div className="flex flex-row justify-center">
            <span>
              <b>Tarea:</b>: {valores.NoTicket}
            </span>
            <span className="ml-5">
              <b>Fecha de creación:</b> {valores.FechaYHora}
            </span>
          </div>

          <div>
            {/* Nombre del asociado */}
            <span className="flex flex-col mt-0">
              <label className="font-medium" htmlFor="FechaVencimiento">
                Fecha de vencimiento:
              </label>
              <input
                className="border-neutral-600 border-solid border rounded-sm h-7 text-center w-full"
                type="text"
                name="FechaVencimiento"
                value={valores.FechaVencimiento}
                onChange={ManejadorDeCambio}
              />
            </span>

            <div className="flex flex-row gap-7 ">
              {/* Detalles del Ticket del asociado */}
              <span className="flex flex-col mt-3">
                <label className="font-medium" htmlFor="DetallesTicket">
                  Detalles:
                </label>
                <textarea
                  className="border border-neutral-600 rounded-sm p-2"
                  name="Detalles"
                  rows={1}
                  cols={35}
                  value={valores.Detalles}
                  onChange={ManejadorDeCambio}
                />
              </span>
            </div>
          </div>

          {/* Contenedor para botones */}
          <div className="flex flex-row  justify-around">
            <button
              className="fondoEdbyte border-white mt-4 py-2 px-4 border  rounded self-center hover:bg-blue-700 text-white"
              onClick={FuncionParaActualizarDataTicket}
            >
              Modificar tarea
            </button>
          </div>
        </div>
        {modalOpen ? (
          <ModalNotificacion
            isOpen={modalOpen}
            type={modalType}
            description={modalDescription}
            onRequestClose={closeModal}
          />
        ) : null}
      </div>
    </Modal>
  );
};

export default AppModal;
