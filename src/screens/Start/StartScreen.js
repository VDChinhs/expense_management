import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import SignScreen from './SignScreen';

const Stack = createStackNavigator();

function StartScreen() {
  return (
    // <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="SignScreen" component={SignScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    // </NavigationContainer>
  );
}

export default StartScreen;