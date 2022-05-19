import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import screens from '../../screens';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={screens.Login} />
      <Stack.Screen name="Register" component={screens.Register} />
      <Stack.Screen name="Home" component={screens.Home} />
      <Stack.Screen name="Chat" component={screens.Chat} />
    </Stack.Navigator>
  );
}
