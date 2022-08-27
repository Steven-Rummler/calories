import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen() {
  return <View style={styles.container}>
  <Text>Calorie Logging</Text>
  <TouchableOpacity
    onPress={() => alert('Calories logged')}
    style={styles.button}>
    <Text style={styles.buttonText}>Log Calories</Text>
  </TouchableOpacity>
</View>;
}

const Stack = createNativeStackNavigator();

export default function App() {
  return <NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
</NavigationContainer>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: "blue",
    padding: 100,
    margin: 10,
    borderRadius: 150,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  }
});
