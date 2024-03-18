import { Text, View, StyleSheet,Image,TouchableWithoutFeedback } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ButtonSc from "../../components/ButtonSc";
import Button from "../../components/Button";

export default function AccountManagerScreen() {
  const {logout} = useContext(AuthContext);

    return (
      <View style = {style.container}>
        <TouchableWithoutFeedback >
          <View style = {style.info_button}>
            <View style ={style.info}>
              <Image style = {style.avatar} source={require('../../assets/dollar.png')}></Image>
              <Text>Vu Duc Chinh</Text>
              <Text>chinhvu005@huce.edu.vn</Text>
            </View>
          </View>
          
        </TouchableWithoutFeedback>
        <View style = {style.option}>
          <ButtonSc title={'Thay đổi mật khẩu'}/>
          <ButtonSc title={'Xóa tài khoản'}/>
        </View>
        <Button title={"Đăng xuất"} onPress={() => logout()}/>
      </View>
    );
}

const style = StyleSheet.create({
    container:{
      alignItems: 'center'
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
    },
    option:{
        marginBottom:300,
    }
})