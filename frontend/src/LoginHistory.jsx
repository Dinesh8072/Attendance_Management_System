import React, { useEffect, useState } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

export default function LoginHistory() {
  const { userId } = useOutletContext();
  const [loginHistory, setLoginHistory] = useState([]);
  const [totalLogins, setTotalLogins] = useState(0);

  useEffect(() => {
    if (!userId) return;

    axios
      .post("http://localhost:8000/api/login-history/", { user_id: userId })
      .then((res) => {
        setLoginHistory(res.data.history);
        setTotalLogins(res.data.total_logins);
      })
      .catch((err) => {
        console.error("Failed to fetch login history", err);
      });
  }, [userId]);

  return (
    <div className="card shadow mt-4">
      <div className="card-body">
        <h4 className="card-title">Welcome,</h4>
        <p>Total Logins: {totalLogins}</p>
        <h6>Login History:</h6>
        {loginHistory.length > 0 ? (
          <ul>
            {loginHistory.map((entry, index) => (
              <li key={index}>{new Date(entry.login_time).toLocaleString()}</li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No login records found.</p>
        )}
      </div>
    </div>
  );
}
