// pages/AttendanceView.jsx
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
    <div>
      <h3>Attendance Records</h3>
      <ul>
        {records.map((rec, i) => (
          <li key={i}>
            User ID: {rec.user} | Login: {rec.login_time} | Logout: {rec.logout_time || "Still logged in"}
          </li>
        ))}
      </ul>
    </div>
  );
}
