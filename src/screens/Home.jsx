import React from "react";
import { StyleSheet, View } from "react-native";
import SearchBar from "../components/SearchBar";
import { colors } from "../helpers/constants";

export default function Shows() {
  return (
    <View style={styles.container}>
      <SearchBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});
