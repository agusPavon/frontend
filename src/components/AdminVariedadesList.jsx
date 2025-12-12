import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ModalEditarVariedad from "./ModalEditarVariedad";
import ModalEliminar from "./ModalEliminar";
import ModalNuevaVariedad from "./ModalNuevaVariedad";

const AdminVariedadesList = () => {
  const { token } = useContext(AuthContext);
  const [variedades, setVariedades] = useState([]);
  const [modal, setModal] = useState(false);

  // MODAL
  const [idAEliminar, setIdAEliminar] = useState(null);
const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [variedadEditando, setVariedadEditando] = useState(null);

  const getVariedades = async () => {
    const resp = await fetch("http://localhost:5000/api/variedades", {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const json = await resp.json();
    setVariedades(json.data);
  };

  useEffect(() => {
  if (token) getVariedades();
}, [token]);


  const eliminar = async () => {
  await fetch(`http://localhost:5000/api/variedades/${idAEliminar}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  });

  setVariedades(variedades.filter(v => v._id !== idAEliminar));

  setMostrarModalEliminar(false);
  setIdAEliminar(null);
};


  const abrirEdicion = (variedad) => {
    setVariedadEditando(variedad);
    setModalVisible(true);
  };

  const guardarCambios = async (varActualizada) => {
    const resp = await fetch(`http://localhost:5000/api/variedades/${varActualizada._id}`,
      {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(varActualizada)
      }
    );

    const json = await resp.json();

    if (resp.ok) {
      // actualizar lista
      setVariedades(
        variedades.map(v => v._id === varActualizada._id ? json.data : v)
      );
      setModalVisible(false);
    } else {
      alert(json.msg || "Error al actualizar");
    }
  };

    const crearVariedad = async (variedades) => {
    const resp = await fetch("http://localhost:5000/api/variedades", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(variedades),
    });

    const json = await resp.json();

    if (resp.ok) {
      await getVariedades();
      setModal(false);
    } else {
      alert(json.msg || "Error al crear variedades");
    }
  };

  return (
    <div className="admin-section preparacion variedad">
      <h2>Variedades de café</h2>
      {/* Botón superior */}
      <button
        className="btn-create"
        onClick={() => {
          setVariedadEditando(null);
          setModalVisible(false);
          setModal(true);
        }}
      >
        + Agregar Variedad
      </button>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Preparación</th>
            <th>Usuario</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {variedades.map(v => (
            <tr key={v._id}>
              <td>{v.nombre}</td>
              <td>{v.preparacion} || {v.preparación}</td>
              <td>{v.user?.nombre}</td>
              <td>
                <button className="edit-btn" onClick={() => abrirEdicion(v)}>
                  Editar
                </button>
                <button
                    className="delete-btn"
                    onClick={() => {
                        setIdAEliminar(v._id);
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

        <ModalNuevaVariedad
          visible={modal}
          onClose={() => {
            setModal(false);
          }}
          onCreate={crearVariedad}
      />


      <ModalEditarVariedad
        visible={modalVisible}
        variedad={variedadEditando}
        onClose={() => setModalVisible(false)}
        onSave={guardarCambios}
      />
      <ModalEliminar
  visible={mostrarModalEliminar}
  onCancel={() => setMostrarModalEliminar(false)}
  onConfirm={eliminar}
/>

    </div>
  );
};

export default AdminVariedadesList;

