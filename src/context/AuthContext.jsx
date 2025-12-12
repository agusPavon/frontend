import { useState, useEffect, createContext } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("jwt") || null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        console.log("TOKEN DECODED:", decoded); 

      } catch (error) {
        console.error("Token inválido:", error);
        setUser(null);
        setToken(null);
        localStorage.removeItem("jwt");
      }
    } else {
      setUser(null);
    }
  }, [token]);

  const login = (token) => {
    if(!token || token === "undefined" || token === "null"){
        console.error("Token inválido recibido");
        return;
    }
    setToken(token);
    localStorage.setItem('jwt', token);
};


  const logout = () => {
  setToken(null);
  setUser(null);
  localStorage.removeItem("jwt");

  window.location.href = "/login"; 
};


  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
