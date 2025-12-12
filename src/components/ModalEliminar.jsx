import '../App.css'

const ModalEliminar = ({ visible, onCancel, onConfirm }) => {
  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card delete-modal">

        <h2>¿Eliminar?</h2>
        <p>Esta acción no se puede deshacer.</p>

        <div className="modal-buttons">
          <button className="btn-cancel" onClick={onCancel}>
            Cancelar
          </button>

          <button className="btn-delete" onClick={onConfirm}>
            Eliminar
          </button>
        </div>

      </div>
    </div>
  );
};

export default ModalEliminar;
