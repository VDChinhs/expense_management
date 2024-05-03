import { Alert } from "react-native";
import { IP } from "../../Constant";

// Đổi mật khẩu
const changePassWord = async (token, passwordOld, passwordNew) => {
    if (passwordOld == "" || passwordNew == "") {
        Alert.alert('Cảnh báo', 'Vui lòng nhập đầy đủ thông tin', [
            { text: 'OK' }
        ]);
        return false
    }
    const data = {
        passwordOld: passwordOld,
        passwordNew: passwordNew
    };
    let response = await fetch(`http://${IP}:3000/user/changepassword`, {
        method: 'Put',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    })
    if (!response.ok) {
        Alert.alert('Cảnh báo', 'Lỗi đổi mật khẩu', [
            { text: 'OK' }
        ]);
        return false
    }
    else {
        let json = await response.json()
        if (!json.status) {
            Alert.alert('Cảnh báo', json.mes, [
                { text: 'OK' }
            ]);
            return false
        }
        console.log(json);
        return true
    }
}

//Xóa tài khoản
const deleAcc = async (token) => {
    let response = await fetch(`http://${IP}:3000/user/deleacc`, {
        method: 'Delete',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    if (!response.ok) {
        Alert.alert('Cảnh báo', 'Lỗi xóa tài khoản', [
            { text: 'OK' }
        ]);
        return false
    }
    else {
        let json = await response.json()
        if (!json.status) {
            Alert.alert('Cảnh báo', json.mes, [
                { text: 'OK' }
            ]);
            return false
        }
        console.log(json);
        return true
    }
}

export { changePassWord, deleAcc };