import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const ModalNuevaVariedad = ({ visible, onClose, onCreate }) => {
  const { user } = useContext(AuthContext);
  const [nombre, setNombre] = useState("");
  const [preparacion, setPreparacion] = useState("");
  const [foto, setFoto] = useState("");

  if (!visible) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ nombre, preparacion, foto });

    // limpiar
    setNombre("");
    setPreparacion("");
    setFoto("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card modal-form">
        <h2>Agregar nueva variedad</h2>

        {user && (
  <form onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            placeholder="Ej: Latte, Flat White..."
          />

          <label>Preparación</label>
          <textarea
            value={preparacion}
            onChange={(e) => setPreparacion(e.target.value)}
            required
            placeholder="Describe cómo se prepara..."
          />

          <label>Foto (URL opcional)</label>
          <input
            type="text"
            value={foto}
            onChange={(e) => setFoto(e.target.value)}
            placeholder="https://foto.jpg"
          />

          <div className="modal-buttons">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>

            <button type="submit" className="btn-create">
              Crear
            </button>
          </div>
        </form>
)}

        
      </div>
    </div>
  );
};

export default ModalNuevaVariedad;
