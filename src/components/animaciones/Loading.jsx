import React from "react";
import { CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <CircularProgress size={80} color="primary" />
      <p className="text-gray-500 mt-4 text-lg font-medium">Cargando...</p>
    </div>
  );
};

export default Loading;
