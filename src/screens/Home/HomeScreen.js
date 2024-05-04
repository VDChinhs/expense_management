import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import InfoTitle from "../../components/InfoTitle";
import SwitchButton from "../../components/SwitchButton";
import { BarChart } from "react-native-chart-kit";
import { useState, useCallback } from "react";
import { getFullDate } from "../../process/Date";

import { useDispatch, useSelector } from "react-redux";
import { setMyWalleting } from "../../redux/reducers/walletReducer";
import { setTradeCharHome } from "../../redux/reducers/tradeReducer";
import LoadingIndicator from "../../components/LoadingIndicator";

export default function HomeScreen({ navigation }) {
    const { _myWallet } = useSelector(state => state.walletReducer)
    const {
        _tradeMostMonth, isTradeCharHome, _tradeMostWeek, _tradeRecent,
        isLoadingMMonth, isLoadingMWeek, isLoadingRecent

    } = useSelector(state => state.tradeReducer)
    const dispatch = useDispatch()

    const [isselecttab, setSelectedTab] = useState(true)
    const [isshowmoney, setShowMoney] = useState(true)

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    });

    return (
        <View>
            {isLoadingMMonth || isLoadingMWeek || isLoadingRecent ?
                <View style={{ height: '100%', justifyContent: 'center', alignContent: 'center' }}>
                    {/* <ActivityIndicator color={'black'} size={'large'} /> */}
                    <LoadingIndicator size={40} color={'black'} />
                </View>
                :
                <ScrollView style={{
                    // backgroundColor: '#F9C4BA'
                }}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <View style={styles.containertop}>
                        <View>
                            <View style={styles.containersodu}>
                                {isshowmoney ?
                                    <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
                                        {_myWallet.reduce((acc, item) => acc + item.money, 0).toLocaleString()} đ
                                    </Text>
                                    :
                                    <Text style={{ fontSize: 25, fontWeight: 'bold' }}>********* đ</Text>
                                }
                                <TouchableOpacity onPress={() => setShowMoney(!isshowmoney)}>
                                    {isshowmoney ?
                                        <Image
                                            source={require('../../assets/eye.png')}
                                            style={{ width: 16, height: 16 }}
                                        />
                                        :
                                        <Image
                                            source={require('../../assets/eye-crossed.png')}
                                            style={{ width: 16, height: 16 }}
                                        />
                                    }
                                </TouchableOpacity>
                            </View>
                            <Text style={{ fontSize: 13, fontWeight: 'bold' }}>Tổng số dư</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.jumpTo('Account')}
                        >
                            <Image
                                source={require('../../assets/man.png')}
                                style={styles.imageheder}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.border}>
                            <View style={styles.containerheader}>
                                <Text style={styles.text}>Ví của tôi</Text>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('MyWallet')}
                                >
                                    <Text style={styles.text}>Xem tất cả</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                {_myWallet.slice(0, 3).map((value, fIndex) => (
                                    <InfoTitle
                                        key={fIndex}
                                        width={'92%'}
                                        titlel={value.name}
                                        money={value.money}
                                        imageleft={{ uri: value.image }}
                                        onPress={() => {
                                            dispatch(setMyWalleting(value))
                                            navigation.navigate('Trade')
                                        }}
                                    />
                                ))}
                            </View>
                        </View>

                        <View>
                            <View style={styles.containerheader}>
                                <Text style={styles.text}>Báo cáo chi tiêu</Text>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('ReportScreen')}
                                >
                                    <Text style={styles.text}>Xem báo cáo</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.border}>
                                <View style={{
                                    alignItems: 'center',
                                    marginTop: 20
                                }}>
                                    <SwitchButton
                                        titlel={'Tuần'}
                                        titler={'Tháng'}
                                        onPressl={() => {
                                            dispatch(setTradeCharHome(_tradeMostWeek))
                                            setSelectedTab(false)
                                        }}
                                        onPressr={() => {
                                            dispatch(setTradeCharHome(_tradeMostMonth))
                                            setSelectedTab(true)
                                        }}
                                        value={isselecttab}
                                    >
                                    </SwitchButton>
                                </View>
                                <View>
                                    <View style={{ margin: 15 }}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                                            {isTradeCharHome.sum.toLocaleString()} đ
                                        </Text>
                                        {isselecttab ?
                                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Tổng chi tháng này</Text>
                                            :
                                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Tổng chi tuần này</Text>
                                        }
                                    </View>
                                    <View style={styles.containergraphic}>
                                        <BarChart
                                            data={isTradeCharHome}
                                            width={300}
                                            height={220}
                                            yAxisSuffix=" Tr"
                                            fromZero={true}
                                            withInnerLines={false}
                                            showValuesOnTopOfBars={true}
                                            chartConfig={{
                                                decimalPlaces: 1,
                                                barRadius: 5,
                                                backgroundGradientFrom: "white",
                                                backgroundGradientTo: "white",
                                                color: () => 'black',
                                                labelColor: () => 'black',
                                            }}
                                        />
                                    </View>
                                </View>
                                <View style={styles.containerheader}>
                                    <Text style={styles.text}>Chi tiêu nhiều nhất</Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    {isTradeCharHome.valuesChiTieu.length == 0 ?
                                        <View style={{ width: '92%', padding: 50, alignItems: 'center' }}>
                                            <Text style={styles.text}>Không có dữ liệu</Text>
                                        </View>
                                        :
                                        <View>
                                            {isTradeCharHome.valuesChiTieu.map((value, fIndex) => (
                                                <InfoTitle
                                                    key={fIndex}
                                                    width={'92%'}
                                                    titlel={value.group.name}
                                                    titles={value.money}
                                                    titleright={value.percent}
                                                    imageleft={{ uri: value.group.image }}
                                                    imageleftsmall={{ uri: value.wallet.image }}
                                                />
                                            ))}
                                        </View>
                                    }
                                </View>
                            </View>
                        </View>

                        <View style={{ width: '92%' }}>
                            <View style={styles.containerheader}>
                                <Text style={styles.text}>Giao dịch gần đây</Text>
                                <TouchableOpacity
                                    onPress={() => navigation.jumpTo('Trade')}
                                >
                                    <Text style={styles.text}>Xem tất cả</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.border}>
                                <View style={{ alignItems: 'center' }}>
                                    {_tradeRecent.length == 0 ?
                                        <View style={{ paddingTop: 30, paddingBottom: 30, alignItems: 'center' }}>
                                            <Text style={styles.text}>Không có dữ liệu</Text>
                                        </View>
                                        :
                                        <View>
                                            {_tradeRecent.map((value, fIndex) => (
                                                <InfoTitle
                                                    key={fIndex}
                                                    width={'92%'}
                                                    titlel={value.groupId.name}
                                                    titles={getFullDate(value.date)}
                                                    money={value.money}
                                                    imageleft={{ uri: value.groupId.image }}
                                                    imageleftsmall={{ uri: value.walletId.image }}
                                                    onPress={() => navigation.navigate({
                                                        name: 'EditTradeScreen',
                                                        params: { trade: value }
                                                    })}
                                                />
                                            ))}
                                        </View>
                                    }
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: 10,
        marginBottom: 80
    },
    containertop: {
        marginTop: 45,
        marginBottom: 20,
        marginHorizontal: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    containersodu: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    imageheder: {
        width: 35,
        height: 35
    },
    containergraphic: {
        alignItems: 'center'
    },
    containerheader: {
        margin: '5%',
        marginVertical: 12.5,
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    text: {
        fontWeight: 'bold'
    },
    border: {
        borderRadius: 15,
        paddingVertical: 10,
        backgroundColor: 'white'
    }
})