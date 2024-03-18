import 'react-native-gesture-handler';
import { Image, View } from 'react-native';
import LoginScreen from './src/screens/Start/LoginScreen';
import LoginScreen1 from './src/screens/Start/LoginScreen1';
import SignScreen from './src/screens/Start/SignScreen';
import TestScreen from './src/screens/TestScreen';
import StartScreen from './src/screens/Start/StartScreen';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {

  const image = {
    pics:{
      '0':require('../React_Native_App/src/assets/dollar.png'),
      '1':require('../React_Native_App/src/assets/home.png'),
      '2':require('../React_Native_App/src/assets/logo.png'),
      '3':require('../React_Native_App/src/assets/user.png'),
      '4':require('../React_Native_App/src/assets/wallet.png'),
    }
  }
  return (
    <AuthProvider>
      {/* <LoginScreen></LoginScreen> */}
      <TestScreen/>
      {/* <StartScreen></StartScreen> */}
      {/* <SignScreen/> */}
      
    </AuthProvider>
  );
} 