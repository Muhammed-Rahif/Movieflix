import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SearchBar from "../components/SearchBar";
import SearchContent from "../components/SearchContent";
import { colors } from "../helpers/constants";

export default function Search() {
  return (
    <View style={styles.container}>
      <SearchBar />
      <SearchContent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});
