import axios from 'axios';
import React, { useEffect, useState } from 'react'

const FeedbackList = () => {
    const [feedback, setfeedback] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/auth/feedback')
      .then(result => {
        if (result.data.Status) {
          setfeedback(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <div className='px-5 mt-5'>
    <div className='d-flex justify-content-center'>
      <h2> Feedback List</h2>
    </div>
    <div>
      <table className="table mt-3">
        <thead className="table-dark mt-3">
          <tr>
            <th scope='col'>EmployeeID</th>
            <th scope="col">Name</th>
            <th scope="col">Feedback</th>
          </tr>
        </thead>
        <tbody>
          {
            feedback.map(d => (
              <tr key={d.id}>
                <td>{d.eid}</td>
                <td>{d.name}</td>
                <td>{d.description}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default FeedbackList
