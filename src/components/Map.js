import React, { useContext } from "react";
import { Text, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Polyline, Circle } from "react-native-maps"; // npx expo-cli install react-native-maps
// MapView shows nothing by default
import { Context as LocationContext } from "../context/LocationContext";

const Map = () => {
  const {
    state: { currentLocation, locations },
  } = useContext(LocationContext);

  if (!currentLocation) {
    // ActivityIndicator:
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }

  /*
Object {
  "coords": Object {
    "accuracy": 5,
    "altitude": 5,
    "altitudeAccuracy": 5,
    "heading": 0,
    "latitude": 40.78280693556538,
    "longitude": -73.97961484669275,
    "speed": 0,
  },
  "timestamp": 10000000,
}
  */

  return (
    <>
      <Text>hi</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          ...currentLocation.coords,
          latitudeDelta: 0.01, // zoom level basically?
          longitudeDelta: 0.01, // zoom level basically?
        }}
        // gahhhh how did I miss this??
        region={{
          ...currentLocation.coords,
          latitudeDelta: 0.01, // zoom level basically?
          longitudeDelta: 0.01, // zoom level basically?
        }}
      ></MapView>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300, // must be specified for a map to show up
  },
});

export default Map;
