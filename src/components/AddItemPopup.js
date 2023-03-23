import React from "react";
import PopupWithForm from "./PopupWithForm";

const AddItemPopup = ({ onAddItem, closePopups, handleOutClick }) => {
  const [nameVal, setNameVal] = React.useState("");
  const [imageVal, setImageVal] = React.useState("");
  const [radioVal, setRadioVal] = React.useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const card = {};
    card.name = nameVal;
    card.imageUrl = imageVal;
    card.weather = radioVal;
    onAddItem(card);
    closePopups();
  };

  const onNameChange = (evt) => {
    setNameVal(evt.target.value);
  };

  const onImageChange = (evt) => {
    setImageVal(evt.target.value);
  };

  const onRadioChange = (evt) => {
    setRadioVal(evt.target.value);
  };

  return (
    <PopupWithForm
      title="New garment"
      name="add"
      onClose={closePopups}
      buttonText="Add garment"
      onOutClick={handleOutClick}
      handleSubmit={handleSubmit}
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
          value={nameVal}
          onChange={onNameChange}
        />
      </label>
      <label className="popup__label">
        Image
        <input
          className="popup__input"
          placeholder="Image URL"
          required
          name="imageURL"
          id="inputURL"
          type="url"
          value={imageVal}
          onChange={onImageChange}
        />
      </label>
      <p className="popup__text">Select the weather type:</p>
      <div className="popup__inputs_container" onChange={onRadioChange}>
        <div>
          <input
            type="radio"
            id="hot"
            name="tempRange"
            value="hot"
            className="popup__input_button"
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
