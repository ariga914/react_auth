import React, { useState } from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
});

export const AuthContextProvider = (props) => {
    const tokenStoreKey = 'token';
    const storedToken = localStorage.getItem(tokenStoreKey);
    const [token, setToken] = useState(storedToken);

    const loginHandler = (token) => {
        localStorage.setItem(tokenStoreKey, token);
        setToken(token);
    };

    const logoutHandler = () => {
        localStorage.removeItem(tokenStoreKey);
        setToken(null);
    }

    const contextValue = {
        token: token,
        isLoggedIn: !!token,
        login: loginHandler,
        logout: logoutHandler,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
