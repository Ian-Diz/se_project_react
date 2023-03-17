import React from "react";
import { useRef } from "react";
import closeIcon from "../images/Union.svg";

const PopupWithForm = ({ title, name, buttonText, onClose, children }) => {
  const exit = useRef(null);
  const popup = useRef(null);

  React.useEffect(() => {
    window.addEventListener("keydown", onClose);
    exit.current.addEventListener("click", onClose);
    popup.current.addEventListener("mousedown", onClose);

    return () => {
      window.removeEventListener("keydown", onClose);
    };
  });

  return (
    <>
      <div className={`popup__container popup_type_${name}`} ref={popup}>
        <form className="popup__form" name={name}>
          <fieldset className="popup__fieldset">
            <button type="button" className="popup__button" aria-label="Close">
              <img
                className="popup__close"
                alt="Close button image"
                src={closeIcon}
                id="addPopup-close"
                ref={exit}
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
    </>
  );
};

export default PopupWithForm;
