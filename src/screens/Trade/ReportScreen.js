import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView, Dimensions, RefreshControl, ActivityIndicator } from "react-native";
import { useState, useRef, useEffect, useContext, useCallback } from "react";
import { PieChart, BarChart } from "react-native-chart-kit";
import { AuthContext } from "../../context/AuthContext";
import { tradeReports } from "../../process/TradeController";

const data = [
    {
        title:"11/2023",
        data:{
            datadong:{
                sum: 0,
                labels: ["01/03 - 07/03", "08/03 - 14/03", "15/03 - 22/03", "23/03 - 31/03"],
                datasets: [
                    {
                    data: [0,0,0,0,0]
                    }
                ],
            },
            datathu:[],
            datachi:[]
        }
    },
    {
        title:"11/2023",
        data:{
            datadong:{
                sum: 0,
                labels: ["01/03 - 07/03", "08/03 - 14/03", "15/03 - 22/03", "23/03 - 31/03"],
                datasets: [
                    {
                    data: [0,0,0,0,0]
                    }
                ],
            },
            datathu:[],
            datachi:[]
        }
    },
    {
        title:"11/2023",
        data:{
            datadong:{
                sum: 0,
                labels: ["01/03 - 07/03", "08/03 - 14/03", "15/03 - 22/03", "23/03 - 31/03"],
                datasets: [
                    {
                    data: [0,0,0,0,0]
                    }
                ],
            },
            datathu:[],
            datachi:[]
        }
    },
    {
        title:"11/2023",
        data:{
            datadong:{
                sum: 0,
                labels: ["01/03 - 07/03", "08/03 - 14/03", "15/03 - 22/03", "23/03 - 31/03"],
                datasets: [
                    {
                    data: [0,0,0,0,0]
                    }
                ],
            },
            datathu:[],
            datachi:[]
        }
    },
    {
        title:"11/2023",
        data:{
            datadong:{
                sum: 0,
                labels: ["01/03 - 07/03", "08/03 - 14/03", "15/03 - 22/03", "23/03 - 31/03"],
                datasets: [
                    {
                    data: [0,0,0,0,0]
                    }
                ],
            },
            datathu:[],
            datachi:[]
        }
    },
    {
        title:"11/2023",
        data:{
            datadong:{
                sum: 0,
                labels: ["01/03 - 07/03", "08/03 - 14/03", "15/03 - 22/03", "23/03 - 31/03"],
                datasets: [
                    {
                    data: [0,0,0,0,0]
                    }
                ],
            },
            datathu:[],
            datachi:[]
        }
    },
]

// const data = [
//     {
//         title:"11/2023",
//         data:{
//             datadong:{
//                 sum: 0,
//                 labels: ["01/03 - 07/03", "08/03 - 14/03", "15/03 - 22/03", "23/03 - 31/03"],
//                 datasets: [
//                     {
//                     data: [0,0,0,0,0]
//                     }
//                 ],
//             },
//             datathu:[],
//             datachi:[]
//         }
//     },
//     {
//         title:"12/2023",
//         data:{
//             datadong:{
//                 sum:8935325,
//                 labels: ["01/03 - 07/03", "08/03 - 14/03", "15/03 - 22/03", "23/03 - 31/03"],
//                 datasets: [
//                     {
//                     data: [0.5, 3.3, -4, 7]
//                     }
//                 ],
                
//             },
//             datathu:[
//                 {
//                     name: "Công việc",
//                     population: 47436,
//                     color: randomColorFromBaseColor(baseColor),
//                     legendFontColor: "#7F7F7F",
//                     legendFontSize: 14
//                 },
//                 {
//                     name: "Xã hội",
//                     population: 457325,
//                     color: randomColorFromBaseColor(baseColor),
//                     legendFontColor: "#7F7F7F",
//                     legendFontSize: 14
//                 },
//                 {
//                     name: "Lãi",
//                     population: 4375525,
//                     color: randomColorFromBaseColor(baseColor),
//                     legendFontColor: "#7F7F7F",
//                     legendFontSize: 14
//                 },
//                 {
//                     name: "Khác",
//                     population: 657235,
//                     color: randomColorFromBaseColor(baseColor),
//                     legendFontColor: "#7F7F7F",
//                     legendFontSize: 14
//                 },
//             ],
//             datachi:[
//                 {
//                     name: "Du lịch",
//                     population: 21500000,
//                     color: randomColorFromBaseColor(baseColor),
//                     legendFontColor: "#7F7F7F",
//                     legendFontSize: 14
//                 },
//                 {
//                     name: "Ăn uống",
//                     population: 2800000,
//                     color: randomColorFromBaseColor(baseColor),
//                     legendFontColor: "#7F7F7F",
//                     legendFontSize: 14
//                 },
//                 {
//                     name: "Khác",
//                     population: 527612,
//                     color: randomColorFromBaseColor(baseColor),
//                     legendFontColor: "#7F7F7F",
//                     legendFontSize: 14
//                 },
//                 {
//                     name: "Quà tặng",
//                     population: 11920000,
//                     color: randomColorFromBaseColor(baseColor),
//                     legendFontColor: "#7F7F7F",
//                     legendFontSize: 14
//                 }
//             ]
//         }
//     },
//     {
//         title:"01/2024",
//         data:{
//             datadong:{
//                 sum: 0,
//                 labels: ["01/03 - 07/03", "08/03 - 14/03", "15/03 - 22/03", "23/03 - 31/03"],
//                 datasets: [
//                     {
//                     data: [0,0,0,0,0]
//                     }
//                 ],
//             },
//             datathu:[],
//             datachi:[]
//         }
//     },
//     {
//         title:"02/2024",
//         data:{
//             datadong:{
//                 sum: 0,
//                 labels: ["01/03 - 07/03", "08/03 - 14/03", "15/03 - 22/03", "23/03 - 31/03"],
//                 datasets: [
//                     {
//                     data: [0,0,0,0,0]
//                     }
//                 ],
//             },
//             datathu:[],
//             datachi:[]
//         }
//     },
//     {
//         title:"03/2024",
//         data:{
//             datadong:{
//                 sum: 0,
//                 labels: ["01/03 - 07/03", "08/03 - 14/03", "15/03 - 22/03", "23/03 - 31/03"],
//                 datasets: [
//                     {
//                     data: [0,0,0,0,0]
//                     }
//                 ],
//             },
//             datathu:[],
//             datachi:[]
//         }
//     },
//     {
//         title:"Tháng trước",
//         data:{
//             datadong:{
//                 sum: 0,
//                 labels: ["01/03 - 07/03", "08/03 - 14/03", "15/03 - 22/03", "23/03 - 31/03"],
//                 datasets: [
//                     {
//                     data: [0,0,0,0,0]
//                     }
//                 ],
//             },
//             datathu:[],
//             datachi:[]
//         }
//     },
//     {
//         title:"Tháng này",
//         data:{
//             datadong:{
//                 sum: 0,
//                 labels: ["01/03 - 07/03", "08/03 - 14/03", "15/03 - 22/03", "23/03 - 31/03"],
//                 datasets: [
//                     {
//                     data: [0,0,0,0,0]
//                     }
//                 ],
//             },
//             datathu:[],
//             datachi:[]
//         }
//     },
//     {
//         title:"Tương lai",
//         data:{
//             datadong:{
//                 sum: 0,
//                 labels: ["01/03 - 07/03", "08/03 - 14/03", "15/03 - 22/03", "23/03 - 31/03"],
//                 datasets: [
//                     {
//                     data: [0,0,0,0,0]
//                     }
//                 ],
//             },
//             datathu:[],
//             datachi:[]
//         }
//     }
// ]

export default function ReportScreen({ navigation, route }) {
    const ref = useRef(null);
    const [index, setIndex] = useState(0);
    const [isWallet, setWallet] = useState('Tổng cộng');
    const [isImageWallet, setImageWallet] = useState(require('../../assets/coins.png'));
    const [isValues, setValues] = useState(data);

    const {userToken, isWalleting, setWalleting} = useContext(AuthContext);
    const [isLoading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    async function getData() {
        let _tradeReports = await tradeReports(userToken, 5, isWalleting._id)
        setValues(_tradeReports.data)
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

    return(
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
                                params: {back: 'ReportScreen', wallet: isWalleting, type:'choose' }
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
                        <View style = {{marginBottom: 175}}>
                            <View style = {styles.border}>
                                <View style = {styles.containerheader}>
                                    <View>
                                        <Text style = {[styles.text, {fontSize: 18}]}>Thu nhập ròng</Text>
                                        <Text style = {[styles.text, {fontSize: 16}]}>
                                            {isValues[index].data.datadong.sum.toLocaleString()}
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('ReportScreen')}
                                    >
                                        <Text style = {styles.text}>Xem chi tiết</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style = {[styles.containergraphic]}>
                                    <BarChart
                                        data={isValues[index].data.datadong}
                                        width={300}
                                        height={240}
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
                                            propsForVerticalLabels:{
                                                fontSize:10,
                                                rotation: [-25]
                                            }                     
                                        }}
                                    />
                                </View>
                            </View>
                            <View style = {styles.border}>
                                <View style = {styles.containerheader}>
                                    <View>
                                        <Text style = {[styles.text, {fontSize: 18}]}>Khoản thu</Text>
                                        {isValues[index].data.datathu.length != 0 ? 
                                            <Text 
                                                style = {[styles.text, {fontSize: 16, color: 'green'}]}
                                            >
                                                {isValues[index].data.datathu.reduce((total, item) => total + item.population, 0).toLocaleString()}
                                            </Text>
                                            :
                                            <Text
                                                style = {[styles.text, {fontSize: 16, color: 'green'}]}
                                            >
                                                0
                                            </Text>
                                        }
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => 
                                            isValues[index].data.datathu.length != 0 &&
                                        navigation.navigate('DetailReportScreen', {title: 'Chi tiết khoản thu', type: 1})}
                                    >
                                        <Text style = {styles.text}>Xem chi tiết</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style = {styles.containergraphic}>
                                    {isValues[index].data.datathu.length != 0 ?
                                        <PieChart
                                            data={isValues[index].data.datathu}
                                            width={Dimensions.get('screen').width}
                                            height={170}
                                            chartConfig={{
                                                color: () => 'black',
                                            }}
                                            accessor={"population"}
                                            backgroundColor={"transparent"}
                                            paddingLeft={"10"}
                                        />
                                        :
                                        <View style = {{padding: 60, alignItems: 'center'}}>
                                            <Text style = {styles.text}>Không có dữ liệu</Text>
                                        </View>
                                    }
                                </View>
                            </View>
                            <View style = {styles.border}>
                                <View style = {styles.containerheader}>
                                    <View>
                                        <Text style = {[styles.text, {fontSize: 18}]}>Khoản chi</Text>
                                        {isValues[index].data.datachi.length != 0 ? 
                                            <Text 
                                                style = {[styles.text, {fontSize: 16, color: 'red'}]}
                                            >
                                                {isValues[index].data.datachi.reduce((total, item) => total + item.population, 0).toLocaleString()}
                                            </Text>
                                            :
                                            <Text
                                                style = {[styles.text, {fontSize: 16, color: 'red'}]}
                                            >
                                                0
                                            </Text>
                                        }
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => 
                                            isValues[index].data.datachi.length != 0 &&
                                        navigation.navigate('DetailReportScreen', {title: 'Chi tiết khoản chi', type: 0})}
                                    >
                                        <Text style = {styles.text}>Xem chi tiết</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style = {styles.containergraphic}>
                                    {isValues[index].data.datachi.length != 0 ?
                                        <PieChart
                                            data={isValues[index].data.datachi}
                                            width={Dimensions.get('screen').width}
                                            height={170}
                                            chartConfig={{
                                                color: () => 'black',
                                            }}
                                            accessor={"population"}
                                            backgroundColor={"transparent"}
                                            paddingLeft={"10"}
                                        />
                                        :
                                        <View style = {{padding: 60, alignItems: 'center'}}>
                                            <Text style = {styles.text}>Không có dữ liệu</Text>
                                        </View>
                                    }
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignContent:'center'
    },
    containergraphic:{
        alignItems:'center',
        padding:10
    },
    containercalcu:{
        backgroundColor: 'white', 
        paddingHorizontal: 15, 
        alignItems:'center',
        gap: 30,
        paddingBottom: 10,
        marginBottom: 25
    },
    containerheader:{
        margin: '5%',
        marginVertical: 12.5,
        flexDirection:'row',
        justifyContent:"space-between"
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
    },
    text:{
        fontWeight: 'bold'
    },
    border:{
        borderRadius: 15,
        backgroundColor:'white',
        marginTop:20,
        marginHorizontal:'5%'
    },
})