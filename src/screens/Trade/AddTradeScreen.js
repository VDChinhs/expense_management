import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity } from "react-native";
import Button from "../../components/Button";
import { useState, useEffect, useContext } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { addTrade } from "../../process/TradeController";
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

export default function AddTradeScreen({ navigation, route }) {
    const { userToken, isWalleting, setWalleting } = useContext(AuthContext); 

    const [isMoney, setMoney] = useState(null);
    const [isGroup, setGroup] = useState({name: 'Chọn nhóm', image: require('../../assets/question.png')});
    const [isNote, setNote] = useState('');
    const [isDate, setDate] = useState(new Date());
    const [isWallet, setWallet] = useState(isWalleting);

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
    },[route]);

    return (
        <View style = {styles.container}>
            <View style = {styles.inputs}>
                <Input 
                    label ={"0"} 
                    image = {Number(require('../../assets/coins.png'))} 
                    sizeimg = {30} 
                    fontsize = {30} 
                    autoFocus = {true}
                    keyboardType = "number-pad"
                    onChangeText = {(money) => {
                        // setMoney(parseFloat(money.replace(/,/g, '')))
                        if (!money.startsWith('0')){
                            setMoney(money)
                        }
                    }}
                    value = {isMoney && isMoney.toLocaleString()}
                />
            
            <TitleInput 
                title = {isGroup.name} 
                image = {(typeof isGroup.image) == 'number' ? Number(isGroup.image) : {uri: isGroup.image}} 
                sizeimg = {30} 
                fontsize = {20}
                onPress = {() => navigation.navigate({
                    name:'ChooseGroup',
                    params: {back: 'AddTrade', group: isGroup, type:'choose' }
                })}
            />

            <Input 
                label ={"Ghi chú"} 
                image = {Number(require('../../assets/align-left.png'))} 
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
                title ={isWallet.name}
                image = {(typeof isWallet.image) == 'number' ? Number(isWallet.image) : {uri: isWallet.image}} 
                sizeimg = {20} 
                fontsize = {15}
                onPress = {() => navigation.navigate({
                    name:'MyWallet',
                    params: {back: 'AddTrade', wallet: isWallet, type:'choose' }
                })}
            />

        </View>
        
            <Button title={"Lưu"} onPress={async () => {
                    if(await addTrade(userToken, isMoney, isGroup._id, isNote, isDate, isWallet._id)){
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