function displayTemperature(response) {
  console.log(response);
  let temperatureElement = document.querySelector("#temp-now");
  let cityElement = document.querySelector("#city");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
}
let apiKey = "f029f4abba90t43ea515f71232oae02a";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=London&key=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
