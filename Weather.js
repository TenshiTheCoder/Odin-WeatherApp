// Queries for the weather display div, search bar and search button
const weatherDiv = document.querySelector(".weather-display");
const weatherSearch = document.querySelector("#weather-search");
const searchBtn = document.querySelector("#search-btn");

async function retrieveWeather(location, dateOne, dateTwo) {
    try {
        let baseURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/`;
        if(dateOne){
            baseURL += `/${dateOne}`;
        }

        if(dateOne && dateTwo){
            baseURL += `/${dateTwo}`;
        }

        baseURL += `?key=S329784KNSJ2P88BJCQAY2UF5`;
        console.log("Final URL is: ", baseURL);

        const response = await fetch(baseURL);
        if(!response.ok){
            throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
        } 
            const weatherData = await response.json();
            const data = {
                address: weatherData.address,
                days: weatherData.days.slice(0, 7)
            }
            console.log(data);
            return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

function displayWeather(data) { 
    weatherDiv.innerHTML = "";
    const addressName = document.createElement("h2");
    addressName.classList.add("address-name");
    addressName.textContent = `Displaying weather for: ${data.address}`;
    weatherDiv.append(addressName);

    const weatherTable = document.createElement("table");
    weatherTable.classList.add("weather-table");

    const tableHead = document.createElement("thead");
    tableHead.classList.add("table-head");

    const headerRow = document.createElement("tr");
    headerRow.classList.add("header-row");
    
    const dateTime = document.createElement("th");
    dateTime.textContent = "Date / Time";

    const maxTemp = document.createElement("th");
    maxTemp.textContent = "Maximum Temperature (F)";

    const minTemp = document.createElement("th");
    minTemp.textContent = "Minimum Temperature (F)";

    const feelsLike = document.createElement("th");
    feelsLike.textContent = "Feels Like (F)";

    const feelsLikeMax = document.createElement("th");
    feelsLikeMax.textContent = "Maximum Feels Like (F)";

    const feelsLikeMin = document.createElement("th");
    feelsLikeMin.textContent = "Minimum Feels Like (F)";

    const dayDesc = document.createElement("th");
    dayDesc.textContent = "Description";

    const dayConditions = document.createElement("th");
    dayConditions.textContent = "Conditions";

    headerRow.append(
        dateTime, 
        maxTemp, 
        minTemp, 
        feelsLike, 
        feelsLikeMax, 
        feelsLikeMin, 
        dayDesc, 
        dayConditions
    )

    tableHead.append(headerRow);
    weatherTable.append(tableHead);

    const tableBody = document.createElement("tbody");
    weatherTable.appendChild(tableBody);

    data.days.forEach((day) => {
        const cellRow = document.createElement("tr");
        
        const dateCell = document.createElement("td");
        dateCell.textContent = day.datetime;

        const maxCell = document.createElement("td");
        maxCell.textContent = day.tempmax;

        const minCell = document.createElement("td");
        minCell.textContent = day.tempmin;

        const feelsLikeCell = document.createElement("td");
        feelsLikeCell.textContent = day.feelslike;

        const feelsMaxCell = document.createElement("td");
        feelsMaxCell.textContent = day.feelslikemax;

        const feelsMinCell = document.createElement("td");
        feelsMinCell.textContent = day.feelslikemin;

        const descCell = document.createElement("td");
        descCell.textContent = day.description;

        const conditionCell = document.createElement("td");
        conditionCell.textContent = day.conditions;

        cellRow.append(
            dateCell, 
            maxCell, 
            minCell, 
            feelsLikeCell, 
            feelsMaxCell, 
            feelsMinCell, 
            descCell, 
            conditionCell
        )
        tableBody.append(cellRow);
    })
    weatherDiv.appendChild(weatherTable);
} 

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const location = weatherSearch.value;
    retrieveWeather(location)
        .then(data => displayWeather(data));
    weatherSearch.value = "";
})