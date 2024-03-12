import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate()
  axios.defaults.withCredentials = true
  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout')
    .then(result => {
      if(result.data.Status) { 
        localStorage.removeItem("valid");
        navigate('/')
      }
    }).catch(err=>console.log(err))
  }
  return (
    <div className="container-fluid shadow">
    <div className="row flex-nowrap shadow ">
      <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark shadow ">
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100 shadow navbar setcss">
          <Link
            to="/dashboard"
            className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
          >
            <span className="fs-5 fw-bolder d-none d-sm-inline">
             EMS
            </span>
          </Link>
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
          >
            <li className="w-100">
              <Link
                to="/dashboard"
                className="nav-link text-white px-0 align-middle"
              >
                <i className="bi bi-speedometer"></i>
                <span className="ms-2 d-none d-sm-inline">Dashboard</span>
              </Link>
            </li>
            <li className="w-100">
              <Link
                to="/dashboard/employee"
                className="nav-link px-0 align-middle text-white"
              >
                <i className="bi bi-microsoft-teams"></i>
                <span className="ms-2 d-none d-sm-inline">
                  Employees Management
                </span>
              </Link>
            </li>
            <li className="w-100">
              <Link
                to="/dashboard/department"
                className="nav-link px-0 align-middle text-white"
              >
                <i className="bi bi-diagram-3-fill"></i>
                <span className="ms-2 d-none d-sm-inline">Add Department</span>
              </Link>
            </li>
            <li className="w-100">
              <Link
                to="/dashboard/announcement"
                className="nav-link px-0 align-middle text-white"
              >
                <i className="bi bi-clipboard2-fill"></i>
                <span className="ms-2 d-none d-sm-inline">Announcement Board </span>
              </Link>
            </li>
            <li className="w-100">
              <Link
                to="/dashboard/attendance"
                className="nav-link px-0 align-middle text-white"
              >
                <i className="bi bi-battery-half"></i>
                <span className="ms-2 d-none d-sm-inline">View Attendance</span>
              </Link>
            </li>
            <li className="w-100">
              <Link
                to="/dashboard/leavelist"
                className="nav-link px-0 align-middle text-white"
              >
                <i className="bi bi-kanban"></i>
                <span className="ms-2 d-none d-sm-inline">Leave Management</span>
              </Link>
            </li>
            <li className="w-100">
              <Link
                to="/dashboard/taskmanage"
                className="nav-link px-0 align-middle text-white"
              >
                <i className="bi bi-pc"></i>
                <span className="ms-2 d-none d-sm-inline">Task Management</span>
              </Link>
            </li>
            
            <li className="w-100">
              <Link
                to="/dashboard/schedule"
                className="nav-link px-0 align-middle text-white"
              >
                <i className="bi bi-calendar-check"></i>
                <span className="ms-2 d-none d-sm-inline">Your Schedule</span>
              </Link>
            </li>
            <li className="w-100">
              <Link
                to="/dashboard/schedulesee"
                className="nav-link px-0 align-middle text-white"
              >
               <i className="bi bi-calendar3-event-fill"></i>
                <span className="ms-2 d-none d-sm-inline">Employees Schedule</span>
              </Link>
            </li>
            <li className="w-100">
              <Link
                to="/dashboard/feedback"
                className="nav-link px-0 align-middle text-white"
              >
                <i className="bi bi-basket3"></i>
                <span className="ms-2 d-none d-sm-inline">Feedback Management</span>
              </Link>
            </li>
            <li className="w-100">
              <Link
                to="/dashboard/chat"
                className="nav-link px-0 align-middle text-white"
              >
                <i className="bi bi-chat-right-dots-fill"></i>
                <span className="ms-2 d-none d-sm-inline">Chat</span>
              </Link>
            </li>
            <li className="w-100" onClick={handleLogout}>
            <Link
                className="nav-link px-0 align-middle text-white"
              >
                <i className="bi bi-door-closed"></i>
                <span className="ms-2 d-none d-sm-inline">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
              <h4>Employee Management System</h4>
          </div>
          <Outlet />
      </div>
    </div>
  </div>
  )
}

export default Dashboard
