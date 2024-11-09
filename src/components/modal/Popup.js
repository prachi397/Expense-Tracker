import React from "react";
import Modal from "react-modal";
import "./popup.css";

const Popup = ({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  submitText = "Submit",
  cancelText = "Cancel",
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="custom-modal"
      overlayClassName="modal-overlay"
    >
      <h2>{title}</h2>
      <div className={submitText==='Add Balance' ? 'popup-main':''}>
      <div className="modal-content">{children}</div>
      <div className="modal-btn">
        <button className="modal-submit-btn" onClick={onSubmit}>
          {submitText}
        </button>
        <button className="modal-cancel-btn" onClick={onClose}>
          {cancelText}
        </button>
      </div>
      </div>
    </Modal>
  );
};
export default Popup;
