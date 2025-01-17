import WEATHER_API_KEY from './key.js';
//import fetch from "node-fetch";
//fetch = require("node-fetch");
//WEATHER_API_KEY= require ( "./key.js");

window.onload = function triggerPage() {

  //callLatandLon("Vancouver");
  getLocation();
}


const callLatandLon = function getLatAndLon(cityName) {

  fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=' + WEATHER_API_KEY.WEATHER_API_KEY)
    .then(function (resp) { return resp.json() }) // Convert data to json
    .then(function (data) {
      //edit name city using the API name tag
      let cityNameTag = document.getElementById("city_Name");

      cityNameTag.textContent = data[0].name;

      callAPI1(data[0].lat, data[0].lon);


    })
    .catch(function () {
      // catch any errors
      console.log('Error1');
    });

}

//callAPI('Vancouver');
//callLatandLon('Vancouver');




const callAPI1 = function getWeatherFull(lat, lon) {
  console.log('lat=' + lat);
  console.log('lon=' + lon);


  fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=metric&exclude=minutely,alerts&appid=' + WEATHER_API_KEY.WEATHER_API_KEY)
    .then(function (resp) { return resp.json() }) // Convert data to json
    .then(function (data) {

      drawWeather(data);
      //console.log(data);
      //  console.log('CURRENT');
      //  console.log(data.current);
      //  console.log('HOURLY');
      //  console.log(data.hourly);
      //  console.log('DAILY');
      //  console.log(data.daily);


    })
    .catch(function () {
      // catch any errors
      console.log('Error2');
    });



}


const drawMainSectionInfo = function () {
  let divMainSection = document.createElement('div');
  divMainSection.className = 'main-section';

  let divSelectFavoriteCities = document.createElement('div');
  divSelectFavoriteCities.className = 'select-favorite-cities';

  let selectFavoriteCities = document.createElement('Select');
  selectFavoriteCities.id = 'filter-select';

  let optionFilter = document.createElement('option');
  optionFilter.id = 'favorite-cities';
  optionFilter.value = 'fav-city';
  optionFilter.label = 'Favorite Cities';

  let divSearchBarCities = document.createElement('div');
  divSearchBarCities.className = 'search-bar-cities';

  let inputSearchBarCities = document.createElement('input');
  inputSearchBarCities.id = 'search-input';
  inputSearchBarCities.placeholder = 'Enter City Name';

  let sectionToBody = document.getElementById("in-flex");

  sectionToBody.appendChild(divMainSection);
  divMainSection.appendChild(divSelectFavoriteCities);
  divSelectFavoriteCities.appendChild(selectFavoriteCities);
  selectFavoriteCities.appendChild(optionFilter);
  divMainSection.appendChild(divSearchBarCities);
  divSearchBarCities.appendChild(inputSearchBarCities);



}

const drawCurrentWeather = function (d) {

  const currentTemp = d.current.temp;
  const feelsLike = d.current.feels_like;
  const uvi = d.current.uvi;
  const humidity = d.current.humidity;
  const nameWeather = d.current.weather[0].main;

  let city = document.getElementById("city_Name");
  let cityName = city.innerHTML;

  let h3CurrentWeather = document.createElement('h3');
  h3CurrentWeather.id = 'h3-current-weather';
  h3CurrentWeather.textContent = "Current Weather";

  let divInFlexCurrentWeather = document.createElement('div');
  divInFlexCurrentWeather.className = 'in-flex-current-weather';

  let h1CityName = document.createElement('h1');
  h1CityName.id = 'h1-city-name';
  h1CityName.textContent = cityName;

  let btnFavorite = document.createElement('button');
  btnFavorite.className = 'fa-solid fa-star';

  let divWeatherInfo = document.createElement('div');
  divWeatherInfo.className = 'weather-info';

  let h3WeatherInfo = document.createElement('p');
  h3WeatherInfo.id = 'p-weather-info';
  h3WeatherInfo.textContent = "Weather Information";

  let imgIconWeather = document.createElement('img');
  imgIconWeather.id = 'img-icon-weather';
  imgIconWeather.src = 'http://openweathermap.org/img/wn/' + d.current.weather[0].icon + '.png';


  let pNameWeather = document.createElement('p');
  pNameWeather.id = 'p-name-weather';
  pNameWeather.textContent = nameWeather;


  let pCurrentTemp = document.createElement('p');
  pCurrentTemp.id = 'p-current-temp';
  pCurrentTemp.textContent = "Temperature: ";

  let labelCurrentTemp = document.createElement('label');
  labelCurrentTemp.id = 'label-current-temp';
  labelCurrentTemp.textContent = currentTemp + "°C";

  let pFeelsLike = document.createElement('p');
  pFeelsLike.id = 'p-feels-like';
  pFeelsLike.textContent = "Feels like: ";

  let labelFeelsLike = document.createElement('label');
  labelFeelsLike.id = 'label-feels-like';
  labelFeelsLike.textContent = feelsLike + "°C";

  let pUvi = document.createElement('p');
  pUvi.id = 'p-uvi';
  pUvi.textContent = "uvi: ";

  let labelUvi = document.createElement('label');
  labelUvi.id = 'label-uvi';
  labelUvi.textContent = uvi;

  let pHumidity = document.createElement('p');
  pHumidity.id = 'p-humidity';
  pHumidity.textContent = "Humidity: ";

  let labelHumidity = document.createElement('label');
  labelHumidity.id = 'label-humidity';
  labelHumidity.textContent = humidity + "%";


  let sectionToBody = document.getElementById("in-flex");

  sectionToBody.appendChild(h3CurrentWeather);
  sectionToBody.appendChild(divInFlexCurrentWeather);
  divInFlexCurrentWeather.appendChild(h1CityName);
  divInFlexCurrentWeather.appendChild(btnFavorite);
  divInFlexCurrentWeather.appendChild(divWeatherInfo);
  divWeatherInfo.appendChild(h3WeatherInfo);
  divWeatherInfo.appendChild(imgIconWeather);
  divWeatherInfo.appendChild(pNameWeather);
  divWeatherInfo.appendChild(pCurrentTemp);
  pCurrentTemp.appendChild(labelCurrentTemp);
  pCurrentTemp.appendChild(pFeelsLike);
  pFeelsLike.appendChild(labelFeelsLike);
  pFeelsLike.appendChild(pHumidity);
  pHumidity.appendChild(labelHumidity);
  pHumidity.appendChild(pUvi);
  pUvi.appendChild(labelUvi);

  btnFavorite.onclick = function () {

    //* select
    let selectElement = document.getElementById('filter-select');

    //* option
    let saveCity = document.getElementById('favorite-cities');
    saveCity.label = cityName;
    console.log("Save City: " + saveCity.label);

    localStorage.setItem("save-city", saveCity.label);
    console.log(localStorage.getItem("save-city"));

    selectElement.appendChild(saveCity);

  }

}


const drawFiveDays = function (d) {
  let h3dailyWeather = document.createElement('h3');
  h3dailyWeather.id = 'daily-forecast-h3';
  h3dailyWeather.textContent = "Daily Weather";

  let divInFlexdailyWeather = document.createElement('div');
  divInFlexdailyWeather.className = 'in-flex-daily-forescat';


  for (let i = 1; i < 6; i++) {
    const date = new Date(d.daily[i].dt * 1000);
    const dailyDayTemp = d.daily[i].temp.day;
    const dailyNightTemp = d.daily[i].temp.night;
    const weather = d.daily[i].weather[0].main;
    // const sunrise = new Date (d.daily[i].sunrise * 1000);
    // const sunset = new Date (d.daily[i].sunset * 1000);

    let divWeatherInfo = document.createElement('div');
    divWeatherInfo.className = 'days';

    // let h3WeatherInfo = document.createElement('h3');
    // h3WeatherInfo.id = 'h3-weather-info';
    // h3WeatherInfo.textContent = "Weather Information";

    let img_icon = document.createElement('img');
    img_icon.src = 'http://openweathermap.org/img/wn/' + d.daily[i].weather[0].icon + '.png';

    let pDate = document.createElement('p');
    pDate.id = 'p-date';
    // pDate.textContent = "Date: ";

    let labelDate = document.createElement('label');
    labelDate.id = 'label-date';
    labelDate.textContent = date.toLocaleDateString();

    let pDailyDayTemp = document.createElement('p');
    pDailyDayTemp.id = 'p-daily-day-temp';
    pDailyDayTemp.textContent = "Day Temperature: ";

    let labelDailyDayTemp = document.createElement('label');
    labelDailyDayTemp.id = 'label-daily-day-temp';
    labelDailyDayTemp.textContent = dailyDayTemp + "°C";

    let pDailyNightTemp = document.createElement('p');
    pDailyNightTemp.id = 'p-daily-night-temp';
    pDailyNightTemp.textContent = "Night Temperature: ";

    let labelDailyNightTemp = document.createElement('label');
    labelDailyNightTemp.id = 'label-daily-night-temp';
    labelDailyNightTemp.textContent = dailyNightTemp + "°C";

    let pWeather = document.createElement('p');
    pWeather.id = 'p-weather';
    pWeather.textContent = "";

    let labelWeather = document.createElement('label');
    labelWeather.id = 'label-weather';
    labelWeather.textContent = weather;

    let sectionToBody = document.getElementById("in-flex");

    divWeatherInfo.appendChild(pDate);
    pDate.appendChild(labelDate);
    sectionToBody.appendChild(h3dailyWeather);
    sectionToBody.appendChild(divInFlexdailyWeather);
    divInFlexdailyWeather.appendChild(divWeatherInfo);
    divWeatherInfo.appendChild(img_icon);
    divWeatherInfo.appendChild(pWeather);
    pWeather.appendChild(labelWeather);
    // divWeatherInfo.appendChild(h3WeatherInfo);
    divWeatherInfo.appendChild(pDailyDayTemp);
    pDailyDayTemp.appendChild(labelDailyDayTemp);
    divWeatherInfo.appendChild(pDailyNightTemp);
    pDailyNightTemp.appendChild(labelDailyNightTemp);
    // divWeatherInfo.appendChild(pSunrise);
    // pSunrise.appendChild(labelSunrise);
    // divWeatherInfo.appendChild(pSunset);
    // pSunset.appendChild(labelSunset);
  }
}


function placeSearch() {
  let options = {
    types: ['(cities)'],
  };

  let input = document.getElementById('search-input');
  let searchBox = new google.maps.places.Autocomplete(input, options);
}

// here we draw all the jsonResponse into our webPage (dinamically or by DOM)
function drawWeather(d) {

  console.log(d)
  drawMainSectionInfo();
  drawCurrentWeather(d);
  drawFiveDays(d);
  drawhourlyForecast(d);
  placeSearch();
  return d;
}

const drawhourlyForecast = function (d) {
  //console.log('HOURLY');
  const d1 = new Date(d.hourly[0].dt * 1000);
  const d2 = new Date(d.hourly[3].dt * 1000);
  const d3 = new Date(d.hourly[6].dt * 1000);
  const d4 = new Date(d.hourly[9].dt * 1000);
  const d5 = new Date(d.hourly[12].dt * 1000);
  const d6 = new Date(d.hourly[15].dt * 1000);
  const d7 = new Date(d.hourly[18].dt * 1000);
  const d8 = new Date(d.hourly[21].dt * 1000);

  //to get the proper tome zone (vancouver time )
  // d1.setHours(d1.getHours() - 7);
  // d2.setHours(d1.getHours() - 7);
  // d3.setHours(d1.getHours() - 7);

  // console.log(d1.toUTCString());
  // console.log(d2.toUTCString());
  // console.log(d3.toUTCString());
  // console.log(d4.toUTCString());
  // console.log(d5.toUTCString());
  // console.log(d6.toUTCString());
  // console.log(d7.toUTCString());
  // console.log(d8.toUTCString());
  //console.log(m); 

  //var date = new Date(d * 1000);


  let div_hourly_forecast = document.createElement('div');
  div_hourly_forecast.className = 'in-flex-hourly-forecast';


  let h3_hourly = document.createElement('p');
  h3_hourly.id = 'hourly-forecast-h3';
  h3_hourly.textContent = 'Hourly Forecast';

  let div_hour_range = document.createElement('div');
  div_hour_range.className = 'hour-range';

  let sectionToBody = document.getElementById("in-flex");


  sectionToBody.appendChild(h3_hourly);



  let auxfirst = 0;
  let auxsecond = 3;

  for (let i = 0; i < 8; i++) {

    let div_hours = document.createElement('div');
    div_hours.className = 'hours';

    let h4_hour_range_title = document.createElement('p');
    h4_hour_range_title.textContent = 'Hours range';

    let h4_hour_range = document.createElement('p');
    h4_hour_range.textContent = auxfirst + '-' + auxsecond;

    let h5_temp = document.createElement('p');
    h5_temp.textContent = 'Temperature: ' + d.hourly[i].temp + '(C)';

    let h5_weather = document.createElement('p');
    h5_weather.textContent = 'Weather : ' + d.hourly[i].weather[0].description;
    let h5_weather_description = document.createElement('p');
    h5_weather_description.textContent = 'Description: ' + d.hourly[i].weather[0].description;

    let img_icon = document.createElement('img');
    img_icon.src = 'http://openweathermap.org/img/wn/' + d.hourly[i].weather[0].icon + '.png';


    div_hours.appendChild(img_icon);
    div_hours.appendChild(h4_hour_range);
    div_hours.appendChild(h5_temp);
    div_hours.appendChild(h5_weather);

    div_hour_range.appendChild(div_hours);

    auxfirst = auxfirst + 3;
    auxsecond = auxsecond + 3;

  }

  div_hourly_forecast.appendChild(div_hour_range);

  sectionToBody.appendChild(div_hourly_forecast);


}

document.addEventListener('keypress', function (e) {

  if (e.key === "Enter") {

    let input = document.getElementById("search-input");

    if (input.value != null && input.value != "") {

      document.getElementById("in-flex").remove();
      let section = document.createElement('section');
      section.id = 'in-flex';
      document.body.appendChild(section);

      callLatandLon(input.value);

    } else {

      alert('please insert a valid city name ');

    }


  }

});

var x = document.getElementById("demo");
function getLocation() {
  if (navigator.geolocation) {
    console.log('Inside getLocation');
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}


function showPosition(position) {
  x.innerHTML = "";
  reverseGeo(position.coords.latitude, position.coords.longitude);
  callAPI1(position.coords.latitude, position.coords.longitude);

}

const reverseGeo = function getcityName(lat, lon) {

  fetch(' http://api.openweathermap.org/geo/1.0/reverse?lat=' + lat + '&lon=' + lon + '&limit=5&appid=' + WEATHER_API_KEY.WEATHER_API_KEY)
    .then(function (resp) { return resp.json() }) // Convert data to json
    .then(function (data) {
      //edit name city using the API name tag
      let cityNameTag = document.getElementById("city_Name");

      cityNameTag.textContent = data[0].name;


    })
    .catch(function () {
      // catch any errors
      console.log('Error');
    });

}

