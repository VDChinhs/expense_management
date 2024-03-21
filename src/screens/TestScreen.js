import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabsBottom from "../navigation/TabsBottom";
import StartScreen from "./Start/StartScreen";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AddScreen from "./Home/AddScreen";
import AccountManagerScreen from "./Account/AccountManagerScreen";

const Stack = createStackNavigator()
{/* <TabsBottom></TabsBottom> */}
const getIsSignedIn = () => {
    return false;
};

export default function TestScreen() {
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

const style = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:'#FFD3D3',
    },
    word:{
        fontWeight:'bold',
        fontSize: 15,
    },
    fonter:{
        flex:1,
        alignItems:'flex-end',
        marginEnd:100
    }
})