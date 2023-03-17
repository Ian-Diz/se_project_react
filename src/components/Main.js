import Weather from "./Weather";
import ClothingCard from "./ClothingCard";

const Main = ({ weatherData, cards, onCardClick }) => {
  const temp = weatherData.temp;

  const tempRange = () => {
    if (temp >= 86) {
      return "hot";
    } else if (temp >= 65 && temp <= 86) {
      return "warm";
    } else if (temp <= 64) {
      return "cold";
    }
  };

  return (
    <>
      <main className="main">
        <Weather weatherData={weatherData} />
        <section className="main__clothing">
          <p className="main__text">
            Today is {temp}°F / You may want to wear:
          </p>

          <ul className="main__cards">
            {cards
              .filter((card) => card.weather === tempRange())
              .map((filteredCard) => (
                <ClothingCard
                  key={filteredCard._id}
                  card={filteredCard}
                  onCardClick={onCardClick}
                />
              ))}
          </ul>
        </section>
      </main>
    </>
  );
};

export default Main;