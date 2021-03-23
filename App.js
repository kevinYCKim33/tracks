import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import AccountScreen from "./src/screens/AccountScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackListScreen from "./src/screens/TrackListScreen";

// Navigation map
// https://www.udemy.com/course/the-complete-react-native-and-redux-course/learn/lecture/15708316?start=618#notes

// switches between auth screens and non-auth screens;
// want deliberately abrupt transition
const switchNavigator = createSwitchNavigator({
  // ResolveAuth: ResolveAuthScreen,
  // nested navigator; lowercase for Grider convention
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen,
  }),
  mainFlow: createBottomTabNavigator({
    // trackListFlow,
    trackListFlow: createStackNavigator({
      TrackList: TrackListScreen,
      TrackDetail: TrackDetailScreen,
    }),
    TrackCreate: TrackCreateScreen,
    Account: AccountScreen,
  }),
});

export default createAppContainer(switchNavigator);
