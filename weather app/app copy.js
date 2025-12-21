// Replace with your OpenWeather API key
const API_KEY = 'paste you api key here';

const cityInput = document.getElementById('cityInput');
const checkBtn = document.getElementById('checkBtn');
const message = document.getElementById('message');
const result = document.getElementById('result');
const cityName = document.getElementById('cityName');
const condition = document.getElementById('condition');
const tempEl = document.getElementById('temp');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');
const weatherIcon = document.getElementById('weatherIcon');

checkBtn.addEventListener('click', fetchWeather);
cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') fetchWeather();
});

async function fetchWeather() {
  const city = cityInput.value.trim();
  if (!city) {
    showMessage('Please enter a city name.');
    return;
  }

  showMessage('Loading...');
  result.classList.add('hidden');

  // Build URL - units=metric makes temp in Celsius
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

  try {
    const res = await fetch(url);
    // If network failed, this will throw → caught below
    const data = await res.json();

    // OpenWeather returns cod 200 for success, 404 for city not found, etc.
    if (res.ok) {
      // Pull values safely
      const name = data.name || city;
      const temp = data.main?.temp ?? 'N/A';
      const humidity = data.main?.humidity ?? 'N/A';
      const wind = data.wind?.speed ?? 'N/A';
      const weather = data.weather && data.weather[0] ? data.weather[0] : null;
      const description = weather?.description ? capitalize(weather.description) : 'Unknown';
      const icon = weather?.icon;

      cityName.textContent = name;
      condition.textContent = description;
      tempEl.textContent = temp;
      humidityEl.textContent = humidity;
      windEl.textContent = wind;

      if (icon) {
        // OpenWeather icon URL
        weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        weatherIcon.style.display = 'block';
      } else {
        weatherIcon.style.display = 'none';
      }

      showMessage('');
      result.classList.remove('hidden');
    } else {
      // show friendly message from API if available
      const errMsg = data.message ? capitalize(data.message) : 'City not found';
      showMessage(errMsg);
    }
  } catch (err) {
    console.error(err);
    showMessage('Network error. Check your connection.');
  }
}

function showMessage(text) {
  message.textContent = text;
}

function capitalize(str) {
  return str.replace(/\b\w/g, (ch) => ch.toUpperCase());
}
