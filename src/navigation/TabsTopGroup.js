import * as React from 'react';
import { Text, View, StyleSheet,TouchableOpacity, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CardGroup from '../components/CardGroup';


function ChiScreen() {
    values = [
        ['Ăn uống', require('../assets/anuong.png')],
        ['Tiền mạng', require('../assets/tienmang.png')],
        ['Sức khỏe', require('../assets/suckhoe.png')],
        ['Thời trang', require('../assets/thoitrang.png')],
        ['Di chuyển', require('../assets/dichuyen.png')],
        ['Thú cưng', require('../assets/thucung.png')],
        ['Giáo dục', require('../assets/giaoduc.png')],
        ['Tiền nước', require('../assets/tiennuoc.png')],
        ['Tiền điện', require('../assets/tiendien.png')],
        ['Giải trí', require('../assets/giaitri.png')],
        ['Quà tặng', require('../assets/quatang.png')],
        ['Du lịch', require('../assets/dulich.png')],
        ['Du lịch', require('../assets/dulich.png')],
        ['Du lịch', require('../assets/dulich.png')],
        ['Du lịch', require('../assets/dulich.png')],
    ];

    return (
            <ScrollView style = {styles.scroll}>
                <View style={styles.container}>
                    {values.map(value => (
                        <TouchableOpacity>
                            <CardGroup title={value[0]} image={value[1]}/>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity>
                        <CardGroup image={require('../assets/themnhom.png')}/>
                    </TouchableOpacity>
                </View>
            </ScrollView>
  );
}

function ThuScreen() {
    values = [
        ['Gia đình', require('../assets/anuong.png')],
        ['Công việc', require('../assets/tienmang.png')],
        ['Sở thích', require('../assets/suckhoe.png')],
        ['Thưởng', require('../assets/thoitrang.png')],
        ['Lãi', require('../assets/dichuyen.png')],
        ['Xổ số', require('../assets/thucung.png')],
    ];

    return (
        <ScrollView>
            <View style={styles.container}>
                {values.map(value => (
                    <TouchableOpacity>
                        <CardGroup title={value[0]} image={value[1]}/>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity>
                    <CardGroup image={require('../assets/themnhom.png')}/>
                </TouchableOpacity>
            </View>
        </ScrollView>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function TabsTopGroup() {
  return (
      <Tab.Navigator
        initialRouteName='GroupChi'
        screenOptions={{
            tabBarStyle:{
                height:40,
            },
            tabBarLabelStyle: {
                margin:-10,
                fontSize: 13,
                fontWeight:'bold' 
            },
        }}
      >
        <Tab.Screen name="GroupChi" component={ChiScreen} options={{title:"KHOẢN CHI"}}/>
        <Tab.Screen name="Groupthu" component={ThuScreen} options={{title:"KHOẢN THU"}}/>
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
    container:{
        width:330,
        marginLeft:15,
        marginVertical:15,
        gap:20,
        justifyContent:"flex-start",
        alignItems:"center",
        flexDirection:'row',
        flexWrap: 'wrap',
    },
    scroll:{
        // backgroundColor:'#FFD3D3',
    }
})
