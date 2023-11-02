import React, { useState, useEffect } from "react";

import LogoEdbyte from "../../assets/LogoEdbyte.png";
import { postGeneracionTicket } from "../../apis/Tickets.js";
import ModalTicket from "../modals/MotalTicket.jsx";
import AppModal from "../modals/Modal.jsx";

function CrearTicket() {
  const [errorConexion, setErrorConexion] = useState(false);

  // Para modal de alerta
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalDescription, setModalDescription] = useState("");

  // Para manear los datos que se guardaran en el formulario
  const [valores, setValores] = useState({
    FechaVencimiento: "",
    Descripcion: "",
  });

  // Estado para guardar la deshabilitacion del boton
  const [botonDisable, setBotonDisable] = useState(false);

  // Para recibir y procesar los cambios que se hacen dentro de los campos del FORMULARIO
  const ManejadorDeCambio = (event) => {
    // Obtenemos el valor a cambiar
    const { name, value } = event.target;

    setValores({
      ...valores,
      [name]: value,
    });
  };

  //Funcion que se ejecuta cuando se quiere crear el TICKET
  const GenerarTarea = async (event) => {
    event.preventDefault();

    // Verificar que los valores no estén vacíos
    if (valores.FechaVencimiento && valores.Descripcion) {
      try {
        setBotonDisable(true);

        const RespuestaGeneracionTarea = await postGeneracionTicket(
          valores.FechaVencimiento,
          valores.Descripcion
        );

        if (RespuestaGeneracionTarea.type === "success") {
          setModalOpen(true);
          setModalType(RespuestaGeneracionTarea.type);
          setModalDescription(RespuestaGeneracionTarea.message);

          setValores({
            FechaVencimiento: "",
            Descripcion: "",
          });
        } else {
          setModalOpen(true);
          setModalType(RespuestaGeneracionTarea.type);
          setModalDescription(RespuestaGeneracionTarea.message);
        }
        setBotonDisable(false);
      } catch (error) {
        setModalOpen(true);
        setModalType("error");
        setModalDescription(error.message);
      }
    } else {
      setModalOpen(true);
      setModalType("danger");
      setModalDescription(
        "Por favor complete todos los campos y la cantidad de dígitos requeridos..."
      );
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (errorConexion) {
    return (
      <div className="container mx-auto text-center">
        <h1>Error de conexión con el servidor.</h1>
        <p>
          Por favor, asegúrate de que el servidor backend esté en
          funcionamiento.
        </p>
      </div>
    );
  }

  return (
    <div className=" w-screen h-screen ">
      {/* <Encabezado TituloHeader={"Menú general"} /> */}
      <header className="flex flex-col content-center fondoEdbyte h-auto w-full rounded-b-full">
        <div>
          <img
            className="w-16 max-w-min py-5 flex mx-auto"
            src={LogoEdbyte}
            alt="Logo Edbyte"
          />
        </div>
      </header>

      <div className="flex flex-col  w-full  h-96 justify-center items-center  mt-6 md:mt-60 lg:mt-3   ">
        {/* BODY */}
        <main className="w-full  items-center justify-center mx-auto flex flex-col  ">
          {/* Seccion que contiene el formulario */}
          <section className="flex h-80 flex-col mx-auto justify-center">
            {/* Formulario */}
            <form
              className="mx-auto flex flex-col relative justify-center items-center mt-2"
              onSubmit={GenerarTarea}
            >
              <label className="text-xl font-bold textoVerdeEdbyte text-center mt-6 mb-2">
                Ingrese los datos de la tarea
              </label>
              <span className="flex flex-col relative mt-3">
                <input
                  className="w-80  md:w-96 lg:w-12/12 h-8 font-normal  text-center bg-transparent border-b-2 border-zinc-500 textoGrisOscuro"
                  name="FechaVencimiento"
                  type="datetime-local"
                  required
                  id="FechaVencimiento"
                  value={valores.FechaVencimiento}
                  onChange={ManejadorDeCambio}
                ></input>
              </span>
              <span className="flex flex-col relative mt-3">
                <textarea
                  className="w-80  md:w-96 lg:w-12/12  font-normal  text-center bg-transparent border-2 border-zinc-500 textoGrisOscuro "
                  name="Descripcion"
                  rows={5}
                  cols={35}
                  value={valores.Descripcion}
                  onChange={ManejadorDeCambio}
                  placeholder="Descripción de la tarea..."
                />
              </span>

              {/* Boton para generar Ticket */}
              <button
                // Desabilitar el boton
                disabled={botonDisable}
                className={` relative  text-white h-10 rounded-2xl w-40 mx-auto  mt-5 ${
                  botonDisable ? "bg-slate-400" : "fondoEdbyteVerde"
                }`}
                type="submit"
              >
                Crear tarea
              </button>
            </form>
          </section>
        </main>

       
        <AppModal
          isOpen={modalOpen}
          type={modalType}
          description={modalDescription}
          onRequestClose={closeModal}
        />
      </div>
    </div>
  );
}

export default CrearTicket;
