import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { NavigationEvents } from "react-navigation";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { Context } from "../context/AuthContext";

const SigninScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(Context);

  return (
    <View style={styles.container}>
      {/* this is a bit cleaner than navigation.addListener but the same thing 
        no need to unmount, but weird cause it doesn't really show up on the screen
      */}
      <NavigationEvents
        // right as I'm about to focus in to it
        onWillFocus={clearErrorMessage}
        // onWillFocus // Grider says do onWillFocus instead in notes
        // onDidFocus
        // onWillBlur: when about to navigate away
        // onDidBlur // a bit buggy at the time of Grider
      />
      <AuthForm
        headerText="Sign In to Your Account"
        errorMessage={state.errorMessage}
        onSubmit={signin}
        submitButtonText="Sign In"
      />
      <NavLink
        text="Dont have an account? Sign up instead"
        routeName="Signup"
      />
    </View>
  );
};

SigninScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 250,
  },
});

export default SigninScreen;
