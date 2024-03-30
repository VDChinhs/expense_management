import { Text, View, StyleSheet,Image,TouchableWithoutFeedback } from "react-native";
import ButtonSc from "../../components/ButtonSc";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AccountScreen({ navigation }) {
  const {logout} = useContext(AuthContext);

    return (
      <View style = {styles.container}>
        <TouchableWithoutFeedback onPress={() => navigation.push('AccMaScreen')}>
          <View style = {styles.info_button}>
            <View style ={styles.info}>
              <Image style = {styles.avatar} source={require('../../assets/man.png')}></Image>
              <Text style = {styles.text}>Vu Duc Chinh</Text>
              <Text style = {styles.text}>chinhvu005@huce.edu.vn</Text>
            </View>
            <Image style = {styles.buttonright} source={require('../../assets/angle-small-right.png')}></Image>
          </View>
          
        </TouchableWithoutFeedback>
        <View style = {{gap: 1}}>
          <ButtonSc title={'Ví của tôi'} onPress={() => navigation.navigate('MyWallet')} image={require('../../assets/wallet.png')}/>
          <ButtonSc title={'Nhóm'} onPress={() => navigation.navigate('ChooseGroup')} image={require('../../assets/box-open-full.png')}/>
          <ButtonSc title={'Hỗ trợ'} image={require('../../assets/user-headset.png')}/>
          <ButtonSc title={'Cài đặt'} image={require('../../assets/settings.png')}/>
          <ButtonSc title={'Giới thiệu'} image={require('../../assets/book-open-cover.png')}/>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
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
    },
    text:{
      fontWeight:'bold'
    }
})