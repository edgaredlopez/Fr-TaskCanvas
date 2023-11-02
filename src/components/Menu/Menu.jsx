import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import LogoFollowMeHorizontal from "../../assets/LogoEdbyte.png";
import Encabezado from "../Header/Encabezado";
import LogoEdbyte from "../../assets/LogoEdbyte.png";
import {
  FaUserFriends,
  FaTicketAlt,
  FaTrello,
  FaChartBar,
  FaHistory,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

function Menu() {
  let Enlaces = [
    { name: "CRUD para estudiantes", link: "/colab" },
    { name: "Creación de tareas", link: "/creartarea" },
    { name: "Mi flujo de tareas (kanban)", link: "/kanban" },
    { name: "Reporte general (Por tabla)", link: "/reportegeneral" },
    { name: "Tracking de tareas", link: "/estadotarea" },
  ];

  const { User, isAuthenticated } = useAuth();

  const IDRol = User.IDRol;

  return (
    <section className="flex flex-col h-screen w-screen fondoEdbytePalido ">
      {/* Contenedor de HEADER */}

      <Encabezado TituloHeader={"Menú general"} />
      {/* Contenedor de botones */}

      {isAuthenticated ? (
        <div className="w-screen h-screen mx-auto flex flex-col justify-center ">
          <div className="w-4/12 md:w-2/12 lg:w-2/12 mx-auto flex flex-col items-center mb-4 md:mb-10 ">
            <img className="w-96" src={LogoFollowMeHorizontal} alt="FollowMe" />
          </div>

          {/* Contenedor de botones de MENU */}
          <div className=" my-4 content-center w-6/12 md:w-9/12 lg:w-9/12 xl:w-7/12 mx-auto grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center">
            {/* Botones de MENU */}

            {/* Administracion de colaborador */}
            {IDRol == 1 ? (
              <Link
                to={Enlaces[0].link}
                className="flex items-center justify-center FondoVerdeParaBotones hover:bg-green-600 text-white rounded-lg h-12 w-60 text-center px-4"
                type="Link"
              >
                <FaUserFriends className="mr-2" />
                {Enlaces[0].name}
              </Link>
            ) : null}

            {IDRol == 1 || IDRol == 2 ? (
              <>
                 {/* Creacion de tickets  */}
                <Link
                  to={Enlaces[1].link}
                  className="flex items-center justify-center FondoVerdeParaBotones hover:bg-green-600 text-white rounded-lg h-12 w-60 text-center px-4"
                  type="Link"
                >
                  <FaTicketAlt className="mr-2" />
                  {Enlaces[1].name}
                </Link>

                 {/* Mi flujo de tickets con KANBAN  */}
                <Link
                  to={Enlaces[2].link}
                  className="flex items-center justify-center FondoVerdeParaBotones hover:bg-green-600 text-white rounded-lg h-12 w-60 text-center px-4"
                  type="Link"
                >
                  <FaTrello className="mr-2" />
                  {Enlaces[2].name}
                </Link>

                {/* Reporte general */}
                <Link
                  to={Enlaces[3].link}
                  className="flex items-center justify-center FondoVerdeParaBotones hover:bg-green-600 text-white rounded-lg h-12 w-60 text-center px-4"
                  type="Link"
                >
                  <FaChartBar className="mr-2" />
                  {Enlaces[3].name}
                </Link>
                {/* Estado de Ticket  */}
                <Link
                  to={Enlaces[4].link}
                  className="flex items-center justify-center FondoVerdeParaBotones hover:bg-green-600 text-white rounded-lg h-12 w-60 text-center px-4"
                  type="Link"
                >
                  <FaHistory className="mr-2 w-10" />
                  {Enlaces[4].name}
                </Link>
              </>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* FOOTHER */}
      <footer className=" px-10  h-16 relative items-center flex flex-row justify-center  fondoEdbyte w-screen">
        <img
          className="w-10 h-10 "
          src={LogoEdbyte}
          alt="Logo Edbyte es MICOOPE"
        />
        <h3 className=" text-white font-normal text-sm text-center">
          “Compromiso permanente con entregar servicios de calidad”
        </h3>
      </footer>
    </section>
  );
}

export default Menu;
