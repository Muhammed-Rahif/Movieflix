import React, { useContext, useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SearchContext } from "../contexts/Contexts";
import { axios, baseImageUrl, colors, window } from "../helpers/constants";
import StandaloneCard from "./StandaloneCard";
import Axios from "axios";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

export default function SearchContent() {
  const [results, setResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState();
  const [page, setPage] = useState(2);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);

  const { searchFor } = useContext(SearchContext);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    Axios.all([
      axios.get("genre/movie/list?api_key=2a4afa027d254745d262a88cce34ee48"),
      axios.get("genre/tv/list?api_key=2a4afa027d254745d262a88cce34ee48"),
    ]).then(
      Axios.spread((movieGenres, showsGenres) => {
        setCategories([...movieGenres.data.genres, ...showsGenres.data.genres]);
        setLoading(false);
      })
    );
  }, [results]);

  const getGenresList = (genres) => {
    let genreNames = [];
    categories.map((category) => {
      genres.map((genre) => {
        console.log({ category });
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
      axios
        .get(
          "https://api.themoviedb.org/3/search/movie?api_key=2a4afa027d254745d262a88cce34ee48&query=" +
            searchFor +
            "&page=1"
        )
        .then((response) => {
          setResults(response.data.results);
          setLoadMoreLoading(false);
          setLoading(false);
        });
    }
  }, [searchFor]);

  const loadMoreContents = () => {
    if (!loadMoreLoading) {
      setLoadMoreLoading(true);
      axios
        .get(
          "https://api.themoviedb.org/3/search/movie?api_key=2a4afa027d254745d262a88cce34ee48&query=" +
            searchFor +
            "&page=" +
            page
        )
        .then((response) => {
          setPage(page + 1);
          setLoadMoreLoading(false);
          setResults((results) => [...results, ...response.data.results]);
        });
    }
  };

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
                bannerImageSrc={baseImageUrl + result.backdrop_path}
                releaseDate={result.release_date}
                subtitle={result.overview}
                tags={getGenresList(result.genre_ids)}
                title={result.title}
                voteCount={result.vote_count}
                rating={result.vote_average}
                percentageLiked={result.vote_average * 10}
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
