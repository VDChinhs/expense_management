import { useEffect, useState, useRef, useContext, useCallback } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Dimensions, RefreshControl, ActivityIndicator } from "react-native";
import InfoTitle from "../../components/InfoTitle";
import { ScrollView } from "react-native-gesture-handler";
import { PieChart } from "react-native-chart-kit";
import { AuthContext } from "../../context/AuthContext";

import { useDispatch, useSelector } from "react-redux";
import { setIndexTradeMonths } from "../../redux/reducers/tradeReducer";
import LoadingIndicator from "../../components/LoadingIndicator";

export default function DetailReportScreen({ navigation, route }) {
    const { userToken } = useContext(AuthContext);
    const { isLoading, indexTradeMonths, _tradeReportDetailChi, _tradeReportDetailThu } = useSelector(state => state.tradeReducer)
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
        });
        navigation.setOptions({
            headerTitle: route.params.title,
        });

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
                    <View style={{ alignItems: 'center', backgroundColor: 'white', paddingTop: 10 }}>
                        <FlatList
                            ref={ref}
                            initialScrollIndex={indexTradeMonths}
                            getItemLayout={(data, index) => ({
                                length: (Dimensions.get('screen').width / 3),
                                offset: (Dimensions.get('screen').width / 3) * index,
                                index,
                            })}
                            data={(route.params.type == 0 ? _tradeReportDetailChi : _tradeReportDetailThu)}
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
                        {(route.params.type == 0 ? _tradeReportDetailChi : _tradeReportDetailThu)[indexTradeMonths].data.length != 0 ?
                            <View>
                                <View style={styles.container}>
                                    <View style={styles.containerheader}>
                                        <View >
                                            <Text style={[styles.text, { fontSize: 15 }]}>Tổng cộng</Text>
                                            <Text
                                                style={[styles.text, { fontSize: 20 }]}
                                            >
                                                {(route.params.type == 0 ? _tradeReportDetailChi : _tradeReportDetailThu)[indexTradeMonths].data.reduce((total, item) => total + item.money, 0).toLocaleString()}
                                            </Text>
                                        </View>
                                        <View>
                                            <Text style={[styles.text, { fontSize: 15 }]}>Trung bình hàng ngày</Text>
                                            <Text
                                                style={[styles.text, { fontSize: 20 }]}
                                            >
                                                {Number((((route.params.type == 0 ? _tradeReportDetailChi : _tradeReportDetailThu)[indexTradeMonths].data.reduce((total, item) => total + item.money, 0)) / 30).toFixed(0)).toLocaleString()}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.containergraphic}>
                                        <PieChart
                                            data={(route.params.type == 0 ? _tradeReportDetailChi : _tradeReportDetailThu)[indexTradeMonths].datachar}
                                            width={Dimensions.get('screen').width}
                                            height={170}
                                            chartConfig={{
                                                color: () => 'black',
                                            }}
                                            accessor={"population"}
                                            backgroundColor={"transparent"}
                                            paddingLeft={"10"}
                                        />
                                    </View>
                                </View>
                                <View style={{ paddingHorizontal: 10 }}>
                                    {(route.params.type == 0 ? _tradeReportDetailChi : _tradeReportDetailThu)[indexTradeMonths].data.map((value, index) => (
                                        <InfoTitle
                                            key={index}
                                            titlel={value.groupId.name}
                                            money={value.money}
                                            imageleft={{ uri: value.groupId.image }}
                                            style={styles.bordertop}
                                            onPress={() => navigation.navigate({
                                                name: 'EditTradeScreen',
                                                params: { trade: value }
                                            })}
                                        />
                                    ))

                                    }
                                </View>
                            </View>
                            :
                            <View style={{ justifyContent: 'center', alignItems: 'center', height: 600, gap: 5 }}>
                                <Image
                                    source={Number(require('../../assets/dollar.png'))}
                                    style={{ width: 100, height: 100 }}
                                />
                                <Text style={{ fontWeight: 'bold' }}>Không có dữ liệu để hiện thị</Text>
                            </View>
                        }
                    </ScrollView>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        alignItems: 'center',
        marginVertical: 30
    },
    images: {
        width: 16,
        height: 16
    },
    containerheader: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: 10,
        width: '100%'
    },
    containergraphic: {
        paddingTop: 15,
        alignItems: 'center'
    },
    text: {
        fontWeight: 'bold'
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