
import * as React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home/HomeScreen";
import TradeScreen from "../screens/Trade/TradeScreen";
import BudgerScreen from "../screens/Budget/BudgetScreen";
import AccountScreen from "../screens/Account/AccountScreen";
import AddScreen from "../screens/Home/AddScreen";
import { StyleSheet, View, Image, Text, TouchableOpacity,TouchableWithoutFeedback } from "react-native";
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

// const navigation = useNavigation();

const CustomTabBarButton = ({children, onPress}) => (
    <TouchableWithoutFeedback onPress = {onPress}>
        <View
            style = {{
                top:-12,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <View
                style = {{
                    width: 50,
                    height: 50,
                    borderRadius: 35,
                    backgroundColor:'#AE4B4B'
                }}>
                {children}
            </View>
        </View>
    </TouchableWithoutFeedback>

)

function AddTrade({ navigation}) {
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', (e) => {
          e.preventDefault();
    
          alert('Default behavior prevented');
          () => navigation.navigate('Add1')
        });
    
        return unsubscribe;
      }, [navigation]);
}

export default function TabsBottom({navigation}) {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerStyle:{
                    height:70
                },
                tabBarShowLabel:false,
                tabBarStyle:{
                    position: 'absolute',
                    bottom: 11,
                    left: 11,
                    right: 11,
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: 28,
                    height: 46,
                    ...styles.shadow
                }
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{
                    headerShown:false,
                    tabBarIcon:({focused}) => (
                        <View style = {styles.tabicon}>
                            <Image
                                source={require('../assets/home.png')}
                                resizeMode="contain"
                                style = {[styles.image, {tintColor: focused ? '#AE4B4B' : 'black'}]}
                            />
                            <Text style = {[styles.text, {color: focused ? '#AE4B4B' : 'black'}]}>Tổng quan</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen 
                name="Trade" 
                component={TradeScreen} 
                options={{
                    headerShown:false,
                    tabBarIcon:({focused}) => (
                        <View style = {styles.tabicon}>
                            <Image
                                source={require('../assets/wallet.png')}
                                resizeMode="contain"
                                style = {[styles.image, {tintColor: focused ? '#AE4B4B' : 'black'}]}
                            />
                            <Text style = {[styles.text, {color: focused ? '#AE4B4B' : 'black'}]}>Giao dịch</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen 
                name="AddTrade" 
                component={AddScreen}
                options={{
                    title:"Thêm giao dịch",
                    tabBarIcon:() => (
                       <Image
                        source={require('../assets/plus-small.png')}
                        resizeMode="contain"
                        style = {{
                            width:40,
                            height:40,
                            tintColor: 'black'
                        }}
                        /> 
                    ),
                    tabBarButton: (props) => (
                        <CustomTabBarButton {...props} onPress={() => navigation.navigate('AddTrade')}/>
                    )
                }} 
            />
            <Tab.Screen 
                name="Budget" 
                component={BudgerScreen}
                options={{
                    title:"Ngân sách áp dụng",
                    tabBarIcon:({focused}) => (
                        <View style = {styles.tabicon}>
                            <Image
                                source={require('../assets/budget-alt.png')}
                                resizeMode="contain"
                                style = {[styles.image, {tintColor: focused ? '#AE4B4B' : 'black'}]}
                            />
                            <Text style = {[styles.text, {color: focused ? '#AE4B4B' : 'black'}]}>Ngân sách</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen 
                name="Account" 
                component={AccountScreen} 
                options={{
                    title:"Tài khoản",
                    tabBarIcon:({focused}) => (
                        <View style = {styles.tabicon}>
                            <Image
                                source={require('../assets/user.png')}
                                resizeMode="contain"
                                style = {[styles.image, {tintColor: focused ? '#AE4B4B' : 'black'}]}
                            />
                            <Text style = {[styles.text, {color: focused ? '#AE4B4B' : 'black'}]}>Tài khoản</Text>
                        </View>
                    )
                }}
            />
        </Tab.Navigator>
    );
}


const styles = StyleSheet.create({
    shadow:{
        shadowColor:'red',
        shadowOffset:{
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },
    tabicon:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    image:{
        width:20,
        height:20
    },
    text:{
        fontSize: 9,
        fontWeight: 'bold',
    }
})