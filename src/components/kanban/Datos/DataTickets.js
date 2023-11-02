import { getTicketsPorColaborador } from "../../../apis/Kanban.js";

// Función asincrónica para obtener los tickets de un colaborador desde la API
const obtenerTicketsPorColaborador = async () => {
  try {
    const responseAPI = await getTicketsPorColaborador();
    return responseAPI;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Función para inicializar y exportar la variable de los tickets iniciales
export const inicializarTicketsIniciales = async () => {
  let TicketsDeColaborador = await obtenerTicketsPorColaborador();
  let TicketsIniciales = [];

  if (TicketsDeColaborador) {
    TicketsDeColaborador.forEach((ticket) => {
      TicketsIniciales.push(ticket);
    });
  }

  return TicketsIniciales;
};
