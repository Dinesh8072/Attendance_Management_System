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
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#"> <h2>Attendance System</h2> </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link active" to="/register">Register</Link> {" "}
              <Link className="nav-link" to="/login">Login</Link> {" "}
              
              {userId && <Link className="nav-link" to="/attendance">View Attendance</Link> }
              {userId && <Link className="nav-link" to="/dashboard">Dashboard</Link>}
              {userId &&<button onClick={handleLogout} type="button" className="btn btn-info">Logout</button>}
             
            </div>
           </div>
         </div>
        </nav>
      <hr />
      {!userId && (
        <div className="alert alert-warning text-center" role="alert">
          <p>You need to login</p>
        </div>
      )}
      <Outlet context={{ userId, setUserId }} />
      
    </div>
  );
}
