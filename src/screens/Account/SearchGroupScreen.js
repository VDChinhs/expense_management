import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

export default function SearchGroupScreen({ navigation, route }) {
    const [isBack, SetBack] = useState('');
    const [isChoose, SetChoose] = useState(false);
    const [isGroup, SetGroup] = useState({name:''});
    const [isSearch, setSearch] = useState('')

    const { _myAllGroupThuChi } = useSelector(state => state.groupReducer)
    const { _isWalleting } = useSelector(state => state.walletReducer)

    useEffect(() => {
        if (route.params?.back) {
            SetBack(route.params?.back)
        }
        if (route.params?.type == 'choose') {
            SetChoose(true)
        }
        if (route.params?.group) {
            SetGroup(route.params?.group)
        }
    }, []);

    return(
        <View>
            <View style = {styles.containerinput}>
                <TextInput
                    placeholder="Tìm kiếm"
                    style = {styles.input}
                    onChangeText={(text) => {
                        setSearch(text)
                    }}
                />
            </View>
            <ScrollView>
                    <View style={styles.container}>
                        {_myAllGroupThuChi.filter(group => group.name.toLowerCase().includes(isSearch.toLowerCase()))
                        .map((value, fIndex) => (
                            <View key={fIndex} style={{ backgroundColor: 'white' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (isChoose) {
                                            navigation.navigate(isBack, { group: value });
                                        }
                                        else {
                                            navigation.navigate({
                                                name: 'EditGroupScreen',
                                                params: { group: value}
                                            });
                                        }
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
                                                source={Number(require('../../assets/angle-small-right.png'))}
                                                style={styles.imageright}
                                            />
                                        }
                                        {
                                            isGroup.name == value.name &&
                                            <Image
                                                source={Number(require('../../assets/check-mark.png'))}
                                                style={styles.imageright}
                                            />
                                        }
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 5,
        paddingBottom: 100
    },
    containerinput:{
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: 'white'
    },
    input:{
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        color: 'black',
        borderWidth: 1,
        backgroundColor:'white'
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