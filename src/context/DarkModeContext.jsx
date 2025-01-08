// DarkModeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import theme from './../utils/theme';
import useMediaQuery from '@mui/material/useMediaQuery';

const DarkModeContext = createContext();

export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeProvider = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // التحقق من تفضيل المستخدم المحفوظ في localStorage أو الاعتماد على تفضيل النظام
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('isDarkMode');
    return savedMode !== null ? JSON.parse(savedMode) : prefersDarkMode;
  });

  useEffect(() => {
    // تحديث المود إذا تغير تفضيل النظام ولم يكن هناك تفضيل محفوظ مسبقاً
    if (localStorage.getItem('isDarkMode') === null) {
      setIsDarkMode(prefersDarkMode);
    }
  }, [prefersDarkMode]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('isDarkMode', JSON.stringify(newMode));
  };

  const currentTheme = theme(isDarkMode ? 'dark' : 'light');

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <MuiThemeProvider theme={currentTheme}>
        {children}
      </MuiThemeProvider>
    </DarkModeContext.Provider>
  );
};
