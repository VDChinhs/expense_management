import * as React from 'react';
import { View, StyleSheet,TouchableOpacity, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CardGroup from '../components/CardGroup';
import { useState, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';

function ChiScreen({ navigation, route }) {
    const state = route.params;
    const [isBack, SetBack] = useState('');
    const [isChoose, SetChoose] = useState(false);
    const [isGroup, SetGroup] = useState(undefined);
    const data = [
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
    ]
    const [values, setValues] = useState(data);

    useEffect(() => {
        if (state.route.params?.back) {
            SetBack(state.route.params?.back)
        }
        if (state.route.params?.type == 'choose') {
            SetChoose(true)
        }
        if (state.route.params?.group != null) {
            SetGroup(state.route.params?.group)
        }
    });

    return (
        // <ScrollView style = {styles.scroll}>
            <View style={styles.containertab}>
                <FlatList
                        data={values}
                        keyExtractor={(item) => item.name}
                        numColumns={3}
                        columnWrapperStyle = {{gap: 20}}
                        contentContainerStyle ={{gap: 20, paddingHorizontal:10}}
                        showsVerticalScrollIndicator= {false}
                        renderItem={({item}) => {
                            return(
                                <TouchableOpacity>
                                    <CardGroup 
                                        key={item.name}
                                        title={item.name} 
                                        image={item.image}
                                        style = {{ backgroundColor: isGroup == item.name ? 'powderblue':'white'}}
                                        onPress={() => {
                                            isChoose && navigation.navigate(isBack, {namegroup: item.name, imagegroup: item.image});
                                        }}
                                    />
                                </TouchableOpacity>
                            )
                        }}
                    />
            </View>
        // </ScrollView>
    );
}

function ThuScreen({ navigation, route }) {
    const state = route.params;
    const [isBack, SetBack] = useState('');
    const [isChoose, SetChoose] = useState(false);
    const [isGroup, SetGroup] = useState(undefined);
    const data = [
        {name:'Gia đình', image: require('../assets/anuong.png')},
        {name:'Công việc', image: require('../assets/tienmang.png')},
        {name:'Sở thích', image: require('../assets/suckhoe.png')},
        {name:'Thưởng', image: require('../assets/thoitrang.png')},
        {name:'Lãi', image: require('../assets/dichuyen.png')},
        {name:'Xổ số', image: require('../assets/thucung.png')},
    ]
    const[values, setValues] = useState(data);

    useEffect(() => {
        if (state.route.params?.back) {
            SetBack(state.route.params?.back)
        }
        if (state.route.params?.type == 'choose') {
            SetChoose(true)
        }
        if (state.route.params?.group) {
            SetGroup(state.route.params?.group)
        }
    });

    return (
        // <ScrollView>
            <View style={styles.containertab}>
                <FlatList
                    data={values}
                    keyExtractor={(item) => item.name}
                    numColumns={3}
                    columnWrapperStyle = {{gap: 20}}
                    contentContainerStyle ={{gap: 20, paddingHorizontal: 10}}
                    showsVerticalScrollIndicator= {false}
                    renderItem={({item}) => {
                        return(
                            <TouchableOpacity>
                                <CardGroup 
                                    key={item.name}
                                    title={item.name} 
                                    image={item.image}
                                    style = {{ backgroundColor: isGroup == item.name ? 'powderblue':'white'}}
                                    onPress={() => {
                                        isChoose && navigation.navigate(isBack, {namegroup: item.name, imagegroup: item.image});
                                    }}
                                />
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
        // </ScrollView>
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
        width:'100%',
        paddingHorizontal:23,
        marginVertical:15,
        gap:24,
        justifyContent:"flex-start",
        alignItems:"center",
        flexDirection:'row',
        flexWrap: 'wrap',
        // backgroundColor:'red'
    },
    scroll:{
        // backgroundColor:'#FFD3D3',
    },
    containertab:{
        marginTop:15,
        // backgroundColor:'red',
        // justifyContent:'space-between'
    }
})
