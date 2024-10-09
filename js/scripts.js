const apiKey = '54c44b9a4c6f1a3a93def1b1aaef19a9'; // Replace with your OpenWeatherMap API key

document.getElementById('getWeather').addEventListener('click', () => {
    const location = document.getElementById('location').value;
    if (location) {
        fetchWeather(location);
    } else {
        alert('Please enter a location');
    }
});

function fetchWeather(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    document.getElementById('weatherInfo').innerHTML = '<p>Loading...</p>';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Location not found. Please try again.');
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => alert(error.message));
}

function displayWeather(data) {
    const { name, sys, main, weather } = data;
    const flagUrl = `https://flagcdn.com/w320/${sys.country.toLowerCase()}.png`; // Country flag URL

    // Determine the icon based on weather conditions using FlatIcons
    let statusIcon = '';
    switch (weather[0].main) {
        case 'Clear':
            statusIcon = '<i class="fas fa-sun"></i>';
            break;
        case 'Clouds':
            statusIcon = '<i class="fas fa-cloud"></i>';
            break;
        case 'Rain':
            statusIcon = '<i class="fas fa-cloud-showers-heavy fa-2x"></i>';
            break;
        case 'Snow':
            statusIcon = '<i class="fas fa-snowflake"></i>';
            break;
        case 'Thunderstorm':
            statusIcon = '<i class="fas fa-bolt"></i>';
            break;
        default:
            statusIcon = '<i class="fas fa-question"></i>'; // Fallback icon
    }

    const weatherInfo = `
        <div class="location">
            <h2>${name}, <img src="${flagUrl}" alt="${sys.country}" class="flag" /></h2>
        </div>
        <div class="condition">
            ${statusIcon}
            <p class="temperature">${main.temp}°C</p>
            <p class="condition-text">${weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1)}</p>
        </div>
        <div class="details">
            <div class="detail">
                <i class="fas fa-cloud"></i> Clouds: ${data.clouds.all}%
            </div>
            <div class="detail">
                <i class="fas fa-water"></i> Humidity: ${main.humidity}%
            </div>
            <div class="detail">
                <i class="fas fa-tachometer-alt"></i> Pressure: ${main.pressure} hPa
            </div>
        </div>
    `;
    document.getElementById('weatherInfo').innerHTML = weatherInfo;
}
