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
  const [populars, setPopulars] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [familyEntertainments, setFamilyEntertainments] = useState([]);
  const [animations, setAnimations] = useState([]);
  const [actions, setActions] = useState([]);
  const [comedies, setComedies] = useState([]);
  const [randomActionMovie, setRandomActionMovie] = useState();
  const [randomWarMovie, setRandomWarMovie] = useState();
  const [wars, setWars] = useState([]);
  const [musics, setMusics] = useState([]);
  const [horrors, setHorrors] = useState([]);
  const [fantasies, setFantasies] = useState([]);
  const [randomFantasyMovie, setRandomFantasyMovie] = useState([]);
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
      axios.get(
        "discover/movie?api_key=2a4afa027d254745d262a88cce34ee48&with_genres=10402"
      ),
      axios.get(
        "discover/movie?api_key=2a4afa027d254745d262a88cce34ee48&with_genres=27"
      ),
      axios.get(
        "discover/movie?api_key=2a4afa027d254745d262a88cce34ee48&with_genres=14"
      ),
    ])
      .then(
        Axios.spread(
          (
            categories,
            populars,
            topRated,
            familyEntertainments,
            animations,
            actions,
            warMovies,
            comedies,
            musicMovies,
            horrorMovies,
            fantasyMovies
          ) => {
            setCategories(categories.data.genres);
            setPopulars(populars.data.results);
            setTopRated(topRated.data.results);
            setFamilyEntertainments(familyEntertainments.data.results);
            setAnimations(animations.data.results);
            setActions(actions.data.results);
            setRandomActionMovie(
              actions.data.results[
                Math.floor(Math.random() * actions.data.results.length + 1)
              ]
            );
            setWars(warMovies.data.results);
            setRandomWarMovie(
              warMovies.data.results[
                Math.floor(Math.random() * warMovies.data.results.length + 1)
              ]
            );
            setComedies(comedies.data.results);
            setMusics(musicMovies.data.results);
            setHorrors(horrorMovies.data.results);
            setFantasies(fantasyMovies.data.results);
            setRandomFantasyMovie(
              fantasyMovies.data.results[
                Math.floor(
                  Math.random() * fantasyMovies.data.results.length + 1
                )
              ]
            );
            setLoading(false);
          }
        )
      )
      .catch((err) => {
        alert(err.message);
        console.log({ err });
      });
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

          {/* Most populars movies slides*/}
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
            {populars.map((movie, key) => (
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
            {familyEntertainments.map((movie, key) => (
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

          {/* Standalone card for random animations movie */}
          {randomActionMovie && (
            <StandaloneCard
              bannerImageSrc={baseImageUrl + randomActionMovie.backdrop_path}
              title={randomActionMovie.title}
              subtitle={randomActionMovie.overview}
              voteCount={randomActionMovie.vote_count}
              releaseDate={randomActionMovie.release_date}
              tags={getGenresList(randomActionMovie.genre_ids)}
              rating={randomActionMovie.vote_average}
              percentageLiked={randomActionMovie.vote_average}
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
            {actions.map((movie, key) => (
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
            {animations.map((movie, key) => (
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
            {comedies.map((movie, key) => (
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

          {/* Standalone card for random wars movie */}
          {randomWarMovie && (
            <StandaloneCard
              bannerImageSrc={baseImageUrl + randomWarMovie.backdrop_path}
              title={randomWarMovie.title}
              subtitle={randomWarMovie.overview}
              voteCount={randomWarMovie.vote_count}
              releaseDate={randomWarMovie.release_date}
              tags={getGenresList(randomWarMovie.genre_ids)}
              rating={randomWarMovie.vote_average}
              percentageLiked={randomWarMovie.vote_average}
            />
          )}

          {/* War movies slides*/}
          <Text
            style={[
              styles.textTitle,
              { fontFamily: fontsLoaded ? "Poppins_600SemiBold" : "" },
            ]}
          >
            War Movies
          </Text>
          <ScrollView
            horizontal
            style={styles.slidesWrapper}
            contentContainerStyle={styles.sliderScrollView}
          >
            {wars.map((movie, key) => (
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

          {/* Music movies slides*/}
          <Text
            style={[
              styles.textTitle,
              { fontFamily: fontsLoaded ? "Poppins_600SemiBold" : "" },
            ]}
          >
            Music
          </Text>
          <ScrollView
            horizontal
            style={styles.slidesWrapper}
            contentContainerStyle={styles.sliderScrollView}
          >
            {musics.map((movie, key) => (
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

          {/* Horror movies slides*/}
          <Text
            style={[
              styles.textTitle,
              { fontFamily: fontsLoaded ? "Poppins_600SemiBold" : "" },
            ]}
          >
            Horror Movies
          </Text>
          <ScrollView
            horizontal
            style={styles.slidesWrapper}
            contentContainerStyle={styles.sliderScrollView}
          >
            {horrors.map((movie, key) => (
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

          {/* Standalone card for random fantasy movie */}
          {randomFantasyMovie && (
            <StandaloneCard
              bannerImageSrc={baseImageUrl + randomFantasyMovie.backdrop_path}
              title={randomFantasyMovie.title}
              subtitle={randomFantasyMovie.overview}
              voteCount={randomFantasyMovie.vote_count}
              releaseDate={randomFantasyMovie.release_date}
              tags={getGenresList(randomFantasyMovie.genre_ids)}
              rating={randomFantasyMovie.vote_average}
              percentageLiked={randomFantasyMovie.vote_average}
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
