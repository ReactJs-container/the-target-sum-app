import React from 'react';
import {Easing, Animated} from 'react-native';
import {createStackNavigator, createSwitchNavigator} from 'react-navigation';

// import MainTabNavigator from './MainTabNavigator';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const AppNavigator = createStackNavigator({
  Welcome:  { screen:WelcomeScreen },
  Home:  { screen:HomeScreen }
},
{
  initialRouteName: 'Welcome',
  headerMode: 'none',
  transitionConfig: () => ({
    transitionSpec: {
      duration: 2500,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
    }
  }),
}

);

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  //Main: MainTabNavigator,
  Main: AppNavigator,
});