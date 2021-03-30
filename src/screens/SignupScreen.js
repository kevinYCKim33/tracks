import React, { useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationEvents } from "react-navigation";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

const SignupScreen = () => {
  // state only used for error message
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      {/* this is a bit cleaner than navigation.addListener but the same thing 
        no need to unmount, but weird cause it doesn't really show up on the screen
        clear out any error messages if you are focusing into the screen
        think the course at first said clear it out as you move away but it was glitchy
      */}
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <AuthForm
        headerText="Sign Up for Tracker"
        errorMessage={state.errorMessage}
        submitButtonText="Sign Up"
        onSubmit={signup}
      />
      <NavLink
        routeName="Signin"
        text="Already have an account? Sign in instead!"
      />
    </View>
  );
};

// no need for a header
SignupScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // stretches out the div to fill the remaining vertical space
    justifyContent: "center", // alignItems: center in flexDirection: column world
    marginBottom: 250, // for better centering
  },
});

export default SignupScreen;
