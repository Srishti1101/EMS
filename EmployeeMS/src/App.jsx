import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Admin/Login'
import {BrowserRouter,Routes,Route, useNavigate} from 'react-router-dom'
import Dashboard from './Components/Admin/Dashboard';
import Home from './Components/Admin/Home';
import Employee from './Components/Admin/Employee'
import Department from './Components/Admin/Department'
import AddDepartment from './Components/Admin/AddDepartment';
import AddEmployee from './Components/Admin/AddEmployee';
import EditEmployee from './Components/Admin/EditEmployee';
import PostList from './Components/Admin/PostList';
import PostForm from './Components/Admin/PostForm';
import Start from './Components/Admin/Start';
import EmployeeLogin from './Components/Employee/EmployeeLogin';
import AnnouncementEmployee from './Components/Employee/AnnouncementEmployee';
import EmployeeDashboard from './Components/Employee/EmployeeDashboard'
import HomeEmployee from './Components/Employee/HomeEmployee';
import PrivateRoute from './Components/PrivateRoute';
import EditSelf from './Components/Employee/EditSelf';
import Attendance from './Components/Admin/Attendance';
import MarkAttendance from './Components/Employee/MarkAttendance';
import MarkOutTime from './Components/Employee/MarkOutTime';
import AttendancePage from './Components/Employee/AttendancePage';
import LeaveRequestForm from './Components/Employee/LeaveRequestForm';
import LeaveList from './Components/Employee/LeaveList';
import LeaveListAdmin from './Components/Admin/LeaveListAdmin'
import TaskManagement from './Components/Admin/TaskManagement';
import TaskAssignment from './Components/Admin/TaskAssignment';
import ViewTask from './Components/Admin/ViewTask';
import TaskView from './Components/Employee/TaskView';
import Feedback from './Components/Employee/Feedback';
import FeedbackList from './Components/Admin/FeedbackList';
import Schedule from './Components/Admin/Schedule';
import Schedulesee from './Components/Employee/Schedulesee'
import AddSchedule from './Components/Employee/AddSchedule'
import ViewSchedule from './Components/Admin/ViewSchedule'
import Chat from './Components/Admin/Chat'
import Chatemp from './Components/Employee/Chatemp';

function App() {
  
  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path='/' element={<Start/>}></Route>
        <Route path='/adminlogin' element={<Login/>}></Route>
        <Route path='/employee_login' element={<EmployeeLogin/>}></Route>
        <Route path='/dashboardemployee/:id' element={
        <PrivateRoute>
        <EmployeeDashboard/>
        </PrivateRoute>
        }>
          <Route path='' element={<HomeEmployee/>}></Route>
          <Route path='/dashboardemployee/:id/announcementemployee' element={<AnnouncementEmployee/>}></Route>
          <Route path='/dashboardemployee/:id/attendancemark' element={<AttendancePage/>}></Route>
          <Route path='/dashboardemployee/:id/attendanceemployee' element={<MarkAttendance/>}></Route>
          <Route path='/dashboardemployee/:id/leaverequest' element={<LeaveRequestForm/>}></Route>
          <Route path='/dashboardemployee/:id/leavelist' element={<LeaveList/>}></Route>
          <Route path='/dashboardemployee/:id/attendanceouttime/' element={<MarkOutTime/>}></Route>
          <Route path='/dashboardemployee/:id/edit_self' element={<EditSelf/>}></Route>
          <Route path='/dashboardemployee/:id/viewtask' element={<TaskView/>}></Route>
          <Route path='/dashboardemployee/:id/feedback' element={<Feedback/>}></Route>
          <Route path='/dashboardemployee/:id/schedule' element={<Schedulesee/>}></Route>
          <Route path='/dashboardemployee/:id/addschedule' element={<AddSchedule/>}></Route>
          <Route path='/dashboardemployee/:id/chat' element={<Chatemp/>}></Route>
        </Route>
        <Route path='/dashboard' element={
        <PrivateRoute>
        <Dashboard/>
        </PrivateRoute>
        }>
          <Route path='' element={<Home/>}></Route>
          <Route path='/dashboard/employee' element={<Employee/>}></Route>
          <Route path='/dashboard/department' element={<Department/>}></Route>
          <Route path='/dashboard/add_department' element={<AddDepartment/>}></Route>
          <Route path='/dashboard/add_employee' element={<AddEmployee/>}></Route>
          <Route path='/dashboard/edit_employee/:id' element={<EditEmployee/>}></Route>
          <Route path='/dashboard/announcement' element={<PostList/>}></Route>
          <Route path='/dashboard/attendance' element={<Attendance/>}></Route>
          <Route path='/dashboard/leavelist' element={<LeaveListAdmin/>}></Route>
          <Route path='/dashboard/postform' element={<PostForm/>}></Route>
          <Route path='/dashboard/taskmanage' element={<TaskManagement/>}></Route>
          <Route path='/dashboard/assigntask' element={<TaskAssignment/>}></Route>
          <Route path='/dashboard/viewtask' element={<ViewTask/>}></Route>
          <Route path='/dashboard/feedback' element={<FeedbackList/>}></Route>
          <Route path='/dashboard/schedule' element={<Schedule/>}></Route>
          <Route path='/dashboard/schedulesee' element={<ViewSchedule/>}></Route>
          <Route path='/dashboard/chat' element={<Chat/>}></Route>
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
