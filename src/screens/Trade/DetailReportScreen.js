import { useEffect, useState, useRef, useContext, useCallback } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Dimensions, RefreshControl, ActivityIndicator } from "react-native";
import InfoTitle from "../../components/InfoTitle";
import { ScrollView } from "react-native-gesture-handler";
import { PieChart } from "react-native-chart-kit";
import { tradeReportDetail } from "../../process/TradeController";
import { AuthContext } from "../../context/AuthContext";

const data = [
    {
        title:"mm/yyyy",
        data:[],
        datachar:[]
    },
    {
        title:"mm/yyyy",
        data:[],
        datachar:[]
    },
    {
        title:"mm/yyyy",
        data:[],
        datachar:[]
    },
    {
        title:"mm/yyyy",
        data:[],
        datachar:[]
    },
    {
        title:"mm/yyyy",
        data:[],
        datachar:[]
    },
    {
        title:"mm/yyyy",
        data:[],
        datachar:[]
    },
]

// const data = [
//     {
//         title: "12/2023",
//         data:[
//             {
//                 money: 354757,
//                 groupId:{
//                     name: 'Du lịch',
//                     image: require('../../assets/dulich.png')
//                 }
//             },
//             {
//                 money: -65846,
//                 groupId:{
//                     name: 'Ăn uống',
//                     image: require('../../assets/anuong.png')
//                 }
//             }, 
//             {
//                 money: 23354,
//                 groupId:{
//                     name: 'Tiền mạng',
//                     image: require('../../assets/tienmang.png')
//                 }
//             },
//             {
//                 money:-780546,
//                 groupId:{
//                     name: 'Quà tặng',
//                     image: require('../../assets/quatang.png')
//                 }
//             },
//             {
//                 money:5472,
//                 groupId:{
//                     name: 'Sức khỏe',
//                     image: require('../../assets/suckhoe.png')
//                 }
//             },
//             {
//                 money:479,
//                 groupId:{
//                     name: 'Thời trang',
//                     image: require('../../assets/thoitrang.png')
//                 }
//             },
//             {
//                 money:-780546,
//                 groupId:{
//                     name: 'Quà tặng',
//                     image: require('../../assets/quatang.png')
//                 }
//             },
//             {
//                 money:5472,
//                 groupId:{
//                     name: 'Sức khỏe',
//                     image: require('../../assets/suckhoe.png')
//                 }
//             },
//             {
//                 money:479,
//                 groupId:{
//                     name: 'Thời trang',
//                     image: require('../../assets/thoitrang.png')
//                 }
//             },
//             {
//                 money:5472,
//                 groupId:{
//                     name: 'Sức khỏe',
//                     image: require('../../assets/suckhoe.png')
//                 }
//             },
//             {
//                 money:479,
//                 groupId:{
//                     name: 'Thời trang',
//                     image: require('../../assets/thoitrang.png')
//                 }
//             },

//         ],
//         datachar: [
//             {
//               name: "Du lịch",
//               population: 21500000,
//               color: "rgba(131, 167, 234, 1)",
//               legendFontColor: "#7F7F7F",
//               legendFontSize: 14
//             },
//             {
//               name: "Ăn uống",
//               population: 2800000,
//               color: "#F00",
//               legendFontColor: "#7F7F7F",
//               legendFontSize: 14
//             },
//             {
//               name: "Khác",
//               population: 527612,
//               color: "green",
//               legendFontColor: "#7F7F7F",
//               legendFontSize: 14
//             },
//             {
//               name: "Quà tặng",
//               population: 11920000,
//               color: "rgb(0, 0, 255)",
//               legendFontColor: "#7F7F7F",
//               legendFontSize: 14
//             }
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
//         data:[
//             {
//                 money: 354757,
//                 groupId:{
//                     name: 'Du lịch',
//                     image: require('../../assets/dulich.png')
//                 }
//             },
//             {
//                 money: -65846,
//                 groupId:{
//                     name: 'Ăn uống',
//                     image: require('../../assets/anuong.png')
//                 }
//             }, 
//             {
//                 money: 23354,
//                 groupId:{
//                     name: 'Tiền mạng',
//                     image: require('../../assets/tienmang.png')
//                 }
//             },
//             {
//                 money:-780546,
//                 groupId:{
//                     name: 'Quà tặng',
//                     image: require('../../assets/quatang.png')
//                 }
//             },
//             {
//                 money:5472,
//                 groupId:{
//                     name: 'Sức khỏe',
//                     image: require('../../assets/suckhoe.png')
//                 }
//             },
//             {
//                 money:479,
//                 groupId:{
//                     name: 'Thời trang',
//                     image: require('../../assets/thoitrang.png')
//                 }
//             },
//         ],
//         datachar: [
//             {
//               name: "Du lịch",
//               population: 21500000,
//               color: "rgba(131, 167, 234, 1)",
//               legendFontColor: "#7F7F7F",
//               legendFontSize: 14
//             },
//             {
//               name: "Ăn uống",
//               population: 2800000,
//               color: "#F00",
//               legendFontColor: "#7F7F7F",
//               legendFontSize: 14
//             },
//             {
//               name: "Khác",
//               population: 527612,
//               color: "green",
//               legendFontColor: "#7F7F7F",
//               legendFontSize: 14
//             },
//             {
//               name: "Quà tặng",
//               population: 11920000,
//               color: "rgb(0, 0, 255)",
//               legendFontColor: "#7F7F7F",
//               legendFontSize: 14
//             }
//         ]
//     }
// ]

export default function DetailReportScreen({ navigation, route }) {

    const ref = useRef(null);
    const [index, setIndex] = useState(0);
    const [isValues, setValues] = useState(data);
    const [isType, setType] = useState(null);

    const {userToken, isWalleting} = useContext(AuthContext);
    const [isLoading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    async function getData() {
        let _tradeReportDetail = await tradeReportDetail(userToken, 5, isWalleting._id, route.params?.type)
        setValues(_tradeReportDetail.data)
        setLoading(false)
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getData()
        setIndex(isValues.length - 1)
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
        navigation.setOptions({
            headerTitle: route.params.title,
        });
        
    },[index, route])

    useEffect(() =>{
        getData()
    },[])

    return(
        <View>
            {isLoading ?
                <View style = {{height: 750, justifyContent:'center', alignContent:'center'}}>
                    <ActivityIndicator color={'balck'} size={'large'}/>
                </View>
            :
                <View>
                    <View style = {{alignItems:'center', backgroundColor:'white', paddingTop: 10}}>
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
                            <View>
                                <View style = {styles.container}>
                                    <View style = {styles.containerheader}>
                                        <View >
                                            <Text style = {[styles.text, {fontSize: 15}]}>Tổng cộng</Text>
                                            <Text 
                                                style = {[styles.text, {fontSize: 20}]}
                                            >
                                                {isValues[index].data.reduce((total, item) => total + item.money, 0).toLocaleString()}
                                            </Text>
                                        </View>
                                        <View>
                                            <Text style = {[styles.text, {fontSize: 15}]}>Trung bình hàng ngày</Text>
                                            <Text 
                                                style = {[styles.text, {fontSize: 20}]}
                                            >
                                                {Number(((isValues[index].data.reduce((total, item) => total + item.money, 0)) / 30).toFixed(0)).toLocaleString()}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style = {styles.containergraphic}>
                                        <PieChart
                                            data={isValues[index].datachar}
                                            width={Dimensions.get('screen').width}
                                            height={170}
                                            chartConfig={{
                                                color: () => 'black',
                                            }}
                                            accessor={"population"}
                                            backgroundColor={"transparent"}
                                            paddingLeft={"10"}
                                        />
                                    </View>
                                </View>
                                <View style  = {{paddingHorizontal: 10}}>
                                    {isValues[index].data.map((value, index) =>(
                                        <InfoTitle
                                            key={index}
                                            titlel={value.groupId.name}
                                            money={value.money}
                                            imageleft={{uri: value.groupId.image}}
                                            style = {styles.bordertop}
                                            onPress={() => navigation.navigate({
                                                name:'EditTradeScreen',
                                                params: {trade: value }
                                            })}
                                        />
                                    ))

                                    }
                                </View>
                            </View>
                        :
                            <View style = {{justifyContent:'center', alignItems:'center', height:600, gap:5}}>
                                <Image
                                    source={Number(require('../../assets/dollar.png'))}
                                    style = {{width:100, height:100}}
                                />
                                <Text style = {{fontWeight:'bold'}}>Không có dữ liệu để hiện thị</Text>
                            </View>
                        }
                    </ScrollView>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 15,
        alignItems:'center',
        marginVertical: 30
    },
    images:{
        width:16,
        height:16
    },
    containerheader:{
        flexDirection:'row',
        justifyContent: "space-between",
        paddingHorizontal: 10,
        width: '100%'
    },
    containergraphic:{
        paddingTop: 15, 
        alignItems:'center'
    },
    text:{
        fontWeight:'bold'
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