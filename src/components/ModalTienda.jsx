import { useEffect, useState } from "react";

const ModalTienda = ({ visible, onClose, data, onCreate, onUpdate }) => {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // Los hooks SIEMPRE van acá, sin condiciones arriba

  useEffect(() => {
    if (data) {
      // modo edición
      setNombre(data.nombre || "");
      setDireccion(data.direccion || "");
      setDescripcion(data.descripcion || "");
    } else {
      // modo creación
      setNombre("");
      setDireccion("");
      setDescripcion("");
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const tienda = { nombre, direccion, descripcion };

    if (data) {
      onUpdate(tienda);
    } else {
      onCreate(tienda);
    }
  };

  // Condición para no renderizar nada visual
  if (!visible) {
    return <></>; 
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card modal-form">
        <h2>{data ? "Editar tienda" : "Nueva tienda"}</h2>

        <form onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <label>Dirección</label>
          <input
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
          />

          <label>Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />

          <div className="modal-buttons">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>

            <button type="submit" className="btn-create">
              {data ? "Guardar cambios" : "Crear tienda"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalTienda;