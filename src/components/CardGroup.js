import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function CardGroup({ title, image, onPress, ...prop }) {
    return (
        <TouchableOpacity style = {[styles.container, {...prop.style}]} onPress={onPress}>
                {title == undefined ? (
                    <View >
                        <Image
                            source={image}
                            style = {styles.image}
                        />
                    </View>
                ):(
                    <View style = {{alignItems:'center',justifyContent:'center', gap: 10}}>
                        <Image
                            source={image}
                            style = {styles.image}
                        />
                        <Text style = {styles.text}>{title}</Text>
                    </View>
                )}
        </TouchableOpacity>
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
        fontWeight:"bold"
    }
})