import React from "react";
import { useContext } from "react";
import CurrentTempUnitContext from "./contexts/CurrentTempUnitContext";

const Switch = ({ isOn, handleToggle }) => {
  const { CurrentTempUnit } = useContext(CurrentTempUnitContext);

  return (
    <div className="switch">
      <input
        className="switch__input"
        id={`switch`}
        type="checkbox"
        checked={isOn}
        onChange={handleToggle}
        value={CurrentTempUnit}
      />
      <label className="switch__label" htmlFor={`switch`}>
        <span className="switch__button" />
        <div className="switch__container">
          <span
            className="switch__f"
            style={{
              color: (!isOn && "#FFF") || (isOn && "rgba(0, 0, 0, 0.5)"),
            }}
          >
            F
          </span>
          <span
            className="switch__c"
            style={{
              color: (!isOn && "rgba(0, 0, 0, 0.5)") || (isOn && "#FFF"),
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
