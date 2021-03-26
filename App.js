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
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { setNavigator } from "./src/navigationRef";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";

// Navigation map
// https://www.udemy.com/course/the-complete-react-native-and-redux-course/learn/lecture/15708316?start=618#notes

// switches between auth screens and non-auth screens;
// want deliberately abrupt transition
const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen, // first thing you do when app is mounted, is check if user is logged in
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

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <App
        ref={(navigator) => {
          // make a reference to be able to navigate outside of React
          // aka from the context reducer action
          setNavigator(navigator);
        }}
      />
    </AuthProvider>
  );
};
