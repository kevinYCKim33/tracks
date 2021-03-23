import React from "react";
import { View, StyleSheet } from "react-native";

// just a presentational component where there're margins everywhere
const Spacer = ({ children }) => {
  return <View style={styles.spacer}>{children}</View>;
};

const styles = StyleSheet.create({
  spacer: {
    margin: 15,
  },
});

export default Spacer;
