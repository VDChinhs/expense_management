import { Text, View, StyleSheet, Image } from "react-native";
import Button from "../../components/Button";

export default function BudgetScreen({ navigation }) {
    return (
      <View style = {styles.container}>
        <Image
          style = {styles.image}
          source={require('../../assets/dollar.png')}
        />
        <View style = {styles.textinfo}>
          <Text style = {styles.textbold}>Bạn chưa có ngân sách</Text>
          <Text style = {{textAlign: 'center'}}>Bắt đầu tiết kiệm bằng cách tạo ngân sách và chúng tôi sẽ giúp bạn kiểm soát ngân sách</Text>
        </View>
        <Button 
          title={"Tạo ngân sách"}
          onPress={() => navigation.navigate("AddBudget")}
        />
      </View>
    );
}

const styles = StyleSheet.create({
    container:{
        top:100,
        alignItems: 'center',
        gap:20
    },
    image:{
      width:150,
      height:150
    },
    textinfo:{
      gap:5,
      width:300,
      alignItems:'center',
    },
    textbold:{
      fontWeight:'bold',
      fontSize:15
    }
})