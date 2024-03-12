import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Employee = () => {
  const[employee,setEmployee]=useState([])
  const navigate=useNavigate();
  useEffect(()=>{
     axios.get('http://localhost:3000/auth/employee')
     .then(result=>{
      if(result.data.Status){
        setEmployee(result.data.Result)
      }
      else{
        alert(result.data.Error)
      }
     })
     .catch(err=>console.log(err))
  },[]);

const handleDelete=(id)=>{
  axios.delete('http://localhost:3000/auth/delete_employee/'+id)
  .then(result=>{
    if(result.data.Status){
      window.location.reload();
    }
    else{
      alert(result.data.Error)
    }
   })
   .catch(err=>console.log(err))
}
  return (
    <div className='px-5 mt-5'>
      <div className='d-flex justify-content-center'>
      <h2> Employee List</h2>
      </div>
      <Link to="/dashboard/add_employee" className='btn btn-secondary'>Add Employee</Link>
      <div>
      <table className="table  mt-3">
  <thead className="table-dark mt-3">
    <tr>
      <th scope='col'>Employee ID</th>
      <th scope="col">Name</th>
      <th scope="col">Photo</th>
      <th scope="col">Email</th>
      <th scope="col">Address</th>
      <th scope="col">Contact</th>
      <th scope="col">Energency Contact</th>
      <th scope="col">Salary</th>
      <th scope="col">Job Role</th>
      <th scope="col">Department</th>
      <th scope="col">Training Required</th>
    </tr>
  </thead>
  <tbody>
    {
      employee.map(d=>(
        <tr>
          <td>{d.eid}</td>
          <td >{d.name}</td>
          <td><img src={`http://localhost:3000/Images/` + d.image} className='employee_image' alt="" /></td>
          <td>{d.email}</td>
          <td>{d.address}</td>
          <td>{d.contact}</td>
          <td>{d.emergencycontact}</td>
          <td>{d.salary}</td>
          <td>{d.jobrole}</td>
          <td>{d.department_id}</td>
          <td>{d.training}</td>
          <div className="row">
          <Link to={`/dashboard/edit_employee/`+d.id} className="m-2 bi bi-pencil-square delete_employee"></Link>
          <i onClick={()=>handleDelete(d.id)} className="m-2 bi bi-trash3-fill delete_employee"></i>
          </div>
        </tr>
      ))
    }
  </tbody>
</table>
    </div>
    </div>
    
  )
}

export default Employee
