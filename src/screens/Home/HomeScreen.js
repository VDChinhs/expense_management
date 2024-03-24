import { Text, View, StyleSheet, ScrollView,Image } from "react-native";
import InfoTitle from "../../components/InfoTitle";

values = [
  {name: 'Gia đình', money: 12000000, image: require('../../assets/anuong.png'), date: '23/03/2034'},
  {name: 'Công việc', money: 500000, image: require('../../assets/tienmang.png'), date: '27/03/2024'},
  {name: 'Sở thích', money: -121000000, image: require('../../assets/suckhoe.png'), date: '12/0/2034'},
];

export default function HomeScreen() {
    return (
      <ScrollView>
          <View style = {styles.containersodu}>
            <Text style ={{fontSize:25, fontWeight:'bold'}}>1,000,000,000 đ</Text>
            <Text style ={{fontSize:13, fontWeight:'bold'}}>Tổng số dư</Text>
          </View>

        <View style = {styles.container}>

          <View style = {styles.border}>
            <View style = {styles.containerheader}>
              <Text style = {styles.text}>Ví của tôi</Text>
              <Text style = {styles.text}>Xem tất cả</Text>
            </View>

            <View>
              {values.map(value => (
                  <InfoTitle 
                    width={330}
                    titlel={value.name} 
                    money={value.money} 
                    imageleft={value.image}/>
              ))}
            </View>
          </View>
          
          <View>
            <View style = {styles.containerheader}>
              <Text style = {styles.text}>Báo cáo chi tiêu</Text>
              <Text style = {styles.text}>Xem tất cả</Text>
            </View>

            <View style = {styles.border}>
                <View>
                  <View style = {{margin:15}}>
                    <Text style ={{fontSize:20, fontWeight:'bold'}}>1,000,000,000 đ</Text>
                    <Text style ={{fontSize:12, fontWeight:'bold'}}>Tổng chi tháng này</Text>
                  </View>
                  <View style = {styles.containergraphic}>
                    <Image
                      source={require('../../assets/dollar.png')}
                      style = {{
                        width:200,
                        height:200
                      }}
                    />
                  </View>
                </View>
                <View style = {styles.containerheader}>
                  <Text style = {styles.text}>Chi tiêu nhiều nhất</Text>
                </View> 
                {values.map(value => (
                    <InfoTitle 
                      width={330}
                      titlel={value.name}
                      titles={value.money} 
                      titleright={'94%'} 
                      imageleft={value.image}/>
                ))}
            </View>
          </View>
          
          <View>
            <View style = {styles.containerheader}>
              <Text style = {styles.text}>Giao dịch gần đây</Text>
              <Text style = {styles.text}>Xem tất cả</Text>
            </View>

            <View style = {styles.border}>
              {values.map(value => (
                  <InfoTitle 
                    width={330}
                    titlel={value.name}
                    titles={value.date} 
                    money={value.money} 
                    imageleft={value.image}/>
              ))}
            </View>
          </View>

        </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
      gap:10,
      marginBottom:80
    },
    containersodu:{
      marginTop:40,
      marginBottom:20,
      marginHorizontal:15
    },
    containergraphic:{
      alignItems:'center'
    },
    containerheader:{
      margin: 15,
      marginVertical: 12.5,
      flexDirection:'row',
      justifyContent:"space-between"
    },
    text:{
      fontWeight:'bold'
    },
    border:{
      borderRadius:15,
      backgroundColor:'white'
    }
})