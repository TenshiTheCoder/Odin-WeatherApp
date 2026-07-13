// Queries for the weather display div, search bar and search button
const weatherDiv = document.querySelector(".weather-display");
const weatherSearch = document.querySelector("#weather-search");
const searchBtn = document.querySelector("#search-btn");
const formBtn = document.querySelector("#form-btn");
const resetBtn = document.querySelector(".reset-btn");
const displayBtns = document.querySelector(".change-display");
const basicUnit = document.querySelector(".basic-unit");

const weatherDataStore = {};
let locationSelector;
let currentDateOne = "";
let currentDateTwo = "";

async function retrieveWeather(location, dateOne, dateTwo, unit = "us") {
    try {
        let baseURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}`;
        if (dateOne && dateTwo) {
            baseURL += `/${dateOne}/${dateTwo}`;
        } else if (dateOne) {
            baseURL += `/${dateOne}`;
        }

        baseURL += `?unitGroup=${unit}&key=S329784KNSJ2P88BJCQAY2UF5`;
        console.log("Location:", location);
        console.log("Date Two:", dateOne);
        console.log("Date Two:", dateTwo);
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

function displayWeather(data, unit) { 
    weatherDiv.innerHTML = "";

    const degreeSymbol = unit === "metric" ? "C" : "F";

    const addressName = document.createElement("h2");
    addressName.classList.add("address-name");
    if(!data) {
        weatherDiv.textContent = "Weather data could not be retrieved";
        return;
    }
    weatherDiv.innerHTML = "";
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
    maxTemp.textContent = `Maximum Temperature (${degreeSymbol})`;

    const minTemp = document.createElement("th");
    minTemp.textContent = `Minimum Temperature (${degreeSymbol})`;

    const feelsLike = document.createElement("th");
    feelsLike.textContent = `Feels Like (${degreeSymbol})`;

    const feelsLikeMax = document.createElement("th");
    feelsLikeMax.textContent = `Maximum Feels Like (${degreeSymbol})`;

    const feelsLikeMin = document.createElement("th");
    feelsLikeMin.textContent = `Minimum Feels Like (${degreeSymbol})`;

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
    const unit = basicUnit.value;
    console.log(basicUnit.value);

    retrieveWeather(location, "", "", unit)
        .then(data => {
            if (data) {
                displayWeather(data, unit);
            }
        });

    weatherSearch.value = "";
});

function showWeatherForm() {
    let inputCount = 1;

    const weatherDialog = document.createElement("dialog");
    weatherDialog.classList.add("weather-dialog");

    const weatherForm = document.createElement("form");
    weatherForm.classList.add("weather-form");

    const locationInputLabel = document.createElement("label");
    locationInputLabel.htmlFor = "location-input";
    locationInputLabel.textContent = "Locations: "

    const locationInput = document.createElement("input");
    locationInput.id = "location-input";
    locationInput.placeholder = "Search for a 7 day forecast";

    const locationContainer = document.createElement("div");
    locationContainer.classList.add("location-container");
    locationContainer.append(locationInputLabel, locationInput);

    const addFieldBtn = document.createElement("button");
    addFieldBtn.id = "add-field";
    addFieldBtn.textContent = "+"

    addFieldBtn.addEventListener("click", (e) => {
        e.preventDefault();
        inputCount++;

        const newInput = document.createElement("input");
        newInput.id = `location-${inputCount}`;
        newInput.placeholder = "Enter another location";

        locationContainer.append(newInput);
    })

    const dateOneLabel = document.createElement("label");
    dateOneLabel.htmlFor = "date-one"
    dateOneLabel.textContent = "Start Date: "

    const dateOneInput = document.createElement("input");
    dateOneInput.id = "date-one";
    dateOneInput.type ="date";

    const dateTwoLabel = document.createElement("label");
    dateTwoLabel.htmlFor = "date-two";
    dateTwoLabel.textContent = "End Date: "

    const dateTwoInput = document.createElement("input");
    dateTwoInput.id = "date-two";
    dateTwoInput.type ="date";

    const degreeSelect = document.createElement("select");
    degreeSelect.id = "degree-select";

    const fahrenheitOption = document.createElement("option");
    fahrenheitOption.value = "us";
    fahrenheitOption.textContent = "°F";

    const celsiusOption = document.createElement("option");
    celsiusOption.value = "metric";
    celsiusOption.textContent = "°C";

    degreeSelect.append(fahrenheitOption, celsiusOption);

    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.classList.add("submit-form");
    submitBtn.textContent = "Submit";

    const closeBtn = document.createElement("button");
    closeBtn.classList.add("close-btn");
    closeBtn.type = "button";
    closeBtn.textContent = "Close";
    closeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        weatherDialog.close();
    })

    weatherForm.append(
        locationContainer,
        addFieldBtn,
        dateOneLabel,
        dateOneInput,
        dateTwoLabel,
        dateTwoInput,
        degreeSelect,
        submitBtn,
        closeBtn
    )

    weatherDialog.appendChild(weatherForm);
    document.body.appendChild(weatherDialog);
    weatherDialog.showModal();

    weatherForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const locationInputs = document.querySelectorAll(".location-container input");

    const locations = Array.from(locationInputs)
        .map(input => input.value)
        .filter(location => location !== "");

    let firstLocationData = null;

    currentDateOne = dateOneInput.value;
    currentDateTwo = dateTwoInput.value;

    for (const location of locations) {
        const data = await retrieveWeather(
            location,
            dateOneInput.value,
            dateTwoInput.value,
            degreeSelect.value
        );

        if (data) {
            weatherDataStore[location] = data;

            if (!firstLocationData) {
                firstLocationData = data;
            }
        }
    }

    createLocationDropdown();
    createUnitSelect();

    if (firstLocationData) {
        displayWeather(firstLocationData);
    }

    weatherDialog.close();
});

    weatherDialog.addEventListener("close", () => {
        weatherDialog.remove();
    })
}

formBtn.addEventListener("click", () => {
    showWeatherForm();
})

function createLocationDropdown() {
    locationSelector = document.createElement("select");
    locationSelector.classList.add("location-selector");

    Object.keys(weatherDataStore).forEach(location => {
        const option = document.createElement("option");
        option.value = location;
        option.textContent = location;

        locationSelector.append(option);
    });

    locationSelector.addEventListener("change", () => {
        const selectedLocation = locationSelector.value;
        displayWeather(weatherDataStore[selectedLocation]);
    });

    displayBtns.appendChild(locationSelector);
}

function createUnitSelect(){
    const unitSelect = document.createElement("select");
    unitSelect.classList.add("unit-select");
    
    const metricOption = document.createElement("option");
    metricOption.value = "metric";
    metricOption.textContent = "Metric";

    const usOption = document.createElement("option");
    usOption.value = "us";
    usOption.textContent = "US";

    const selectedUnit = unitSelect.value;
    console.log(selectedUnit);

    unitSelect.append(metricOption, usOption);

    unitSelect.addEventListener("change", async () => {
        const selectedUnit = unitSelect.value;
        const selectedLocation = locationSelector.value;

        const data = await retrieveWeather(
            selectedLocation,
            currentDateOne,
            currentDateTwo,
            selectedUnit
        );

    if (data) {
        weatherDataStore[selectedLocation] = data;
        displayWeather(data, selectedUnit);
    }
});

    displayBtns.appendChild(unitSelect);
}

function resetWeather() {
    Object.keys(weatherDataStore).forEach(key => {
        delete weatherDataStore[key];
    });

    weatherDiv.innerHTML = "";
    displayBtns.innerHTML = "";
    
    currentDateOne = "";
    currentDateTwo = "";
}

resetBtn.addEventListener("click", resetWeather);