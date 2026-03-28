import { useState, useEffect, useRef } from "react"
import dayjs from "dayjs"
import Prism from './Prism';
import Quotes from "./Quotes.jsx"
import ChromaGrid from '../ChromaGrid';
import Calendar from "./Calendar.jsx"
import { RenderActivity } from "./Activities.jsx";


export default function Main(props) {
  

  let greetingMessage = ""
  let hour = dayjs().format("HH")
  if (hour < 12) {
    greetingMessage = "morning"
  } else if (hour >= 12 && hour < 18) {
    greetingMessage = "afternoon"
  } else if(hour >= 18 && hour < 20) {
    greetingMessage = "evening"
  } else if (hour >= 20 && hour < 24) {
    greetingMessage = "night"
  }

  const firstName = JSON.parse(localStorage.getItem("userInfo")).name || "guest"

  const items = [
  {
    title: `👀Pending tasks: ${3}`,
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
  },
  {
    title: `⚠️Overdue task(s): ${1}`,
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
  },
  {
    title: `✅Tasks completed: ${2}`,
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
  },
  {
    title: `🔥streak: ${6}`,
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
  }
];

  function RenderActivities() {
    let activitiesHTML = []
    if (props.activities.length >= 1) {
      for (let i = 0; i < props.activities.length; i++) {
      let activity = props.activities[i] ? props.activities[i] : {id: null, activityType:null, description:null, dueDate:null};
      activitiesHTML.push(<RenderActivity activities={props.activities} setActivities={props.setActivities} activity={activity} index={i} key={i} activityCard={props.activityCard} sidebarActivityType={props.sidebarActivityType}/>)
    } 
    } else {
      for (let i = 0; i < props.activities.length; i++) {
      let activity = props.activities[i] ? props.activities[i] : {id: null, activityType:null, description:null, dueDate:null};
      activitiesHTML.push(<RenderActivity activities={props.activities} setActivities={props.setActivities} activity={activity} index={i} key={i} activityCard={props.activityCard} sidebarActivityType={props.sidebarActivityType}/>)
    } 
    }
    return activitiesHTML
}

  return (
  <main>
    <section className="sec1" ref={props.home}>
      <div className="sec1-container">
        <div className="sec1-top-part">

          <div style={{ minWidth: '100%', minHeight: '100%', position: 'relative', opacity: "1" }}>
          <Prism
          animationType="3drotate"
          timeScale={1}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0}
          glow={1}
        /> 
      </div>

          <Quotes />
          <h2 className="greeting">Good <span className="greeting-message-and-name">{greetingMessage} {firstName}</span></h2>
          
        </div>
        <div className="block-container">
        {/*<div className="block1" style={{zIndex:"100", position:"relative"}}>Pending tasks: 5</div>*/}
        <ChromaGrid 
          items={items}
          radius={300}
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
        />
      
        {/*<div className="block2" style={{zIndex:"100", position:"relative"}}>Overdue tasks: 2</div>*/}
        
        {/*<div className="block3">Total tasks completed (7 days)</div>*/}
        {/*<div className="block4">Streak (7 days)</div>*/}
        </div>
      </div>
    </section>

      <section className="sec2" style={{borderRadius: "10px"}} ref={props.calendar}>
        <div style={{width: "100%", height: "100%"}}>
          <Calendar />
        </div>
      </section>
    
      <section className="sec3">
        <h1>Activities</h1>
        <button className="reset-activities-button" onClick={() => {props.setSidebarActivityType("")}}>Reset</button>
        <div className="activities-grid">
        <RenderActivities />
        </div>
      </section>
    </main>
  )
}