import 'react-native-gesture-handler';
import { Image, View } from 'react-native';
import LoginScreen from './src/screens/Start/LoginScreen';
import LoginScreen1 from './src/screens/Start/LoginScreen1';
import SignScreen from './src/screens/Start/SignScreen';
import TestScreen from './src/screens/TestScreen';
import StartScreen from './src/screens/Start/StartScreen';
import { AuthProvider } from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';

export default function App() {
  
  return (
    <AuthProvider>
      <AppNav></AppNav>
      {/* <TestScreen/> */}
      {/* <StartScreen></StartScreen> */}
    </AuthProvider>
  );
} 