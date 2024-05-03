import { StyleSheet, View, Text, Image } from "react-native";

export default function IconTabBottom({ title, focused, icon }) {
    let path = { icon }.icon
    return (
        <View style={style.tabicon}>
            <Image
                source={require(path)}
                resizeMode="contain"
                style={[style.image, { tintColor: focused ? '#e32f45' : '#748c94' }
                ]}
            />
            <Text style={[style.text, { color: focused ? '#e32f45' : '#748c94' }]}>{title}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    tabicon: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow',
    },
    image: {
        width: 20,
        height: 20
    },
    text: {
        fontSize: 12,
        color: 'black'
    }
})