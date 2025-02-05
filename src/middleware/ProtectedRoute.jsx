import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { user,isFetchedUserLoading } = useAuthContext();;

    if (!user && !isFetchedUserLoading) {
        return <Navigate to="/signin" replace />;
    }

    if (!isFetchedUserLoading && requiredRole && user.role !== requiredRole) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
