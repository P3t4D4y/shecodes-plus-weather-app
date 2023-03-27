function formatDate(date) {
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  let dateNumber = date.getDate();
  let monthIndex = date.getMonth();
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
  let month = months[monthIndex];
  let year = date.getFullYear();
  return `${day} ${dateNumber} ${month} ${year}`;
}

let now = new Date();
let date = document.querySelector("#date");
date.innerHTML = formatDate(now);

function displayWeather(response) {
  console.log(response.data);
  document.querySelector("#location-city").innerHTML = response.data.name;
  document.querySelector("#today-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#today-summary").innerHTML =
    response.data.weather[0].main;

  document.querySelector("#high-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let apiKey = "ed55b36e362d8733f7d859247cedeaf2";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

let form = document.querySelector("#enter-city");
form.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  let apiKey = "ed55b36e362d8733f7d859247cedeaf2";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function changeToC(event) {
  event.preventDefault();
  let celsius = document.querySelector("#today-temp");
  celsius.innerHTML = "15°C";
}

function changeToF(event) {
  event.preventDefault();
  let farhenheit = document.querySelector("#today-temp");
  farhenheit.innerHTML = "59°F";
}

let farhenheitButton = document.querySelector("#fahrenheit-button");
farhenheitButton.addEventListener("click", changeToF);
let celsiusButton = document.querySelector("#celsius-button");
celsiusButton.addEventListener("click", changeToC);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", displayCurrentLocation);

searchCity("London");
