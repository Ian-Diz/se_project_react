import React, { useContext } from "react";
import WeatherCard from "./Weather";
import ClothingCard from "./ClothingCard";
import random from "../images/random.svg";
import CurrentTempUnitContext from "../contexts/CurrentTempUnitContext";

const Main = ({
  weatherData,
  cards,
  onCardClick,
  banner,
  onLike,
  isLoggedIn,
}) => {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);

  if (!weatherData.temp) return null;

  const temp = Math.round(weatherData.temp.calc);

  const getTempRange = () => {
    if (temp >= 80) {
      return "hot";
    } else if (temp >= 50 && temp <= 79) {
      return "warm";
    } else if (temp <= 49) {
      return "cold";
    }
  };

  const tempRange = getTempRange();

  console.log(cards);

  return (
    <main className="main">
      <div className="main__container">
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
                  key={filteredCard._id}
                  card={filteredCard}
                  onCardClick={onCardClick}
                  onLike={onLike}
                  isLoggedIn={isLoggedIn}
                />
              ))}
          </ul>
        </section>
        <button className="main__button">
          <img src={random} className="main__random" alt="Randomize cards" />
          <p className="main__label">Randomize</p>
        </button>
      </div>
    </main>
  );
};

export default Main;
