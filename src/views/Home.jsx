import ModalNuevaVariedad from "../components/ModalNuevaVariedad";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Cafe from "../components/Cafe";
import Cafes from "../components/Cafes";
import Loading from "../components/Loading";
import ModalEditarVariedad from "../components/ModalEditarVariedad";

const Home = () => {
  const api = "http://localhost:5000/api/variedades";
  const { token } = useContext(AuthContext);

  const [variedades, setVariedades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [variedadSeleccionada, setVariedadSeleccionada] = useState(null);

  // Obtener variedades
  const getVariedades = async () => {
    try {
      const resp = await fetch(api, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await resp.json();
      if (resp.ok) setVariedades(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVariedades();
  }, []);

  // Crear variedad desde el modal
  const crearVariedad = async (nuevaVariedad) => {
    setLoading(true);
    try {
      const resp = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(nuevaVariedad),
      });

      const json = await resp.json();

      if (resp.ok) {
        setVariedades([...variedades, json.data]);
        setModalVisible(false);
      } else {
        alert(json.msg);
      }
    } catch (err) {
      console.error(err);
      alert("Error al crear la variedad");
    } finally {
      setLoading(false);
    }
  };

  const deleteVariedad = async (id) => {
  if (!confirm("¿Eliminar esta variedad?")) return;

  try {
    const resp = await fetch(`${api}/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const json = await resp.json();

    if (!resp.ok) {
      alert(json.msg || "Error al borrar");
      return;
    }

    // actualiza UI
    setVariedades(variedades.filter(v => v._id !== id));

  } catch (error) {
    console.error(error);
    alert("Hubo un error al borrar");
  }
};
const abrirModalEditar = (variedad) => {
  setVariedadSeleccionada(variedad);
  setModalEditVisible(true);
};

const guardarEdicion = async (variedad) => {
  try {
    const resp = await fetch(`${api}/${variedad._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(variedad),
    });

    const json = await resp.json();

    if (resp.ok) {
      setVariedades(variedades.map(v => v._id === variedad._id ? json.data : v));
      setModalEditVisible(false);
    } else {
      alert(json.msg || "Error al editar");
    }
  } catch (e) {
    console.log(e);
    alert("Error al actualizar");
  }
};


  return (
    <main className="container">
      {loading && <Loading />}
      <h2>Total de variedades <span>{variedades.length}</span></h2>

      <button
        className="btn-nueva-variedad"
        onClick={() => setModalVisible(true)}
      >
        + Nueva variedad
      </button>

            {/* LISTADO */}
      <Cafes>
  {variedades.map((item) => (
  <Cafe
  key={item._id}
  id={item._id}
  nombre={item.nombre}
  preparacion={item.preparacion}
  usuario={item.user}
  onDelete={deleteVariedad}
  onEdit={() => abrirModalEditar(item)}
/>

  ))}
</Cafes>





      {/* Modal */}
      <ModalNuevaVariedad
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCreate={crearVariedad}
      />
      <ModalEditarVariedad
  visible={modalEditVisible}
  variedad={variedadSeleccionada}
  onClose={() => setModalEditVisible(false)}
  onSave={guardarEdicion}
/>

    </main>
  );
};

export default Home;
