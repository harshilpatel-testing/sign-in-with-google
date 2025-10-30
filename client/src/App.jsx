import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './LoginPage';
import Home from './Home';
import SignupPage from './SignupPage';



function App() {
  return (
    <div>

      <Router>
        <Routes>

          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>

    </div>
  )
}

export default App
