import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';

export default function SwitchButton({ titlel, titler, onPressl, onPressr, value = true }) {
    return (
        <View>
            <View style={styles.container}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: value ? '#E3E3E3' : 'white' }]}
                    onPress={onPressl}
                >
                    <Text style={styles.text}>{titlel}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: value ? 'white' : '#E3E3E3' }]}
                    onPress={onPressr}
                >
                    <Text style={styles.text}>{titler}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 40,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: '#E3E3E3',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E3E3E3'
    },
    button: {
        width: '50%',
        height: 35,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2.5
    },
    text: {
        fontWeight: 'bold',
        // fontSize: 14,
    },
});