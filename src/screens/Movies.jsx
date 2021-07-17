import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MoviesContent from "../components/MoviesContent";
import { colors } from "../helpers/constants";

export default function Movies() {
  return (
    <View style={styles.container}>
      <MoviesContent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});
