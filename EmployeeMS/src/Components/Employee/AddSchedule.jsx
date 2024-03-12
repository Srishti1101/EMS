import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const localizer = momentLocalizer(moment);

const Calendar = () => {
  const [employee, setEmployee] = useState({});
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });

  const { id } = useParams();

  useEffect(() => {
    // Fetch employee details and events when the component mounts
    fetchEmployeeDetails();
    fetchEvents();
  }, [id]);

  const fetchEmployeeDetails = () => {
    axios.get(`http://localhost:3000/employee/detail/${id}`)
      .then(result => {
        setEmployee({ ...result.data[0], eid: result.data[0].eid });
      })
      .catch(err => console.log(err));
  };

  const fetchEvents = () => {
    // Fetch events with the employee ID
    axios.get(`http://localhost:3000/employee/events/${employee.eid}`)
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
  };

  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleAddEvent = () => {
    // Add the employee ID to the new event before sending the request
    const eventToAdd = { ...newEvent, eid: employee.eid };

    axios.post('http://localhost:3000/employee/events', eventToAdd, {
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
