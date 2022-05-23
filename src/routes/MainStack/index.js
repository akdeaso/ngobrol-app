import {createStackNavigator} from '@react-navigation/stack';
import React, {useCallback, useEffect, useState} from 'react';
import screens from '../../screens';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

const MainStack = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [onAuthStateChanged]);

  const onAuthStateChanged = useCallback(
    userData => {
      setUser(userData);
      if (initializing) {
        setInitializing(false);
      }
    },
    [initializing],
  );

  if (initializing) {
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={user ? 'Home' : 'Login'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={screens.Login} />
      <Stack.Screen name="Register" component={screens.Register} />
      <Stack.Screen name="Home" component={screens.Home} />
      <Stack.Screen name="Chat" component={screens.Chat} />
    </Stack.Navigator>
  );
};

export default MainStack;
