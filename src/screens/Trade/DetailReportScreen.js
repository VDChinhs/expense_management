import { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Dimensions } from "react-native";
import InfoTitle from "../../components/InfoTitle";
import { ScrollView } from "react-native-gesture-handler";

export default function DetailReportScreen({ navigation, route }) {
    const data = [
        {
            title: "12/2023",
            moneyall: 32643645,
            data:[
                {
                    money: 354757,
                    group: 'Du lịch',
                    image: require('../../assets/dulich.png')
                },
                {
                    money: -65846,
                    group: 'Ăn uống',
                    image: require('../../assets/anuong.png')
                }, 
                {
                    money: 23354,
                    group: 'Tiền mạng',
                    image: require('../../assets/tienmang.png')
                },
                {
                    money:-780546,
                    group: 'Quà tặng',
                    image: require('../../assets/quatang.png')
                },
                {
                    money:5472,
                    group: 'Sức khỏe',
                    image: require('../../assets/suckhoe.png')
                },
                {
                    money:479,
                    group: 'Thời trang',
                    image: require('../../assets/thoitrang.png')
                },
                {
                    money:-780546,
                    group: 'Quà tặng',
                    image: require('../../assets/quatang.png')
                },
                {
                    money:5472,
                    group: 'Sức khỏe',
                    image: require('../../assets/suckhoe.png')
                },
                {
                    money:479,
                    group: 'Thời trang',
                    image: require('../../assets/thoitrang.png')
                },
                {
                    money:5472,
                    group: 'Sức khỏe',
                    image: require('../../assets/suckhoe.png')
                },
                {
                    money:479,
                    group: 'Thời trang',
                    image: require('../../assets/thoitrang.png')
                },

            ]
        },
        {
            title:"01/2024",
            data:[]
        },
        {
            title:"02/2024",
            data:[]
        },
        {
            title:"03/2024",
            data:[]
        },
        {
            title:"Tháng trước",
            data:[]
        },
        {
            title:"Tháng này",
            moneyall: 32643645,
            data:[
                {
                    money: 354757,
                    group: 'Du lịch',
                    image: require('../../assets/dulich.png')
                },
                {
                    money: -65846,
                    group: 'Ăn uống',
                    image: require('../../assets/anuong.png')
                }, 
                {
                    money: 23354,
                    group: 'Tiền mạng',
                    image: require('../../assets/tienmang.png')
                },
                {
                    money:-780546,
                    group: 'Quà tặng',
                    image: require('../../assets/quatang.png')
                },
                {
                    money:5472,
                    group: 'Sức khỏe',
                    image: require('../../assets/suckhoe.png')
                },
                {
                    money:479,
                    group: 'Thời trang',
                    image: require('../../assets/thoitrang.png')
                },
            ]
        }
    ]

    const ref = useRef(null);
    const [index, setIndex] = useState(0);

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

    return(
        <View>
            <View style = {{alignItems:'center', backgroundColor:'white', paddingTop: 10}}>
                <FlatList
                    ref={ref}
                    initialScrollIndex = {index}
                    data={data}
                    keyExtractor={(item, index) => index}
                    contentContainerStyle={{ paddingLeft: 10 }}
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
                {data[index].data.length != 0 ?
                    <View>
                        <View style = {styles.container}>
                            <View style = {styles.containerheader}>
                                <View >
                                    <Text style = {[styles.text, {fontSize: 15}]}>Tổng cộng</Text>
                                    <Text style = {[styles.text, {fontSize: 20}]}>{data[index].moneyall.toLocaleString()}</Text>
                                </View>
                                <View>
                                    <Text style = {[styles.text, {fontSize: 15}]}>Trung bình hàng ngày</Text>
                                    <Text style = {[styles.text, {fontSize: 20}]}>{(data[index].moneyall / 30).toLocaleString()}</Text>
                                </View>
                            </View>
                            <View style = {styles.containergraphic}>
                                <Image
                                    source={require('../../assets/dollar.png')}
                                    style = {{width: 150, height: 150}}
                                />
                            </View>
                        </View>
                        <View style  = {{paddingHorizontal: 10}}>
                            {data[index].data.map((value, index) =>(
                                <InfoTitle
                                    key={index}
                                    titlel={value.group}
                                    money={value.money}
                                    imageleft={value.image}
                                    style = {styles.bordertop}
                                />
                            ))

                            }
                        </View>
                    </View>
                :
                    <View style = {{justifyContent:'center', alignItems:'center', height:600, gap:5}}>
                        <Image
                            source={require('../../assets/dollar.png')}
                            style = {{width:100, height:100}}
                        />
                        <Text style = {{fontWeight:'bold'}}>Không có dữ liệu để hiện thị</Text>
                    </View>
                }
            </ScrollView>
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