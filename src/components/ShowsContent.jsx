import React, { useState, useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { baseImageUrl, colors, window } from "../helpers/constants";
import SelectableChips from "./SelectableChips";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";
import {
  getMovieGenresList,
  getMovies,
  getTvShows,
  getUpcomingMovies,
} from "../helpers/helper";
import { AlertDialogContext } from "../contexts/Contexts";
import ImageCard from "./ImageCard";

export default function MoviesContent() {
  const { setAlertDialog } = useContext(AlertDialogContext);

  const [categories, setCategories] = useState([]);
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(2);
  const [loadingMore, setLoadingMore] = useState(false);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    Promise.all([getMovieGenresList(), getTvShows()])
      .then((resultsArray) => {
        resultsArray[0].map((itm) => {
          setCategories((categories) => [...categories, itm.name]);
        });
        setShows(resultsArray[1]);
      })
      .catch((err) => {
        setAlertDialog({
          open: true,
          title: "Oops!",
          text: err.message,
        });
      });
  }, []);

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const loadMore = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      getTvShows(page).then((results) => {
        setShows((shows) => [...shows, ...results]);
      });
      setLoadingMore(false);
      setPage(page + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.mainTitle,
          { fontFamily: fontsLoaded ? "Poppins_600SemiBold" : "" },
        ]}
      >
        TV Shows
      </Text>
      {/* <View style={styles.chipsContainer}>
        <SelectableChips
          chipsArray={categories.length === 0 ? [] : categories}
        />
      </View> */}
      {categories.length === 0 ? (
        <ActivityIndicator
          style={styles.loading}
          animating
          color={colors.secondary}
        />
      ) : null}
      <ScrollView
        style={styles.imageCardsWrapper}
        contentContainerStyle={styles.imageCardsContainer}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            loadMore();
          }
        }}
      >
        {shows.map((show, key) => (
          <React.Fragment key={key}>
            <ImageCard
              id={show.id}
              imageSrc={baseImageUrl + show.poster_path}
              type="tv"
            />
            {key === shows.length - 1 ? (
              <View style={styles.loadingMoreWrapper}>
                <ActivityIndicator animating color={colors.secondary} />
              </View>
            ) : null}
          </React.Fragment>
        ))}
      </ScrollView>
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
  chipsContainer: {
    marginTop: 0,
  },
  loading: {
    marginTop: window.height * 0.5 - 80,
  },
  textTitle: {
    color: colors.light,
    fontSize: 18,
    paddingRight: 50,
    marginTop: 4,
  },
  mainTitle: {
    fontSize: 28,
    color: colors.light,
    paddingLeft: 28,
    paddingTop: 12,
  },
  imageCardsWrapper: {
    height: window.height,
    marginTop: 0,
    paddingTop: 0,
    padding: 12,
    flexGrow: 0,
  },
  imageCardsContainer: {
    flexGrow: 0,
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  loadingMoreWrapper: {
    width: "100%",
    paddingBottom: 80,
    paddingTop: 25,
  },
});
