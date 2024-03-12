import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const HomeEmployee = () => {
  const [employee, setEmployee] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/employee/detail/' + id)
      .then(result => {
        setEmployee(result.data[0]);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='employeePage flex-column'>
      {employee && (
        <>
          {/* <img src={`http://localhost:3000/Images/` + employee.image} className='profile_image' /> */}
          <div className='d-flex align-items-center flex-column justify-content-center m-4'>
            <h3>Id: {employee.eid}</h3>
            <h3>Name: {employee.name}</h3>
            <h3>Email: {employee.email}</h3>
            <h3>Salary: Rs.{employee.salary}</h3>
          </div>
          <Link to={`/dashboardemployee/` + id + `/edit_self`} className='btn btn-primary me-2'>Edit</Link>
        </>
      )}
    </div>
  );
};

export default HomeEmployee;
