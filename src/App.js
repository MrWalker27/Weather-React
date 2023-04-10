import React, {useState} from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=0b864c9abe34f8f6a05d1d0aab208e00`;
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
      })
      setLocation('')
    }
  }
  return (
    <div className="app">
      <div className='searchbar'><input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder='Enter Location'
        type="text" /></div>
      {data.name != undefined &&
        <div className='container'>
        <div className='top'>
          <div className="location">
            <p>{data.name}</p> 
          </div>
          <div className="temp">
            {data.main.temp ? <h1>{data.main.temp.toFixed()} °C</h1> : null}
          </div>
          <div className="description">
          {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        <div className='bottom'>
          <div className="feels">
          {data.main ? <p className='bold'>{data.main.feels_like.toFixed()} °C</p> : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
          {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
          {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} m/s</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
      }
    </div>
  );
}

export default App;
