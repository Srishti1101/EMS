import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const MarkAttendance = () => {
    const [employee, setEmployee] = useState([])
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:3000/employee/detail/'+id)
        .then(result =>{
          setEmployee(result.data[0]);
        }
    )
        .catch(err => console.log(err))
    }, [])
    
  const [attendance, setAttendance] = useState({
    eid: "",
    name: "",
    attendancedate: "",
    intime: "",
    outtime: ""
  });

  const currentDate = new Date();
  useEffect(() => {
    const formattedDate = currentDate.toISOString().split('T')[0];
    setAttendance(prevState => ({
        ...prevState,
        attendancedate: formattedDate,
        eid:employee.eid,
        name:employee.name
    }));
}, [employee]);

const handleInTime=()=>{
  const lastClickTime = localStorage.getItem('lastClickTime');

  if (!lastClickTime || currentDate - new Date(lastClickTime) > 0 * 60 * 60 * 1000) {
    const currentTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setAttendance(prevState => ({
      ...prevState,
      intime: currentTime
    }));

    // Store the current timestamp in localStorage
    localStorage.setItem('lastClickTime', currentDate.toString());
  } 
};

  const handleSubmit = (e) => {
    e.preventDefault();
   
    axios.post('http://localhost:3000/employee/add_attendance', attendance)
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
    {employee && (
    <div className=" border border-3 border-dark col-8 rounded p-3 m-3 loginForm">
         <form onSubmit={handleSubmit}>
    <div className='row'>
    <div className="col mb-3">
    <label htmlFor="eid" className="form-label"><strong>Employee ID</strong></label>
    <input type="text" className="form-control" id="eid" name='eid' aria-describedby="emailHelp"   value={employee.eid} disabled readOnly/>
  </div>
  <div className="col mb-3">
    <label htmlFor="name" className="form-label"><strong>Employee Name</strong></label>
    <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp"   value={employee.name} disabled readOnly/>
  </div>
  </div>
    <div className='row'>
  <div className="mb-3 col">
    <label htmlFor="attendancedate" className="form-label"><strong>Date</strong></label>
    <input type="text" className="form-control" id="attendancedate" name='attendancedate' aria-describedby="emailHelp" value={attendance.attendancedate} disabled readOnly/>
  </div>
  <div className="mb-3 col">
    <label htmlFor="intime" className="form-label"><strong>In Time</strong></label>
    <input type="text" className="form-control" id="intime" name='intime' aria-describedby="emailHelp" value={attendance.intime} readOnly/>
    <i className="bi bi-alarm" onClick={handleInTime}></i>
  </div>
  </div>
  
  <button type="submit" className="btn btn-primary m-3">Mark In Time</button>
  <Link to={`/dashboardemployee/${id}/attendanceouttime/`} className="btn btn-primary m-3">Mark out Time</Link>
</form>
     </div>
     )}
     </div>
  );
};

export default MarkAttendance;
