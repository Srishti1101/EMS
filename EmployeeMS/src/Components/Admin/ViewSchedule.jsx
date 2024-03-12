import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

const localizer = momentLocalizer(moment);

const Calendar = () => {
  const [eid, setEid] = useState(''); // State to store the eid
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events when the component mounts
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    // Fetch events only if the eid is not empty
    if (eid) {
      axios.get(`http://localhost:3000/auth/eventsemp/${eid}`)
        .then((response) => {
          if (Array.isArray(response.data.Result)) {
            const formattedEvents = response.data.Result.map((event) => {
              try {
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
    
            const validEvents = formattedEvents.filter((event) => event !== null);
    
            setEvents(validEvents);
          } else {
            console.error('Invalid response structure:', response.data);
          }
        })
        .catch((error) => console.error('Error fetching events:', error));
    }
  };

  const handleInputChange = (e) => {
    setEid(e.target.value);
  };

  const handleFetchEvents = () => {
    // Trigger fetching events when the button is clicked
    fetchEvents();
  };

  return (
    <div className='m-3 text-center p-3'>
      <label htmlFor="eidInput"><strong>Enter Eid</strong></label>
      <input
        type="text"
        id="eidInput"
        value={eid}
        className='m-3'
        onChange={handleInputChange}
        placeholder="Enter Eid"
      />
      <button className='button btn btn-primary' onClick={handleFetchEvents}>Submit</button>
      <div className='m-3'>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
      </div>
    </div>
  );
};

export default Calendar;
