// Importamos librerias de REACT
import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DndContext,
  closestCorners,
  DragOverlay,
  defaultDropAnimation,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
// Importamos archivos o utilidades personales
import SeccionDeTablero from "./SeccionDeTablero.jsx";
import TicketIndividual from "./TicketIndividual.jsx";
import { getTicketPorID } from "./Utilidades/UtilidadesTickets.js";
import {
  ObtenerTableroQueContieneUnIDTicket,
  InicializarTablero,
} from "./Utilidades/UtilidadesTablero.js";
import { inicializarTicketsIniciales } from "./Datos/DataTickets.js";

import { inicializarClaveValorTableros } from "./Datos/DataTableros.js";

// Para manejar los tickets con la API
import { patchMoverTicketALaDerecha } from "../../apis/Kanban.js";
import AppModal from "../modals/Modal.jsx";
import ModificarTicketModal from "../modals/ModificarTicket.jsx";
import Encabezado from "../Header/Encabezado";
import ModalNotification from "../modals/ModalNotification.jsx";

// Variables para almacenar Tablero inicial y Tablero Final
let TableroInicialAPI = null;
let TableroFinalAPI = null;
let IDTicketActivoAPI = null;

// Creacion y configuracion de componente
const ListaDeSeccionDeTableros = () => {
  // Estados para mostrar, type y descipcion de AVISO POPUP
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalDescription, setModalDescription] = useState("");

  // Estados para mostrar, type y descipcion de AVISO POPUP
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationDescription, setNotificationDescription] = useState("");

  // Estados para la MODIFICACION DATOS  DE TICKET
  const [modTicketOpen, setmodTicketOpen] = useState(false);
  const [ModTicketdataJSON, setModTicketdataJSON] = useState({});
  const [CoordenadasTicketModificado, setCoordenadasTicketModificado] =
    useState({});

  // Obtencion de tableros iniciales, creacion de estado para tableros y declaracion de estado para el ID de tablero activo
  const [TablerosInicializadosConData, setTablerosInicializadosConData] =
    useState([]);
  const [ClaveValorTableros, setClaveValorTableros] = useState({});

  // Crea un useEffect para cargar los datos una vez al montar el componente

  const [IDTicketActivo, setIDTicketActivo] = useState(null);

  const [tablerosData, setTablerosData] = useState([]);

  const [TicketsIniciales, setTicketsIniciales] = useState([]);

  // Función asincrónica para cargar los datos de los tableros
  const cargarTableros = async () => {
    const TickInicial = await inicializarTicketsIniciales();
    const tablerosData = await InicializarTablero(TickInicial);
    setTicketsIniciales(TickInicial);
    setTablerosInicializadosConData(tablerosData);
  };

  const obtenerDatos = async () => {
    try {
      const ClaveValorTableros = await inicializarClaveValorTableros();
      setClaveValorTableros(ClaveValorTableros);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cargarTableros();

    obtenerDatos();

    // Mostrar aviso solo la fecha 22/09/2023 o sea el dia de hoy
    const fechaActual = new Date();
    const fechaActualDia = fechaActual.getDate();
    const fechaActualMes = fechaActual.getMonth() + 1;
    const fechaActualAnio = fechaActual.getFullYear();

    if (
      fechaActualDia == 22 &&
      fechaActualMes == 9 &&
      fechaActualAnio == 2023
    ) {
      setNotificationOpen(true);
      setNotificationDescription(
        'Recuerde completar los campos de "Monto de crédito" y "Detalles", esta información es crucial para mantener la transparencia en las operaciones...'
      );
    }
  }, []);

  // Sensores de Puntero y teclado para los movimientos
  const SensoresPunteroTeclado = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Para gestionar elinicio de movimiento en contenedores y obtener el ID del contenedor donde se INICIO el movimiento
  const ManejarInicioDeMovimientoTablero = ({ active }) => {
    setIDTicketActivo(active.id);
    TableroInicialAPI = parseInt(active.data.current.sortable.containerId);
    IDTicketActivoAPI = active.id;
  };

  // Para gestionar elinicio de movimiento en contenedores y obtener el ID del contenedor donde se INICIO el movimiento
  const ManejarOverMovimientoTablero = ({ active, over }) => {
    // Encontrar o buscar los tableros mandando la lista de tableros que tenemos disponibles y el ID del tablero que queremos buscar
    // Obtenemos todo el dato sobre el tablero  en el cual existe el Ticket Activo o arrastrado
    const TableroActivoEncontrado = parseInt(
      ObtenerTableroQueContieneUnIDTicket(
        TablerosInicializadosConData,
        active.id
      )
    );

    // Obtenemos todo el dato sobre el tablero en el  cual existe el Ticket sombreado o sobre el cual se esta poniendo encima otro ticket
    const TableroOverEncontrado = parseInt(
      ObtenerTableroQueContieneUnIDTicket(
        TablerosInicializadosConData,
        over?.id
      )
    );

    // Si el Tablero Activo y el Tablero Over no tienen contenido o sea que NO se encontraron y
    // El tablero activo y el tablero Hover son lo mismo, o sea que si se mover un ticket dentro del mismo tablero, cancelar la ejecucion de la funcion con RETURN

    if (
      !TableroActivoEncontrado ||
      !TableroOverEncontrado ||
      TableroActivoEncontrado === TableroOverEncontrado ||
      TableroActivoEncontrado > TableroOverEncontrado
    ) {
      return;
    }

    // Actualizar los Tableros inicializados ya con DATA
    setTablerosInicializadosConData((TablerosDataAntesDeCambios) => {
      // Obtener todos los Tickets que cotiene cada tablero antes de los cambios ocasionados por el movimiento
      const TicketsEnElTableroActivoAntesDeCambio =
        TablerosDataAntesDeCambios[TableroActivoEncontrado];
      const TicketsEnElTableroSombreadoAntesDeCambio =
        TablerosDataAntesDeCambios[TableroOverEncontrado];

      // Encontrar el index de los Tickets dentro del array de tableros, tanto del ticket activo (Arrastrado) y over (Sombreado)
      const IndexDelTicketActivoArrastrado =
        TicketsEnElTableroActivoAntesDeCambio.findIndex(
          (TicketIterando) => TicketIterando.id === active.id
        );

      const IndexDelTicketOverSombreado =
        TicketsEnElTableroSombreadoAntesDeCambio.findIndex(
          (TicketIterando) => TicketIterando.id !== over?.id
        );

      // Retornamos el nuevo valor de inicializacion de los tableros

      // ...TablerosDataAntesDeCambios: Se utiliza el operador de propagación (...) para copiar
      // todas las propiedades y valores del objeto TablerosDataAntesDeCambios en el nuevo objeto
      // que se está creando.

      // [TableroActivoEncontrado]: [...]: Se crea una nueva propiedad en el objeto con el nombre
      // almacenado en la variable TableroActivoEncontrado. El valor de esta propiedad es un array
      // creado a partir de los elementos del array original
      // TablerosDataAntesDeCambios[TableroActivoEncontrado], pero excluyendo aquellos elementos que
      // cumplen la condición (item) => item.id !== active.id.

      // [TableroOverEncontrado]: [...]: Similar al paso anterior, se crea una nueva propiedad en el objeto
      // con el nombre almacenado en la variable TableroOverEncontrado. El valor de esta propiedad es un nuevo
      // array construido a partir de tres partes:
      //   Los elementos desde el inicio hasta IndexDelTicketOverSombreado del array TablerosDataAntesDeCambios[TableroOverEncontrado].
      //   El elemento TablerosInicializadosConData[TableroActivoEncontrado][IndexDelTicketActivoArrastrado].
      //   Los elementos restantes desde IndexDelTicketOverSombreado hasta el final del array TablerosDataAntesDeCambios[TableroOverEncontrado].

      return {
        ...TablerosDataAntesDeCambios,
        [TableroActivoEncontrado]: [
          ...TablerosDataAntesDeCambios[TableroActivoEncontrado].filter(
            (TicketDelTablero) => TicketDelTablero.id !== active.id
          ),
        ],

        [TableroOverEncontrado]: [
          ...TablerosDataAntesDeCambios[TableroOverEncontrado].slice(
            0,
            IndexDelTicketOverSombreado
          ),
          TablerosInicializadosConData[TableroActivoEncontrado][
            IndexDelTicketActivoArrastrado
          ],
          ...TablerosDataAntesDeCambios[TableroOverEncontrado].slice(
            IndexDelTicketOverSombreado,
            TablerosDataAntesDeCambios[TableroOverEncontrado].length
          ),
        ],
      };
    });
  };

  // Movimiento de un ticket dentro del mismo tablero
  const ManejarFinDeMovimiento = ({ active, over }) => {
    // Encontrar los tableros activos o sea de donde salio el ticket arrastrado y el ctablero en que esta sombreando el ticket
    const TableroActivoEncontrado = parseInt(
      ObtenerTableroQueContieneUnIDTicket(
        TablerosInicializadosConData,
        active.id
      )
    );
    const TableroOverEncontrado = parseInt(
      ObtenerTableroQueContieneUnIDTicket(
        TablerosInicializadosConData,
        over?.id
      )
    );

    // Si el contenido de la variable Tablero activo y Tablero Over es vacia y ademas el tablero activo NO SEA IGUAL que el tablero encontrado.
    //Se cancela la ejecucuion de la funcion.
    if (
      !TableroActivoEncontrado ||
      !TableroOverEncontrado ||
      TableroActivoEncontrado !== TableroOverEncontrado ||
      TableroFinalAPI > TableroInicialAPI
    ) {
      return;
    }

    TableroFinalAPI = TableroOverEncontrado;

    // Invocamos la funcion hace llamado a la funcion de api para mover el ticket
    const PatchMovemosElTicketEnBaseDeDatos = async (
      IDTicketActivoAPI,
      TableroInicialAPI,
      TableroFinalAPI
    ) => {
      try {
        // Validamos que el Tablero inicial NO sea el mismo que el tablero final
        if (TableroInicialAPI !== TableroFinalAPI) {
          const responseAPI = await patchMoverTicketALaDerecha(
            IDTicketActivoAPI,
            TableroInicialAPI,
            TableroFinalAPI
          );

          setModalOpen(true);
          setModalType(responseAPI.type);
          setModalDescription(responseAPI.message);

          cargarTableros();

          obtenerDatos();

          if (responseAPI.type == "success") {
            TableroInicialAPI = null;
            TableroFinalAPI = null;
            IDTicketActivoAPI = null;

            // Obtener el Index del ticket que se esta arrastrando
            const IndexTicketActivo = TablerosInicializadosConData[
              TableroActivoEncontrado
            ].findIndex((TicketIterando) => TicketIterando.id === active.id);

            // Obtener el index del ticket que se esta sombreando o sea que va a ser movida de posicion por el nuevo ticketr
            const IndexTicketSombreado = TablerosInicializadosConData[
              TableroOverEncontrado
            ].findIndex((TicketIterando) => TicketIterando.id === over?.id);

            // Evaluamos que el Index del Ticket activo y el Ticket sombreado NOOOOO sean los mismos
            if (IndexTicketActivo !== IndexTicketSombreado) {
              // Modificamos la dada en el estado de tableros incializados con data
              setTablerosInicializadosConData((TablerosDataAntesDeCambios) => ({
                ...TablerosDataAntesDeCambios,
                [TableroOverEncontrado]: arrayMove(
                  TablerosDataAntesDeCambios[TableroOverEncontrado],
                  IndexTicketActivo,
                  IndexTicketSombreado
                ),
              }));
            }
          } else {
            setModalOpen(true);
            setModalType(responseAPI.type);
            setModalDescription(responseAPI.message);

            return;
          }
        }
        // Si es el Tablero inicial es el MISMO que el tablero Final es porque solo se dio click al ticket
        else {
          setCoordenadasTicketModificado({
            IDTablero: TableroInicialAPI,
            IDTicket: IDTicketActivoAPI,
          });

          setmodTicketOpen(true);
          setModTicketdataJSON(
            getTicketPorID(TicketsIniciales, IDTicketActivoAPI)
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    PatchMovemosElTicketEnBaseDeDatos(
      IDTicketActivoAPI,
      TableroInicialAPI,
      TableroFinalAPI
    );

    setIDTicketActivo(null);
    TableroInicialAPI = null;
    TableroFinalAPI = null;
    IDTicketActivoAPI = null;
  };

  // Animación de caída predeterminada
  const dropAnimation = {
    ...defaultDropAnimation,
  };

  const DataTicketAactivo = IDTicketActivo
    ? getTicketPorID(TicketsIniciales, IDTicketActivo)
    : null;

  // Funcion de cierre por fondo y por botones de MODAL AVISOS
  const closeModal = () => {
    setModalOpen(false);
  };

  // Funcion de cierre de aviso
  const closeNotification = () => {
    setNotificationOpen(false);
  };

  // Funcion de cierre por fondo y por botones de MODIFICACION DE TICKET
  const closeModTicket = () => {
    setmodTicketOpen(false);
  };

  return (
    <div className="w-screen h-screen  flex flex-col">
      <Encabezado TituloHeader={"Flujo de créditos"} />

      <p className="text-center h-auto text-slate-500">
        Para tener el estado de las tareas actualizadas, recarge la pagina...
      </p>
      <main className=" h-full pb-5 pt-2 grid grid-flow-col overflow-auto">
        {/* Contenemdor para los contextos de drag and drop */}
        <DndContext
          sensors={SensoresPunteroTeclado}
          collisionDetection={closestCorners}
          onDragStart={ManejarInicioDeMovimientoTablero}
          onDragOver={ManejarOverMovimientoTablero}
          onDragEnd={ManejarFinDeMovimiento}
        >
          {Object.keys(TablerosInicializadosConData).map(
            (KeyDelTableroIterando) => (
              <SeccionDeTablero
                id={KeyDelTableroIterando}
                key={KeyDelTableroIterando}
                TituloTablero={ClaveValorTableros[KeyDelTableroIterando]}
                tasks={TablerosInicializadosConData[KeyDelTableroIterando]}
              />
            )
          )}

          <DragOverlay dropAnimation={dropAnimation}>
            {DataTicketAactivo ? (
              <TicketIndividual Ticket={DataTicketAactivo} />
            ) : null}
          </DragOverlay>
        </DndContext>
        {modalOpen ? (
          <AppModal
            isOpen={modalOpen}
            type={modalType}
            description={modalDescription}
            onRequestClose={closeModal}
          />
        ) : null}
        {modTicketOpen ? (
          <ModificarTicketModal
            modTicketOpen={modTicketOpen}
            onRequestCloseModTicket={closeModTicket}
            dataJSON={ModTicketdataJSON}
            CoordenadasTicketModificado={CoordenadasTicketModificado}
            TablerosInicializadosConData={TablerosInicializadosConData}
            setTablerosInicializadosConData={setTablerosInicializadosConData}
          />
        ) : null}

        {/* Para mostrar avisos */}
        {notificationOpen ? (
          <ModalNotification
            isOpen={notificationOpen}
            description={notificationDescription}
            onRequestClose={closeNotification}
          />
        ) : null}
      </main>
    </div>
  );
};

export default ListaDeSeccionDeTableros;
