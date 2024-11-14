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
      {/* <div className={submitText === "Add Balance" ? "popup-main" : ""}> */}
        <div className="modal-content">
          <form  className={submitText === "Add Balance" ? "popup-main" : ""} onSubmit={onSubmit}>
            {children}
            <div className="modal-btn">
              <button className="modal-submit-btn" type="submit">
                {submitText}
              </button>
              <button className="modal-cancel-btn" onClick={onClose}>
                {cancelText}
              </button>
            </div>
          </form>
        </div>
      {/* </div> */}
    </Modal>
  );
};
export default Popup;
