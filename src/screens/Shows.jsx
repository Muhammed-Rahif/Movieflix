import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ShowsContent from "../components/ShowsContent";
import { colors } from "../helpers/constants";

export default function Shows() {
  return (
    <View style={styles.container}>
      <ShowsContent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});
