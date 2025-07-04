import React, { useEffect, useState } from "react";
import axios from "axios";
import LoginHistory from "./LoginHistory";
import { useOutletContext } from "react-router-dom";

export default function Dashboard() {
  const { userId } = useOutletContext();
  const [totalUsers, setTotalUsers] = useState(0);
  const [loginData, setLoginData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/dashboard/")
      .then(res => {
        setTotalUsers(res.data.total_users);
        setLoginData(res.data.latest_logins);
      })
      .catch(() => alert("Failed to load dashboard"));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Dashboard</h2>


      <div className="row mb-4 justify-content-center">
        <div className="col-md-4">
          <div className="card text-white bg-primary shadow">
            <div className="card-body text-center">
              <h4 className="card-title">Total Users</h4>
              <h2>{totalUsers}</h2>
            </div>
          </div>
        </div>
      </div>


      <div className="card shadow mb-5">
        <div className="card-header bg-dark text-white">
          <h5 className="mb-0">Latest User Logins</h5>
        </div>
        <div className="card-body p-0">
          <table className="table table-striped mb-0">
            <thead className="table-light">
              <tr>
                <th scope="col">Username</th>
                <th scope="col">Last Login Time</th>
              </tr>
            </thead>
            <tbody>
              {loginData.map((user, index) => (
                <tr key={index}>
                  <td>{user.user__username}</td>
                  <td>{new Date(user.last_login).toLocaleString()}</td>
                </tr>
              ))}
              {loginData.length === 0 && (
                <tr>
                  <td colSpan="2" className="text-center text-muted">No login data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {userId && <LoginHistory />}
    </div>
  );
}
