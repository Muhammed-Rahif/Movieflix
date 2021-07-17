import React from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { colors } from "../helpers/constants";
import { getEmoji } from "../helpers/emojies";

export default function CategoryBubble({ name = "", id = "" }) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  return (
    <TouchableNativeFeedback>
      <View style={styles.container}>
        <Text style={styles.emoji}>{getEmoji(name)}</Text>
        <Text
          style={[
            styles.text,
            { fontFamily: fontsLoaded ? "Poppins_600SemiBold" : "" },
          ]}
        >
          {name}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    borderRadius: 22,
    height: 50,
    width: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
  },
  text: {
    color: colors.light,
    fontSize: 12,
  },
  emoji: {
    color: colors.light,
    fontSize: 16,
  },
});
