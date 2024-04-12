import { Alert } from "react-native";
import { IP } from "../../Constant";


//Thêm ví
const addWallet = async (token, name, money, image) => {
    if (token == "" ||name == "" || money == null || image == 24 ){
        Alert.alert('Cảnh báo', 'Vui lòng nhập đầy đủ thông tin', [
            {text: 'OK'}
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
        Alert.alert('Cảnh báo', 'Lỗi lấy ví', [
            {text: 'OK'}
        ]);
        return false
    }
    else{
        let json = await response.json()
        // console.log(json);
        return json
    }
}

const walletFirst = async (token) => {
    let response = await fetch(`http://${IP}:3000/user/wallet/walletfirst`, {
        method: 'Get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    if (!response.ok) {
        Alert.alert('Cảnh báo', 'Lỗi lấy ví', [
            {text: 'OK'}
        ]);
        return false
    }
    else{
        let json = await response.json()
        // console.log(json);
        return json
    }
}

export { addWallet, myWallet, walletFirst };