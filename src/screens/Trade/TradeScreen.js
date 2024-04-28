import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView, Dimensions, RefreshControl, ActivityIndicator } from "react-native";
import { useState, useRef, useEffect, useContext, useCallback } from "react";
import Button from "../../components/Button";
import InfoTitle from "../../components/InfoTitle";
import { getDate, getDay, getWeekMonth } from "../../process/Date";
import { tradeMonths } from "../../process/TradeController";
import { AuthContext } from "../../context/AuthContext";

const data = [
    {
        title:"mm/yyyy",
        data:[]
    },
    {
        title:"mm/yyyy",
        data:[]
    },
    {
        title:"mm/yyyy",
        data:[]
    },
    {
        title:"mm/yyyy",
        data:[]
    },
    {
        title:"Tháng trước",
        data:[]
    },
    {
        title:"Tháng này",
        data:[]
    },
    {
        title:"Tương lai",
        data:[]
    },
]

// const data = [
//     {
//         title: "12/2023",
//         moneyin: 36434625,
//         moneyout: 12431525,
//         data:[
//             {
//                 date: '2024-4-23',
//                 detail:[
//                     {
//                         money: 354757,
//                         groupId:{
//                             name: 'Du lịch',
//                             image: require('../../assets/dulich.png')
//                         }
//                     },
//                     {
//                         money: -65846,
//                         groupId:{
//                             name: 'Ăn uống',
//                             image: require('../../assets/anuong.png')
//                         }
//                     }, 
//                     {
//                         money: 23354,
//                         groupId:{
//                             name: 'Tiền mạng',
//                             image: require('../../assets/tienmang.png')
//                         }
//                     },
//                 ]
//             },
//             {
//                 date:'2024-4-24',
//                 detail:[
//                     {
//                         money:-780546,
//                         groupId:{
//                             name: 'Quà tặng',
//                             image: require('../../assets/quatang.png')
//                         }
//                     },
//                     {
//                         money:5472,
//                         groupId:{
//                             name: 'Sức khỏe',
//                             image: require('../../assets/suckhoe.png')
//                         }
//                     },
//                     {
//                         money:479,
//                         groupId:{
//                             name: 'Thời trang',
//                             image: require('../../assets/thoitrang.png')
//                         }
//                     },
//                 ]
//             },
//         ]
//     },
//     {
//         title:"01/2024",
//         data:[]
//     },
//     {
//         title:"02/2024",
//         data:[]
//     },
//     {
//         title:"03/2024",
//         data:[]
//     },
//     {
//         title:"Tháng trước",
//         data:[]
//     },
//     {
//         title:"Tháng này",
//         moneyin: 79845365,
//         moneyout: 2135478,
//         data:[
//             {
//                 date: '2024-5-13',
//                 detail:[
//                     {
//                         money: 354757,
//                         groupId:{
//                             name: 'Du lịch',
//                             image: require('../../assets/dulich.png')
//                         }
//                     },
//                     {
//                         money: -65846,
//                         groupId:{
//                                 name: 'Ăn uống',
//                                 image: require('../../assets/anuong.png')
//                         }
//                     }, 
//                     {
//                         money: 23354,
//                         groupId:{
//                             name: 'Tiền mạng',
//                             image: require('../../assets/tienmang.png')
//                         }
//                     },
//                 ]
//             },
//             {
//                 date:'2023-5-12',
//                 detail:[
//                     {
//                         money:-780546,
//                         groupId:{
//                             name: 'Quà tặng',
//                             image: require('../../assets/quatang.png')
//                         }
//                     },
//                     {
//                         money:5472,
//                         groupId:{
//                             name: 'Sức khỏe',
//                             image: require('../../assets/suckhoe.png')
//                         }
//                     },
//                     {
//                         money:479,
//                         groupId:{
//                             name: 'Thời trang',
//                             image: require('../../assets/thoitrang.png')
//                         }
//                     },
//                 ]
//             },
//         ]
//     },
//     {
//         title:"Tương lai",
//         data:[]
//     }
// ]

export default function TradeScreen({ navigation, route }) {
    const ref = useRef(null);
    const [index, setIndex] = useState(0);
    const [isWallet, setWallet] = useState('Tổng cộng');
    const [isImageWallet, setImageWallet] = useState(require('../../assets/coins.png'));
    const [isValues, setValues] = useState(data);

    const {userToken, isWalleting, setWalleting} = useContext(AuthContext);
    const [isLoading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    async function getData() {
        let _tradeMonths = await tradeMonths(userToken, 5, isWalleting._id)
        setValues(_tradeMonths.data)
        setLoading(false)
        setIndex(isValues.length - 2)
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getData()
        setIndex(isValues.length - 2)
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    });

    useEffect(() =>{
        ref.current?.scrollToIndex({
            index,
            animated: true,
            viewPosition : 0.5,
        })
        if (route.params?.wallet) {
            setWalleting(route.params?.wallet)
        }
    },[index, route])

    useEffect(() =>{
        getData()
    },[])

    return (
        <View>
            {isLoading ?
                <View style = {{height: 750, justifyContent:'center', alignContent:'center'}}>
                    <ActivityIndicator color={'balck'} size={'large'}/>
                </View>
            :
                <View>
                    <View style = {{alignItems:'center', backgroundColor:'white', gap: 10}}>
                        <TouchableOpacity
                            onPress = {() => navigation.navigate({
                                name:'MyWallet',
                                params: {back: 'Trade', wallet: isWalleting, type:'choose' }
                            })}
                        >  
                            <View style = {{
                                    gap: 10,
                                    paddingHorizontal: 10,
                                    paddingVertical: 10,
                                    borderRadius: 10,
                                    flexDirection:'row',
                                    justifyContent:'center',
                                    backgroundColor: '#FFD3D3',
                                    alignItems:'center'
                                }}
                            >
                                <Image
                                    source={{uri: isWalleting.image}}
                                    style = {styles.images}
                                />
                                <Text style = {{fontWeight:'bold'}}>{isWalleting.name}</Text>
                                <Image
                                    source={Number(require('../../assets/angle-small-right.png'))}
                                    style = {[styles.images, {transform:[{rotate:'90deg'}]}]}
                                />
                            </View>
                        </TouchableOpacity>
                        <FlatList
                            ref={ref}
                            initialScrollIndex = {index}
                            data={isValues}
                            keyExtractor={(item, index) => index}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            renderItem={({ item, index: fIndex }) => {
                                return (
                                    <TouchableOpacity onPress={() => {
                                        setIndex(fIndex)
                                    }}>
                                        <View
                                            style={{
                                                padding: 5,
                                                width: Dimensions.get('screen').width / 3,
                                                alignItems:'center',
                                                borderBottomColor: 'black',
                                                borderBottomWidth: fIndex === index ? 2 : 0,
                                            }}>
                                            <Text style={{
                                                    fontWeight: 'bold',
                                                    fontSize: 15,
                                                    opacity: fIndex === index ? 1 : 0.5,
                                                }}
                                            >
                                                {item.title}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                    <ScrollView
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                    >
                        {isValues[index].data.length != 0 ? 
                            <View style = {{gap: 25, marginBottom: 250}}>
                                <View style = {[styles.containercalcu, styles.borderbottom, styles.bordertop]}>
                                    <View style = {{gap:5, marginTop: 20}}>
                                        <View style = {styles.containertextcalcu}>
                                            <Text style = {styles.textcalcu}>Tiền vào</Text>
                                            <Text style = {[styles.textcalcu, {color: 'green'}]}>
                                                {isValues[index].moneyin.toLocaleString()}
                                            </Text>
                                        </View>

                                        <View style = {styles.containertextcalcu}>
                                            <Text style = {styles.textcalcu}>Tiền ra</Text>
                                            <Text style = {[styles.textcalcu, {color: 'red'}]}>
                                                {isValues[index].moneyout.toLocaleString()}
                                            </Text>
                                        </View>
                                        
                                        <View style = {{flexDirection:'row', justifyContent:'flex-end'}}>
                                            <Text style = {styles.textcalcu}>
                                                {(isValues[index].moneyin - isValues[index].moneyout).toLocaleString()}
                                            </Text>
                                        </View>
                                    </View>
                                    <Button
                                        title={'Xem báo cáo trong giai đoạn này'}
                                        style={{width: 270, height: 40}}
                                        onPress={() => navigation.navigate('ReportScreen')}
                                    />
                                </View>
                                {isValues[index].data.map((value, indexvalue) => (
                                    <View 
                                        key={indexvalue}
                                        style = {[
                                            styles.bordertop, 
                                            styles.borderbottom, 
                                            {backgroundColor:'white', 
                                            paddingHorizontal: 5}
                                        ]}
                                    >
                                        <InfoTitle
                                            titlel={getDay(value.date)}
                                            titles={getWeekMonth(value.date)}
                                            money={value.detail.reduce((total, item) => total + item.money, 0)}
                                            numberleft={getDate(value.date)}
                                            style = {styles.borderbottom}
                                        />
                                        {value.detail.map((item, indexitem) =>(
                                            <InfoTitle
                                                key={indexitem}
                                                titlel={item.groupId.name}
                                                money={item.money}
                                                imageleft={{uri: item.groupId.image}}
                                                styleimageleft={{
                                                    marginLeft: 5,
                                                    marginRight: 10,
                                                }}
                                                onPress={() => navigation.navigate({
                                                    name:'EditTradeScreen',
                                                    params: {trade: item }
                                                })}
                                            />
                                        ))}
                                    </View>
                                ))}
                            </View>
                        :
                            <View style = {{justifyContent:'center', alignItems:'center', height: 500, gap:5}}>
                                <Image
                                    source={Number(require('../../assets/dollar.png'))}
                                    style = {{width:100, height:100}}
                                />
                                <Text style = {{fontWeight:'bold'}}>Chạm + để thêm giao dịch</Text>
                            </View>
                        }
                    </ScrollView>
                </View>
             }
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containercalcu:{
        backgroundColor: 'white', 
        paddingHorizontal: 15, 
        alignItems:'center',
        gap: 30,
        paddingBottom: 10,
    },
    containertextcalcu:{
        width:'100%',
        flexDirection:'row', 
        justifyContent:'space-between',
    },
    textcalcu:{
        fontSize: 17,
        fontWeight:'bold'
    },
    images:{
        width:16,
        height:16
    },
    borderbottom:{
        borderBottomWidth: 0.5, 
        borderBottomColor: '#D3D3D3',
    },
    bordertop:{
        borderTopWidth: 0.5, 
        borderTopColor: '#D3D3D3', 
    }
})