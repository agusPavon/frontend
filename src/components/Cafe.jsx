import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Cafe = ({ id, nombre, preparacion, usuario, onDelete, onEdit }) => {
  const { user } = useContext(AuthContext);

  const puedoModificar =
    user &&
    (user.rol === "admin" || user.id === usuario?._id || user.id === usuario?.id);

  return (
    <li className="cafe-card">
      <h3 className="variedad">{nombre}</h3>
      <p className="preparacion">{preparacion}</p>
      <small className="autor">Publicado por: {usuario?.nombre}</small>

      {puedoModificar && (
        <div className="card-actions">
          <button className="btn-edit" onClick={() => onEdit(id)}>
            Editar
          </button>
          <button className="btn-delete" onClick={() => onDelete(id)}>
            Borrar
          </button>
        </div>
      )}
    </li>
  );
};

export default Cafe;
