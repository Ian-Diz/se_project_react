const getWeather = (config, apiKey) => {
  const longitude = config.longitude;
  const lagitude = config.lagitude;
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lagitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};

const filterData = (data) => {
  if (!data) {
    return null;
  }

  const weather = { temp: {} };
  weather.city = data.name;
  weather.temp.F = `${Math.round(data.main.temp)}°F`;
  weather.temp.C = `${Math.round(((data.main.temp - 32) * 5) / 9)}°C`;
  weather.temp.calc = data.main.temp;
  weather.weather = data.weather[0].main;

  return weather;
};

export { getWeather, filterData };
