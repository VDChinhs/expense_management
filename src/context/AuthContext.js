import { createContext, useState,Asyn } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) =>{
    const [isLoading, setisLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);
    const [isWalleting, setWallet] = useState('Học tập');

    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('userToken', value);
        } catch (e) {
          console.log("Lỗi: " + e)
        }
    };

    const login = async () => {
        storeData('akfuhasjfdgw');
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            if (userToken !== null) {
                console.log('userToken: ' + userToken);
                setUserToken(userToken);
            }
        } catch (e) {
            console.log("Lỗi: " + e)
        }
    };

    const logout = () => {
        AsyncStorage.removeItem('userToken')
        setUserToken(null);
        console.log('Xóa userToken');
    }

    return(
        <AuthContext.Provider value={{ login, logout, userToken, isWalleting }}>
            {children}
        </AuthContext.Provider>
    )
}