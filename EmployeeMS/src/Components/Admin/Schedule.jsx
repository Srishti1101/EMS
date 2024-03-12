import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

const localizer = momentLocalizer(moment);

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });

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
  
  
  
  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleAddEvent = () => {
    axios.post('http://localhost:3000/auth/events', newEvent, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        // Refresh events after adding a new event
        fetchEvents();
        setNewEvent({ title: '', start: '', end: '' });
      })
      .catch((error) => console.error('Error adding event:', error));
  };

  return (
    <div className='m-3'>
      
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
      <div className='m-3'>
        <form>
          <label className='m-3'>Title:</label>
          <input type="text" name="title" value={newEvent.title} onChange={handleInputChange} />
          <br />
          <label className='m-3'>Start Time:</label>
          <input type="datetime-local" name="start" value={newEvent.start} onChange={handleInputChange} />
          <br />
          <label className='m-3'>End Time:</label>
          <input type="datetime-local" name="end" value={newEvent.end} onChange={handleInputChange} />
          <br />
          <button type="button" className="button btn btn-primary" onClick={handleAddEvent}>
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default Calendar;
