import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {AppStackParams} from '../Utils/types';
import HomeScreen from '../Screens/HomeScreen';
import MealsByCategoryScreen from '../Screens/MealsByCategoryScreen';

const App = createStackNavigator<AppStackParams>();
const options: StackNavigationOptions = {
  headerShown: false,
};
const AppStack = () => {
  return (
    <App.Navigator screenOptions={options}>
      <App.Screen name="HomeScreen" component={HomeScreen} />
      <App.Screen
        name="MealsByCategoryScreen"
        component={MealsByCategoryScreen}
      />
    </App.Navigator>
  );
};

export default AppStack;
