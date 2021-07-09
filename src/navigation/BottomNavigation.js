import React from "react";
import { StyleSheet } from "react-native";
import { BottomNavigation, Text } from "react-native-paper";
import { colors } from "../helpers/constants";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Movies from "../screens/Movies";
import Shows from "../screens/Shows";

const HomeScreen = () => <Home />;

const SearchScreen = () => <Search />;

const MoviesScreen = () => <Movies />;

const ShowsScreen = () => <Shows />;

export default function Navigation() {
  const [index, setIndex] = React.useState(0);
  const routes = [
    { key: "home", title: "Home", icon: "home", color: colors.primary },
    { key: "search", title: "Search", icon: "search", color: colors.primary },
    { key: "movies", title: "Movies", icon: "film", color: colors.primary },
    { key: "shows", title: "Shows", icon: "tv", color: colors.primary },
  ];

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    search: SearchScreen,
    movies: MoviesScreen,
    shows: ShowsScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      style={styles.bottomNavigation}
    />
  );
}

const styles = StyleSheet.create({
  bottomNavigation: {},
});
