import { useState, useEffect } from "react"
import { quotes } from "../utils/quotes.js"

export default function Quotes() {
  const [selectedQuote, setSelectedQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)])

  useEffect(() => {
      const interval = setInterval(() => {
      const randomQuote =
        quotes[Math.floor(Math.random() * quotes.length)];
  
      setSelectedQuote(randomQuote);
    }, 30000);
  
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="quote"><h2>{selectedQuote.text} <small className="author">~{selectedQuote.author}</small></h2></div>
  )
}