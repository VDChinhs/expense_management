import { Text, View, StyleSheet,Image,TouchableWithoutFeedback } from "react-native";
import { useContext,useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import ButtonSc from "../../components/ButtonSc";
import Button from "../../components/Button";
import InputText from "../../components/InputText";

export function ChangePassWord() {
  const [passwordold, setPasswordOld] = useState('');
  const [passwordnew, setPasswordNew] = useState('');

  return(
    <View style = {styles.containerchangepassword}>
      <InputText 
        label={'Mật khẩu cũ'}
        onChangeText={(text) => setPasswordOld(text)}
        />
      <InputText 
        label={'Mật khẩu mới'}
        onChangeText={(text) => setPasswordNew(text)}
        />
      <Button title={'Thay đổi mật khẩu'}></Button>
    </View>
  )
}

export function DeleAccount() {
  return(
    <View style = {styles.containerdele}>
      <View style = {styles.infodele}>
        <Text style = {{fontSize:20, fontWeight:'bold'}}>Xóa tài khoản sẽ:</Text>
          <Text style = {{fontSize:15, fontWeight:'bold'}}>❌ Không thể khôi phục dữ liệu ban đầu</Text>
          <Text style = {{fontSize:15, fontWeight:'bold'}}>❌ Đăng xuất khỏi tất cả các thiết bị</Text>
          <Text style = {{fontSize:15, fontWeight:'bold'}}>❌ Xóa Toàn bộ thông tin tài khoản</Text>
      </View>
      <Button title={"Xác nhận"}/>
    </View>
  )
}

export default function AccountManagerScreen({ navigation }) {
  const {logout} = useContext(AuthContext);

  return (
    <View style = {styles.container}>
      <TouchableWithoutFeedback >
        <View style = {styles.info_button}>
          <View style ={styles.info}>
            <Image style = {styles.avatar} source={require('../../assets/man.png')}></Image>
            <Text style = {styles.text}>Vu Duc Chinh</Text>
            <Text style = {styles.text}>chinhvu005@huce.edu.vn</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View style = {styles.option}>
        <ButtonSc 
          title={'Thay đổi mật khẩu'} 
          onPress={() => navigation.navigate('ChangePassWord')} 
          image={require('../../assets/replace.png')}/>
        <ButtonSc 
          title={'Xóa tài khoản'} 
          onPress={() => navigation.navigate('DeleAccount')} 
          image={require('../../assets/delete-user.png')}/>
      </View>
      <Button title={"Đăng xuất"} onPress={() => logout()}/>
    </View>
  );
}

const styles = StyleSheet.create({
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
    text:{
      fontWeight:'bold'
    },
    option:{
      marginBottom:300,
    },
    containerchangepassword:{
      alignItems:'center',
      gap:30,
      marginTop:30
    },
    containerdele:{
      marginTop:15,
      alignItems:'center',
      justifyContent:'space-around'
    },
    infodele:{
      width:360,
      paddingLeft:15,
      gap:15,
      paddingBottom:450,
      justifyContent:'flex-start',
    }
})