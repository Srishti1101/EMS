import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddEmployee = () => {
  const navigate=useNavigate()
  const[employees,setEmployees]=useState({
    eid:"",
    name: "",
    email: "",
    address: "",
    contact:"",
    emergencycontact:"",
    salary: "",
    jobrole:"",
    department_id: "",
    image: "",
    training:"",
    password: ""
  });

  const[departments,setDepartments]=useState([])
  useEffect(()=>{
     axios.get('http://localhost:3000/auth/department')
     .then(result=>{
      if(result.data.Status){
        setDepartments(result.data.Result)
      }
      else{
        alert(result.data.Error)
      }
     })
     .catch(err=>console.log(err))
  },[])

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('eid', employees.eid);
    formData.append('name', employees.name);
    formData.append('email', employees.email);
    formData.append('address', employees.address);
    formData.append('contact', employees.contact);
    formData.append('emergencycontact', employees.emergencycontact);
    formData.append('salary', employees.salary);
    formData.append('jobrole', employees.jobrole);
    formData.append('department_id', employees.department_id);
    formData.append('image', employees.image);
    formData.append('training', employees.training);
    formData.append('password', employees.password);

    axios.post('http://localhost:3000/auth/add_employee',formData)
    .then(result=>{
      if(result.data.Status){
        navigate('/dashboard/employee')
      }
      else{
       console.log(result.data.Error)
      }
    })
    .catch(err=>console.log(err))
  }

  return (
    <div className='d-flex justify-content-center align-items-center'>
    <div className=" border border-3 border-dark col-8 rounded p-3 m-3 loginForm">
        <h2>Add Employee</h2>
    <form onSubmit={handleSubmit}>
    <div className='row'>
    <div className="col mb-3">
    <label htmlFor="eid" className="form-label"><strong>Employee ID</strong></label>
    <input type="text" className="form-control" id="eid" name='eid' aria-describedby="emailHelp" placeholder='John'   onChange={(e) =>setEmployees({ ...employees, eid: e.target.value })}/>
  </div>
  <div className="col mb-3">
    <label htmlFor="employee" className="form-label"><strong>Employee Name</strong></label>
    <input type="text" className="form-control" id="employee" name='employee' aria-describedby="emailHelp" placeholder='John'   onChange={(e) =>setEmployees({ ...employees, name: e.target.value })}/>
  </div>
  </div>
    <div className='row'>
  <div className="mb-3 col">
    <label htmlFor="email" className="form-label"><strong>Email Address</strong></label>
    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" placeholder='john@gmail.com' onChange={(e) =>
                setEmployees({ ...employees, email: e.target.value })}/>
  </div>
  <div className="mb-3 col">
    <label htmlFor="password" className="form-label"><strong>Password</strong></label>
    <input type="password" className="form-control" id="password" name='password' aria-describedby="emailHelp" placeholder='*******' onChange={(e) =>setEmployees({ ...employees, password: e.target.value })}/>
  </div>
  </div>
  <div className='row'>
  <div className="mb-3 col">
    <label htmlFor="address" className="form-label"><strong>Address</strong></label>
    <input type="text" className="form-control" id="address" name='address' aria-describedby="emailHelp" placeholder='Haryana, India' onChange={(e) =>setEmployees({ ...employees, address: e.target.value })}/>
  </div>
  
  <div className="mb-3 col">
    <label htmlFor="contact" className="form-label"><strong>Contact no.</strong></label>
    <input type="text" className="form-control" id="contact" name='contact' aria-describedby="emailHelp" placeholder='+91xxxxxxxxxx' onChange={(e) =>setEmployees({ ...employees, contact: e.target.value })}/>
  </div>
  </div>
  <div className='row'>
  <div className="mb-3 col">
    <label htmlFor="emergencycontact" className="form-label"><strong>Emergency Contact</strong></label>
    <input type="text" className="form-control" id="emergencycontact" name='emergencycontact' aria-describedby="emailHelp" placeholder='+91xxxxxxxxxx' onChange={(e) =>setEmployees({ ...employees, emergencycontact: e.target.value })}/>
  </div>
  <div className="mb-3 col">
    <label htmlFor="salary" className="form-label"><strong>Salary</strong></label>
    <input type="text" className="form-control" id="salary" name='salary' aria-describedby="emailHelp" placeholder='50000' onChange={(e) =>setEmployees({ ...employees, salary: e.target.value })}/>
  </div>
  </div>
  <div className='row'>
  <div className="mb-3 col">
    <label htmlFor="jobrole" className="form-label"><strong>Job Role</strong></label>
    <input type="text" className="form-control" id="jobrole" name='jobrole' aria-describedby="emailHelp" placeholder='Developer' onChange={(e) =>setEmployees({ ...employees, jobrole: e.target.value })}/>
  </div>
  <div className="mb-3 col">
    <label htmlFor="department" className="form-label"><strong>Department</strong></label>
    <select name="department" id="department" className="form-select" onChange={(e) =>setEmployees({ ...employees, department_id: e.target.value })}>
              {departments.map((d) => {
                return <option value={d.id}>{d.name}</option>;
              })}
            </select>
  </div>
              </div>
  <div className='row'>
  <div className="mb-3 col">
    <label htmlFor="training" className="form-label"><strong>Training Required</strong></label>
    <input type="text" className="form-control" id="training" name='training' aria-describedby="emailHelp" placeholder='No Requirement' onChange={(e) =>setEmployees({ ...employees, training: e.target.value })}/>
  </div>
  <div className="mb-3 col">
    <label htmlFor="image" className="form-label"><strong>Photo</strong></label>
    <input type="file" className="form-control" id="image" name='image' aria-describedby="emailHelp" placeholder='No Requirement' onChange={(e) => setEmployees({...employees, image: e.target.files[0]})}/>
  </div>
  </div>
  <button type="submit" className="btn btn-primary">Add</button>
</form>
</div>
</div>
  )
}

export default AddEmployee
