import { View, StyleSheet, ScrollView, Text, Image,Dimensions, TouchableOpacity } from "react-native";
import InfoTitle from "../../components/InfoTitle";

export default function MyWallet({ navigation }) {
    values = [
        {name: 'Gia đình', money: 12000000, image: require('../../assets/anuong.png')},
        {name: 'Công việc', money: 500000, image: require('../../assets/tienmang.png')},
        {name: 'Sở thích', money: -121000000, image: require('../../assets/suckhoe.png')},
    ];

    return (
        <View style={{height:Dimensions.get('window').height}}>
            <ScrollView>
                <View style = {styles.container}>
                    <InfoTitle 
                        titlel={'Tổng cộng'}
                        titles={values.reduce((acc, item) => acc + item.money, 0)} 
                        imageleft={require('../../assets/user.png')}
                        imageright={require('../../assets/angle-small-right.png')}
                    />
                    <Text style = {styles.text}>Các ví</Text>

                    {values.map(value => (
                        <InfoTitle 
                            titlel={value.name} 
                            titles={value.money} 
                            imageleft={value.image}
                            imageright={require('../../assets/angle-small-right.png')}
                        />
                    ))}
                </View>
            </ScrollView>

            <View style = {styles.button}>
                <TouchableOpacity>
                    <Image
                        source={require('../../assets/plus-small.png')}
                        resizeMode="contain"
                        style = {{
                            width:40,
                            height:40,
                            tintColor: 'black'
                        }}
                        /> 
                </TouchableOpacity>
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginTop:30,
        backgroundColor:'white'
    },
    text:{
        margin:15, 
        fontSize:15,
        fontWeight:'bold',
    },
    button:{
        width: 50,
        height: 50,
        borderRadius: 35,
        right:50,
        bottom:150,
        backgroundColor:'#AE4B4B',
        alignItems:"center",
        justifyContent:'center',
        position:'absolute',
    }
})