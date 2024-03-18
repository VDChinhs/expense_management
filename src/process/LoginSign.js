import { Alert } from "react-native";

// Đăng ký
const handleSign = (name, username, password, props) => {
    if (name == "" || username == "" || password == "" ){
        Alert.alert('Cảnh báo', 'Vui lòng nhập đầy đủ thông tin', [
            {text: 'OK'}
        ]);
        return
    }
    const data = {
        name,
        username,
        password
    };
    console.log(data);
    fetch('http://192.168.1.4:3000/sign', {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        if (response.ok) {
           console.log('Đăng ký thành công!');
           return true
        } else {
        //    const error = response.statusText;
           console.log('Lỗi đăng ký');
        }
    });
    return false
}

//Đăng nhập
const handleLogin = (username,password) => {
    if (username == "" || password == "" ){
        Alert.alert('Cảnh báo', 'Vui lòng nhập đầy đủ thông tin', [
            {text: 'OK'}
        ]);
        return
    }

    const data = {
        username,
        password
    };
    console.log(data);
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
}

export {handleSign, handleLogin};