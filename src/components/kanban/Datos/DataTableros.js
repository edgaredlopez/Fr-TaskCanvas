import { getListaDeTableros } from "../../../apis/Kanban.js";

// Función asincrónica para obtener la lista de tableros desde la API
const obtenerListaDeTableros = async () => {
  try {
    const responseAPI = await getListaDeTableros();
    return responseAPI; // Analizar la respuesta como JSON
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Función para inicializar y exportar la variable de la lista de tableros
export const inicializarClaveValorTableros = async () => {
  let ListaDeTableros = await obtenerListaDeTableros();
  let ClaveValorTableros = {};

  if (ListaDeTableros) {
    // Iteramos la lista de tableros y pasamos uno por uno hacia la variable ClaveValorTableros como un clave-valor
    ListaDeTableros.forEach((Tablero) => {
      ClaveValorTableros[parseInt(Tablero.KeyTablero)] = Tablero.NombreLista;
    });
  }

  return ClaveValorTableros;
};
