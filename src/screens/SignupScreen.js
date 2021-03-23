import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
// https://reactnativeelements.com/docs/input
import { Text, Input, Button } from "react-native-elements"; // basically Bootstrap for RN
import Spacer from "../components/Spacer";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Spacer>
        <Text h3>Sign Up for Tracker</Text>
      </Spacer>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail} // pretty smart
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Spacer />
      <Input
        secureTextEntry // what makes it give it the dots
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Spacer>
        <Button title="Sign Up" />
      </Spacer>
    </View>
  );
};

// navigation v5
// https://reactnavigation.org/blog/2020/02/06/react-navigation-5.0/#update-options-from-component
SignupScreen.navigationOptions = () => {
  return { headerShown: false }; // hides the header
};

const styles = StyleSheet.create({
  container: {
    // borderWidth: 10,
    // borderColor: "red",
    flex: 1, // it's like the View is inside a big flex container that is the screen; stretch down to fill the screen;
    // flexDirection: row; flex: 1 ==> stretch to the right to fill up remaining horizontal space
    // flexDirection: column; flex: 1 ==> stretch down to fill up remaning vertical space
    justifyContent: "center", // flexDirection: row; justifyContent ==> center horizontally
    // flexDirection: column; justifyContent: center ==> center vertically
    marginBottom: 250, // pretty good; the centering was too awkward
  },
});

export default SignupScreen;
