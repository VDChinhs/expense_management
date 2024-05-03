import { StyleSheet, View, TextInput } from "react-native";
import Svg, { G, Circle } from "react-native-svg";

export default function HaldCircle({
    percentage = 20,
    radius = 160,
    strokeWith = 10,
    color = 'red',
    text,
    textColor,
    textColortitle,
    max = 100,
}) {
    const haldCircle = radius + strokeWith
    const circleCircumference = 2 * Math.PI * radius
    const maxPerc = (100 * percentage / max) / 2
    const strokeDashoffset = circleCircumference - (circleCircumference * maxPerc) / 100

    return (
        <View style={styles.container}>
            <Svg
                width={radius * 2}
                height={radius * 2}
                viewBox={`0 0 ${haldCircle * 2} ${haldCircle * 2}`}
            >
                <G rotation={'-180'} origin={`${haldCircle}, ${haldCircle}`}>
                    <Circle
                        cx={'50%'}
                        cy={'50%'}
                        stroke={color}
                        strokeWidth={strokeWith}
                        r={radius}
                        fill="transparent"
                        strokeOpacity={0.2}
                        strokeDasharray={circleCircumference / 2}
                        strokeLinecap="round"
                    />
                    <Circle
                        cx={'50%'}
                        cy={'50%'}
                        stroke={color}
                        strokeWidth={strokeWith}
                        r={radius}
                        fill="transparent"
                        strokeDasharray={circleCircumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                    />
                </G>
            </Svg>
            <TextInput
                underlineColorAndroid="transparent"
                editable={false}
                value={'Số tiền bạn có thể chi'}
                style={[
                    StyleSheet.absoluteFillObject,
                    {
                        fontSize: radius / 10,
                        bottom: radius / 1.6,
                        color: textColortitle ?? color,
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }]}
            />
            <TextInput
                underlineColorAndroid="transparent"
                editable={false}
                value={text.toLocaleString()}
                style={[
                    StyleSheet.absoluteFillObject,
                    {
                        fontSize: radius / 5,
                        bottom: radius / 4,
                        color: textColor ?? color,
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
})