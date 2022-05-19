import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '../helpers/navigation';
import MainStack from './MainStack';

export default function Root() {
  return (
    <NavigationContainer ref={navigationRef}>
      <MainStack />
    </NavigationContainer>
  );
}
