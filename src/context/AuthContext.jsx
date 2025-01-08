import React, { createContext, useContext } from 'react';

const AuthContext = createContext(false);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ isAuth, children }) => {
    return <AuthContext.Provider value={isAuth}>{children}</AuthContext.Provider>;
};
