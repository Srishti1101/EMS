import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Start = () => {
  const navigate=useNavigate();
  axios.defaults.withCredentials=true;
  useEffect(()=>{
    axios.get('http://localhost:3000/verify')
    .then(result=>{
      if(result.data.Status){
        if(result.data.role==='admin'){
          navigate('/dashboard');
        }
        else{
          navigate('/dashboardemployee/'+result.data.id);
        }
      }
    }).catch(err=>console.log(err))
  })
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage '>
    <div className=" border border-3 border-dark rounded p-5 mx-5 loginForm">
    <div className='text-danger'>
    </div>
        <h2 className='d-flex justify-content-center'>Login As</h2>
    <div>
        <div>
            <div className='btn btn-primary m-3 p-2' onClick={()=>{navigate('/adminlogin')}}>Admin</div>
            <div className='btn btn-primary m-3 p-2' onClick={()=>{navigate('/employee_login')}}>Employee</div>
        </div>
    </div>
</div>
</div>
  )
}

export default Start
