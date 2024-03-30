import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CardGroup from '../components/CardGroup';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../context/AuthContext";

function ChiScreen({ navigation, route }) {
    const state = route.params;
    const {isWalleting} = useContext(AuthContext);
    const [isBack, SetBack] = useState('');
    const [isChoose, SetChoose] = useState(false);
    const [isGroup, SetGroup] = useState(undefined);
    const data1 = [
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
    const data = [
        {
            root: {name: 'Family', image: require('../assets/anuong.png')},
            node: [
                {name:'Ăn uống', image: require('../assets/anuong.png')},
                {name:'Tiền mạng', image: require('../assets/tienmang.png')},
                {name:'Sức khỏe', image: require('../assets/suckhoe.png')},
            ],
        },
        {
            root: {name: 'Entertaiment', image: require('../assets/thoitrang.png')},
            node: [
                {name:'Thời trang', image: require('../assets/thoitrang.png')},
                {name:'Di chuyển', image: require('../assets/dichuyen.png')},
                {name:'Thú cưng', image: require('../assets/thucung.png')},
                {name:'Giáo dục', image: require('../assets/giaoduc.png')},
            ]
        },
        {
            root: {name: 'Game', image: require('../assets/tiennuoc.png')},
            node: [
                {name:'Tiền nước', image: require('../assets/tiennuoc.png')},
                {name:'Tiền điện', image: require('../assets/tiendien.png')},
                {name:'Giải trí', image: require('../assets/giaitri.png')},
                {name:'Quà tặng', image: require('../assets/quatang.png')},
                {name:'Du lịch', image: require('../assets/dulich.png')},
            ]
        },
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
        <ScrollView>
            <View style = {styles.container}>
                {/* <View style={styles.containertab}>
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
                </View> */}
                <TouchableOpacity 
                    onPress={() => navigation.navigate({
                        name:'AddGroupScreen',
                        params: {type:'Khoản chi'}
                    })}
                >
                    <View style = {styles.containeraddgroup}>
                        <Image
                            source={require('../assets/add.png')}
                            style = {styles.imageleft}
                        />
                        <Text style = {styles.textl}>Nhóm mới</Text>
                    </View>
                </TouchableOpacity>
                {values.map(value => (
                    <View key={value.root.name} style = {{backgroundColor:'white'}}>
                        <TouchableOpacity
                            onPress={() => {
                                isChoose && navigation.navigate(isBack, {namegroup: value.root.name, imagegroup: value.root.image});
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
                                        source={require('../assets/angle-small-right.png')}
                                        style = {styles.imageright}
                                    />
                                }
                                {
                                    isGroup == value.root.name && 
                                    <Image
                                        source={require('../assets/check-mark.png')}
                                        style = {styles.imageright}
                                    />
                                }
                            </View>
                        </TouchableOpacity>
                        {value.node.map(item => (
                            <TouchableOpacity
                                key={item.name}
                                onPress={() => {
                                isChoose && navigation.navigate(isBack, {namegroup: item.name, imagegroup: item.image});
                            }}
                            >
                                <View style = {styles.containernode}>
                                    <View style = {styles.nodeleft}>
                                        <Image
                                            source={item.image}
                                            style = {styles.imageleft}
                                        />
                                        <View style = {styles.containertext}>
                                            <Text style = {styles.textl}>{item.name}</Text>
                                            <Text style = {styles.texts}>{isWalleting}</Text>
                                        </View>
                                    </View>
                                    {
                                        !isChoose &&
                                        <Image
                                            source={require('../assets/angle-small-right.png')}
                                            style = {styles.imageright}
                                        />
                                    }
                                    {
                                    isGroup == item.name && 
                                    <Image
                                        source={require('../assets/check-mark.png')}
                                        style = {styles.imageright}
                                    />
                                    }
                                    <View style = {styles.lineroottop}/>
                                    {(value.node.length - 1 != value.node.indexOf(item)) && <View style = {styles.linerootbot}/>}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

function ThuScreen({ navigation, route }) {
    const state = route.params;
    const [isBack, SetBack] = useState('');
    const [isChoose, SetChoose] = useState(false);
    const [isGroup, SetGroup] = useState(undefined);
    const data1 = [
        {name:'Gia đình', image: require('../assets/anuong.png')},
        {name:'Công việc', image: require('../assets/tienmang.png')},
        {name:'Sở thích', image: require('../assets/suckhoe.png')},
        {name:'Thưởng', image: require('../assets/thoitrang.png')},
        {name:'Lãi', image: require('../assets/dichuyen.png')},
        {name:'Xổ số', image: require('../assets/thucung.png')},
    ]
    const data = [
        {
            root: {name: 'Xã Hội', image: require('../assets/anuong.png')},
            node: [
                {name:'Gia đình', image: require('../assets/anuong.png')},
                {name:'Công việc', image: require('../assets/tienmang.png')},
                {name:'Sở thích', image: require('../assets/suckhoe.png')},
            ],
        },
        {
            root: {name: 'Công ty', image: require('../assets/thoitrang.png')},
            node: [
                {name:'Thưởng', image: require('../assets/thoitrang.png')},
                {name:'Lãi', image: require('../assets/dichuyen.png')},
                {name:'Xổ số', image: require('../assets/thucung.png')},
            ]
        },
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
        <ScrollView>
            <View style = {styles.container}>
                {/* <View style={styles.containertab}>
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
                </View> */}
                <TouchableOpacity onPress={() => navigation.navigate({
                        name:'AddGroupScreen',
                        params: {type:'Khoản thu'}
                    })}
                >
                    <View style = {styles.containeraddgroup}>
                        <Image
                            source={require('../assets/add.png')}
                            style = {styles.imageleft}
                        />
                        <Text style = {styles.textl}>Nhóm mới</Text>
                    </View>
                </TouchableOpacity>
                {values.map(value => (
                    <View key={value.root.name} style = {{backgroundColor:'white'}}>
                        <TouchableOpacity
                            onPress={() => {
                                isChoose && navigation.navigate(isBack, {namegroup: value.root.name, imagegroup: value.root.image});
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
                                        <Text style = {styles.texts}>Gia đình</Text>
                                    </View>
                                </View>
                                {
                                    !isChoose &&
                                    <Image
                                        source={require('../assets/angle-small-right.png')}
                                        style = {styles.imageright}
                                    />
                                }
                                {
                                    isGroup == value.root.name && 
                                    <Image
                                        source={require('../assets/check-mark.png')}
                                        style = {styles.imageright}
                                    />
                                }
                            </View>
                        </TouchableOpacity>
                        {value.node.map(item => (
                            <TouchableOpacity
                                key={item.name}
                                onPress={() => {
                                isChoose && navigation.navigate(isBack, {namegroup: item.name, imagegroup: item.image});
                            }}
                            >
                                <View style = {styles.containernode}>
                                    <View style = {styles.nodeleft}>
                                        <Image
                                            source={item.image}
                                            style = {styles.imageleft}
                                        />
                                        <View style = {styles.containertext}>
                                            <Text style = {styles.textl}>{item.name}</Text>
                                            <Text style = {styles.texts}>Ví tiền</Text>
                                        </View>
                                    </View>
                                    {
                                        !isChoose &&
                                        <Image
                                            source={require('../assets/angle-small-right.png')}
                                            style = {styles.imageright}
                                        />
                                    }
                                    {
                                    isGroup == item.name && 
                                    <Image
                                        source={require('../assets/check-mark.png')}
                                        style = {styles.imageright}
                                    />
                                    }
                                    <View style = {styles.lineroottop}/>
                                    {(value.node.length - 1 != value.node.indexOf(item)) && <View style = {styles.linerootbot}/>}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
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
        gap:15,
        marginTop: 10
    },
    containertab:{
        marginTop:15,
    },
    containeraddgroup:{
        height: 55,
        flexDirection: 'row',
        alignItems:'center',
        paddingLeft: '5%',
        gap: 15,
        backgroundColor:'white'
    },
    containerroot:{
        width:'100%',
        height:55,
        gap: 15,
        paddingLeft:'5%',
        paddingRight:15,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    rootleft:{
        flexDirection:'row',
        gap:15
    },
    containernode:{
        width:'88%',
        height: 55,
        paddingHorizontal: 10,
        marginLeft:'12%',
        paddingRight:15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    nodeleft:{
        flexDirection:'row',
        gap:15
    },
    lineroottop:{
        width:15,
        height:30,
        top:0,
        left:-10,
        borderLeftWidth:1,
        borderBottomWidth:1,
        position:'absolute'
    },
    linerootbot:{
        height:25,
        top:30,
        left:-10,
        borderLeftWidth:1,
        position:'absolute'
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
