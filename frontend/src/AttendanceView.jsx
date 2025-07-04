import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AttendanceView() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/attendance/")
      .then(res => setRecords(res.data))
      .catch(() => alert("Failed to fetch attendance"));
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Attendance Records</h4>
        </div>
        <div className="card-body p-0">
          {records.length === 0 ? (
            <p className="text-center text-muted p-4">No attendance records available.</p>
          ) : (
            <table className="table table-bordered table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>User ID</th>
                  <th>Login Time</th>
                  <th>Logout Time</th>
                </tr>
              </thead>
              <tbody>
                {records.map((rec, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{rec.user}</td>
                    <td>{new Date(rec.login_time).toLocaleString()}</td>
                    <td>
                      {rec.logout_time
                        ? new Date(rec.logout_time).toLocaleString()
                        : <span className="text-danger">Still logged in</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
