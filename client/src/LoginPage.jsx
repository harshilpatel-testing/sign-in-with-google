import React, { useContext, useEffect } from 'react'
import Google from './Google'
import { AuthContext } from './AuthContext'
import { useNavigate } from 'react-router-dom';

function LoginPage() {

  let { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // alert("You already logged in.");
      navigate("/");
    }
  }, [navigate, user])

  return (
    <div>
      <Google />
    </div>
  )
}

export default LoginPage
