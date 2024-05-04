import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView, Dimensions, RefreshControl, ActivityIndicator } from "react-native";
import { useState, useRef, useEffect, useContext, useCallback } from "react";
import Button from "../../components/Button";
import InfoTitle from "../../components/InfoTitle";
import { getDate, getDay, getWeekMonth } from "../../process/Date";
import { AuthContext } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { setIndexTradeMonths } from "../../redux/reducers/tradeReducer";
import LoadingIndicator from "../../components/LoadingIndicator";


export default function TradeScreen({ navigation }) {
    const { userToken } = useContext(AuthContext);
    const { _isWalleting } = useSelector(state => state.walletReducer)
    const { _tradeMonths, isLoading, indexTradeMonths } = useSelector(state => state.tradeReducer)
    const dispatch = useDispatch()

    const ref = useRef(null);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        dispatch(setIndexTradeMonths(_tradeMonths.length - 2))
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    });

    useEffect(() => {
        ref.current?.scrollToIndex({
            index: indexTradeMonths,
            animated: true,
            viewPosition: 0.5,
        })
    }, [indexTradeMonths])

    return (
        <View>
            {isLoading ?
                <View style={{ height: '100%', justifyContent: 'center', alignContent: 'center' }}>
                    {/* <ActivityIndicator color={'black'} size={'large'} /> */}
                    <LoadingIndicator size={40} color={'black'} />
                </View>
                :
                <View>
                    <View style={{ alignItems: 'center', backgroundColor: 'white', gap: 10 }}>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate({
                                    name: 'MyWallet',
                                    params: { back: 'Trade', wallet: _isWalleting, type: 'choose' }
                                })
                            }
                        >
                            <View style={{
                                gap: 10,
                                paddingHorizontal: 10,
                                paddingVertical: 10,
                                borderRadius: 10,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                backgroundColor: '#FFD3D3',
                                alignItems: 'center'
                            }}
                            >
                                <Image
                                    source={{ uri: _isWalleting.image }}
                                    style={styles.images}
                                />
                                <Text style={{ fontWeight: 'bold' }}>{_isWalleting.name}</Text>
                                <Image
                                    source={Number(require('../../assets/angle-small-right.png'))}
                                    style={[styles.images, { transform: [{ rotate: '90deg' }] }]}
                                />
                            </View>
                        </TouchableOpacity>
                        <FlatList
                            ref={ref}
                            initialScrollIndex={indexTradeMonths}
                            getItemLayout={(data, index) => ({
                                length: (Dimensions.get('screen').width / 3),
                                offset: (Dimensions.get('screen').width / 3) * index,
                                index
                            })}
                            data={_tradeMonths}
                            keyExtractor={(item, index) => index}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            renderItem={({ item, index: fIndex }) => {
                                return (
                                    <TouchableOpacity onPress={() => {
                                        dispatch(setIndexTradeMonths(fIndex))
                                    }}>
                                        <View
                                            style={{
                                                paddingVertical: 5,
                                                width: Dimensions.get('screen').width / 3,
                                                alignItems: 'center',
                                                borderBottomColor: 'black',
                                                borderBottomWidth: fIndex === indexTradeMonths ? 2 : 0,
                                            }}>
                                            <Text style={{
                                                fontWeight: 'bold',
                                                fontSize: 15,
                                                opacity: fIndex === indexTradeMonths ? 1 : 0.5,
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
                    <ScrollView
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                    >
                        {_tradeMonths[indexTradeMonths].data.length != 0 ?
                            <View style={{ gap: 25, marginBottom: 250 }}>
                                <View style={[styles.containercalcu, styles.borderbottom, styles.bordertop]}>
                                    <View style={{ gap: 5, marginTop: 20 }}>
                                        <View style={styles.containertextcalcu}>
                                            <Text style={styles.textcalcu}>Tiền vào</Text>
                                            <Text style={[styles.textcalcu, { color: 'green' }]}>
                                                {_tradeMonths[indexTradeMonths].moneyin.toLocaleString()}
                                            </Text>
                                        </View>

                                        <View style={styles.containertextcalcu}>
                                            <Text style={styles.textcalcu}>Tiền ra</Text>
                                            <Text style={[styles.textcalcu, { color: 'red' }]}>
                                                {_tradeMonths[indexTradeMonths].moneyout.toLocaleString()}
                                            </Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                            <Text style={styles.textcalcu}>
                                                {(_tradeMonths[indexTradeMonths].moneyin - _tradeMonths[indexTradeMonths].moneyout).toLocaleString()}
                                            </Text>
                                        </View>
                                    </View>
                                    <Button
                                        title={'Xem báo cáo trong giai đoạn này'}
                                        style={{ width: 270, height: 40 }}
                                        onPress={() => {
                                            if (indexTradeMonths == _tradeMonths.length - 1) {
                                                dispatch(setIndexTradeMonths(_tradeMonths.length - 2))
                                            }
                                            navigation.navigate('ReportScreen')
                                        }}
                                    />
                                </View>
                                {_tradeMonths[indexTradeMonths].data.map((value, indexvalue) => (
                                    <View
                                        key={indexvalue}
                                        style={[
                                            styles.bordertop,
                                            styles.borderbottom,
                                            {
                                                backgroundColor: 'white',
                                                paddingHorizontal: 5
                                            }
                                        ]}
                                    >
                                        <InfoTitle
                                            titlel={getDay(value.date)}
                                            titles={getWeekMonth(value.date)}
                                            money={value.detail.reduce((total, item) => total + item.money, 0)}
                                            numberleft={getDate(value.date)}
                                            style={styles.borderbottom}
                                        />
                                        {value.detail.map((item, indexitem) => (
                                            <InfoTitle
                                                key={indexitem}
                                                titlel={item.groupId.name}
                                                money={item.money}
                                                imageleft={{ uri: item.groupId.image }}
                                                styleimageleft={{
                                                    marginLeft: 5,
                                                    marginRight: 10,
                                                }}
                                                onPress={() => navigation.navigate({
                                                    name: 'EditTradeScreen',
                                                    params: { trade: item }
                                                })}
                                            />
                                        ))}
                                    </View>
                                ))}
                            </View>
                            :
                            <View style={{ justifyContent: 'center', alignItems: 'center', height: 500, gap: 5 }}>
                                <Image
                                    source={Number(require('../../assets/dollar.png'))}
                                    style={{ width: 100, height: 100 }}
                                />
                                <Text style={{ fontWeight: 'bold' }}>Chạm + để thêm giao dịch</Text>
                            </View>
                        }
                    </ScrollView>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containercalcu: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        alignItems: 'center',
        gap: 30,
        paddingBottom: 10,
    },
    containertextcalcu: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textcalcu: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    images: {
        width: 16,
        height: 16
    },
    borderbottom: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#D3D3D3',
    },
    bordertop: {
        borderTopWidth: 0.5,
        borderTopColor: '#D3D3D3',
    }
})