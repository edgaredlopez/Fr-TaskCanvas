import axios from "./axios.js";
import { urlParaLaApi } from "../../config.js";

const encabezadoPeticion = {
  "Content-Type": "application/json",
};

export async function getDataColaborador(UsuarioP) {
  try {
    const response = await axios.get(`/getCbyUser/${UsuarioP}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getPerfilColaborador() {
  try {
    const response = await axios.get(`/getPerfil`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function changePassword(AntiguoPassword, NuevoPassword) {
  try {
    const response = await axios.post("/changePassword", {
      AntiguoPassword,
      NuevoPassword,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function postLogin(Data) {
  try {
    const response = await axios.post("/login", Data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function verificarToken(Data) {
  try {
    const response = await axios.get("/verificarToken");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getLogout() {
  try {
    const response = await axios.get(`/logout`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
