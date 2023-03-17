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

  const weather = {};
  weather.city = data.name;
  weather.temp = data.main.temp;
  weather.weather = data.weather[0].main;
  return weather;
};

export { getWeather, filterData };
