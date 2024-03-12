import React from 'react';
import { Link, useParams } from 'react-router-dom';

const AttendancePage = () => {
  const { id } = useParams();

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <h3 className="m-3 text-center">
        You can't edit your attendance. 
      </h3>
      <h3 className="m-3 text-center">
      You can only mark in time and out time once in 16 hours.
      </h3>
      <h3 className="m-3 text-center">
     Mark it properly!
      </h3>
      <Link to={`/dashboardemployee/${id}/attendanceemployee`} className="btn btn-primary">
        Mark your attendance
      </Link>
    </div>
  );
};

export default AttendancePage;
