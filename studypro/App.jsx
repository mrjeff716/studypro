import { useState, useEffect, useRef } from "react"
import Header from "./components/Header"
import Login from "./components/Login"
import Sidebar from "./components/Sidebar"
import Main from "./components/Main"
import { nanoid } from "nanoid"
import dayjs from "dayjs"

export default function App() {
  const [userInfo, setUserInfo] = useState(getUserInfo())
  const [moreButton, setMoreButton] = useState(false)
  const [goToHome, setGoToHome] = useState(false)
  const home = useRef(null)
  const [goToCalendar, setGoToCalendar] = useState(false)
  const calendar = useRef(null)
  const [goToActivities, setGoToActivities] = useState(false)
  const activityCard= useRef(null)
  const [sidebarActivityType, setSidebarActivityType] = useState("")
  const [weeklyTasksCompleted, setWeeklyTasksCompleted] = useState(getWeeklyTasksCompleted())
  const [totalTasksCompleted, setTotalTasksCompleted] = useState(getTotalTasksCompleted())

  /*ACTIVITIES ARRAY*/const [activities, setActivities] = useState(getActivities())

  function getActivities() {
    let returnedActivities = JSON.parse(localStorage.getItem("activities")) || [{}]
    return returnedActivities
  } 
  

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities))
  }, [activities])

  useEffect(() => {
        if (home.current !== null) {
          home.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start', // Aligns the top of the element to the top of the viewport
          })                       
        }
      }, [goToHome])
  
  useEffect(() => {
        if (activityCard.current !== null) {
          activityCard.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start', // Aligns the top of the element to the top of the viewport
          })                       
        }
      }, [goToActivities])
  
  useEffect(() => {
        if (calendar.current !== null) {
          calendar.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start', // Aligns the top of the element to the top of the viewport
          })                       
        }
      }, [goToCalendar])

  useEffect(() => {
    if (home.current !== null) {
      home.current.scrollIntoView({
    behavior: 'smooth',
    block: 'start', // Aligns the top of the element to the top of the viewport
      })                       
    }
  }, [])

  function getUserInfo() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo")) || null
    return userInfo
  }

    function getTotalTasksCompleted() {
    const getTotalTasksCompleted = JSON.parse(localStorage.getItem("totalTasksCompleted")) || [];
    return getTotalTasksCompleted
  }

  useEffect(() => {
    localStorage.setItem("totalTasksCompleted", JSON.stringify(totalTasksCompleted))
  }, [totalTasksCompleted])

  function getWeeklyTasksCompleted() {
    const getWeeklyTasksCompleted = JSON.parse(localStorage.getItem("totalTasksCompleted")) || 0;
    return getWeeklyTasksCompleted
  }

  useEffect(() => {
    localStorage.setItem("weeklyTasksCompleted", JSON.stringify(weeklyTasksCompleted))
  }, [weeklyTasksCompleted])

  useEffect(() => {
    function formatWeeklyTasksCompleted() {
  // Use .filter to keep items that are NOT older than 7 days
  const filteredTasks = totalTasksCompleted.filter(task => {
    const isExpired = dayjs().diff(dayjs(task.timeOfSubmission), 'day') >= 7;
    return !isExpired; // Only keep it if it's NOT expired
  });

  // Update the state with the new array
  setWeeklyTasksCompleted(filteredTasks);
  
  // Also update LocalStorage so it persists for the next visit
  localStorage.setItem("weeklyTasksCompleted", JSON.stringify(filteredTasks));
  console.log("checked for weekly tasks completed", "weeklyTasksCompleted:", weeklyTasksCompleted.length)
  }
  formatWeeklyTasksCompleted()
  }, [])


  return (
    <>
    {userInfo === null ? <Login userInfo = {userInfo} setUserInfo = {setUserInfo}/> :
    <>
    <Header userInfo={userInfo} moreButton={moreButton} setMoreButton={setMoreButton}/>
    <Sidebar
    moreButton={moreButton}
    setMoreButton={setMoreButton}
    goToHome={goToHome}
    setGoToHome={setGoToHome}
    goToCalendar={goToCalendar}
    setGoToCalendar={setGoToCalendar}
    setGoToActivities = {setGoToActivities}
    setSidebarActivityType = {setSidebarActivityType}
    />

    <Main home={home} calendar={calendar} activities={activities} setActivities={setActivities} activityCard={activityCard} sidebarActivityType={sidebarActivityType}
    setSidebarActivityType = {setSidebarActivityType} totalTasksCompleted={totalTasksCompleted} setTotalTasksCompleted={setTotalTasksCompleted}
    setWeeklyTasksCompleted={setWeeklyTasksCompleted} weeklyTasksCompleted={weeklyTasksCompleted}/>
    </>
    }
    </>
  )
}