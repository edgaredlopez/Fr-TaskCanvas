import { inicializarClaveValorTableros } from "../Datos/DataTableros.js";
import { getTicketsPorTablero } from "./UtilidadesTickets.js";

// Funcion para inicializar los datos en el tablero
export const InicializarTablero = async (TicketsParametroIncializacion) => {
  const SeccionDeTablerosInicializados = {};
  let ClaveValorTableros = {};

  try {
    ClaveValorTableros = await inicializarClaveValorTableros();
  } catch (error) {
    console.log(error);
  }


  // Recorremos los Tableros y obtenemos el ID de cada uno de los tableros que se recorren
  Object.keys(ClaveValorTableros).forEach((KeyTablero) => {

    let KeyTableroInteger = parseInt(KeyTablero);
    // En la constante creamos un JSON que contendra array de cada uno de los tableros y 
    // a essos tableros les insertamos los Tickets que tienen el key del tablero que se esta iterando
    SeccionDeTablerosInicializados[KeyTableroInteger] = getTicketsPorTablero(
      TicketsParametroIncializacion,
      KeyTableroInteger
    );
  });

  // Retornamos La seccion de tableros con los tickets ya asignados de forma corresponeindte
  return SeccionDeTablerosInicializados;
};

// La siguiente función, llamada 'ObtenerContenedorQueContieneUnIDTicket', recibe dos argumentos:
// SeccionDeTableros - un objeto que contiene información sobre tableros organizados en secciones
// id - el ID de un TICKET que se desea encontrar dentro de los TABLEROS
export const ObtenerTableroQueContieneUnIDTicket = (
  SeccionDeTableros,
  id
) => {
  // Verificamos si el ID se encuentra directamente en el objeto SeccionDeTableros
  if (id in SeccionDeTableros) {
    // Si el ID se encuentra, lo devolvemos
    return id;
  }

  // Si el ID no está en el objeto SeccionDeTableros, buscamos en las secciones
  // Iteramos sobre las claves (keys) del objeto SeccionDeTableros
  const Tablero = Object.keys(SeccionDeTableros).find((KeyTablero) =>
    // Para cada clave, buscamos si hay algún elemento dentro del array asociado
    SeccionDeTableros[KeyTablero].find(
      (TicketDentroDelTablero) => TicketDentroDelTablero.id === id
    )
  );

  // Devolvemos el contenedor (la clave) donde se encontró el tablero
  return Tablero;
};
