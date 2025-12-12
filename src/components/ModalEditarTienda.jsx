import { useState, useEffect } from "react";

const ModalEditarTienda = ({ visible, tienda, onClose, onSave }) => {
  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    descripcion: ""
  });

  useEffect(() => {
    if (tienda) {
      setForm(tienda);
    }
  }, [tienda]);

  if (!visible) return null;

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card modal-form">
        <h2>Editar Tienda</h2>

        <form onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} />

          <label>Dirección</label>
          <input name="direccion" value={form.direccion} onChange={handleChange} />

          <label>Descripción</label>
          <textarea name="descripcion" value={form.descripcion} onChange={handleChange} />

          <div className="modal-buttons">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-create">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditarTienda;
