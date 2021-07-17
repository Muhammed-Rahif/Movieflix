import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { axios, colors, window } from "../helpers/constants";
import SelectableChips from "./SelectableChips";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";

export default function MoviesContent() {
  const [genres, setGenres] = useState([]);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    axios
      .get("genre/movie/list?api_key=2a4afa027d254745d262a88cce34ee48")
      .then((response) => {
        response.data.genres.map((itm) => {
          setGenres((genres) => [...genres, itm.name]);
        });
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.mainTitle,
          { fontFamily: fontsLoaded ? "Poppins_600SemiBold" : "" },
        ]}
      >
        Movies
      </Text>
      <View style={styles.chipsContainer}>
        {genres.length === 0 ? (
          <ActivityIndicator animating color={colors.secondary} />
        ) : null}
        <SelectableChips chipsArray={genres} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: window.width,
    height: window.height,
    flexGrow: 0,
    marginTop: window.height * 0.038,
  },
  mainTitle: {
    fontSize: 22,
    color: colors.light,
    paddingLeft: 28,
    paddingTop: 12,
  },
});
