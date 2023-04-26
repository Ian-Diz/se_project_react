import React from "react";
import closeIcon from "../images/Union.svg";

const LogoutPopup = ({ closePopups, handleOutClick, logout }) => {
  const handleLogout = () => {
    logout();
    closePopups();
  };

  return (
    <div className="popup__container-confirm" onClick={handleOutClick}>
      <div className="popup__confirm">
        <button type="button" className="popup__button" aria-label="Close">
          <img
            className="popup__close"
            alt="Close button"
            src={closeIcon}
            onClick={closePopups}
          />
        </button>
        <div className="popup__container_confirm">
          <p className="popup__text_confirm">
            Are you sure you want to log out?
          </p>
        </div>
        <button
          className="popup__button_confirm"
          type="button"
          aria-label="Confirm"
          onClick={handleLogout}
        >
          Yes, log out
        </button>
        <button
          className="popup__button_cancel"
          type="button"
          aria-label="Cancel"
          onClick={closePopups}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogoutPopup;
