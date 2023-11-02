import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LogoEdbyte from "../../assets/LogoEdbyte.png";
import { postLogin } from "../../apis/Auth.js";
import AppModal from "../modals/Modal.jsx";
import { useAuth } from "../../context/AuthContext";
import { getLogout } from "../../apis/Auth";

const Login = () => {
  // Referencia para el focus en el formulario
  const inputRef = useRef(null);

  const [valores, setValores] = useState({
    Usuario: "",
    Password: "",
  });

  // Autenticacion y seguridad
  // Obtenemos las variables del contexto que validan la autenticacion
  const { loginContextProvider, isAuthenticated, setisAuthenticated } =
    useAuth();

  // Funcion que se encargara de pedir el cierre de sesion desde el backend y pasar la bandera en false en el frontendd
  const handleLogout = async () => {
    const respuestaDeLogout = await getLogout();

    if (respuestaDeLogout == "OK") {
      setisAuthenticated(false);
      // navigate("/login");
    }
  };

  // Para evaluar el inicio de sesion cuando se cargue el loguine, si la bandera esta en true pues pedimos el loguout
  // de lo congrario no pedimos nada. SOLO CUANDO SE CARGA EL LOGIN
  useEffect(() => {
    inputRef.current.focus();

    if (isAuthenticated) {
      handleLogout();
    }
  }, []);

  // Para modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalDescription, setModalDescription] = useState("");

  // Para hacer navegar a los usuarios entre los diferentes modulos
  const navigate = useNavigate();

  // Que recibe los cambios de valores en los inputs de los formularios
  const ManejadorDeCambio = (event) => {
    // Obtenemos el valor a cambiar
    const { name, value } = event.target;

    setValores({
      ...valores,
      [name]: value.replace(" ", ""),
    });
  };

  // Funcion para enviar data en el API
  const EnvioDeData = async (e) => {
    e.preventDefault();

    // const responseAPI = await postLogin(valores);
    const responseAPI = await loginContextProvider(valores);
    // Mostrar modal
    setModalOpen(true);
    setModalType(responseAPI.type);
    setModalDescription(responseAPI.message);

    if (responseAPI.type === "success") {
      localStorage.setItem("NombreCompleto", responseAPI.data.NombreCompleto);
      localStorage.setItem("Puesto", responseAPI.data.Puesto);
      localStorage.setItem("IDArea", responseAPI.data.IDArea);
      localStorage.setItem("IDRol", responseAPI.data.IDRol);
      localStorage.setItem("IDAgencia", responseAPI.data.IDAgencia);
      localStorage.setItem("IDColaborador", responseAPI.data.IDColaborador);

      navigate("/menu");
    }
  };

  // Funcion que se manda como parms del modal para que lo llame y cerremos el modal con su estado como bandera
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-center fondoEdbyte py-12 px-5 sm:px-6 lg:px-8 h-screen">
        <div className="max-w-sm w-96 space-y-6 px-8 py-9  bg-white rounded-3xl shadow-xl shadow-gray-500">
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col  justify-center items-center">
              <img className="w-36 mb-2" src={LogoEdbyte} alt="" />
            </div>
            <h2 className=" text-center text-2xl font-extrabold textoVerdeEdbyte ">
              Inicio de sesión
            </h2>
          </div>
          <form className=" space-y-6  " onSubmit={EnvioDeData}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="Usuario"
                  className="block text-base font-medium text-gray-700"
                  ref={inputRef}
                >
                  Usuario:
                </label>
                <input
                  name="Usuario"
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-base text-left"
                  placeholder="Ingrese su usuario"
                  value={valores.Usuario}
                  onChange={ManejadorDeCambio}
                />
              </div>
              <div>
                <label
                  htmlFor="Usuario"
                  className="block text-base font-medium text-gray-700"
                >
                  Contraseña:
                </label>
                <input
                  name="Password"
                  type="password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-base text-left"
                  placeholder="Ingrese su contraseña"
                  value={valores.Password}
                  onChange={ManejadorDeCambio}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full  flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white fondoEdbyteVerde hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Ingresar
              </button>
            </div>
          </form>
        </div>
      </div>

      {modalOpen ? (
        <AppModal
          isOpen={modalOpen}
          type={modalType}
          description={modalDescription}
          onRequestClose={closeModal}
        />
      ) : null}
    </>
  );
};

export default Login;
