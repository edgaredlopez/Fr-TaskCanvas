import Menu from "./components/Menu/Menu.jsx";
import Perfil from "./components/Perfil/Perfil.jsx";
import CRUDColab from "./components/Autenticacion/CRUDColab";
import Login from "./components/Autenticacion/Login";
import CrearTicket from "./components/Tareas/CrearTareas.jsx";
import ListaDeSeccionDeTableros from "./components/kanban/ListaDeSeccionDeTableros";
import ReporteGeneral from "./components/reportes/ReporteGeneral.jsx";
import EstadoTicket from "./components/reportes/EstadoTicket.jsx"
//Para las rutas
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
function App() {
  return (
    <AuthProvider>
      <>
        <Routes>
          {/* Libre */}
          <Route path="/login" element={<Login />} />

          {/* Protegido */}
          <Route element={<ProtectedRoute />}>
            <Route path="/menu" element={<Menu />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/colab" element={<CRUDColab />} />
            <Route path="/creartarea" element={<CrearTicket />} />
            <Route path="/kanban" element={<ListaDeSeccionDeTableros />} />
            <Route path="/reportegeneral" element={<ReporteGeneral />} />
            <Route path="/estadotarea" element={<EstadoTicket />} />
          </Route>
          <Route path="*" element={<Login />} />
        </Routes>
      </>
    </AuthProvider>
  );
}

export default App;
