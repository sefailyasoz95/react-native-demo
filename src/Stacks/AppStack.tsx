import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {AppStackParams} from '../Utils/types';
import HomeScreen from '../Screens/HomeScreen';
import MealsByCategoryScreen from '../Screens/MealsByCategoryScreen';
import SearchResultScreen from '../Screens/SearchResultScreen';

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
      <App.Screen name="SearchResultScreen" component={SearchResultScreen} />
    </App.Navigator>
  );
};

export default AppStack;
