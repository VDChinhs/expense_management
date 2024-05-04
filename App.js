import 'react-native-gesture-handler';
import 'react-native-reanimated'
import { AuthProvider } from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

export default function App() {
    return (
        <Provider store = {store}>
            <AuthProvider>
                <AppNav/>
            </AuthProvider>
        </Provider>
    );
} 