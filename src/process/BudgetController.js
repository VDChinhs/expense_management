import { Alert } from "react-native";
import { IP } from "../../Constant";

const addBudget = async (token, money, groupId, startDate, endDate, walletId) => {
    if (token == "" || money == null || groupId == undefined || walletId == undefined ){
        Alert.alert('Cảnh báo', 'Vui lòng nhập đầy đủ thông tin', [
            {text: 'OK'}
        ]);
        return false
    }
    data = {
        money: money,
        groupId: groupId,
        startDate: startDate,
        endDate: endDate,
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

export { addBudget };