import React from "react";
import "./ConfirmationModal.css";

function ConfirmationModal({ isOpen, onClose, onConfirm, action }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirmación</h2>
        <p>{action}</p>
        <div className="modal-actions">
          <button onClick={onConfirm} className="modal-confirm">
            Confirmar
          </button>
          <button onClick={onClose} className="modal-cancel">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
