import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {
  const[adminTotal,setAdminTotal]=useState(0);
  const[employeeTotal,setEmployeeTotal]=useState(0);
  const[salaryTotal,setSalaryTotal]=useState(0);
  const [admins, setAdmins] = useState([]);
  
  useEffect(()=>{
    adminCount();
    employeeCount();
    salaryCount();
    AdminRecords();
  },[])

  const AdminRecords = () => {
    axios.get('http://localhost:3000/auth/admin_records')
    .then(result => {
      if(result.data.Status) {
        setAdmins(result.data.Result)
      } else {
         alert(result.data.Error)
      }
    })
  }

  const adminCount = () => {
    axios.get('http://localhost:3000/auth/admin_count')
    .then(result => {
      if(result.data.Status) {
        setAdminTotal(result.data.Result[0].admins)
      }
      else {
        alert(result.data.Error)
      }
    })
  }
  const employeeCount = () => {
    axios.get('http://localhost:3000/auth/employee_count')
    .then(result => {
      if(result.data.Status) {
        setEmployeeTotal(result.data.Result[0].employees)
      }
      else {
        alert(result.data.Error)
      }
    })
  }

  let x = false;
  const salaryCount = () => {
    x=false;
    axios.get('http://localhost:3000/auth/salary_count')
    .then(result => {
      if(result.data.Status) {
        if(result.data.Result[0].empsalary==null){
          x=true;
        }
        setSalaryTotal(result.data.Result[0].empsalary)
      } else {
        alert(result.data.Error)
      }
    })
  }
  return (
    <div className="row p-3 m-4">
    <div className="card cardstyle col-4 " >
    <img src="https://www.maketecheasier.com/assets/uploads/2021/05/how-to-enable-standard-users-to-run-a-program-with-admin-rights-featured.jpg" className="card-img-top" alt="..."/>
    <div className="card-body">
      <p className="card-text">Total : {adminTotal}</p>
    </div>
  </div>
    <div className="card cardstyle col-4 " >
    <img src="https://img.freepik.com/premium-vector/employees-minimal-vector-line-icon-3d-button-isolated-black-background-premium-vectorxa_570929-1295.jpg" className="card-img-top" alt="..."/>
    <div className="card-body">
      <p className="card-text">Total : {employeeTotal}</p>
    </div>
  </div>
    <div className="card cardstyle col-4 " >
    <img src="https://thumbs.dreamstime.com/b/salary-concept-stacked-coin-blackboard-high-angle-view-89193698.jpg" className="card-img-top" alt="..."/>
    <div className="card-body">
      <p className="card-text">Total : Rs.{!x?salaryTotal:"0"}</p>
    </div>
  </div>
  
  </div>
  )
}

export default Home
