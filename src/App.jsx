import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Profile from './Profile';
import { Navigate } from 'react-router-dom';
import { Login } from './Login';
import { Signup } from './Signup';
function App() {
 
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  return (
    <div className="app">
    <Router>
    <Routes>
      <Route path="/user/:id"  element={isLoggedIn == "true" ? <Profile /> : <Navigate to="/login"/>} />
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<Signup />}/>
    </Routes>
  </Router>
  </div>
  )
}

export default App
