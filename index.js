const submit_button = document.getElementById('search-submit');
const city_display = document.getElementById('city-display');
const temp_display = document.getElementById('temp-display');
const status_display = document.getElementById('status-display');
const highest_temp_display = document.getElementById('highest-temp-display');
const lowest_temp_display = document.getElementById('lowest-temp-display');
const city_input = document.getElementById('search-input');

async function getWeatherData(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6fd302c59d8f7a31fcfbd99c52e14dc2`);
    return await response.json();
}

async function displayWeatherData() {
    const data = await getWeatherData(city_input.value);
    city_display.textContent = data.name;
    temp_display.textContent = `${Math.round(data.main.temp - 273.15)}°`;
    status_display.textContent = data.weather[0].main;
    lowest_temp_display.textContent = `L:${Math.round(data.main.temp_min - 273.15)}°`;
    highest_temp_display.textContent = `H:${Math.round(data.main.temp_max - 273.15)}°`;
}

async function getForecastData(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=6fd302c59d8f7a31fcfbd99c52e14dc2`);
    return await response.json();
}

async function displayForecastData() {
    const data = await getForecastData(city_input.value);
    const data_sliced = data.list.slice(0, 8); // had like 40 elements but i only need the first 8 ones

    data_sliced.forEach((item, index) => { /* iterates each item in the array that contain the objects, to assign the current hour, 
        temp and icon by using array indexes as parameters for the html ids */

        const hour = new Date(item.dt * 1000).getHours();
        document.getElementById(`t${index}-time`).textContent = `${hour - 1}:00`;

        const temperature = Math.round(item.main.temp - 273.15);
        document.getElementById(`t${index}-temp`).textContent = `${temperature}°`;

        const status = item.weather[0].main;
        switch (status) {
            case 'Thunderstorm':
                document.getElementById(`t${index}-icon`).textContent = `🌩`;
                break;
            case 'Clouds':
                document.getElementById(`t${index}-icon`).textContent = `☁`;
                break;
            case 'Rain':
                document.getElementById(`t${index}-icon`).textContent = `🌧`;
                break;
            case 'Snow':
                document.getElementById(`t${index}-icon`).textContent = `🌨`;
                break;
            case 'Clear':
                document.getElementById(`t${index}-icon`).textContent = `☀`;
                break;
            case 'Drizzle':
                document.getElementById(`t${index}-icon`).textContent = `⛅`;
                break;
            default:
                document.getElementById(`t${index}-icon`).textContent = ` `;
        }
    });
}

submit_button.addEventListener('click', async event => {
    event.preventDefault();

    if (city_input.value) {
        await displayWeatherData();
        await displayForecastData();
    }
    else {
        alert('Please enter a city')
    }
});