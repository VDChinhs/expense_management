import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView, Dimensions } from "react-native";
import { useState, useRef, useEffect } from "react";
import { PieChart, BarChart } from "react-native-chart-kit";

function randomColorFromBaseColor(baseColor) {
    var baseRGB = hexToRGB(baseColor);

    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);

    var newColor = [
        clamp(baseRGB[0] + red),
        clamp(baseRGB[1] + green),
        clamp(baseRGB[2] + blue)
    ];

    var newHexColor = RGBToHex(newColor);

    return newHexColor;
}

function hexToRGB(hex) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
}

function RGBToHex(rgb) {
    return "#" + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
}

function clamp(value) {
    return Math.max(0, Math.min(255, value));
}

var baseColor = "#AE4B4B";

const data = [
    {
        title:"11/2023",
        data:{
            datarong:{
                sum: 0,
                labels: ["01/03 - 07/03", "08/03 - 14/03", "15/03 - 22/03", "23/03 - 31/03"],
                datasets: [
                    {
                    data: []
                    }
                ],
            },
            datathu:[],
            datchi:[]
        }
    },
    {
        title:"12/2023",
        data:{
            datarong:{
                sum:8935325,
                labels: ["01/03 - 07/03", "08/03 - 14/03", "15/03 - 22/03", "23/03 - 31/03"],
                datasets: [
                    {
                    data: [0.5, 3.3, -4, 7]
                    }
                ],
                
            },
            datathu:[
                {
                    name: "Công việc",
                    population: 47436,
                    color: randomColorFromBaseColor(baseColor),
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 14
                },
                {
                    name: "Xã hội",
                    population: 457325,
                    color: randomColorFromBaseColor(baseColor),
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 14
                },
                {
                    name: "Lãi",
                    population: 4375525,
                    color: randomColorFromBaseColor(baseColor),
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 14
                },
                {
                    name: "Khác",
                    population: 657235,
                    color: randomColorFromBaseColor(baseColor),
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 14
                },
            ],
            datachi:[
                {
                    name: "Du lịch",
                    population: 21500000,
                    color: randomColorFromBaseColor(baseColor),
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 14
                },
                {
                    name: "Ăn uống",
                    population: 2800000,
                    color: randomColorFromBaseColor(baseColor),
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 14
                },
                {
                    name: "Khác",
                    population: 527612,
                    color: randomColorFromBaseColor(baseColor),
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 14
                },
                {
                    name: "Quà tặng",
                    population: 11920000,
                    color: randomColorFromBaseColor(baseColor),
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 14
                }
            ]
        }
    },
    {
        title:"01/2024",
        data:{
            datarong:{
                sum: 0,
                labels: ["01/03 - 07/03", "08/03 - 14/03", "15/03 - 22/03", "23/03 - 31/03"],
                datasets: [
                    {
                    data: []
                    }
                ],
            },
            datathu:[],
            datchi:[]
        }
    },
    {
        title:"02/2024",
        data:{
            datarong:{
                sum: 0,
                labels: ["01/03 - 07/03", "08/03 - 14/03", "15/03 - 22/03", "23/03 - 31/03"],
                datasets: [
                    {
                    data: []
                    }
                ],
            },
            datathu:[],
            datchi:[]
        }
    },
    {
        title:"03/2024",
        data:{
            datarong:{
                sum: 0,
                labels: ["01/03 - 07/03", "08/03 - 14/03", "15/03 - 22/03", "23/03 - 31/03"],
                datasets: [
                    {
                    data: []
                    }
                ],
            },
            datathu:[],
            datchi:[]
        }
    },
    {
        title:"Tháng trước",
        data:{
            datarong:{
                sum: 0,
                labels: ["01/03 - 07/03", "08/03 - 14/03", "15/03 - 22/03", "23/03 - 31/03"],
                datasets: [
                    {
                    data: []
                    }
                ],
            },
            datathu:[],
            datchi:[]
        }
    },
    {
        title:"Tháng này",
        data:{
            datarong:{
                sum: 0,
                labels: ["01/03 - 07/03", "08/03 - 14/03", "15/03 - 22/03", "23/03 - 31/03"],
                datasets: [
                    {
                    data: []
                    }
                ],
            },
            datathu:[],
            datchi:[]
        }
    },
    {
        title:"Tương lai",
        data:{
            datarong:{
                sum: 0,
                labels: ["01/03 - 07/03", "08/03 - 14/03", "15/03 - 22/03", "23/03 - 31/03"],
                datasets: [
                    {
                    data: []
                    }
                ],
            },
            datathu:[],
            datchi:[]
        }
    }
]

console.log(data[4].data.datachi);

export default function ReportScreen({ navigation, route }) {
    const ref = useRef(null);
    const [index, setIndex] = useState(0);
    const [isWallet, setWallet] = useState('Tổng cộng');
    const [isImageWallet, setImageWallet] = useState(require('../../assets/coins.png'));

    useEffect(() =>{
        ref.current?.scrollToIndex({
            index,
            animated: true,
            viewPosition : 0.5,
        })
        if (route.params?.namewallet) {
            setWallet(route.params?.namewallet)
            setImageWallet(route.params?.imagewallet)
        }
    },[index, route])

    return(
        <View>
            <View style = {{alignItems:'center', backgroundColor:'white', gap: 10}}>
                <TouchableOpacity
                    onPress = {() => navigation.navigate({
                        name:'MyWallet',
                        params: {back: 'Trade', wallet: isWallet, type:'choose' }
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
                            source={isImageWallet}
                            style = {styles.images}
                        />
                        <Text style = {{fontWeight:'bold'}}>{isWallet}</Text>
                        <Image
                            source={require('../../assets/angle-small-right.png')}
                            style = {[styles.images, {transform:[{rotate:'90deg'}]}]}
                        />
                    </View>
                </TouchableOpacity>
                <FlatList
                    ref={ref}
                    initialScrollIndex = {index}
                    data={data}
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
            <ScrollView>
                <View style = {{marginBottom: 100}}>
                    <View style = {styles.border}>
                        <View style = {styles.containerheader}>
                            <View>
                                <Text style = {[styles.text, {fontSize: 18}]}>Thu nhập ròng</Text>
                                <Text style = {[styles.text, {fontSize: 16}]}>
                                    {data[index].data.datarong.sum.toLocaleString()}
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
                                data={data[index].data.datarong}
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
                                {data[index].data.datathu.length != 0 ? 
                                    <Text 
                                        style = {[styles.text, {fontSize: 16, color: 'green'}]}
                                    >
                                        {data[index].data.datathu.reduce((total, item) => total + item.population, 0).toLocaleString()}
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
                                data[index].data.datathu.length != 0 &&
                                navigation.navigate('DetailReportScreen', {title: 'Chi tiết khoản thu'})}
                            >
                                <Text style = {styles.text}>Xem chi tiết</Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {styles.containergraphic}>
                            {data[index].data.datathu.length != 0 ?
                                <PieChart
                                    data={data[index].data.datathu}
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
                                <View>
                                    <Text>Không có dữ liệu</Text>
                                </View>
                            }
                        </View>
                    </View>
                    <View style = {styles.border}>
                        <View style = {styles.containerheader}>
                            <View>
                                <Text style = {[styles.text, {fontSize: 18}]}>Khoản chi</Text>
                                {data[index].data.datachi != undefined ? 
                                    <Text 
                                        style = {[styles.text, {fontSize: 16, color: 'red'}]}
                                    >
                                        {data[index].data.datachi.reduce((total, item) => total + item.population, 0).toLocaleString()}
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
                                data[index].data.datachi != undefined &&
                                navigation.navigate('DetailReportScreen', {title: 'Chi tiết khoản chi'})}
                            >
                                <Text style = {styles.text}>Xem chi tiết</Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {styles.containergraphic}>
                            {data[index].data.datachi != undefined ?
                                <PieChart
                                    data={data[index].data.datachi}
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
                                <View>
                                    <Text>Không có dữ liệu</Text>
                                </View>
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
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