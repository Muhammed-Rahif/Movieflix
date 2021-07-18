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
import { getMovieGenresList } from "../helpers/helper";
import { AlertDialogContext } from "../contexts/Contexts";
import { useContext } from "react";

export default function MoviesContent() {
  const { setAlertDialog } = useContext(AlertDialogContext);

  const [genres, setGenres] = useState([]);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    getMovieGenresList()
      .then((results) => {
        results.map((itm) => {
          setGenres((genres) => [...genres, itm.name]);
        });
      })
      .catch((err) => {
        setAlertDialog({
          open: true,
          title: "Oops!",
          text: err.message,
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
        <SelectableChips chipsArray={genres.length === 0 ? [] : genres} />
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
