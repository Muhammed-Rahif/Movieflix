import React from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { Card, Chip } from "react-native-paper";
import { colors, window } from "../helpers/constants";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

export default function StandaloneCard({
  bannerImageSrc = "",
  title = "",
  subtitle = "",
  viewCount = 0,
  releaseDate = "",
  tags = [],
}) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  return (
    <TouchableNativeFeedback>
      <Card style={styles.card}>
        <Text
          style={[
            styles.simpleText,
            { fontFamily: fontsLoaded ? "Poppins_600SemiBold" : "" },
          ]}
        >
          {viewCount} Views, Release date : {releaseDate}
        </Text>
        <Text
          style={[
            styles.title,
            { fontFamily: fontsLoaded ? "Poppins_600SemiBold" : "" },
          ]}
        >
          {title}
        </Text>
        <Card.Cover
          style={styles.cardImage}
          source={{
            uri: bannerImageSrc,
          }}
        />
        <View style={styles.tagsWrapper}>
          {tags.map((tag, key) => (
            <Chip mode="outlined" key={key} style={styles.chip}>
              <Text style={styles.chipText}>{tag}</Text>
            </Chip>
          ))}
        </View>
        <Text
          style={[
            styles.subtitle,
            { fontFamily: fontsLoaded ? "Poppins_400Regular" : "" },
          ]}
        >
          {subtitle}
        </Text>
      </Card>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 12,
    padding: 12,
    paddingTop: 0,
    borderRadius: 22,
    backgroundColor: colors.secondary,
  },
  cardImage: {
    borderRadius: 22,
    borderTopRightRadius: 22,
    borderBottomLeftRadius: 22,
    width: "100%",
  },
  title: {
    fontSize: 24,
    color: colors.light,
    marginLeft: 6,
  },
  subtitle: {
    fontSize: 14,
    color: colors.light,
    marginTop: 12,
    marginLeft: 6,
  },
  simpleText: {
    fontSize: 12,
    color: colors.warning,
    marginTop: 12,
    marginTop: 12,
    marginLeft: 6,
  },
  tagsWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    marginTop: 12,
  },
  chipText: {
    fontSize: 10,
    color: colors.light,
  },
  chip: {
    margin: 1,
    backgroundColor: colors.transparent,
  },
});
