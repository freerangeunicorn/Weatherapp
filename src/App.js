import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Cities } from "./Cities";
import "./App.css";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [cities, setCities] = useState(null);
  const getWeatherLocation = () => {
    navigator.geolocation.getCurrentPosition(post => {
      getData(post.coords.longitude, post.coords.latitude);
    });
  };
  useEffect(() => {
    getWeatherLocation();
  }, []); //to run once

  const getData = async (long, lat) => {
    const API_KEY = "84ae64078f1582569bc184c12a0343a1";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    console.log(data);
    getPhoto(data.name);
    setWeather(data);
  };

  const getPhoto = async cityName => {
    const API_KEY =
      "7ea8d6acc1a47cb696150e7725573dbd9abb308607ab2866f29f0696fab9fa63";
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${cityName}&page=1&client_id=${API_KEY}`
    );
    const data = await response.json();
    console.log(cityName, data);
    setPhoto(data.results[0].urls.raw);
  };

  const appStyle = {
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundImage: `url(${photo})`,
    backgroundRepeat: "none"
  };

  function celsiusToF(number) {
    return (number * 9) / 5 + 32;
  }

  return (
    <div className="parentcontainer">
      <div style={appStyle} className="container">
        <div className="container-fluid text-white my-auto">
          <div className="container mx-auto my-4 py-4">
            <div className="row justify-content-center text-center">
              <h1 className="col-12 display-4 my-2 py-3 text-dark">
                Mai Weather App
              </h1>
              <h2 className="col-12">{weather && weather.name}</h2>
              <h3 className="col-12 text-danger">
                {weather && weather.main.temp}°C <br />
                {weather && celsiusToF(weather.main.temp)}°F{" "}
              </h3>
              <h3 className="col-12 text-light">
                <img
                  src={`https://openweathermap.org/img/wn/${weather &&
                    weather.weather[0].icon}@2x.png`}
                  style={{ width: "50px", height: "50px" }}
                ></img>
                {weather && weather.weather[0].description}
              </h3>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <div className="buttongroup"> 
        <ul>
          <button
            type="button"
            onClick={() => {
              getData(Cities[0].longitude, Cities[0].latitude);
            }}
            class="btn btn-outline-light"
          >
            Stockholm
          </button>
          <button
            type="button"
            onClick={() => {
              getData(Cities[1].longitude, Cities[1].latitude);
            }}
            class="btn btn-outline-light"
          >
            Los Angeles
          </button>
          <button
            type="button"
            onClick={() => {
              getData(Cities[2].longitude, Cities[2].latitude);
            }}
            class="btn btn-outline-light"
          >
            Berlin
          </button>
          <button
            type="button"
            onClick={() => {
              getData(Cities[3].longitude, Cities[3].latitude);
            }}
            class="btn btn-outline-light"
          >
            Hong Kong
          </button>
          <button
            type="button"
            onClick={() => {
              getData(Cities[4].longitude, Cities[4].latitude);
            }}
            class="btn btn-outline-light"
          >
            Bali
          </button>
          <button
            type="button"
            onClick={() => {
              getData(Cities[5].longitude, Cities[5].latitude);
            }}
            class="btn btn-outline-light"
          >
            Portland
          </button>
          <button
            type="button"
            onClick={() => {
              getData(Cities[6].longitude, Cities[6].latitude);
            }}
            class="btn btn-outline-light"
          >
            Goa
          </button>
          <button
            type="button"
            onClick={() => {
              getData(Cities[7].longitude, Cities[7].latitude);
            }}
            class="btn btn-outline-light"
          >
            Ho Chi Minh City
          </button>
          <button
            type="button"
            onClick={() => {
              getData(Cities[8].longitude, Cities[8].latitude);
            }}
            class="btn btn-outline-light"
          >
            Chiang Mai
          </button>
        </ul>
      </div>
    </div>
  );
}
