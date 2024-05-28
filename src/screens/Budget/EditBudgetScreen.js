import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity, Modal } from "react-native";
import Button from "../../components/Button";
import { useState, useEffect, useContext } from "react";
import HeaderRight from "../../components/HeaderRight";
import DateTimePicker from '@react-native-community/datetimepicker';
import { thisweek, thismonth, thisquy, thisyear, getRangeDate, convertFirstDay } from "../../process/Date";

import { useDispatch, useSelector } from "react-redux";
import { myBudgetChange, myBudgetDele } from "../../redux/actions/budgetAction";

function Input({ image, sizeimg, fontsize, label, ...prop }) {
    return (
        <View style={[styles.inputcontainer, { gap: 55 - sizeimg }]}>
            <Image
                source={Number(image)}
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
            onPress={onPress}>
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

const convertDateModal = (start, end) => {

    var datestart = start.getDate();
    var monthstart = start.getMonth() + 1;
    var yearstart = start.getFullYear();

    var dateend = end.getDate();
    var monthend = end.getMonth() + 1;
    var yearend = end.getFullYear();

    if (getRangeDate(start, end) == 6) {
        return "Tuần này (" + datestart + '/' + monthstart + ' - ' + dateend + '/' + monthend + ')'
    } else if (monthend - monthstart == 0 && dateend - datestart > 27) {
        return "Tháng này (" + datestart + '/' + monthstart + ' - ' + dateend + '/' + monthend + ')'
    } else if (monthend - monthstart == 2) {
        return "Quý này (" + datestart + '/' + monthstart + ' - ' + dateend + '/' + monthend + ')'
    } else if (monthend - monthstart == 11) {
        return "Năm này (" + datestart + '/' + monthstart + '/' + yearstart + ' - ' + dateend + '/' + monthend + '/' + yearend + ')'
    }
}

const convertDate = (chooseDate) => {
    var date = chooseDate.getDate();
    var month = chooseDate.getMonth() + 1;
    var year = chooseDate.getFullYear();
    return date + '/' + month + '/' + year
}

export default function EditBudgetScreen({ navigation, route }) {
    const { userToken } = useSelector(state => state.userReducer)
    const { isChangeing, isDeleting } = useSelector(state => state.budgetReducer)

    const dispatch = useDispatch()

    const [isMoney, setMoney] = useState(0);
    const [isGroup, setGroup] = useState({ name: null, image: null });
    const [isRangeDateStart, setRangeDateStart] = useState(new Date());
    const [isRangeDateEnd, setRangeDateEnd] = useState(new Date());
    const [isWallet, setWallet] = useState({ name: null, image: null });

    const [isBudget, setBudget] = useState(null);

    const [isOptionDateStart, setOptionDateStart] = useState(new Date());
    const [isOptionDateEnd, setOptionDateEnd] = useState(new Date());

    const [isshowpickdatestart, setShowPickDateStart] = useState(false);
    const [isshowpickdateend, setShowPickDateEnd] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelect = (index, option) => {
        setRangeDateStart(option.start);
        setRangeDateEnd(option.end);
        setSelectedOption(index);
    };

    const options = [
        {
            start: (thisweek(new Date()))[0],
            end: (thisweek(new Date()))[1],
        },
        {
            start: (thismonth(new Date()))[0],
            end: (thismonth(new Date()))[1],
        },
        {
            start: (thisquy(new Date()))[0],
            end: (thisquy(new Date()))[1],
        },
        {
            start: (thisyear(new Date()))[0],
            end: (thisyear(new Date()))[1],
        },
        {
            start: isOptionDateStart,
            end: isOptionDateEnd,
        }
    ];

    useEffect(() => {
        if (route.params?.group) {
            setGroup(route.params?.group)
        }
        if (route.params?.wallet) {
            setWallet(route.params?.wallet)
            setGroup({ name: 'Chọn nhóm', image: require('../../assets/question.png') })
        }
        if (route.params?.budget) {
            setMoney(route.params.budget.money)
            setRangeDateStart(new Date(route.params.budget.start))
            setRangeDateEnd(new Date(convertFirstDay(new Date(route.params.budget.end))))
            setGroup(route.params.budget.groupId)
            setWallet(route.params.budget.walletId)

            setBudget(route.params.budget)

        }
        navigation.setOptions({
            headerRight: () =>
                <HeaderRight
                    image2={require('../../assets/trash.png')}
                    onPress2={() =>
                        handleDeleBudget(userToken, route.params.budget._id)
                    }
                    disabled2={isDeleting}
                />
        });
    }, [route]);

    function handleDeleBudget(userToken, budgetId) {
        if (userToken == "" || budgetId == '') {
            Alert.alert('Cảnh báo', 'Vui lòng nhập đầy đủ thông tin', [
                { text: 'OK' }
            ]);
            return
        }
        dispatch(myBudgetDele({ token: userToken, id: budgetId, dispatch: dispatch }))
        navigation.goBack()
    }

    function handleChangeBudget(userToken, budgetId, isMoney, groupId, isRangeDateStart, isRangeDateEnd, walletId) {
        if (userToken == "" || budgetId == "" || isMoney == null || groupId == undefined || walletId == undefined) {
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
        dispatch(myBudgetChange({
            token: userToken,
            id: budgetId,
            money: isMoney,
            groupId: groupId,
            startDate: isRangeDateStart,
            endDate: isRangeDateEnd,
            walletId: walletId,
            dispatch: dispatch
        }))
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputs}>

                <Input
                    image={require('../../assets/coins.png')}
                    sizeimg={30}
                    fontsize={30}
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
                        params: { back: 'EditBudgetScreen', group: isGroup, type: 'choose' }
                    })}
                />

                <TitleInput
                    title={convertDate(isRangeDateStart) + ' - ' + convertDate(isRangeDateEnd)}
                    image={require('../../assets/calendar-day.png')}
                    sizeimg={20}
                    fontsize={15}
                    onPress={() => setModalVisible(true)}
                />

                <TitleInput
                    image={{ uri: isWallet.image }}
                    title={isWallet.name}
                    sizeimg={20}
                    fontsize={15}
                    onPress={() => navigation.navigate({
                        name: 'MyWallet',
                        params: { back: 'EditBudgetScreen', wallet: isWallet, type: 'choose' }
                    })}
                />
            </View>

            <Button title={"Sửa"} onPress={() =>
                handleChangeBudget(
                    userToken,
                    isBudget._id,
                    parseFloat(String(isMoney).replace(/,/g, '')),
                    isGroup._id,
                    isRangeDateStart,
                    isRangeDateEnd,
                    isWallet._id
                )
            }
                disabled={isChangeing}
            />

            {isshowpickdatestart && (
                <DateTimePicker
                    timeZoneName="Asia/Bangkok"
                    testID="dateTimePicker"
                    value={isOptionDateStart}
                    mode={'date'}
                    is24Hour={true}
                    themeVariant="dark"
                    minimumDate={isRangeDateStart}
                    onChange={(event, selectedDate) => {
                        const chooseDate = selectedDate;
                        setShowPickDateStart(false);
                        setOptionDateStart(chooseDate);
                    }}
                />
            )}

            {isshowpickdateend && (
                <DateTimePicker
                    timeZoneName="Asia/Bangkok"
                    testID="dateTimePicker"
                    value={isOptionDateEnd}
                    mode={'date'}
                    is24Hour={true}
                    themeVariant="dark"
                    minimumDate={isOptionDateStart}
                    onChange={(event, selectedDate) => {
                        const chooseDate = selectedDate;
                        setShowPickDateEnd(false);
                        setOptionDateEnd(chooseDate);
                    }}
                />
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}
                >
                    <View style={styles.modalView}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Khoảng thời gian</Text>

                        <View style={{ alignItems: 'flex-start', gap: 10 }}>
                            {options.map((option, index) => (
                                <TouchableOpacity key={index} onPress={() => handleSelect(index, option)}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View
                                            style={{
                                                width: 24,
                                                height: 24,
                                                borderRadius: 12,
                                                borderWidth: 2,
                                                borderColor: selectedOption === index ? 'green' : 'gray',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginRight: 8,
                                            }}>
                                            {selectedOption === index && (
                                                <View
                                                    style={{
                                                        width: 16,
                                                        height: 16,
                                                        borderRadius: 8,
                                                        backgroundColor: 'green',
                                                    }}
                                                />
                                            )}
                                        </View>
                                        {
                                            index != 4 ?
                                                <Text style={styles.texts}>{convertDateModal(option.start, option.end)}</Text>
                                                :
                                                <View>
                                                    {selectedOption != index ?
                                                        <Text style={styles.texts}>Tùy chọn</Text>
                                                        :
                                                        <View style={{ flexDirection: 'column', gap: 10, marginTop: 28 }}>
                                                            <Text style={styles.texts} >Tùy chọn</Text>
                                                            <View style={{ flexDirection: 'row', gap: 20, marginLeft: 15 }}>
                                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                    <Text>Từ:  </Text>
                                                                    <Text
                                                                        style={styles.texts}
                                                                        onPress={() => {
                                                                            setShowPickDateStart(true)
                                                                        }}
                                                                    >
                                                                        {convertDate(isOptionDateStart)}
                                                                    </Text>
                                                                    <Image
                                                                        source={Number(require('../../assets/angle-small-right.png'))}
                                                                        style={{
                                                                            width: 15,
                                                                            height: 15,
                                                                            transform: [{ rotate: '90deg' }]
                                                                        }}
                                                                    />
                                                                </View>
                                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                    <Text>Đến:  </Text>
                                                                    <Text
                                                                        style={styles.texts}
                                                                        onPress={() => {
                                                                            setShowPickDateEnd(true)
                                                                        }}
                                                                    >
                                                                        {convertDate(isOptionDateEnd)}
                                                                    </Text>
                                                                    <Image
                                                                        source={Number(require('../../assets/angle-small-right.png'))}
                                                                        style={{
                                                                            width: 15,
                                                                            height: 15,
                                                                            transform: [{ rotate: '90deg' }]
                                                                        }}
                                                                    />
                                                                </View>
                                                            </View>
                                                        </View>
                                                    }
                                                </View>
                                        }
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View
                            style={{
                                gap: 25,
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Button
                                title={'Thoát'}
                                onPress={() => {
                                    setRangeDateStart(new Date())
                                    setRangeDateEnd(new Date())
                                    setSelectedOption(null)
                                    setModalVisible(!modalVisible)
                                }}
                                style={{ width: "45%" }}
                            />
                            <Button
                                title={'Lưu'}
                                onPress={() => {
                                    setModalVisible(!modalVisible)
                                    if (selectedOption == 4) {
                                        setRangeDateStart(isOptionDateStart)
                                        setRangeDateEnd(isOptionDateEnd)
                                    }
                                }}
                                style={{ width: "45%" }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
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
    },
    modalView: {
        width: "100%",
        borderRadius: 25,
        padding: 25,
        gap: 25,
        backgroundColor: 'white',
        alignItems: 'flex-start',
        elevation: 100,
    },
    texts: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})