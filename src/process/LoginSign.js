import { Alert } from "react-native";

// Đăng ký
const handleSign = async (name, username, password, props) => {
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
    let response = await fetch('http://192.168.1.6:3000/test/sign', {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    if (response.status != 200) {
        console.log("Đăng ký thất bại");
    }
    else{
        let json = await response.json()
        console.log(json);
        return true
    }
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
    fetch('http://192.168.1.6:3000/test/login', {
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