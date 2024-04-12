import { Alert } from "react-native";
import { IP } from "../../Constant";

const addTrade = async (token, money, groupId, note, date, walletId) => {
    if (token == "" || money == null || groupId == undefined || walletId == undefined ){
        Alert.alert('Cảnh báo', 'Vui lòng nhập đầy đủ thông tin', [
            {text: 'OK'}
        ]);
        return false
    }
    data = {
        money: money,
        groupId: groupId,
        note: note,
        date: date,
        walletId: walletId
    };

    console.log(data);
    let response = await fetch(`http://${IP}:3000/user/trade/addtrade`, {
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

const tradeRecent = async (token) => {
    let response = await fetch(`http://${IP}:3000/user/trade/traderecent`, {
        method: 'Get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    if (!response.ok) {
        Alert.alert('Cảnh báo', 'Lỗi lấy giao dịch gần đấy', [
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

const mostTradeMonth = async (token, month) => {
    let response = await fetch(`http://${IP}:3000/user/trade/mosttrademonth?month=${month}`, {
        method: 'Get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    if (!response.ok) {
        Alert.alert('Cảnh báo', 'Lỗi lấy khoản chi trong tháng', [
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

const mostTradeWeek = async (token) => {
    let response = await fetch(`http://${IP}:3000/user/trade/mosttradeweek`, {
        method: 'Get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    if (!response.ok) {
        Alert.alert('Cảnh báo', 'Lỗi lấy khoản chi trong tuần', [
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



export { addTrade, tradeRecent, mostTradeMonth, mostTradeWeek };