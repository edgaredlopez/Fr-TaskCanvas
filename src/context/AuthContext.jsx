import { createContext, useState, useContext, useEffect } from "react";
import { postLogin, verificarToken } from "../apis/Auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

// Para que en ves de estar importando el  authcontgext y usecontext, solo importamos useAuth y nos trae ya los datos
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [User, setUser] = useState(null);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  let cookiesObtenidas = Cookies.get();


  //   Funcion para repetir el login y guardar los datos de este en User
  const loginContextProvider = async (Valores) => {
    try {
      const responseAPI = await postLogin(Valores);
      if (responseAPI.type === "success") {
        setUser(responseAPI.data);
        setisAuthenticated(true);
      }
      return responseAPI;
    } catch (error) {
      console.log(error);
      setisAuthenticated(false);
      setUser(null);
    }
  };

  async function revisarLogin() {
    cookiesObtenidas = Cookies.get();

    if (cookiesObtenidas.tokenpc) {
      try {
        const responseAPI = await verificarToken();


        if (responseAPI.type === "success") {
          setUser(responseAPI.data);
          setisAuthenticated(true);
          setLoading(false);
        } else {
          setUser(null);
          setisAuthenticated(false);
          setLoading(false);
          return; 
        }
      } catch (error) {
          console.log(error);
          setLoading(false);
          setisAuthenticated(false);
          setUser(null);
          return; 
      }
    }
    else
    {
      setisAuthenticated(false);
      setLoading(false);
      return setUser(null);
    }
  }


  useEffect(() => {
   
    revisarLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ loginContextProvider, User, isAuthenticated, loading, setisAuthenticated, revisarLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
