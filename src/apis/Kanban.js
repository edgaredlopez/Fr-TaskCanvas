import {
    urlParaLaApi
} from "../../config.js";
import axios from "./axios.js";

let encabezadoPeticion = new Headers();
encabezadoPeticion.append("Content-Type", "application/json");

export async function getListaDeTableros() {
    try {
        const response = await axios.get("/getListasTableros");
        return response.data.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getTicketsPorColaborador() {
    try {
        const response = await axios.get("/getTicketsAsignados");
        if (response.data.type == "success") {
            return response.data.data;
        } else {
            return [];
        }
    } catch (error) {
        return error.response.data;
    }
}

export async function patchMoverTicketALaDerecha(
    IDTicket,
    IDTableroActual,
    IDTableroNuevo
) {
    try {
        let ResposeAPI = await axios.patch("/patchMoverTicket", {
            IDTicket,
            IDTableroActual,
            IDTableroNuevo,
        });
        return ResposeAPI.data;
    } catch (error) {
        return error.ResposeAPI.data;
    }
}

// Obtiene todos los colaboradores de una agencia
export async function getColaboradoresAgencia() {
    try {
        const response = await axios.get("/getColaboradoresAgencia");
        return response.data.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function patchActualizarDataTicket(
    id,
    FechaVencimiento,
    Descripcion
) {
    try {
        let ResposeAPI = await axios.patch("/patchActualizarTicket", {
            id,
            Nombre,
            Telefono,
            Monto,
            DPI,
            Detalles,
        });

        return ResposeAPI.data;
    } catch (error) {
        console.log("error", error);
    }
}

export async function patchCancelarTicket(id, Justificacion) {
    try {
        let ResposeAPI = await axios.patch("/patchCancelarTicket", {
            id,
        });

        return ResposeAPI.data;
    } catch (error) {
        return error.ResposeAPI.data;
    }
}

export async function patchTransferirTicket(id, IDColaboradorDestino) {
    try {
        let ResposeAPI = await axios.patch("/patchTrasladarTicket", {
            id,
            IDColaboradorDestino,
        });

        return ResposeAPI.data;
    } catch (error) {
        return error.ResposeAPI.data;
    }
}