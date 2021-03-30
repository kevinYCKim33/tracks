import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, Button, Input } from "react-native-elements"; // https://reactnativeelements.com/
import Spacer from "./Spacer"; // just for margins

// Shared by both SigninScreen and SignupScreen
const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
  // headerText Sign Up for Tracker or Sign In to your Account
  // and so on
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Spacer>
        <Text h3>{headerText}</Text>
      </Spacer>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none" // seems silly but yes
        autoCorrect={false}
      />
      <Spacer />
      <Input
        secureTextEntry // how to make it all dotty...
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {/* propogates down from Signin/Signup */}
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button
          title={submitButtonText}
          onPress={() => onSubmit({ email, password })}
        />
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
    marginTop: 15,
  },
});

export default AuthForm;
