import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity } from "react-native";
import Button from "../../components/Button";
import { useState,useEffect } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';


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

function handlerAddTrade(money, group, note, date, wallet) {
  data = {
    money: money,
    group: group,
    note: note,
    date: date,
    wallet: wallet
  }
  console.log(data);
}

export default function AddTradeScreen({ navigation, route }) {
  const [isMoney, setMoney] = useState(null);
  const [isGroup, setGroup] = useState('Chọn nhóm');
  const [isImageGroup, setImageGroup] = useState(require('../../assets/question.png'));
  const [isNote, setNote] = useState('');
  const [isDate, setDate] = useState(new Date());
  const [isWallet, setWallet] = useState('Học tập');
  const [isImageWallet, setImageWallet] = useState(require('../../assets/wallet.png'));

  const [isshowpickdate, setShowPickDate] = useState(false);

  useEffect(() => {   
    if (route.params?.namegroup) {
      setGroup(route.params?.namegroup)
      setImageGroup(route.params?.imagegroup)
    }
    if (route.params?.note) {
      setNote(route.params?.note)
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
            params: {back: 'AddTrade', group: isGroup, type:'choose' }
          })}
        />

        <Input 
          label ={"Ghi chú"} 
          image = {require('../../assets/align-left.png')} 
          sizeimg = {20} 
          fontsize = {15}
          onChangeText = {(value) => setNote(value)}
          // value = {isNote}
          // onPressIn={() => navigation.navigate({
          //   name:'AddNote',
          //   params: { note: isNote }
          // })}
        />

        <TitleInput 
          title = {convertDate(isDate)} 
          image = {require('../../assets/calendar-day.png')} 
          sizeimg = {20} 
          fontsize = {15}
          onPress = {() => setShowPickDate(true)}
        />

        <TitleInput 
          image = {isImageWallet} 
          title ={isWallet}
          sizeimg = {20} 
          fontsize = {15}
          onPress = {() => navigation.navigate({
            name:'MyWallet',
            params: {back: 'AddTrade', wallet: isWallet, type:'choose' }
          })}
        />

      </View>

      <Button title={"Lưu"} onPress={() => 
          handlerAddTrade(isMoney, isGroup, isNote, isDate, isWallet)}>
        </Button>

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