import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity, Modal } from "react-native";
import Button from "../../components/Button";
import { useState, useEffect } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { thisweek, thismonth, thisquy, thisyear } from "../../process/Date";

function Input({ image, sizeimg, fontsize, label, ...prop }) {
    return (
        <View style = {[styles.inputcontainer, {gap: 55 - sizeimg}]}>
        <Image
            source={image}
            style = {{
            width: sizeimg,
            height: sizeimg,
            }}
        />
        <TextInput
            style={[styles.input, {fontSize: fontsize}]}
            placeholder={label}
            {...prop}
            
        />
        </View>
    );
}

function TitleInput ({ image, sizeimg, fontsize, title, onPress}){
    return (
        <TouchableOpacity 
            style = {[styles.containertitle, {gap: 55 - sizeimg}]} 
            onPress={onPress}>
            <Image
                source={image}
                style = {{
                width: sizeimg,
                height: sizeimg,
                }}
            />
            <Text style = {{
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

    if (dateend - datestart == 6) {
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


function handlerAddBudget(money, group, datestart, dateend, wallet) {
    data = {
        money: money,
        group: group,
        datestart: convertDate(datestart),
        dateend: convertDate(dateend),
        wallet: wallet
    }
    console.log(data);
}

export default function AddBudget({ navigation, route }) {
    const [isMoney, setMoney] = useState(null);
    const [isGroup, setGroup] = useState('Chọn nhóm');
    const [isImageGroup, setImageGroup] = useState(require('../../assets/question.png'));
    const [isRangeDateStart, setRangeDateStart] = useState(new Date());
    const [isRangeDateEnd, setRangeDateEnd] = useState(new Date());
    const [isWallet, setWallet] = useState('Học tập');
    const [isImageWallet, setImageWallet] = useState(require('../../assets/wallet.png'));

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
        if (route.params?.namegroup) {
        setGroup(route.params?.namegroup)
        setImageGroup(route.params?.imagegroup)
        }
        if (route.params?.namewallet) {
        setWallet(route.params?.namewallet)
        setImageWallet(route.params?.imagewallet)
        }
    });

    return (
        <View style = {styles.container}>
            <View style = {styles.inputs}>

                <Input 
                    label ={"0"} 
                    image = {require('../../assets/coins.png')} 
                    sizeimg = {30} 
                    fontsize = {30} 
                    autoFocus = {true}
                    keyboardType = "number-pad"
                    onChangeText = {(money) => {
                        setMoney(parseFloat(money.replace(/,/g, '')))
                    }}
                    value = {isMoney && isMoney.toLocaleString()}
                />
                
                <TitleInput 
                    title = {isGroup} 
                    image = {isImageGroup} 
                    sizeimg = {30} 
                    fontsize = {20}
                    onPress = {() => navigation.navigate({
                        name:'ChooseGroup',
                        params: {back:'AddBudget', group: isGroup, type:'choose'}
                    })}
                />

                <TitleInput 
                    title = {convertDate(isRangeDateStart) + ' - ' + convertDate(isRangeDateEnd)} 
                    image = {require('../../assets/calendar-day.png')} 
                    sizeimg = {20} 
                    fontsize = {15}
                    onPress = {() => setModalVisible(true)}
                    //   onPress = {() => navigation.navigate('RangeDayBudgetScreen')}
                />

                <TitleInput 
                    image = {isImageWallet} 
                    title ={isWallet}
                    sizeimg = {20} 
                    fontsize = {15}
                    onPress = {() => navigation.navigate({
                        name:'MyWallet',
                        params: {back:'AddBudget', wallet: isWallet, type:'choose' }
                    })}
                />
            </View>

            <Button title={"Lưu"} onPress={() => 
                handlerAddBudget(isMoney, isGroup, isRangeDateStart, isRangeDateEnd, isWallet)}>
            </Button>

            {isshowpickdatestart && (
                <DateTimePicker
                    timeZoneName="Asia/Bangkok"
                    testID = "dateTimePicker"
                    value = {isOptionDateStart}
                    mode = {'date'}
                    is24Hour ={true}
                    themeVariant="dark"
                    onChange = {(event, selectedDate) => {
                        const chooseDate = selectedDate;
                        setShowPickDateStart(false);
                        setOptionDateStart(chooseDate);
                    }}
                />
            )}

            {isshowpickdateend && (
                <DateTimePicker
                    timeZoneName="Asia/Bangkok"
                    testID = "dateTimePicker"
                    value = {isOptionDateEnd}
                    mode = {'date'}
                    is24Hour ={true}
                    themeVariant="dark"
                    onChange = {(event, selectedDate) => {
                        const chooseDate = selectedDate;
                        setShowPickDateEnd(false);
                        setOptionDateEnd(chooseDate);
                    }}
                />
            )}
            
            <Modal
                animationType= "slide"
                transparent= {true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View 
                    style = {{
                        flex:1,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}
                >
                    <View style={styles.modalView}>
                        <Text style={{fontSize:20, fontWeight: 'bold'}}>Khoảng thời gian</Text>

                        <View style = {{ alignItems:'flex-start', gap: 10 }}>
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
                                            <Text style = {styles.texts}>{convertDateModal(option.start, option.end)}</Text>
                                        :
                                            <View>
                                                {selectedOption != index ? 
                                                    <Text style = {styles.texts}>Tùy chọn</Text>
                                                    :
                                                    <View style = {{flexDirection:'row'}}>
                                                        <Text style = {styles.texts} >Tùy chọn</Text>

                                                        <Text 
                                                            style = {styles.texts} 
                                                            onPress={() => {
                                                                setShowPickDateStart(true)
                                                            }}
                                                        >
                                                            {' (' + convertDate(isOptionDateStart) + ' - '}
                                                        </Text>
                                                        <Text 
                                                            style = {styles.texts} 
                                                            onPress={() => {
                                                                setShowPickDateEnd(true)
                                                            }}
                                                        >
                                                            {convertDate(isOptionDateEnd) + ')'}
                                                        </Text>
                                                    </View>
                                                }
                                            </View>
                                        }
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View 
                            style = {{
                                gap: 25,
                                width:'100%',
                                flexDirection: 'row',
                                justifyContent:'space-between',
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
                                style={{width:"45%"}}
                            />
                                <Button
                                title={'Lưu'}
                                onPress={() => {
                                    setModalVisible(!modalVisible)
                                    if(selectedOption == 4){
                                        setRangeDateStart(isOptionDateStart)
                                        setRangeDateEnd(isOptionDateEnd)
                                    }
                                }}
                                style={{width:"45%"}}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        gap:300
    },
    containertitle:{
        flexDirection:'row',
        paddingLeft: 15,
        padding: 15,
        alignItems:'center',
    },
    inputs:{
        width:'100%',
        backgroundColor:'white',
        gap:-10,
        marginTop: 20,
    },
    inputcontainer:{
        width:360,
        justifyContent:'flex-start',
        flexDirection:'row',
        paddingLeft: 15,
        padding:15,
    },
    input: {
        width:'83%',
        fontWeight: 'bold',
    },
    modalView: {
        width: "100%",
        borderRadius: 25,
        padding: 25,
        gap:20,
        backgroundColor: 'white',
        alignItems: 'flex-start',
        elevation: 100,
    },
    texts:{
        fontSize:16,
        fontWeight: 'bold'
    }
})