import React from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { Card, Chip } from "react-native-paper";
import { colors, window } from "../helpers/constants";
import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { AirbnbRating } from "react-native-ratings";

export default function SlideCard({
  title = "",
  posterSrc = "",
  rating = 0,
  date = "",
  tags = [],
}) {
  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_400Regular,
  });

  return (
    <TouchableNativeFeedback>
      <Card style={styles.card}>
        <Card.Cover source={{ uri: posterSrc }} style={styles.cardImage} />
        <View style={styles.tagsWrapper}>
          {tags.map((tag, key) => (
            <View mode="outlined" key={key} style={styles.chip}>
              <Text
                style={[
                  styles.chipText,
                  { fontFamily: fontsLoaded ? "Poppins_400Regular" : "" },
                ]}
              >
                {tag}
              </Text>
            </View>
          ))}
        </View>
        <Text
          style={[
            styles.title,
            { fontFamily: fontsLoaded ? "Poppins_600SemiBold" : "" },
          ]}
          numberOfLines={2}
        >
          {title}
        </Text>
        <Text
          style={[
            styles.date,
            { fontFamily: fontsLoaded ? "Poppins_400Regular" : "" },
          ]}
        >
          {date}
        </Text>
        <AirbnbRating
          count={5}
          defaultRating={rating / 2}
          size={20}
          showRating={false}
          ratingContainerStyle={styles.starRating}
          isDisabled
        />
      </Card>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 450,
  },
  card: {
    height: 450,
    margin: 12,
    padding: 12,
    borderRadius: 22,
    backgroundColor: colors.secondary,
  },
  title: {
    fontSize: 18,
    color: colors.light,
    width: window.width * 0.6,
    padding: 12,
    paddingBottom: 0,
  },
  starRating: {
    paddingLeft: 12,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  cardImage: {
    borderRadius: 22,
    borderTopRightRadius: 22,
    borderTopLeftRadius: 22,
    width: window.width * 0.6,
    height: 225,
    backgroundColor: colors.primary,
  },
  date: {
    fontSize: 14,
    color: colors.light,
    width: window.width * 0.6,
    paddingLeft: 12,
  },
  tagsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    marginTop: 12,
    width: window.width * 0.6,
  },
  chipText: {
    fontSize: 9,
    color: colors.light,
  },
  chip: {
    margin: 1,
    backgroundColor: colors.transparent,
    padding: 12,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 22,
  },
});
