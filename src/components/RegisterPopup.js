import React from "react";
import PopupWithForm from "./PopupWithForm";
import FormValidation from "../hooks/FormValidation";

const RegisterPopup = ({
  closePopups,
  handleOutClick,
  handleRegister,
  handleLoginClick,
  isLoading,
  errorMessage,
}) => {
  const { values, handleChange, errors, isValid, setValues, setIsValid } =
    FormValidation();

  const buttonClasses = {
    mainButton: "popup__login",
    otherButton: "popup__other",
  };
  const buttonTexts = {
    button: isLoading ? "Saving..." : "Next",
    other: "or Log in",
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    handleRegister(
      values.avatarUrl,
      values.email,
      values.name,
      values.password
    );
  };

  React.useEffect(() => {
    setValues({ ...values, email: "", password: "", name: "", avatarUrl: "" });
    setIsValid(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PopupWithForm
      title="Log in"
      name="Login"
      onClose={closePopups}
      buttonText={buttonTexts}
      onOutClick={handleOutClick}
      handleSubmit={handleSubmit}
      buttonClass={buttonClasses}
      otherButtonClick={handleLoginClick}
      isValid={isValid}
      errorMessage={errorMessage}
    >
      <label className="popup__label">
        Email*
        <input
          className="popup__input"
          type="email"
          placeholder="Email"
          required
          name="email"
          id="inputEmail"
          minLength="1"
          maxLength="30"
          onChange={handleChange}
        />
      </label>
      {errors.email && <span className="popup__errors">{errors.email}</span>}
      <label className="popup__label">
        Password*
        <input
          className="popup__input"
          placeholder="Password"
          required
          name="password"
          id="inputPassword"
          type="password"
          onChange={handleChange}
        />
      </label>
      {errors.password && (
        <span className="popup__errors">{errors.password}</span>
      )}
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
          onChange={handleChange}
        />
      </label>
      {errors.avatarUrl && (
        <span className="popup__errors">{errors.avatarUrl}</span>
      )}
    </PopupWithForm>
  );
};

export default RegisterPopup;
