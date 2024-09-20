import React, { useState, createContext } from 'react';

const ThemeContext = createContext({});

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    primaryColor: '#4169E1',
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
  });

  const toggleTheme = () => {
    setTheme(prevTheme => {
      return {
        primaryColor: prevTheme.primaryColor === '#4169E1' ? '#8B008B' : '#4169E1',
        backgroundColor: prevTheme.backgroundColor === '#FFFFFF' ? '#000000' : '#FFFFFF',
        textColor: prevTheme.textColor === '#000000' ? '#FFFFFF' : '#000000',
      };
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
