import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    nombre: "",
    email: "",
    password1: "",
    password2: "",
  });

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (user.password1 !== user.password2) {
      alert("Las contraseñas no coinciden");
      return;
    }
const API = import.meta.env.VITE_API_URL;

    const response = await fetch(`${API}api/usuarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: user.nombre,
        email: user.email,
        password: user.password1,
      }),
    });

    navigate("/login");
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1>Crear cuenta</h1>

        <form onSubmit={onSubmit}>
          <label>Nombre</label>
          <input name="nombre" value={user.nombre} onChange={onChange} />

          <label>Email</label>
          <input name="email" type="email" value={user.email} onChange={onChange} />

          <label>Contraseña</label>
          <input name="password1" type="password" value={user.password1} onChange={onChange} />

          <label>Repetir contraseña</label>
          <input name="password2" type="password" value={user.password2} onChange={onChange} />

          <button>Registrarme</button>
        </form>

        <div className="linkarea">
          ¿Ya tenés cuenta?
          <NavLink to="/login"> Iniciar sesión</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Register;
