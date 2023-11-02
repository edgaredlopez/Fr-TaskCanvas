import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@mui/material";

const TicketIndividual = ({ Ticket }) => {
  let ColorEstado = "bg-green-500";

  const FechaYHoraCreacion = new Date(Ticket.FechaYHora).getTime();
  const FechaCulminacion = new Date(Ticket.FechaCulminacion).getTime();

  return (
    <div className="bg-white rounded-2xl  text-center mb-4">
      <CardContent>
        <span
          className={`w-4 h-4 rounded-full absolute right-5 ${ColorEstado}`}
        ></span>
        <span className="font-medium text-center">
          Identificador: {Ticket.NoTicket}
        </span>
        <div className="text-left mt-2">
          <div className="textoVerdeLogoEdbyte font-medium">
            Fecha de creación:
            <label className="text-slate-600 font-normal ml-2">
              {Ticket.FechaYHora}
            </label>
          </div>
          <div className="textoVerdeLogoEdbyte font-medium">
            Fecha de vencimiento:
            <label className="text-slate-600 font-normal ml-2">
              {Ticket.FechaCulminacion}
            </label>
          </div>
          <div className="textoVerdeLogoEdbyte font-medium">
            Descripcion:
            <p className="text-justify text-slate-600 font-normal ">
              {Ticket.Detalles}
            </p>
          </div>
        </div>
      </CardContent>
    </div>
  );
};

export default TicketIndividual;
