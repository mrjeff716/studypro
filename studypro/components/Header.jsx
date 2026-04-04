import dayjs from 'dayjs'
import { useEffect, useState } from "react"

export default function Header(props) {
  const [dateAndTime, setDataAndTime] = useState({
    time: dayjs().format('h:mm A'),
    date: dayjs().format('dddd, MMMM D')
  })


  function handleMoreButton() {
    props.setMoreButton(prevMoreButton => prevMoreButton = true)
  }

  setInterval(() => {
    setDataAndTime((prevDateAndTime) => {
      return prevDateAndTime = {
        time: dayjs().format('h:mm A'),
        date: dayjs().format('dddd, MMMM D')
      }
    })
  }, 1000)

  return (
    <header>
      <nav>
        <div className="nav-left">
        <img className="study-pro-logo" src="/images&icons/BlackIllustratedSchoolLogowithtext.png"/>
        <img className="study-pro-logo without-text" src="/images&icons/BlackIllustratedSchoolLogowithouttext.png"/>
        <p className="time">{dateAndTime.time}</p>
        <p className="date">{dateAndTime.date}</p>
        <h1 className="mobile-title">StudyPro</h1>
        </div>

        <div className="nav-right">
          {/*<a href="#"><img className="icon" src="/images&icons/settings.png" /></a>
          <a href="#"><img className="icon" src="/images&icons/user.png" /></a>*/}
          <h2>{props.userInfo.name} {props.userInfo.familyName}</h2>
          <div className="more-button" onClick={handleMoreButton}><img src="/images&icons/more.png" /></div>
        </div>
      </nav>
    </header>
  )
}