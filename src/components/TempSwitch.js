import React from "react";
import { useContext } from "react";
import CurrentTempUnitContext from "../contexts/CurrentTempUnitContext";

const Switch = ({ isOn, handleToggle }) => {
  const { currentTempUnit, handleSwitchToggle, value } = useContext(
    CurrentTempUnitContext
  );

  const white = "#FFF";
  const gray = "rgba(0, 0, 0, 0.5)";

  return (
    <div className="switch">
      <input
        className="switch__input"
        id={"switch"}
        type="checkbox"
        checked={value}
        onChange={handleSwitchToggle}
        value={currentTempUnit}
      />
      <label className="switch__label" htmlFor={`switch`}>
        <span className="switch__button" />
        <div className="switch__container">
          <span
            className="switch__f"
            style={{
              color: (!value && white) || (value && gray),
            }}
          >
            F
          </span>
          <span
            className="switch__c"
            style={{
              color: (!value && gray) || (value && white),
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
