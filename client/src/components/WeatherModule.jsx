import { useState, useEffect } from "react";
import axios from "axios";

function WeatherModule() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3001/api/weather");
        setWeather(res.data);
      } catch (err) {
        setError("Could not fetch weather data.");
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  if (loading) return <p>Loading weather...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!weather) return null;

  return (
    <div>
      <h2>🌦️ Weather Info</h2>
      <p>Location: {weather.city}</p>
      <p>Temperature: {weather.temperature}°C</p>
      <p>Condition: {weather.condition}</p>
    </div>
  );
}

export default WeatherModule;
