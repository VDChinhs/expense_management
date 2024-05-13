import { StyleSheet, View } from "react-native";
import Button from "../../components/Button";
import InputText from "../../components/InputText";
import Logo from "../../components/Logo";
import { useState } from "react";

import { myWallet } from "../../process/WalletController";
import { getTokenStorage, removeTokenStorage } from "../../helpers/storage";
import { useDispatch, useSelector } from "react-redux";
import { myLogin } from "../../redux/actions/userAction";
import { myAllWallet } from "../../redux/actions/walletAction";
import { setMyWalleting } from "../../redux/reducers/walletReducer";
import { myAllGroupChi, myAllGroupThu, myAllGroupParentChi, myAllGroupParentThu } from "../../redux/actions/groupAction";
import { myAllBudget } from "../../redux/actions/budgetAction";
import { myTradeMMonth, myTradeMWeek, myTradeRecent, myTradeMonths, myTradeReports, myTradeReportDetailChi, myTradeReportDetailThu } from "../../redux/actions/tradeAction";

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch()
    const { isLoging } = useSelector(state => state.userReducer)

    async function handleLogin(username, password) {
        dispatch(myLogin({ username: username.trim(), password: password.trim() })).then(async (result) => {
            if (result.payload) {
                const userToken = await getTokenStorage()
                console.log('userToken: ' + userToken);
                const res_wallet = await myWallet(userToken)

                if (userToken !== null) {

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
                    dispatch(myTradeReports({ userToken: userToken, walletId: res_wallet[0]._id }))
                    dispatch(myTradeReportDetailChi({ userToken: userToken, walletId: res_wallet[0]._id }))
                    dispatch(myTradeReportDetailThu({ userToken: userToken, walletId: res_wallet[0]._id }))
                }
            }
        })

    }

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Logo
                    text={"MONEY SAVER"}
                    image={require('../../assets/dollar.png')}
                />
                <InputText
                    label={"Email"}
                    onChangeText={(text) => setUsername(text)}
                />
                <InputText
                    label={"Mật khẩu"}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
                <Button
                    style={styles.margin}
                    title={"Đăng nhập"}
                    disabled={isLoging}
                    onPress={() =>
                        handleLogin(username, password)
                    }
                />
            </View>
            <Button
                style={styles.margin}
                title={"Tạo tài khoản"}
                transparent={true}
                onPress={() => navigation.navigate('SignScreen')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor:'#FFD3D3',
    },
    word: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    margin: {
        marginBottom: 20
    }
})