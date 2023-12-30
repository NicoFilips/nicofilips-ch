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
        <button onClick={onClose}>Schließen</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;