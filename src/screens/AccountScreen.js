import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements"; // bootstrap basically
import { SafeAreaView } from "react-navigation"; //
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { FontAwesome } from "@expo/vector-icons";

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);

  return (
    <SafeAreaView
      forceInset={{ top: "always" }} // oh this is new; didn't know SafeAreaView has options
    >
      <Text style={{ fontSize: 48 }}>AccountScreen</Text>
      <Spacer>
        <Button title="Sign Out" onPress={signout} />
      </Spacer>
    </SafeAreaView>
  );
};

// v5 doesn't use static methods
AccountScreen.navigationOptions = {
  title: "Account",
  tabBarIcon: <FontAwesome name="gear" size={20} />, // this is new
};

const styles = StyleSheet.create({});

export default AccountScreen;
