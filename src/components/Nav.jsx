import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import ModalLogout from "../components/ModalLogout";

const Nav = () => {
  const { user, logout } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);

  const handleLogoutConfirm = () => {
    logout();
    setShowModal(false);
  };

  return (
    <>
      <nav>
        <h1 className="bunaster">Bunaster App</h1>

        <ul className="menu">
          {!user && (
            <>
              <li><NavLink to="/login">Login</NavLink></li>
              <li><NavLink to="/register">Registro</NavLink></li>
            </>
          )}

          {user && <li><NavLink to="/">Inicio</NavLink></li> }     
          {user && <li><NavLink to="/tiendas">Tiendas</NavLink></li>}

        </ul>

        {user && (
          <div className="user-info">
            {user.rol === "admin" && <NavLink to="/admin">Admin Panel</NavLink>}
            <p className="preparacion">{user.nombre}</p>
            <div className="user-image"></div>
            <button  className="btn-delete" onClick={() => setShowModal(true)}>Cerrar Sesión</button>
          </div>
        )}
      </nav>

      {/* MODAL */}
      <ModalLogout
        visible={showModal}
        onConfirm={handleLogoutConfirm}
        onCancel={() => setShowModal(false)}
      />
    </>
  );
};

export default Nav;
