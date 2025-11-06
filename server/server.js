import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("✅ Backend server is running successfully!");
});

// Weather API
app.get("/api/weather", async (req, res) => {
  try {
    const city = req.query.city || "Bangalore";
    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "Weather API key missing" });

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching weather:", error.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

// Currency API (1 INR → USD/EUR)
app.get("/api/currency", async (req, res) => {
  try {
    const apiKey = process.env.EXCHANGE_RATE_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "Currency API key missing" });

    const response = await axios.get(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/INR`);
    const rates = response.data.conversion_rates;

    res.json({
      inrToUsd: rates.USD.toFixed(4),
      inrToEur: rates.EUR.toFixed(4),
    });
  } catch (error) {
    console.error("Error fetching currency:", error.message);
    res.status(500).json({ error: "Failed to fetch currency data" });
  }
});

// Quote API
app.get("/api/quote", async (req, res) => {
  try {
    const response = await axios.get(process.env.QUOTE_API_URL);
    const data = response.data;

    // Map API response safely
    res.json({
      quote: data.content || "Dream Big",
      author: data.author || "The STRIVE",
    });
  } catch (error) {
    console.error("Error fetching quote:", error.message);
    res.status(500).json({ error: "Failed to fetch quote" });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
