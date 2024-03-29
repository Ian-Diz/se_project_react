import React, { useContext } from "react";
import WeatherCard from "./Weather";
import ClothingCard from "./ClothingCard";
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
    } else if (temp >= 60 && temp <= 79) {
      return "warm";
    } else if (temp <= 59) {
      return "cold";
    }
  };

  const tempRange = getTempRange();

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
      </div>
    </main>
  );
};

export default Main;
