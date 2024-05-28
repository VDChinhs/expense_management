import { Alert } from "react-native";
import { IP } from "../../Constant";

//Thêm ví
const addWallet = async (token, name, money, image) => {
    if (token == "" || name == "" || money == null) {
        Alert.alert('Cảnh báo', 'Vui lòng nhập đầy đủ thông tin', [
            { text: 'OK' }
        ]);
        return false
    }
    if (image == require('../assets/question.png')) {
        Alert.alert('Cảnh báo', 'Vui lòng chọn Icon', [
            { text: 'OK' }
        ]);
        return false
    }
    const data = {
        name: name,
        money: money,
        image: image
    };
    let response = await fetch(`http://${IP}:3000/user/wallet/addwallet`, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    })
    if (!response.ok) {
        Alert.alert('Cảnh báo', 'Lỗi thêm ví', [
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

//Sửa ví
const changeWallet = async (token, id, name, image) => {
    if (token == "" || id == "" || name == "") {
        Alert.alert('Cảnh báo', 'Vui lòng nhập đầy đủ thông tin', [
            { text: 'OK' }
        ]);
        return false
    }
    const data = {
        id: id,
        name: name,
        image: image
    };
    let response = await fetch(`http://${IP}:3000/user/wallet/changewallet`, {
        method: 'Put',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    })
    if (!response.ok) {
        Alert.alert('Cảnh báo', 'Lỗi sửa ví', [
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

//Xóa ví
const deleWallet = async (token, id) => {
    if (token == "" || id == "") {
        Alert.alert('Cảnh báo', 'Vui lòng nhập đầy đủ thông tin', [
            { text: 'OK' }
        ]);
        return false
    }
    const data = {
        id: id
    };
    let response = await fetch(`http://${IP}:3000/user/wallet/delewallet`, {
        method: 'Delete',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    })
    if (!response.ok) {
        Alert.alert('Cảnh báo', 'Lỗi xóa ví', [
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

//Lấy tất các ví
const myWallet = async (token) => {
    let response = await fetch(`http://${IP}:3000/user/wallet/mywallet`, {
        method: 'Get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    if (!response.ok) {
        Alert.alert('Cảnh báo', 'Lỗi lấy tất các ví', [
            { text: 'OK' }
        ]);
        return false
    }
    else {
        let json = await response.json()
        // console.log(json);
        return json
    }
}

//Lấy các ví đầu tiên
const walletFirst = async (token) => {
    let response = await fetch(`http://${IP}:3000/user/wallet/walletfirst`, {
        method: 'Get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    if (!response.ok) {
        Alert.alert('Cảnh báo', 'Lỗi lấy ví đầu tiên', [
            { text: 'OK' }
        ]);
        return false
    }
    else {
        let json = await response.json()
        // console.log(json);
        return json
    }
}

export { addWallet, changeWallet, deleWallet, myWallet, walletFirst };