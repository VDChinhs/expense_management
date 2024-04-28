import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import InfoTitle from "../../components/InfoTitle";
import SwitchButton from "../../components/SwitchButton";
import { BarChart } from "react-native-chart-kit";
import { useState, useContext, useEffect, useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";
import { tradeRecent, mostTradeMonth, mostTradeWeek } from "../../process/TradeController";
import { myWallet } from "../../process/WalletController";
import { getFullDate } from "../../process/Date";
 
// const valuesWallet = [
//   {name: 'Gia đình', money: 12000000, image: require('../../assets/anuong.png')},
//   {name: 'Công việc', money: 500000, image: require('../../assets/tienmang.png')},
//   {name: 'Sở thích', money: -121000000, image: require('../../assets/suckhoe.png')},
// ];
// const valuesTrade = [
//   {name: 'Xổ số', money: 12000000, image: require('../../assets/anuong.png'), date: '23/03/2034'},
//   {name: 'Thưởng', money: 500000, image: require('../../assets/tienmang.png'), date: '27/03/2024'},
//   {name: 'Du lịch', money: -121000000, image: require('../../assets/dulich.png'), date: '12/02/2024'},
// ];
// const dataCharMonth = {
//   sum: 3256436235,
//   labels: ["Tháng trước", "Tháng này"],
//   datasets: [
//     {
//       data: [300, 1000]
//     }
//   ],
//   valuesChiTieu: [
//     {group: {image: require('../../assets/dulich.png'), name: 'Du lịch'}, money: 32500, percent: '42%'},
//     {group: {name: 'Thời trang', image: require('../../assets/thoitrang.png')}, money: 2350000, percent: '62%'},
//     {group: {name: 'Thú cưng', image: require('../../assets/thucung.png')}, money: 86300000, percent: '64%'},
//   ]
// };
// const dataCharWeek = {
//   sum: 89796446,
//   labels: ["Tuần trước", "Tuần này"],
//   datasets: [
//     {
//       data: [0.5, 3.3]
//     }
//   ],
//   valuesChiTieu: [
//     {group:{name: 'Quà tặng', image: require('../../assets/quatang.png')}, money: 15100000, percent: '34%'},
//     {group:{name: 'Tiền điện', image: require('../../assets/tiendien.png')}, money: 63000, percent: '54%'},
//     {group:{name: 'Tiền mạng', image: require('../../assets/tienmang.png')}, money: 6430000, percent: '14%'},
//   ]
// };

export default function HomeScreen({ navigation }) {
    const [isselecttab, setSelectedTab] = useState(true)
    const [isshowmoney, setShowMoney] = useState(true)

    const [isDataCharMonth, setDataCharMonth] = useState(null)
    const [isDataCharWeek, setDataCharWeek] = useState(null)
    const [isDataChar, setDataChar] = useState(null)

    const [isValuesWallet, setvaluesWallet] = useState(null)
    const [isValuesTrade, setvaluesTrade] = useState(null)

    const {userToken, setWalleting} = useContext(AuthContext);
    const [isLoading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    async function getData() {
        let current = new Date()
        let _myWallet = await myWallet(userToken)
        let _mostTradeMonth = await mostTradeMonth(userToken, current.getMonth() + 1)
        let _mostTradeWeek = await mostTradeWeek(userToken)
        let _tradeRecent = await tradeRecent(userToken)

        setDataCharMonth(_mostTradeMonth.data)
        setDataCharWeek(_mostTradeWeek.data)
        
        setvaluesWallet(_myWallet)
        setDataChar(_mostTradeMonth.data)
        setvaluesTrade(_tradeRecent.data)
        setLoading(false)
    
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getData()
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    });
      
    useEffect(() => {
        getData()
    }, [navigation]);

  return (
    <View>
        {isLoading ?
            <View style = {{height: 750, justifyContent:'center', alignContent:'center'}}>
                <ActivityIndicator color={'balck'} size={'large'}/>
            </View>
            :
            <ScrollView style = {{
            // backgroundColor: '#F9C4BA'
                }}
                showsVerticalScrollIndicator = {false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style = {styles.containertop}>
                    <View>
                        <View style = {styles.containersodu}>
                            {isshowmoney ? 
                                <Text style ={{fontSize:25, fontWeight:'bold'}}>
                                    {isValuesWallet.reduce((acc, item) => acc + item.money, 0).toLocaleString()} đ
                                </Text>
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
                    <TouchableOpacity
                        onPress={() => navigation.jumpTo('Account')}
                    >
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
                            {isValuesWallet.slice(0,3).map((value, fIndex) => (
                                <InfoTitle 
                                    key={fIndex}
                                    width={'92%'}
                                    titlel={value.name} 
                                    money={value.money} 
                                    imageleft={{uri: value.image}}
                                    onPress={() => {
                                        setWalleting(value)
                                        navigation.jumpTo('Trade')
                                    }}
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
                                        setDataChar(isDataCharWeek)
                                        setSelectedTab(false)
                                    }}
                                    onPressr={() => {
                                        setDataChar(isDataCharMonth)
                                        setSelectedTab(true)
                                    }}
                                    value={isselecttab}
                                > 
                                </SwitchButton>
                            </View>
                            <View>
                                <View style = {{margin:15}}>
                                <Text style ={{fontSize:20, fontWeight:'bold'}}>
                                    {isDataChar.sum.toLocaleString()} đ
                                </Text>
                                {isselecttab ? 
                                    <Text style ={{fontSize:12, fontWeight:'bold'}}>Tổng chi tháng này</Text>
                                    :
                                    <Text style ={{fontSize:12, fontWeight:'bold'}}>Tổng chi tuần này</Text>
                                }
                                </View>
                                <View style = {styles.containergraphic}>
                                    <BarChart
                                        data={isDataChar}
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
                                {isDataChar.valuesChiTieu.length == 0 ? 
                                    <View style = {{width:'92%', padding: 50, alignItems: 'center'}}>
                                        <Text style = {styles.text}>Không có dữ liệu</Text>
                                    </View>
                                    :
                                    <View>
                                        {isDataChar.valuesChiTieu.map((value, fIndex) => (
                                            <InfoTitle 
                                                key={fIndex}
                                                width={'92%'}
                                                titlel={value.group.name}
                                                titles={value.money} 
                                                titleright={value.percent} 
                                                imageleft={{uri: value.group.image}}
                                                imageleftsmall={{uri: value.wallet.image}}
                                            />
                                        ))}
                                    </View>
                                }
                            </View>
                        </View>
                    </View>
                    
                    <View style = {{width: '92%'}}>
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
                                {isValuesTrade.length == 0 ? 
                                    <View style = {{padding: 50, alignItems: 'center'}}>
                                        <Text style = {styles.text}>Không có dữ liệu</Text>
                                    </View>
                                :
                                    <View>
                                        {isValuesTrade.map((value, fIndex) => (
                                            <InfoTitle 
                                                key={fIndex}
                                                width={'92%'}
                                                titlel={value.groupId.name}
                                                titles={getFullDate(value.date)} 
                                                money={value.money} 
                                                imageleft={{uri: value.groupId.image}}
                                                imageleftsmall={{uri: value.walletId.image}}
                                                onPress={() => navigation.navigate({
                                                    name:'EditTradeScreen',
                                                    params: {trade: value }
                                                })}
                                            />
                                        ))}
                                    </View>
                                }
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        }
    </View>
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