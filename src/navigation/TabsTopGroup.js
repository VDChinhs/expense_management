import * as React from 'react';
import { View, StyleSheet,TouchableOpacity, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CardGroup from '../components/CardGroup';
import { useState, useEffect } from 'react';

function ChiScreen({ navigation, route }) {
    const state = route.params;
    const [ischoose, SetChoose] = useState(false);
    const [isGroup, SetGroup] = useState(undefined);
    useEffect(() => {
        if (state.route.params?.type == 'choose') {
            SetChoose(true)
        }
        if (state.route.params?.group != null) {
            SetGroup(state.route.params?.group)
        }
    });

    values = [
        {name:'Ăn uống', image: require('../assets/anuong.png')},
        {name:'Tiền mạng', image: require('../assets/tienmang.png')},
        {name:'Sức khỏe', image: require('../assets/suckhoe.png')},
        {name:'Thời trang', image: require('../assets/thoitrang.png')},
        {name:'Di chuyển', image: require('../assets/dichuyen.png')},
        {name:'Thú cưng', image: require('../assets/thucung.png')},
        {name:'Giáo dục', image: require('../assets/giaoduc.png')},
        {name:'Tiền nước', image: require('../assets/tiennuoc.png')},
        {name:'Tiền điện', image: require('../assets/tiendien.png')},
        {name:'Giải trí', image: require('../assets/giaitri.png')},
        {name:'Quà tặng', image: require('../assets/quatang.png')},
        {name:'Du lịch', image: require('../assets/dulich.png')},
        {name:'Du lịch', image: require('../assets/dulich.png')},
        {name:'Du lịch', image: require('../assets/dulich.png')},
        {name:'Du lịch', image: require('../assets/dulich.png')},
    ];

    return (
        <ScrollView style = {styles.scroll}>
            <View style={styles.container}>
                {values.map(value => (
                    <CardGroup 
                        title={value.name} 
                        image={value.image}
                        style = {{ backgroundColor: isGroup == value.name ? 'powderblue':'white'}}
                        onPress={() => {
                            ischoose && navigation.navigate('AddTrade', {namegroup: value.name});
                        }}
                    />
                ))}
                <TouchableOpacity>
                    <CardGroup image={require('../assets/themnhom.png')}/>
                </TouchableOpacity>
            </View>
        </ScrollView>
  );
}

function ThuScreen({ navigation, route }) {
    const state = route.params;
    const [choose, isChoose] = useState(false);
    const [isGroup, SetGroup] = useState(undefined);

    useEffect(() => {
        if (state.route.params?.type == 'choose') {
            isChoose(true)
        }
        if (state.route.params?.group) {
            SetGroup(state.route.params?.group)
        }
    });

    values = [
        {name:'Gia đình',image: require('../assets/anuong.png')},
        {name:'Công việc',image: require('../assets/tienmang.png')},
        {name:'Sở thích',image: require('../assets/suckhoe.png')},
        {name:'Thưởng',image: require('../assets/thoitrang.png')},
        {name:'Lãi',image: require('../assets/dichuyen.png')},
        {name:'Xổ số',image: require('../assets/thucung.png')},
    ];

    return (
        <ScrollView>
            <View style={styles.container}>
                {values.map(value => (
                    <TouchableOpacity>
                        <CardGroup 
                            title={value.name} 
                            image={value.image}
                            style = {{ backgroundColor: isGroup == value.name ? 'powderblue':'white'}}
                            onPress={() => {
                                choose && navigation.navigate('AddTrade', {namegroup: value.name});
                            }}
                        />
                    </TouchableOpacity>
                ))}
                <TouchableOpacity>
                    <CardGroup image={require('../assets/themnhom.png')}/>
                </TouchableOpacity>
            </View>
        </ScrollView>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function TabsTopGroup({route}) {
    return (
        <Tab.Navigator
            initialRouteName='GroupChi'
            screenOptions={{
                tabBarStyle:{
                    height:40,
                },
                tabBarLabelStyle: {
                    margin:-10,
                    fontSize: 13,
                    fontWeight:'bold' 
                },
            }}
        >
            <Tab.Screen name="GroupChi" component={ChiScreen} options={{title:"KHOẢN CHI"}} initialParams={{ route: route }}/>
            <Tab.Screen name="Groupthu" component={ThuScreen} options={{title:"KHOẢN THU"}} initialParams={{ route: route }}/>
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container:{
        width:330,
        marginLeft:15,
        marginVertical:15,
        gap:20,
        justifyContent:"flex-start",
        alignItems:"center",
        flexDirection:'row',
        flexWrap: 'wrap',
    },
    scroll:{
        // backgroundColor:'#FFD3D3',
    }
})
