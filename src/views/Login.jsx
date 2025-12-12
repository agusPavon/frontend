import { NavLink, useNavigate } from "react-router-dom";
import { useRef, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {

  const navigate = useNavigate();
  const endPoint = "http://localhost:5000/api/usuarios/auth";

  const emailRef = useRef();
  const passwordRef = useRef();
  const [msg, setMsg] = useState(null);

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    const response = await fetch(endPoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const json = await response.json();

    if (!response.ok) {
      setMsg(json.msg || "Credenciales incorrectas");
      return;
    }

    login(json.jwt);
    navigate("/");
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1>Iniciar sesión</h1>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input ref={emailRef} type="email" />

          <label>Contraseña</label>
          <input ref={passwordRef} type="password" />

          <button type="submit">Ingresar</button>

          {msg && <p style={{ color: "crimson", marginTop: "1rem" }}>{msg}</p>}
        </form>

        <div className="linkarea">
          ¿No tenés cuenta?
          <NavLink to="/register"> Crear cuenta</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
