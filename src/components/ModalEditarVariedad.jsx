import { useState, useEffect } from "react";

const ModalEditarVariedad = ({ visible, variedad, onClose, onSave }) => {
  const [nombre, setNombre] = useState("");
  const [preparacion, setPreparacion] = useState("");
  const [foto, setFoto] = useState("");

  useEffect(() => {
    if (variedad) {
      setNombre(variedad.nombre || "");
      setPreparacion(variedad.preparacion || variedad.preparación || "");
      setFoto(variedad.foto || "");
    }
  }, [variedad]);

  if (!visible) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...variedad,
      nombre,
      preparacion,
      foto,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card modal-form">
        <h2>Editar variedad</h2>

        <form onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input 
            type="text" 
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <label>Preparación</label>
          <textarea 
            value={preparacion}
            onChange={(e) => setPreparacion(e.target.value)}
            required
          />

          <label>Foto (URL)</label>
          <input 
            type="text" 
            value={foto}
            onChange={(e) => setFoto(e.target.value)}
          />

          <div className="modal-buttons">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>

            <button type="submit" className="btn-create">
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditarVariedad;
