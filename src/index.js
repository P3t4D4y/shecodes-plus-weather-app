function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let dateNumber = date.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  return `${hours}:${minutes}, ${day} ${dateNumber} ${month}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index >= 1) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weatherForecastDay"> ${formatDay(forecastDay.time)} </div>
        <img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png"
          width="45px" />
        <div class="weatherForecastTemperature">
          <span class="temperatureHigh">${Math.round(
            forecastDay.temperature.maximum
          )}° </span>
          <span class="temperatureLow">| ${Math.round(
            forecastDay.temperature.minimum
          )}°</span>
        </div>
      </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "f029f4abba90t43ea515f71232oae02a";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let countryElement = document.querySelector("#country-location");
  let temperatureElement = document.querySelector("#temp-now");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#todayDescription");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let feelsLikeElement = document.querySelector("#feels-like");

  celsiusTemperature = response.data.temperature.current;

  countryElement.innerHTML = response.data.country;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = Math.round(response.data.temperature.humidity);
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
  feelsLikeElement.innerHTML = Math.round(response.data.temperature.feels_like);

  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "f029f4abba90t43ea515f71232oae02a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-text-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temp-now");
  let units = document.querySelector("#units");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  units.innerHTML = `°F`;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-now");
  let units = document.querySelector("#units");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  units.innerHTML = `°C`;
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let farhenheitLink = document.querySelector("#fahrenheit-link");
farhenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("London");
