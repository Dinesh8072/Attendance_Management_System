import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Register from './Register.jsx'
import Login from './Login.jsx'
import AttendanceView from './AttendanceView.jsx'

const router= createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'register', element: <Register/> },
      { path: 'login', element: <Login/> },
      { path: 'attendance', element: <AttendanceView/> },
    ],
  },
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
