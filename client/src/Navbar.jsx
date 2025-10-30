import React from 'react'

function Navbar() {
  return (
    <div>
      <ul style={{display: 'flex', listStyleType: 'none', gap: '20px'}}>
        <li><a href="/">Home</a></li>
        <li><a href="/login">Login</a></li>
      </ul>
    </div>
  )
}

export default Navbar
