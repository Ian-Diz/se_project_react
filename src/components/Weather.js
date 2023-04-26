import React from "react";
import { useContext } from "react";
import CurrentTempUnitContext from "../contexts/CurrentTempUnitContext";

const WeatherCard = ({ weatherData, banner }) => {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);

  if (!weatherData.temp) return null;

  return (
    <section className="weather">
      <div className="weather__container">
        <img src={banner} className="weather__banner" alt="Weather banner" />
        <h2 className="weather__temp">{weatherData.temp[currentTempUnit]}</h2>
      </div>
    </section>
  );
};

export default WeatherCard;
