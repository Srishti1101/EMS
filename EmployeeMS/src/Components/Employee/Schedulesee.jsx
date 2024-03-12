import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

const localizer = momentLocalizer(moment);

const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios.get('http://localhost:3000/auth/events')
      .then((response) => {
        if (Array.isArray(response.data.Result)) {
          const formattedEvents = response.data.Result.map((event) => {
            try {
  
              // Parse date strings manually
              const parsedStart = moment(event.start_time, 'YYYY-MM-DD HH:mm:ss').toDate();
              const parsedEnd = moment(event.end_time, 'YYYY-MM-DD HH:mm:ss').toDate();
  
              return {
                id: event.id,
                title: event.title,
                start: isNaN(parsedStart) ? null : parsedStart,
                end: isNaN(parsedEnd) ? null : parsedEnd,
              };
            } catch (error) {
              console.error('Error parsing dates for event:', event, error);
              return null;
            }
          });
  
          // Filter out events with null values (failed parsing)
          const validEvents = formattedEvents.filter((event) => event !== null);
  
          setEvents(validEvents);
        } else {
          console.error('Invalid response structure:', response.data);
        }
      })
      .catch((error) => console.error('Error fetching events:', error));
  };
  

  return (
    <div className='m-3 text-center p-3'>
      <h1 className='m-3 '>Admins Schedule</h1>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
      
    </div>
  );
};

export default Calendar;
