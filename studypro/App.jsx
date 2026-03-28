import { useState, useEffect, useRef } from "react"
import Header from "./components/Header"
import Login from "./components/Login"
import Sidebar from "./components/Sidebar"
import Main from "./components/Main"
import { nanoid } from "nanoid"

export default function App() {
  const [userInfo, setUserInfo] = useState(getUserInfo())
  const [moreButton, setMoreButton] = useState(false)
  const [goToHome, setGoToHome] = useState(false)
  const home = useRef(null)
  const [goToCalendar, setGoToCalendar] = useState(false)
  const calendar = useRef(null)
  const activityCard= useRef(null)
  const [goToActivities, setGoToActivities] = useState(false)
  const [sidebarActivityType, setSidebarActivityType] = useState("")

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

  function getUserInfo() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo")) || null
    return userInfo
  }

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
    setSidebarActivityType = {setSidebarActivityType}/>
    </>
    }
    </>
  )
}