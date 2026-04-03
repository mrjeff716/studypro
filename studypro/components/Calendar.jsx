import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import dayjs from 'dayjs'

export default function Calendar(props) {
  const calendarActivities = props.activities.map((activity, index) => {
    const title = `${activity.activityType} (${activity.subject})`;
    return activity.id ? {title: title, date: dayjs(activity.dueDate).format("YYYY-MM-DD")} : {}
  })
  return (
    <FullCalendar
      plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
      initialView="dayGridMonth"
      aspectRatio={0.9}  // Adjust this (lower = taller cells)
      handleWindowResize={true}
        events={calendarActivities}
    />
  )
}