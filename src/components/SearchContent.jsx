import React, { useContext, useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  AlertDialogContext,
  NavigationIndexContext,
  SearchContext,
} from "../contexts/Contexts";
import { axios, baseImageUrl, colors, window } from "../helpers/constants";
import StandaloneCard from "./StandaloneCard";
import Axios from "axios";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import {
  getMovieGenresList,
  getTvShowsGenresList,
  searchForMovie,
  searchForTvShow,
} from "../helpers/helper";

export default function SearchContent() {
  const [results, setResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState();
  const [page, setPage] = useState(2);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);

  const { searchFor } = useContext(SearchContext);
  const { setAlertDialog } = useContext(AlertDialogContext);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    Promise.all([getMovieGenresList(), getTvShowsGenresList()])
      .then((resultArray) => {
        setCategories([...resultArray[0], ...resultArray[1]]);
        setLoading(false);
      })
      .catch((err) => {
        setAlertDialog({
          open: true,
          title: "Oops!",
          text: err.message,
        });
      });
  }, [results]);

  const getGenresList = (genres) => {
    let genreNames = [];
    categories.map((category) => {
      genres.map((genre) => {
        if (category.id === genre) {
          let ifExist;
          for (let existingGenre of genreNames) {
            if (existingGenre === category.name) {
              ifExist = true;
            } else {
              ifExist = false;
            }
          }
          if (!ifExist) {
            genreNames.push(category.name);
          }
        }
      });
    });
    return genreNames;
  };

  useEffect(() => {
    if (searchFor !== "" && searchFor !== null && searchFor !== false) {
      setPage(2);
      setResults([]);
      setLoading(true);
      Promise.all([searchForMovie(searchFor, 1), searchForTvShow(searchFor, 1)])
        .then((resultArray) => {
          setResults([...resultArray[0], ...resultArray[1]]);
          setLoadMoreLoading(false);
          setLoading(false);
        })
        .catch((err) => {
          setAlertDialog({
            open: true,
            title: "Oops!",
            text: err.message,
          });
        });
    }
  }, [searchFor]);

  const loadMoreContents = () => {
    if (!loadMoreLoading) {
      setLoadMoreLoading(true);
      Promise.all([
        searchForMovie(searchFor, page),
        searchForTvShow(searchFor, page),
      ])
        .then((resultArray) => {
          setPage(page + 1);
          setLoadMoreLoading(false);
          setResults((results) => [
            ...results,
            ...resultArray[0],
            ...resultArray[1],
          ]);
        })
        .catch((err) => {
          setAlertDialog({ open: true, title: "Oops!", text: err.message });
        });
    }
  };
  // Add a label when no results
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

  return (
    <>
      <ScrollView
        style={styles.container}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            loadMoreContents();
          }
        }}
      >
        {searchFor
          ? results.map((result, key) => (
              <StandaloneCard
                bannerImageSrc={
                  baseImageUrl + result.backdrop_path
                    ? result.backdrop_path
                    : result.poster_path
                }
                releaseDate={
                  result.release_date
                    ? result.release_date
                    : result.first_air_date
                }
                subtitle={result.overview}
                tags={getGenresList(result.genre_ids)}
                title={result.title ? result.title : result.original_name}
                voteCount={result.vote_count}
                rating={result.vote_average}
                percentageLiked={result.vote_average * 10}
                mediaType={result.title ? "Movie" : "TV Show"}
                key={key}
              />
            ))
          : null}
        {/* {!loading && searchFor && !loadMoreLoading ? (
          <View style={styles.loadMoreWrapper}>
            <Button
              mode="contained"
              style={styles.loadMoreBtn}
              labelStyle={[
                styles.loadMoreBtnText,
                { fontFamily: fontsLoaded ? "Poppins_400Regular" : "" },
              ]}
              onPress={() => {
                setLoadMoreLoading(true);
                loadMoreContents();
              }}
            >
              Load more
            </Button>
          </View>
        ) : null} */}
        <View style={styles.defaultWrapper}>
          {loading ? (
            <ActivityIndicator
              style={styles.loading}
              animating={loading}
              color={colors.secondary}
            />
          ) : null}
          {!searchFor ? (
            <Text
              style={[
                styles.defaultText,
                { fontFamily: fontsLoaded ? "Poppins_600SemiBold" : "" },
              ]}
            >
              Search for latest movies, tv shows..
            </Text>
          ) : null}
          {!loading && !loadMoreLoading && searchFor && results.length < 1 ? (
            <Text
              style={[
                styles.defaultText,
                {
                  fontFamily: fontsLoaded ? "Poppins_600SemiBold" : "",
                  opacity: 1,
                },
              ]}
            >
              🤷‍♂️️ No results found.
            </Text>
          ) : null}
          {loadMoreLoading && !loading && searchFor ? (
            <ActivityIndicator
              style={styles.loadMoreLoading}
              animating={loadMoreLoading}
              color={colors.secondary}
            />
          ) : null}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  defaultWrapper: { flex: 1 },
  defaultText: {
    marginTop: window.height * 0.5 - 100,
    textAlign: "center",
    opacity: 0.5,
    color: colors.light,
    fontSize: 14,
  },
  loadMoreWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  loadMoreBtn: {
    marginRight: 12,
    marginLeft: 12,
    backgroundColor: colors.secondary,
    borderRadius: 24,
    width: 120,
  },
  loadMoreBtnText: {
    textTransform: "none",
  },
  loading: {
    marginTop: window.height * 0.5 - 100,
  },
  loadMoreLoading: {
    paddingTop: 28,
    paddingBottom: 28,
  },
});
