import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminUsersList = () => {
  const { token } = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState([]);

  const getUsers = async () => {
    const resp = await fetch("http://localhost:5000/api/usuarios", {
      headers: { "Authorization": `Bearer ${token}` }
    });

    const json = await resp.json();
    setUsuarios(json);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const eliminarUsuario = async (id) => {
    if (!confirm("¿Eliminar usuario?")) return;

    await fetch(`http://localhost:5000/api/usuarios/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });

    setUsuarios(usuarios.filter(u => u._id !== id));
  };

  return (
    <div className="admin-section">
      <h2>Usuarios registrados</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map(user => (
            <tr key={user._id}>
              <td>{user.nombre}</td>
              <td>{user.email}</td>
              <td>{user.rol}</td>
              <td>
                <button className="delete-btn" onClick={() => eliminarUsuario(user._id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersList