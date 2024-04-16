import { Alert } from "react-native";
import { IP } from "../../Constant";
import { convertFirstDay } from "./Date";

//Thêm giao dichj
const addTrade = async (token, money, groupId, note, date, walletId) => {
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
        note: note,
        date: convertFirstDay(date),
        walletId: walletId
    };

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

//Lấy các giao dịch gần đây
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

//Lấy giao dịch tổng các khoản chi tháng này và tháng trước
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

//Lấy giao dịch tổng các khoản chi tuần này và tuần trước
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

//Lấy giao dịch các tháng
const tradeMonths = async (token, numbermonth, walletId) => {
    let response = await fetch(`http://${IP}:3000/user/trade/trademonths?numbermonth=${numbermonth}&walletId=${walletId}`, {
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

//Lấy báo cáo giao dịch các tháng
const tradeReports = async (token, numbermonth, walletId) => {
    let response = await fetch(`http://${IP}:3000/user/trade/tradreports?numbermonth=${numbermonth}&walletId=${walletId}`, {
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

//Lấy chi tiết báo cáo giao dịch các tháng
const tradeReportDetail = async (token, numbermonth, walletId, type) => {
    let response = await fetch(`http://${IP}:3000/user/trade/tradreportdetail?numbermonth=${numbermonth}&walletId=${walletId}&type=${type}`, {
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

export { addTrade, tradeRecent, mostTradeMonth, mostTradeWeek, tradeMonths, tradeReports, tradeReportDetail };