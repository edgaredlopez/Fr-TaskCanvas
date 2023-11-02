import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiLogOut, FiUser } from "react-icons/fi";
import { getLogout } from "../../apis/Auth.js";
import { useAuth } from "../../context/AuthContext.jsx";
import FollowMeHeader from "../../assets/LogoEdbyte.png";
import { Link } from "react-router-dom";


function Encabezado({ TituloHeader }) {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);
  const { setisAuthenticated } = useAuth();

  const handleLogout = async () => {
    const respuestaDeLogout = await getLogout();
    console.log(respuestaDeLogout);
    if (respuestaDeLogout == "OK") {
      setisAuthenticated(false);
      navigate("/login");
    }
  };
  const handlePerfil = async () => {
    navigate("/perfil");
  };

  const handleMenu = async () => {
    navigate("/menu");
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  //Detectar en que directorio esta el usuario
  const path = window.location.pathname;
  const pathSplit = path.split("/");
  const pathDir = pathSplit[1];

  return (
    <header className="fondoEdbyte  max-w-full w-screen ">
      <Link to="/menu" type="Link" className="z-50  left-3 h-14 absolute w-16 flex flex-col cursor-pointer justify-center items-center">
        <img className="w-7/12 " src={FollowMeHeader} alt="FollowMe" />
      </Link>
      <nav className="flex items-center justify-center p-7 md:p-7 relative ">
        {/* Titulo de la pagina */}
        <div className="w-full md:w-auto absolute">
          <h1 className="text-white font-semibold text-xl text-center md:text-left">
            {TituloHeader}
          </h1>
        </div>

        {/* Elementos de menu en Vista en DESKTOP */}
        <div className="hidden md:flex space-x-4 absolute right-3">
          {pathDir != "menu" ? (
            <button
              className="flex items-center border rounded-full w-9 justify-center"
              onClick={handleMenu}
            >
              <FiArrowLeft className="text-gray-100" />
            </button>
          ) : null}

          <button
            className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-base"
            onClick={handleLogout}
          >
            <FiLogOut className="mr-1" />
            Salir
          </button>
          <button
            className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md text-base"
            onClick={handlePerfil} /* Función para ver perfil */
          >
            <FiUser className="mr-1" />
            Ver perfil
          </button>
        </div>
        {/* Sandwitch de MENU */}
        <div className="md:hidden absolute right-3">
          <button
            type="button"
            className="text-gray-400 hover:text-white focus:text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuVisible ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19 13H5v-2h14v2zm0-6H5V5h14v2zm0 12H5v-2h14v2z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Elementos de menu en MOVIL Y TABLET */}
      {menuVisible && (
        <div className="md:hidden fondoEdbyte fixed top-16 right-3 p-4 rounded-lg z-40">
          <button
            className="flex flex-row items-center text-white w-full px-4 py-2 mb-2"
            onClick={handleLogout}
          >
            <FiLogOut className="mr-2" />
            Salir
          </button>
          <button
            className="flex flex-row items-center text-white w-full px-4 py-2"
            onClick={handlePerfil}
          >
            <FiUser className="mr-2" />
            Ver perfil
          </button>
        </div>
      )}
    </header>
  );
}

export default Encabezado;
