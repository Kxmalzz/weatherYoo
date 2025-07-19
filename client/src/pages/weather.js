import { useState, useEffect } from 'react';
import axios from 'axios';
import './weather.css';



function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  

  // ✅ Default background on refresh
  useEffect(() => {
    document.body.style.backgroundImage = `url('/images/k2.jpg')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
  }, []);

  // ✅ Weather-based background update
  const setBodyBackground = (weatherMain) => {
    const imageMap = {
      clear: '/images/sunny.jpg',
      clouds: '/images/cloudy.jpg',
      rain: '/images/rainy.webp',
      drizzle: '/images/rainy.webp',
      thunderstorm: '/images/thunderstorm.jpg',
      snow: '/images/snow.jpg',
      mist: '/images/foggy.jpg',
      fog: '/images/foggy.jpg',
    };

    const image = imageMap[weatherMain.toLowerCase()] || '/images/k2.jpg';
    document.body.style.backgroundImage = `url(${image})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
  };

  // ✅ Get weather from API
  const getWeather = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/weather?city=${city}`);
      setWeather(response.data);
      setError('');
      setBodyBackground(response.data.weather[0].main); // Change bg on success
    } catch (err) {
      setError('City not found');
      setWeather(null);
    }
  };

  return (
 
    <div className="weather-container">
      <h1 className="title">WeatherYoo ⛅</h1>
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <p>🌡 Temp: {weather.main.temp} °C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌬 Wind: {weather.wind.speed} m/s</p>
          <p>☁ {weather.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
        </div>
      )}

      {/* Forecast card mockup */}
      <div className="forecast-section">
        <div className="forecast-card">☀️ Thu - 27°C</div>
        <div className="forecast-card">🍂 Fri - 25°C</div>
        <div className="forecast-card">⛅ Sat - 28°C</div>
        <div className="forecast-card">🌦️ Sun - 26°C</div>
      </div>
    </div>
  );
}

export default Weather;