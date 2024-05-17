import { Text, View, StyleSheet, Image, TouchableWithoutFeedback } from "react-native";
import { useState } from "react";
import ButtonSc from "../../components/ButtonSc";
import Button from "../../components/Button";
import InputText from "../../components/InputText";
import { changePassWord, deleAcc } from "../../process/UserController";

import { useDispatch, useSelector } from "react-redux";
import { myLogout, resetUser } from "../../redux/reducers/userReducer";

import { resetWallet } from "../../redux/reducers/walletReducer";
import { resetBudget } from "../../redux/reducers/budgetReducer";
import { resetGroup } from "../../redux/reducers/groupReducer";

export function ChangePassWord({ navigation }) {
    const [passwordOld, setPasswordOld] = useState('');
    const [passwordNew, setPasswordNew] = useState('');

    const { userToken } = useSelector(state => state.userReducer)

    async function handleChangePassWord(userToken, passwordOld, passwordNew) {
        if (await changePassWord(userToken, passwordOld, passwordNew)) {
            navigation.goBack()
        }
    }

    return (
        <View style={styles.containerchangepassword}>
            <InputText
                label={'Mật khẩu cũ'}
                onChangeText={(text) => setPasswordOld(text)}
            />
            <InputText
                label={'Mật khẩu mới'}
                onChangeText={(text) => setPasswordNew(text)}
            />
            <Button
                title={'Thay đổi mật khẩu'}
                onPress={() => {
                    handleChangePassWord(userToken, passwordOld, passwordNew)
                }}
            />
        </View>
    )
}

export function DeleAccount() {
    const { userToken } = useSelector(state => state.userReducer)
    const dispatch = useDispatch()

    async function handleDeleAccount(userToken) {
        if (await deleAcc(userToken)) {
            dispatch(myLogout())
        }
    }

    return (
        <View style={styles.containerdele}>
            <View style={styles.infodele}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Xóa tài khoản sẽ:</Text>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>❌ Không thể khôi phục dữ liệu ban đầu</Text>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>❌ Đăng xuất khỏi tất cả các thiết bị</Text>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>❌ Xóa Toàn bộ thông tin tài khoản</Text>
            </View>
            <Button
                title={"Xác nhận"}
                onPress={() =>
                    handleDeleAccount(userToken)
                }
            />
        </View>
    )
}

export default function AccountManagerScreen({ navigation }) {
    const { myData } = useSelector(state => state.userReducer)
    const dispatch = useDispatch()

    function handleLogout() {
        dispatch(myLogout())
        dispatch(resetWallet())
        dispatch(resetBudget())
        dispatch(resetUser())
        dispatch(resetWallet())
        dispatch(resetGroup())
    }

    return (
        <View style={styles.container}>
            <View>
                <TouchableWithoutFeedback >
                    <View style={styles.info_button}>
                        <View style={styles.info}>
                            <Image style={styles.avatar} source={require('../../assets/man.png')}></Image>
                            <Text style={styles.text}>{myData.name}</Text>
                            <Text style={styles.text}>{myData.username}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

                <View>
                    <ButtonSc
                        title={'Thay đổi mật khẩu'}
                        image={require('../../assets/replace.png')}
                        onPress={() =>
                            navigation.navigate('ChangePassWord')
                        }
                    />
                    <ButtonSc
                        title={'Xóa tài khoản'}
                        image={require('../../assets/delete-user.png')}
                        onPress={() =>
                            navigation.navigate('DeleAccount')
                        }
                    />
                </View>
            </View>
            <Button
                title={"Đăng xuất"}
                onPress={() =>
                    handleLogout()
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '100%',
        justifyContent:'space-between',
        paddingBottom: 50
    },
    info_button: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 20,
        gap: -31,
    },
    info: {
        alignItems: 'center',
        width: 328
    },
    avatar: {
        width: 100,
        height: 100,
        marginBottom: 10
    },
    text: {
        fontWeight: 'bold'
    },
    containerchangepassword: {
        alignItems: 'center',
        gap: 30,
        marginTop: 30
    },
    containerdele: {
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    infodele: {
        width: 360,
        paddingLeft: 15,
        gap: 15,
        paddingBottom: 450,
        justifyContent: 'flex-start',
    }
})