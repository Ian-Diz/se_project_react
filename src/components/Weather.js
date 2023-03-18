const Weather = ({ weatherData }) => {
  return (
    <section className="weather">
      <div className="weather__banner">
        <h2 className="weather__temp">{weatherData.temp}°F</h2>
      </div>
    </section>
  );
};

export default Weather;
