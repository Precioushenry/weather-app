

const API_KEY = '473fc7988b0cf50b1e648bbefd3fd349'; // Replace with your OpenWeatherMap API key

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?APPID=${API_KEY}`;
  const options = {
    method: 'GET',
    url: apiUrl,
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric',
      lang: 'en'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}

function updateWeatherInfo(data) {
  const locationElement = document.querySelector('.location-and-date__location');
  const dateElement = document.querySelector('.d');
  const temperatureElement = document.querySelector('.current-temperature__value');
  const summaryElement = document.querySelector('.current-temperature__summary');

  locationElement.textContent = data.name + ', ' + data.sys.country;
  const date = new Date(data.dt * 1000);
  dateElement.textContent = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

 
  temperatureElement.textContent = data.main.temp.toFixed(0) + '°C';

  summaryElement.textContent = data.weather[0].description;
}

async function handleSearch() {
  const searchInput = document.querySelector('.search');
  const city = searchInput.value.trim();
  if (city === '') {
    alert('Please enter a city name.');
    return;
  }

  const weatherData = await getWeatherData(city);
  if (weatherData) {
    updateWeatherInfo(weatherData);
  } else {
    alert('Failed to fetch weather data. Please try again later.');
  }
}


const searchButton = document.querySelector('.btn');
searchButton.addEventListener('click', handleSearch);
