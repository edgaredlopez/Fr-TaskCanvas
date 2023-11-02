import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Cookies from "js-cookie";

function ProtectedRoute() {
  const { User, isAuthenticated, loading, revisarLogin } = useAuth();




  // De la funcion que nos retorna los datos del contexto, traemos la data del usuario y la bandera de autenticacion

  if (loading)
    return <h1> Estamos verificando su acceso y cargando la aplicación...</h1>;
  if ((!loading && !isAuthenticated))
    return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default ProtectedRoute;
