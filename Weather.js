// Queries for the weather display div, search bar and search button
const weatherDiv = document.querySelector(".weather-display");
const weatherSearch = document.querySelector("#weather-search");
const searchBtn = document.querySelector("search-btn");

async function retrieveWeather(city, dateOne, dateTwo) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${dateOne}/${dateTwo}?key=S329784KNSJ2P88BJCQAY2UF5`);
        if(!response.ok){
            console.log("Could not get weather data");
            console.error(response.status, response.statusText);
            return null;
        } 
            const weatherData = await response.json();
            console.log(weatherData);
            return weatherData;
    } catch (error) {
        console.log(error);
        return null;
    }
}

retrieveWeather();

function displayWeather() { 

} 

// searchBtn.addEventListener("click", (e) => {

// })