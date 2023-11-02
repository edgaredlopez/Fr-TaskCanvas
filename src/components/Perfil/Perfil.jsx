import React from "react";
import { useState, useEffect } from "react";
import LogoEdbyte from "../../assets/LogoEdbyte.png";
import Avatar from "../../assets/user.png";
import { getPerfilColaborador, changePassword } from "../../apis/Auth.js";
import ModalNotificacion from "../modals/Modal";

function Perfil() {
  // Estados para mostrar, type y descipcion de AVISO POPUP
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalDescription, setModalDescription] = useState("");

  const [NombreCompleto, setNombreCompleto] = useState("");
  const [Puesto, setPuesto] = useState("");
  const [LinkFotografia, setLinkFotografia] = useState("");
  // const [DPI, setDPI] = useState("");
  const [Agencia, setAgencia] = useState("");

  const [statusCambiarPassword, setStatusCambiarPassword] = useState(false);
  const [AntiguoPassword, setAntiguoPassword] = useState("");
  const [NuevoPassword, setNuevoPassword] = useState("");

  const cambiarContraseña = async () => {
    if (statusCambiarPassword == false) {
      setStatusCambiarPassword(!statusCambiarPassword);
    }

    if (statusCambiarPassword == true) {
      try {
        if (AntiguoPassword && NuevoPassword) {
          const responseAPI = await changePassword(
            AntiguoPassword,
            NuevoPassword
          );

          if (responseAPI.type == "success") {
            setModalOpen(true);
            setModalType(responseAPI.type);
            setModalDescription(responseAPI.message);
            setStatusCambiarPassword(!statusCambiarPassword);
            setAntiguoPassword("");
            setNuevoPassword("");
          } else {
            setModalOpen(true);
            setModalType(responseAPI.type);
            setModalDescription(responseAPI.message);
          }
        } else {
          setModalOpen(true);
          setModalType("danger");
          setModalDescription(
            "Debe llenar todos los campos para poder cambiar su contraseña..."
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const consultarPefilDeColaborador = async () => {
    try {
      const responseAPI = await getPerfilColaborador();

      setNombreCompleto("");
      setPuesto("");
      // setDPI("");
      setAgencia("");
      setLinkFotografia("");

      if (responseAPI.type === "success") {
        setNombreCompleto(responseAPI.data.Nombre);
        setPuesto(responseAPI.data.Puesto);
        // setDPI(responseAPI.data.DPI);
        setAgencia(responseAPI.data.NombreAgencia);
        setLinkFotografia(responseAPI.avatar);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    consultarPefilDeColaborador();
  }, []);

  // Funcion de cierre por fondo y por botones de MODAL AVISOS
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section
      className="w-screen h-screen flex flex-col  items-center  fondoLogoEdbyte relative 
    "
    >
      <div className="w-screen h-48  md:h-60 lg:h-72   flex flex-col items-center  fondoLogoEdbyte z-10 relative pt-4">
        <img className="w-52 xs:w-72" src={LogoEdbyte} alt="Logo de LogoEdbyte" />

        <div
          className="absolute mt-20 bg-no-repeat bg-cover w-36 h-36 md:w-52 md:h-52 md:mt-44 lg:mt-20 lg:w-52 lg:h-52 rounded-full outline-green-500 outline-dashed outline-4 outline-offset-4"
          style={{ backgroundImage: `url(${LinkFotografia})` }}
        ></div>

        {/* <div className="relative mt-7  bordeVerdeLogoEdbyte border-8 border-dashed   rounded-full ">
          <img className="w-36 h-36 lg:w-52 lg:h-52 rounded-full" src={LinkFotografia} alt="No se encontró su fotografía" />
        </div> */}
      </div>
      <div className="w-screen h-full bg-white relative rounded-t-full md:rounded-tl-none flex flex-col items-center justify-center">
        <div className=" text-center">
          <h1 className="font-semibold  text-2xl  md:text-3xl textoAzulLogoEdbyte">
            {NombreCompleto}
          </h1>
        </div>
        <div className="mt-3 relative flex flex-col justify-center items-center md:text-xl">
          <span className="textoAzulLogoEdbyte flex flex-row  text-center">
            <b>Puesto:</b> <p className="ml-3">{Puesto}</p>
          </span>
          {/* <span className="textoAzulLogoEdbyte flex flex-row text-center">
            <b>DPI:</b> <p className="ml-3">{DPI}</p>
          </span> */}
          <span className="textoAzulLogoEdbyte flex flex-row text-center">
            <b>Agencia:</b> <p className="ml-3">{Agencia}</p>
          </span>
          <span className="h-40 lg:h-14 mx-auto flex flex-col lg:flex-row  justify-center items-center align-middle">
            {statusCambiarPassword ? (
              <>
                <span className=" my-1">
                  <label className="textoAzulLogoEdbyte">
                    Antigua contraseña:
                  </label>
                  <input
                    className="border-2 border-gray-500 rounded-md mx-2"
                    type="password"
                    value={AntiguoPassword}
                    onChange={(event) => setAntiguoPassword(event.target.value)}
                  />
                </span>
                <span className="my-1">
                  <label className="textoAzulLogoEdbyte">Nueva contraseña:</label>
                  <input
                    className="border-2 border-gray-500 rounded-md mx-2"
                    type="password"
                    value={NuevoPassword}
                    onChange={(event) => setNuevoPassword(event.target.value)}
                  />
                </span>
              </>
            ) : null}

            <button
              className="fondoLogoEdbyte w-36 text-white h-9  rounded-xl text-sm my-1 "
              onClick={cambiarContraseña}
            >
              Cambiar contraseña
            </button>
          </span>
        </div>
      </div>
      <header className="absolute bottom-0 h-12 w-screen fondoLogoEdbyte text-white font-normal flex flex-col text-center align-middle justify-center items-center  ">
        <p>www.LogoEdbyterlesmicoope.com.gt</p>
      </header>
      {modalOpen ? (
        <ModalNotificacion
          isOpen={modalOpen}
          type={modalType}
          description={modalDescription}
          onRequestClose={closeModal}
        />
      ) : null}
    </section>
  );
}

export default Perfil;
