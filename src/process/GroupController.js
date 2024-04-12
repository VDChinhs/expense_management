import { Alert } from "react-native";
import { IP } from "../../Constant";

// Thêm nhóm
const addGroup = async (token, name, image, type, parent, walletId) => {
    if (token == "" || name == "" || type == null || image == "" || walletId == "" ){
        Alert.alert('Cảnh báo', 'Vui lòng nhập đầy đủ thông tin', [
            {text: 'OK'}
        ]);
        return false
    }
    let data
    if (parent == "Chọn nhóm") {
        data = {
            name: name,
            image: image,
            type: (type == "Khoản chi" ? 0: 1),
            walletId: walletId
        };
    }
    else{
        data = {
            name: name,
            image: image,
            type: (type == "Khoản chi" ? 0: 1),
            parent: parent,
            walletId: walletId
        };
    }
    let response = await fetch(`http://${IP}:3000/user/group/addgroup`, {
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
        // console.log(json);
        return true
    }
}

//Xóa nhóm
const deleGroup = async(token, id) =>{
    let response = await fetch(`http://${IP}:3000/user/group/delegroup`, {
        method: 'Delete',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({id: id}),
    })
    if (!response.ok) {
        Alert.alert('Cảnh báo', 'Lỗi thêm giao dịch', [
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

//Lấy tất các nhóm
const myGroup = async (token, type, walletId) => {
    let response = await fetch(`http:/${IP}:3000/user/group/mygroup?type=${type}&walletId=${walletId}`, {
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

//Lấy các nhóm cha
const groupParent = async(token, type, walletId) => {
    let response = await fetch(`http://${IP}:3000/user/group/groupparent?type=${type}&walletId=${walletId}`, {
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


export { addGroup, deleGroup, myGroup, groupParent };