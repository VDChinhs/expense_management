import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doLogin } from "../process/LoginSign";
import { useDispatch } from "react-redux";
import { myWallet } from "../process/WalletController";

import { myAllGroupChi, myAllGroupThu, myAllGroupParentChi, myAllGroupParentThu } from "../redux/actions/groupAction";
import { myAllBudget } from "../redux/actions/budgetAction";
import { myAllWallet } from "../redux/actions/walletAction";
import { myTradeMMonth, myTradeMWeek, myTradeRecent, myTradeMonths, myTradeReports, myTradeReportDetailChi, myTradeReportDetailThu } from "../redux/actions/tradeAction";
import { setMyWalleting } from "../redux/reducers/walletReducer";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) =>{
    const [isLoading, setisLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);
    const [isData, setData] = useState(null)

    const dispatch = useDispatch()

    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('userToken', value);
        } catch (e) {
          console.log("Lỗi: " + e)
        }
    };

    const login = async (username, password) => {
        // storeData('akfuhasjfdgw');
        data = await doLogin(username, password)
        if (data) {
            setData(data)
            storeData(data.token);
            
            try {
                const userToken = await AsyncStorage.getItem('userToken');
                if (userToken !== null) {
                    console.log('userToken: ' + userToken);
                    setUserToken(userToken);
                    res_wallet = await myWallet(userToken)

                    dispatch(myAllWallet(userToken))
                    dispatch(setMyWalleting(res_wallet[0]))
                    
                    dispatch(myAllGroupChi({ userToken: userToken, walletId: res_wallet[0]._id }))
                    dispatch(myAllGroupThu({ userToken: userToken, walletId: res_wallet[0]._id }))
                    dispatch(myAllGroupParentChi({ userToken: userToken, walletId: res_wallet[0]._id, type: 0 }))
                    dispatch(myAllGroupParentThu({ userToken: userToken, walletId: res_wallet[0]._id, type: 1 }))

                    dispatch(myAllBudget(userToken))

                    dispatch(myTradeMMonth(userToken))
                    dispatch(myTradeMWeek(userToken))
                    dispatch(myTradeRecent(userToken))
                    dispatch(myTradeMonths({ userToken: userToken, walletId: res_wallet[0]._id }))
                    dispatch(myTradeReports({ userToken: userToken, walletId: res_wallet[0]._id}))
                    dispatch(myTradeReportDetailChi({ userToken: userToken, walletId: res_wallet[0]._id}))
                    dispatch(myTradeReportDetailThu({ userToken: userToken, walletId: res_wallet[0]._id}))
                }
            } catch (error) {
                console.log("Lỗi: " + error)
            }
        }
    };

    const logout = () => {
        AsyncStorage.removeItem('userToken')
        setUserToken(null);
        console.log('Xóa userToken');
    }

    return(
        <AuthContext.Provider value={{ login, logout, userToken, isData }}>
            {children}
        </AuthContext.Provider>
    )
}