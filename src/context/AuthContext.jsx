import React, { createContext, useContext, useState } from "react";
import { useGetMe, useSignOut } from '../hook/useAuth.js';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const { user: fetchedUser, isLoading: isFetchedUserLoading } = useGetMe();
    const [user, setUser] = useState(fetchedUser);
    const { signOut, isLoading: isSignOutLoading, error: signOutError } = useSignOut();

    const logout = async () => {
        try {
            await signOut();
            setUser(null); // รีเซ็ต user หลัง Logout
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }


    if (user !== fetchedUser) {
        setUser(fetchedUser);
    }

    return (
        <AuthContext.Provider value={{ user, setUser, logout, isFetchedUserLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
