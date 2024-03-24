import { StyleSheet, View, Text } from "react-native";
import Button from "../../components/Button";
import InputText from "../../components/InputText";
import Logo from "../../components/Logo";
import { useState,useContext } from "react";
import { handleLogin } from "../../process/LoginSign";
import { AuthContext } from "../../context/AuthContext";


export default function LoginScreen({navigation}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useContext(AuthContext);

    return(
        <View style = {styles.container}>
            <View style = {styles.container}>
                <Logo 
                    text = {"MONEY"} 
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
                    style = {styles.margin} 
                    title={"Đăng nhập"}
                    // onPress={() => {handleLogin(username,password)}}
                    onPress={() => {login()}}

                />
                {/* <Text style = {styles.word} >Quên mật khẩu?</Text> */}
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
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:'#FFD3D3',
    },
    word:{
        fontWeight:'bold',
        fontSize: 15,
    },
    fonter:{

    },
    margin:{
        marginBottom:20
    }
})