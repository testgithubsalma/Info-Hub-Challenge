import { useState, useEffect } from "react";
import axios from "axios";

function QuoteGenerator() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchQuote = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3001/api/quote");
      setQuote(res.data);
      setError("");
    } catch {
      setError("Could not fetch quote.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div>
      <h2>💡 Motivational Quote</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {quote && (
        <blockquote>
          <p>"{quote.text}"</p>
          <footer>– {quote.author}</footer>
        </blockquote>
      )}
      <button onClick={fetchQuote}>New Quote</button>
    </div>
  );
}

export default QuoteGenerator;
