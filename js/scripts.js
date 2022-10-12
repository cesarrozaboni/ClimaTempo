const API_KEY = "4d9a1294d92099fed40af6665253a84b";
const API_COUNTRY_URL = "https://countryflagsapi.com/png/";

const cityInput = document.querySelector("#city-input");
const searchBtn =  document.querySelector("#search");

const cityElement        = document.querySelector("#city");
const tempElement        = document.querySelector("#temperature span");
const descElement        = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement     = document.querySelector("#country");
const humidityElement    = document.querySelector("#humidity span");
const windElement        = document.querySelector("#wind span");
const weatherContainer   = document.querySelector("#weather-data");

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    const city = cityInput.value;
    showWeatherData(city);
})

cityInput.addEventListener("keyup", (e) => {
    e.preventDefault();

    const city = cityInput.value;
    showWeatherData(city);
})

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    cityElement.innerHTML     = data.name;
    tempElement.innerHTML     = parseInt(data.main.temp);
    descElement.innerHTML     = data.weather[0].description;
    humidityElement.innerHTML = `${data.main.humidity}%`; 
    windElement.innerHTML     = `${data.wind.speed}km`;
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", API_COUNTRY_URL + data.sys.country);
    
    weatherContainer.classList.remove("hide");
}

const getWeatherData = async(city) => {
    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=pt_br`;

    const res  = await fetch(apiWeatherUrl);
    const data = await res.json();
    return data;
}