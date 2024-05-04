import { Text, View, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

import { useSelector } from "react-redux";
import LoadingIndicator from "../../components/LoadingIndicator";

export default function ChooseGroupCha({ navigation, route }) {
    const { userToken } = useContext(AuthContext);
    const { _isWalleting } = useSelector(state => state.walletReducer)
    const { _myGroupParentChi, _myGroupParentThu, isLoadingChi, isLoadingThu } = useSelector(state => state.groupReducer)

    const [isChoose, SetChoose] = useState(false);
    const [isGroup, SetGroup] = useState({ _id: '' });
    const [isBack, SetBack] = useState('');

    useEffect(() => {
        if (route.params?.type == 'choose') {
            SetChoose(true)
        }
        if (route.params?.group != null) {
            SetGroup(route.params?.group)
        }
        if (route.params?.back) {
            SetBack(route.params?.back)
        }
    }, [route]);

    return (
        <View>
            {isLoadingChi || isLoadingThu ?
                <View style={{ height: '100%', justifyContent: 'center', alignContent: 'center' }}>
                    {/* <ActivityIndicator color={'black'} size={'large'} /> */}
                    <LoadingIndicator size={40} color={'black'} />
                </View>
                :
                <View style={styles.container}>
                    {(route.params?.khoan == 0 ? _myGroupParentChi : _myGroupParentThu).map(value => (
                        <View key={value._id} >
                            <TouchableOpacity
                                onPress={() => {
                                    isChoose && navigation.navigate(isBack, { groupcha: value });
                                }}
                            >
                                <View style={styles.containerroot}>
                                    <View style={styles.rootleft}>
                                        <Image
                                            source={{ uri: value.image }}
                                            style={styles.imageleft}
                                        />
                                        <View style={styles.containertext}>
                                            <Text style={styles.textl}>{value.name}</Text>
                                            <Text style={styles.texts}>{_isWalleting.name}</Text>
                                        </View>
                                    </View>
                                    {
                                        !isChoose &&
                                        <Image
                                            source={require('../../assets/angle-small-right.png')}
                                            style={styles.imageright}
                                        />
                                    }
                                    {
                                        isGroup._id == value._id &&
                                        <Image
                                            source={require('../../assets/check-mark.png')}
                                            style={styles.imageright}
                                        />
                                    }
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 15,
        marginTop: 20
    },
    containerroot: {
        width: '100%',
        height: 55,
        gap: 15,
        paddingLeft: '5%',
        paddingRight: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    rootleft: {
        flexDirection: 'row',
        gap: 15
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