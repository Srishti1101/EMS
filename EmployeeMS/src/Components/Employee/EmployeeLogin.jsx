import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../style.css'

const EmployeeLogin = () => {

  //state for values email and password
  const[values,setValues]=useState({email:'',password:''})

  const navigate=useNavigate()

  //state for error
  const[error,setError]=useState(null)

  //save cookies
  axios.defaults.withCredentials=true;

  //function after login-->navigate to dashboard 
  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:3000/employee/employeelogin',values)
    .then(result=>{
      if(result.data.loginStatus){
        localStorage.setItem("valid",true);
        navigate('/dashboardemployee/'+result.data.id)
      }
      else{
        setError(result.data.Error)
      }
    })
    .catch(err=>console.log(err))
  }

  return (
    <>
    <div className='d-flex justify-content-end align-items-center vh-100 loginPage '>
    <div className=" border border-3 border-dark rounded p-5 mx-5 loginForm">
    <div className='text-danger'>
    {error && error}
    </div>
        <h2>Login Page</h2>
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label"><strong>Email Address</strong></label>
    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" placeholder='Enter email address' onChange={(e)=>setValues({...values,email:e.target.value})}/>
    <div id="emailHelp" className="form-text loginForm">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label"><strong>Password</strong></label>
    <input type="password" className="form-control" id="password" name='password' placeholder='Enter password' onChange={(e)=>setValues({...values,password:e.target.value})}/>
  </div>
  <button type="submit" className="btn btn-primary">Login</button>
</form>
</div>
</div>
    </>
  )
}

export default EmployeeLogin
