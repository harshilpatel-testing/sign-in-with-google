import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { AuthContext } from './AuthContext'

function Navbar() {

  const { user, setUser } = useContext(AuthContext);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");

  }

  return (
    <div>
      <ul style={{ display: 'flex', listStyleType: 'none', gap: '20px' }}>
       {user &&  <li><Link to="/">Home</Link></li>}
        {!user && <li><Link to="/login">Login</Link></li>}
        {user && <Link onClick={logout}><li >Logut</li></Link>}
      </ul>
    </div>
  )
}

export default Navbar
