import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Button({title, onPress, transparent,style}){    
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, transparent && styles.transparent, style]}>
            <Text
                style={[styles.text, transparent && styles.textcolor]}>{title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 48,
        width: 330,
        backgroundColor:'#AE4B4B',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        borderWidth: 1,
        borderColor:'#AE4B4B',
        // marginBottom: 20,
    },
    transparent:{
        backgroundColor:'transparent'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        color:'white'
    },
    textcolor:{
        color:'#AE4B4B'
    }
});