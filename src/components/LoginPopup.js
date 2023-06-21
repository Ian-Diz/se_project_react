import React from "react";
import PopupWithForm from "./PopupWithForm";
import FormValidation from "../hooks/FormValidation";

const LoginPopup = ({
  closePopups,
  handleOutClick,
  handleLogin,
  handleRegisterClick,
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
    button: isLoading ? "Saving..." : "Log in",
    other: "or Register",
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!values.email || !values.password) {
      return;
    }

    handleLogin(values.email, values.password);
  };

  React.useEffect(() => {
    setValues({ ...values, email: "", password: "" });
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
      otherButtonClick={handleRegisterClick}
      isValid={isValid}
      errorMessage={errorMessage}
    >
      <label className="popup__label">
        Email
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
        Password
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
    </PopupWithForm>
  );
};

export default LoginPopup;
