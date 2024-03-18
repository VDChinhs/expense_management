import { Text, View, StyleSheet,Image,TouchableWithoutFeedback } from "react-native";
import ButtonSc from "../../components/ButtonSc";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AccountScreen({ navigation }) {
  const {logout} = useContext(AuthContext);

    return (
      <View style = {style.container}>
        <TouchableWithoutFeedback onPress={() => navigation.push('AccMaScreen')}>
          <View style = {style.info_button}>
            <View style ={style.info}>
              <Image style = {style.avatar} source={require('../../assets/dollar.png')}></Image>
              <Text>Vu Duc Chinh</Text>
              <Text>chinhvu005@huce.edu.vn</Text>
            </View>
            <Image style = {style.buttonright} source={require('../../assets/angle-small-right.png')}></Image>
          </View>
          
        </TouchableWithoutFeedback>
        <View>
          <ButtonSc title={'Ví của tôi'}/>
          <ButtonSc title={'Nhóm'}/>
          <ButtonSc title={'Hỗ trợ'}/>
          <ButtonSc title={'Cài đặt'}/>
          <ButtonSc title={'Giới thiệu'}/>
        </View>
      </View>
    );
}

const style = StyleSheet.create({
    container:{
      // flex: 1,
      // justifyContent: 'center',
      // alignItems: 'center'
    },
    info_button:{
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'row',
      marginBottom:20,
      marginTop:20,
      gap:-31,
    },
    info:{
      alignItems:'center',
      width:328
    },
    avatar:{
      width:100,
      height:100,
      marginBottom:10
    },
    buttonright:{
      width:24,
      height:24
  }
})