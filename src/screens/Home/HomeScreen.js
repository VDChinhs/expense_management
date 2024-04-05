import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import InfoTitle from "../../components/InfoTitle";
import SwitchButton from "../../components/SwitchButton";
import { BarChart } from "react-native-chart-kit";
import { useState } from "react";
 
const valuesWallet = [
  {name: 'Gia đình', money: 12000000, image: require('../../assets/anuong.png')},
  {name: 'Công việc', money: 500000, image: require('../../assets/tienmang.png')},
  {name: 'Sở thích', money: -121000000, image: require('../../assets/suckhoe.png')},
];
const valuesTrade = [
  {id: 0, name: 'Xổ số', money: 12000000, image: require('../../assets/anuong.png'), date: '23/03/2034'},
  {id: 1, name: 'Thưởng', money: 500000, image: require('../../assets/tienmang.png'), date: '27/03/2024'},
  {id: 2, name: 'Du lịch', money: -121000000, image: require('../../assets/dulich.png'), date: '12/02/2024'},
];
const dataCharMonth = {
  sum: 3256436235,
  labels: ["Tháng trước", "Tháng này"],
  datasets: [
    {
      data: [300, 100]
    }
  ],
  valuesChiTieu: [
    {name: 'Du lịch', money: 32500, percent: '42%', image: require('../../assets/dulich.png')},
    {name: 'Thời trang', money: 2350000, percent: '62%', image: require('../../assets/thoitrang.png')},
    {name: 'Thú cưng', money: 86300000, percent: '64%', image: require('../../assets/thucung.png')},
  ]
};
const dataCharWeek = {
  sum: 89796446,
  labels: ["Tuần trước", "Tuần này"],
  datasets: [
    {
      data: [0.5, 3.3]
    }
  ],
  valuesChiTieu: [
    {name: 'Quà tặng', money: 15100000, percent: '34%' ,image: require('../../assets/quatang.png')},
    {name: 'Tiền điện', money: 63000, percent: '54%' ,image: require('../../assets/tiendien.png')},
    {name: 'Tiền mạng', money: 6430000, percent: '14%' ,image: require('../../assets/tienmang.png')},
  ]
};

export default function HomeScreen({ navigation }) {
  const [isselecttab, setSelectedTab] = useState(true)
  const [isshowmoney, setShowMoney] = useState(true)
  const [isdatachar, setDataChar] = useState(dataCharMonth)
  const [isValuesWallet, setvaluesWallet] = useState(valuesWallet)
  const [isValuesTrade, setvaluesTrade] = useState(valuesTrade)

  return (
    <ScrollView style = {{
      // backgroundColor: '#F9C4BA'
    }}
    showsVerticalScrollIndicator = {false}
    >
      <View style = {styles.containertop}>
        <View>
          <View style = {styles.containersodu}>
            {isshowmoney ? 
              <Text style ={{fontSize:25, fontWeight:'bold'}}>1,000,000,000 đ</Text>
              :
              <Text style ={{fontSize:25, fontWeight:'bold'}}>********* đ</Text>
            }
            <TouchableOpacity onPress={() => setShowMoney(!isshowmoney)}>
              {isshowmoney ? 
                <Image
                  source={require('../../assets/eye.png')}
                  style = {{width:16, height:16}}
                />
                :
                <Image
                  source={require('../../assets/eye-crossed.png')}
                  style = {{width:16, height:16}}
                />
              }
            </TouchableOpacity>
          </View>
          <Text style ={{fontSize:13, fontWeight:'bold'}}>Tổng số dư</Text>
        </View>
        <TouchableOpacity>
          <Image
            source={require('../../assets/man.png')}
            style = {styles.imageheder}
          />
        </TouchableOpacity>
      </View>
      <View style = {styles.container}>
        <View style = {styles.border}>
          <View style = {styles.containerheader}>
            <Text style = {styles.text}>Ví của tôi</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('MyWallet')}
            >
              <Text style = {styles.text}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <View style = {{alignItems:'center'}}>
            {isValuesWallet.map(value => (
              <InfoTitle 
                key={value.name}
                width={'92%'}
                titlel={value.name} 
                money={value.money} 
                imageleft={value.image}
                onPress={() => navigation.jumpTo('Trade')}
              />
            ))}
          </View>
        </View>
        
        <View>
          <View style = {styles.containerheader}>
            <Text style = {styles.text}>Báo cáo chi tiêu</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('ReportScreen')}
            >
              <Text style = {styles.text}>Xem báo cáo</Text>
            </TouchableOpacity>
          </View>
          <View style = {styles.border}>
              <View style = {{
                  alignItems:'center',
                  marginTop:20
                }}>
                  <SwitchButton
                    titlel={'Tuần'}
                    titler={'Tháng'}
                    onPressl={() => {
                      setDataChar(dataCharWeek)
                      setSelectedTab(false)}}
                    onPressr={() => {
                      setDataChar(dataCharMonth)
                      setSelectedTab(true)}}
                    value={isselecttab}
                  > 
                  </SwitchButton>
              </View>
              <View>
                <View style = {{margin:15}}>
                  <Text style ={{fontSize:20, fontWeight:'bold'}}>{isdatachar.sum.toLocaleString()} đ</Text>
                  {isselecttab ? 
                    <Text style ={{fontSize:12, fontWeight:'bold'}}>Tổng chi tháng này</Text>
                    :
                    <Text style ={{fontSize:12, fontWeight:'bold'}}>Tổng chi tuần này</Text>
                  }
                </View>
                <View style = {styles.containergraphic}>
                    <BarChart
                        data={isdatachar}
                        width={300}
                        height={220}
                        yAxisSuffix=" Tr"
                        fromZero = {true}
                        withInnerLines = {false}
                        showValuesOnTopOfBars = {true}
                        chartConfig={{
                            decimalPlaces: 1,
                            barRadius:5,
                            backgroundGradientFrom: "white",
                            backgroundGradientTo: "white",
                            color: () => 'black',
                            labelColor: () => 'black',                        
                        }}
                    />
                </View>
              </View>
              <View style = {styles.containerheader}>
                <Text style = {styles.text}>Chi tiêu nhiều nhất</Text>
              </View>
              <View style = {{alignItems:'center'}}>
                {isdatachar.valuesChiTieu.map(value => (
                  <InfoTitle 
                    key={value.name}
                    width={'92%'}
                    titlel={value.name}
                    titles={value.money} 
                    titleright={value.percent} 
                    imageleft={value.image}
                  />
                ))}
              </View>
          </View>
        </View>
        
        <View>
          <View style = {styles.containerheader}>
            <Text style = {styles.text}>Giao dịch gần đây</Text>
            <TouchableOpacity
              onPress={() => navigation.jumpTo('Trade')}
            >
              <Text style = {styles.text}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <View style = {styles.border}>
            <View style = {{alignItems:'center'}}>
              {isValuesTrade.map((value, fIndex) => (
                <InfoTitle 
                  key={fIndex}
                  width={'92%'}
                  titlel={value.name}
                  titles={value.date} 
                  money={value.money} 
                  imageleft={value.image}
                />
              ))}
            </View>
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
      gap: 10,
      marginBottom: 80
    },
    containertop:{
      marginTop: 45,
      marginBottom: 20,
      marginHorizontal: '5%',
      flexDirection:'row',
      justifyContent:'space-between'
    },
    containersodu:{
      flexDirection:'row',
      alignItems:'center',
      gap:10
    },
    imageheder:{
      width:35,
      height:35
    },
    containergraphic:{
      alignItems:'center'
    },
    containerheader:{
      margin: '5%',
      marginVertical: 12.5,
      flexDirection:'row',
      justifyContent:"space-between"
    },
    text:{
      fontWeight: 'bold'
    },
    border:{
      borderRadius: 15,
      backgroundColor:'white'
    }
})