import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import SignScreen from './SignScreen';

const Stack = createStackNavigator();

function StartScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignScreen" component={SignScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default StartScreen;