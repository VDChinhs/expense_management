import { createContext, useState,Asyn } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleLogin } from "../process/LoginSign";
import { myWallet } from "../process/WalletController";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) =>{
    const [isLoading, setisLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);
    const [isWalleting, setWalleting] = useState(null);
    const [isData, setData] = useState(null)

    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('userToken', value);
        } catch (e) {
          console.log("Lỗi: " + e)
        }
    };

    const login = async (username, password) => {
        // storeData('akfuhasjfdgw');
        data = await handleLogin(username, password)
        if (data) {
            setData(data)
            storeData(data.token);
            
            try {
                const userToken = await AsyncStorage.getItem('userToken');
                if (userToken !== null) {
                    console.log('userToken: ' + userToken);
                    setUserToken(userToken);
                    var wallet = await myWallet(userToken)
                    setWalleting(wallet[0])
                }
            } catch (e) {
                console.log("Lỗi: " + e)
            }

        }

    };

    const logout = () => {
        AsyncStorage.removeItem('userToken')
        setUserToken(null);
        console.log('Xóa userToken');
    }

    return(
        <AuthContext.Provider value={{ login, logout, userToken, isWalleting, isData, setWalleting }}>
            {children}
        </AuthContext.Provider>
    )
}