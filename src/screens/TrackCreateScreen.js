import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements"; // bootstrap basically
import { SafeAreaView } from "react-navigation";
import {
  // Accuracy,
  requestPermissionsAsync, // asks user if our app can locate you
  // watchPositionAsync
} from "expo-location";
import Map from "../components/Map";

const TrackCreateScreen = () => {
  const [err, setErr] = useState(null);

  useEffect(() => {
    startWatching();
  }, []);

  const startWatching = async () => {
    try {
      // can we track you? Allow "Expo" Go to use your location?
      // Allow Once; Allow While Using App; Don't Allow
      // Settings => General => Reset => Reset Location & Privacy
      const { granted } = await requestPermissionsAsync();
      if (!granted) {
        throw new Error("Location permission not granted");
      }

      // subscriber = await watchPositionAsync(
      //   {
      //     accuracy: Accuracy.BestForNavigation,
      //     timeInterval: 1000,
      //     distanceInterval: 10,
      //   },
      //   callback
      // );
    } catch (e) {
      // when error gets thrown on line 26 you immediately end up in the catch block with the new Error
      setErr(e);
    }
  };

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text h2>Create a Track</Text>
      <Map />
      {err ? <Text>Please enable location services</Text> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default TrackCreateScreen;
