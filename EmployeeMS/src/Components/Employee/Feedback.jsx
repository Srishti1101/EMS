import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Feedback = () => {
  const [feedback, setFeedback] = useState({
    eid: "",
    name: "",
    description: ""
  });
  const [employee, setEmployee] = useState([]);
  const { id } = useParams();
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [inputDescription, setInputDescription] = useState(""); // Separate state for input field

  useEffect(() => {
    axios.get(`http://localhost:3000/employee/detail/${id}`)
      .then(result => {
        setEmployee(result.data[0]);
        setFeedback({
          ...feedback,
          eid: result.data[0].eid,
          name: result.data[0].name
        });
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputDescription(value);
    setFeedback(prevLeaveRequest => ({ ...prevLeaveRequest, description: value }));
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/employee/feedback', feedback)
      .then(result => {
        if (result.data.Status) {
          setSubmissionStatus('Submitted');

          // Clear input field after successful submission
          setInputDescription("");

          // Reset submissionStatus after 5 seconds
          setTimeout(() => setSubmissionStatus(null), 5000);
        } else {
          setSubmissionStatus(`Error: ${result.data.Error}`);
        }
      })
      .catch(err => {
        setSubmissionStatus('Error: Unable to submit leave request.');
        console.log(err);
      });
  };

  return (
    <div>
      <form className='p-3 m-5' onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Feedback</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={inputDescription}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit Feedback</button>
      </form>

      {submissionStatus && (
        <div className="m-3 p-3">
          <p>{submissionStatus}</p>
        </div>
      )}
    </div>
  );
};

export default Feedback;
