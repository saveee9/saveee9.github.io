document.getElementById('weatherForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var city = document.getElementById('city').value;
    var apiKey = '1b96a398b4f62d7856ea8c1841eea128';
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.cod === 200) {
            document.getElementById('temperature').innerText = `Temperature: ${data.main.temp}°C`;
            document.getElementById('weather').innerText = `Weather: ${data.weather[0].main}`;
            document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
        } else {
            alert(`City not found: ${data.message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to retrieve weather data');
    });
});
