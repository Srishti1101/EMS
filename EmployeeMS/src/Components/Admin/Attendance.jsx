import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/employee/attendance')
      .then(result => {
        if (result.data.Status) {
          setAttendance(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString();
  };

  return (
    <div className='px-5 mt-5'>
      <div className='d-flex justify-content-center'>
        <h2> Attendance List</h2>
      </div>
      <div>
        <table className="table mt-3">
          <thead className="table-dark mt-3">
            <tr>
              <th scope='col'>EmployeeID</th>
              <th scope="col">Name</th>
              <th scope="col">Date</th>
              <th scope="col">In Time</th>
              <th scope="col">Out Time</th>
            </tr>
          </thead>
          <tbody>
            {
              attendance.map(d => (
                <tr key={d.id}>
                  <td>{d.eid}</td>
                  <td>{d.name}</td>
                  <td>{formatDate(d.attendancedate)}</td>
                  <td>{d.intime}</td>
                  <td>{d.outtime}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
