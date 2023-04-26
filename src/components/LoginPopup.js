import React from "react";
import PopupWithForm from "./PopupWithForm";

const LoginPopup = ({
  closePopups,
  handleOutClick,
  handleLogin,
  handleRegisterClick,
  isLoading,
}) => {
  const [emailVal, setEmailVal] = React.useState("");
  const [pwVal, setPwVal] = React.useState("");

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

    if (!emailVal || !pwVal) {
      return;
    }

    handleLogin(emailVal, pwVal);
  };

  const onEmailChange = (evt) => {
    setEmailVal(evt.target.value);
  };

  const onPwChange = (evt) => {
    setPwVal(evt.target.value);
  };

  React.useEffect(() => {
    setEmailVal("");
    setPwVal("");
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
          value={emailVal}
          onChange={onEmailChange}
        />
      </label>
      <label className="popup__label">
        Password
        <input
          className="popup__input"
          placeholder="Password"
          required
          name="password"
          id="inputPassword"
          type="password"
          value={pwVal}
          onChange={onPwChange}
        />
      </label>
    </PopupWithForm>
  );
};

export default LoginPopup;
