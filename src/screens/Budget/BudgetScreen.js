import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions, ScrollView, RefreshControl, ActivityIndicator } from "react-native";
import Button from "../../components/Button";
import { useEffect, useState, useRef, useCallback, useContext } from "react";
import HaldCircle from '../../components/HalfCricle';
import InfoTitle from "../../components/InfoTitle";
import * as Progress from 'react-native-progress';
import { getRangeDate } from "../../process/Date";
import { AuthContext } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { setIndexBudget } from "../../redux/reducers/budgetReducer";

export default function BudgetScreen({ navigation }) {
    const { userToken } = useContext(AuthContext);
    const { _myBudget, isLoading, index } = useSelector(state => state.budgetReducer)

    const dispatch = useDispatch()

    const ref = useRef(null);
    const [isCurrentDate, setCurrentDate] = useState(new Date())

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        dispatch(setIndexBudget(0))
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    });

    useEffect(() => {
        ref.current?.scrollToIndex({
            index,
            animated: true,
            viewPosition: 0,
        });
    }, [index])

    return (
        <View>
            {isLoading ?
                <View style={{ height: '100%', justifyContent: 'center', alignContent: 'center' }}>
                    <ActivityIndicator color={'black'} size={'large'} />
                </View>
                :
                <View>
                    {_myBudget.length != 0 ?
                        <View>
                            <View style={{ backgroundColor: 'white' }}>
                                <FlatList
                                    ref={ref}
                                    initialScrollIndex={index}
                                    getItemLayout={(data, index) => ({
                                        length: (Dimensions.get('screen').width / 3),
                                        offset: (Dimensions.get('screen').width / 3) * index,
                                        index
                                    })}
                                    data={_myBudget}
                                    keyExtractor={(item, index) => index.toString()}
                                    showsHorizontalScrollIndicator={false}
                                    horizontal
                                    renderItem={({ item, index: fIndex }) => {
                                        return (
                                            <TouchableOpacity onPress={() => {
                                                dispatch(setIndexBudget(fIndex))
                                            }}>
                                                <View
                                                    style={{
                                                        padding: 10,
                                                        width: Dimensions.get('screen').width / 3,
                                                        alignItems: 'center',
                                                        borderBottomColor: 'black',
                                                        borderBottomWidth: fIndex === index ? 2 : 0,
                                                    }}>
                                                    <Text style={{
                                                        fontWeight: 'bold',
                                                        fontSize: 15,
                                                        opacity: fIndex === index ? 1 : 0.5,
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
                                <View style={{ marginBottom: 200 }}>
                                    <View style={styles.containergraphic}>
                                        <View>
                                            <HaldCircle
                                                textColortitle={'black'}
                                                color="green"
                                                percentage={
                                                    _myBudget[index].data.reduce((total, item) => total + item.money, 0) -
                                                        _myBudget[index].data.reduce((total, item) => total + item.moneyloss, 0) < 0 ?
                                                        _myBudget[index].data.reduce((total, item) => total + item.money, 0) :
                                                        _myBudget[index].data.reduce((total, item) => total + item.moneyloss, 0)
                                                }
                                                text={
                                                    _myBudget[index].data.reduce((total, item) => total + item.money, 0) -
                                                    _myBudget[index].data.reduce((total, item) => total + item.moneyloss, 0)
                                                }
                                                max={_myBudget[index].data.reduce((total, item) => total + item.money, 0)}
                                                radius={160}
                                            />
                                        </View>
                                        <View style={styles.containerundergraphic}>
                                            <View style={{ alignItems: 'center', width: 150 }}>
                                                <Text
                                                    style={[styles.textbold, { fontSize: 19 }]}
                                                >
                                                    {Number(_myBudget[index].data.reduce((total, item) => total + item.money, 0)).toLocaleString()}
                                                </Text>
                                                <Text>Tổng ngân sách</Text>
                                            </View>
                                            <View style={{ alignItems: 'center', width: 150 }}>
                                                <Text
                                                    style={[styles.textbold, { fontSize: 19 }]}
                                                >
                                                    {Number(_myBudget[index].data.reduce((total, item) => total + item.moneyloss, 0)).toLocaleString()}
                                                </Text>
                                                <Text>Tổng đã chi</Text>
                                            </View>
                                            <View style={{ alignItems: 'center', width: 150 }}>
                                                <Text
                                                    style={[styles.textbold, { fontSize: 19 }]}
                                                >
                                                    {getRangeDate(isCurrentDate, new Date(_myBudget[index].dateend))} ngày
                                                </Text>
                                                <Text>Đến cuối kỳ</Text>
                                            </View>
                                        </View>
                                        <Button
                                            title={'Tạo ngân sách'}
                                            style={{ width: 150, height: 50 }}
                                            onPress={() => navigation.navigate("AddBudget")}
                                        />
                                    </View>
                                    <View style={{ gap: 20, marginTop: 20 }}>
                                        {_myBudget[index].data.map((value, fIndex) => (
                                            <View style={styles.containerbudget} key={fIndex}>
                                                <InfoTitle

                                                    titlel={value.groupId.name}
                                                    styleimageleft={{ width: 30, height: 30 }}
                                                    imageleft={{ uri: value.groupId.image }}
                                                    imageleftsmall={{ uri: value.walletId.image }}
                                                    titlerightl={value.money}
                                                    titlerights={value.money - value.moneyloss}
                                                    onPress={() => {
                                                        navigation.navigate({
                                                            name: 'EditBudgetScreen',
                                                            params: { budget: value }
                                                        });
                                                    }}
                                                />
                                                <View style={{ alignItems: 'flex-end', padding: 10 }}>
                                                    <Progress.Bar
                                                        progress={value.moneyloss / value.money}
                                                        color={value.moneyloss - value.money > 1 ? "red" : "green"}
                                                        width={260}
                                                    />
                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                        :
                        <ScrollView
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }
                        >
                            <View style={styles.container}>
                                <Image
                                    source={Number(require('../../assets/dollar.png'))}
                                    style={styles.image}
                                />
                                <View style={styles.textinfo}>
                                    <Text style={[styles.textbold, { fontSize: 15 }]}>Bạn chưa có ngân sách</Text>
                                    <Text style={{ textAlign: 'center' }}>Bắt đầu tiết kiệm bằng cách tạo ngân sách và chúng tôi sẽ giúp bạn kiểm soát ngân sách</Text>
                                </View>
                                <Button
                                    title={"Tạo ngân sách"}
                                    onPress={() => navigation.navigate("AddBudget")}
                                />
                            </View>
                        </ScrollView>
                    }
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 125,
        alignItems: 'center',
        gap: 20
    },
    containergraphic: {
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 20,
        paddingVertical: 20
    },
    containerundergraphic: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        marginTop: -140,
        paddingBottom: 20,
    },
    containerbudget: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
    },
    image: {
        width: 150,
        height: 150
    },
    textinfo: {
        gap: 5,
        width: 300,
        alignItems: 'center',
    },
    textbold: {
        fontWeight: 'bold',
    }
})