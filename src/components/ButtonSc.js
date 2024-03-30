import { Text, TouchableOpacity, StyleSheet, Image, View } from 'react-native';

export default function ButtonSc({title, onPress, transparent, image}){    
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, transparent && styles.transparent]}>
            <View style = {styles.containerleft}>
                <Image style = {styles.buttonleft} source={image}/>

                <Text
                    style={[styles.text, transparent && styles.textcolor]}>{title}
                </Text>
            </View>
            <Image style = {styles.buttonright} source={require('../assets/angle-small-right.png')}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 55,
        width: '100%',
        padding: 15,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
    },
    containerleft:{
        gap: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonleft:{
        width: 25,
        height: 25
    },
    transparent:{
        backgroundColor:'transparent'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        color:'black'
    },
    textcolor:{
        color:'#AE4B4B'
    },
    buttonright:{
        width:24,
        height:24
    }
});