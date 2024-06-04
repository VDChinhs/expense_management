import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity } from "react-native";
import Button from "../../components/Button";
import { useState, useEffect } from "react";
import HeaderRight from "../../components/HeaderRight";
import DateTimePicker from '@react-native-community/datetimepicker';

import { useDispatch, useSelector } from "react-redux";
import { myAllWallet } from "../../redux/actions/walletAction";
import { myAllBudget } from "../../redux/actions/budgetAction";
import { myTradeMMonth, myTradeMWeek, myTradeRecent, myTradeMonths, myTradeReports, myTradeReportDetailChi, myTradeReportDetailThu, myTradeChange, myTradeDele } from "../../redux/actions/tradeAction";

function Input({ image, sizeimg, fontsize, label, ...prop }) {
    return (
        <View style={[styles.inputcontainer, { gap: 55 - sizeimg }]}>
            <Image
                source={image}
                style={{
                    width: sizeimg,
                    height: sizeimg,
                }}
            />
            <TextInput
                style={[styles.input, { fontSize: fontsize }]}
                placeholder={label}
                {...prop}

            />
        </View>
    );
}

function TitleInput({ image, sizeimg, fontsize, title, onPress }) {
    return (
        <TouchableOpacity
            style={[styles.containertitle, { gap: 55 - sizeimg }]}
            onPress={onPress}
        >
            <Image
                source={image}
                style={{
                    width: sizeimg,
                    height: sizeimg,
                }}
            />
            <Text style={{
                fontSize: fontsize,
                fontWeight: 'bold',
                opacity: title == 'Chọn nhóm' ? 0.4 : 1
            }}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const convertDate = (chooseDate) => {
    var currentDate = new Date()
    if ((chooseDate.getDate() - currentDate.getDate() == -1) && (chooseDate.getMonth() - currentDate.getMonth() == 0)) {
        return "Hôm qua"
    } else if ((chooseDate.getDate() - currentDate.getDate() == 1) && (chooseDate.getMonth() - currentDate.getMonth() == 0)) {
        return "Ngày mai"
    } else if ((chooseDate.getDate() - currentDate.getDate() == 0) && (chooseDate.getMonth() - currentDate.getMonth() == 0)) {
        return "Hôm nay"
    } else {
        var day = chooseDate.getDay() + 1;
        var date = chooseDate.getDate();
        var month = chooseDate.getMonth() + 1;
        var year = chooseDate.getFullYear();
        var time = (day == 1 ? 'Chủ nhật' : 'Thứ ' + day) + ', ' + date + '/' + month + '/' + year
        return time
    }
}

export default function EditTradeScreen({ navigation, route }) {
    const { userToken } = useSelector(state => state.userReducer)
    const { _isWalleting } = useSelector(state => state.walletReducer)
    const { isChangeing, isDeleting } = useSelector(state => state.tradeReducer)

    const [isMoney, setMoney] = useState(0);
    const [isGroup, setGroup] = useState({ name: null, image: null });
    const [isNote, setNote] = useState('');
    const [isDate, setDate] = useState(new Date());
    const [isWallet, setWallet] = useState({ name: null, image: null });

    const [isTrade, setTrade] = useState(null);

    const [isshowpickdate, setShowPickDate] = useState(false);

    const dispatch = useDispatch()

    useEffect(() => {
        if (route.params?.group) {
            setGroup(route.params?.group)
        }
        if (route.params?.note) {
            setNote(route.params?.note)
        }
        if (route.params?.wallet) {
            setWallet(route.params?.wallet)
            setGroup({ name: 'Chọn nhóm', image: require('../../assets/question.png') })
        }
        if (route.params?.trade) {
            setMoney(route.params.trade.money < 0 ? -(route.params.trade.money) : (route.params.trade.money))
            setGroup(route.params.trade.groupId)
            setNote(route.params?.trade.note)
            setDate(new Date(route.params.trade.date))
            setWallet(route.params.trade.walletId)

            setTrade(route.params?.trade)
        }
        navigation.setOptions({
            headerRight: () =>
                <HeaderRight
                    image2={require('../../assets/trash.png')}
                    onPress2={() => {
                        handleDeleTrade(userToken, route.params?.trade._id)
                    }}
                    disabled2={isDeleting}
                />
        });
    }, [route]);

    function handleDeleTrade(userToken, tradeId) {
        if (userToken == "") {
            Alert.alert('Cảnh báo', 'Vui lòng nhập đầy đủ thông tin', [
                { text: 'OK' }
            ]);
            return
        }
        dispatch(myTradeDele({ token: userToken, id: tradeId, walletId: _isWalleting._id }))
            .unwrap()
            .then(() => {
                dispatch(myAllWallet(userToken))

                dispatch(myAllBudget(userToken))

                dispatch(myTradeMMonth(userToken))
                dispatch(myTradeMWeek(userToken))
                dispatch(myTradeRecent(userToken))
                dispatch(myTradeMonths({ userToken: userToken, walletId: _isWalleting._id }))
                dispatch(myTradeReports({ userToken: userToken, walletId: _isWalleting._id }))
                dispatch(myTradeReportDetailChi({ userToken: userToken, walletId: _isWalleting._id }))
                dispatch(myTradeReportDetailThu({ userToken: userToken, walletId: _isWalleting._id }))
                navigation.goBack()
            })
            .catch(() => { })
    }

    function handleChangeTrade(userToken, tradeId, isMoney, groupId, isNote, isDate, walletId) {
        if (userToken == "" || isMoney == null || groupId == undefined || walletId == undefined) {
            Alert.alert('Cảnh báo', 'Vui lòng nhập đầy đủ thông tin', [
                { text: 'OK' }
            ]);
            return
        }
        if (isMoney <= 0) {
            Alert.alert('Cảnh báo', 'Nhập số tiền lớn hơn 0', [
                { text: 'OK' }
            ]);
            return
        }
        dispatch(myTradeChange({
            token: userToken,
            id: tradeId,
            money: isMoney,
            groupId: groupId,
            note: isNote,
            date: isDate,
            walletId: walletId
        }))
            .unwrap()
            .then(() => {
                dispatch(myAllWallet(userToken))

                dispatch(myAllBudget(userToken))

                dispatch(myTradeMMonth(userToken))
                dispatch(myTradeMWeek(userToken))
                dispatch(myTradeRecent(userToken))
                dispatch(myTradeMonths({ userToken: userToken, walletId: _isWalleting._id }))
                dispatch(myTradeReports({ userToken: userToken, walletId: _isWalleting._id }))
                dispatch(myTradeReportDetailChi({ userToken: userToken, walletId: _isWalleting._id }))
                dispatch(myTradeReportDetailThu({ userToken: userToken, walletId: _isWalleting._id }))
                navigation.goBack()
            })
            .catch(() => { })
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputs}>
                <Input
                    image={require('../../assets/coins.png')}
                    sizeimg={30}
                    fontsize={30}
                    autoFocus={true}
                    keyboardType="number-pad"
                    onChangeText={(money) => {
                        const rawValue = money.replace(/,/g, '');
                        if (rawValue === '') {
                            setMoney('');
                            return;
                        }
                        if (rawValue === '0') {
                            setMoney('');
                            return;
                        }
                        const formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        setMoney(formattedValue)
                    }}
                    value={isMoney.toLocaleString()}
                />

                <TitleInput
                    title={isGroup.name}
                    image={(typeof isGroup.image) == 'number' ? Number(isGroup.image) : { uri: isGroup.image }}
                    sizeimg={30}
                    fontsize={20}
                    onPress={() => navigation.navigate({
                        name: 'ChooseGroup',
                        params: { back: 'EditTradeScreen', group: isGroup, type: 'choose' }
                    })}
                />

                <Input
                    label={"Ghi chú"}
                    image={require('../../assets/align-left.png')}
                    sizeimg={20}
                    fontsize={15}
                    onChangeText={(value) => setNote(value)}
                />

                <TitleInput
                    title={convertDate(isDate)}
                    image={require('../../assets/calendar-day.png')}
                    sizeimg={20}
                    fontsize={15}
                    onPress={() => setShowPickDate(true)}
                />

                <TitleInput
                    image={{ uri: isWallet.image }}
                    title={isWallet.name}
                    sizeimg={20}
                    fontsize={15}
                    onPress={() => navigation.navigate({
                        name: 'MyWallet',
                        params: { back: 'EditTradeScreen', wallet: isWallet, type: 'choose' }
                    })}
                />

            </View>

            <Button title={"Sửa"} onPress={() =>
                handleChangeTrade(
                    userToken,
                    isTrade._id,
                    parseFloat(String(isMoney).replace(/,/g, '')),
                    isGroup._id,
                    isNote,
                    isDate,
                    isWallet._id
                )
            }
                disabled={isChangeing}
            />

            {isshowpickdate && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={isDate}
                    mode={'date'}
                    is24Hour={true}
                    timeZoneName="Asia/Bangkok"
                    onChange={(event, selectedDate) => {
                        const chooseDate = selectedDate;
                        setShowPickDate(false);
                        setDate(chooseDate);
                    }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 50,
        height: '100%',
    },
    containertitle: {
        flexDirection: 'row',
        paddingLeft: 15,
        padding: 15,
        alignItems: 'center',
    },
    inputs: {
        width: '100%',
        backgroundColor: 'white',
        gap: -10,
        marginTop: 20,
    },
    inputcontainer: {
        width: 360,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        paddingLeft: 15,
        padding: 15,
    },
    input: {
        width: '83%',
        fontWeight: 'bold',
        // backgroundColor:'red'
    },
})