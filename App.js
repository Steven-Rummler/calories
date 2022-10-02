import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/home';
import LogEntryScreen from './screens/logEntry';
import HistoryScreen from './screens/history';
import StatsScreen from './screens/stats';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store.js'

const Stack = createNativeStackNavigator();

export default function App() {
  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Log Entry" component={LogEntryScreen} />
          <Stack.Screen name="History" component={HistoryScreen} />
          <Stack.Screen name="Stats" component={StatsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PersistGate>
  </Provider>;
}