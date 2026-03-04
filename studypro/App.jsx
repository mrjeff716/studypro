import { useState, useEffect } from "react"
import Header from "./components/Header"
import Login from "./components/Login"
import Sidebar from "./components/Sidebar"
import Main from "./components/Main"

export default function App() {
  const [userInfo, setUserInfo] = useState(getUserInfo())
  const [moreButton, setMoreButton] = useState(false)

  function getUserInfo() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo")) || null
    return userInfo
  }

  return (
    <>
    {userInfo === null ? <Login userInfo = {userInfo} setUserInfo = {setUserInfo}/> :
    <>
    <Header userInfo={userInfo} moreButton={moreButton} setMoreButton={setMoreButton}/>
    <Sidebar moreButton={moreButton} setMoreButton={setMoreButton}/>
    <Main />
    </>
    }
    </>
  )
}