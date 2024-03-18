import { TextInput, View, StyleSheet, Text} from "react-native";
import Logo from "../../components/Logo";
import Button1 from "../../components/Button1";
import { useState } from "react";
import axios from "axios";

const LoginScreen1 = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        const data = {
            username,
            password
        };
        console.log(JSON.stringify(data));
        fetch('http://192.168.1.4:3000/login', {
          method: 'Post',
          headers: {
            'Content-Type': 'application/json',
        },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (response.ok) {
              console.log('Đăng nhập thành công!');
            } else {
              const error = response.statusText;
              console.log('Lỗi đăng nhập:', error);
            }
        });
    };

    const getdata = () => {
        console.log("getdata")
        axios.get('http://192.168.1.4:3000/')
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return(
        <View style = {styles.continer}>
            <Logo text = {"Vu Duc Chinh"}></Logo>
            <View style = {styles.viewinput}>
                <TextInput 
                    style={styles.textinput}
                    placeholder="Email" 
                    onChangeText={(text) => setUsername(text)}
                />
                <TextInput 
                    style={styles.textinput}
                    placeholder="Password" 
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
                <Text>Forgot your password?</Text>
            </View>
            <Button1 title={"LOGIN"} onPress={handleLogin}/>
            <Text>Don't have an account? <Text style = {styles.textlink}>Sign up</Text></Text>
        </View>
    )
};

const styles = StyleSheet.create({
    continer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    viewinput:{
        alignItems:"flex-end",
        marginBottom:15
    },
    textinput:{
        borderWidth: 1, 
        margin:5,
        width:250,
        height:50,
        borderRadius:5,
        padding:10
    },
    textlink:{
        color: '#560cce',
        fontWeight:"bold"
    }
})


export default LoginScreen1;