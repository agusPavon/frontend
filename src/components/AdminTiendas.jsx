import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import TiendaCard from "./TiendaCard";
import ModalTienda from "./ModalTienda";
import ModalEliminar from "./ModalEliminar";
import ModalEditarTienda from "./ModalEditarTienda";

const AdminTiendas = () => {
  const { token } = useContext(AuthContext);

  const [tiendas, setTiendas] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);


  // ===============================
  // GET: Obtener tiendas del backend
  // ===============================
  const fetchTiendas = async () => {
    const resp = await fetch("http://localhost:5000/api/tiendas", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const json = await resp.json();
    setTiendas(json.data || []);
  };

  useEffect(() => {
  if (token) fetchTiendas();
}, [token]);

  // ===============================
  // POST: Crear Tienda
  // ===============================
  const crearTienda = async (tienda) => {
    const resp = await fetch("http://localhost:5000/api/tiendas", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tienda),
    });

    const json = await resp.json();

    if (resp.ok) {
      await fetchTiendas();
      setModal(false);
    } else {
      alert(json.msg || "Error al crear tienda");
    }
  };

   const abrirEdicion = (tienda) => {
    setEditData(tienda);
    setModalEditVisible(true);
  };

  
  const eliminar = async () => {
  await fetch(`http://localhost:5000/api/tiendas/${deleteId}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  });
  setTiendas(tiendas.filter(v => v._id !== deleteId));

  setMostrarModalEliminar(false);
  setDeleteId(null);
}
  // ===============================
  // PUT: Editar Tienda
  // ===============================
  const editarTienda = async (tienda) => {
    const resp = await fetch(`http://localhost:5000/api/tiendas/${editData._id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tienda),
    });

    const json = await resp.json();

    if (resp.ok) {
      await fetchTiendas();
      setEditData(null);
      setModalEditVisible(false); 
    }
    else {
          alert(json.msg || "Error al editar tienda");
        }
  };

  return (
    <>
      {/* Botón superior */}
      <button
        className="btn-create"
        onClick={() => {
          setEditData(null);
          setModalEditVisible(false);
          setModal(true);
        }}
      >
        + Agregar tienda
      </button>

      
      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Descripción</th>
            <th>Publicado por:</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {tiendas.map(t => (
            <tr key={t._id}>
              <td>{t.nombre}</td>
              <td>{t.direccion} || {t.dirección}</td>
              <td>{t.descripcion} || {t.descripción}</td>
              <td>{t.user?.nombre}</td>
              <td>
                <button className="edit-btn" onClick={() => abrirEdicion(t)}>
                  Editar
                </button>
                <button
                    className="delete-btn"
                    onClick={() => {
                        setDeleteId(t._id);
                        setMostrarModalEliminar(true);
                    }}
                    >
                    Eliminar
                    </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

        <ModalEditarTienda
        visible={modalEditVisible}
        tienda={editData}
        onClose={() => {setModalEditVisible(false);
                    setEditData(null);
        }
        }
        onSave={editarTienda}
      />
    

      {/* MODAL CREAR TIENDA */}
      <ModalTienda
        visible={modal}
        onClose={() => {
          setModal(false);
        }}
        onCreate={crearTienda}
      />

      {/* MODAL ELIMINAR */}
    <ModalEliminar
  visible={mostrarModalEliminar}
  onCancel={() => setMostrarModalEliminar(false)}
  onConfirm={eliminar}
/>
    </>
  );
};

export default AdminTiendas;