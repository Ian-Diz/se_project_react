import React from "react";
import closeIcon from "../images/Union.svg";

const PopupWithForm = ({
  title,
  name,
  buttonText,
  onClose,
  children,
  onOutClick,
  handleSubmit,
}) => {
  return (
    <div className={`popup__container`} onClick={onOutClick}>
      <form className="popup__form" name={name} onSubmit={handleSubmit}>
        <fieldset className="popup__fieldset">
          <button type="button" className="popup__button" aria-label="Close">
            <img
              className="popup__close"
              alt="Close button image"
              src={closeIcon}
              id="addPopup-close"
              onClick={onClose}
            />
          </button>
          <h2 className="popup__header">{title}</h2>
          {children}
          <button
            className="popup__save"
            type="submit"
            aria-label="Save"
            id="addSave"
          >
            {buttonText}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default PopupWithForm;
