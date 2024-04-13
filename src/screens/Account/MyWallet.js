import { View, StyleSheet, ScrollView, Text, Image,Dimensions, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import InfoTitle from "../../components/InfoTitle";
import { useState, useEffect, useContext, useCallback } from "react";
import { myWallet } from "../../process/WalletController";
import { AuthContext } from "../../context/AuthContext";

export default function MyWallet({ navigation, route}) {
    const {userToken} = useContext(AuthContext);

    const [isBack, SetBack] = useState('');
    const [isChoose, SetChoose] = useState(false);
    const [isWallet, SetWallet] = useState({_id:""});
    const [values, setValues] = useState(null);
    
    const [isLoading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    async function getDataMyWallet() {
        var data = await myWallet(userToken)
        setValues(data)
        setLoading(false)
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getDataMyWallet()
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    });

    useEffect(() => {
        getDataMyWallet()
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
                <View style = {{height: 600, justifyContent:'center', alignContent:'center'}}>
                    <ActivityIndicator color={'balck'} size={'large'}/>
                </View>
            :
                <View>
                    <ScrollView
                        refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                    >
                        <View style={{height: Dimensions.get('window').height}}>
                            <View style = {styles.container}>
                                {(!isChoose || isBack == 'Trade') && 
                                    <View style = {{marginTop: 30}}>
                                            <InfoTitle 
                                                titlel = {'Tổng cộng'}
                                                titles = {values.reduce((acc, item) => acc + item.money, 0)} 
                                                imageleft = {require('../../assets/user.png')}
                                                imageright = {
                                                    isWallet == 'Tổng cộng' ? require('../../assets/check-mark.png') : require('../../assets/angle-small-right.png')
                                                }
                                                style = {{ backgroundColor: 'white', height: 60}}
                                                onPress = {() => {
                                                    isChoose && navigation.navigate(isBack, {namewallet: 'Tổng cộng', imagewallet: require('../../assets/user.png')});
                                                }}
                                            />
                                    </View>
                                }
                                <Text style = {styles.text}>Các ví</Text>
                                {values.map(value => (
                                    <InfoTitle 
                                        key={value.name}
                                        titlel={value.name} 
                                        titles={value.money} 
                                        imageleft={value.image}
                                        imageright = {
                                            isWallet._id == value._id ? require('../../assets/check-mark.png') : require('../../assets/angle-small-right.png')
                                        }
                                        style = {{ backgroundColor: 'white', height: 60}}
                                        onPress={() => {
                                            isChoose && navigation.navigate(isBack, {namewallet: value.name, imagewallet: value.image, wallet: value});
                                        }}
                                    />
                                ))}
                            </View>

                        </View>
                    </ScrollView>
                        <View style = {styles.button}>
                            <TouchableOpacity 
                                onPress={() =>
                                    navigation.navigate('AddWalletScreen')
                                }
                            >
                                <Image
                                    source={require('../../assets/plus-small.png')}
                                    resizeMode="contain"
                                    style = {{
                                        width:40,
                                        height:40,
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
    container:{
        // marginTop:10,
        // backgroundColor:'white'
    },
    text:{
        margin:15, 
        fontSize:18,
        fontWeight:'bold',
    },
    button:{
        width: 50,
        height: 50,
        borderRadius: 35,
        right:50,
        bottom:120,
        backgroundColor:'#AE4B4B',
        alignItems:"center",
        justifyContent:'center',
        position:'absolute',
    }
})