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
  buttonClass,
  otherButtonClick,
  isValid,
  errorMessage,
}) => {
  if (!buttonText.other) {
    buttonText.other = null;
  }

  return (
    <div className="popup__container-form" onClick={onOutClick}>
      <form className="popup__form" name={name} onSubmit={handleSubmit}>
        <fieldset className="popup__fieldset">
          <button type="button" className="popup__button" aria-label="Close">
            <img
              className="popup__close"
              alt="Close button"
              src={closeIcon}
              id="addPopup-close"
              onClick={onClose}
            />
          </button>
          <h2 className="popup__header">{title}</h2>
          {children}
          <div>
            <button
              className={buttonClass.mainButton}
              type="submit"
              aria-label="Save"
              id="addSave"
              disabled={!isValid}
            >
              {buttonText.button}
            </button>
            <button
              className={buttonClass.otherButton}
              type="button"
              onClick={otherButtonClick}
            >
              {buttonText.other}
            </button>
          </div>
          <span className="popup__errors-signup">{errorMessage}</span>
        </fieldset>
      </form>
    </div>
  );
};

export default PopupWithForm;
