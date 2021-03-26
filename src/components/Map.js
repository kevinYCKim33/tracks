import React, { useContext } from "react";
import { Text, StyleSheet, ActivityIndicator } from "react-native";
import TrackCreateScreen from "../screens/TrackCreateScreen";
import MapView, { Polyline, Circle } from "react-native-maps"; // npx expo-cli install react-native-maps
// MapView shows nothing by default

const Map = () => {
  let points = [];

  for (let i = 0; i < 20; i++) {
    if (i % 2 === 0) {
      points.push({
        latitude: 37.33233 + i * 0.001,
        longitude: -122.03121 + i * 0.001,
      });
    } else {
      points.push({
        latitude: 37.33233 - i * 0.002,
        longitude: -122.03121 + i * 0.001,
      });
    }
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 37.33233,
        longitude: -122.03121,
        latitudeDelta: 0.01, // zoom level basically?
        longitudeDelta: 0.01, // zoom level basically?
      }}
    >
      {/* coordinates just takes an array of lat and long points */}
      <Polyline coordinates={points} />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300, // must be specified for a map to show up
  },
});

export default Map;
