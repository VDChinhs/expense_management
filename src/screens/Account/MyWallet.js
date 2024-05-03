import { View, StyleSheet, ScrollView, Text, Image, Dimensions, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import InfoTitle from "../../components/InfoTitle";
import { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";

import { useDispatch, useSelector } from "react-redux";
import { myAllGroupChi, myAllGroupThu, myAllGroupParentChi, myAllGroupParentThu } from "../../redux/actions/groupAction";
import { setMyWalleting } from "../../redux/reducers/walletReducer";
import { myTradeMonths, myTradeReports, myTradeReportDetailChi, myTradeReportDetailThu } from "../../redux/actions/tradeAction";

export default function MyWallet({ navigation, route }) {
    const { userToken } = useContext(AuthContext);

    const [isBack, SetBack] = useState('');
    const [isChoose, SetChoose] = useState(false);
    const [isWallet, SetWallet] = useState({ _id: "" });

    const [refreshing, setRefreshing] = useState(false);

    const dispatch = useDispatch()
    const { isLoading, _myWallet } = useSelector(state => state.walletReducer)

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    });

    useEffect(() => {
        if (route.params?.back) {
            SetBack(route.params?.back)
        }
        if (route.params?.type == 'choose') {
            SetChoose(true)
        }
        if (route.params?.wallet != null) {
            SetWallet(route.params?.wallet)
        }
    }, [navigation, route]);

    return (
        <View>
            {isLoading ?
                <View style={{ height: 600, justifyContent: 'center', alignContent: 'center' }}>
                    <ActivityIndicator color={'black'} size={'large'} />
                </View>
                :
                <View>
                    <ScrollView
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                    >
                        <View style={{ height: Dimensions.get('window').height }}>
                            <View style={styles.container}>
                                {(!isChoose || isBack == 'Trade') &&
                                    <View style={{ marginTop: 30 }}>
                                        <InfoTitle
                                            titlel={'Tổng cộng'}
                                            titles={_myWallet.reduce((acc, item) => acc + item.money, 0)}
                                            imageleft={require('../../assets/world.png')}
                                            imageright={
                                                isWallet == 'Tổng cộng' ? require('../../assets/check-mark.png') : require('../../assets/angle-small-right.png')
                                            }
                                            style={{ backgroundColor: 'white', height: 60 }}
                                            onPress={() => {
                                                isChoose && navigation.navigate(isBack, { namewallet: 'Tổng cộng', imagewallet: require('../../assets/world.png') });
                                            }}
                                        />
                                    </View>
                                }
                                <Text style={styles.text}>Các ví</Text>
                                {_myWallet.map((value, fIndex) => (
                                    <InfoTitle
                                        key={fIndex}
                                        titlel={value.name}
                                        titles={value.money}
                                        imageleft={{ uri: value.image }}
                                        styleimageleft={{ width: 35, height: 35 }}
                                        imageright={
                                            isWallet._id == value._id ? require('../../assets/check-mark.png') : require('../../assets/angle-small-right.png')
                                        }
                                        style={{ backgroundColor: 'white', height: 60 }}
                                        onPress={() => {
                                            if (isChoose) {
                                                navigation.navigate(isBack, { wallet: value });

                                                dispatch(setMyWalleting(value))

                                                dispatch(myAllGroupChi({ userToken: userToken, walletId: value._id }))
                                                dispatch(myAllGroupThu({ userToken: userToken, walletId: value._id }))
                                                dispatch(myAllGroupParentChi({ userToken: userToken, walletId: value._id, type: 0 }))
                                                dispatch(myAllGroupParentThu({ userToken: userToken, walletId: value._id, type: 1 }))

                                                dispatch(myTradeMonths({ userToken: userToken, walletId: value._id }))
                                                dispatch(myTradeReports({ userToken: userToken, walletId: value._id }))
                                                dispatch(myTradeReportDetailChi({ userToken: userToken, walletId: value._id }))
                                                dispatch(myTradeReportDetailThu({ userToken: userToken, walletId: value._id }))
                                            }
                                            else {
                                                navigation.navigate({
                                                    name: 'EditWalletScreen',
                                                    params: { wallet: value }
                                                });
                                            }
                                        }}
                                    />
                                ))}
                            </View>

                        </View>
                    </ScrollView>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('AddWalletScreen')
                            }
                        >
                            <Image
                                source={require('../../assets/plus-small.png')}
                                resizeMode="contain"
                                style={{
                                    width: 40,
                                    height: 40,
                                    tintColor: 'black',
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // marginTop:10,
        // backgroundColor:'white'
    },
    text: {
        margin: 15,
        fontSize: 18,
        fontWeight: 'bold',
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 35,
        right: 50,
        bottom: 120,
        backgroundColor: '#AE4B4B',
        alignItems: "center",
        justifyContent: 'center',
        position: 'absolute',
    }
})