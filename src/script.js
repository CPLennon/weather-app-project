//Feature 1 - Current date

function formatDate(date) {
  let daysToday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayToday = daysToday[date.getDay()];
  let hour = date.getHours();
  let minutes = ("0" + date.getMinutes()).slice(-2);

  return `${dayToday} ${hour}:${minutes}`;
}

let now = new Date();
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = formatDate(now);

//Feature 2 - Search city & temperature

function showWeatherCondition(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-weather").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#current-temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
}

function searchCity(city) {
  let apiKey = "b5a777ab71fc602967504eb64daf1657";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", handleSubmit);

searchCity("Paris");

// Current Location

function searchMyLocation(position) {
  let myLat = position.coords.latitude;
  let myLon = position.coords.longitude;
  let apiKey = "b5a777ab71fc602967504eb64daf1657";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchMyLocation);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);

//Feature 3 - Celcius vs Fahrenheit

function showCelcius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `17°C`;
}

function showFahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `66°F`;
}

let celciusTemp = document.querySelector("#celcius");
celciusTemp.addEventListener("click", showCelcius);

let fahrenheitTemp = document.querySelector("#fahrenheit");
fahrenheitTemp.addEventListener("click", showFahrenheit);
