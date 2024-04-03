import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView, Dimensions } from "react-native";
import { useState, useRef, useEffect } from "react";
import Button from "../../components/Button";
import InfoTitle from "../../components/InfoTitle";

const data = [
    {
        title: "12/2023",
        moneyin: 32643645,
        moneyout: 54756865,
        data:[
            {
                date: '2023-5-13',
                detail:[
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
                ]
            },
            {
                date:'2023-5-12',
                detail:[
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
        moneyin: 32643645,
        moneyout: 54756865,
        data:[
            {
                date: '2023-5-13',
                detail:[
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
                ]
            },
            {
                date:'2023-5-12',
                detail:[
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
            },
        ]
    },
    {
        title:"Tương lai",
        data:[]
    }
]

export default function TradeScreen({ navigation, route }) {
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

    return (
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
                    <View style = {{gap: 25, marginBottom: 170}}>
                        <View style = {[styles.containercalcu, styles.borderbottom, styles.bordertop]}>
                            <View style = {{gap:5, marginTop: 20}}>
                                <View style = {styles.containertextcalcu}>
                                    <Text style = {styles.textcalcu}>Tiền vào</Text>
                                    <Text style = {[styles.textcalcu, {color: 'green'}]}>
                                        {data[index].moneyin.toLocaleString()}
                                    </Text>
                                </View>

                                <View style = {styles.containertextcalcu}>
                                    <Text style = {styles.textcalcu}>Tiền ra</Text>
                                    <Text style = {[styles.textcalcu, {color: 'red'}]}>
                                        {data[index].moneyout.toLocaleString()}
                                    </Text>
                                </View>
                                
                                <View style = {{flexDirection:'row', justifyContent:'flex-end'}}>
                                    <Text style = {styles.textcalcu}>
                                        {(data[index].moneyin - data[index].moneyout).toLocaleString()}
                                    </Text>
                                </View>
                            </View>
                            <Button
                                title={'Xem báo cáo trong giai đoạn này'}
                                style={{width: 270, height: 40}}
                                onPress={() => navigation.navigate('ReportScreen')}
                            />
                        </View>
                        {data[index].data.map((value, indexvalue) => (
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
                                    titlel={'Chủ nhật'}
                                    titles={'Tháng 2 2024'}
                                    money={value.detail.reduce((total, item) => total + item.money, 0)}
                                    numberleft={'09'}
                                    style = {styles.borderbottom}
                                />
                                {value.detail.map((item, indexitem) =>(
                                    <InfoTitle
                                        key={indexitem}
                                        titlel={item.group}
                                        money={item.money}
                                        imageleft={item.image}
                                        styleimageleft={{
                                            marginLeft: 5,
                                            marginRight: 10,
                                        }}
                                    />
                                ))}
                            </View>
                        ))}
                    </View>
                :
                    <View style = {{justifyContent:'center', alignItems:'center', height: 500, gap:5}}>
                        <Image
                            source={require('../../assets/dollar.png')}
                            style = {{width:100, height:100}}
                        />
                        <Text style = {{fontWeight:'bold'}}>Chạm + để thêm giao dịch</Text>
                    </View>
                }
            </ScrollView>
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