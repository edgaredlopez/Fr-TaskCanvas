import React, { useEffect, useState, useRef } from "react";
import LogoCoto from "../../assets/LogoEdbyte.png";
import {
  postRegistrarColaborador,
  getDatosCreacionColaborador,
  getDataColaboradorPorUsuario,
  patchActualizarColaborador,
} from "../../apis/Tickets";
import AppModal from "../modals/Modal.jsx";
import Encabezado from "../Header/Encabezado";

const Login = () => {
  // Para manear los datos que se guardaran en el formulario
  const [valores, setValores] = useState({
    IDEstudiante: "",
    Nombre: "",
    Telefono: "",
    Correo: "",
    Usuario: "",
    Password: "",
    Estado: "1",
    IDRol: "1",
  });

  // Para guardar los datos que recibiremos para los DESPLEGABLES
  const [Roles, setRoles] = useState([]);

  // Para almacenar estados y datos para el modal de NOTIFICACION
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const closeModal = () => {
    setModalOpen(false);
  };

  const [Modificando, setModificando] = useState(false);

  // Funcion asincronica que pedira todos los datos para crear tickets desde el backends
  const ConsultarDataCreacionColaborador = async () => {
    try {
      const responseAPI = await getDatosCreacionColaborador();

      if (responseAPI.type === "success") {
        //Mandar datos a estados
        setRoles(responseAPI.data.Roles);
      } else {
        setModalOpen(true);
        setModalType(responseAPI.type);
        setModalDescription(responseAPI.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      ConsultarDataColaboradorPorUsuario();
    }
  };
  // Para consultar datos de un colaborador por su USUARIO
  const ConsultarDataColaboradorPorUsuario = async () => {
    try {
      if (valores.Usuario == "") {
        setModalOpen(true);
        setModalType("danger");
        setModalDescription(
          "Para consultar un colaborador, tiene que ingresar su Usuario..."
        );
      } else {
        const respuestaAPI = await getDataColaboradorPorUsuario(
          valores.Usuario
        );

        limpiarValores();
        setModalOpen(true);
        setModalType(respuestaAPI.type);
        setModalDescription(respuestaAPI.message);

        if (respuestaAPI.type == "success") {
          setValores({
            IDEstudiante: respuestaAPI.data.IDEstudiante,
            Nombre: respuestaAPI.data.Nombre,
            Telefono: respuestaAPI.data.Telefono,
            Correo: respuestaAPI.data.Correo,
            Usuario: respuestaAPI.data.Usuario,
            Password: respuestaAPI.data.Password,
            IDRol: respuestaAPI.data.IDRol,
            Estado: respuestaAPI.data.Estado,
          });

          setModificando(true);
        } else {
          setModificando(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Procesos a realizar cuando se carga la pagina
  useEffect(() => {
    ConsultarDataCreacionColaborador();
  }, []);

  // Para recibir y procesar los cambios que se hacen dentro de los campos del FORMULARIO
  const ManejadorDeCambio = (event) => {
    // Obtenemos el valor a cambiar
    const { name, value } = event.target;
    setValores({
      ...valores,
      [name]: value,
    });
  };

  // Metodo para limpiar los campos del Formulario indexados al estado
  const limpiarValores = () => {
    setValores({
      IDEstudiante: "",
      Nombre: "",
      Telefono: "",
      Correo: "",
      Usuario: "",
      Password: "",
      Estado: "1",
      IDRol: "1",
    });

    setModificando(false);
  };

  //Para enviar todos los datos del FORMUARIO al BACKEND
  const EnvioDeData = async (e) => {
    e.preventDefault();

    // Verificar que los valores no estén vacíos
    if (
      valores.Nombre == "" ||
      valores.Telefono == "" ||
      valores.Correo == "" ||
      valores.Usuario == "" ||
      valores.Password == "" ||
      valores.IDRol == "" ||
      valores.IDRol == "0"
    ) {
      setModalOpen(true);
      setModalType("danger");
      setModalDescription(
        "Todos los campos son requeridos, por favor completelos y vuelva a intentarlo..."
      );
    } else {
      try {
        // Crear objeto FormData
        const formData = new FormData();

        // Agregar valores al FormData
        formData.append("Nombre", valores.Nombre);
        formData.append("Telefono", valores.Telefono);
        formData.append("Correo", valores.Correo);
        formData.append("Usuario", valores.Usuario);
        formData.append("Password", valores.Password);
        formData.append("IDRol", valores.IDRol);

        const RespuestaRegistroColaborador = await postRegistrarColaborador(
          formData
        );

        setModalOpen(true);
        setModalType(RespuestaRegistroColaborador.type);
        setModalDescription(RespuestaRegistroColaborador.message);

        if (RespuestaRegistroColaborador.type === "success") {
          //Limpiar los valores de los campos
          limpiarValores();
        }
      } catch (error) {
        setModalOpen(true);
        setModalType("error");
        setModalDescription(error.message);
      }
    }
  };

  // Para actualizar los datos de un colabordor
  const ActualizarDatosColaborador = async (e) => {
    e.preventDefault();

    // Verificar que los valores no estén vacíos
    if (
      valores.Nombre == "" ||
      valores.Telefono == "" ||
      valores.Correo == "" ||
      valores.Usuario == "" ||
      valores.Password == "" ||
      valores.IDRol == "" ||
      valores.IDRol == "0"
    ) {
      setModalOpen(true);
      setModalType("danger");
      setModalDescription(
        "Todos los campos son requeridos, por favor completelos y vuelva a intentarlo..."
      );
    } else {
      try {
        const RespuestaRegistroColaborador = await patchActualizarColaborador(
          valores
        );

        setModalOpen(true);
        setModalType(RespuestaRegistroColaborador.type);
        setModalDescription(RespuestaRegistroColaborador.message);

        if (RespuestaRegistroColaborador.type === "success") {
          //Limpiar los valores de los campos
          limpiarValores();
        }
      } catch (error) {
        setModalOpen(true);
        setModalType("error");
        setModalDescription(error.message);
      }
    }
  };
  return (
    <>
      <Encabezado TituloHeader={"Administración de estudiantes "} />
      <div className="min-h-screen h-auto pt-7  flex flex-col fondoEdbytePalido">
        <img className="w-32 mx-auto mb-7 " src={LogoCoto} alt="" />
        <form className=" w-11/12 lg:w-9/12 bg-white rounded-2xl p-5 lg:p-9 mx-auto h-auto flex flex-row flex-wrap justify-around mb-10 ">
          {/* Nombre completo */}
          <div className="mt-4">
            <label
              htmlFor="Nombre"
              className="block text-base font-medium text-gray-700"
            >
              Nombre completo:
            </label>
            <input
              name="Nombre"
              type="text"
              required
              className="w-full rounded-md relative block  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-base text-left"
              placeholder="Ingrese el nombre completo"
              value={valores.Nombre}
              onChange={ManejadorDeCambio}
            />
          </div>

          {/* Nombre del puesto */}
          <div className="mt-4">
            <label
              htmlFor="Telefono"
              className="block text-base font-medium text-gray-700"
            >
              No. Telefono:
            </label>
            <input
              name="Telefono"
              type="text"
              required
              className="w-full rounded-md relative block  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-base text-left"
              placeholder="Ingrese el No. de Telefono"
              value={valores.Telefono}
              onChange={ManejadorDeCambio}
            />
          </div>

          {/* Siglas del puesto */}
          <div className="mt-4">
            <label
              htmlFor="Correo"
              className="block text-base font-medium text-gray-700"
            >
              Correo
            </label>
            <input
              name="Correo"
              type="text"
              required
              className=" w-full rounded-md relative block  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-base text-left"
              placeholder="Ingrese el correo"
              value={valores.Correo}
              onChange={ManejadorDeCambio}
            />
          </div>

          {/* USUARIO */}
          <div className="mt-4">
            <label
              htmlFor="Usuario"
              className="block text-base font-medium text-gray-700"
            >
              Usuario para el inicio de sesión:
            </label>
            <input
              name="Usuario"
              type="text"
              required
              className="w-full rounded-md relative block  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-base text-left"
              placeholder="Ingrese el Usuario del colaborador"
              value={valores.Usuario}
              onChange={ManejadorDeCambio}
              onKeyDown={handleKeyPress}
            />
          </div>

          {/* Contrasena */}
          <div className="mt-4">
            <label
              htmlFor="Password"
              className="block text-base font-medium text-gray-700"
            >
              Contraseña:
            </label>
            <input
              name="Password"
              type="password"
              required
              className="w-full rounded-md relative block  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-base text-left"
              placeholder="Ingrese la contraseña del colaborador"
              value={valores.Password}
              onChange={ManejadorDeCambio}
            />
          </div>

          {/* Estado del usuario */}
          <div className="mt-4">
            <label
              htmlFor="Estado"
              className="block text-base font-medium text-gray-700"
            >
              Estado:
            </label>
            <input
              name="Estado"
              type="text"
              required
              disabled={!Modificando}
              className="w-full rounded-md relative block  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-base text-left"
              placeholder="Ingrese el dígito de estado"
              value={valores.Estado}
              onChange={ManejadorDeCambio}
            />
          </div>

          <div className="w-full flex flex-row justify-around flex-wrap ">
            {/* Para seleccionar el ROL */}
            <div className="sm:col-span-2 m-3">
              <label
                className="text-base font-bold textoVerdeEdbyte text-left"
                htmlFor="IDRol"
              >
                Rol del usuario dentro del sistema:
              </label>
              <select
                className="ml-3 w-full h-7 font-normal text-center bg-transparent border-b-2 border-black textoGrisOscuro"
                name="IDRol"
                id="IDRol"
                value={valores.IDRol}
                onChange={ManejadorDeCambio}
              >
                {/* Mapeamos el array de servicios obteniendo cada uno de los servicios y un index único */}
                {Roles.map((itemRol) => {
                  const [key, value] = Object.entries(itemRol)[0];
                  return (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className=" flex flex-row  w-full flex-wrap justify-around">
            <button
              type="button"
              onClick={EnvioDeData}
              className="mt-4 flex justify-center py-2 px-4  border border-transparent rounded-md shadow-sm text-sm font-medium text-white fondoEdbyteVerde hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
            >
              Registrar colaborador
            </button>

            <button
              type="button"
              className="mt-4 flex justify-center py-2 px-4  border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={ConsultarDataColaboradorPorUsuario}
            >
              Consultar
            </button>

            <button
              type="button"
              onClick={ActualizarDatosColaborador}
              className="mt-4 flex justify-center  py-2 px-4    border  border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
            >
              Actualizar
            </button>

            <button
              type="button"
              className="mt-4 flex justify-center  py-2 px-4  border  border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
              onClick={limpiarValores}
            >
              Limpiar campos
            </button>
          </div>
        </form>

        <AppModal
          isOpen={modalOpen}
          type={modalType}
          description={modalDescription}
          onRequestClose={closeModal}
        />
      </div>
    </>
  );
};

export default Login;
