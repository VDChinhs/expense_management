import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function ChooseGroupCha({navigation, route}) {
    const datachi = [
        {
            root: {name: 'Family', image: require('../../assets/anuong.png')},
            node: [
                {name:'Ăn uống', image: require('../../assets/anuong.png')},
                {name:'Tiền mạng', image: require('../../assets/tienmang.png')},
                {name:'Sức khỏe', image: require('../../assets/suckhoe.png')},
            ],
        },
        {
            root: {name: 'Entertaiment', image: require('../../assets/thoitrang.png')},
            node: [
                {name:'Thời trang', image: require('../../assets/thoitrang.png')},
                {name:'Di chuyển', image: require('../../assets/dichuyen.png')},
                {name:'Thú cưng', image: require('../../assets/thucung.png')},
                {name:'Giáo dục', image: require('../../assets/giaoduc.png')},
            ]
        },
        {
            root: {name: 'Game', image: require('../../assets/tiennuoc.png')},
            node: [
                {name:'Tiền nước', image: require('../../assets/tiennuoc.png')},
                {name:'Tiền điện', image: require('../../assets/tiendien.png')},
                {name:'Giải trí', image: require('../../assets/giaitri.png')},
                {name:'Quà tặng', image: require('../../assets/quatang.png')},
                {name:'Du lịch', image: require('../../assets/dulich.png')},
            ]
        },
    ]

    const datathu = [
        {
            root: {name: 'Xã Hội', image: require('../../assets/anuong.png')},
            node: [
                {name:'Gia đình', image: require('../../assets/anuong.png')},
                {name:'Công việc', image: require('../../assets/tienmang.png')},
                {name:'Sở thích', image: require('../../assets/suckhoe.png')},
            ],
        },
        {
            root: {name: 'Công ty', image: require('../../assets/thoitrang.png')},
            node: [
                {name:'Thưởng', image: require('../../assets/thoitrang.png')},
                {name:'Lãi', image: require('../../assets/dichuyen.png')},
                {name:'Xổ số', image: require('../../assets/thucung.png')},
            ]
        },
    ]
    const {isWalleting} = useContext(AuthContext);
    const [isChoose, SetChoose] = useState(false);
    const [isGroup, SetGroup] = useState(undefined);
    
    useEffect(() => {
        if (route.params?.type == 'choose') {
            SetChoose(true)
        }
        if (route.params?.group != null) {
            SetGroup(route.params?.group)
        }
    });
    const [values, setValues] = useState(route.params?.khoan == 'Khoản chi'? datachi : datathu);

    return (
        <View style = {styles.container}>
            {values.map(value => (
                <View key={value.root.name} >
                    <TouchableOpacity
                        onPress={() => {
                            isChoose && navigation.navigate('AddGroupScreen', {namegroup: value.root.name, imagegroup: value.root.image});
                        }}
                    >
                        <View style = {styles.containerroot}>
                            <View style = {styles.rootleft}>
                                <Image
                                    source={value.root.image}
                                    style = {styles.imageleft}
                                />
                                <View style = {styles.containertext}>
                                    <Text style = {styles.textl}>{value.root.name}</Text>
                                    <Text style = {styles.texts}>{isWalleting}</Text>
                                </View>
                            </View>
                            {
                                !isChoose &&
                                <Image
                                    source={require('../../assets/angle-small-right.png')}
                                    style = {styles.imageright}
                                />
                            }
                            {
                                isGroup == value.root.name && 
                                <Image
                                    source={require('../../assets/check-mark.png')}
                                    style = {styles.imageright}
                                />
                            }
                        </View>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        gap: 15,
        marginTop: 20
    },
    containerroot:{
        width:'100%',
        height:55,
        gap: 15,
        paddingLeft:'5%',
        paddingRight:15,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'white'
    },
    rootleft:{
        flexDirection:'row',
        gap:15
    },
    containertext:{
        justifyContent:'center'
    },
    textl:{
        fontSize:17,
        fontWeight:'bold'
    },
    texts:{
        fontSize:13
    },
    imageleft:{
        width:35,
        height:35
    },
    imageright:{
        width:24,
        height:24
    },
})