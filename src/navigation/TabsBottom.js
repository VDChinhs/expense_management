import * as React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home/HomeScreen";
import TradeScreen from "../screens/Trade/TradeScreen";
import BudgerScreen from "../screens/Budget/BudgetScreen";
import AccountScreen from "../screens/Account/AccountScreen";
import AddTradeScreen from "../screens/Trade/AddTradeScreen";
import { StyleSheet, View, Image, Text, TouchableWithoutFeedback } from "react-native";
import HeaderRight from "../components/HeaderRight";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Tab = createBottomTabNavigator();

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

export default function TabsBottom({navigation}) {
    const {isWalleting} = useContext(AuthContext);

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
                    backgroundColor: 'white',
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
                    headerTitleAlign: 'center',
                    headerShadowVisible: false,
                    headerTitle:() => 
                        <View style = {{
                                alignItems:'center',
                            }}
                        >
                            <View style = {{alignItems: 'center'}}>
                                <Text>Số dư</Text>
                                <Text style ={{fontWeight:'bold', fontSize: 18}}>{(isWalleting.money).toLocaleString()} đ</Text>
                            </View>
                            
                        </View>,
                    headerRight: () => 
                        <HeaderRight
                            image2={require('../assets/menu-dots-vertical.png')}
                        />,
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
                component={AddTradeScreen}
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
                    headerShadowVisible: false,
                    title:"Ngân sách áp dụng",
                    headerRight: () => 
                        <HeaderRight 
                            image2={require('../assets/menu-dots-vertical.png')}
                        />,
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
        shadowColor:'black',
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
    images:{
        width:16,
        height:16
    },
    text:{
        fontSize: 9,
        fontWeight: 'bold',
    }
})