import { Image, StyleSheet, Text, View } from "react-native";

export default function CardGroup({ title, image }) {
    return (
      <View style = {styles.container}>
        {title == undefined ? (
            <View>
                <Image
                    source={image}
                    style = {styles.image}
                />
            </View>
        ):(
            <View>
                <Image
                    source={image}
                    style = {styles.image}
                />
                <Text style = {styles.text}>{title}</Text>
            </View>
        )}
      </View>
    );
}
const styles = StyleSheet.create({
    container:{
        width:96.66,
        height:100,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:'white',
        borderRadius:10,
        gap: 10
    },
    image:{
        width:55,
        height:55
    },
    text:{
        color: '#560cce',
        fontWeight:"bold"
    }
})