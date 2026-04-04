import { useState, useEffect, useRef } from "react"
import dayjs from "dayjs"
import DarkVeil from './DarkVeil.jsx';
import Quotes from "./Quotes.jsx"
import ChromaGrid from '../ChromaGrid';
import Calendar from "./Calendar.jsx"
import { RenderActivity } from "./Activities.jsx";
import { useInView } from 'react-intersection-observer';


export default function Main(props) {
  const { ref, inView } = useInView({
  threshold: 0,
});
  const [isViewMoreRendered, setIsViewMoreRendered] = useState(false)

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
  
  const overdueTasks = props.activities.filter(activity => {
    const date1 = dayjs()
    const date2 = activity.dueDate
    return date1.diff(date2) > 0
  }).length

  const items = [
  {
    title: `👀Pending Activities: ${props.activities.length - 1}`,
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
  },
  {
    title: `⚠️Overdue task(s): ${overdueTasks}`,
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
  },
  {
    title: `✅Tasks completed this week: ${props.weeklyTasksCompleted.length || 0}`,
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
  },
  {
    title: `✅Total tasks completed: ${props.totalTasksCompleted.length}`,
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
  }
];


  function RenderActivities() {
    let activitiesHTML = []
    if (props.activities.length >= 1) {
      for (let i = 0; i < props.activities.length; i++) {
      let activity = props.activities[i] ? props.activities[i] : {id: null, activityType:null, description:null, dueDate:null};
      activitiesHTML.push(<RenderActivity
        activities={props.activities}
        setActivities={props.setActivities}
        activity={activity}
        index={i}
        key={i}
        activityCard={props.activityCard}
        sidebarActivityType={props.sidebarActivityType}
        setTotalTasksCompleted={props.setTotalTasksCompleted}
        totalTasksCompleted={props.totalTasksCompleted}
        setWeeklyTasksCompleted={props.setWeeklyTasksCompleted}
        setIsViewMoreRendered={setIsViewMoreRendered}
        isViewMoreRendered={isViewMoreRendered}/>)
      } 
    } else {
      for (let i = 0; i < props.activities.length; i++) {
      let activity = props.activities[i] ? props.activities[i] : {id: null, activityType:null, description:null, dueDate:null};
      activitiesHTML.push(<RenderActivity
        activities={props.activities}
        setActivities={props.setActivities}
        activity={activity}
        index={i}
        key={i}
        activityCard={props.activityCard}
        sidebarActivityType={props.sidebarActivityType}
        setTotalTasksCompleted={props.setTotalTasksCompleted}
        totalTasksCompleted={props.totalTasksCompleted}
        setWeeklyTasksCompleted={props.setWeeklyTasksCompleted}
        setIsViewMoreRendered={setIsViewMoreRendered}
        isViewMoreRendered={isViewMoreRendered}/>)
    } 
    }
    return activitiesHTML
}

  return (
  <main>
    <section className="sec1" ref={props.home}>
      {!isViewMoreRendered && <div className="sec1-container">
        <div className="sec1-top-part">

          <div style={{ minWidth: '100%', minHeight: '100%', position: 'relative', opacity: "1" }} ref={ref}>
            { inView ? <DarkVeil
              hueShift={0}
              noiseIntensity={0}
              scanlineIntensity={0}
              speed={2.3}
              scanlineFrequency={0.5}
              warpAmount={0}
              resolutionScale={1}
            /> : null}
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
      </div>}
    </section>

      <section className="sec2" style={{borderRadius: "10px"}} ref={props.calendar}>
        { !isViewMoreRendered && <div style={{width: "100%", height: "100%"}}>
          <Calendar activities={props.activities}/>
        </div>}
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