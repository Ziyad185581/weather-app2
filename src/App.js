import React, { useState } from 'react';

import axios from 'axios';
import LoadingScreen from './assets/LoadingScreen'; // Update the path accordingly
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import Footer from './assets/Footer';

import {
  faMapMarkerAlt,
  faTemperatureLow,
  faTemperatureHigh,
  faSun,
  faMoon,
  faCloud,
  faEye,
  faTachometerAlt,
  faTint
} from '@fortawesome/free-solid-svg-icons';

import './App.css';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey = '6427c2f2f250985e4ceba50fedc3f533'; // Replace this with your actual API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      setLoading(true);
      try {
        const response = await axios.get(url);
        setData(response.data);
        setError('');
      } catch (error) {
        setError('Error fetching weather data. Please try again.');
        console.error(error);
      } finally {
        setLoading(false);
      }
      setLocation('');
    }
  };

  return (
    <div className="app">
      <div className="weather-container">
        <div className="search">
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyDown={searchLocation}
            placeholder="Enter location"
            type="text"
          />
        </div>
        {loading ? (
          <LoadingScreen />
        ) : (
          <div className="weather-details">
            {error && (
              <div className="error-container">
                <FontAwesomeIcon icon={faExclamationCircle} className="error-icon" />
                <p className="error-message">{error}</p>
              </div>
            )}
            <div className="location">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" />
              <p>
                {data.name}
                {data.sys && data.sys.country}
              </p>
            </div>

            <div className="temp">
              {data.main && <h1>{data.main.temp.toFixed()}°C</h1>}
            </div>

            <div className="description">
              {data.weather && (
                <>
                  <p>{data.weather[0].main}</p>
                  {data.weather[0].main === 'Clear' ? (
                    <FontAwesomeIcon icon={faSun} className="weather-icon" />
                  ) : data.weather[0].main === 'Clouds' ? (
                    <FontAwesomeIcon icon={faCloud} className="weather-icon" />
                  ) : data.weather[0].main === 'Rain' ? (
                    <FontAwesomeIcon icon={faCloud} className="weather-icon" />
                  ) : (
                    <FontAwesomeIcon icon={faCloud} className="weather-icon" />
                  )}
                </>
              )}
            </div>
            <div className="mido">
              {data.main && (
                <>
                  <div className="weather-detail">
                    <FontAwesomeIcon icon={faTemperatureLow} className="weather-icon" />
                    <p className="bold">{data.main.temp_min.toFixed()}°C</p>
                    <p>Min Temp</p>
                  </div>
                  <div className="weather-detail">
                    <FontAwesomeIcon icon={faTemperatureHigh} className="weather-icon" />
                    <p className="bold">{data.main.temp_max.toFixed()}°C</p>
                    <p>Max Temp</p>
                  </div>
                  <div className="weather-detail">
                    {data.sys && (
                      <>
                        <FontAwesomeIcon icon={faSun} className="weather-icon" />
                        <p className="bold">
                          {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}
                        </p>
                        <p>Sunrise</p>
                       
                      </>
                    )}
                  </div>
                  <div className="weather-detail">
                    {data.sys && (
                      <>
                         <FontAwesomeIcon icon={faMoon} className="weather-icon" />
                        <p className="bold">
                          {new Date(data.sys.sunset * 1000).toLocaleTimeString()}
                        </p>
                        <p>Sunset</p>
                       
                      </>
                    )}
                  </div>
                  <div className="weather-detail">
                 
                    <FontAwesomeIcon icon={faTachometerAlt} className="weather-icon" />
                    <p className="bold">{data.main.pressure} hPa</p>
                    <p>Pressure</p>
                  </div>
                  <div className="weather-detail">
                    <FontAwesomeIcon icon={faTint} className="weather-icon" />
                    <p className="bold">{data.main.humidity}%</p>
                    <p>Humidity</p>
                  </div>
                  {/* UV Index */}
                  <div className="weather-detail">
                    <FontAwesomeIcon icon={faSun} className="weather-icon" />
                    <p className="bold">UV Index: {data.uvi ?? 'N/A'}</p>
                    <p>UV Index</p>
                  </div>

                  

                  {/* Feels Like Temperature */}
                  <div className="weather-detail">
                    <FontAwesomeIcon icon={faTemperatureLow} className="weather-icon" />
                    <p className="bold">Feels Like: {data.main.feels_like?.toFixed(1) ?? 'N/A'}°C</p>
                    <p>Feels Like</p>
                  </div>

                  
                </>
              )}
            </div>
            <div className="middle">
              {data.clouds && (
                <>
                  <div className="wind">
                    {data.wind && (
                      <>
                        <div className="weather-detail">
                          <FontAwesomeIcon icon={faTachometerAlt} className="weather-icon" />
                          <p className="bold">{data.wind.speed.toFixed(1)} m/s</p>
                          <p>Wind Speed</p>
                        </div>
                        
                      </>
                    )}
                  </div>
                  <div className="weather-detail">
                          <FontAwesomeIcon icon={faTint} className="weather-icon" />
                          <p className="bold">{data.wind.deg.toFixed(1)}°</p>
                          <p>Wind Direction</p>
                        </div>
                  <div className="weather-detail">
                    <FontAwesomeIcon icon={faCloud} className="weather-icon" />
                    <p className="bold">{data.clouds.all}%</p>
                    <p>Cloud Cover</p>
                  </div>
                  <div className="weather-detail">
                    <FontAwesomeIcon icon={faEye} className="weather-icon" />
                    <p className="bold">{(data.visibility / 1000).toFixed(2)} km</p>
                    <p>Visibility</p>
                  </div>
                  {/* Dew Point */}
                  <div className="weather-detail">
                    <FontAwesomeIcon icon={faTint} className="weather-icon" />
                    <p className="bold">Dew Point: {data.dew_point?.toFixed(1) ?? 'N/A'}°C</p>
                    <p>Dew Point</p>
                  </div>
                  {/* Detailed Weather Condition */}
                  {data.weather && (
                    <div className="weather-detail">
                      <FontAwesomeIcon icon={faCloud} className="weather-icon" />
                      <p className="bold">{data.weather[0]?.description ?? 'N/A'}</p>
                      <p>Condition Description</p>
                    </div>
                  )}

                  
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {/* Social Sharing Buttons */}
      <Footer/>
    </div>
  );
}

export default App;
