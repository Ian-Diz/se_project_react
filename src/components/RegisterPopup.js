import React from "react";
import PopupWithForm from "./PopupWithForm";
import * as auth from "./auth";

const RegisterPopup = ({
  closePopups,
  handleOutClick,
  handleLogin,
  handleLoginClick,
}) => {
  const [emailVal, setEmailVal] = React.useState("");
  const [pwVal, setPwVal] = React.useState("");
  const [nameVal, setNameVal] = React.useState("");
  const [avaVal, setAvaVal] = React.useState("");

  const buttonClasses = {
    mainButton: "popup__login",
    otherButton: "popup__other",
  };
  const buttonTexts = {
    button: "Next",
    other: "or Log in",
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    auth.signUp(avaVal, emailVal, nameVal, pwVal).then((res) => {
      if (res) {
        handleLogin();
      } else {
        console.log("Something went wrong.");
      }
    });

    closePopups();
  };

  const onEmailChange = (evt) => {
    setEmailVal(evt.target.value);
  };

  const onPwChange = (evt) => {
    setPwVal(evt.target.value);
  };

  const onNameChange = (evt) => {
    setNameVal(evt.target.value);
  };

  const onAvaChange = (evt) => {
    setAvaVal(evt.target.value);
  };

  React.useEffect(() => {
    setEmailVal("");
    setPwVal("");
    setNameVal("");
    setAvaVal("");
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
          value={emailVal}
          onChange={onEmailChange}
        />
      </label>
      <label className="popup__label">
        Password*
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

export default RegisterPopup;
