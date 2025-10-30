import React from 'react'
import Navbar from './Navbar'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

function Google() {

    const handleSuccess = async (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        console.log("Decoded JWT:", decoded);

        // You can also send the token to your backend for further verification and processing
        const response = await fetch('http://localhost:5000/login/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: credentialResponse.credential }),
        });

        const data = await response.json();
        console.log("Response from server:", data);
    }

    return (
        <div>
            <Navbar />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                <GoogleLogin onSuccess={handleSuccess} onError={() => console.log("Login Failed")} />
            </div>
        </div>
    )
}

export default Google
