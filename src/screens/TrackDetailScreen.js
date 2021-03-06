import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Context as TrackContext } from "../context/TrackContext";
import MapView, { Polyline } from "react-native-maps";

const TrackDetailScreen = ({ navigation }) => {
  const { state } = useContext(TrackContext);
  // state is just an array of tracks from MongoDB
  // MongoDB takes care of current_user.tracks (rails convention) for us
  const _id = navigation.getParam("_id");

  const track = state.find((t) => t._id === _id);
  const initialCoords = track.locations[0].coords; // for centering the map

  return (
    <>
      <Text style={{ fontSize: 48 }}>{track.name}</Text>
      <MapView
        initialRegion={{
          longitudeDelta: 0.01, // zoom level
          latitudeDelta: 0.01, // zoom level
          ...initialCoords,
        }}
        style={styles.map}
      >
        <Polyline coordinates={track.locations.map((loc) => loc.coords)} />
      </MapView>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
});

export default TrackDetailScreen;
