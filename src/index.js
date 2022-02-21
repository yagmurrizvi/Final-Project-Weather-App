let now = new Date();
//get the current time
let currentTime = document.querySelector("i strong");

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

currentTime.innerHTML = `  ${hour}:${minute}`;

let date = now.getDate();
//get the current date
let currentDay = document.querySelector("#main-day strong");

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let dayFull = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

currentDay.innerHTML = `${day} | ${month} ${date}`;

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

//Forecast
function displayForecast(response) {
  console.log(response);
  let fiveDaysForecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  fiveDaysForecast.forEach(function (forecastDay, index) {
    let windForecast = Math.round(forecastDay.wind_speed);
    let humidForecast = forecastDay.humidity;
    let description = forecastDay.weather[0].main;
    let icon = "";
    if (index < 5) {
      if (description === "Clear" && hour <= 18) {
        icon = `<i class="fas fa-sun"></i>`;
      } else if (description === "Clear" && hour > 18) {
        icon = `<i class="fas fa-moon"></i>`;
      } else if (description === "Rain") {
        icon = `<i class="fas fa-cloud-showers-heavy"></i>`;
      } else if (description === "Drizzle") {
        icon = `<i class="fas fa-cloud-rain"></i>`;
      } else if (description === "Snow") {
        icon = `<i class="fas fa-snowflake"></i>`;
      } else if (description === "Thunderstorm") {
        icon = `<i class="fas fa-bolt-lightning"></i>`;
      } else if (description === "Clouds") {
        icon = `<i class="fas fa-cloud"></i>`;
      } else {
        icon = `<i class="fas fa-smog"></i>`;
      }

      forecastHTML =
        forecastHTML +
        `
      <div class="col-sm-2">
            <div class="card" id="info2" style="width: 10rem">
              <div class="card-body">
                <h5 class="card-title" id="second-day"><strong>${formatForecastDay(
                  forecastDay.dt
                )}</strong></h5>
                <h6 class="card-subtitle" id="description-forecast">${description}
                  <br/>
                  ${icon}
                </h6>
                <p class="card-text">
                ꜛ${Math.round(forecastDay.temp.max)}°C | ꜜ${Math.round(
          forecastDay.temp.min
        )}°C 
                  </br>
                  <i class="fas fa-wind"></i> ${windForecast}
                  </br>
                  💧 ${humidForecast}% 
                </p>
              </div>
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
  let apiKey = "525c9c9ac5b08ed476653a02fbaab704";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  console.log(response.data);
  //temp
  let temperature = Math.round(response.data.main.temp);
  let maxTemperature = document.querySelector("#temperature");
  maxTemperature.innerHTML = temperature;

  //Weather description and weather icon
  let description = response.data.weather[0].main;
  let mainDesc = document.querySelector("#first-day-description");
  if (description === "Clear" && hour <= 18) {
    mainDesc.innerHTML = `${description} </br> <i class="fas fa-sun"></i>`;
  } else if (description === "Clear" && hour > 18) {
    mainDesc.innerHTML = `${description} </br> <i class="fas fa-moon"></i>`;
  } else if (description === "Rain") {
    mainDesc.innerHTML = `${description} </br> <i class="fas fa-cloud-showers-heavy"></i>`;
  } else if (description === "Drizzle") {
    mainDesc.innerHTML = `${description} </br> <i class="fas fa-cloud-rain"></i>`;
  } else if (description === "Snow") {
    mainDesc.innerHTML = `${description} </br> <i class="fas fa-snowflake"></i>`;
  } else if (description === "Thunderstorm") {
    mainDesc.innerHTML = `${description} </br> <i class="fas fa-bolt-lightning"></i>`;
  } else if (description === "Clouds") {
    mainDesc.innerHTML = `${description} </br> <i class="fas fa-cloud"></i>`;
  } else {
    mainDesc.innerHTML = `${description} </br> <i class="fas fa-smog"></i>`;
  }

  //Wind
  let speedElement = document.querySelector("#wind");
  speedElement.innerHTML = Math.round(response.data.wind.speed);

  //Humidity
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let weatherDescription = response.data.weather[0].main;
  let h1 = document.querySelector("#name");

  if (weatherDescription === "Rain" || weatherDescription === "Drizzle") {
    h1.innerHTML = `${response.data.name} <i class="fas fa-umbrella"></i>`;
  } else if (weatherDescription === "Snow") {
    h1.innerHTML = `${response.data.name} <i class="fas fa-snowman"></i>`;
  } else if (weatherDescription === "Clear") {
    h1.innerHTML = `${response.data.name} <i class="fas fa-sun"></i>`;
  } else if (weatherDescription === "Thunderstorm") {
    h1.innerHTML = `${response.data.name} <i class="fas fa-house"></i>`;
  } else {
    h1.innerHTML = `${response.data.name}`;
  }

  getForecast(response.data.coord);
}

function city(event) {
  event.preventDefault();

  let cityElement = document.querySelector("#name");
  cityElement.innerHTML = "Hamburg";
  let cityInput = document.querySelector("#search-city");
  cityElement.innerHTML = `${cityInput.value}`;
  searchCity(cityInput.value);
  cityInput.value = "";
}

function searchCity(cityName) {
  let apiKey = "525c9c9ac5b08ed476653a02fbaab704";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
searchCity("Hamburg");

let searchCityName = document.querySelector("#search-form");
searchCityName.addEventListener("submit", city);

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "525c9c9ac5b08ed476653a02fbaab704";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function position(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

let current = document.querySelector("#current-button");
current.addEventListener("click", position);
