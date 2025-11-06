import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("Bangalore");
  const [weather, setWeather] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState({ weather: false, currency: false, quote: false });
  const [error, setError] = useState({ weather: "", currency: "", quote: "" });

  // Fetch Weather
  const fetchWeather = async () => {
    setLoading(prev => ({ ...prev, weather: true }));
    setError(prev => ({ ...prev, weather: "" }));
    try {
      const res = await fetch(`http://localhost:5000/api/weather?city=${city}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setWeather(data);
    } catch (err) {
      setError(prev => ({ ...prev, weather: err.message }));
    } finally {
      setLoading(prev => ({ ...prev, weather: false }));
    }
  };

  // Fetch Currency
  const fetchCurrency = async () => {
    setLoading(prev => ({ ...prev, currency: true }));
    setError(prev => ({ ...prev, currency: "" }));
    try {
      const res = await fetch("http://localhost:5000/api/currency");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setCurrency(data);
    } catch (err) {
      setError(prev => ({ ...prev, currency: err.message }));
    } finally {
      setLoading(prev => ({ ...prev, currency: false }));
    }
  };

  // Fetch Quote
  const fetchQuote = async () => {
    setLoading(prev => ({ ...prev, quote: true }));
    setError(prev => ({ ...prev, quote: "" }));
    try {
      const res = await fetch("http://localhost:5000/api/quote");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      // Set quote properly
      setQuote({ quote: data.quote, author: data.author });
    } catch (err) {
      setError(prev => ({ ...prev, quote: err.message }));
    } finally {
      setLoading(prev => ({ ...prev, quote: false }));
    }
  };

  return (
    <div className="App">
      <h1>🌐 Info Hub Challenge</h1>

      {/* Weather */}
      <div className="module">
        <h2>Weather Information</h2>
        <input value={city} onChange={e => setCity(e.target.value)} placeholder="Enter city" />
        <button onClick={fetchWeather}>Get Weather</button>
        {loading.weather && <p>Loading...</p>}
        {error.weather && <p className="error">{error.weather}</p>}
        {weather && (
          <p>
            🌤️ {weather.name}: {weather.main.temp}°C, {weather.weather[0].description}
          </p>
        )}
      </div>

      {/* Currency */}
      <div className="module">
        <h2>Currency Conversion</h2>
        <button onClick={fetchCurrency}>Get Rates</button>
        {loading.currency && <p>Loading...</p>}
        {error.currency && <p className="error">{error.currency}</p>}
        {currency && (
          <p>
            💰 1 INR = {currency.inrToUsd} USD | {currency.inrToEur} EUR
          </p>
        )}
      </div>

      {/* Quote */}
      <div className="module">
        <h2>Motivational Quote</h2>
        <button onClick={fetchQuote}>Get Quote</button>
        {loading.quote && <p>Loading...</p>}
        {error.quote && <p className="error">{error.quote}</p>}
        {quote && (
          <p className="quote">
            “{quote.quote}” — {quote.author}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
