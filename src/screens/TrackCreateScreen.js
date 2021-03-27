import "../_mockLocation"; // wahh you can import a whole directory?? kinda feels like importing css
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements"; // bootstrap basically
import {
  SafeAreaView,
  withNavigationFocus, // HOC passes down isFocused; if looking at screen; true, if not: false;
} from "react-navigation";
import Map from "../components/Map";
import { Context as LocationContext } from "../context/LocationContext";
import { FontAwesome } from "@expo/vector-icons";
import useLocation from "../hooks/useLocation";

const TrackCreateScreen = ({ isFocused }) => {
  const {
    state: { recording },
    addLocation,
  } = useContext(LocationContext);

  const [err] = useLocation(isFocused, addLocation);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text h2>Create a Track</Text>
      <Map />
      {err ? <Text>Please enable location services</Text> : null}
    </SafeAreaView>
  );
};

TrackCreateScreen.navigationOptions = {
  title: "Add Track",
  tabBarIcon: <FontAwesome name="plus" size={20} />,
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);
