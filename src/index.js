let now = new Date();
let today = document.querySelector(".current-time");

let hours = now.getHours();
let minutes = now.getMinutes();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let weekday = days[now.getDay()];
today.innerHTML= `${weekday} ${hours}:${minutes}`;

function editTemp (response) {

let temperature = Math.round(response.data.main.temp);
let humidity = Math.round(response.data.main.humidity);
let wind = Math.round(response.data.wind.speed);
console.log ("hello 2");
let temperaturedisplay = document.querySelector("#temperature");
temperaturedisplay.innerHTML = `${temperature}°C`;
let humidityElement = document.querySelector("#humidity");
humidityElement.innerHTML =`${humidity}`;
let windElement = document.querySelector("#wind");
windElement.innerHTML =`${wind}`;


}

function displayCity(event){
event.preventDefault();
let apiKey = "8642e71d13ee9b1f2a3fb493a276fb59";
let citydisplay = document.querySelector("#cityheading");
let currentcity = document.querySelector("#city-input");
let apiStart = "https://api.openweathermap.org/data/2.5/weather?";
let apiUrl = `${apiStart}q=${currentcity.value}&appid=${apiKey}&units=metric`;
citydisplay.innerHTML = `${currentcity.value}`
console.log (apiUrl);
axios.get(apiUrl).then(editTemp);

}
function editHeading (response){
console.log (response);
console.log (response.data.name);
let citydisplay = document.querySelector("#cityheading");
citydisplay.innerHTML = `${response.data.name}`;
let temperature = Math.round(response.data.main.temp);
console.log (temperature);
let humidity = Math.round(response.data.main.humidity);
let wind = Math.round(response.data.wind.speed);
let temperaturedisplay = document.querySelector("#temperature");
temperaturedisplay.innerHTML = `${temperature}°C`;
let humidityElement = document.querySelector("#humidity");
humidityElement.innerHTML =`${humidity}`;
let windElement = document.querySelector("#wind");
windElement.innerHTML =`${wind}`;
}

function showCurrentPosition (position) {

   console.log(position);

  let apiKey = "8642e71d13ee9b1f2a3fb493a276fb59";

  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let long = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(editHeading);

}

function displayCurrentcity(event)
{
console.log ("hello");
navigator.geolocation.getCurrentPosition(showCurrentPosition);

}


let city = document.querySelector("#location-form");
city.addEventListener("submit",displayCity);

function changeUnit(){

let checkBox = document.querySelector("#formSwitchCheckDefault");
let temp = document.querySelector("#temperature");

if (checkBox.checked == true) {
  temp.innerHTML = `7°F`;
} else {
  temp.innerHTML = `18°C`
}

}

let unit = document.querySelector("#formSwitchCheckDefault");
unit.addEventListener ("click", changeUnit );

let currentlocation = document.querySelector("#current-location-button");
currentlocation.addEventListener ("click", displayCurrentcity);
