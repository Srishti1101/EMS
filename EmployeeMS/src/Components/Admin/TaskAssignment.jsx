import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TaskAssignment = () => {
  const [tasks, setTask] = useState({
    eid: "",
    name: "",
    taskdes: "",
    deadline: "",
    inpfile: "", // Added file option to state
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('eid', tasks.eid);
    formData.append('name', tasks.name);
    formData.append('taskdes', tasks.taskdes);
    formData.append('deadline', tasks.deadline);
    formData.append('inpfile', tasks.inpfile); // Append the file to FormData

    // Post to the backend when a new post is submitted
    axios.post('http://localhost:3000/auth/assigntask', formData)
      .then(result => {
        if (result.data.Status) {
          navigate('/dashboard/taskmanage');
        } else {
          console.log(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='d-flex justify-content-center align-items-center'>
    <div className=" border border-3 border-dark col-8 rounded p-3 m-3 loginForm">
        <h2>Asign Task</h2>
    <form onSubmit={handleSubmit}>
    <div className='row'>
    <div className="col mb-3">
    <label htmlFor="eid" className="form-label"><strong>Employee ID</strong></label>
    <input type="text" className="form-control" id="eid" name='eid' aria-describedby="emailHelp" onChange={(e) =>setTask({ ...tasks, eid: e.target.value })}/>
  </div>
  <div className="col mb-3">
    <label htmlFor="name" className="form-label"><strong>Employee Name</strong></label>
    <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={(e) =>setTask({ ...tasks, name: e.target.value })}/>
  </div>
  </div>
    <div className='row'>
  <div className="mb-3 col">
    <label htmlFor="taskdes" className="form-label"><strong>Task Description</strong></label>
    <input type="text" className="form-control" id="taskdes" name='taskdes' aria-describedby="emailHelp" onChange={(e) =>setTask({ ...tasks, taskdes: e.target.value })}/>
  </div>
  </div>
  <div className='row'>
  <div className="mb-3 col">
    <label htmlFor="deadline" className="form-label"><strong>DeadLine</strong></label>
    <input type="date" className="form-control" id="deadline" name='deadline' aria-describedby="emailHelp" onChange={(e) =>setTask({ ...tasks, deadline: e.target.value })}/>
  </div>
  <div className="mb-3 col">
    <label htmlFor="inpfile" className="form-label"><strong></strong></label>
    <input type="file" className="form-control" id="inpfile" name='inpfile' aria-describedby="emailHelp" onChange={(e) =>setTask({ ...tasks, inpfile:e.target.files[0] })}/>
  </div>
 </div>
  <button type="submit" className="btn btn-primary">Assign</button>
</form>
</div>
</div>
  )
}

export default TaskAssignment
