import axios from "axios";
import { urlParaLaApi } from "../../config.js";

console.log(urlParaLaApi);
const instance = axios.create({
  baseURL: urlParaLaApi,
  withCredentials: true,
});

export default instance;
