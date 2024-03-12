import React from 'react'
import { Link } from 'react-router-dom'

const TaskManagement = () => {
  return (
    <div>
      <Link to='/dashboard/assigntask' className='button btn btn-primary m-3'>Assign Task</Link>
      <Link to='/dashboard/viewtask' className='button btn btn-primary m-3'>View Task List</Link>
    </div>
  )
}

export default TaskManagement
