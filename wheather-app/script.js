const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

const APIURL = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = search.value;

  if (city) {
    getWeatherBycity(city);
  }
  search.value = "";
});

async function getWeatherBycity(city) {
  const response = await fetch(APIURL(city));
  let responseData = await response.json();
  responseData.city = city;
  console.log(responseData);

  addWeaterToPage(responseData);
}

function addWeaterToPage(data) {
  const temp = KtoC(data.main.temp);

  const weather = document.createElement("div");
  weather.classList.add("weather");

  weather.innerHTML = `
    <h2>${temp}ºC</h2>
    <img src="https://api.openweathermap.org/img/w/${data.weather[0].icon}.png">
  `;
  main.innerHTML = "";

  main.appendChild(weather);
}
function KtoC(F) {
  return (F - 273.15).toFixed(2);
}
