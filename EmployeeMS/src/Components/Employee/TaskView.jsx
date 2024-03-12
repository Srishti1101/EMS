import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TaskView = ({ eid }) => {
    const [employee, setEmployee] = useState([])
    const {id} = useParams()
    const [outfi, setoutfi] = useState(null);
    // const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:3000/employee/detail/'+id)
        .then(result =>{
          setEmployee(result.data[0]);
        }
    )
        .catch(err => console.log(err))
    }, [])

    

  const [tasklist, setTasklist] = useState([]);
  const reversedTask = tasklist.slice().reverse();

  useEffect(() => {
    axios.get(`http://localhost:3000/employee/tasklist/${employee.eid}`)
      .then(result => {
        if (result.data.Status) {
          setTasklist(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, [employee]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString();
  };

  const handleRespond = async (requestId, responseStatus) => {
    try {
      const requestData = { response: responseStatus };
      const responseFromApi = await axios.put(`http://localhost:3000/employee/taskrespond/${requestId}`, requestData);
  
      // Trigger file upload separately after responding to the task
      if (responseFromApi.status === 200) {
        const formData = new FormData();
        formData.append('outfi', outfi);
  
        await axios.post(`http://localhost:3000/employee/upload/${requestId}`, formData);
      }
  
      setTasklist((prevRequests) =>
        prevRequests.map((tasklist) =>
          tasklist.id === requestId ? { ...tasklist, status: responseStatus } : tasklist
        )
      );
    } catch (error) {
      console.error('Error responding to leave request:', error);
    }
  };
  
  

  const setTask = (newTask) => {
    setTasklist((prevTasks) => [...prevTasks, newTask]);
  };
  
  const handleDownload = (fileName) => {
    const downloadUrl = `http://localhost:3000/employee/download/${fileName}`;

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
      <table className="table mt-3">
        <thead className="table-dark mt-3">
          <tr>
            <th scope="col">Task Description</th>
            <th scope="col">DeadLine</th>
            <th scope="col">Input File</th>
            <th scope="col">Output File</th>
            <th scope="col">Status</th>
            {/* Add the following line for the new column */}
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reversedTask.map((d) => (
            <tr key={d.id}>
              <td>{d.taskdes}</td>
              <td>{formatDate(d.deadline)}</td>
              <td>{d.inpfile && (
                <button
                  onClick={() => handleDownload(d.inpfile, 'Downloaded_File')}
                  className='button btn btn-success'
                >
                  Download File
                </button>
              )}</td>
              <td>
                <div className="mb-3 col">
                  <label htmlFor="outfi" className="form-label">
                    <strong></strong>
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="outfi"
                    name="outfi"
                    aria-describedby="emailHelp"
                    onChange={(e) => setoutfi(e.target.files[0])}
                  />
                </div>
              </td>
              <td>{d.status}</td>
              <td>
                {d.status === 'Pending' ? (
                  <>
                    <button
                      onClick={() => handleRespond(d.id, 'Completed')}
                      className='button btn btn-primary m-3'
                    >
                      Completed?
                    </button>
                  </>
                ) : (
                  'No action required'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
};

export default TaskView;