import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const LeaveList = ({ eid }) => {
    const [employee, setEmployee] = useState([])
    const {id} = useParams()
    // const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:3000/employee/detail/'+id)
        .then(result =>{
          setEmployee(result.data[0]);
        }
    )
        .catch(err => console.log(err))
    }, [])

  const [leavelist, setLeavelist] = useState([]);
  const reversedLeaveList = leavelist.slice().reverse();

  useEffect(() => {
    axios.get(`http://localhost:3000/employee/leavelist/${employee.eid}`)
      .then(result => {
        if (result.data.Status) {
          setLeavelist(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, [employee]);

  return (
    <div className='px-5 mt-5'>
      <div className='d-flex justify-content-center'>
        <h2>Leave List</h2>
      </div>
      {reversedLeaveList.map((leave, index) => (
        <div key={index} className="m-4 p-4 testCard">
          <div>
            <h5>{leave.status}</h5>
            <p>{leave.leavereason}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeaveList;
