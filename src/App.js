import React, { useEffect, useState } from "react";
import Description from "./Components/Description";
import coldbg from "./assets/cold.jpg";
import hotBg from "./assets/hot.jpeg";
import { getFormattedWeatherData } from "./Components/WeatherService";
function App() {
  const [city, setCity] = useState("Ujjain");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotBg);

  /* to fetch data */
  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);

      //dynamic background
      const threshold = units === "metric" ? "20" : "60";
      if (data.temp <= threshold) setBg(coldbg);
      else setBg(coldbg);
    };
    fetchWeatherData();
  }, [units, city]);

  /* unit conversion */
  const handleUnitClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "F" : "C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  /* to handle the city name */
  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };
  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div
            className="container"
            style={{
              maxWidth: "800px",
              margin: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "column",

              padding: "1rem",
            }}
          >
            <div className="section section-inputs">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter City ..."
              />
              <button onClick={(e) => handleUnitClick(e)}>&deg;F</button>
            </div>
            <div
              style={{ margin: "5rem 1rem" }}
              className="section section-temperature"
            >
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weather-icon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()}${
                  units === "metric" ? "°F" : "°C"
                }`}</h1>
              </div>
            </div>
            <Description weather={weather} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
