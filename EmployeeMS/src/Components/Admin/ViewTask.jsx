import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ViewTask = () => {
  const[task,setTask]=useState([])
  const reversedTask = task.slice().reverse();
  const navigate=useNavigate();
  useEffect(()=>{
     axios.get('http://localhost:3000/auth/showtask')
     .then(result=>{
      if(result.data.Status){
        setTask(result.data.Result)
      }
      else{
        alert(result.data.Error)
      }
     })
     .catch(err=>console.log(err))
  },[]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString();
  };

  const handleDownload = (fileName) => {
    const downloadUrl = `http://localhost:3000/auth/download/${fileName}`;

    // Create a link to trigger the download
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

  return (
    <div className='px-5 mt-5'>
      <div className='d-flex justify-content-center'>
      <h2>Task List</h2>
      </div>
     <div>
      <table className="table  mt-3">
  <thead className="table-dark mt-3">
    <tr>
      <th scope='col'>Employee ID</th>
      <th scope="col">Name</th>
      <th scope="col">Task Description</th>
      <th scope="col">DeadLine</th>
      <th scopr="col">Output File</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    {
      reversedTask.map(d=>(
        <tr>
          <td>{d.eid}</td>
          <td >{d.name}</td>
          <td>{d.taskdes}</td>
          <td>{formatDate(d.deadline)}</td>
          <td>{d.outfi && (
                <button
                  onClick={() => handleDownload(d.outfi, 'Downloaded_File')}
                  className='button btn btn-success'
                >
                  Download File
                </button>
              )}</td>
          <td style={{ color: d.status === 'Pending' ? 'red' : 'green' }}>
                {d.status}
              </td>
         
        </tr>
      ))
    }
  </tbody>
</table>
</div>
     </div>
  )
}

export default ViewTask
