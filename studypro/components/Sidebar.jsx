import { useState, useRef } from "react"

export default function Sidebar(props) {
  const [activities, setActivities] = useState(false)
  const [logout, setLogOut] = useState(false)

  
  function handleOnClick() {
    setActivities(prevActivities => prevActivities = !prevActivities)
  }
  function handleCrossClick() {
    props.setMoreButton(prevMoreButton => prevMoreButton = false)
  }
  return (
    <>
    <aside>
      <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
      <div className="home-and-calendar-container">
      <span className="sidebar-option"
      onClick={() => {
        props.setGoToHome(prev => prev = !prev)
      }}
      ><img className="icon sidebar-icon" src="studypro/images&icons/home.png"/><span className="sidebar-text">Home</span></span>
      <span className="sidebar-option"
      onClick={() => {
        props.setGoToCalendar(prev => prev = !prev)
      }}
      ><img className="icon sidebar-icon" src="studypro/images&icons/schedule.png" /><span className="sidebar-text">Calendar</span></span>
      </div>
      <div className="tasks-container" >
      <span className="sidebar-option" onClick={() => {
        handleOnClick()
        props.setGoToActivities(prev => prev = !prev)}}><img className="icon sidebar-icon" src="studypro/images&icons/checklist.png" /><span className="sidebar-text">Activities↓</span></span>
      { activities === true &&
      <div className="tasks">
      <span className="sidebar-option activity" onClick={() => {props.setSidebarActivityType("Task")}}><img className="icon sidebar-icon" src="studypro/images&icons/clipboard.png" /><span className="sidebar-text">Tasks</span></span>
      <span className="sidebar-option activity" onClick={() => {props.setSidebarActivityType("Quizz")}}><img className="icon sidebar-icon" src="studypro/images&icons/quiz.png" /><span className="sidebar-text">Quizzes</span></span>
      <span className="sidebar-option activity" onClick={() => {props.setSidebarActivityType("Exam")}}><img className="icon sidebar-icon" src="studypro/images&icons/test.png" /><span className="sidebar-text">Exams</span></span>
      <span className="sidebar-option activity" onClick={() => {props.setSidebarActivityType("Vacation")}}><img className="icon sidebar-icon" src="studypro/images&icons/vacations.png" /><span className="sidebar-text">Vacations</span></span>
      </div>
      }
      </div>
    </div>
      <span className="sidebar-option activity logout" onClick={() => setLogOut(true)}><img className="icon sidebar-icon" src="studypro/images&icons/logout.png" /><span className="sidebar-text">Log out</span></span>
    </aside>
    {logout ? <div className="logout-container">
      <div className="logout-modal">
        <h1>Are you sure you want to log out?</h1>
        <div style={{display: "flex", gap: "1rem"}}>
        <button className="modal-button" onClick={() => {
          setLogOut(false)
          props.setUserInfo(prev => prev = null)
        }}>Yes</button>
        <button className="modal-button" onClick ={() => {
          setLogOut(false)
        }}>No</button>
        </div>
      </div>
    </div> : null}
    { props.moreButton && <aside className="sidebar-2">
      <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
      <div className="sidebar-2-top">
          <a href="#"><img className="icon" src="/studypro/images&icons/settings.png" /></a>
          <a href="#"><img className="icon" src="/studypro/images&icons/user.png" /></a>
          <a href="#"><img className="cross" src="/studypro/images&icons/cross.png" onClick={handleCrossClick}/></a>
        </div>
      <div className="home-and-calendar-container">
      <span className="sidebar-option"
      onClick={() => {
        props.setGoToHome(prev => prev = !prev)
      }}
      ><img className="icon sidebar-icon" src="studypro/images&icons/home.png" /><span className="sidebar-2-text">Home</span></span>
      <span className="sidebar-option"
      onClick={() => {
        props.setGoToCalendar(prev => prev = !prev)
      }}
      ><img className="icon sidebar-icon" src="studypro/images&icons/schedule.png" /><span className="sidebar-2-text">Calendar</span></span>
      </div>
      <div className="tasks-container" >
      <span className="sidebar-option" onClick={() => {
        handleOnClick()
        props.setGoToActivities(prev => prev = !prev)}}><img className="icon sidebar-icon" src="studypro/images&icons/checklist.png" /><span className="sidebar-2-text">Activities↓</span></span>
      { activities === true &&
      <div className="tasks">
      <span className="sidebar-option activity" onClick={() => {props.setSidebarActivityType("Task")}}><img className="icon sidebar-icon" src="studypro/images&icons/clipboard.png" /><span className="sidebar-2-text">Tasks</span></span>
      <span className="sidebar-option activity" onClick={() => {props.setSidebarActivityType("Quizz")}}><img className="icon sidebar-icon" src="studypro/images&icons/quiz.png" /><span className="sidebar-2-text">Quizzes</span></span>
      <span className="sidebar-option activity" onClick={() => {props.setSidebarActivityType("Exam")}}><img className="icon sidebar-icon" src="studypro/images&icons/test.png" />Exams<span className="sidebar-text"></span></span>
      <span className="sidebar-option activity" onClick={() => {props.setSidebarActivityType("Vacation")}}><img className="icon sidebar-icon" src="studypro/images&icons/vacations.png" />Vacations<span className="sidebar-text"></span></span>
      </div>
      }
      </div>
    </div>
    <span className="sidebar-option activity logout" onClick={() => setLogOut(true)}><img className="icon sidebar-icon" src="studypro/images&icons/logout.png" /><span className="sidebar-text">Log out</span></span>
    </aside>}
    </>
  )
}