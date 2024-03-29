import React from "react";
import PopupWithForm from "./PopupWithForm";
import FormValidation from "../hooks/FormValidation";

const AddItemPopup = ({
  onAddItem,
  closePopups,
  handleOutClick,
  token,
  isLoading,
}) => {
  const { values, handleChange, errors, isValid, setValues, setIsValid } =
    FormValidation();

  const buttonClasses = {
    mainButton: "popup__add",
    otherButton: "popup__leave",
  };

  const buttonTexts = {
    button: isLoading ? "Saving..." : "Add Garment",
    other: null,
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const card = {};
    card.name = values.name;
    card.imageUrl = values.imageURL;
    card.weather = values.tempRange;
    onAddItem(card, token);
  };

  React.useEffect(() => {
    setValues({ ...values, name: "", imageURL: "", tempRange: "" });
    setIsValid(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PopupWithForm
      title="New garment"
      name="add"
      onClose={closePopups}
      buttonText={buttonTexts}
      onOutClick={handleOutClick}
      handleSubmit={handleSubmit}
      buttonClass={buttonClasses}
      isValid={isValid}
    >
      <label className="popup__label">
        Name
        <input
          className="popup__input"
          type="text"
          placeholder="Name"
          required
          name="name"
          id="inputName"
          minLength="1"
          maxLength="30"
          onChange={handleChange}
        />
      </label>
      {errors.name && <span className="popup__errors">{errors.name}</span>}
      <label className="popup__label">
        Image
        <input
          className="popup__input"
          placeholder="Image URL"
          required
          name="imageURL"
          id="inputURL"
          type="url"
          onChange={handleChange}
        />
      </label>
      {errors.imageURL && (
        <span className="popup__errors">{errors.imageURL}</span>
      )}
      <p className="popup__text">Select the weather type:</p>
      <div className="popup__inputs_container" onChange={handleChange}>
        <div>
          <input
            type="radio"
            id="hot"
            name="tempRange"
            value="hot"
            className="popup__input_button"
            required
          />
          <label className="popup__label_multiple" htmlFor="hot">
            Hot
          </label>
        </div>
        <div>
          <input
            type="radio"
            id="warm"
            name="tempRange"
            value="warm"
            className="popup__input_button"
            required
          />
          <label className="popup__label_multiple" htmlFor="warm">
            Warm
          </label>
        </div>
        <div>
          <input
            type="radio"
            id="cold"
            name="tempRange"
            value="cold"
            className="popup__input_button"
            required
          />
          <label className="popup__label_multiple" htmlFor="cold">
            Cold
          </label>
        </div>
      </div>
    </PopupWithForm>
  );
};

export default AddItemPopup;
