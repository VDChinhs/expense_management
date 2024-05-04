import { MotiView } from "moti";
import { View, StyleSheet } from "react-native";

export default function LoadingIndicator({ size, color }) {
    return (
        <View style={styles.container}>
            <MotiView
                from={{
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    borderWidth: 0,
                    shadowOpacity: 0.5
                }}
                animate={{
                    width: size + 20,
                    height: size + 20,
                    borderRadius: (size + 20) / 2,
                    borderWidth: size / 10,
                    shadowOpacity: 1
                }}
                transition={{
                    type: 'timing',
                    duration: 1500,
                    loop: true,
                }}
                style={{
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    borderWidth: size / 10,
                    borderColor: color,
                    shadowColor: color,
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 1,
                    shadowRadius: 10
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    }
})