import React, { useState } from 'react';
import './App.css';


const WeatherCard = ({title, value}) => {
  return (
    <div className='weather-card'>
    <h3>{title}</h3>
    <p>{value}</p>
    </div>
  );
};

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({
    temp_c: "",
    condition: "",
    wind_kph: "",
    humidity: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  
  const Key="17db5bb8dc3a4da297780941240412";

  const searchWeather = async () => {
    const fetchWeatherData=async ()=>{
      setIsLoading(true);
      try{
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${Key}&q=${city}&aqi=no`);
        const data = await response.json();
        if(!response.ok){
          throw new Error(data.error.message);
        }
        console.log(data.current);
        setWeather((prevWeather) => ({
          ...prevWeather,
          temp_c: data.current.temp_c,
          condition: data.current.condition.text,
          wind_kph: data.current.wind_kph,
          humidity: data.current.humidity
        }));
      }catch(error){
        alert("Failed to fetch weather data");
        console.log(error);
      }finally {
        setIsLoading(false);
      }
    }  
    fetchWeatherData();
  }

  return (
   <div className="App">
   <div className="search">
    <input type="text" placeholder='Enter the city' value={city} onChange={(e) => setCity(e.target.value)}/>
    <button onClick={() => searchWeather()}>Search</button>
   </div>
   <br/>
   {isLoading &&(
     <p>Loading data...</p>
   )}
   <br/>
   {!isLoading && weather.temp_c &&(
     <div className="weather-cards">
     <WeatherCard title="Temperature" value={weather.temp_c} />
     <WeatherCard title="Humidity" value={weather.humidity} />
     <WeatherCard title="Condition" value={weather.condition} />
     <WeatherCard title="Wind Speed" value={weather.wind_kph} />
    </div>
    )}
    </div>
  );
}

export default App;
