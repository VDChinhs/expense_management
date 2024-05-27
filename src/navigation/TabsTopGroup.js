import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator, RefreshControl } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useState, useEffect, useCallback } from 'react';
import HeaderRight from "../components/HeaderRight";

import { useSelector } from 'react-redux';
import LoadingIndicator from '../components/LoadingIndicator';

function ChiScreen({ navigation, route }) {
    const state = route.params;

    const [isBack, SetBack] = useState('');
    const [isChoose, SetChoose] = useState(false);
    const [isGroup, SetGroup] = useState({ name: '' });
    const [refreshing, setRefreshing] = useState(false);

    const { _myGroupChi, isLoadingChi } = useSelector(state => state.groupReducer)
    const { _isWalleting } = useSelector(state => state.walletReducer)

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    });

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
    }, []);

    return (
        <View>
            {isLoadingChi ?
                <View style={{ height: '100%', justifyContent: 'center', alignContent: 'center' }}>
                    {/* <ActivityIndicator color={'black'} size={'large'} /> */}
                    <LoadingIndicator size={40} color={'black'} />
                </View>
                :
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <View style={styles.container}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate({
                                name: 'AddGroupScreen',
                                params: { type: 'Khoản chi' }
                            })}
                        >
                            <View style={styles.containeraddgroup}>
                                <Image
                                    source={Number(require('../assets/add.png'))}
                                    style={styles.imageleft}
                                />
                                <Text style={styles.textl}>Nhóm mới</Text>
                            </View>
                        </TouchableOpacity>
                        {_myGroupChi.map((value, fIndex) => (
                            <View key={fIndex} style={{ backgroundColor: 'white' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (isChoose) {
                                            navigation.navigate(isBack, { group: value.root });
                                        }
                                        else {
                                            navigation.navigate({
                                                name: 'EditGroupScreen',
                                                params: { group: value.root }
                                            });
                                        }
                                    }}
                                >
                                    <View style={styles.containerroot}>
                                        <View style={styles.rootleft}>
                                            <Image
                                                source={{ uri: value.root.image }}
                                                style={styles.imageleft}
                                            />
                                            <View style={styles.containertext}>
                                                <Text style={styles.textl}>{value.root.name}</Text>
                                                <Text style={styles.texts}>{_isWalleting.name}</Text>
                                            </View>
                                        </View>
                                        {
                                            !isChoose &&
                                            <Image
                                                source={Number(require('../assets/angle-small-right.png'))}
                                                style={styles.imageright}
                                            />
                                        }
                                        {
                                            isGroup.name == value.root.name &&
                                            <Image
                                                source={Number(require('../assets/check-mark.png'))}
                                                style={styles.imageright}
                                            />
                                        }
                                    </View>
                                </TouchableOpacity>
                                {(value.node.length != 0) && value.node.map((item, fIndex) => (
                                    <TouchableOpacity
                                        key={fIndex}
                                        onPress={() => {
                                            if (isChoose) {
                                                navigation.navigate(isBack, { group: item });
                                            }
                                            else {
                                                navigation.navigate({
                                                    name: 'EditGroupScreen',
                                                    params: { group: item }
                                                });
                                            }
                                        }}
                                    >
                                        <View style={styles.containernode}>
                                            <View style={styles.nodeleft}>
                                                <Image
                                                    source={{ uri: item.image }}
                                                    style={styles.imageleft}
                                                />
                                                <View style={styles.containertext}>
                                                    <Text style={styles.textl}>{item.name}</Text>
                                                    <Text style={styles.texts}>{_isWalleting.name}</Text>
                                                </View>
                                            </View>
                                            {
                                                !isChoose &&
                                                <Image
                                                    source={Number(require('../assets/angle-small-right.png'))}
                                                    style={styles.imageright}
                                                />
                                            }
                                            {
                                                isGroup.name == item.name &&
                                                <Image
                                                    source={Number(require('../assets/check-mark.png'))}
                                                    style={styles.imageright}
                                                />
                                            }
                                            <View style={styles.lineroottop} />
                                            {(value.node.length - 1 != value.node.indexOf(item)) && <View style={styles.linerootbot} />}
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
    const state = route.params;

    const [isBack, SetBack] = useState('');
    const [isChoose, SetChoose] = useState(false);
    const [isGroup, SetGroup] = useState({ name: '' });

    const [refreshing, setRefreshing] = useState(false);

    const { _myGroupThu, isLoadingThu } = useSelector(state => state.groupReducer)
    const { _isWalleting } = useSelector(state => state.walletReducer)

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    });

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
    }, []);

    return (
        <View>
            {isLoadingThu ?
                <View style={{ height: '100%', justifyContent: 'center', alignContent: 'center' }}>
                    {/* <ActivityIndicator color={'black'} size={'large'} /> */}
                    <LoadingIndicator size={40} color={'black'} />
                </View>
                :
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <View style={styles.container}>
                        <TouchableOpacity onPress={() => navigation.navigate({
                            name: 'AddGroupScreen',
                            params: { type: 'Khoản thu' }
                        })}
                        >
                            <View style={styles.containeraddgroup}>
                                <Image
                                    source={Number(require('../assets/add.png'))}
                                    style={styles.imageleft}
                                />
                                <Text style={styles.textl}>Nhóm mới</Text>
                            </View>
                        </TouchableOpacity>
                        {_myGroupThu.map((value, fIndex) => (
                            <View key={fIndex} style={{ backgroundColor: 'white' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (isChoose) {
                                            navigation.navigate(isBack, { group: value.root });
                                        }
                                        else {
                                            navigation.navigate({
                                                name: 'EditGroupScreen',
                                                params: { group: value.root }
                                            });
                                        }
                                    }}
                                >
                                    <View style={styles.containerroot}>
                                        <View style={styles.rootleft}>
                                            <Image
                                                source={{ uri: value.root.image }}
                                                style={styles.imageleft}
                                            />
                                            <View style={styles.containertext}>
                                                <Text style={styles.textl}>{value.root.name}</Text>
                                                <Text style={styles.texts}>{_isWalleting.name}</Text>
                                            </View>
                                        </View>
                                        {
                                            !isChoose &&
                                            <Image
                                                source={Number(require('../assets/angle-small-right.png'))}
                                                style={styles.imageright}
                                            />
                                        }
                                        {
                                            isGroup.name == value.root.name &&
                                            <Image
                                                source={Number(require('../assets/check-mark.png'))}
                                                style={styles.imageright}
                                            />
                                        }
                                    </View>
                                </TouchableOpacity>
                                {(value.node.length != 0) && value.node.map((item, fIndex) => (
                                    <TouchableOpacity
                                        key={fIndex}
                                        onPress={() => {
                                            if (isChoose) {
                                                navigation.navigate(isBack, { group: item });
                                            }
                                            else {
                                                navigation.navigate({
                                                    name: 'EditGroupScreen',
                                                    params: { group: item }
                                                });
                                            }
                                        }}
                                    >
                                        <View style={styles.containernode}>
                                            <View style={styles.nodeleft}>
                                                <Image
                                                    source={{ uri: item.image }}
                                                    style={styles.imageleft}
                                                />
                                                <View style={styles.containertext}>
                                                    <Text style={styles.textl}>{item.name}</Text>
                                                    <Text style={styles.texts}>{_isWalleting.name}</Text>
                                                </View>
                                            </View>
                                            {
                                                !isChoose &&
                                                <Image
                                                    source={Number(require('../assets/angle-small-right.png'))}
                                                    style={styles.imageright}
                                                />
                                            }
                                            {
                                                isGroup.name == item.name &&
                                                <Image
                                                    source={Number(require('../assets/check-mark.png'))}
                                                    style={styles.imageright}
                                                />
                                            }
                                            <View style={styles.lineroottop} />
                                            {(value.node.length - 1 != value.node.indexOf(item)) && <View style={styles.linerootbot} />}
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

export default function TabsTopGroup({ navigation, route }) {

    const { _isWalleting } = useSelector(state => state.walletReducer)

    useEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                <HeaderRight
                    image1={{ uri: _isWalleting.image }}
                    onPress1={() => {
                        navigation.navigate({
                            name: 'MyWallet',
                            params: { back: 'ChooseGroup', wallet: _isWalleting, type: 'choose' }
                        })
                    }}
                    image2={Number(require('../assets/search.png'))}
                    onPress2={() =>
                        navigation.navigate({
                            name: 'SearchGroupScreen',
                            params: route.params
                        })
                    }
                />
        });
    }, [route]);

    return (
        <Tab.Navigator
            initialRouteName='GroupChi'
            screenOptions={{
                tabBarStyle: {
                    height: 40,
                },
                tabBarLabelStyle: {
                    margin: -10,
                    fontSize: 13,
                    fontWeight: 'bold'
                },
            }}
        >
            <Tab.Screen name="GroupChi" component={ChiScreen} options={{ title: "KHOẢN CHI" }} initialParams={{ route: route }} />
            <Tab.Screen name="Groupthu" component={ThuScreen} options={{ title: "KHOẢN THU" }} initialParams={{ route: route }} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 15,
        marginTop: 10
    },
    containertab: {
        marginTop: 15,
    },
    containeraddgroup: {
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '5%',
        gap: 15,
        backgroundColor: 'white'
    },
    containerroot: {
        width: '100%',
        height: 55,
        gap: 15,
        paddingLeft: '5%',
        paddingRight: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    rootleft: {
        flexDirection: 'row',
        gap: 15
    },
    containernode: {
        width: '88%',
        height: 55,
        paddingHorizontal: 10,
        marginLeft: '12%',
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    nodeleft: {
        flexDirection: 'row',
        gap: 15
    },
    lineroottop: {
        width: 15,
        height: 30,
        top: 0,
        left: -10,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        position: 'absolute'
    },
    linerootbot: {
        height: 25,
        top: 30,
        left: -10,
        borderLeftWidth: 1,
        position: 'absolute'
    },
    containertext: {
        justifyContent: 'center'
    },
    textl: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    texts: {
        fontSize: 13
    },
    imageleft: {
        width: 35,
        height: 35
    },
    imageright: {
        width: 24,
        height: 24
    },
})
