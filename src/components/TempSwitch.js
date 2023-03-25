import React from "react";
import { useContext } from "react";
import CurrentTempUnitContext from "../contexts/CurrentTempUnitContext";

const Switch = () => {
  const { currentTempUnit, handleSwitchToggle } = useContext(
    CurrentTempUnitContext
  );

  let isChecked = false;

  if (currentTempUnit === "F") {
    isChecked = false;
  } else {
    isChecked = true;
  }

  const white = "#FFF";
  const gray = "rgba(0, 0, 0, 0.5)";

  return (
    <div className="switch">
      <input
        className="switch__input"
        id={"switch"}
        type="checkbox"
        checked={isChecked}
        onChange={handleSwitchToggle}
        value={currentTempUnit}
      />
      <label className="switch__label" htmlFor={`switch`}>
        <span className="switch__button" />
        <div className="switch__container">
          <span
            className="switch__f"
            style={{
              color: (!isChecked && white) || (isChecked && gray),
            }}
          >
            F
          </span>
          <span
            className="switch__c"
            style={{
              color: (!isChecked && gray) || (isChecked && white),
            }}
          >
            C
          </span>
        </div>
      </label>
    </div>
  );
};

export default Switch;
