import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  getAgenciasYAsesores
} from "../../apis/Reportes.js";


import LogoEdbyte from "../../assets/LogoEdbyte.png";
import { useState, useEffect } from "react";
import { getReporteGeneralTickets } from "../../apis/Reportes.js";
import AppModal from "../../components/modals/Modal.jsx";
import Encabezado from "../Header/Encabezado";
import { useNavigate } from "react-router-dom";

function ReporteGeneral() {
  const columns = [
    { field: "Ticket", headerName: "Ticket", width: 100 },
    { field: "NombreAsociado", headerName: "Asociado", width: 200 },
    { field: "Monto", headerName: "Monto de crédito", width: 200 },
    { field: "TelefonoAsociado", headerName: "Tel de asociado", width: 130 },
    { field: "DPIAsociado", headerName: "DPI de asociado", width: 150 },
    {
      field: "Detalles",
      headerName: "Detalles",
      minWidth: 500,
    },
    {
      field: "FechaYHoraCreacion",
      headerName: "Fecha de creación",
      width: 160,
    },
    { field: "NombreLista", headerName: "Fase actual", width: 300 },
    {
      field: "tiempo_transcurrido",
      headerName: "Tiempo transcurrido",
      width: 200,
    },
    { field: "Nombre", headerName: "Asesor", width: 250 },
    { field: "NombreAgencia", headerName: "Agencia", width: 150 },
    { field: "Estado", headerName: "Estado", width: 100 },
  ];

  const [rows, setRows] = useState([]);

  // Estados para llenar los desplegables y para obtener el ID seleccionado en cada uno
  const [IDAgencia, setIDAgencia] = useState(0);
  const [Agencias, setAgencias] = useState([]);
  const [IDColaborador, setIDColaborador] = useState(0);
  const [Colaboradores, setColaboradores] = useState([]);
  // Estados para guardar las fechas que se seleccionan en los inputs
  const [FechaInicio, setFechaInicio] = useState("");
  const [FechaFinal, setFechaFinal] = useState("");

  // Para modal de alerta
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalDescription, setModalDescription] = useState("");

  const EjecutarReporteGeneral = async () => {
    try {
      if ((IDAgencia && IDColaborador && FechaInicio, FechaFinal)) {
        let responseAPI = null;
        responseAPI = await getReporteGeneralTickets(
          IDAgencia,
          FechaInicio,
          FechaFinal,
          IDColaborador
        );

        setModalOpen(true);
        setModalType(responseAPI.type);
        setModalDescription(responseAPI.message);

        setRows([]);

        if (responseAPI.type === "success") {
          let DataRespuestaAPIParaFilas =
            responseAPI.data.RespuestaReporteGeneral;


            console.log(DataRespuestaAPIParaFilas);
          setRows(DataRespuestaAPIParaFilas);
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


  const ConsultarAgenciasYAsesores = async () => {
    try {
      const responseAPI = await getAgenciasYAsesores(IDAgencia);

      if (responseAPI.type === "success") {
        //Mandar datos a estados
        setAgencias(responseAPI.data.Agencias);
        setColaboradores(responseAPI.data.Colaboradores);
      } else {
        setModalOpen(true);
        setModalType(responseAPI.type);
        setModalDescription(responseAPI.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ConsultarAgenciasYAsesores();
  }, [IDAgencia]);

  //Procesos a realizar cuando se carga la pagina
  useEffect(() => {
    //Ejecutamos la funcion
    ConsultarAgenciasYAsesores();
  }, []);

  const closeModal = () => {
    setModalOpen(false);
  };
  const navigate = useNavigate();

  const handleRowDoubleClick = (params) => {
    let dataAMandar = params.row;

    // Navegamos a la ruta /reporteespecifico y pasamos los datos como estado
    navigate("/reporteespecifico", { state: dataAMandar.Ticket });
  };

  return (
    <section className="flex flex-col min-h-screen bg-slate-50 mb-6">
      {/* Contenedor de HEADER */}
      <Encabezado TituloHeader={"Reporte general de tickets"} />

      {/* Contenedor de filtros de consulta Y BOTON DE PETICION */}
      <div className="text-center">
        <h2 className="mt-1 font-semibold text-lg">Filtros:</h2>
        {/* FILTROS RESPONSIVOS */}
        <div className="mt-3 w-full max-w-full px-5 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5  ">
          {/* Desplegable de AGENCIA */}
          <span>
            <label className="mr-2 font-medium" htmlFor="">
              Agencia:
            </label>
            <select
              className="border border-zinc-600 rounded-md h-8 w-52 px-2 text-center"
              name="Agencia"
              id="Agencia"
              value={IDAgencia}
              onChange={(event) => setIDAgencia(event.target.value)}
            >
              {
                // Mapeamos el array de servicios obteniendo cada uno de los servicios y un index unico
                Agencias.map((itemAgencia) => {
                  const [key, value] = Object.entries(itemAgencia)[0];
                  return (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  );
                })
              }
            </select>
          </span>
          {/* Input de Fecha Desde */}
          <span>
            <label className="mr-2 font-medium" htmlFor="">
              Desde: <span className="text-red-500 text-xl">*</span>
            </label>
            <input
              className="h-8 bg-transparent border border-slate-500 rounded-md"
              type="date"
              value={FechaInicio}
              onChange={(event) => setFechaInicio(event.target.value)}
            />
          </span>
          {/* Input de Fecha Hasta */}
          <span>
            <label className="mr-2 font-medium" htmlFor="">
              Hasta: <span className="text-red-500 text-xl">*</span>
            </label>
            <input
              className="h-8 bg-transparent border border-slate-500 rounded-md"
              type="date"
              value={FechaFinal}
              onChange={(event) => setFechaFinal(event.target.value)}
            />
          </span>
          {/* Desplegable de Nombre de Asesor */}
          <span>
            <label className="mr-2 font-medium" htmlFor="">
              Asesor:
            </label>
            <select
              className="border border-zinc-600 rounded-md h-8 px-2 text-center w-44"
              name="Colaborador"
              id="Colaborador"
              value={IDColaborador}
              onChange={(event) => setIDColaborador(event.target.value)}
            >
              {
                // Mapeamos el array de servicios obteniendo cada uno de los servicios y un index unico
                Colaboradores.map((itemColaborador) => {
                  const [key, value] = Object.entries(itemColaborador)[0];
                  return (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  );
                })
              }
            </select>
          </span>
        </div>
        {/* Contenedor para botón responsivo */}
        <div className="w-4/5 mx-auto mt-3">
          {/* Botón para mandar los filtros al backend y obtener el rendereizado */}
          <button
            className="w-40 h-10 bg-green-500 text-white py-1 px-4 border rounded-lg hover:bg-green-700"
            type="button"
            onClick={EjecutarReporteGeneral}
          >
            Ejecutar filtro
          </button>
        </div>
      </div>

      {/* Mostrar aviso */}
      <p className="mx-auto mt-7 text-gray-400 text-center">
        De doble clic sobre una fila para ver la bitácora detallada del
        ticket...
      </p>

    

      {/* Contenedor para la tabla de reportes */}
      <div className="h-screen w-11/12 mx-auto my-3 bg-white">
        <DataGrid
          rows={rows}
          columns={columns}
          onRowDoubleClick={handleRowDoubleClick}
         
        />
      </div>

      
      {/* Contenedor de logo Edbyte */}
      <div className=" flex flex-col mt-5 justify-center items-center">
        <img className="w-56" src={LogoEdbyte} alt="Logo de Edbyte" />
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

export default ReporteGeneral;
