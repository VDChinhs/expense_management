import { Text, View, StyleSheet } from "react-native";

export default function HomeScreen() {
    return (
      <View style = {style.container}>
        <Text>This is Home Page</Text>
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