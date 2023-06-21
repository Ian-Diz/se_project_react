import React, { useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import FormValidation from "../hooks/FormValidation";

const EditPopup = ({ closePopups, handleOutClick, handleEdit }) => {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, setValues } = FormValidation();

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

    const updatedInfo = { name: values.name, avatarUrl: values.avatarUrl };

    handleEdit(updatedInfo);
  };

  React.useEffect(() => {
    setValues({
      ...values,
      name: currentUser.data.name,
      avatarUrl: currentUser.data.avatar,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      isValid={isValid}
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
          defaultValue={currentUser.data.name}
          onChange={handleChange}
        />
      </label>
      {errors.name && <span className="popup__errors">{errors.name}</span>}
      <label className="popup__label">
        Avatar
        <input
          className="popup__input"
          placeholder="Avatar URL"
          name="avatarUrl"
          id="inputAvatarUrl"
          type="url"
          defaultValue={currentUser.data.avatar}
          onChange={handleChange}
        />
      </label>
      {errors.avatarUrl && (
        <span className="popup__errors">{errors.avatarUrl}</span>
      )}
    </PopupWithForm>
  );
};

export default EditPopup;
