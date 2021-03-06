let now = new Date();
let today = document.querySelector(".current-time");

let hours = now.getHours();
let minutes = now.getMinutes();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let weekday = days[now.getDay()];
today.innerHTML= `${weekday} ${hours}:${minutes}`;


function displayCity(event){
event.preventDefault();
let apiKey = "8642e71d13ee9b1f2a3fb493a276fb59";
let citydisplay = document.querySelector("#cityheading");
let currentcity = document.querySelector("#city-input");
let apiStart = "https://api.openweathermap.org/data/2.5/weather?";
let apiUrl = `${apiStart}q=${currentcity.value}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(editHeading);

}

function formatDate (timestamp){
  let date = new Date(timestamp*1000);
  let day = date.getDay();
  let days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  return days[day];


}

function displayForecast (response) { 
console.log(response);
let forecast = response.data.daily;
let forecastamElement = document.querySelector("#forecastam");
let forecastpmElement = document.querySelector("#forecastpm");
let forecastamHtml =  `    <div class="row am">
      <div class="col-sm">
        <p>
        <div class="time">
          am
        </div>

        </p>
      </div>
     
    `;
forecast.forEach(function (forecastDay,index) {
  if (index < 6 && index > 0) {
forecastamHtml = forecastamHtml + `<div class="col-sm">
        <p>
        <div class="symbol">
          <img src="images/iconweather-${forecastDay.weather[0].icon}.png" class="symbola" />
        </div> 
        <div class="date">
          ${formatDate(forecastDay.dt)}
        </div>
        <div class="forecast">
          ${Math.round(forecastDay.temp.max)}° <span class="low">${Math.round(forecastDay.temp.min)}°</span>
        </div>

        </p>

`;

forecastamHtml = forecastamHtml + `</div>`;
forecastamElement.innerHTML = forecastamHtml;
}});

let forecastpmHtml =  `    <div class="row pm">
      <div class="col-sm">
        <p>
        <div class="time">
          pm
        </div>

        </p>
      </div>
     
    `;
forecast.forEach(function (forecastDay, index) {
  if (index < 6 && index > 0){
let icon = forecastDay.weather[0].icon;
let newIcon = icon.replace(/d/g, "n");
forecastpmHtml = forecastpmHtml + `<div class="col-sm">
        <p>
        <div class="symbol">
          <img src="images/iconweather-${newIcon}.png" class="symbola" />
        </div>
        <div class="date">
          ${formatDate(forecastDay.dt)}
        </div>
        <div class="forecast">
${Math.round(forecastDay.temp.eve)}° <span class="low">${Math.round(forecastDay.temp.night)}° </span>       </div>

        </p>

`;

forecastpmHtml = forecastpmHtml + `</div>`;
forecastpmElement.innerHTML = forecastpmHtml;
}});

}

function editHeading (response){
console.log (response);
console.log (response.data.name);
let citydisplay = document.querySelector("#cityheading");
citydisplay.innerHTML = `${response.data.name}`;
let temperature = Math.round(response.data.main.temp);
console.log (temperature);
celsiustemperature = Math.round(response.data.main.temp);
let humidity = Math.round(response.data.main.humidity);
let wind = Math.round(response.data.wind.speed);
let temperaturedisplay = document.querySelector("#temperature");
temperaturedisplay.innerHTML = `${temperature}°C`;
let humidityElement = document.querySelector("#humidity");
humidityElement.innerHTML =`${humidity}`;
let windElement = document.querySelector("#wind");
windElement.innerHTML =`${wind}`;
let iconElement = document.querySelector("#icon");
iconElement.setAttribute("src", `images/iconweather-${response.data.weather[0].icon}.png`);
iconElement.setAttribute("alt", `${response.data.weather[0].description}`);
let descriptionElement = document.querySelector("#description");
descriptionElement.innerHTML = `${response.data.weather[0].description}`;
let apiforecastKey = "8642e71d13ee9b1f2a3fb493a276fb59";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=${apiforecastKey}&units=metric`;
console.log (apiUrl);
axios.get(apiUrl).then(displayForecast);
let precipitationElement = document.querySelector("#precipitation");
precipitationElement.innerHTML = `${response.data.rain['1h']}`;
}


function showCurrentPosition (position) {

  let apiKey = "8642e71d13ee9b1f2a3fb493a276fb59";
  let long = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(editHeading);

}

function displayCurrentcity(event)
{
navigator.geolocation.getCurrentPosition(showCurrentPosition);

}


let city = document.querySelector("#location-form");
city.addEventListener("submit",displayCity);

function changeUnit(){

let checkBox = document.querySelector("#formSwitchCheckDefault");
let temp = document.querySelector("#temperature");

if (checkBox.checked == true) {
  temp.innerHTML = `${Math.round((celsiustemperature * 9)/5  + 32 )}°F`;
} else {
  temp.innerHTML = `${celsiustemperature}°C`
}

}

let unit = document.querySelector("#formSwitchCheckDefault");
unit.addEventListener ("click", changeUnit );

let currentlocation = document.querySelector("#current-location-button");
currentlocation.addEventListener ("click", displayCurrentcity);

let celsiustemperature = null;

displayCurrentcity();
displayForecast ();