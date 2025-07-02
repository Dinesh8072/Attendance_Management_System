import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [userId, setUserId] = useState(null);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/logout/', { user_id: userId });
      alert('Logged out successfully');
      setUserId(null);
    } catch {
      alert('Logout failed');
    }
  };

  return (
    <div>
      <h2>Attendance Management System</h2>
      <nav>
        <Link to="/register">Register</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/attendance">View Attendance</Link> |{" "}
        {userId && <button onClick={handleLogout}>Logout</button>}
      </nav>
      <hr />
      <Outlet context={{ setUserId }} />
    </div>
  );
}
