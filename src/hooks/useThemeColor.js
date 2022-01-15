import { useContext} from 'react'
import {Darkmode} from '../context/ThemeContex'

const useThemeColor = () => {
    const {isDark, toggleTheme} = useContext(Darkmode);
    
    return {
        isDark,
        toggleTheme
    }
}

export default useThemeColor


