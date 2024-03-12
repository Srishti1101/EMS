import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const LeaveRequestForm = () => {
  const [employee, setEmployee] = useState({});
  const { id } = useParams();
  const [leaveRequest, setLeaveRequest] = useState({
    eid: "",
    leavereason: ""
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/employee/detail/${id}`)
      .then(result => {
        setEmployee(result.data[0]);
        setLeaveRequest(prevLeaveRequest => ({
          ...prevLeaveRequest,
          eid: result.data[0].eid,
        }));
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/employee/leaverequest', leaveRequest)
      .then(result => {
        if (result.data.Status) {
          setSubmissionStatus('Submitted');
          setInputValue(""); // Clear the input field after submission
          setTimeout(() => setSubmissionStatus(null), 5000); // Reset submission status after 5 seconds
        } else {
          setSubmissionStatus(`Error: ${result.data.Error}`);
        }
      })
      .catch(err => {
        setSubmissionStatus('Error: Unable to submit leave request.');
        console.log(err);
      });
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setLeaveRequest(prevLeaveRequest => ({ ...prevLeaveRequest, leavereason: value }));
  };

  return (
    <div className='m-3'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="leave" className="form-label"><strong>Leave Reason</strong></label>
          <input
            type="text"
            className="form-control"
            id="leave"
            name='leave'
            aria-describedby="emailHelp"
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className='button btn btn-primary'>Submit Leave Request</button>
      </form>

      {submissionStatus && (
        <div className="mt-3">
          <p>{submissionStatus}</p>
        </div>
      )}
    </div>
  );
};

export default LeaveRequestForm;
