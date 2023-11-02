import {
    urlParaLaApi
} from "../../config.js";
import axios from "./axios";

let encabezadoPeticion = new Headers();
encabezadoPeticion.append("Content-Type", "application/json");

// Obtiene toda la datoa necesari para generar los tickets
export async function getDatosParaGeneracionDeTickets() {
    try {
        const response = await axios("/getDataCreacionTicket");
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

// Funcion para generar TICKETS
export async function postGeneracionTicket(

    FechaVencimiento,
    Descripcion,
) {
    try {
        const response = await axios.post("/generarTicket", {
            FechaVencimiento,
            Descripcion,
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

// Funcion para obtener el PDF
export async function getTicketPDF(IDTicket) {
    try {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        const response = await fetch(
            urlParaLaApi + "/getPDFTicket/" + IDTicket,
            requestOptions
        );

        if (response.ok) {
            const blob = await response.blob();

            // Crear un objeto URL del blob
            const url = URL.createObjectURL(blob);

            // Abrir la ventana de impresión con el PDF
            window.open(url);

            return;
        } else {
            console.error("Error al obtener el PDF del servidor");
        }
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
}

// Obtener todos los datos necesarios para la creacion de cuentas de colaborador
export async function getDatosCreacionColaborador() {
    try {
        const response = await axios.get("/getDatosCreacionColaborador");
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getDataColaboradorPorUsuario(UsuarioColaborador) {
    try {
        const response = await axios.get(`/getCbyUser/${UsuarioColaborador}`);
        return response.data; // Retornar solo los datos de la respuesta en lugar del objeto de respuesta completo
    } catch (error) {
        return error.response.data;
    }
}

// Obtener todos los datos de un colabroadro usando su USUARIO
// export async function getDataColaboradorPorUsuario(UsuarioColaborador) {
//   try {
//     var requestOptions = {
//       method: "GET",
//     };
//     const response = await fetch(
//       urlParaLaApi + "/getCbyUser/" + UsuarioColaborador,
//       requestOptions
//     );
//     const data = await response.json();
//     return data
//   } catch (error) {
//     return "Error en la petición: " + error;
//   }
// }

// Funcion para registrar colaborador
export async function postRegistrarColaborador(formdata) {
    try {
        const response = await axios.post("/registro", formdata);
        return response.data;
    } catch (error) {
        return error.responsse.data;
    }
}

// Funcion para ACTUALIZAR datos de un colaboarador
export async function patchActualizarColaborador(DataJSON) {
    try {
        const response = await axios.patch("/modificarColaborador", DataJSON);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}