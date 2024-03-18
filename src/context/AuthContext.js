import { createContext, useState,Asyn } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) =>{
    const [isLoading, setisLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);

    const login = () => {
        setUserToken('asfkahsf');
        // AsyncStorage.setItem('userToken','asfkjafs');
    }

    const logout = () => {
        // AsyncStorage.removeItem('userToken')
        setUserToken(null);
    }

    return(
        <AuthContext.Provider value={{ login, logout, userToken }}>
            {children}
        </AuthContext.Provider>
    )
}