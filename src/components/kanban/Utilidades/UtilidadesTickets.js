export const getTicketsPorTablero = (Tickets, KeyTableroParametro) => {

  return Tickets.filter((TicketRecorriendo) => TicketRecorriendo.KeyTablero === KeyTableroParametro);
};

export const getTicketPorID = (Tickets, id) => {
  return Tickets.find((TicketRecorriendo) => TicketRecorriendo.id === id);
};
