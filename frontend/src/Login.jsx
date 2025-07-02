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
      navigate('/attendance');
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div>
      <h3>Login</h3>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} /><br />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} /><br />
      <button onClick={login}>Login</button>
    </div>
  );
}
