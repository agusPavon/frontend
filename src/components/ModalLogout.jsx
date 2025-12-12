const ModalLogout = ({ visible, onConfirm, onCancel }) => {
  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>¿Cerrar sesión?</h2>
        <p>Tu sesión actual se cerrará y deberás iniciar de nuevo.</p>

        <div className="modal-buttons">
          <button className="btn-cancel" onClick={onCancel}>Cancelar</button>
          <button className="btn-logout" onClick={onConfirm}>Cerrar Sesión</button>
        </div>
      </div>
    </div>
  );
};

export default ModalLogout;
