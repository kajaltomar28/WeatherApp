document.addEventListener('DOMContentLoaded', () => {
    const locationInput = document.getElementById('locationInput');
    const getWeatherButton = document.getElementById('getWeatherButton');
    const weatherInfo = document.getElementById('weatherInfo');
    const unitToggle = document.getElementById('unitToggle');

    getWeatherButton.addEventListener('click', () => {
        const location = locationInput.value.trim();
        const unit = unitToggle.value;
        if (location === '') {
            showError('Please enter a location.');
            return;
        }
        
        const apiKey = '35112a1179088fdcac9c8e46d06679ac';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${apiKey}`;

        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`API request failed with status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.cod !== 200) {
                throw new Error(`Weather API error: ${data.message}`);
            }
            displayWeather(data);
        })
        .catch(error => {
            showError(`Error: ${error.message}`);
        });

    });

    function displayWeather(data) {
        const temperature = data.main.temp;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const weatherDescription = data.weather[0].description;

        const unitLabel = unitToggle.options[unitToggle.selectedIndex].text;
        
        weatherInfo.innerHTML = `
            <h2>Current Weather</h2>
            <p>Temperature: ${temperature} ${unitLabel}</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
            <p>Condition: ${weatherDescription}</p>
        `;
    }

    function showError(message) {
        weatherInfo.innerHTML = `<p class="error">${message}</p>`;
    }
});
