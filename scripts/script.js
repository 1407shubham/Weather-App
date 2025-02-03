const apiKey = 'f38fa4e52c86cb09c45c8c47f2c92421'; // Replace with your actual API key
function getWeather() {
    const city = document.getElementById("city").value;
    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                alert("City not found.");
            } else {
                displayWeather(data);
            }
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
        });
}

// Display the weather data
function displayWeather(data) {
    document.getElementById("city-name").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById("description").textContent = `Condition: ${data.weather[0].description}`;
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById("wind-speed").textContent = `Wind Speed: ${data.wind.speed} m/s`;

    // Get weather description
    const weatherDescription = data.weather[0].main;

    // Map weather description to Font Awesome icon
    let iconClass = '';
    switch (weatherDescription) {
        case 'Clear':
            iconClass = 'fas fa-sun';
            break;
        case 'Clouds':
            iconClass = 'fas fa-cloud';
            break;
        case 'Rain':
            iconClass = 'fas fa-cloud-showers-heavy';
            break;
        case 'Snow':
            iconClass = 'fas fa-snowflake';
            break;
        case 'Thunderstorm':
            iconClass = 'fas fa-bolt';
            break;
        case 'Drizzle':
            iconClass = 'fas fa-cloud-rain';
            break;
        case 'Mist':
            iconClass = 'fas fa-smog';
            break;
        default:
            iconClass = 'fas fa-question'; // Default icon if no match
            break;
    }

    // Set the Font Awesome icon class
    const iconElement = document.getElementById("weather-icon");
    iconElement.className = iconClass;
}

// Handle "Enter" key press event
function checkEnter(event) {
    if (event.key === "Enter") {
        getWeather();
    }
}