import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AppStack from './src/Stacks/AppStack';

function Main(): React.JSX.Element {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}

export default Main;
