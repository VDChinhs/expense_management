import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator, RefreshControl } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from "../context/AuthContext";
import HeaderRight from "../components/HeaderRight";
import { myGroup } from "../process/GroupController";

function ChiScreen({ navigation, route }) {
    // const data = [
    //     {
    //         root: {name: 'Family', image: require('../assets/anuong.png')},
    //         node: [
    //             {name:'Ăn uống', image: require('../assets/anuong.png')},
    //             {name:'Tiền mạng', image: require('../assets/tienmang.png')},
    //             {name:'Sức khỏe', image: require('../assets/suckhoe.png')},
    //         ],
    //     },
    //     {
    //         root: {name: 'Entertaiment', image: require('../assets/thoitrang.png')},
    //         node: [
    //             {name:'Thời trang', image: require('../assets/thoitrang.png')},
    //             {name:'Di chuyển', image: require('../assets/dichuyen.png')},
    //             {name:'Thú cưng', image: require('../assets/thucung.png')},
    //             {name:'Giáo dục', image: require('../assets/giaoduc.png')},
    //         ]
    //     },
    //     {
    //         root: {name: 'Game', image: require('../assets/tiennuoc.png')},
    //         node: [
    //             {name:'Tiền nước', image: require('../assets/tiennuoc.png')},
    //             {name:'Tiền điện', image: require('../assets/tiendien.png')},
    //             {name:'Giải trí', image: require('../assets/giaitri.png')},
    //             {name:'Quà tặng', image: require('../assets/quatang.png')},
    //             {name:'Du lịch', image: require('../assets/dulich.png')},
    //         ]
    //     },
    // ]
    const state = route.params;

    const {userToken, isWalleting} = useContext(AuthContext);
    const [isBack, SetBack] = useState('');
    const [isChoose, SetChoose] = useState(false);
    const [isGroup, SetGroup] = useState(undefined);

    const [values, setValues] = useState(values);
    const [isLoading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    async function getMyParent(type) {
        var data = await myGroup(userToken, type, isWalleting._id)
        setValues(data)
        setLoading(false)
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getMyParent(0)
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    });

    useEffect(() => {
        getMyParent(0)
        if (state.route.params?.back) {
            SetBack(state.route.params?.back)
        }
        if (state.route.params?.type == 'choose') {
            SetChoose(true)
        }
        if (state.route.params?.group != null) {
            SetGroup(state.route.params?.group)
        }
    },[]);

    return (
        <View>
            {isLoading ? 
                <View style = {{height: 500, justifyContent:'center', alignContent:'center'}}>
                    <ActivityIndicator color={'balck'} size={'large'}/>
                </View>
            :
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <View style = {styles.container}>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate({
                                name:'AddGroupScreen',
                                params: {type:'Khoản chi'}
                            })}
                        >
                            <View style = {styles.containeraddgroup}>
                                <Image
                                    source={Number(require('../assets/add.png'))}
                                    style = {styles.imageleft}
                                />
                                <Text style = {styles.textl}>Nhóm mới</Text>
                            </View>
                        </TouchableOpacity>
                        {values.map((value, fIndex) => (
                            <View key={fIndex} style = {{backgroundColor:'white'}}>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (isChoose) {
                                            navigation.navigate(isBack, {group: value.root});
                                        }
                                        else{
                                            navigation.navigate({
                                                name:'EditGroupScreen',
                                                params: {group: value.root, type:'Khoản chi' }
                                            });
                                        }
                                    }}
                                >
                                    <View style = {styles.containerroot}>
                                        <View style = {styles.rootleft}>
                                            <Image
                                                source={Number(value.root.image)}
                                                style = {styles.imageleft}
                                            />
                                            <View style = {styles.containertext}>
                                                <Text style = {styles.textl}>{value.root.name}</Text>
                                                <Text style = {styles.texts}>{isWalleting.name}</Text>
                                            </View>
                                        </View>
                                        {
                                            !isChoose &&
                                            <Image
                                                source={Number(require('../assets/angle-small-right.png'))}
                                                style = {styles.imageright}
                                            />
                                        }
                                        {
                                            isGroup == value.root.name && 
                                            <Image
                                                source={Number(require('../assets/check-mark.png'))}
                                                style = {styles.imageright}
                                            />
                                        }
                                    </View>
                                </TouchableOpacity>
                                {(value.node.length != 0) && value.node.map((item, fIndex) => (
                                    <TouchableOpacity
                                        key={fIndex}
                                        onPress={() => {
                                            if(isChoose){
                                                navigation.navigate(isBack, {group: item});
                                            }
                                            else{
                                                navigation.navigate({
                                                    name:'EditGroupScreen',
                                                    params: {group: item, type:'Khoản chi' }
                                                });
                                            }
                                    }}
                                    >
                                        <View style = {styles.containernode}>
                                            <View style = {styles.nodeleft}>
                                                <Image
                                                    source={Number(item.image)}
                                                    style = {styles.imageleft}
                                                />
                                                <View style = {styles.containertext}>
                                                    <Text style = {styles.textl}>{item.name}</Text>
                                                    <Text style = {styles.texts}>{isWalleting.name}</Text>
                                                </View>
                                            </View>
                                            {
                                                !isChoose &&
                                                <Image
                                                    source={Number(require('../assets/angle-small-right.png'))}
                                                    style = {styles.imageright}
                                                />
                                            }
                                            {
                                            isGroup == item.name && 
                                            <Image
                                                source={Number(require('../assets/check-mark.png'))}
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
            }
        </View>
    );
}

function ThuScreen({ navigation, route }) {
    // const data = [
    //     {
    //         root: {name: 'Xã Hội', image: require('../assets/anuong.png')},
    //         node: [
    //             {name:'Gia đình', image: require('../assets/anuong.png')},
    //             {name:'Công việc', image: require('../assets/tienmang.png')},
    //             {name:'Sở thích', image: require('../assets/suckhoe.png')},
    //         ],
    //     },
    //     {
    //         root: {name: 'Công ty', image: require('../assets/thoitrang.png')},
    //         node: [
    //             {name:'Thưởng', image: require('../assets/thoitrang.png')},
    //             {name:'Lãi', image: require('../assets/dichuyen.png')},
    //             {name:'Xổ số', image: require('../assets/thucung.png')},
    //         ]
    //     },
    // ]
    const state = route.params;

    const {userToken, isWalleting} = useContext(AuthContext);
    const [isBack, SetBack] = useState('');
    const [isChoose, SetChoose] = useState(false);
    const [isGroup, SetGroup] = useState(undefined);

    const[values, setValues] = useState(values);
    const [isLoading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    async function getMyParent(type) {
        var data = await myGroup(userToken, type, isWalleting._id)
        setValues(data)
        setLoading(false)
    }    

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getMyParent(1)
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    });

    useEffect(() => {
        getMyParent(1)
        if (state.route.params?.back) {
            SetBack(state.route.params?.back)
        }
        if (state.route.params?.type == 'choose') {
            SetChoose(true)
        }
        if (state.route.params?.group) {
            SetGroup(state.route.params?.group)
        }
    }, []);

    return (
        <View>
            {isLoading ? 
                <View style = {{height: 500, justifyContent:'center', alignContent:'center'}}>
                    <ActivityIndicator color={'balck'} size={'large'}/>
                </View>
            :
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <View style = {styles.container}>
                        <TouchableOpacity onPress={() => navigation.navigate({
                                name:'AddGroupScreen',
                                params: {type:'Khoản thu'}
                            })}
                        >
                            <View style = {styles.containeraddgroup}>
                                <Image
                                    source={Number(require('../assets/add.png'))}
                                    style = {styles.imageleft}
                                />
                                <Text style = {styles.textl}>Nhóm mới</Text>
                            </View>
                        </TouchableOpacity>
                        {values.map((value, fIndex) => (
                            <View key={fIndex} style = {{backgroundColor:'white'}}>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (isChoose){
                                            navigation.navigate(isBack, {group: value.root});
                                        }
                                        else{
                                            navigation.navigate({
                                                name:'EditGroupScreen',
                                                params: {group: value.root, type:'Khoản thu' }
                                            });
                                        }
                                    }}
                                >
                                    <View style = {styles.containerroot}>
                                        <View style = {styles.rootleft}>
                                            <Image
                                                source={Number(value.root.image)}
                                                style = {styles.imageleft}
                                            />
                                            <View style = {styles.containertext}>
                                                <Text style = {styles.textl}>{value.root.name}</Text>
                                                <Text style = {styles.texts}>{isWalleting.name}</Text>
                                            </View>
                                        </View>
                                        {
                                            !isChoose &&
                                            <Image
                                                source={Number(require('../assets/angle-small-right.png'))}
                                                style = {styles.imageright}
                                            />
                                        }
                                        {
                                            isGroup == value.root.name && 
                                            <Image
                                                source={Number(require('../assets/check-mark.png'))}
                                                style = {styles.imageright}
                                            />
                                        }
                                    </View>
                                </TouchableOpacity>
                                {(value.node.length != 0) && value.node.map((item, fIndex) => (
                                    <TouchableOpacity
                                        key={fIndex}
                                        onPress={() => {
                                            if (isChoose){
                                                navigation.navigate(isBack, {group: item});
                                            }
                                            else{
                                                navigation.navigate({
                                                    name:'EditGroupScreen',
                                                    params: {group: value, type:'Khoản thu' }
                                                });
                                            }
                                    }}
                                    >
                                        <View style = {styles.containernode}>
                                            <View style = {styles.nodeleft}>
                                                <Image
                                                    source={Number(item.image)}
                                                    style = {styles.imageleft}
                                                />
                                                <View style = {styles.containertext}>
                                                    <Text style = {styles.textl}>{item.name}</Text>
                                                    <Text style = {styles.texts}>{isWalleting.name}</Text>
                                                </View>
                                            </View>
                                            {
                                                !isChoose &&
                                                <Image
                                                    source={Number(require('../assets/angle-small-right.png'))}
                                                    style = {styles.imageright}
                                                />
                                            }
                                            {
                                            isGroup == item.name && 
                                            <Image
                                                source={Number(require('../assets/check-mark.png'))}
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
            }
        </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function TabsTopGroup({navigation, route}) {

    const {isWalleting ,setWalleting} = useContext(AuthContext);

    useEffect(() => {   
        if (route.params?.wallet) {
            setWalleting(route.params?.wallet)
        }
    },[route]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => 
                <HeaderRight 
                    image1={isWalleting.image}
                    onPress1={() => {
                        navigation.navigate({
                            name:'MyWallet',
                            params: {back: 'ChooseGroup', wallet: isWalleting, type:'choose' }
                        })
                    }}
                    image2={require('../assets/search.png')}
                />  
        });
    },[route]);
    
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
