import { urlParaLaApi } from "../../config.js";
import axios from "./axios.js";

let encabezadoPeticion = new Headers();
encabezadoPeticion.append("Content-Type", "application/json");

// Obtiene toda la datoa necesari para generar los tickets
export async function getAgenciasYAsesores(IDAgencia) {
  try {
    const response = await axios.get("/getAgenciasYAsesores/" + IDAgencia);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

// Obtiene el reporte general de  los tickets
export async function getReporteGeneralTickets(
  IDAgencia,
  FDesde,
  FHasta,
  IDAsesor
) {
  try {
    const response = await axios.get(
      "/getReporteGeneralTickets/" +
        IDAgencia +
        "/" +
        FDesde +
        "/" +
        FHasta +
        "/" +
        IDAsesor
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

// Obtiene el reporte general de  los tickets
export async function getReporteGeneralTicketsEnExcel(
  IDAgencia,
  FDesde,
  FHasta,
  IDAsesor
) {
  try {
    const response = await axios.get(
      "/getReporteGeneralEnExcel/" +
        IDAgencia +
        "/" +
        FDesde +
        "/" +
        FHasta +
        "/" +
        IDAsesor
    );

    let URLDeExcelGenerado = response.request.responseURL;
    if (response.status == 200) {
      // Abrir la ventana de impresión con el PDF
      window.open(URLDeExcelGenerado);
      return {
        type: "success",
        message: "Excel de reporte de Tickets generado correctamente...",
      };
    } else {
      return {
        type: "dagner",
        message: "No se pudo generar su reporte en formato Excel...",
      };
    }
  } catch (error) {
    return error.response.data;
  }
}

// Obtiene el reporte especifico de un Ticket
export async function gerReporteEspecificoDeTicket(
  IDAgencia,
  Ticket,
  DPIAsociado
) {
  try {
    let TicketSinEspacios;
    let dpiAsociadoSinEspacios;

    // SI los campos no se llenaron, los llenamos con un espacio vacio
    if (Ticket == "") {
      Ticket = " ";
    }
    if (DPIAsociado == "") {
      DPIAsociado = " ";
    }

    // Eliminar espacios al inicio y al final de los valores de los parámetros
    if (!(Ticket == "" || DPIAsociado == " ")) {
      TicketSinEspacios = Ticket.trim();
    }

    // Eliminar espacios al inicio y al final de los valores de los parámetros
    if (!(DPIAsociado == "" || DPIAsociado == " ")) {
      dpiAsociadoSinEspacios = DPIAsociado.trim();
    }
    TicketSinEspacios = Ticket;
    dpiAsociadoSinEspacios = DPIAsociado;

    // Codificar los parámetros antes de agregarlos a la URL
    const TicketCodificado = encodeURIComponent(TicketSinEspacios);
    const dpiAsociadoCodificado = encodeURIComponent(dpiAsociadoSinEspacios);

    const response = await axios.get(
      "/getReporteTicketEspecifico/" +
        IDAgencia +
        "/" +
        TicketCodificado +
        "/" +
        dpiAsociadoCodificado
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

// Obtiene el reporte especifico de un Ticket
export async function gerReporteEspecificoDeTicketEnExcel(
  IDAgencia,
  NombreAsociado,
  DPIAsociado
) {
  try {
    let nombreAsociadoSinEspacios;
    let dpiAsociadoSinEspacios;

    // SI los campos no se llenaron, los llenamos con un espacio vacio
    if (NombreAsociado == "") {
      NombreAsociado = " ";
    }
    if (DPIAsociado == "") {
      DPIAsociado = " ";
    }

    // Eliminar espacios al inicio y al final de los valores de los parámetros
    if (!(NombreAsociado == "" || DPIAsociado == " ")) {
      nombreAsociadoSinEspacios = NombreAsociado.trim();
    }

    // Eliminar espacios al inicio y al final de los valores de los parámetros
    if (!(DPIAsociado == "" || DPIAsociado == " ")) {
      dpiAsociadoSinEspacios = DPIAsociado.trim();
    }
    nombreAsociadoSinEspacios = NombreAsociado;
    dpiAsociadoSinEspacios = DPIAsociado;

    // Codificar los parámetros antes de agregarlos a la URL
    const nombreAsociadoCodificado = encodeURIComponent(
      nombreAsociadoSinEspacios
    );
    const dpiAsociadoCodificado = encodeURIComponent(dpiAsociadoSinEspacios);

    const response = await axios.get(
      "/getReporteTicketEspecificoEnExcel/" +
        IDAgencia +
        "/" +
        nombreAsociadoCodificado +
        "/" +
        dpiAsociadoCodificado
    );

    let URLDeExcelGenerado = response.request.responseURL;
    if (response.status == 200) {
      // Abrir la ventana de impresión con el PDF
      window.open(URLDeExcelGenerado);

      return {
        type: "success",
        message: "Excel de reporte de Tickets generado correctamente...",
      };
    } else {
      return {
        type: "dagner",
        message: "No se pudo generar su reporte en formato Excel...",
      };
    }
  } catch (error) {
    return error.response.data;
  }
}

// Obtiene el reporte de tickets por ASESOR
export async function getReporteTickestPorAsesor(
  IDAgencia,
  FDesde,
  FHasta,
  IDAsesor
) {
  try {
    const response = await axios.get(
      "/getReportePorAsesorTickets/" +
        IDAgencia +
        "/" +
        FDesde +
        "/" +
        FHasta +
        "/" +
        IDAsesor
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

// Obtiene el reporte por asesores de  los tickets
export async function getReportePorAsesorTicketsEnExcel(
  IDAgencia,
  FDesde,
  FHasta,
  IDAsesor
) {
  try {
    const response = await axios.get(
      "/getReportePorAsesorTicketsEnExcel/" +
        IDAgencia +
        "/" +
        FDesde +
        "/" +
        FHasta +
        "/" +
        IDAsesor
    );

    let URLDeExcelGenerado = response.request.responseURL;
    if (response.status == 200) {
      // Abrir la ventana de impresión con el PDF
      window.open(URLDeExcelGenerado);

      return {
        type: "success",
        message: "Excel de reporte de Tickets generado correctamente...",
      };
    } else {
      return {
        type: "dagner",
        message: "No se pudo generar su reporte en formato Excel...",
      };
    }
  } catch (error) {
    return error.response.data;
  }
}

// Obtiene el reporte general de  los tickets
export async function getReporteParaGrafica(
  IDAgencia,
  FDesde,
  FHasta,
  IDAsesor
) {
  try {
    const response = await axios.get(
      "/getReporteParaGraficas/" +
        IDAgencia +
        "/" +
        FDesde +
        "/" +
        FHasta +
        "/" +
        IDAsesor
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

// Obtiene el listado de solicitudes de cancelacion
export async function getSolicitudesDeCancelacion(IDAgencia, IDAsesor) {
  try {
    const response = await axios.get(
      "/getSolicitudesDeCancelacion/" + IDAgencia + "/" + IDAsesor
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

// Peticin para aprobar la cancelacion de un TICKET
export async function getAprobarCancelacionTicket(IDTicket) {
  try {
    const response = await axios.get(
      "/getAprobarCancelacionTicket/" + IDTicket
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

// Peticin para RECHAZAR la cancelacion de un TICKET
export async function getRechazarCancelacionTicket(IDTicket) {
  try {
    const response = await axios.get(
      "/getRechazarCancelacionTicket/" + IDTicket
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
}




// Obtiene el Trackeo de un Ticket
export async function getEstadoTrackeoTicket(
  Ticket,
  DPI
) {
  try {
    let TicketSinEspacios;
    let dpiAsociadoSinEspacios;

    // SI los campos no se llenaron, los llenamos con un espacio vacio
    if (Ticket == "") {
      Ticket = " ";
    }
    if (DPI == "") {
      DPI = " ";
    }

    // Eliminar espacios al inicio y al final de los valores de los parámetros
    if (!(Ticket == "" || Ticket == " ")) {
      TicketSinEspacios = Ticket.trim();
    }

    // Eliminar espacios al inicio y al final de los valores de los parámetros
    if (!(DPI == "" || DPI == " ")) {
      dpiAsociadoSinEspacios = DPI.trim();
    }
    TicketSinEspacios = Ticket;
    dpiAsociadoSinEspacios = DPI;

    // Codificar los parámetros antes de agregarlos a la URL
    const TicketCodificado = encodeURIComponent(TicketSinEspacios);
    const dpiAsociadoCodificado = encodeURIComponent(dpiAsociadoSinEspacios);

    const response = await axios.get(
      "/getTrackeo/" +
        TicketCodificado +
        "/" +
        dpiAsociadoCodificado
    );
    return response.data;
  } catch (error) {
    // console.log(error);
    return error.response.data;
  }
}