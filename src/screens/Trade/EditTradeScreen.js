import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity } from "react-native";
import Button from "../../components/Button";
import { useState, useEffect, useContext } from "react";
import HeaderRight from "../../components/HeaderRight";
import DateTimePicker from '@react-native-community/datetimepicker';
import { changeTrade, deleTrade } from "../../process/TradeController";
import { AuthContext } from "../../context/AuthContext";

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

const convertDate = (chooseDate) => {
  var currentDate = new Date()
  if (chooseDate.getDate() - currentDate.getDate() == -1) {
    return "Hôm qua"
  } else if (chooseDate.getDate() - currentDate.getDate() == 1) {
    return "Ngày mai"
  } else if (chooseDate.getDate() - currentDate.getDate() == 0) {
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
    const { userToken, isWalleting, setWalleting } = useContext(AuthContext); 

    const [isMoney, setMoney] = useState();
    const [isGroup, setGroup] = useState({name: null, image: null});
    const [isNote, setNote] = useState('');
    const [isDate, setDate] = useState(new Date());
    const [isWallet, setWallet] = useState({name: null, image: null});

    const [isTrade, setTrade] = useState(null);

    const [isshowpickdate, setShowPickDate] = useState(false);

    useEffect(() => {   
        if (route.params?.group) {
            setGroup(route.params?.group)
        }
        if (route.params?.note) {
            setNote(route.params?.note)
        }
        if (route.params?.wallet) {
            setWallet(route.params?.wallet)
            setWalleting(route.params?.wallet)
            setGroup({name: 'Chọn nhóm', image: require('../../assets/question.png')})
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
                    onPress2={async () => {
                        if(await deleTrade(userToken, isTrade._id)){
                            navigation.goBack()
                        }
                    }}
                    image2={require('../../assets/trash.png')}
                />  
        });
    },[route]);  

    return (
        <View style = {styles.container}>
            <View style = {styles.inputs}>
                <Input 
                    value = {String(isMoney)}
                    image = {require('../../assets/coins.png')} 
                    sizeimg = {30} 
                    fontsize = {30} 
                    autoFocus = {true}
                    keyboardType = "number-pad"
                    onChangeText = {(money) => {
                        if (!money.startsWith('0')){
                            setMoney(money)
                        }
                    }}
                />
                
                <TitleInput 
                    title = {isGroup.name} 
                    image = {{uri: isGroup.image}} 
                    sizeimg = {30} 
                    fontsize = {20}
                    onPress = {() => navigation.navigate({
                        name:'ChooseGroup',
                        params: {back: 'EditTradeScreen', group: isGroup, type:'choose' }
                    })}
                />

                <Input 
                    label ={"Ghi chú"} 
                    image = {require('../../assets/align-left.png')} 
                    sizeimg = {20} 
                    fontsize = {15}
                    onChangeText = {(value) => setNote(value)}
                />

                <TitleInput 
                    title = {convertDate(isDate)} 
                    image = {require('../../assets/calendar-day.png')} 
                    sizeimg = {20} 
                    fontsize = {15}
                    onPress = {() => setShowPickDate(true)}
                />

                <TitleInput 
                    image = {{uri: isWallet.image}} 
                    title ={isWallet.name}
                    sizeimg = {20} 
                    fontsize = {15}
                    onPress = {() => navigation.navigate({
                        name:'MyWallet',
                        params: {back: 'EditTradeScreen', wallet: isWallet, type:'choose' }
                    })}
                />

            </View>

            <Button title={"Sửa"} onPress={async () => {
                    if(await changeTrade(userToken, 
                        isTrade._id, 
                        isMoney, 
                        isGroup._id, 
                        isNote, 
                        isDate, 
                        isWallet._id)
                    ){
                        navigation.goBack()
                    }
                }}
            />

            {isshowpickdate && (
                <DateTimePicker
                testID = "dateTimePicker"
                value = {isDate}
                mode = {'date'}
                is24Hour ={true}
                timeZoneName="Asia/Bangkok"
                onChange = {(event, selectedDate) => {
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
      // backgroundColor:'red'
    },
})