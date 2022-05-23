import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import DetailEventScreen from './src/screens/DetailEventScreen';

const Stack = createNativeStackNavigator();
let App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{title: "EventApp", headerStyle: {backgroundColor: '#8e44ad'}, headerTintColor: '#fff'}}
          />
          <Stack.Screen 
            name="DetailEvent" 
            component={DetailEventScreen} 
            options={({ route }) => ({ title: route.params.place.title, headerStyle: {backgroundColor: '#f39c12'}, headerTintColor: '#fff' })} 
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;