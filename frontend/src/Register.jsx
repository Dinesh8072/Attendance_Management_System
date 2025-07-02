import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let navigate=useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/register/", {
        username, password
      });
      alert(res.data.message);
      navigate('/login')
    } catch {
      alert("Registration failed");
      navigate('/login')
    }
  };

  return (
    <div>
      <h3>Register User</h3>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} /><br />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} /><br />
      <button onClick={register}>Register</button>
    </div>
  );
}
