import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from '@react-navigation/stack';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import { ChangePassWord } from "../screens/Account/AccountManagerScreen";
import { DeleAccount } from "../screens/Account/AccountManagerScreen";

import TabsBottom from "./TabsBottom";
import StartScreen from "../screens/Start/StartScreen";
import AddTradeScreen from "../screens/Trade/AddTradeScreen";
import AccountManagerScreen from "../screens/Account/AccountManagerScreen";
import TabsTopGroup from "./TabsTopGroup";
import HeaderRight from "../components/HeaderRight";
import MyWallet from "../screens/Account/MyWallet";
import NoteScreen from '../screens/AddTrace/NoteScreen'
import AddBudget from "../screens/Budget/AddBudget";
import AddGroupScreen from "../screens/Account/AddGroupScreen";
import ChooseGroupCha from "../screens/Account/ChooseGroupCha";
import ChooseIcon from "../screens/Account/ChooseIcon";
import AddWalletScreen from "../screens/Account/AddWalletScreen";
import RangeDayBudgetScreen from "../screens/Budget/RangeDayBudgetScreen";

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
                    <Stack.Screen name="AddBudget" component={AddBudget} options={{title:'Thêm ngân sách'}}/>
                    <Stack.Group
                        screenOptions={{
                            headerShown: false,
                            gestureEnabled: true,
                            cardOverlayEnabled: true,
                            ...TransitionPresets.ModalPresentationIOS,
                        }}
                    >
                        <Stack.Screen name="RangeDayBudgetScreen" component={RangeDayBudgetScreen}/>
                        <Stack.Screen name="AccountManagerScreen" component={AccountManagerScreen} options={{title:"Quản lý tài khoản"}}/>

                    </Stack.Group>
                    
                    
                    <Stack.Group>
                        <Stack.Screen name="AddTrade" component={AddTradeScreen} options={{title:"Thêm giao dịch"}}/>
                        <Stack.Screen 
                            name="AddNote" 
                            component={NoteScreen} 
                            options={{
                                title:"Ghi chú",                              
                            }}/>
                        
                    </Stack.Group>

                    <Stack.Group>
                        <Stack.Screen name="MyWallet" component={MyWallet} options={{title:"Ví của tôi"}}/>
                        <Stack.Screen name="AddWalletScreen" component={AddWalletScreen} options={{title:"Thêm ví"}}/>
                        <Stack.Screen name="ChangePassWord" component={ChangePassWord} options={{title:"Thay đổi mật khẩu"}}/>
                        <Stack.Screen name="DeleAccount" component={DeleAccount} options={{title:"Xóa tài khoản"}}/>
                    </Stack.Group>

                    <Stack.Group>
                        <Stack.Screen 
                            name="ChooseGroup" 
                            component={TabsTopGroup} 
                            options={{
                                title:"Nhóm",
                                headerRight: () => 
                                    <HeaderRight 
                                        image1={require('../assets/wallet.png')}
                                        image2={require('../assets/search.png')}
                                    />   
                            }}
                        />
                        <Stack.Screen name="AddGroupScreen" component={AddGroupScreen} options={{title:"Thêm nhóm"}}/>
                        <Stack.Screen name="ChooseGroupCha" component={ChooseGroupCha} options={{title:"Chọn nhóm cha"}}/>
                        <Stack.Screen name="ChooseIcon" component={ChooseIcon} options={{title:"Chọn biểu tượng"}}/>
                    </Stack.Group>

                </Stack.Navigator>
            )}
        </NavigationContainer>
    )
}