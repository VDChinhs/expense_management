import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function HeaderRight({ onPress1, onPress2, image1, image2, disabled1, disabled2 }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress1}>
                {image1 != undefined ? (
                    <View style={[styles.containerimage, { opacity: disabled1 ? 0.4 : 1 }]}>
                        <Image
                            source={image1}
                            style={styles.image}
                        />
                        <Image
                            source={require('../assets/angle-small-right.png')}
                            style={styles.imagesmall}
                        />
                    </View>
                ) : (
                    <View></View>
                )}
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress2} disabled={disabled2}>
                <Image
                    source={image2}
                    style={[styles.image, { opacity: disabled2 ? 0.4 : 1 }]}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginRight: 20,
        gap: 25,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
    },
    containerimage: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 20,
        height: 20,
    },
    imagesmall: {
        width: 10,
        height: 10,
        transform: [{ rotate: '90deg' }]
    }

})