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
        
        
      </nav>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <Link class="nav-link active" to="/register">Register</Link> |{" "}
              <Link class="nav-link" to="/login">Login</Link> |{" "}
              <Link class="nav-link" to="/attendance">View Attendance</Link> |{" "}
              {userId &&<button onClick={handleLogout} type="button" class="btn btn-info">Logout</button>}
            </div>
           </div>
         </div>
        </nav>
      <hr />
      <Outlet context={{ setUserId }} />
    </div>
  );
}
