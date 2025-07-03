import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUserId } = useOutletContext();
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/login/", {
        username,
        password
      }); 
      alert("Login success\nTime: " + res.data.login_time);
      setUserId(res.data.user_id);
      navigate('/dashboard');
    } catch {
      alert("Login failed. Please check credentials.");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">User Login</h3>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary w-100" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}
