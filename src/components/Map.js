import React, { useContext } from "react";
import { Text, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Polyline, Circle } from "react-native-maps"; // npx expo-cli install react-native-maps
// MapView shows nothing by default
import { Context as LocationContext } from "../context/LocationContext";

const Map = () => {
  // Q: how does currentLocation get set?
  // A: from addLocation(location, recording) from TrackCreateScreen
  const {
    state: { currentLocation, locations },
  } = useContext(LocationContext);

  // just show a spinner if currentLocation is currently not available
  if (!currentLocation) {
    // ActivityIndicator: loading spinner
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
    <MapView
      style={styles.map}
      // initialRegion magically won't update per re-render somehow...
      initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.01, // zoom level basically?
        longitudeDelta: 0.01, // zoom level basically?
      }}
    >
      <Circle
        center={currentLocation.coords}
        radius={30}
        strokeColor="rgba(158, 158, 255, 1.0)"
        fillColor="rgba(158, 158, 255, 0.3)" // nice opacity
      />
      {/* polyline only accepts lat and lng coords */}
      <Polyline coordinates={locations.map((loc) => loc.coords)} />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300, // must be specified for a map to show up
  },
});

export default Map;
