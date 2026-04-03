import { useState, useRef, useEffect, memo } from "react"
import dayjs from "dayjs"
import { nanoid } from "nanoid"
import { subjects } from "../utils/activityImages.js"
import PixelBlast from './PixelBlast';
import Carousel from '../components/Carousel.jsx'
import clsx from 'clsx';

export function RenderActivity(props) {
  const [newActivity, setNewActivity] = useState(false)
  const [viewMore, setViewMore] = useState(false)
  const carouselWrapperRef = useRef(null)
  const [carouselWidth, setCarouselWidth] = useState(300)

  const isDoneBtnClicked = props.activity && props.activity.id
  //const isIdUndefined = props.activity.id ? true : false;

  /*useEffect(() => {
    localStorage.setItem("isNewActivityClicked", JSON.stringify(true))
  }, [newActivity])

  function getNewActivity() {
    try {
      const getNewActivityFromStorage = JSON.parse(localStorage.getItem("isNewActivityClicked")) || false;
      return getNewActivityFromStorage
    } catch (error) {
      console.error("An error occured. Please try again later", error)
    }
  }*/


  function handleNewActivityClick() {
    setNewActivity(prev => prev = true)
  }

  function handleActivityForm(e) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const activityType= formData.get("activityType") !== "" ? formData.get("activityType") : null
    const subject = formData.get("subject") !== "" ? formData.get("subject") : null
    const description = formData.get("activityDescription") !== "" ? formData.get("activityDescription") : null
    const dueDate = formData.get("activityDueDate") !== "" ? formData.get("activityDueDate") : null

    if (activityType && subject && description && dueDate) {
      props.setActivities(prev => {
      if (activityType !== "" && description !== "" && dueDate !== "") {
        return [...prev, {
          id: nanoid(),
          activityType: activityType,
          subject: subject,
          description: description,
          dueDate: dayjs(dueDate).format("MM/DD/YYYY"),
          timeOfSubmission: dayjs()
        }
        ]
      } else {
        return [...prev]
      }
    })
    } else {
      alert("Please fill in the necesary information to continue")
    }
    
  }
  
    const des = props.activity.description ? props.activity.description : false; 
    const descriptionSplit = des !== false ? des.split("") : false;
    let shortenedDesArr = []
    for (let i = 0; i < 9; i++) {
      descriptionSplit ? shortenedDesArr.push(descriptionSplit[i]) : []
    }
    const shortenedDesJoined = shortenedDesArr.join("") 

    function deleteActivity() {
      props.setActivities(prev => {
        return prev.filter(activity => activity.id !== props.activity.id)
      })
    }

    let selectedImg;
    props.index > 0 ?  props.activity.id ? selectedImg = subjects.find(subject =>
    subject.name.trim().toLowerCase() === props.activity?.subject?.trim().toLowerCase()
) : null : null

   // ✅ Build the items here where we have access to props.activity
  const carouselItems = [
    {
      title: 'Activity Type',
      description: props.activity.activityType ?? 'N/A',
      id: 1,
    },
    {
      title: 'Subject',
      description: props.activity.subject ?? 'N/A',
      id: 2,
    },
    {
      title: 'Description',
      description: props.activity.description ?? 'N/A',
      id: 3,
    },
    {
      title: 'Due Date',
      description: props.activity.dueDate ?? 'N/A',
      id: 4,
    },
    {
      title: 'Status',
      description: 'Pending',
      id: 5,
    },
  ]

  useEffect(() => {
  const el = carouselWrapperRef.current
  if (!el) return
  const observer = new ResizeObserver(([entry]) => {
    setCarouselWidth(entry.contentRect.width)
  })
  observer.observe(el)
  return () => observer.disconnect()
}, [])


  const className= clsx("activity-card", {
    "filtered-activity" : props.sidebarActivityType !== "" ? props.sidebarActivityType === props.activity.activityType ? false : true : false
  })

  return (
    <>
    <div className={className} style={{position: "relative"}} ref={props.activityCard}>
      { isDoneBtnClicked && props.activity.id ? <img className="activity-image" src={selectedImg?.image && selectedImg.image}/>: null}
      {!newActivity && !isDoneBtnClicked && <span className="new-activity-span" onClick={handleNewActivityClick}>➕Add a new activity</span>}
        {newActivity ? <form style={{zIndex: "1"}} onSubmit={handleActivityForm}>
          <label htmlFor="activity-option" className="activity-option-label">Select the kind of activity you wish to add</label>
          <select id="activity-option" name="activityType">
            <option>Task</option>
            <option>Quizz</option>
            <option>Exam</option>
            <option>Vacation</option>
          </select>
          <div style={{position:"relative"}}>
            <label htmlFor="acivity-option" className="activity-option-label">Select your subject</label>
            <select id="activity-option" name="subject" style={{marginBlock: "1rem"}}>
            <option>English</option>
            <option>French</option>
            <option>Arabic</option>
            <option>Biology</option>
            <option>Mathematics</option>
            <option>Biology</option>
            <option>Chemistry</option>
            <option>Physics</option>
            <option>History</option>
            <option>Geography</option>
            <option>Philosophy</option>
            <option>Economics</option>
            <option>Computer Science</option>
            <option>Information Technology</option>
            <option>Art</option>
            <option>Music</option>
            <option>Physical Education</option>
            <option>Religious Education</option>
            <option>Sociology</option>
            <option>Psychology</option>
            <option>Environmental Science</option>
            <option>Statistics</option>
            <option>Literature</option>
            <option>Drama</option>
            <option>Design & Technology</option>
            <option>Business Studies</option>
            <option>Vacation</option>
          </select>
          <textarea id="activity-option" type="text" placeholder="Please write a small description of your activity" name="activityDescription" ></textarea>
          </div>
          <label htmlFor="acivity-option" className="activity-option-label">Select the duedate of your activity</label>
          <input id="activity-option" type="date" name="activityDueDate"/>
          <button className="done-activity-button">Done</button>
          </form> : null}

          {isDoneBtnClicked &&
          <div className="activity-container" >                                                                  
          <h1 className="activity-after-click" name="activityType">Activity Type: <span style={{color: "rgba(0,0,0,0.6", fontWeight: "500"}}>{props.activity.activityType}</span></h1>
          <h1 className="activity-after-click">Subject: <span style={{color: "rgba(0,0,0,0.6", fontWeight: "500"}}>{props.activity.subject}</span></h1>
          <h1 className="activity-after-click">Description: <span style={{color: "rgba(0,0,0,0.6", fontWeight: "500", width: "fit-content"}}>{shortenedDesJoined}...
            <span style={{textDecoration: "underline", cursor:"pointer"}} onClick={() => { setViewMore(prev => prev = true) }}>View more</span></span>
            </h1>
          <h1 className="activity-after-click">Due date: <span style={{color: "rgba(0,0,0,0.6", fontWeight: "500"}}>{props.activity.dueDate}</span></h1>
          <button className="delete-activity-button" onClick={deleteActivity}>Delete</button>
          </div>   
          }

          { viewMore && <div className="view-more-tab-container">
            <a className="close-view-more" title="close this page" onClick={() => setViewMore(prev => prev = false)}>❌</a>
            <div className="view-more-background">
              <PixelBlast
              variant="square"
              pixelSize={4}
              color="#B19EEF"
              patternScale={2}
              patternDensity={1}
              pixelSizeJitter={0}
              enableRipples
              rippleSpeed={0.4}
              rippleThickness={0.12}
              rippleIntensityScale={1.5}
              liquid={false}
              liquidStrength={0.12}
              liquidRadius={1.2}
              liquidWobbleSpeed={5}
              speed={0.5}
              edgeFade={0.25}
              transparent
            />
            </div>
            <div className="cards-grid">
              <img className="view-more-image" src={selectedImg.image}/>
            <div ref={carouselWrapperRef} className="carousel-container">
            <Carousel
            items={carouselItems}
            activityType = {props.activity.activityType}
            baseWidth={window.innerWidth * 0.77}
            autoplay={true}
            autoplayDelay={20000}
            pauseOnHover={false}
            loop={false}
            round={false}
          />
          </div>
          <button className="mark-as-done-button" onClick={() => {
            
            props.setTotalTasksCompleted(prev => [...prev , props.activity])
            deleteActivity()
          }}>Mark as done</button>
            </div>

          </div>}

          </div>
          </>
  )
}
