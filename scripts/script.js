"use strict";

const geo = navigator.geolocation;

function getWeatherData() {
  if (geo) {
    geo.getCurrentPosition(position => {
      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      
      let results;
      fetch(`https://fcc-weather-api.glitch.me/api/current?lon=${location.lng}&lat=${location.lat}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        results = data;
        const weatherInfo = document.querySelector(".weather-info");
      weatherInfo.textContent = `${results.weather[0].main}`;
        
        const cityCountryDisplay = document.querySelector("#city-country");
        cityCountryDisplay.textContent = `${results.name}, ${results.sys.country}`;
        weatherInfo.insertAdjacentHTML("afterend",
      `<img src="${results.weather[0].icon}" alt="weather-icon" />`);
        
        const humidityDisplay = document.createElement("p");
        humidityDisplay.textContent = `Humidity: ${results.main.humidity}%`;
        document.body.append(humidityDisplay);
        humidityDisplay.insertAdjacentHTML("afterend", `<p>Wind pressure: ${results.main.pressure}psf</p>`);
        const windSpeeds = document.createElement("p");
        windSpeeds.textContent = `Wind speeds: ${results.wind.speed}mph, at ${results.wind.deg} degrees`;
        document.body.append(windSpeeds);
        
        const temperature = document.createElement("p");
        temperature.id = "temperature";
        temperature.innerHTML = `Temperature: ${Math.round(results.main.temp)} °<span class="temp-scale" onclick="convertTemp('celsius', ${Math.round(results.main.temp)})">C</span>`;
        document.body.append(temperature);
      })
      .catch(err => {
        throw new Error(err.message);
      });
    });
  } else {
    const warning = document.createElement("p");
    warning.textContent = "We don't have geolocation, so we'll show default location (New York City, New York State, US) weather.";
    document.body.append(warning);
    let results;
      fetch(`https://fcc-weather-api.glitch.me/api/current?lon=-73.935242&lat=40.730610`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        results = data;
        const weatherInfo = document.querySelector(".weather-info");
      weatherInfo.textContent = `${results.weather[0].main}`;
        
        const cityCountryDisplay = document.querySelector("#city-country");
        cityCountryDisplay.textContent = `${results.name}, ${results.sys.country}`;
        weatherInfo.insertAdjacentHTML("afterend",
      `<img src="${results.weather[0].icon}" alt="weather-icon" />`);
        
        const humidityDisplay = document.createElement("p");
        humidityDisplay.textContent = `Humidity: ${results.main.humidity}%`;
        document.body.append(humidityDisplay);
        humidityDisplay.insertAdjacentHTML("afterend", `<p>Wind pressure: ${results.main.pressure}psf</p>`);
        const windSpeeds = document.createElement("p");
        windSpeeds.textContent = `Wind speeds: ${results.wind.speed}mph, at ${results.wind.deg} degrees`;
        document.body.append(windSpeeds);
        
        const temperature = document.createElement("p");
        temperature.id = "temperature";
        temperature.innerHTML = `Temperature: ${Math.round(results.main.temp)} °<span class="temp-scale" onclick="convertTemp('celsius', ${Math.round(results.main.temp)})">C</span>`;
        document.body.append(temperature);
      })
      .catch(err => {
        throw new Error(err.message);
      });
  }
}

getWeatherData();

function convertTemp(currentScale, temp) {
  const tempDisplay = document.querySelector("#temperature");
  if (currentScale === "celsius") {
    temp = Math.round((temp * (9 / 5)) + 32);
    tempDisplay.innerHTML = `Temperature: ${temp} °<span class="temp-scale" onclick="convertTemp('fahr', ${Math.round(temp)})">F</pan>`;
  } else if (currentScale === 'fahr') {
    temp = Math.round((temp - 32) * (5 / 9));
    tempDisplay.innerHTML = `Temperature: ${temp} °<span class="temp-scale" onclick="convertTemp('celsius', ${Math.round(temp)})">C</pan>`;
  }
}
