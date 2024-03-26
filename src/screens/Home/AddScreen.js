import { View, StyleSheet, TextInput, Image, TouchableWithoutFeedback } from "react-native";
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

const convertDate = (date) => {
  // var day = date.getDay() + 1;
  // var date = date.getDate();
  // var month = date.getMonth() + 1;
  // var year = date.getFullYear();

  // time = 'Thứ ' + day + ', ' + date + '/' + month + '/' + year
  var time = date.toLocaleString()
  return time
}

export default function AddScreen({ navigation, route }) {
  const [postMoney, setMoney] = useState(null);
  const [postGroup, setGroup] = useState('');
  const [postNote, setNote] = useState('');
  const [postDate, setDate] = useState(new Date());
  const [postWallet, setWallet] = useState('Học tập');

  const [show, setShow] = useState(false);

  useEffect(() => {   
    if (route.params?.namegroup) {
      setGroup(route.params?.namegroup)
    }
    if (route.params?.note) {
      setNote(route.params?.note)
    }
    if (route.params?.namewallet) {
      setWallet(route.params?.namewallet)
    }
  });

  return (
    <View style = {styles.container}>
      <View style = {styles.inputs}>

        <Input 
          image={require('../../assets/coins.png')} 
          sizeimg={30} 
          label={"0"} 
          fontsize={30} 
          autoFocus={true}
          keyboardType="number-pad"
          onChangeText = {(text) => setMoney(text)}
        />

        <Input 
          image={require('../../assets/wallet.png')} 
          sizeimg={30} 
          label={"Chọn nhóm"} 
          fontsize={20}
          value ={postGroup}
          onPressIn={() => navigation.navigate({
              name:'ChooseGroup',
              params: { group: postGroup, type:'choose' }
            })}
        />

        <Input 
          image={require('../../assets/align-left.png')} 
          sizeimg={20} 
          label={"Ghi chú"} 
          fontsize={15}
          value = {postNote}
          onPressIn={() => navigation.navigate({
            name:'AddNote',
            params: { note: postNote }
          })}
        />

        <Input 
          image={require('../../assets/calendar-day.png')} 
          sizeimg={20} 
          label={"Hôm nay"} 
          fontsize={15}
          onPressIn={() => setShow(true)}
          value = {convertDate(postDate)}
        />

        <Input 
          image={require('../../assets/wallet.png')} 
          sizeimg={20} 
          value ={postWallet}
          fontsize={15}
          onPressIn={() => navigation.navigate({
            name:'MyWallet',
            params: { wallet: postWallet, type:'choose' }
          })}
        />

      </View>

      <Button title={"Lưu"}></Button>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={postDate}
          mode={'date'}
          is24Hour={true}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate;
            setShow(false);
            setDate(currentDate);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        gap:350
    },
    inputs:{
      // borderRadius:25,
      backgroundColor:'white',
      gap:-15,
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
      width:270,
      fontWeight: 'bold',
    },
})