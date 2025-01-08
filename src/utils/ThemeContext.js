// ThemeContext.js
import React, { createContext, useContext, useState } from 'react';
import  getTheme  from './theme';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(getTheme());

    const changeTheme = (newLanguage) => {
        setTheme(getTheme(newLanguage));
    };

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
