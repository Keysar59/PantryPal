import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './app/index';
import GroupScreen from './app/group';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'My Groups' }}
        />
        <Stack.Screen 
          name="GroupDetails" 
          component={GroupScreen}
          options={({ route }) => ({ title: route.params?.groupName || 'Group Details' })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 