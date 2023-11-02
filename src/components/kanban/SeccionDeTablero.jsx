import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TicketIndividual from "./TicketIndividual";
import SortableTaskItem from "./SortableTaskItem";

const SeccionDeTablero = ({ id, TituloTablero, tasks }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className="w-72 sm:w-80 h-auto mx-5 bg-slate-200 rounded-2xl p-4">
      <h3 className="text-center text-lg font-bold textoAzulEdbyte mb-2">
        {TituloTablero}
      </h3>
      <SortableContext id={id} items={tasks} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} className="flex flex-col flex-grow overflow-y-auto">
          {tasks.map((TicketIterando) => (
            <SortableTaskItem id={TicketIterando.id} key={TicketIterando.id}>
              <TicketIndividual Ticket={TicketIterando} />
            </SortableTaskItem>
          ))}
        </div>
      </SortableContext>
    </div>
  );











};

export default SeccionDeTablero;
