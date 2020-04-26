import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Map from './src/screen/Map';
import Direction from './src/screen/Direction';
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='map' component={Map} />
        <Stack.Screen name='direction' component={Direction} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
