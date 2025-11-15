import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const checkAuth = async () => {
        try {
            const data = localStorage.getItem("user");

            if (!data) {

                return;
            }

            setLoading(true);
            const user = JSON.parse(data);
            console.log("Data get from localStorage : ", user);

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/profile`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: user.id })
            })

            const jsonData = await response.json();

            if (!response.ok) {
                return;
            }

            setUser(jsonData.user);
            setLoading(false);

        } catch (error) {
            console.log(error);
            setUser(null);
        }
        finally {
            setLoading(false);
        }
    }

    const logout = () => {
        try {
            localStorage.removeItem("data");
            setUser(null);
        } catch (error) {
            console.log(error``);
        }
    }

    useEffect(() => {
        checkAuth();
    }, [])

    return (
        <div>

            <AuthContext.Provider value={{
                loading,
                setLoading,
                user,
                setUser,
                logout
            }}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}

export default AuthProvider;