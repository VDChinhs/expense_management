import { Text, View, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { groupParent } from "../../process/GroupController"

export default function ChooseGroupCha({navigation, route}) {
    
    const {isWalleting, userToken} = useContext(AuthContext);
    const [isChoose, SetChoose] = useState(false);
    const [isGroup, SetGroup] = useState(undefined);
    const [isLoading, setLoading] = useState(true);
    const [values, setValues] = useState(null);

    async function getGroupParent(type) {
        var data = await groupParent(userToken, type, isWalleting._id)
        setValues(data)
        setLoading(false)
    }

    useEffect(() => {
        getGroupParent(route.params?.khoan == 'Khoản chi' ? 0 : 1)
        if (route.params?.type == 'choose') {
            SetChoose(true)
        }
        if (route.params?.group != null) {
            SetGroup(route.params?.group)
        }
    },[route]);

    return (
        <View>
            {isLoading ? 
                <View style = {{height: 500, justifyContent:'center', alignContent:'center'}}>
                    <ActivityIndicator color={'balck'} size={'large'}/>
                </View>
            :
                <View style = {styles.container}>
                    {values.map(value => (
                        <View key={value._id} >
                            <TouchableOpacity
                                onPress={() => {
                                    isChoose && navigation.navigate('AddGroupScreen', {group: value});
                                }}
                            >
                                <View style = {styles.containerroot}>
                                    <View style = {styles.rootleft}>
                                        <Image
                                            source={Number(value.image)}
                                            style = {styles.imageleft}
                                        />
                                        <View style = {styles.containertext}>
                                            <Text style = {styles.textl}>{value.name}</Text>
                                            <Text style = {styles.texts}>{isWalleting.name}</Text>
                                        </View>
                                    </View>
                                    {
                                        !isChoose &&
                                        <Image
                                            source={require('../../assets/angle-small-right.png')}
                                            style = {styles.imageright}
                                        />
                                    }
                                    {
                                        isGroup._id == value._id && 
                                        <Image
                                            source={require('../../assets/check-mark.png')}
                                            style = {styles.imageright}
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
    container:{
        gap: 15,
        marginTop: 20
    },
    containerroot:{
        width:'100%',
        height:55,
        gap: 15,
        paddingLeft:'5%',
        paddingRight:15,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'white'
    },
    rootleft:{
        flexDirection:'row',
        gap:15
    },
    containertext:{
        justifyContent:'center'
    },
    textl:{
        fontSize:17,
        fontWeight:'bold'
    },
    texts:{
        fontSize:13
    },
    imageleft:{
        width:35,
        height:35
    },
    imageright:{
        width:24,
        height:24
    },
})