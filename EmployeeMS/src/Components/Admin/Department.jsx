import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Department = () => {
  const[department,setDepartment]=useState([])
  useEffect(()=>{
     axios.get('http://localhost:3000/auth/department')
     .then(result=>{
      if(result.data.Status){
        setDepartment(result.data.Result)
      }
      else{
        alert(result.data.Error)
      }
     })
     .catch(err=>console.log(err))
  },[])
  return (
    <div className='px-5 mt-5'>
      <div className='d-flex justify-content-center'>
      <h2>Department List</h2>
      </div>
      <Link to="/dashboard/add_department" className='btn btn-secondary'>Add Department</Link>
      <div>
      <table className="table table-striped table-dark mt-3">
  <thead>
    <tr>
      <th scope="col">Name</th>
    </tr>
  </thead>
  <tbody>
    {
      department.map(d=>(
        <tr>
          <td>{d.name}</td>
        </tr>
      ))
    }
  </tbody>
</table>
    </div>
    </div>
  )
}

export default Department
