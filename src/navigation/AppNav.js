import { View, Text } from "react-native";
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
import MyWallet from "../screens/Account/MyWallet";
import AddBudget from "../screens/Budget/AddBudget";
import AddGroupScreen from "../screens/Account/AddGroupScreen";
import ChooseGroupCha from "../screens/Account/ChooseGroupCha";
import ChooseIcon from "../screens/Account/ChooseIcon";
import AddWalletScreen from "../screens/Account/AddWalletScreen";
import ReportScreen from "../screens/Trade/ReportScreen";
import DetailReportScreen from "../screens/Trade/DetailReportScreen";
import EditTradeScreen from "../screens/Trade/EditTradeScreen";
import EditWalletScreen from "../screens/Account/EditWalletScreen";
import EditGroupScreen from "../screens/Account/EditGroupScreen";
import EditBudgetScreen from "../screens/Budget/EditBudgetScreen";

import { useSelector } from "react-redux";

const Stack = createStackNavigator()

export default function AppNav() {
    const {userToken} = useContext(AuthContext);
    const { _isWalleting } = useSelector(state => state.walletReducer)

    return(
        <NavigationContainer>
            {userToken == null ? (
                <StartScreen></StartScreen>
            ) 
            : 
            (
                <Stack.Navigator 
                    initialRouteName ="TabHome" 
                    screenOptions={{
                        headerStyle:{
                            height:70,
                        }
                    }}
                >
                    <Stack.Screen name="TabHome" component={TabsBottom} options={{headerShown: false}}/>
                    <Stack.Screen name="AddBudget" component={AddBudget} options={{title:'Thêm ngân sách'}}/>
                    <Stack.Screen name="EditBudgetScreen" component={EditBudgetScreen} options={{title:'Sửa ngân sách'}}/>
                    <Stack.Group
                        screenOptions={{
                            headerShown: false,
                            gestureEnabled: true,
                            cardOverlayEnabled: true,
                            ...TransitionPresets.ModalPresentationIOS,
                        }}
                    >
                        <Stack.Screen name="AccountManagerScreen" component={AccountManagerScreen} options={{title:"Quản lý tài khoản"}}/>

                    </Stack.Group>
                    
                    <Stack.Group>
                        <Stack.Screen name="AddTrade" component={AddTradeScreen} options={{title:"Thêm giao dịch"}}/>
                        <Stack.Screen name="EditTradeScreen" component={EditTradeScreen} options={{title:"Sửa giao dịch"}}/>
 
                    </Stack.Group>

                    <Stack.Group>
                        <Stack.Screen name="MyWallet" component={MyWallet} options={{title:"Ví của tôi"}}/>
                        <Stack.Screen name="EditWalletScreen" component={EditWalletScreen} options={{title:"Sửa ví"}}/>
                        <Stack.Screen name="AddWalletScreen" component={AddWalletScreen} options={{title:"Thêm ví"}}/>
                        <Stack.Screen name="ChangePassWord" component={ChangePassWord} options={{title:"Thay đổi mật khẩu"}}/>
                        <Stack.Screen name="DeleAccount" component={DeleAccount} options={{title:"Xóa tài khoản"}}/>
                    </Stack.Group>

                    <Stack.Group>
                        <Stack.Screen 
                            name="ChooseGroup"
                            component={TabsTopGroup} 
                            options={{
                                headerShadowVisible:false,
                                title:"Nhóm", 
                            }}
                        />
                        <Stack.Screen 
                            name="ReportScreen" 
                            component={ReportScreen} 
                            options={{
                                headerShadowVisible:false,
                                title:"Báo cáo chi tiêu",
                                headerTitleAlign: 'center',

                                headerTitle:() => 
                                    <View style = {{
                                            alignItems:'center',
                                        }}
                                    >
                                        <View style = {{alignItems: 'center'}}>
                                            <Text>Số dư</Text>
                                            <Text style ={{fontWeight:'bold', fontSize: 18}}>{(_isWalleting.money).toLocaleString()} đ</Text>
                                        </View>
                                        
                                    </View>
                            }}
                            
                        />
                        <Stack.Screen 
                            name="DetailReportScreen" 
                            component={DetailReportScreen} 
                            options={{
                                headerShadowVisible:false,
                            }}
                            
                        />
                    </Stack.Group>

                        <Stack.Screen name="AddGroupScreen" component={AddGroupScreen} options={{title:"Thêm nhóm"}}/>
                        <Stack.Screen name="EditGroupScreen" component={EditGroupScreen} options={{title:"Sửa nhóm"}}/>
                        <Stack.Screen name="ChooseGroupCha" component={ChooseGroupCha} options={{title:"Chọn nhóm cha"}}/>
                        <Stack.Screen name="ChooseIcon" component={ChooseIcon} options={{title:"Chọn biểu tượng"}}/>

                </Stack.Navigator>
            )}
        </NavigationContainer>
    )
}