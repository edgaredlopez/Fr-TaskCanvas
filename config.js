//Definir variable global para URL de API

let Produccion = false;

export let urlParaLaApi = "";

if (Produccion == true) {
  //  Para produccion uso la IP del server
  urlParaLaApi = "https://edbyte.software/api";
} else {
  // Para entorno de desarrollo
  urlParaLaApi = "http://localhost:4000/api";
}