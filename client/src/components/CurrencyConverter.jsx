import { useState } from "react";
import axios from "axios";

function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConvert = async () => {
    if (!amount) {
      setError("Please enter an amount.");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:3001/api/currency?amount=${amount}`);
      setResult(res.data);
      setError("");
    } catch {
      setError("Failed to fetch conversion data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>💱 Currency Converter</h2>
      <input
        type="number"
        placeholder="Enter INR amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleConvert}>Convert</button>

      {loading && <p>Converting...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && (
        <div>
          <p>USD: {result.usd}</p>
          <p>EUR: {result.eur}</p>
        </div>
      )}
    </div>
  );
}

export default CurrencyConverter;
