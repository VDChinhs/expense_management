import { Text, TouchableOpacity, StyleSheet,Image } from 'react-native';

export default function ButtonSc({title, onPress, transparent}){    
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, transparent && styles.transparent]}>
            <Text
                style={[styles.text, transparent && styles.textcolor]}>{title}
            </Text>
            <Image style = {styles.buttonright} source={require('../assets/angle-small-right.png')}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 56,
        width: 360,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor:'white',
        borderBottomColor:'black',
        borderBottomWidth:0.5,
        padding:15
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