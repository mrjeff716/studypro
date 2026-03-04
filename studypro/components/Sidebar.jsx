import { useState } from "react"

export default function Sidebar(props) {
  const [activities, setActivities] = useState(false)

  
  function handleOnClick() {
    setActivities(prevActivities => prevActivities = !prevActivities)
    console.log("clicked")
  }
  function handleCrossClick() {
    props.setMoreButton(prevMoreButton => prevMoreButton = false)
  }
  return (
    <>
    <aside>
      <div className="home-and-calendar-container">
      <span className="sidebar-option"><img className="icon sidebar-icon" src="studypro/images&icons/home.png" /><span className="sidebar-text">Home</span></span>
      <span className="sidebar-option"><img className="icon sidebar-icon" src="studypro/images&icons/schedule.png" /><span className="sidebar-text">Calendar</span></span>
      </div>
      <div className="tasks-container" onClick={handleOnClick} >
      <span className="sidebar-option"><img className="icon sidebar-icon" src="studypro/images&icons/checklist.png" /><span className="sidebar-text">Activities↓</span></span>
      { activities === true &&
      <div className="tasks">
      <span className="sidebar-option activity"><img className="icon sidebar-icon" src="studypro/images&icons/clipboard.png" /><span className="sidebar-text">Tasks</span></span>
      <span className="sidebar-option activity"><img className="icon sidebar-icon" src="studypro/images&icons/quiz.png" /><span className="sidebar-text">Quizzes</span></span>
      </div>
      }
      </div>
    </aside>
    { props.moreButton && <aside className="sidebar-2">
      <div className="sidebar-2-top">
          <a href="#"><img className="icon" src="/studypro/images&icons/settings.png" /></a>
          <a href="#"><img className="icon" src="/studypro/images&icons/user.png" /></a>
          <a href="#"><img className="cross" src="/studypro/images&icons/cross.png" onClick={handleCrossClick}/></a>
        </div>
      <div className="home-and-calendar-container">
      <span className="sidebar-option"><img className="icon sidebar-icon" src="studypro/images&icons/home.png" /><span className="sidebar-2-text">Home</span></span>
      <span className="sidebar-option"><img className="icon sidebar-icon" src="studypro/images&icons/schedule.png" /><span className="sidebar-2-text">Calendar</span></span>
      </div>
      <div className="tasks-container" onClick={handleOnClick} >
      <span className="sidebar-option"><img className="icon sidebar-icon" src="studypro/images&icons/checklist.png" /><span className="sidebar-2-text">Activities↓</span></span>
      { activities === true &&
      <div className="tasks">
      <span className="sidebar-option activity"><img className="icon sidebar-icon" src="studypro/images&icons/clipboard.png" /><span className="sidebar-2-text">Tasks</span></span>
      <span className="sidebar-option activity"><img className="icon sidebar-icon" src="studypro/images&icons/quiz.png" /><span className="sidebar-2-text">Quizzes</span></span>
      </div>
      }
      </div>
    </aside>}
    </>
  )
}