import "../_mockLocation"; // wahh you can import a whole directory?? kinda feels like importing css
import React, { useContext, useCallback } from "react";
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
import TrackForm from "../components/TrackForm";

const TrackCreateScreen = ({ isFocused }) => {
  const {
    state: { recording },
    addLocation,
  } = useContext(LocationContext);

  // this useCallback is the hardest part
  const callback = useCallback(
    (location) => {
      addLocation(location, recording);
    },
    [recording]
  );

  // where does location come from??
  // 2nd argument, callback that gets fired with (location) as its argument everytime the position updates
  // track location if you're looking directly at the screen or you're recording (then can be away from the screen)
  const [err] = useLocation(isFocused || recording, callback);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text h2>Create a Track</Text>
      <Map />
      {err ? <Text>Please enable location services</Text> : null}
      <TrackForm />
    </SafeAreaView>
  );
};

TrackCreateScreen.navigationOptions = {
  title: "Add Track",
  tabBarIcon: <FontAwesome name="plus" size={20} />,
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);
