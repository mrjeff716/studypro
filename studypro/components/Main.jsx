import { useState, useEffect } from "react"
import { quotes } from "../data/quotes.js"
import dayjs from "dayjs"
import FloatingLines from '../FloatingLines.jsx';

export default function Main() {
  const [quote, setQuote] = useState({})

  console.log(quotes)

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
  
  console.log(randomQuote)

  let greetingMessage = ""
  let hour = dayjs().format("HH")
  console.log(hour)
  if (hour < 12) {
    greetingMessage = "morning"
  } else if (hour >= 12 && hour < 18) {
    greetingMessage = "evening"
  } else if(hour >= 18 && hour < 24) {
    greetingMessage = "night"
  }

  const firstName = JSON.parse(localStorage.getItem("userInfo")).name || "guest"

  return (
    <main>
      <section className="sec1">
        <div className="sec1-top-part">

          <div style={{ width: '100%', height: '100%', position: 'relative', opacity: "0.85" }}>
        <FloatingLines 
          enabledWaves={["top","middle","bottom"]}
          // Array - specify line count per wave; Number - same count for all waves
          lineCount={5}
          // Array - specify line distance per wave; Number - same distance for all waves
          lineDistance={5}
          bendRadius={5}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
        />
      </div>

          <div className="quote"><h2>{randomQuote.text} <small className="author">~{randomQuote.author}</small></h2></div> 
          <h2 className="greeting">Good <span className="greeting-message-and-name">{greetingMessage} {firstName}</span></h2>
          
        </div>
        <div className="block-container">
        <div className="block1">Pending tasks: x</div>
        <div className="block2">Overdue tasks: x</div>
        <div className="block3">Y</div>
        <div className="block4">Streak (7 days)</div>
        </div>
      </section>
    </main>
  )
}