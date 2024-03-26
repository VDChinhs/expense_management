import { Children, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';

export default function SwitchButton({titlel, titler, children}){  
    const [selectTab, setSelectedTab] = useState(1)
    return (
        <View>
            <View style = {styles.container}>
                <TouchableOpacity 
                    style = {[styles.button, {backgroundColor: selectTab == 0 ? 'white':'#E3E3E3'}]}
                    onPress={() => {setSelectedTab(0)}}
                >
                    <Text style = {styles.text}>{titlel}</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style = {[styles.button, {backgroundColor: selectTab == 1 ? 'white':'#E3E3E3'}]}
                    onPress={() => {setSelectedTab(1)}}
                >
                    <Text style = {styles.text}>{titler}</Text>
                </TouchableOpacity>
            </View>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 40,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor:'#E3E3E3',
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#E3E3E3'
    },
    button:{
        width: 145,
        height: 35,
        borderRadius: 10,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:2.5
    },
    text: {
        fontWeight: 'bold',
        // fontSize: 14,
    },
});