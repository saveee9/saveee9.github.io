let currentLanguage = 'en';

const cityToCountryCode = {
    "Bangkok": "TH",
    "New York": "US",
    "London": "GB",
    "Tokyo": "JP",
    "Paris": "FR",
    "Sydney": "AU",
    "China": "CN",
    "Mexico": "MEX",
    "England": "ENG",
    "Denmark": "DK",
};

document.getElementById('openAppBtn').addEventListener('click', function() {
    const app = document.getElementById('app');
    const welcomeScreen = document.getElementById('welcomeScreen');
    welcomeScreen.classList.add('hidden');
    app.classList.remove('hidden');
    document.getElementById('closeAppBtn').classList.remove('hidden');
});

document.getElementById('closeAppBtn').addEventListener('click', function() {
    resetUI();
});

document.getElementById('weatherForm').addEventListener('submit', function(e) {
    e.preventDefault();
    getWeatherData();
});

document.getElementById('lang-en').addEventListener('click', function() {
    setLanguage('en');
});

document.getElementById('lang-th').addEventListener('click', function() {
    setLanguage('th');
});

function setLanguage(lang) {
    currentLanguage = lang;
    if (lang === 'en') {
        document.getElementById('app-title').innerText = 'Weather Checker';
        document.getElementById('city').placeholder = 'Enter city name';
        document.getElementById('weatherForm').querySelector('button').innerText = 'Get Weather';
        document.getElementById('openAppBtn').innerText = 'Open Weather App';
        document.getElementById('closeAppBtn').innerText = 'Close';
    } else if (lang === 'th') {
        document.getElementById('app-title').innerText = 'ตรวจสอบสภาพอากาศ';
        document.getElementById('city').placeholder = 'กรอกชื่อเมือง';
        document.getElementById('weatherForm').querySelector('button').innerText = 'ดูสภาพอากาศ';
        document.getElementById('openAppBtn').innerText = 'เปิดแอปตรวจสอบสภาพอากาศ';
        document.getElementById('closeAppBtn').innerText = 'ปิด';
    }

    if (document.getElementById('temperature').innerText !== '') {
        getWeatherData(); 
    }
}

function getWeatherData() {
    const city = document.getElementById('city').value;
    const apiKey = '1b96a398b4f62d7856ea8c1841eea128';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.cod === 200) {
            const temperatureText = currentLanguage === 'en' ? `Temperature: ${data.main.temp}°C` : `อุณหภูมิ: ${data.main.temp}°C`;
            const weatherText = currentLanguage === 'en' ? `Weather: ${data.weather[0].main}` : `สภาพอากาศ: ${translateWeather(data.weather[0].main)}`;
            const humidityText = currentLanguage === 'en' ? `Humidity: ${data.main.humidity}%` : `ความชื้น: ${data.main.humidity}%`;
            const windSpeedText = currentLanguage === 'en' ? `Wind Speed: ${data.wind.speed} m/s` : `ความเร็วลม: ${data.wind.speed} m/s`;
            const windDirectionText = currentLanguage === 'en' ? `Wind Direction: ${data.wind.deg}°` : `ทิศทางลม: ${data.wind.deg}°`;
            const pressureText = currentLanguage === 'en' ? `Pressure: ${data.main.pressure} hPa` : `ความดันอากาศ: ${data.main.pressure} hPa`;

            document.getElementById('temperature').innerText = temperatureText;
            document.getElementById('weather').innerText = weatherText;
            document.getElementById('humidity').innerText = humidityText;
            document.getElementById('windSpeed').innerText = windSpeedText;
            document.getElementById('windDirection').innerText = windDirectionText;
            document.getElementById('pressure').innerText = pressureText;

            const iconCode = data.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
            document.getElementById('weatherIcon').src = iconUrl;
            document.getElementById('weatherIcon').classList.remove('hidden');

            const countryCode = cityToCountryCode[city] || data.sys.country.toLowerCase();
            const countryFlagUrl = `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`;
            const countryFlag = document.getElementById('countryFlag');
            countryFlag.src = countryFlagUrl;
            countryFlag.classList.remove('hidden');

            // Remove rain animation if weather is not "Rain"
            if (data.weather[0].main === 'Rain') {
                showRainAnimation();
            } else {
                removeRainAnimation();
            }
        } else {
            alert(`City not found: ${data.message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to retrieve weather data');
    });
}

function showRainAnimation() {
    const rainContainer = document.createElement('div');
    rainContainer.className = 'rain-container';
    for (let i = 0; i < 10; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain';
        rainContainer.appendChild(drop);
    }
    document.body.appendChild(rainContainer);
}

function removeRainAnimation() {
    const rainContainer = document.querySelector('.rain-container');
    if (rainContainer) {
        document.body.removeChild(rainContainer);
    }
}

function translateWeather(weather) {
    const translations = {
        "Clear": "ท้องฟ้าแจ่มใส",
        "Clouds": "มีเมฆมาก",
        "Rain": "ฝนตก",
        "Drizzle": "ฝนปรอย",
        "Thunderstorm": "พายุฝนฟ้าคะนอง",
        "Snow": "หิมะตก",
        "Mist": "หมอกบาง",
        "Smoke": "ควัน",
        "Haze": "หมอกควัน",
        "Dust": "ฝุ่น",
        "Fog": "หมอก",
        "Sand": "ทราย",
        "Ash": "เถ้าถ่าน",
        "Squall": "พายุ",
        "Tornado": "พายุทอร์นาโด"
    };
    return translations[weather] || weather;
}

function resetUI() {
    const app = document.getElementById('app');
    const welcomeScreen = document.getElementById('welcomeScreen');
    app.classList.add('hidden');
    welcomeScreen.classList.remove('hidden');
    document.getElementById('closeAppBtn').classList.add('hidden');

    document.getElementById('city').value = '';
    document.getElementById('temperature').innerText = '';
    document.getElementById('weather').innerText = '';
    document.getElementById('humidity').innerText = '';
    document.getElementById('windSpeed').innerText = '';
    document.getElementById('windDirection').innerText = '';
    document.getElementById('pressure').innerText = '';
    document.getElementById('weatherIcon').classList.add('hidden');
    document.getElementById('weatherIcon').src = '';
    document.getElementById('countryFlag').classList.add('hidden');
    document.getElementById('countryFlag').src = '';

    removeRainAnimation(); // Remove rain animation on UI reset
}
