import { Alert } from "react-native";
import { IP } from "../../Constant";

// Đăng ký
const doSign = async (name, username, password) => {
    if (name == "" || username == "" || password == "" ){
        Alert.alert('Cảnh báo', 'Vui lòng nhập đầy đủ thông tin', [
            {text: 'OK'}
        ]);
        return false
    }
    const data = {
        name,
        username,
        password
    };
    let response = await fetch(`http://${IP}:3000/sign`, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    if (!response.ok) {
        Alert.alert('Cảnh báo', 'Lỗi đăng ký tài khoản', [
            {text: 'OK'}
        ]);
        return false
    }
    else{
        let json = await response.json()
        if (!json.status) {
            Alert.alert('Cảnh báo', json.mes, [
                {text: 'OK'}
            ]);
            return false
        }
        console.log(json);
        return true
    }
}

//Đăng nhập
const doLogin = async (username,password) => {
    if (username == "" || password == "" ){
        Alert.alert('Cảnh báo', 'Vui lòng nhập đầy đủ thông tin', [
            {text: 'OK'}
        ]);
        return false
    }
    const data = {
        username,
        password
    };
    let response = await fetch(`http://${IP}:3000/login`, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    if (!response.ok) {
        Alert.alert('Cảnh báo', 'Lỗi đăng nhập', [
            {text: 'OK'}
        ]);
        return false
    }
    else{
        let json = await response.json()
        if (!json.status) {
            Alert.alert('Cảnh báo', json.mes, [
                {text: 'OK'}
            ]);
            return false
        }
        // console.log(json);
        return json
    }
}

export {doSign, doLogin};