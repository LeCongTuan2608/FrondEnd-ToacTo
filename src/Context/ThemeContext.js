import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
   const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
   useEffect(() => {
      localStorage.setItem('theme', theme === 'light' ? 'light' : 'dark');
   }, [theme]);
   return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
