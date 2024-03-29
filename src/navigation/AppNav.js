import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
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
import { ChangePassWord } from "../screens/Account/AccountManagerScreen";
import { DeleAccount } from "../screens/Account/AccountManagerScreen";
import MyWallet from "../screens/Account/MyWallet";
import NoteScreen from '../screens/AddTrace/NoteScreen'

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
                    
                    <Stack.Group>
                        <Stack.Screen name="AddTrade" component={AddScreen} options={{title:"Thêm giao dịch"}}/>
                        <Stack.Screen 
                            name="AddNote" 
                            component={NoteScreen} 
                            options={{
                                title:"Ghi chú"                                
                            }}/>
                        
                    </Stack.Group>

                    <Stack.Group >
                        <Stack.Screen name="AccMaScreen" component={AccountManagerScreen} options={{title:"Quản lý tài khoản"}}/>
                        <Stack.Screen name="MyWallet" component={MyWallet} options={{title:"Ví của tôi"}}/>
                        <Stack.Screen name="ChangePassWord" component={ChangePassWord} options={{title:"Thay đổi mật khẩu"}}/>
                        <Stack.Screen name="DeleAccount" component={DeleAccount} options={{title:"Xóa tài khoản"}}/>
                    </Stack.Group>

                    <Stack.Screen 
                        name="ChooseGroup" 
                        component={TabsTopGroup} 
                        options={{
                                title:"Nhóm",
                                headerRight: () => 
                                    // <Text style ={{fontSize:17, marginRight:15}}>Thêm nhóm</Text>
                                    <HeaderRight 
                                        // image1={require('../assets/wallet.png')}
                                        image2={require('../assets/themnhom.png')}
                                    />
                                    
                            }
                        }
                    />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    )
}