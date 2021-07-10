import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { axios, colors, baseImageUrl, window } from "../helpers/constants";
import CategoryBubble from "../components/CategoryBubble";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import SlideCard from "./SlideCard";
import { ActivityIndicator } from "react-native-paper";
import StandaloneCard from "./StandaloneCard";
import Axios from "axios";

export default function HomeContent() {
  const [categories, setCategories] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [familyEntertainment, setFamilyEntertainment] = useState([]);
  const [animation, setAnimation] = useState([]);
  const [action, setAction] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [randomActionMovie, setRandomActionMovie] = useState();
  const [randomWarMovie, setRandomWarMovie] = useState();
  const [loading, setLoading] = useState(true);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    Axios.all([
      axios.get("genre/movie/list?api_key=2a4afa027d254745d262a88cce34ee48"),
      axios.get("movie/popular?api_key=2a4afa027d254745d262a88cce34ee48"),
      axios.get("movie/top_rated?api_key=2a4afa027d254745d262a88cce34ee48"),
      axios.get(
        "discover/movie?api_key=2a4afa027d254745d262a88cce34ee48&with_genres=10751"
      ),
      axios.get(
        "discover/movie?api_key=2a4afa027d254745d262a88cce34ee48&with_genres=16"
      ),
      axios.get(
        "discover/movie?api_key=2a4afa027d254745d262a88cce34ee48&with_genres=28"
      ),
      axios.get(
        "discover/movie?api_key=2a4afa027d254745d262a88cce34ee48&with_genres=10752"
      ),
      axios.get(
        "discover/movie?api_key=2a4afa027d254745d262a88cce34ee48&with_genres=35"
      ),
    ]).then(
      Axios.spread(
        (
          categories,
          popular,
          topRated,
          familyEntertainment,
          animation,
          action,
          warMovies,
          comedies
        ) => {
          setCategories(categories.data.genres);
          setPopular(popular.data.results);
          setTopRated(topRated.data.results);
          setFamilyEntertainment(familyEntertainment.data.results);
          setAnimation(animation.data.results);
          setAction(action.data.results);
          setRandomActionMovie(
            action.data.results[
              Math.floor(Math.random() * action.data.results.length + 1)
            ]
          );
          setRandomWarMovie(
            warMovies.data.results[
              Math.floor(Math.random() * warMovies.data.results.length + 1)
            ]
          );
          setComedy(comedies.data.results);
          setLoading(false);
        }
      )
    );
  }, []);

  const getGenresList = (genres) => {
    let genreNames = [];
    genres.map((genre) => {
      categories.map((category) => {
        if (category.id === genre) {
          genreNames.push(category.name);
        }
      });
    });
    return genreNames;
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        width: window.width,
        height: "auto",
        paddingBottom: 24,
      }}
    >
      {!loading ? (
        <>
          {/* Categories movies slides*/}
          <Text
            style={[
              styles.textTitle,
              { fontFamily: fontsLoaded ? "Poppins_600SemiBold" : "" },
            ]}
          >
            Categories
          </Text>
          <ScrollView
            horizontal
            style={styles.categoriesWrapper}
            contentContainerStyle={styles.categoriesScrollView}
          >
            {categories.map((category, key) => (
              <CategoryBubble name={category.name} id={category.id} key={key} />
            ))}
          </ScrollView>

          {/* Most popular movies slides*/}
          <Text
            style={[
              styles.textTitle,
              { fontFamily: fontsLoaded ? "Poppins_600SemiBold" : "" },
            ]}
          >
            Most Popular
          </Text>
          <ScrollView
            horizontal
            style={styles.slidesWrapper}
            contentContainerStyle={styles.sliderScrollView}
          >
            {popular.map((movie, key) => (
              <SlideCard
                title={movie.title}
                posterSrc={baseImageUrl + movie.poster_path}
                key={key}
                rating={movie.vote_average}
                date={movie.release_date}
                tags={getGenresList(movie.genre_ids)}
              />
            ))}
          </ScrollView>

          {/* Top rated movies slides*/}
          <Text
            style={[
              styles.textTitle,
              { fontFamily: fontsLoaded ? "Poppins_600SemiBold" : "" },
            ]}
          >
            Top Rated
          </Text>
          <ScrollView
            horizontal
            style={styles.slidesWrapper}
            contentContainerStyle={styles.sliderScrollView}
          >
            {topRated.map((movie, key) => (
              <SlideCard
                title={movie.title}
                posterSrc={baseImageUrl + movie.poster_path}
                key={key}
                rating={movie.vote_average}
                date={movie.release_date}
                tags={getGenresList(movie.genre_ids)}
              />
            ))}
          </ScrollView>

          {/* Family entertainment movies slides*/}
          <Text
            style={[
              styles.textTitle,
              { fontFamily: fontsLoaded ? "Poppins_600SemiBold" : "" },
            ]}
          >
            Family Entertainment
          </Text>
          <ScrollView
            horizontal
            style={styles.slidesWrapper}
            contentContainerStyle={styles.sliderScrollView}
          >
            {familyEntertainment.map((movie, key) => (
              <SlideCard
                title={movie.title}
                posterSrc={baseImageUrl + movie.poster_path}
                key={key}
                rating={movie.vote_average}
                date={movie.release_date}
                tags={getGenresList(movie.genre_ids)}
              />
            ))}
          </ScrollView>

          {/* Standalone card for random animation movie */}
          {randomActionMovie && (
            <StandaloneCard
              bannerImageSrc={baseImageUrl + randomActionMovie.backdrop_path}
              title={randomActionMovie.title}
              subtitle={randomActionMovie.overview}
              viewCount={randomActionMovie.vote_count}
              releaseDate={randomActionMovie.release_date}
              tags={getGenresList(randomActionMovie.genre_ids)}
            />
          )}

          {/* Action movies slides*/}
          <Text
            style={[
              styles.textTitle,
              { fontFamily: fontsLoaded ? "Poppins_600SemiBold" : "" },
            ]}
          >
            Action Films
          </Text>
          <ScrollView
            horizontal
            style={styles.slidesWrapper}
            contentContainerStyle={styles.sliderScrollView}
          >
            {action.map((movie, key) => (
              <SlideCard
                title={movie.title}
                posterSrc={baseImageUrl + movie.poster_path}
                key={key}
                rating={movie.vote_average}
                date={movie.release_date}
                tags={getGenresList(movie.genre_ids)}
              />
            ))}
          </ScrollView>

          {/* Animation movies slides*/}
          <Text
            style={[
              styles.textTitle,
              { fontFamily: fontsLoaded ? "Poppins_600SemiBold" : "" },
            ]}
          >
            Animation Movies
          </Text>
          <ScrollView
            horizontal
            style={styles.slidesWrapper}
            contentContainerStyle={styles.sliderScrollView}
          >
            {animation.map((movie, key) => (
              <SlideCard
                title={movie.title}
                posterSrc={baseImageUrl + movie.poster_path}
                key={key}
                rating={movie.vote_average}
                date={movie.release_date}
                tags={getGenresList(movie.genre_ids)}
              />
            ))}
          </ScrollView>

          {/* Comedy movies slides*/}
          <Text
            style={[
              styles.textTitle,
              { fontFamily: fontsLoaded ? "Poppins_600SemiBold" : "" },
            ]}
          >
            Comedy Movies
          </Text>
          <ScrollView
            horizontal
            style={styles.slidesWrapper}
            contentContainerStyle={styles.sliderScrollView}
          >
            {comedy.map((movie, key) => (
              <SlideCard
                title={movie.title}
                posterSrc={baseImageUrl + movie.poster_path}
                key={key}
                rating={movie.vote_average}
                date={movie.release_date}
                tags={getGenresList(movie.genre_ids)}
              />
            ))}
          </ScrollView>

          {/* Standalone card for random war movie */}
          {randomWarMovie && (
            <StandaloneCard
              bannerImageSrc={baseImageUrl + randomWarMovie.backdrop_path}
              title={randomWarMovie.title}
              subtitle={randomWarMovie.overview}
              viewCount={randomWarMovie.vote_count}
              releaseDate={randomWarMovie.release_date}
              tags={getGenresList(randomWarMovie.genre_ids)}
            />
          )}
        </>
      ) : (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator color={colors.secondary} size={30} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: window.width,
    height: window.height,
    flexGrow: 0,
  },
  loadingWrapper: {
    height: window.height - window.height * 0.2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textTitle: {
    color: colors.light,
    fontSize: 18,
    paddingLeft: 28,
  },
  categoriesWrapper: {
    flexGrow: 0,
    paddingBottom: 10,
    width: window.width,
    paddingLeft: 0,
    height: window.height * 0.1,
  },
  categoriesScrollView: {
    paddingRight: 12,
    paddingLeft: 12,
  },
  slidesWrapper: {
    flexGrow: 0,
    paddingBottom: 10,
    width: window.width,
    height: window.height * 0.65,
    marginBottom: 12,
  },
  sliderScrollView: {
    paddingRight: 6,
    paddingLeft: 6,
  },
});
