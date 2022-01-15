import React,{ createContext, useState, useContext } from "react";

export const Darkmode = createContext();


const ThemeProvider = ({children}) => {
    const [isDark, setIsDark] = useState(true);
    
    const toggleTheme = () => {
        setIsDark(!isDark)
    }
    
    return (
        <Darkmode.Provider value={{isDark, toggleTheme}}>
            {children}
        </Darkmode.Provider>
    )
}


export default ThemeProvider;