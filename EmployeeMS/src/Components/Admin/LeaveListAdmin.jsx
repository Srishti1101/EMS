import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LeaveListAdmin = ({ employeeId }) => {
    const[leavelist,setLeavelist]=useState([])
    const reversedLeaveList = leavelist.slice().reverse();
    // const navigate=useNavigate();
    useEffect(()=>{
       axios.get('http://localhost:3000/auth/leavelist')
       .then(result=>{
        if(result.data.Status){
          setLeavelist(result.data.Result)
        }
        else{
          alert(result.data.Error)
        }
       })
       .catch(err=>console.log(err))
    },[]);

    const handleRespond = async (requestId, response) => {
        try {
          await axios.put(`http://localhost:3000/auth/leaverespond/${requestId}`, { response });
          setLeavelist((prevRequests) =>
            prevRequests.map((leavelist) =>
              leavelist.id === requestId ? { ...leavelist, status: response } : leavelist
            )
          );
        } catch (error) {
          console.error('Error responding to leave request:', error);
        }
      };

  return (
    <div className='px-5 mt-5'>
      <div className='d-flex justify-content-center'>
      <h2>Leave List</h2>
      </div>
      <div>
      <table className="table  mt-3">
  <thead className="table-dark mt-3">
    <tr>
      <th scope='col'>Employee ID</th>
      <th scope="col">Leave Reason</th>
    </tr>
  </thead>
  <tbody>
      {reversedLeaveList.map((leavelist, index) => (
        <tr>
        {/* <li key={leavelist.id}> */}
        <td>{leavelist.eid}</td>
        <td>{leavelist.leavereason}  </td>
        {leavelist.status === 'Pending' && (
          <>
            <button onClick={() => handleRespond(leavelist.id, 'Approved')} className='button btn btn-primary m-3'>Approve</button>
            <button onClick={() => handleRespond(leavelist.id, 'Rejected')} className='button btn btn-primary m-3'>Reject</button>
          </>
        )}
      {/* </li> */}
      </tr>
      ))}
      </tbody>
      </table>
      </div>
     </div>
  );
};

export default LeaveListAdmin;
