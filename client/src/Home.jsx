import React, { useContext, useEffect } from 'react'
import Navbar from './Navbar'
import { AuthContext } from './AuthContext'
import { useNavigate } from 'react-router-dom';

function Home() {

  const { user, loading } = useContext(AuthContext);

  const navigate = useNavigate();

  console.log(user);

  useEffect(() => {
    if (!user) {
      // alert("Please login first and after you can access all pages.");
      navigate("/login")
    }
  }, [navigate, user])

  return (
    <div>
      <Navbar />

      <h1>Home Page</h1>

      {
        loading && <p>Loading....</p>
      }

      {
        user && (
          <div>
            <p>Username : {user.name}</p>
            <p>Email : {user.email}</p>
            <p>Picture : <br /> <img src={user.picture} alt="profile" /></p>
          </div>
        )
      }
    </div>
  )
}

export default Home
