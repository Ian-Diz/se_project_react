import React from "react";
import PopupWithForm from "./PopupWithForm";

const EditPopup = ({ closePopups, handleOutClick, handleEdit }) => {
  const [nameVal, setNameVal] = React.useState("");
  const [avaVal, setAvaVal] = React.useState("");

  const buttonClasses = {
    mainButton: "popup__add",
    otherButton: "popup__leave",
  };

  const buttonTexts = {
    button: "Save Changes",
    other: null,
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const updatedInfo = { name: nameVal, avatarUrl: avaVal };

    handleEdit(updatedInfo);

    closePopups();
  };

  const onNameChange = (evt) => {
    setNameVal(evt.target.value);
  };

  const onAvaChange = (evt) => {
    setAvaVal(evt.target.value);
  };

  React.useEffect(() => {
    setNameVal("");
    setAvaVal("");
  }, []);

  return (
    <PopupWithForm
      title="Change profile data"
      name="Edit"
      onClose={closePopups}
      buttonText={buttonTexts}
      onOutClick={handleOutClick}
      handleSubmit={handleSubmit}
      buttonClass={buttonClasses}
    >
      <label className="popup__label">
        Name*
        <input
          className="popup__input"
          type="text"
          placeholder="Name"
          name="name"
          id="inputName"
          required
          minLength="1"
          maxLength="30"
          value={nameVal}
          onChange={onNameChange}
        />
      </label>
      <label className="popup__label">
        Avatar
        <input
          className="popup__input"
          placeholder="Avatar URL"
          name="avatarUrl"
          id="inputAvatarUrl"
          type="url"
          value={avaVal}
          onChange={onAvaChange}
        />
      </label>
    </PopupWithForm>
  );
};

export default EditPopup;
