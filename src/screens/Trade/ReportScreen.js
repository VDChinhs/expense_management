import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView, Dimensions } from "react-native";
import { useState, useRef, useEffect } from "react";
import Button from "../../components/Button";
import InfoTitle from "../../components/InfoTitle";

const data = [
    {
        key:0,
        title:"12/2023",
        data:{}
    },
    {
        key:1,
        title:"01/2024",
        data:{}
    },
    {
        key:2,
        title:"02/2024",
        data:{}
    },
    {
        key:3,
        title:"03/2024",
        data:{}
    },
    {
        key:4,
        title:"Tháng trước",
        data:{}
    },
    {
        key:5,
        title:"Tháng này",
        data:{}
    },
    {
        key:6,
        title:"Tương lai",
        data:{}
    }
]

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
                <View style = {{marginBottom: 100}}>
                    <View style = {styles.border}>
                        <View style = {styles.containerheader}>
                            <View>
                                <Text style = {[styles.text, {fontSize: 18}]}>Thu nhập ròng</Text>
                                <Text style = {[styles.text, {fontSize: 16}]}>10,000,000</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('ReportScreen')}
                            >
                                <Text style = {styles.text}>Xem chi tiết</Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {styles.containergraphic}>
                            <Image
                                source={require('../../assets/dollar.png')}
                                style ={{width: 200, height:200}}
                            />
                        </View>
                    </View>
                    <View style = {styles.border}>
                        <View style = {styles.containerheader}>
                            <View>
                                <Text style = {[styles.text, {fontSize: 18}]}>Khoản thu</Text>
                                <Text style = {[styles.text, {fontSize: 16, color: 'green'}]}>10,000,000</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('DetailReportScreen', {title: 'Chi tiết khoản thu'})}
                            >
                                <Text style = {styles.text}>Xem chi tiết</Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {styles.containergraphic}>
                            <Image
                                source={require('../../assets/dollar.png')}
                                style ={{width: 200, height:200}}
                            />
                        </View>
                    </View>
                    <View style = {styles.border}>
                        <View style = {styles.containerheader}>
                            <View>
                                <Text style = {[styles.text, {fontSize: 18}]}>Khoản chi</Text>
                                <Text style = {[styles.text, {fontSize: 16, color: 'red'}]}>10,000,000</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('DetailReportScreen', {title: 'Chi tiết khoản chi'})}
                            >
                                <Text style = {styles.text}>Xem chi tiết</Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {styles.containergraphic}>
                            <Image
                                source={require('../../assets/dollar.png')}
                                style ={{width: 200, height:200}}
                            />
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