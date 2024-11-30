import React, { ReactNode } from 'react';
import './Modal.css'; // Stil für das Modal

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <button onClick={onClose} className="close-button">
          Schließen
        </button>
      </div>
    </div>
  );
};

export default Modal;
