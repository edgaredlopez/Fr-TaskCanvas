import React from "react";
import { useState, useEffect } from "react";
import AppModal from "../../components/modals/Modal.jsx";
import LogoEdbyte from "../../assets/LogoEdbyte.png";
import Encabezado from "../Header/Encabezado";
import { getEstadoTrackeoTicket } from "../../apis/Reportes.js";
import {
  FaEye,
  FaSearchLocation,
  FaBalanceScaleRight,
  FaBook,
  FaRegCheckCircle,
  FaMoneyBillWave,
} from "react-icons/fa";
function EstadoTicket() {
  // Para modal de alerta
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalDescription, setModalDescription] = useState("");

  // Estados para los FILTROS
  const [Ticket, setTicket] = useState("");
  const [DPIAsociado, setDPIAsociado] = useState("");

  // Estados para los RESULTADOS
  const [DataGeneralTicket, setDataGeneralTicket] = useState({
    Ticket: "",
    FechaYHoraCreacion: "",
    NombreAsociado: "",
    Detalles: "",
    Estado: "",
    TelefonoAsociado: "",
    NombreAsesor: "",
    NombreAgencia: "",
  });

  // Definir estructura de datos Clave:Valor para cada una de las 6 fases de la linea de tiempo
  const [lineaDeTiempo, setLineaDeTiempo] = useState([
    {
      IDLista: 1,
      NombreLista: "Identificación",
      FechaYHoraRegistro: "",
      MotivoRegistro: "",
      TieneRegistros: 0,
    },
    {
      IDLista: 2,
      NombreLista: "Evaluación de garantía",
      FechaYHoraRegistro: "",
      MotivoRegistro: "",
      TieneRegistros: 0,
    },
    {
      IDLista: 3,
      NombreLista: "Análisis de capacidad de pago",
      FechaYHoraRegistro: "",
      MotivoRegistro: "",
      TieneRegistros: 0,
    },
    {
      IDLista: 4,
      NombreLista: "Estructuración",
      FechaYHoraRegistro: "",
      MotivoRegistro: "",
      TieneRegistros: 0,
    },
    {
      IDLista: 5,
      NombreLista: "Aprobación",
      FechaYHoraRegistro: "",
      MotivoRegistro: "",
      TieneRegistros: 0,
    },
    {
      IDLista: 6,
      NombreLista: "Formalización y Desembolso",
      FechaYHoraRegistro: "",
      MotivoRegistro: "",
      TieneRegistros: 0,
    },
  ]);

  const EjecutarConsultaDeEstado = async () => {
    try {
      if (DPIAsociado || Ticket) {
        let responseAPI = await getEstadoTrackeoTicket(Ticket, DPIAsociado);

        setModalOpen(true);
        setModalType(responseAPI.type);
        setModalDescription(responseAPI.message);

        // Resetear data general de los tickets
        setDataGeneralTicket({
          Ticket: "",
          FechaYHoraCreacion: "",
          NombreAsociado: "",
          Detalles: "",
          Estado: "",
          TelefonoAsociado: "",
          NombreAsesor: "",
          NombreAgencia: "",
        });

        // Resetear linea de tiempo
        setLineaDeTiempo([
          {
            IDLista: 1,
            NombreLista: "Identificación",
            FechaYHoraRegistro: "",
            MotivoRegistro: "",
            TieneRegistros: 0,
          },
          {
            IDLista: 2,
            NombreLista: "Evaluación de garantía",
            FechaYHoraRegistro: "",
            MotivoRegistro: "",
            TieneRegistros: 0,
          },
          {
            IDLista: 3,
            NombreLista: "Análisis de capacidad de pago",
            FechaYHoraRegistro: "",
            MotivoRegistro: "",
            TieneRegistros: 0,
          },
          {
            IDLista: 4,
            NombreLista: "Estructuración",
            FechaYHoraRegistro: "",
            MotivoRegistro: "",
            TieneRegistros: 0,
          },
          {
            IDLista: 5,
            NombreLista: "Aprobación",
            FechaYHoraRegistro: "",
            MotivoRegistro: "",
            TieneRegistros: 0,
          },
          {
            IDLista: 6,
            NombreLista: "Formalización y Desembolso",
            FechaYHoraRegistro: "",
            MotivoRegistro: "",
            TieneRegistros: 0,
          },
        ]);

        //Verificar el el type sea succes
        if (responseAPI.type == "success") {
          setLineaDeTiempo(responseAPI.data.HistorialTracking);

          setDataGeneralTicket({
            Ticket: responseAPI.data.DataGeneralTiket[0].Ticket,
            FechaYHoraCreacion:
              responseAPI.data.DataGeneralTiket[0].FechaYHoraCreacion,
            NombreAsociado: responseAPI.data.DataGeneralTiket[0].NombreAsociado,
            Detalles: responseAPI.data.DataGeneralTiket[0].Detalles,
            Estado: responseAPI.data.DataGeneralTiket[0].Estado,
            TelefonoAsociado:
              responseAPI.data.DataGeneralTiket[0].TelefonoAsociado,
            NombreAsesor: responseAPI.data.DataGeneralTiket[0].Nombre,
            NombreAgencia: responseAPI.data.DataGeneralTiket[0].NombreAgencia,
          });
        }
      } else {
        setModalOpen(true);
        setModalType("danger");
        setModalDescription("Por favor llene todos los filtros");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <section className="   relative ">
        {/* Contenedor de HEADER */}
        <Encabezado TituloHeader={"Tracking de Ticket"} />
      
        {/* Contenedor de filtros de consulta Y BOTON DE PETICION */}
        <div className="relative text-center ">
          <h2 className="mt-1 font-semibold text-lg">Filtros:</h2>

          {/* FILTROS RESPONSIVOS */}
          <div className="mt-3 w-6/12 max-w-full px-5 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5  ">
            {/* Input para el Ticket del asociado */}
            <span className="flex flex-row content-center align-middle justify-center">
              <label className="mr-2 font-medium" htmlFor="">
                Ticket:
              </label>
              <input
                className="h-7 w-28 text-center bg-transparent border-b-2 border-stone-500"
                type="text"
                name="Ticket"
                id="Ticket"
                value={Ticket}
                onChange={(event) => setTicket(event.target.value)}
              />
            </span>

            {/* Input para el DPI del asociado */}
            <span className="flex flex-row content-center align-middle justify-center">
              <label className="mr-2 font-medium" htmlFor="">
                DPI de asociado:
              </label>
              <input
                className="h-7 w-52 text-center bg-transparent border-b-2 border-stone-500"
                type="text"
                name="Ticket"
                id="Ticket"
                value={DPIAsociado}
                onChange={(event) => setDPIAsociado(event.target.value)}
              />
            </span>
          </div>

          {/* Contenedor para botón responsivo */}
          <div className="w-4/5 mx-auto mt-6">
            {/* Botón para mandar los filtros al backend y obtener el rendereizado */}
            <button
              className="w-40 h-10 bg-green-500 text-white py-1 px-4 border rounded-lg hover:bg-green-700"
              type="button"
              onClick={EjecutarConsultaDeEstado}
            >
              Ejecutar filtro
            </button>
          </div>
        </div>
        {/* Grafico para el rastreo de estado del Ticket */}
        <div className="mt-7 relative w-10/12 md:w-11/12     h-auto  mx-auto  lg:w-11/12">
          {/* Contenedor para mostrar el nombre del asociado y su numero de telefono */}
          <div className="flex w-10/12 mx-auto flex-col md:flex-row md:justify-center items-center flex-wrap gap-3 md:gap-10 lg:gap-8 mb-5">
            {/* Ticket */}
            <div className="text-center flex flex-col md:flex-row md:justify-between md:items-center">
              <span className="font-semibold text-lg">Ticket:</span>
              <span className="ml-2">{DataGeneralTicket.Ticket}</span>
            </div>
            {/* Fecha de creacion */}
            <div className=" text-center flex flex-col md:flex-row md:justify-between md:items-center">
              <span className="font-semibold text-lg">Fecha de creación:</span>
              <span className="ml-2">
                {DataGeneralTicket.FechaYHoraCreacion}
              </span>
            </div>

            {/* Nombre del asociado */}
            <div className="text-center flex flex-col md:flex-row md:justify-between md:items-center">
              <span className="font-semibold text-lg">Nombre:</span>
              <span className="ml-2">{DataGeneralTicket.NombreAsociado}</span>
            </div>

            {/* Numero de telefono del asociado */}
            <div className="text-center flex flex-col md:flex-row md:justify-between md:items-center">
              <span className="font-semibold text-lg">Teléfono:</span>
              <span className="ml-2">{DataGeneralTicket.TelefonoAsociado}</span>
            </div>

            {/* Estado */}
            <div className=" text-center flex flex-col md:flex-row md:justify-between md:items-center">
              <span className="font-semibold text-lg">Estado:</span>
              <span className="ml-2">{DataGeneralTicket.Estado}</span>
            </div>
            {/* Asesor */}
            <div className=" text-center flex flex-col md:flex-row md:justify-between md:items-center">
              <span className="font-semibold text-lg">Asesor:</span>
              <span className="ml-2">{DataGeneralTicket.NombreAsesor}</span>
            </div>
            {/* Agencia */}
            <div className=" text-center flex flex-col md:flex-row md:justify-between md:items-center">
              <span className="font-semibold text-lg">Agencia:</span>
              <span className="ml-2">{DataGeneralTicket.NombreAgencia}</span>
            </div>
          </div>

          <div className="w-10/12 mx-auto flex flex-col md:flex-row md:justify-center items-center flex-wrap gap-3 md:gap-10 mb-5">
            {/* Detalles */}
            <div className="text-center flex flex-col  md:flex-row md:justify-center md:items-center">
              <span className="font-semibold text-lg">Detalles:</span>
              <span className="ml-2">{DataGeneralTicket.Detalles}</span>
            </div>
          </div>

          <h2 className="text-center font-semibold text-lg textoAzulLogoEdbyte mb-5">
            Avance de ticket:
          </h2>

          {/* Fechas, Linea de tiempo, Nombre de fase */}
          <section className="flex flex-row  justify-center md:flex-col   lg:ml-32">
            <div className="w-4/12 h-auto text-right grid grid-flow-row grid-rows-6 mr-4 md:w-full   md:grid-flow-col md:grid-cols-6 md:grid-rows-1  md:h-20 lg:h-20 lg:py-3 md:text-left lg:w-11/12  lg:mx-auto lg:grid-cols-6    ">
              <span className="md:h-20 lg:h-14 md:flex md:items-center  lg:w-10/12  ">
                {lineaDeTiempo[0].NombreLista}
              </span>

              {/* <div className="flex flex-col items-center md:flex-row md:h-12 lg:w-11/12">
              Identificación
            </div> */}

              <span className="md:h-20 lg:h-14 md:flex md:items-center  lg:w-9/12 ">
                {lineaDeTiempo[1].NombreLista}
              </span>

              <span className="md:h-20 lg:h-14 md:flex md:items-center  lg:w-9/12 ">
                {lineaDeTiempo[2].NombreLista}
              </span>

              <span className="md:h-20 lg:h-14 md:flex md:items-center  lg:w-9/12 ">
                {lineaDeTiempo[3].NombreLista}
              </span>

              <span className="md:h-20 lg:h-14 md:flex md:items-center  lg:w-9/12 ">
                {lineaDeTiempo[4].NombreLista}
              </span>

              <span className="md:h-20 lg:h-14 md:flex md:items-center  lg:w-9/12">
                {lineaDeTiempo[5].NombreLista}
              </span>
            </div>

            {/* ITEMS DE LINEA DE TIEMPO */}
            <div className="grid grid-flow-row grid-rows-6     md:grid-flow-col md:grid-cols-6   md:grid-rows-1 md:w-full md:mx-auto lg:pl-1   lg:w-11/12    ">
              <div className="flex flex-col items-center h-full md:flex-row md:h-12 ">
                <span
                  className={`border ${
                    lineaDeTiempo[0].TieneRegistros == 1
                      ? "FaseActiva"
                      : "FaseInactiva"
                  } h-12 w-14 rounded-full flex justify-center items-center`}
                >
                  <FaEye className="w-8 h-8  text-white" />
                </span>
                <span
                  className={`${
                    lineaDeTiempo[1].TieneRegistros == 1
                      ? "FaseActiva"
                      : "FaseInactiva"
                  }  w-1 h-12 md:w-16 md:h-1 lg:w-40 xl:w-36  2xl:w-56 `}
                ></span>
              </div>

              <div className="flex flex-col items-center h-full md:flex-row md:h-12 ">
                <span
                  className={`border ${
                    lineaDeTiempo[1].TieneRegistros == 1
                      ? "FaseActiva"
                      : "FaseInactiva"
                  } h-12 w-14 rounded-full flex justify-center items-center`}
                >
                  <FaSearchLocation className="w-8 h-8 text-white" />
                </span>
                <span
                  className={`${
                    lineaDeTiempo[2].TieneRegistros == 1
                      ? "FaseActiva"
                      : "FaseInactiva"
                  }  w-1 h-12 md:w-16 md:h-1 lg:w-40 xl:w-36  2xl:w-56 `}
                ></span>
              </div>

              <div className="flex flex-col items-center h-full md:flex-row md:h-12 ">
                <span
                  className={`border ${
                    lineaDeTiempo[2].TieneRegistros == 1
                      ? "FaseActiva"
                      : "FaseInactiva"
                  } h-12 w-14 rounded-full flex justify-center items-center`}
                >
                  <FaBalanceScaleRight className="w-8 h-8 text-white" />
                </span>
                <span
                  className={`${
                    lineaDeTiempo[3].TieneRegistros == 1
                      ? "FaseActiva"
                      : "FaseInactiva"
                  }  w-1 h-12 md:w-16 md:h-1 lg:w-40 xl:w-36  2xl:w-56 `}
                ></span>
              </div>

              <div className="flex flex-col items-center h-full md:flex-row md:h-12 ">
                <span
                  className={`border ${
                    lineaDeTiempo[3].TieneRegistros == 1
                      ? "FaseActiva"
                      : "FaseInactiva"
                  } h-12 w-14 rounded-full flex justify-center items-center`}
                >
                  <FaBook className="w-8 h-8 text-white" />
                </span>
                <span
                  className={`${
                    lineaDeTiempo[4].TieneRegistros == 1
                      ? "FaseActiva"
                      : "FaseInactiva"
                  }  w-1 h-12 md:w-16 md:h-1 lg:w-40 xl:w-36  2xl:w-56 `}
                ></span>
              </div>
              <div className="flex flex-col items-center h-full md:flex-row md:h-12 ">
                <span
                  className={`border ${
                    lineaDeTiempo[4].TieneRegistros == 1
                      ? "FaseActiva"
                      : "FaseInactiva"
                  } h-12 w-14 rounded-full flex justify-center items-center`}
                >
                  <FaRegCheckCircle className="w-8 h-8 text-white" />
                </span>
                <span
                  className={`${
                    lineaDeTiempo[5].TieneRegistros == 1
                      ? "FaseActiva"
                      : "FaseInactiva"
                  }  w-1 h-12 md:w-16 md:h-1 lg:w-40 xl:w-36  2xl:w-56 `}
                ></span>
              </div>
              <div className="flex flex-col items-center h-full md:flex-row md:h-12 ">
                <span
                  className={`border ${
                    lineaDeTiempo[5].TieneRegistros == 1
                      ? "FaseActiva"
                      : "FaseInactiva"
                  } h-12 w-12 rounded-full flex justify-center items-center`}
                >
                  <FaMoneyBillWave className="w-8 h-8 text-white" />
                </span>
              </div>
            </div>
            <div className="grid grid-flow-row grid-rows-6 grid-cols-1 ml-3  md:ml-0 md:grid-flow-col md:grid-cols-6 md:w-full md:grid-rows-1   lg:mx-auto lg:w-11/12 ">
              <span className="w-9/12 md:w-6/12 lg:w-6/12">
                {lineaDeTiempo[0].FechaYHoraRegistro}
              </span>
              <span className="w-9/12 md:w-11/12 lg:w-6/12">
                {lineaDeTiempo[1].FechaYHoraRegistro}
              </span>
              <span className="w-9/12 md:w-11/12 lg:w-6/12">
                {lineaDeTiempo[2].FechaYHoraRegistro}
              </span>
              <span className="w-9/12 md:w-11/12 lg:w-6/12">
                {lineaDeTiempo[3].FechaYHoraRegistro}
              </span>
              <span className="w-9/12 md:w-11/12 lg:w-6/12">
                {lineaDeTiempo[4].FechaYHoraRegistro}
              </span>
              <span className="w-9/12 md:w-11/12 lg:w-6/12">
                {lineaDeTiempo[5].FechaYHoraRegistro}
              </span>
            </div>
          </section>
        </div>
        {/* Contenedor de logo LogoEdbyte */}
        <div className=" flex flex-col relative mt-10 md:mt-14 w-6/12 mx-auto mb-6 justify-center items-center ">
          <img className="w-56" src={LogoEdbyte} alt="Logo de LogoEdbyte" />
        </div>
        {modalOpen ? (
          <AppModal
            isOpen={modalOpen}
            type={modalType}
            description={modalDescription}
            onRequestClose={closeModal}
          />
        ) : null}
    </section>
  );
}

export default EstadoTicket;
