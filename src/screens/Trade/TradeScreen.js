import { Text, View, StyleSheet } from "react-native";

export default function TradeScreen() {
    return (
      <View style = {style.container}>
        <Text>This is Trade Page</Text>
      </View>
    );
}

const style = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})