import React, { useContext } from 'react'
import Navbar from './Navbar'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function Google() {

    const navigate = useNavigate();
    const { setUser, setLoading } = useContext(AuthContext)

    const handleSuccess = async (credentialResponse) => {
        try {
            setLoading(true);
            const decoded = jwtDecode(credentialResponse.credential);
            console.log("Decoded JWT:", decoded);

            // You can also send the token to your backend for further verification and processing
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/google`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: credentialResponse.credential }),
                // credentials: 'include'
            });

            const data = await response.json();
            console.log("Response from server:", data);

            localStorage.setItem(
                "user",
                JSON.stringify({
                    id: data.user._id,
                    token: data.token
                })
            );


            // setLoading(false);

            setUser(data.user);
            setLoading(false);


            navigate("/");
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div>
            <Navbar />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={() => console.log("Login Failed")} type="standard"
                    shape="pill"
                    theme="filled_blue"
                    size="large"
                    text="signin_with"
                     />
            </div>
        </div>
    )
}

export default Google
