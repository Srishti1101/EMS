import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const MarkOutTime = () => {
  
    const [attendance, setAttendance] = useState({
      outtime: ""
    });
    const currentDate = new Date();
    const {id} = useParams()
    const navigate = useNavigate()
    
const handleOutTime=()=>{
  const lastClickTime = localStorage.getItem('lastClickTime');

  if (!lastClickTime || currentDate - new Date(lastClickTime) > 0 * 60 * 60 * 1000) {
    const currentTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setAttendance(prevState => ({
      ...prevState,
      outtime: currentTime
    }));

    // Store the current timestamp in localStorage
    localStorage.setItem('lastClickTime', currentDate.toString());
  }
}

  const handleSubmit = (e) => {
    e.preventDefault();
   
    axios.put('http://localhost:3000/employee/edit_attendance', attendance)
      .then(result => {
        if (result.data.Status) {
          navigate(`/dashboardemployee/${id}/attendancemark`)
        } else {
          console.log(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };
  return (
    <div className='d-flex justify-content-center align-items-center mt-3'>
    <div className=" border border-3 border-dark col-8 rounded p-3 m-3 loginForm">
         <form onSubmit={handleSubmit}>
    <div className='row'>
  <div className="mb-3 col">
    <label htmlFor="intime" className="form-label"><strong>Out Time</strong></label>
    <input type="text" className="form-control" id="intime" name='intime' aria-describedby="emailHelp" value={attendance.outtime} readOnly/>
    <i className="bi bi-alarm" onClick={handleOutTime}></i>
  </div>
  </div>
  
  <button type="submit" className="btn btn-primary m-3">Mark Out Time</button>
  
</form>
     </div>
    </div>
  )
}

export default MarkOutTime
