import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView, Dimensions, RefreshControl, ActivityIndicator } from "react-native";
import { useState, useRef, useEffect, useCallback } from "react";
import { PieChart, BarChart } from "react-native-chart-kit";

import { useDispatch, useSelector } from "react-redux";
import { setIndexTradeMonths } from "../../redux/reducers/tradeReducer";
import LoadingIndicator from "../../components/LoadingIndicator";

export default function ReportScreen({ navigation }) {
    const { _isWalleting } = useSelector(state => state.walletReducer)
    const { _tradeReport, isLoading, indexTradeMonths } = useSelector(state => state.tradeReducer)
    const dispatch = useDispatch()

    const ref = useRef(null);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        dispatch(setIndexTradeMonths(_tradeReport.length - 1))
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
                            onPress={() => navigation.navigate({
                                name: 'MyWallet',
                                params: { back: 'ReportScreen', wallet: _isWalleting, type: 'choose' }
                            })}
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
                                index,
                            })}
                            data={_tradeReport}
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
                                                padding: 5,
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
                        <View style={{ marginBottom: 175 }}>
                            <View style={styles.border}>
                                <View style={styles.containerheader}>
                                    <View>
                                        <Text style={[styles.text, { fontSize: 18 }]}>Thu nhập ròng</Text>
                                        <Text style={[styles.text, { fontSize: 16 }]}>
                                            {_tradeReport[indexTradeMonths].data.datadong.sum.toLocaleString()}
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('ReportScreen')}
                                    >
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.containergraphic]}>
                                    <BarChart
                                        data={_tradeReport[indexTradeMonths].data.datadong}
                                        width={300}
                                        height={240}
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
                                            propsForVerticalLabels: {
                                                fontSize: 10,
                                                rotation: [-25]
                                            }
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={styles.border}>
                                <View style={styles.containerheader}>
                                    <View>
                                        <Text style={[styles.text, { fontSize: 18 }]}>Khoản thu</Text>
                                        {_tradeReport[indexTradeMonths].data.datathu.length != 0 ?
                                            <Text
                                                style={[styles.text, { fontSize: 16, color: 'green' }]}
                                            >
                                                {_tradeReport[indexTradeMonths].data.datathu.reduce((total, item) => total + item.population, 0).toLocaleString()}
                                            </Text>
                                            :
                                            <Text
                                                style={[styles.text, { fontSize: 16, color: 'green' }]}
                                            >
                                                0
                                            </Text>
                                        }
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (_tradeReport[indexTradeMonths].data.datathu.length != 0) {
                                                navigation.navigate('DetailReportScreen', { title: 'Chi tiết khoản thu', type: 1 })
                                            }
                                        }}
                                    >
                                        <Text style={styles.text}>Xem chi tiết</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.containergraphic}>
                                    {_tradeReport[indexTradeMonths].data.datathu.length != 0 ?
                                        <PieChart
                                            data={_tradeReport[indexTradeMonths].data.datathu}
                                            width={Dimensions.get('screen').width}
                                            height={170}
                                            chartConfig={{
                                                color: () => 'black',
                                            }}
                                            accessor={"population"}
                                            backgroundColor={"transparent"}
                                            paddingLeft={"10"}
                                        />
                                        :
                                        <View style={{ padding: 60, alignItems: 'center' }}>
                                            <Text style={styles.text}>Không có dữ liệu</Text>
                                        </View>
                                    }
                                </View>
                            </View>
                            <View style={styles.border}>
                                <View style={styles.containerheader}>
                                    <View>
                                        <Text style={[styles.text, { fontSize: 18 }]}>Khoản chi</Text>
                                        {_tradeReport[indexTradeMonths].data.datachi.length != 0 ?
                                            <Text
                                                style={[styles.text, { fontSize: 16, color: 'red' }]}
                                            >
                                                {_tradeReport[indexTradeMonths].data.datachi.reduce((total, item) => total + item.population, 0).toLocaleString()}
                                            </Text>
                                            :
                                            <Text
                                                style={[styles.text, { fontSize: 16, color: 'red' }]}
                                            >
                                                0
                                            </Text>
                                        }
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (_tradeReport[indexTradeMonths].data.datachi.length != 0) {
                                                navigation.navigate('DetailReportScreen', { title: 'Chi tiết khoản chi', type: 0 })
                                            }
                                        }}
                                    >
                                        <Text style={styles.text}>Xem chi tiết</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.containergraphic}>
                                    {_tradeReport[indexTradeMonths].data.datachi.length != 0 ?
                                        <PieChart
                                            data={_tradeReport[indexTradeMonths].data.datachi}
                                            width={Dimensions.get('screen').width}
                                            height={170}
                                            chartConfig={{
                                                color: () => 'black',
                                            }}
                                            accessor={"population"}
                                            backgroundColor={"transparent"}
                                            paddingLeft={"10"}
                                        />
                                        :
                                        <View style={{ padding: 60, alignItems: 'center' }}>
                                            <Text style={styles.text}>Không có dữ liệu</Text>
                                        </View>
                                    }
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'center'
    },
    containergraphic: {
        alignItems: 'center',
        padding: 10
    },
    containercalcu: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        alignItems: 'center',
        gap: 30,
        paddingBottom: 10,
        marginBottom: 25
    },
    containerheader: {
        margin: '5%',
        marginVertical: 12.5,
        flexDirection: 'row',
        justifyContent: "space-between"
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
    },
    text: {
        fontWeight: 'bold'
    },
    border: {
        borderRadius: 15,
        backgroundColor: 'white',
        marginTop: 20,
        marginHorizontal: '5%'
    },
})