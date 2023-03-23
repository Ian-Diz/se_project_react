import React from "react";
import { useContext } from "react";
import WeatherCard from "./Weather";
import ClothingCard from "./ClothingCard";
import CurrentTempUnitContext from "../contexts/CurrentTempUnitContext";

const Main = ({ weatherData, cards, onCardClick, banner }) => {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);

  if (!weatherData.temp) return null;

  const temp = weatherData.temp.calc;

  const getTempRange = () => {
    if (temp >= 86) {
      return "hot";
    } else if (temp >= 65 && temp <= 86) {
      return "warm";
    } else if (temp <= 64) {
      return "cold";
    }
  };

  const tempRange = getTempRange();

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} banner={banner} />
      <section className="main__clothing">
        <p className="main__text">
          Today is {weatherData.temp[currentTempUnit]} / You may want to wear:
        </p>
        <ul className="main__cards">
          {cards
            .filter((card) => card.weather === tempRange)
            .map((filteredCard) => (
              <ClothingCard
                key={filteredCard.id}
                card={filteredCard}
                onCardClick={onCardClick}
              />
            ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;
