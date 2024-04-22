import { Alert } from "react-native";
import { IP } from "../../Constant";
import { convertFirstDay } from "./Date";

//Thêm ngân sách
const addBudget = async (token, money, groupId, startDate, endDate, walletId) => {
    if (token == "" || money == null || groupId == undefined || walletId == undefined ){
        Alert.alert('Cảnh báo', 'Vui lòng nhập đầy đủ thông tin', [
            {text: 'OK'}
        ]);
        return false
    }
    if (money <= 0) {
        Alert.alert('Cảnh báo', 'Nhập số tiền lớn hơn 0', [
            {text: 'OK'}
        ]);
        return false
    }
    data = {
        money: money,
        groupId: groupId,
        startDate: convertFirstDay(startDate),
        endDate: convertFirstDay(endDate),
        walletId: walletId
    };

    let response = await fetch(`http://${IP}:3000/user/budget/addbudget`, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
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

//Sửa ngân sách
const changeBudget = async (token, id, money, groupId, startDate, endDate, walletId) => {
    if (token == "" || id == "" || money == null || groupId == undefined || walletId == undefined ){
        Alert.alert('Cảnh báo', 'Vui lòng nhập đầy đủ thông tin', [
            {text: 'OK'}
        ]);
        return false
    }
    if (money <= 0) {
        Alert.alert('Cảnh báo', 'Nhập số tiền lớn hơn 0', [
            {text: 'OK'}
        ]);
        return false
    }
    data = {
        id: id,
        money: money,
        groupId: groupId,
        startDate: convertFirstDay(startDate),
        endDate: convertFirstDay(endDate),
        walletId: walletId
    };

    let response = await fetch(`http://${IP}:3000/user/budget/changebudget`, {
        method: 'Put',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    })
    if (!response.ok) {
        Alert.alert('Cảnh báo', 'Lỗi sửa ngân sách', [
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

//Xóa ngân sách
const deleBudget = async (token, id) => {
    if (token == "" || id == '' ){
        Alert.alert('Cảnh báo', 'Vui lòng nhập đầy đủ thông tin', [
            {text: 'OK'}
        ]);
        return false
    }

    data = {
        id: id
    };
    let response = await fetch(`http://${IP}:3000/user/budget/delebudget`, {
        method: 'Delete',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    })
    if (!response.ok) {
        Alert.alert('Cảnh báo', 'Lỗi xóa ngân sách', [
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

//Lấy tất cả các ngân sách
const myBudget = async (token) => {
    let response = await fetch(`http://${IP}:3000/user/budget/mybudget`, {
        method: 'Get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    if (!response.ok) {
        Alert.alert('Cảnh báo', 'Lỗi lây ngân sách', [
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

export { addBudget,changeBudget, deleBudget, myBudget };