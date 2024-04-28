import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions, ScrollView, RefreshControl, ActivityIndicator } from "react-native";
import Button from "../../components/Button";
import { useEffect, useState, useRef, useCallback, useContext } from "react";
import HaldCircle from '../../components/HalfCricle';
import InfoTitle from "../../components/InfoTitle";
import * as Progress from 'react-native-progress';
import { getRangeDate } from "../../process/Date";
import { AuthContext } from "../../context/AuthContext";
import { myBudget } from "../../process/BudgetController";

// const data = [
//   {
//     title: 'Tháng này',
//     dateend: '2024-4-30',
//     data:[
//         {
//             money: 2987332,
//             moneyloss: 59830,
//             group:{
//                 name:'Du lịch',
//                 image:require('../../assets/dulich.png')
//             }
//         },
//         {
//             money: 5732543,
//             moneyloss: 2353235,
//             group:{
//                 name:'Ăn uống',
//                 image:require('../../assets/anuong.png')
//             }
//         },
//         {
//             money: 7698346,
//             moneyloss: 4364736,
//             group:{
//                 name:'Quà tặng',
//                 image:require('../../assets/quatang.png')
//             }
//         },
//         {
//             money: 983252,
//             moneyloss: 548568,
//             group:{
//                 name:'Tiền mạng',
//                 image:require('../../assets/tienmang.png')
//             }
//         },
//     ]
//   },
//   {
//     title: '12/5 - 16/5',
//     dateend: '2024-5-16',
//     data:[
//         {
//             money: 12000000,
//             moneyloss: 5204000,
//             group:{
//                 name: 'Du lịch',
//                 image:require('../../assets/dulich.png')
//             }
//         },
//         {
//             money: 3000000,
//             moneyloss: 1200000,
//             group:{
//                 name: 'Ăn uống',
//                 image:require('../../assets/anuong.png')
//             }
//         },
//         {
//             money: 3420000,
//             moneyloss: 730000,
//             group:{
//                 name: 'Quà tặng',
//                 image:require('../../assets/quatang.png')
//             }
//         },
//         {
//             money: 1100000,
//             moneyloss: 360000,
//             group:{
//                 name: 'Tiền mạng',
//                 image:require('../../assets/tienmang.png')
//             }
//         },
//     ]
//   },
// ]

export default function BudgetScreen({ navigation, route }) {
    const ref = useRef(null);
    const [index, setIndex] = useState(0);
    const [isValues, setValues] = useState([]);
    const [isCurrentDate , setCurrentDate] = useState(new Date())

    const {userToken} = useContext(AuthContext);
    const [isLoading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    async function getData() {
        let _myBudget = await myBudget(userToken)
        setValues(_myBudget.data)
        setLoading(false)
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getData()
        setIndex(0)
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    });

    useEffect(() => {
        ref.current?.scrollToIndex({
            index,
            animated: true,
            viewPosition : 0.5,
        });
    },[index, route, navigation])

    useEffect(() => {
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
                    {isValues.length != 0 ?
                        <View>
                            <View style = {{backgroundColor: 'white'}}>
                                <FlatList
                                    ref={ref}
                                    initialScrollIndex = {index}
                                    data={isValues}
                                    keyExtractor={(item, index) => index.toString()}
                                    showsHorizontalScrollIndicator={false}
                                    horizontal
                                    renderItem={({ item, index: fIndex }) => {
                                        return (
                                            <TouchableOpacity onPress={() => {
                                                setIndex(fIndex)
                                            }}>
                                                <View
                                                    style={{
                                                        padding: 10,
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
                                <View style = {{marginBottom: 200}}>
                                    <View style = {styles.containergraphic}>
                                        <View>
                                            <HaldCircle
                                                textColortitle={'black'}
                                                color="green"
                                                percentage={
                                                    isValues[index].data.reduce((total, item) => total + item.money, 0) -
                                                    isValues[index].data.reduce((total, item) => total + item.moneyloss, 0) < 0 ? 
                                                    isValues[index].data.reduce((total, item) => total + item.money, 0) :
                                                    isValues[index].data.reduce((total, item) => total + item.moneyloss, 0)
                                                }
                                                text={
                                                    isValues[index].data.reduce((total, item) => total + item.money, 0) -
                                                    isValues[index].data.reduce((total, item) => total + item.moneyloss, 0)
                                                }
                                                max={isValues[index].data.reduce((total, item) => total + item.money, 0)}
                                                radius={160}
                                            />
                                        </View>
                                        <View style = {styles.containerundergraphic}>
                                            <View style = {{alignItems:'center'}}>
                                                <Text 
                                                    style = {[styles.textbold,{fontSize: 19}]}
                                                >
                                                    {isValues[index].data.reduce((total, item) => total + item.money, 0).toLocaleString()}
                                                </Text>
                                                <Text>Tổng ngân sách</Text>
                                            </View>
                                            <View style = {{alignItems:'center'}}>
                                                <Text 
                                                    style = {[styles.textbold,{fontSize: 19}]}
                                                >
                                                    {isValues[index].data.reduce((total, item) => total + item.moneyloss, 0).toLocaleString()}
                                                </Text>
                                                <Text>Tổng đã chi</Text>
                                            </View>
                                            <View style = {{alignItems:'center'}}>
                                                <Text 
                                                    style = {[styles.textbold,{fontSize: 19}]}
                                                >
                                                    {getRangeDate(isCurrentDate, new Date(isValues[index].dateend))} ngày
                                                </Text>
                                                <Text>Đến cuối kỳ</Text>
                                            </View>
                                        </View>
                                        <Button
                                            title={'Tạo ngận sách'}
                                            style={{width: 150, height: 50}}
                                            onPress={() => navigation.navigate("AddBudget")}
                                        />
                                    </View>
                                    <View style = {{gap: 20, marginTop: 20}}>
                                        {isValues[index].data.map((value, fIndex) =>(
                                            <View style = {styles.containerbudget} key = {fIndex}>
                                                <InfoTitle

                                                    titlel={value.groupId.name}
                                                    styleimageleft={{width: 30, height: 30}}
                                                    imageleft={{uri: value.groupId.image}}
                                                    titlerightl={value.money}
                                                    titlerights={value.money - value.moneyloss}
                                                    onPress={() => {
                                                        navigation.navigate({
                                                            name:'EditBudgetScreen',
                                                            params: {budget: value }
                                                        });
                                                    }}
                                                />
                                                <View style = {{alignItems:'flex-end', padding: 10}}>
                                                    <Progress.Bar 
                                                        progress={value.moneyloss / value.money} 
                                                        color= {value.moneyloss - value.money > 1 ? "red" : "green"} 
                                                        width={260}
                                                    />
                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                        :
                        <ScrollView
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }
                        >
                            <View style = {styles.container}>
                                <Image
                                    source={Number(require('../../assets/dollar.png'))}
                                    style = {styles.image}
                                />
                                <View style = {styles.textinfo}>
                                    <Text style = {[styles.textbold, {fontSize: 15}]}>Bạn chưa có ngân sách</Text>
                                    <Text style = {{textAlign: 'center'}}>Bắt đầu tiết kiệm bằng cách tạo ngân sách và chúng tôi sẽ giúp bạn kiểm soát ngân sách</Text>
                                </View>
                                <Button 
                                    title={"Tạo ngân sách"}
                                    onPress={() => navigation.navigate("AddBudget")}
                                />
                            </View>
                        </ScrollView>
                    }
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginTop:125,
        alignItems: 'center',
        gap:20
    },
    containergraphic:{
        alignItems:'center',
        backgroundColor: 'white', 
        marginTop: 20, 
        paddingVertical: 20
    },
    containerundergraphic:{
        flexDirection: 'row', 
        width:'100%', 
        justifyContent:'space-around', 
        marginTop: -140, 
        paddingBottom: 20,
        paddingHorizontal: 10
    },
    containerbudget:{
        backgroundColor:'white',
        paddingHorizontal: 15,
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
    }
})