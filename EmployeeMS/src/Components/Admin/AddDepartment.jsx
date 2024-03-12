import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddDepartment = () => {
    const [department,setDepartment]=useState(null)
    const navigate=useNavigate()

    const handleSubmit=(e)=>{
        e.preventDefault()
    axios.post('http://localhost:3000/auth/add_department',{department})
    .then(result=>{
        if(result.data.Status){
          navigate('/dashboard/department')
        }
        else{
         console.log(result.data.Error)
        }
      })
      .catch(err=>console.log(err))
    }
  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
    <div className=" border border-3 border-dark rounded p-5 mx-5 loginForm">
        <h2>Add Department</h2>
    <form onSubmit={handleSubmit} >
  <div className="mb-3">
    <label htmlFor="department" className="form-label"><strong>Department Name</strong></label>
    <input type="text" className="form-control" id="department" name='department' aria-describedby="emailHelp" placeholder='Enter department name' onChange={(e)=>setDepartment(e.target.value)}/>
  </div>
  <button type="submit" className="btn btn-primary">Add</button>
</form>
</div>
</div>
  )
}

export default AddDepartment
