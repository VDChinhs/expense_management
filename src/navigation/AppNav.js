import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabsBottom from "./TabsBottom";
import StartScreen from "../screens/Start/StartScreen";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AddScreen from "../screens/Home/AddScreen";
import AccountManagerScreen from "../screens/Account/AccountManagerScreen";
import TabsTopGroup from "./TabsTopGroup";
import HeaderRight from "../components/HeaderRight";

const Stack = createStackNavigator()

export default function AppNav() {
    const {userToken} = useContext(AuthContext);

    return(
        <NavigationContainer>
            {userToken == null ? (
                <StartScreen></StartScreen>
            ) : (
                <Stack.Navigator 
                    initialRouteName ="TabHome" 
                    screenOptions={{
                        headerShadowVisible:false,
                        headerStyle:{
                            height:70,
                        }
                    }}
                >
                    <Stack.Screen name="TabHome" component={TabsBottom} options={{headerShown: false}}/>
                    <Stack.Screen name="AddTrade" component={AddScreen} options={{title:"Thêm giao dịch"}}/>
                    <Stack.Screen name="AccMaScreen" component={AccountManagerScreen} options={{title:"Quản lý tài khoản"}}/>
                    <Stack.Screen 
                        name="ChooseGroup" 
                        component={TabsTopGroup} 
                        options={{
                                title:"Nhóm",
                                headerRight: () => <HeaderRight 
                                    image1={require('../assets/wallet.png')}
                                    image2={require('../assets/search.png')}
                                />
                            }
                        }/>
                </Stack.Navigator>
            )}
        </NavigationContainer>
    )
}