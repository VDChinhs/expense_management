import { StyleSheet, View, Text } from "react-native";
import Button from "../../components/Button";
import InputText from "../../components/InputText";
import Logo from "../../components/Logo";
import { useState } from "react";
import { doSign } from "../../process/LoginSign";

export default function SignScreen({ navigation }) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleSign(name, username, password) {
        if (await doSign(name.trim(), username.trim(), password.trim())) {
            navigation.goBack()
        }
    }

    return (
        <View style={styles.container}>
            <Logo
                text={"Đăng ký tài khoản"}
                image={require('../../assets/dollar.png')}
            />
            <View style={styles.viewinput}>
                <InputText
                    label={"Tên"}
                    placeholder="Tên"
                    onChangeText={(text) => setName(text)}
                />
                <InputText
                    label={"Email"}
                    placeholder="Email"
                    onChangeText={(text) => setUsername(text)}
                />
                <InputText
                    label={"Mật khẩu"}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
                <Text>Bạn đã có tài khoản?
                    <Text
                        style={styles.textlink}
                        onPress={() =>
                            navigation.navigate('LoginScreen')
                        }
                    >
                        Đăng nhập
                    </Text>
                </Text>
            </View>
            <Button
                title={"Đăng ký"}
                onPress={() => {
                    handleSign(name, username, password)
                }}
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
    viewinput: {
        alignItems: "flex-end",
        marginBottom: 15
    },
    textlink: {
        color: '#560cce',
        fontWeight: "bold"
    }
})