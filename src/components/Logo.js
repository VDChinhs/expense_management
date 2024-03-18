import { View, Image, StyleSheet, Text } from "react-native"

const Logo = ({text, image}) => {
    return(
        <View style = {styles.container}>
            <Image style = {styles.logo} source={image}/>
            <Text style = {styles.text}>{text}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        marginBottom:40,
        marginTop:-60
    },
    logo:{
        width:120,
        height:120,
    },
    text:{
        fontWeight:'bold',
        color:'#560cce',
        fontSize: 24,
        textAlign:"center"
    }
});

export default Logo;