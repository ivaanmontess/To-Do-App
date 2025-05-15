// src/components/DeleteModal.jsx
function DeleteModal({ task, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>¿Seguro que querés eliminar la tarea?</p>
        <strong>"{task.text}"</strong>
        <div className="modal-buttons">
          <button onClick={onConfirm}>Sí, eliminar</button>
          <button onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
