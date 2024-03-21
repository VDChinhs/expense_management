import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabsBottom from "./TabsBottom";
import StartScreen from "../screens/Start/StartScreen";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AddScreen from "../screens/Home/AddScreen";
import AccountManagerScreen from "../screens/Account/AccountManagerScreen";

const Stack = createStackNavigator()

export default function AppNav() {
    const {userToken} = useContext(AuthContext);

    return(
        <NavigationContainer>
            {userToken == null ? (
                <StartScreen></StartScreen>
            ) : (
                <Stack.Navigator initialRouteName="Tabhome">
                    <Stack.Screen name="Tabhome" component={TabsBottom} options={{headerShown: false}}/>
                    <Stack.Screen name="AddTrade" component={AddScreen} options={{title:"Thêm giao dịch"}}/>
                    <Stack.Screen name="AccMaScreen" component={AccountManagerScreen} options={{title:"Quản lý tài khoản"}}/>
                </Stack.Navigator>
            )}
        </NavigationContainer>
    )
}