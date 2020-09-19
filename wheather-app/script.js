const APIURL = `https://www.metaweather.com/api`;
const API_URL = `https://www.metaweather.com/api/location/search/?query=`;

async function getWeatherByLocation(location) {
  const response = await fetch(`${APIURL}/location/search/?query=${location}`);
  const responseData = await response.json();

  console.log(responseData);
}

getWeatherByLocation('london');
