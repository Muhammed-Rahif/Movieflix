import React from "react";
import { StyleSheet, View } from "react-native";
import SearchBar from "../components/SearchBar";
import { colors } from "../helpers/constants";
import HomeContent from "../components/HomeContent";

export default function Shows() {
  return (
    <View style={styles.container}>
      <SearchBar />
      <HomeContent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});
